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
                                                       loading = false
                                                     }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  // 处理数据，提取六类标签的数据
  const chartData = useMemo(() => {
    console.log('SixTypesLabel processing data, selectedCity:', selectedCity);
    console.log('hwFullService data:', hwFullService);

    // 定义六类标签（与TrafficDataGenerator.java中的TAG_TYPES保持一致）
    const tagTypes = ["校园客户", "行业客户", "商业客户", "要客", "战略客户", "老干部"];

    // 初始化结果对象
    const result = {
      tagNames: tagTypes, // Y轴标签
      currentData: new Array(tagTypes.length).fill(0), // 当日数据 - grandto
      previousData: new Array(tagTypes.length).fill(0) // 昨日数据 - lastgrandto
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

      // 对每个城市的数据进行处理
      cityDataList.forEach((city: any) => {
        if (city.marked && city.marked.length > 0) {
          // 获取最新时间点的数据（最后一个时间点）
          const latestTimePoint = city.marked[city.marked.length - 1];

          if (latestTimePoint.labelSet && latestTimePoint.labelSet.length > 0) {
            // 遍历该时间点下的所有标签
            latestTimePoint.labelSet.forEach((label: any) => {
              // 查找标签在tagTypes中的索引
              const tagIndex = tagTypes.indexOf(label.tag);
              if (tagIndex !== -1) {
                // 使用grandto和lastgrandto而不是cnt和lastCnt
                result.currentData[tagIndex] += (label.grandto || 0);
                result.previousData[tagIndex] += (label.lastgrandto || 0);
              }
            });
          }
        }
      });

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
