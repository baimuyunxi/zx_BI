import React, { useEffect, useRef, useMemo } from 'react';
import * as echarts from 'echarts';
import type { EChartsOption } from 'echarts';
import { Spin } from 'antd';

interface SixTypesLabelProps {
  hwFullService?: any[];
  selectedCity?: any | null;
  loading?: boolean;
  className?: string;
}

const SixTypesLabel: React.FC<SixTypesLabelProps> = ({
                                                       hwFullService = [],
                                                       selectedCity = null,
                                                       loading = false,
                                                     }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  // 处理数据，提取六类标签的数据
  const chartData = useMemo(() => {
    console.log('SixTypesLabel processing data, selectedCity:', selectedCity);
    console.log('hwFullService data:', hwFullService);

    // 初始化结果对象，标签集合将从数据中动态获取
    const result = {
      tagNames: [], // 将从数据中获取
      currentData: [], // 当日数据 - grandto
      previousData: [], // 昨日数据 - lastgrandto
    };

    try {
      // 如果没有数据，返回默认值
      if (!hwFullService || hwFullService.length === 0) {
        return result;
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
          return result;
        }
      }

      // 收集系统中所有可能的标签
      const tagTypesSet = new Set<string>();

      // 首先遍历所有数据，收集所有出现的标签类型
      cityDataList.forEach((city: any) => {
        if (city.marked && city.marked.length > 0) {
          city.marked.forEach((timePoint: any) => {
            if (timePoint.labelSet && timePoint.labelSet.length > 0) {
              timePoint.labelSet.forEach((label: any) => {
                if (label.tag) {
                  tagTypesSet.add(label.tag);
                }
              });
            }
          });
        }
      });

      // 将Set转换为Array
      const tagTypes = Array.from(tagTypesSet);

      // 创建临时对象来存储每个标签的数据
      const tagDataMap = new Map<string, { current: number; previous: number }>();

      // 初始化每个标签的数据
      tagTypes.forEach(tag => {
        tagDataMap.set(tag, { current: 0, previous: 0 });
      });

      // 对每个城市的数据进行处理
      cityDataList.forEach((city: any) => {
        if (city.marked && city.marked.length > 0) {
          // 获取最新时间点的数据（最后一个时间点）
          const latestTimePoint = city.marked[city.marked.length - 1];

          if (latestTimePoint.labelSet && latestTimePoint.labelSet.length > 0) {
            // 遍历该时间点下的所有标签
            latestTimePoint.labelSet.forEach((label: any) => {
              const tagData = tagDataMap.get(label.tag);
              if (tagData) {
                // 使用grandto和lastgrandto而不是cnt和lastCnt
                tagData.current += label.grandto || 0;
                tagData.previous += label.lastgrandto || 0;
              }
            });
          }
        }
      });

      // 将Map转换为数组并按当日量倒序排列
      const sortedTagData = Array.from(tagDataMap.entries())
        .map(([tag, data]) => ({
          tag,
          current: data.current,
          previous: data.previous
        }))
        .sort((a, b) => a.current - b.current); // 按当日量倒序排列

      // 提取排序后的数据
      const sortedTagNames = sortedTagData.map(item => item.tag);
      const sortedCurrentData = sortedTagData.map(item => item.current);
      const sortedPreviousData = sortedTagData.map(item => item.previous);

      // 更新结果对象
      // @ts-ignore
      result.tagNames = sortedTagNames;
      // @ts-ignore
      result.currentData = sortedCurrentData;
      // @ts-ignore
      result.previousData = sortedPreviousData;

      return result;
    } catch (error) {
      console.error('处理六类标签数据时出错:', error);
      return result;
    }
  }, [hwFullService, selectedCity]);

  useEffect(() => {
    // 确保DOM已经渲染
    if (!chartRef.current) return;

    // 初始化图表
    const chart = echarts.init(chartRef.current);

    // 配置项
    const option: EChartsOption = {
      title: {
        text: '标签来话量', // 更改为更通用的标题，因为标签数量可能不是六个
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      legend: {
        right: 0,
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
        data: chartData.tagNames,
      },
      series: [
        {
          name: '当日',
          type: 'bar',
          data: chartData.currentData,
        },
        {
          name: '昨日',
          type: 'bar',
          data: chartData.previousData,
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
  }, [chartData]);

  return (
    <Spin spinning={loading}>
      <div ref={chartRef} style={{ width: '100%', height: '320px' }} />
    </Spin>
  );
};

export default SixTypesLabel;
