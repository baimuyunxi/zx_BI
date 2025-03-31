import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const EnterpriseBarChart = () => {
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
            data: ['云电脑', '云主机', '天翼云眼', '组网专线', '互联网专线', '商务专线/普通政企宽带', '商企智能组网'],
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
            data: [150, 232, 201, 154, 190, 330, 410],
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
  return <div ref={chartRef} style={{ width: '100%', height: '420px' }} />;
};

export default EnterpriseBarChart;
