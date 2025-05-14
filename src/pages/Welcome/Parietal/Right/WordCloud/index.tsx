import React, { useEffect, useRef } from 'react';
import { WordCloud } from '@antv/g2plot';
import { Spin } from 'antd';

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
      },
      // 字体自适应
      autoFit: true,
    });

    // 渲染图表
    wordCloud.render();

    // 在组件卸载时销毁图表
    return () => {
      wordCloud.destroy();
    };
  }, [wordCloudData, loading]);

  return (
    <Spin spinning={loading}>
      <div
        ref={containerRef}
        style={{
          width: '100%',
          height: '320px',
          backgroundColor: 'white', // 使用白色背景确保文字清晰可见
        }}
      />
    </Spin>
  );
};

export default OrderlyWordCloud;
