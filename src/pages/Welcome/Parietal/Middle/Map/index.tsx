import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const MiddleRightMap = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    let myChart: echarts.ECharts | null = null;

    const initChart = () => {
      if (chartRef.current) {
        myChart = echarts.init(chartRef.current);
        myChart.showLoading();

        const cities = [
          { name: '长沙市', value: Math.random() * 5000 },
          { name: '株洲市', value: Math.random() * 5000 },
          { name: '湘潭市', value: Math.random() * 5000 },
          { name: '衡阳市', value: Math.random() * 5000 },
          { name: '邵阳市', value: Math.random() * 5000 },
          { name: '岳阳市', value: Math.random() * 5000 },
          { name: '常德市', value: Math.random() * 5000 },
          { name: '张家界市', value: Math.random() * 5000 },
          { name: '益阳市', value: Math.random() * 5000 },
          { name: '郴州市', value: Math.random() * 5000 },
          { name: '永州市', value: Math.random() * 5000 },
          { name: '怀化市', value: Math.random() * 5000 },
          { name: '娄底市', value: Math.random() * 5000 },
          { name: '湘西土家族苗族自治州', value: Math.random() * 5000 },
        ];

        fetch('https://geo.datav.aliyun.com/areas_v3/bound/430000_full.json')
          .then((response) => response.json())
          .then((hunanJson) => {
            // @ts-ignore
            myChart.hideLoading();

            echarts.registerMap('hunan', hunanJson);

            const option = {
              title: {
                left: 'right',
              },
              tooltip: {
                trigger: 'item',
                showDelay: 0,
                transitionDuration: 0.2,
                formatter: '{b}<br/>值: {c}',
              },
              visualMap: {
                left: 'right',
                min: 0,
                max: 5000,
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
                  data: cities,
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
                      color: '#fff',
                    },
                    itemStyle: {
                      areaColor: '#3D76DD',
                    },
                  },
                },
              ],
            };

            // @ts-ignore
            myChart.setOption(option);
          })
          .catch((error) => {
            console.error('加载地图数据失败:', error);
            // @ts-ignore
            myChart.hideLoading();
          });
      }
    };

    // 添加响应式调整
    const handleResize = () => {
      if (myChart) {
        myChart.resize();
      }
    };

    // 短暂延迟初始化，确保DOM已完全渲染
    const timer = setTimeout(() => {
      initChart();
      window.addEventListener('resize', handleResize);
    }, 100);

    return () => {
      clearTimeout(timer);
      if (myChart) {
        myChart.dispose();
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
