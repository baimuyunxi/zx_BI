import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import { Spin } from 'antd';
import PopUpTable from '@/pages/Welcome/Drill/OrderPopUp';
import { DetailOrderParams } from '@/pages/Welcome/service';

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

  // 添加状态控制弹窗显示
  const [popupVisible, setPopupVisible] = useState(false);
  // 添加状态存储当前点击的服务类型和查询参数
  const [currentParams, setCurrentParams] = useState<DetailOrderParams>({
    order: 'fault', // 政企故障工单类型为fault
    network: '',
    mold: '',
  });

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

      // 计算每种产品类型的count和noCnt值
      const productCountMap = {};
      const productNoCntMap = {};
      const productTotalMap = {}; // 添加总量映射

      productArray.forEach((product) => {
        // @ts-ignore
        productCountMap[product] = 0;
        // @ts-ignore
        productNoCntMap[product] = 0;
        // @ts-ignore
        productTotalMap[product] = 0;

        targetData.forEach((item) => {
          if (item.productTypes) {
            const productItem = item.productTypes.find(
              (p: { products: string }) => p.products === product,
            );
            if (productItem) {
              const count = productItem.count || 0;
              const noCnt = productItem.noCnt || 0;
              // @ts-ignore
              productCountMap[product] += count;
              // @ts-ignore
              productNoCntMap[product] += noCnt;
              // @ts-ignore
              productTotalMap[product] += count + noCnt;
            }
          }
        });
      });

      // 生成对应的数据和类型数组
      const xData = productArray;
      // @ts-ignore
      const countData = productArray.map((product) => productCountMap[product]);
      // @ts-ignore
      const noCntData = productArray.map((product) => productNoCntMap[product]);
      // @ts-ignore
      const totalData = productArray.map((product) => productTotalMap[product]);

      return {
        xData,
        countData,
        noCntData,
        totalData,
      };
    };

    const { xData, countData, noCntData, totalData } = processData();

    // 添加点击事件处理函数
    const handleBarClick = (params: any) => {
      // 获取点击的柱状图类型（产品类型）
      const productType = xData[params.dataIndex];
      console.log(
        '点击了柱状图:',
        productType,
        '索引:',
        params.dataIndex,
        '系列名:',
        params.seriesName,
      );

      // 设置请求参数
      const requestParams: DetailOrderParams = {
        order: 'fault', // 政企故障工单设置为fault
        network: selectedCity ? selectedCity.localNet : '', // 如果有选中城市，使用其localNet
        mold: productType,
      };

      console.log('发送请求参数:', requestParams);

      // 更新当前参数并显示弹窗
      setCurrentParams(requestParams);
      setPopupVisible(true);
    };

    // 设置图表配置
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      legend: {
        data: ['故障专席受理', '非故障专席受理'],
        top: 0,
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '10%',
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
          name: '故障专席受理',
          type: 'bar',
          stack: 'total',
          emphasis: {
            focus: 'series',
          },
          data: countData,
          // 移除内部标签
          label: {
            show: false,
          },
        },
        {
          name: '非故障专席受理',
          type: 'bar',
          stack: 'total',
          emphasis: {
            focus: 'series',
          },
          data: noCntData,
          // 移除内部标签
          label: {
            show: false,
          },
          // 添加总量标签
          itemStyle: {
            borderRadius: [5, 5, 0, 0], // 顶部圆角
          },
        },
        // 添加标签系列用于显示总量
        {
          name: '总计',
          type: 'custom',
          renderItem: function (
            params: any,
            api: { value: (arg0: number) => any; coord: (arg0: any[]) => any },
          ) {
            const xValue = api.value(0);
            const yValue = api.value(1);

            const location = api.coord([xValue, yValue]);

            return {
              type: 'text',
              style: {
                text: yValue > 0 ? yValue : '',
                x: location[0],
                y: location[1],
                textAlign: 'center',
                textVerticalAlign: 'bottom',
                // textFill: '#333',
                fontSize: 12,
                // fontWeight: 'bold',
              },
            };
          },
          data: totalData.map((value, index) => {
            return [index, value];
          }),
          z: 10,
        },
      ],
    };

    // 设置配置并渲染图表
    chartInstance.current.setOption(option);

    // 注册点击事件
    chartInstance.current.on('click', 'series', handleBarClick);

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
        chartInstance.current.off('click');
        chartInstance.current.dispose();
        chartInstance.current = null;
      }
    };
  }, [enterpriseData, selectedCity]); // 依赖项包括数据和选中城市

  // 处理弹窗关闭
  const handlePopupCancel = () => {
    setPopupVisible(false);
  };

  return (
    <>
      <Spin spinning={loading}>
        <div ref={chartRef} style={{ width: '100%', height: '420px' }} />
      </Spin>

      {/* 工单详情弹窗 */}
      <PopUpTable visible={popupVisible} onCancel={handlePopupCancel} params={currentParams} />
    </>
  );
};

export default EnterpriseBarChart;
