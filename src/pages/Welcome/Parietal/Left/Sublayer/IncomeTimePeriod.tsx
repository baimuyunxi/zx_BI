import React, { useEffect, useRef, useMemo } from 'react';
import * as echarts from 'echarts';
import type { EChartsOption } from 'echarts';
import { Spin } from 'antd';

// 定义组件属性接口
interface WeatherChartProps {
  hwFullService?: any[];
  selectedCity?: any | null;
  loading?: boolean;
}

const WeatherChart: React.FC<WeatherChartProps> = ({
  hwFullService = [],
  selectedCity = null,
  loading = false,
}) => {
  const chartRef = useRef<HTMLDivElement>(null);

  // 提取数据并处理，返回图表所需的数据结构
  const chartData = useMemo(() => {
    console.log('WeatherChart processing data, selectedCity:', selectedCity);
    console.log('hwFullService data:', hwFullService);

    // 创建一个动态的默认数据结构，而不是硬编码
    const defaultData = {
      timeSlots: [],
      currentAccumulated: [],
      previousAccumulated: [],
      currentCounts: [],
      previousCounts: [],
    };

    try {
      // 如果没有数据，返回默认值
      if (!hwFullService || hwFullService.length === 0) {
        return defaultData;
      }

      // 筛选需要处理的城市数据
      let cityDataList = hwFullService;

      // 如果选中了特定城市，只处理该城市的数据
      if (selectedCity && selectedCity.localNet) {
        const localNetCode = selectedCity.localNet;
        cityDataList = hwFullService.filter((city: any) => city.local === localNetCode);

        // 如果没有找到该城市的数据，返回默认数据
        if (cityDataList.length === 0) {
          console.log('未找到选中城市的数据:', localNetCode);
          return defaultData;
        }
      }

      // 获取第一个城市的时间点作为X轴标签
      const sampleCity = cityDataList[0];
      if (!sampleCity || !sampleCity.marked || sampleCity.marked.length === 0) {
        return defaultData;
      }

      // 动态获取时间点，不再硬编码
      const timeSlots = sampleCity.marked.map((item: any) => item.time);

      // 初始化数据数组，使用动态长度
      const currentAccumulated: number[] = new Array(timeSlots.length).fill(0);
      const previousAccumulated: number[] = new Array(timeSlots.length).fill(0);
      const currentCounts: number[] = new Array(timeSlots.length).fill(0);
      const previousCounts: number[] = new Array(timeSlots.length).fill(0);

      // 累加所有选中城市的数据
      cityDataList.forEach((city: any) => {
        if (city.marked && city.marked.length > 0) {
          city.marked.forEach((timePoint: any, index: number) => {
            // 对于每个时间点，累加所有标签的数据
            if (timePoint.labelSet && timePoint.labelSet.length > 0) {
              // 累加该时间点的所有标签数据
              let totalCnt = 0;
              let totalLastCnt = 0;

              timePoint.labelSet.forEach((label: any) => {
                // 累计来话量数据 (grandto和lastgrandto)
                currentAccumulated[index] += label.grandto || 0;
                previousAccumulated[index] += label.lastgrandto || 0;

                // 当前时间点来话量 (cnt和lastCnt)
                totalCnt += label.cnt || 0;
                totalLastCnt += label.lastCnt || 0;
              });

              // 保存当前时间点的来话量总数
              currentCounts[index] += totalCnt;
              previousCounts[index] += totalLastCnt;
            }
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
      console.error('处理图表数据时出错:', error);
      return defaultData;
    }
  }, [hwFullService, selectedCity]);

  useEffect(() => {
    let chartInstance: echarts.ECharts | undefined;

    // 初始化图表
    if (chartRef.current) {
      chartInstance = echarts.init(chartRef.current);

      // 计算y轴的最大值，确保有合适的刻度
      const maxAccumulated =
        Math.max(...chartData.currentAccumulated, ...chartData.previousAccumulated) || 100; // 防止空数组导致的NaN
      const maxCount = Math.max(...chartData.currentCounts, ...chartData.previousCounts) || 10;

      // 计算合适的y轴刻度
      const yAxisMax = Math.ceil(maxAccumulated / 100) * 100;
      const y2AxisMax = Math.ceil(maxCount / 10) * 10;

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
          data: ['当日来话量', '昨日来话量', '当日累计', '昨日累计'],
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
          {
            name: '当日累计',
            type: 'bar',
            tooltip: {
              valueFormatter: function (value) {
                return value as string;
              },
            },
            data: chartData.currentAccumulated,
            itemStyle: {
              color: 'rgba(53,152,238,0.76)',
            },
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
            itemStyle: {
              color: 'rgba(158,112,237,0.75)',
            },
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

export default WeatherChart;
