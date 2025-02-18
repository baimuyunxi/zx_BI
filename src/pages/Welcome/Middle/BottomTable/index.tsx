import React, { useState, useEffect, useRef } from 'react';
import { DataType, dataTypes } from '@/pages/Welcome/Middle/BottomTable/entity/DataType';
import { ActionType, ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import { data } from '@/pages/Welcome/Middle/BottomTable/data';
import { FormInstance } from 'antd/lib';
import * as XLSX from 'xlsx'; // 引入 xlsx 库
import { saveAs } from 'file-saver'; // 引入 file-saver 库来保存文件

const BottomTable = () => {
  const actionRef = useRef<ActionType>();
  const formRef = useRef<FormInstance>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout>();
  const scrollIntervalRef = useRef<NodeJS.Timeout>();

  const startScroll = () => {
    if (scrollRef.current && !isRestoring) {
      // 在恢复过程中不启动滚动
      const scrollElement = scrollRef.current.getElementsByClassName(
        'ant-table-body',
      )[0] as HTMLElement;
      if (scrollElement) {
        const scrollHeight = scrollElement.scrollHeight;
        const clientHeight = scrollElement.clientHeight;
        let currentScroll = scrollElement.scrollTop;

        timerRef.current = setInterval(() => {
          if (!isHovered) {
            currentScroll += 1;
            // 当滚动到底部时，重置回顶部
            if (currentScroll >= scrollHeight - clientHeight) {
              clearInterval(timerRef.current);
              setTimeout(() => {
                scrollElement.scrollTop = 0;
                startScroll();
              }, 2000);
            } else {
              scrollElement.scrollTop = currentScroll;
            }
          }
        }, 80);
      }
    }
  };

  useEffect(() => {
    startScroll();

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isHovered, isRestoring]);

  // 处理横向滚动条恢复初始位置
  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsRestoring(true);

    if (scrollRef.current) {
      const scrollElement = scrollRef.current.getElementsByClassName(
        'ant-table-body',
      )[0] as HTMLElement;
      if (scrollElement) {
        let currentLeft = scrollElement.scrollLeft;
        const scrollStep = 5;

        // 清理之前的滚动定时器，防止重复触发
        if (scrollIntervalRef.current) {
          clearInterval(scrollIntervalRef.current);
        }

        // 设置平滑的恢复滚动效果
        scrollIntervalRef.current = setInterval(() => {
          if (currentLeft > 0) {
            currentLeft -= scrollStep;
            scrollElement.scrollLeft = currentLeft;
          } else {
            clearInterval(scrollIntervalRef.current);
            setIsRestoring(false);
            startScroll();
          }
        }, 18);
      }
    }
  };

  // 导出Excel功能
  const handleDownload = () => {
    // 格式化当前日期
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;

    // 获取列配置并过滤掉序号列
    const filteredColumns = dataTypes
      .filter((col) => col.dataIndex !== 'index')
      .map((col) => ({
        dataIndex: col.dataIndex,
        title: col.title || '',
      }));

    // 获取表头
    const headers = filteredColumns.map((col) => col.title);

    // 转换数据行
    const rows = data.map((record) =>
      filteredColumns.map((col) => {
        const value = record[col.dataIndex as keyof DataType];
        return value !== undefined ? value : '';
      }),
    );

    // 组合表头和数据行
    const excelData = [headers, ...rows];

    // 创建工作表
    const ws = XLSX.utils.aoa_to_sheet(excelData);

    // 创建工作簿
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // 导出为Excel文件
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    const fileName = `工单_${formattedDate}.xlsx`;

    // 保存为 Excel 文件
    saveAs(blob, fileName);
  };

  return (
    <div ref={scrollRef} onMouseEnter={() => setIsHovered(true)} onMouseLeave={handleMouseLeave}>
      <ProTable<DataType>
        actionRef={actionRef}
        formRef={formRef}
        size="small"
        headerTitle={
          <span style={{ color: '#4dabf7', fontSize: '18px', fontWeight: 'bold' }}>
            实时工单信息记录
          </span>
        }
        search={false}
        bordered={true}
        columns={dataTypes}
        dataSource={data}
        scroll={{ y: 200 }}
        pagination={false}
        toolBarRender={() => [
          <Button key="button" onClick={handleDownload} type="primary">
            下载
          </Button>,
        ]}
      />
    </div>
  );
};

export default BottomTable;
