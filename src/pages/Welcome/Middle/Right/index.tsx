import React, { useEffect } from 'react';
import * as echarts from 'echarts';

const HunanMap = () => {
  useEffect(() => {
    setTimeout(() => {
      const chartDom = document.getElementById('hunan-map');
      if (!chartDom) return;

      const myChart = echarts.init(chartDom);
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
                // zoom: 1.0,
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

          myChart.setOption(option);
        })
        .catch((error) => {
          console.error('加载地图数据失败:', error);
          myChart.hideLoading();
        });

      // 添加响应式调整
      const handleResize = () => {
        myChart.resize();
      };
      window.addEventListener('resize', handleResize);

      return () => {
        myChart.dispose();
        window.removeEventListener('resize', handleResize);
      };
    }, 100);
  }, []);

  return (
    <div
      id="hunan-map"
      style={{
        width: '100%',
        height: '710px',
      }}
    />
  );
};

export default HunanMap;
