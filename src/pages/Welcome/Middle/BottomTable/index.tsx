import React, { useState, useEffect, useRef } from 'react';
import { DataType, dataTypes } from '@/pages/Welcome/Middle/BottomTable/entity/DataType';
import { ActionType, ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import { data } from '@/pages/Welcome/Middle/BottomTable/data';
import { FormInstance } from 'antd/lib';

const BottomTable = () => {
  const actionRef = useRef<ActionType>();
  const formRef = useRef<FormInstance>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false); // 状态标记是否在恢复滚动
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
                scrollElement.scrollTop = 0; // 2秒后回到顶部
                startScroll(); // 重新开始滚动
              }, 2000);
            } else {
              scrollElement.scrollTop = currentScroll;
            }
          }
        }, 80); // 控制滚动速度，数值越大滚动越慢
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
    setIsRestoring(true); // 开始恢复横向滚动条

    if (scrollRef.current) {
      const scrollElement = scrollRef.current.getElementsByClassName(
        'ant-table-body',
      )[0] as HTMLElement;
      if (scrollElement) {
        let currentLeft = scrollElement.scrollLeft;
        const scrollStep = 5; // 每次滚动的距离

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
            clearInterval(scrollIntervalRef.current); // 到达初始位置时停止滚动
            setIsRestoring(false); // 恢复完毕
            startScroll(); // 恢复后启动自动滚动
          }
        }, 18); // 确保平滑动画
      }
    }
  };

  return (
    <div
      ref={scrollRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave} // 更新这里的事件处理函数
    >
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
          <Button key="button" onClick={() => {}} type="primary">
            下载
          </Button>,
        ]}
      />
    </div>
  );
};

export default BottomTable;
