import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { Spin } from 'antd';

interface EnterpriseBarChartProps {
  enterpriseData?: any[];
  selectedCity?: any;
  loading?: boolean;
}

const EnterpriseBarChart: React.FC<EnterpriseBarChartProps> = ({
  enterpriseData = [],
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
      let targetData = enterpriseData;
      if (selectedCity) {
        targetData = enterpriseData.filter((item) => item.localNet === selectedCity.localNet);
      }

      // 收集所有产品类型
      const allProducts = new Set<string>();
      targetData.forEach((item) => {
        if (item.productTypes) {
          item.productTypes.forEach((product: { products: string }) => {
            if (product.products) {
              allProducts.add(product.products);
            }
          });
        }
      });

      // 将产品类型转换为数组并排序
      const productArray = Array.from(allProducts).sort();

      // 计算每种产品类型的总数
      const productCountMap = {};
      productArray.forEach((product) => {
        // @ts-ignore
        productCountMap[product] = 0;
        targetData.forEach((item) => {
          if (item.productTypes) {
            const productItem = item.productTypes.find(
              (p: { products: string }) => p.products === product,
            );
            if (productItem) {
              // @ts-ignore
              productCountMap[product] += productItem.count || 0;
            }
          }
        });
      });

      // 生成对应的数据和类型数组
      const xData = productArray;
      // @ts-ignore
      const seriesData = productArray.map((product) => productCountMap[product]);

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
            interval: 0,
            fontSize: 10,
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
            color: '#91cc75',
          },
        },
      ],
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
      // dataZoom: [
      //   {
      //     type: 'inside',
      //     start: 0,
      //     end: 20,
      //   },
      //   {
      //     start: 0,
      //     end: 20,
      //   },
      // ],
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
  }, [enterpriseData, selectedCity]); // 依赖项包括数据和选中城市

  if (loading) {
    if (chartInstance.current) {
      chartInstance.current.dispose();
    }
    return (
      <div
        style={{
          width: '100%',
          height: '420px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Spin tip="加载中..." />
      </div>
    );
  }

  return <div ref={chartRef} style={{ width: '100%', height: '420px' }} />;
};

export default EnterpriseBarChart;
