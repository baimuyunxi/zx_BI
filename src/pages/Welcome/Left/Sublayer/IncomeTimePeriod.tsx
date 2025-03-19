import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import type { EChartsOption } from 'echarts';

const WeatherChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let chartInstance: echarts.ECharts | undefined;

    // 初始化图表
    if (chartRef.current) {
      chartInstance = echarts.init(chartRef.current);

      const option: EChartsOption = {
        title: {
          text: '整体来话量',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999',
            },
          },
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        legend: {
          bottom: 0,
        },
        xAxis: [
          {
            type: 'category',
            data: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00'],
            axisPointer: {
              type: 'shadow',
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
              formatter: '{value}',
            },
          },
          {
            type: 'value',
            min: 0,
            max: 25,
            interval: 5,
            axisLabel: {
              formatter: '{value}',
            },
          },
        ],
        series: [
          {
            name: '昨日累计',
            type: 'bar',
            tooltip: {
              valueFormatter: function (value) {
                return value;
              },
            },
            data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
          },
          {
            name: '当日累计',
            type: 'bar',
            tooltip: {
              valueFormatter: function (value) {
                return value;
              },
            },
            data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
          },
          {
            name: '昨日来话量',
            type: 'line',
            yAxisIndex: 1,
            tooltip: {
              valueFormatter: function (value) {
                return value;
              },
            },
            data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2],
          },
          {
            name: '当日来话量',
            type: 'line',
            yAxisIndex: 1,
            tooltip: {
              valueFormatter: function (value) {
                return value;
              },
            },
            data: [2.1, 1.2, 3.3, 3.5, 5.3, 8.2],
          },
        ],
      };

      // 设置选项并渲染图表
      chartInstance.setOption(option);
    }

    // 组件销毁时清理图表实例
    return () => {
      if (chartInstance) {
        chartInstance.dispose();
      }
    };
  }, []);

  // 响应窗口大小变化
  useEffect(() => {
    const handleResize = () => {
      if (chartRef.current) {
        const chart = echarts.getInstanceByDom(chartRef.current);
        chart?.resize();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <div ref={chartRef} style={{ width: '100%', height: '320px' }} />;
};

export default WeatherChart;
