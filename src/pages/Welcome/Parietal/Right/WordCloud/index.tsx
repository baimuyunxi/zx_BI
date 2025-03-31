import React, { useEffect, useRef } from 'react';
import { WordCloud } from '@antv/g2plot';

interface DataItem {
  text: string;
  value: number;
}

const OrderlyWordCloud: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 清除容器中的旧内容
    containerRef.current.innerHTML = '';

    // 自定义数据 - 工单热词
    const customData: DataItem[] = [
      { text: '网络故障', value: 100 },
      { text: '信号问题', value: 90 },
      { text: '宽带故障', value: 85 },
      { text: '账单咨询', value: 80 },
      { text: '套餐变更', value: 75 },
      { text: '网速慢', value: 70 },
      { text: '无法上网', value: 65 },
      { text: '信号弱', value: 60 },
      { text: '手机无信号', value: 55 },
      { text: '充值问题', value: 50 },
      { text: '业务办理', value: 45 },
      { text: '流量问题', value: 40 },
      { text: '基站故障', value: 35 },
      { text: '投诉处理', value: 30 },
      { text: '欠费停机', value: 25 },
      { text: '资费问题', value: 20 },
      { text: '换卡', value: 15 },
      { text: '终端故障', value: 10 },
    ];

    // 创建词云图实例
    const wordCloud = new WordCloud(containerRef.current, {
      data: customData,
      wordField: 'text',
      weightField: 'value',
      colorField: 'text',
      // 矩形布局，更整齐
      // shape: 'rect',
      wordStyle: {
        fontFamily: '"微软雅黑", "Microsoft YaHei", Arial, sans-serif',
        fontSize: [14, 40],
        // rotation: 0, // 保持所有词水平，不旋转
        padding: 1, // 词间距
      },
      // 返回固定值使每次渲染位置相同
      // random: () => 0.5,
      // 字体自适应
      autoFit: true,
      // 关闭交互，使布局更稳定
      // interactions: [],
      // 设置颜色映射
      // color: ['#6395F9', '#62DAAB', '#657798', '#F6C022', '#7666F9', '#74CBED', '#6DC8EC'],
      // 布局配置
      // placementStrategy: 'rectangular',
    });

    // 渲染图表
    wordCloud.render();

    // 在组件卸载时销毁图表
    return () => {
      wordCloud.destroy();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '320px',
        backgroundColor: 'white', // 使用白色背景确保文字清晰可见
      }}
    />
  );
};

export default OrderlyWordCloud;
