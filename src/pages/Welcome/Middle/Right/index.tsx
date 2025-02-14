import React, { useEffect } from 'react';
import { GaodeMap, Scene } from '@antv/l7';
import { Choropleth } from '@antv/l7plot';

const MapComponent = () => {
  useEffect(() => {
    const scene = new Scene({
      id: 'map',
      map: new GaodeMap({
        style: 'blank',
        // 湖南省中心点坐标
        center: [112.982279, 28.19409],
        zoom: 7,
      }),
    });

    scene.on('loaded', () => {
      fetch(
        'https://gw.alipayobjects.com/os/alisis/geo-data-v0.1.1/administrative-data/area-list.json',
      )
        .then((response) => response.json())
        .then((list) => {
          // 过滤湖南省的城市数据（430000是湖南省的行政区划代码）
          const data = list
            .filter(({ level, parent }) => level === 'city' && parent === 430000)
            .map((item) => ({ ...item, value: Math.random() * 5000 }));

          const choropleth = new Choropleth({
            source: {
              data,
              joinBy: {
                sourceField: 'adcode',
                geoField: 'adcode',
              },
            },
            viewLevel: {
              level: 'province',
              adcode: 430000, // 湖南省
            },
            autoFit: true,
            color: {
              field: 'value',
              value: ['#B8E1FF', '#7DAAFF', '#3D76DD', '#0047A5', '#001D70'],
              scale: { type: 'quantize' },
            },
            style: {
              opacity: 1,
              stroke: '#ccc',
              lineWidth: 0.6,
              lineOpacity: 1,
            },
            label: {
              visible: true,
              field: 'name',
              style: {
                fill: '#000',
                opacity: 0.8,
                fontSize: 12,
                stroke: '#fff',
                strokeWidth: 1.5,
                textAllowOverlap: false,
                padding: [5, 5],
              },
            },
            state: {
              active: { stroke: 'black', lineWidth: 1 },
            },
            tooltip: {
              items: ['name', 'adcode', 'value'],
            },
            zoom: {
              position: 'bottomright',
            },
            legend: {
              position: 'bottomleft',
            },
          });

          choropleth.addToScene(scene);
        });
    });

    return () => {
      scene.destroy();
    };
  }, []);

  return (
    <div
      id="map"
      className="w-full h-192 rounded-lg" // 设置高度为 768px
      style={{
        background: 'rgb(242, 243, 245)',
        minHeight: '768px', // 确保最小高度也设置好
      }}
    />
  );
};

export default MapComponent;
