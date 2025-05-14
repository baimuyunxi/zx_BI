import React, { useEffect, useRef, useMemo } from 'react';
import * as echarts from 'echarts';
import type { EChartsOption } from 'echarts';
import { Spin } from 'antd';

// 定义企业来话图表的属性接口
interface EnterpriseChartProps {
  hwEnterprise?: any[]; // 注意：这里是hwFullService，保持与组件调用中的一致
  selectedCity?: any | null;
  loading?: boolean;
}

// 企业来话图表组件 - 复用WeatherChart组件的样式，但处理企业数据
const EnterpriseChart: React.FC<EnterpriseChartProps> = ({
  hwEnterprise = [], // 这里接收的实际是enterprise数据，但参数名保持一致
  selectedCity = null,
  loading = false,
}) => {
  const chartRef = useRef<HTMLDivElement>(null);

  // 处理企业来话数据
  const chartData = useMemo(() => {
    console.log('EnterpriseChart processing data, selectedCity:', selectedCity);
    console.log('hwEnterprise data:', hwEnterprise); // 实际是enterprise数据

    // 默认数据结构
    const defaultData = {
      timeSlots: [
        '00:00',
        '02:00',
        '04:00',
        '06:00',
        '08:00',
        '10:00',
        '12:00',
        '14:00',
        '16:00',
        '18:00',
        '20:00',
        '22:00',
      ],
      currentAccumulated: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      previousAccumulated: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      currentCounts: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      previousCounts: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    };

    try {
      // 如果没有数据，返回默认值
      if (!hwEnterprise || hwEnterprise.length === 0) {
        return defaultData;
      }

      // 筛选需要处理的城市数据
      let cityDataList = hwEnterprise;

      // 如果选中了特定城市，只处理该城市的数据
      if (selectedCity && selectedCity.localNet) {
        const localNetCode = selectedCity.localNet;
        cityDataList = hwEnterprise.filter((city: any) => city.local === localNetCode);

        // 如果没有找到该城市的数据，返回默认数据
        if (cityDataList.length === 0) {
          console.log('未找到选中城市的企业数据:', localNetCode);
          return defaultData;
        }
      }

      // 获取第一个城市的时间点作为X轴标签
      const sampleCity = cityDataList[0];
      if (!sampleCity || !sampleCity.marked || sampleCity.marked.length === 0) {
        return defaultData;
      }

      const timeSlots = sampleCity.marked.map((item: any) => item.time);

      // 初始化数据数组
      const currentAccumulated: number[] = new Array(timeSlots.length).fill(0);
      const previousAccumulated: number[] = new Array(timeSlots.length).fill(0);
      const currentCounts: number[] = new Array(timeSlots.length).fill(0);
      const previousCounts: number[] = new Array(timeSlots.length).fill(0);

      // 累加所有选中城市的数据
      cityDataList.forEach((city: any) => {
        if (city.marked && city.marked.length > 0) {
          city.marked.forEach((timePoint: any, index: number) => {
            // 直接读取企业数据 - 企业数据中，每个时间点直接包含了cnt、lastCnt、grandto、lastgrandto等属性
            currentAccumulated[index] += timePoint.grandto || 0;
            previousAccumulated[index] += timePoint.lastgrandto || 0;
            currentCounts[index] += timePoint.cnt || 0;
            previousCounts[index] += timePoint.lastCnt || 0;
          });
        }
      });

      return {
        timeSlots,
        currentAccumulated,
        previousAccumulated,
        currentCounts,
        previousCounts,
      };
    } catch (error) {
      console.error('处理企业图表数据时出错:', error);
      return defaultData;
    }
  }, [hwEnterprise, selectedCity]);

  useEffect(() => {
    let chartInstance: echarts.ECharts | undefined;

    // 初始化图表
    if (chartRef.current) {
      chartInstance = echarts.init(chartRef.current);

      // 计算y轴的最大值，确保有合适的刻度
      const maxAccumulated = Math.max(
        ...chartData.currentAccumulated,
        ...chartData.previousAccumulated,
      );
      const maxCount = Math.max(...chartData.currentCounts, ...chartData.previousCounts);

      // 计算合适的y轴刻度
      const yAxisMax = Math.ceil(maxAccumulated / 100) * 100 || 100;
      const y2AxisMax = Math.ceil(maxCount / 10) * 10 || 10;

      const option: EChartsOption = {
        title: {
          text: '企业来话量',
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
          data: ['当日累计', '昨日累计', '当日来话量', '昨日来话量'],
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '15%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            data: chartData.timeSlots,
            axisPointer: {
              type: 'shadow',
            },
            axisLabel: {
              rotate: 45, // 旋转角度
              interval: 0, // 显示所有标签
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            name: '累计来话量',
            min: 0,
            max: yAxisMax,
            interval: yAxisMax / 5,
            axisLabel: {
              formatter: '{value}',
            },
          },
          {
            type: 'value',
            name: '时间段来话量',
            min: 0,
            max: y2AxisMax,
            interval: y2AxisMax / 5,
            axisLabel: {
              formatter: '{value}',
            },
          },
        ],
        series: [
          {
            name: '当日累计',
            type: 'bar',
            tooltip: {
              valueFormatter: function (value) {
                return value as string;
              },
            },
            data: chartData.currentAccumulated,
          },
          {
            name: '昨日累计',
            type: 'bar',
            tooltip: {
              valueFormatter: function (value) {
                return value as string;
              },
            },
            data: chartData.previousAccumulated,
          },
          {
            name: '当日来话量',
            type: 'line',
            yAxisIndex: 1,
            tooltip: {
              valueFormatter: function (value) {
                return value as string;
              },
            },
            data: chartData.currentCounts,
          },
          {
            name: '昨日来话量',
            type: 'line',
            yAxisIndex: 1,
            tooltip: {
              valueFormatter: function (value) {
                return value as string;
              },
            },
            data: chartData.previousCounts,
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
  }, [chartData]);

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

  return (
    <Spin spinning={loading}>
      <div ref={chartRef} style={{ width: '100%', height: '320px' }} />
    </Spin>
  );
};

export default EnterpriseChart;
