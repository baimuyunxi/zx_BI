import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import type { EChartsOption } from 'echarts';

interface WorldPopulationProps {
  style?: React.CSSProperties;
  className?: string;
}

const SixTypesLabel: React.FC<WorldPopulationProps> = ({ style}) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 确保DOM已经渲染
    if (!chartRef.current) return;

    // 初始化图表
    const chart = echarts.init(chartRef.current);

    // 配置项
    const option: EChartsOption = {
      title: {
        text: '六类标签来话量',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      legend: {
        // orient: 'vertical',
        right: 0,
        // top: 'center'
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01],
      },
      yAxis: {
        type: 'category',
        data: ['老干部', '战客', '要客', '商客', '行客', '校园'],
      },
      series: [
        {
          name: '当日',
          type: 'bar',
          data: [18, 23, 29, 104, 131, 230],
        },
        {
          name: '昨日',
          type: 'bar',
          data: [19, 23, 31, 121, 134, 281],
        },
      ],
    };

    // 设置配置项
    chart.setOption(option);

    // 监听窗口变化,重绘图表
    const handleResize = () => {
      chart.resize();
    };
    window.addEventListener('resize', handleResize);

    // 清理函数
    return () => {
      window.removeEventListener('resize', handleResize);
      chart.dispose();
    };
  }, []);

  return <div ref={chartRef} style={{ width: '100%', height: '320px' }} />;
};

export default SixTypesLabel;
