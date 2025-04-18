import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { Spin } from 'antd';

interface StackedBarChartProps {
  allServiceData?: any[];
  selectedCity?: any;
  loading?: boolean;
}

const StackedBarChart: React.FC<StackedBarChartProps> = ({
  allServiceData = [],
  selectedCity = null,
  loading = false,
}) => {
  const chartRef = useRef(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // 如果实例已存在，先销毁
    if (chartInstance.current) {
      chartInstance.current.dispose();
    }

    // 创建新的图表实例
    chartInstance.current = echarts.init(chartRef.current);

    // 准备数据
    const processData = () => {
      // 如果选中了城市，只展示该城市的数据
      let targetData = allServiceData;
      if (selectedCity) {
        targetData = allServiceData.filter((item) => item.localNet === selectedCity.localNet);
      }

      // 收集所有服务类型
      const allTypes = new Set<string>();
      targetData.forEach((item) => {
        if (item.services) {
          item.services.forEach((service: { type: string }) => {
            if (service.type) {
              allTypes.add(service.type);
            }
          });
        }
      });

      // 将类型转换为数组并排序
      const typeArray = Array.from(allTypes).sort();

      // 计算每种类型的总数
      const typeCountMap = {};
      typeArray.forEach((type) => {
        // @ts-ignore
        typeCountMap[type] = 0;
        targetData.forEach((item) => {
          if (item.services) {
            const serviceItem = item.services.find((s: { type: string }) => s.type === type);
            if (serviceItem) {
              // @ts-ignore
              typeCountMap[type] += serviceItem.count || 0;
            }
          }
        });
      });

      // 生成对应的数据和类型数组
      const xData = typeArray;
      // @ts-ignore
      const seriesData = typeArray.map((type) => typeCountMap[type]);

      return {
        xData,
        seriesData,
      };
    };

    const { xData, seriesData } = processData();

    // 设置图表配置
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          data: xData,
          axisLabel: {
            rotate: 45,
            fontSize: 12,
            interval: 0, // 强制显示所有标签
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
          name: '工单数量',
          type: 'bar',
          stack: 'Ad',
          emphasis: {
            focus: 'series',
          },
          data: seriesData,
          itemStyle: {
            color: '#5470c6',
          },
          // 添加标签显示数值
          label: {
            show: true,
            position: 'top',
            // formatter: '{c}',
            fontSize: 12,
            color: '#333',
            // 当数值为0时不显示标签
            formatter: function (params: { value: number }) {
              return params.value > 0 ? params.value : '';
            },
          },
          // 确保所有柱状图宽度合适
          barWidth: '50%',
          // 设置最小高度，避免小值时看不清
          barMinHeight: 2,
        },
      ],
    };

    // 设置配置并渲染图表
    chartInstance.current.setOption(option);

    // 处理窗口大小变化时的自适应
    const handleResize = () => {
      if (chartInstance.current) {
        chartInstance.current.resize();
      }
    };

    window.addEventListener('resize', handleResize);

    // 组件卸载时清理
    return () => {
      window.removeEventListener('resize', handleResize);
      if (chartInstance.current) {
        chartInstance.current.dispose();
        chartInstance.current = null;
      }
    };
  }, [allServiceData, selectedCity]); // 依赖项包括数据和选中城市

  if (loading) {
    // 如果实例已存在，先销毁
    if (chartInstance.current) {
      chartInstance.current.dispose();
    }
    return (
      <div
        style={{
          width: '100%',
          height: '340px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Spin tip="加载中..." />
      </div>
    );
  }

  return <div ref={chartRef} style={{ width: '100%', height: '340px' }} />;
};

export default StackedBarChart;
