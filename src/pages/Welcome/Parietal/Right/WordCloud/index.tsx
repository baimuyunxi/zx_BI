import React, { useEffect, useRef, useState } from 'react';
import { WordCloud } from '@antv/g2plot';
import { Modal, Spin } from 'antd';
import { getWordDetails } from '@/pages/Welcome/service';
import { ProTable } from '@ant-design/pro-components';
import { OrderDetailColumns, OrderDetailType } from '@/pages/Welcome/entity/epithet';
import type { ActionType } from '@ant-design/pro-components';

interface WordCloudItem {
  word: string;
  weight: number;
}

interface OrderlyWordCloudProps {
  wordCloudData?: WordCloudItem[];
  loading?: boolean;
}

const OrderlyWordCloud: React.FC<OrderlyWordCloudProps> = ({
  wordCloudData = [],
  loading = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const actionRef = useRef<ActionType>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isDataLoading, setIsDataLoading] = useState<boolean>(false);
  const [orderData, setOrderData] = useState<OrderDetailType[]>([]);
  const [selectedKeyword, setSelectedKeyword] = useState<string>('');

  // 处理词语点击事件
  const handleWordClick = async (word: string) => {
    if (!word) return;

    setIsDataLoading(true);
    try {
      // 使用关键词作为参数调用API获取词详情
      const params = { keyWord: word };
      const result = await getWordDetails(params);
      console.log('获取词详情成功:', result);

      // 保存选中的关键词
      setSelectedKeyword(word);

      // 如果API返回了数据，保存到状态中
      if (result && Array.isArray(result.data)) {
        setOrderData(result.data);
      } else {
        setOrderData([]);
      }

      // 显示弹窗
      setModalVisible(true);
    } catch (error) {
      console.error('获取词详情失败:', error);
      setOrderData([]);
    } finally {
      setIsDataLoading(false);
    }
  };

  // 关闭弹窗
  const handleCloseModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    if (!containerRef.current || loading || wordCloudData.length === 0) return;

    // 清除容器中的旧内容
    containerRef.current.innerHTML = '';

    // 转换数据格式以适配G2Plot的要求
    const formattedData = wordCloudData.map((item) => ({
      text: item.word,
      value: item.weight,
    }));

    // 创建词云图实例
    const wordCloud = new WordCloud(containerRef.current, {
      data: formattedData,
      wordField: 'text',
      weightField: 'value',
      colorField: 'text',
      wordStyle: {
        fontFamily: '"微软雅黑", "Microsoft YaHei", Arial, sans-serif',
        fontSize: [14, 40],
        padding: 1, // 词间距
        // @ts-ignore
        cursor: 'pointer', // 设置鼠标悬停为手型指针
      },
      // 字体自适应
      autoFit: true,
      // 添加点击事件
      interactions: [{ type: 'element-active' }],
    });

    // 绑定点击事件
    wordCloud.on('element:click', (evt: { data: { data: { text: any } } }) => {
      const { text } = evt.data.data;
      handleWordClick(text);
    });

    // 渲染图表
    wordCloud.render();

    // 在组件卸载时销毁图表
    return () => {
      wordCloud.destroy();
    };
  }, [wordCloudData, loading]);

  return (
    <Spin spinning={loading || isDataLoading}>
      <div
        ref={containerRef}
        style={{
          width: '100%',
          height: '320px',
          backgroundColor: 'white', // 使用白色背景确保文字清晰可见
        }}
      />

      {/* 工单详情弹窗 */}
      <Modal
        width={1200}
        open={modalVisible}
        onCancel={handleCloseModal}
        footer={null}
        destroyOnClose
      >
        <Spin spinning={isDataLoading}>
          <ProTable<OrderDetailType>
            headerTitle={`关键词"${selectedKeyword}"的工单详情`}
            bordered={true}
            columns={OrderDetailColumns}
            actionRef={actionRef}
            dataSource={orderData}
            scroll={{ x: 1300, y: 400 }}
            search={false}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
            }}
            rowKey="serviceOrderId"
          />
        </Spin>
      </Modal>
    </Spin>
  );
};

export default OrderlyWordCloud;
