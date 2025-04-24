import React, { useEffect, useRef, useMemo } from 'react';
import * as echarts from 'echarts';
import { Spin } from 'antd';
import hunanJson from './430000_full.json';

// 城市与localNet代码的映射关系
const CITY_CODE_MAP = {
  长沙市: '0731',
  株洲市: '0733',
  湘潭市: '0732',
  衡阳市: '0734',
  邵阳市: '0739',
  岳阳市: '0730',
  常德市: '0736',
  张家界市: '0744',
  益阳市: '0737',
  郴州市: '0735',
  永州市: '0746',
  怀化市: '0745',
  娄底市: '0738',
  湘西土家族苗族自治州: '0743', // 湘西州
};

// 定义组件props接口
interface MiddleRightMapProps {
  allServiceData?: any[];
  enterpriseData?: any[];
  onCityClick?: (cityData: any) => void;
  loading?: boolean;
  selectedCity?: any | null;
}

const MiddleRightMap: React.FC<MiddleRightMapProps> = ({
  allServiceData = [],
  enterpriseData = [],
  onCityClick,
  loading = false,
  selectedCity = null,
}) => {
  const chartRef = useRef(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);
  const cityDataRef = useRef<any[]>([]);
  const internalSelectedRef = useRef(null);
  const selectedCityName = selectedCity ? selectedCity.name : null;

  // 处理选中状态变化
  useEffect(() => {
    console.log('Map组件收到新的selectedCity:', selectedCity ? selectedCity.name : '无');
    internalSelectedRef.current = selectedCity;
    if (chartInstance.current) {
      updateChartSelection();
    }
  }, [selectedCity]);

  // 计算每个城市的工单数据
  const cityData = useMemo(() => {
    console.log('重新计算城市数据');
    const result = [];

    for (const [cityName, localNetCode] of Object.entries(CITY_CODE_MAP)) {
      // 获取当前城市的全业务数据
      const allServiceRegion = allServiceData.find((item) => item.localNet === localNetCode) || {
        services: [],
      };

      // 计算allService中该城市的count总和
      const allServiceTotal =
        allServiceRegion.services?.reduce((total: any, service: { count: any }) => {
          return total + (service.count || 0);
        }, 0) || 0;

      // 获取当前城市的企业数据
      const enterpriseRegion = enterpriseData.find((item) => item.localNet === localNetCode) || {
        productTypes: [],
      };

      // 计算enterprise中该城市的count和noCnt总和
      const enterpriseTotal =
        enterpriseRegion.productTypes?.reduce((total: any, product: { count: any; noCnt: any }) => {
          return total + (product.count || 0) + (product.noCnt || 0);
        }, 0) || 0;

      // 计算总工单数
      const totalTickets = allServiceTotal + enterpriseTotal;

      // 查找地区名称，用于显示
      const regionName = (
        allServiceRegion.region ||
        enterpriseRegion.region ||
        cityName.replace('市', '')
      ).trim();

      result.push({
        name: cityName,
        value: totalTickets,
        allServiceTotal,
        enterpriseTotal,
        region: regionName,
        localNet: localNetCode,
      });
    }

    // 更新ref中的数据
    cityDataRef.current = result;
    return result;
  }, [allServiceData, enterpriseData]);

  // 处理地图点击事件的函数
  const handleMapClick = (params: echarts.ECElementEvent, chart: echarts.ECharts | null) => {
    if (params.componentType === 'series') {
      const clickedCityName = params.name;
      const clickedCity = cityDataRef.current.find((city) => city.name === clickedCityName);

      console.log('地图点击:', clickedCityName);
      console.log(
        '当前内部选中状态:',
        // @ts-ignore
        internalSelectedRef.current ? internalSelectedRef.current.name : '无',
      );

      // 保存当前点击的城市信息
      const clickInfo = clickedCity ? { ...clickedCity } : null;

      // 检查是否点击当前已选中的城市
      // @ts-ignore
      if (internalSelectedRef.current && internalSelectedRef.current.name === clickedCityName) {
        // 如果点击的是当前已选中的城市，则取消选择
        console.log('取消选择城市:', clickedCityName);

        // 清除内部选中状态
        internalSelectedRef.current = null;

        // 清除地图选中状态
        chart?.dispatchAction({
          type: 'map-unselect',
          seriesIndex: 0,
        });

        // 通知父组件取消选择
        if (onCityClick) {
          onCityClick(null);
        }
      } else {
        // 如果点击了新城市，或者当前没有选中城市
        console.log('选中新城市:', clickedCityName);

        // 更新内部选中状态
        internalSelectedRef.current = clickInfo;

        // 更新地图选中状态
        chart?.dispatchAction({
          type: 'map-unselect',
          seriesIndex: 0,
        });

        chart?.dispatchAction({
          type: 'map-select',
          seriesIndex: 0,
          name: clickedCityName,
        });

        // 通知父组件
        if (clickInfo && onCityClick) {
          onCityClick(clickInfo);
        }
      }
    }
  };

  // 更新图表的选中状态
  const updateChartSelection = () => {
    const chart = chartInstance.current;
    if (!chart) return;

    console.log('更新地图选中状态, 当前选中:', selectedCityName);

    // 先清除所有选中状态
    chart.dispatchAction({
      type: 'map-unselect',
      seriesIndex: 0,
    });

    // 如果有选中的城市，则高亮显示
    if (selectedCityName) {
      console.log('设置地图高亮:', selectedCityName);
      chart.dispatchAction({
        type: 'map-select',
        seriesIndex: 0,
        name: selectedCityName,
      });
    }
  };

  // 初始化图表
  useEffect(() => {
    let chart = chartInstance.current;

    const initChart = () => {
      if (!chartRef.current) return;

      // 如果已经存在图表实例，则销毁它以确保干净的重新创建
      if (chart) {
        chart.dispose();
      }

      // 创建新的图表实例
      chart = echarts.init(chartRef.current);
      chartInstance.current = chart;

      // 直接使用导入的JSON数据，不再使用fetch
      // @ts-ignore
      echarts.registerMap('hunan', hunanJson);

      // 设置图表选项
      const option = {
        title: {
          left: 'right',
        },
        tooltip: {
          trigger: 'item',
          showDelay: 0,
          transitionDuration: 0.2,
          formatter: function (params: { name: any; value: any }) {
            const cityInfo = cityDataRef.current.find((city) => city.name === params.name);
            if (!cityInfo) return `${params.name}<br/>工单总量: ${params.value || 0}`;

            return `
              全业务工单: ${cityInfo.allServiceTotal || 0}<br/>
              政企故障工单: ${cityInfo.enterpriseTotal || 0}
            `;
          },
        },
        visualMap: {
          left: 'right',
          min: 0,
          max: Math.max(...cityData.map((city) => city.value), 100), // 动态设置最大值
          inRange: {
            color: ['#B8E1FF', '#7DAAFF', '#3D76DD', '#0047A5', '#001D70'],
          },
          text: ['高', '低'],
          calculable: true,
        },
        toolbox: {
          show: true,
          left: 'left',
          top: 'top',
          feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {},
          },
        },
        series: [
          {
            name: '湖南省数据',
            type: 'map',
            roam: true,
            map: 'hunan',
            label: {
              show: true,
              fontSize: 12,
              color: '#ffffff',
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 14,
                color: '#000',
              },
            },
            data: cityData,
            itemStyle: {
              areaColor: '#B8E1FF',
              borderColor: '#000000',
              borderWidth: 1,
            },
            aspectScale: 0.85, // 调整地图的宽高比
            layoutCenter: ['50%', '50%'], // 地图居中
            layoutSize: '100%', // 地图大小占满容器
            select: {
              label: {
                show: true,
                color: '#000',
              },
              itemStyle: {
                areaColor: '#FFFF00',
              },
            },
          },
        ],
      };

      chart.setOption(option);

      // 添加点击事件
      chart.on('click', (params) => handleMapClick(params, chart));

      // 设置初始选中状态
      setTimeout(() => {
        updateChartSelection();
      }, 100);
    };

    // 初始化图表
    initChart();

    // 添加响应式调整
    const handleResize = () => {
      if (chartInstance.current) {
        chartInstance.current.resize();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      // 组件卸载时清理
      if (chartInstance.current) {
        chartInstance.current.dispose();
        chartInstance.current = null;
      }
    };
  }, [cityData]); // 移除 selectedCityName 作为依赖项，通过单独的useEffect处理

  if (loading) {
    // 如果已经存在图表实例，则销毁它以确保干净的重新创建
    if (chartInstance.current) {
      chartInstance.current.dispose();
      chartInstance.current = null;
    }
    return (
      <div
        style={{
          width: '100%',
          height: '320px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Spin tip="加载中..." />
      </div>
    );
  }

  return (
    <div
      ref={chartRef}
      style={{
        width: '100%',
        height: '100%', // 改为100%，填充父容器
        flex: 1, // 添加flex:1使其填充可用空间
      }}
    />
  );
};

export default MiddleRightMap;
