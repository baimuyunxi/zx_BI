import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const StackedBarChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    // 确保DOM元素已经渲染
    if (chartRef.current) {
      // 初始化ECharts实例
      const chartInstance = echarts.init(chartRef.current);

      // 应用配置选项
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        // legend: {},
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            data: ['故障', '商机', '投诉', '咨询'],
            axisLabel: {
              rotate: 45, // 旋转角度，45 即为 45°
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
          },
        ],
        series: [
          {
            name: '原始量',
            type: 'bar',
            stack: 'Ad',
            emphasis: {
              focus: 'series',
            },
            data: [150, 232, 201, 154],
          },
        ],
      };

      // 设置配置并渲染图表
      chartInstance.setOption(option);

      // 处理窗口大小变化时的自适应
      const handleResize = () => {
        chartInstance.resize();
      };
      window.addEventListener('resize', handleResize);

      // 组件卸载时清理
      return () => {
        window.removeEventListener('resize', handleResize);
        chartInstance.dispose();
      };
    }
  }, []);

  // 这是您所需的返回语句
  return <div ref={chartRef} style={{ width: '100%', height: '340px' }} />;
};

export default StackedBarChart;
