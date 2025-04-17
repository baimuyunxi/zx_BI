import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Row, Col, Card, FloatButton } from 'antd';
import { getWelcomeData } from './service'; // 导入刚刚创建的函数
import MiddleRightMap from '@/pages/Welcome/Parietal/Middle/Map';
import LeftStats from '@/pages/Welcome/Parietal/Left/fullService';
import MyWordCloud from '@/pages/Welcome/Parietal/Right/WordCloud';
import StackedBarChart from '@/pages/Welcome/Parietal/Right/fullService';
import EnterpriseBarChart from '@/pages/Welcome/Parietal/Right/Enterprise';
import Target from '@/pages/Welcome/Parietal/Middle/Target';
import EnStats from '@/pages/Welcome/Parietal/Left/enterprise';
import TopList from '@/pages/Welcome/TopTable';
import { SyncOutlined } from '@ant-design/icons';

const Dashboard = () => {
  // 添加状态来存储数据
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  // 添加状态来存储选中的地市
  const [selectedCity, setSelectedCity] = useState(null);
  // 添加计数器状态，用于强制更新Target组件
  const [renderCount, setRenderCount] = useState(0);
  // 使用ref保存上一次选中的城市，用于比较
  const prevSelectedCityRef = useRef(null);

  // 获取数据的函数
  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const data = await getWelcomeData();
      setDashboardData(data);
      // 重置选中的地市
      setSelectedCity(null);
      prevSelectedCityRef.current = null;
      // 增加渲染计数，强制重新渲染
      setRenderCount((prev) => prev + 1);
    } catch (error) {
      console.error('获取Dashboard数据失败:', error);
    } finally {
      setLoading(false);
    }
  };

  // 初始加载和刷新按钮的回调
  useEffect(() => {
    fetchDashboardData();
  }, []);

  // 处理刷新按钮点击
  const handleRefresh = () => {
    fetchDashboardData();
  };

  // 处理地图城市点击事件
  const handleCityClick = useCallback(
    (cityData: React.SetStateAction<null>) => {
      console.log('Dashboard收到点击事件:', cityData ? cityData.name : '取消选择');
      // @ts-ignore
      console.log('当前选中城市:', selectedCity ? selectedCity.name : '无');
      console.log(
        '上一次选中城市:',
        // @ts-ignore
        prevSelectedCityRef.current ? prevSelectedCityRef.current.name : '无',
      );

      // 检查是否点击的是已选中的城市
      if (cityData === null) {
        // 如果传入null，意味着清除选择
        console.log('清除选择');
        setSelectedCity(null);
        prevSelectedCityRef.current = null;
        // @ts-ignore
      } else if (selectedCity && selectedCity.name === cityData.name) {
        // 如果点击的是当前已选中的城市，取消选择
        console.log('取消选中当前城市');
        setSelectedCity(null);
        prevSelectedCityRef.current = null;
      } else {
        // 选择新城市
        console.log('选择新城市:', cityData.name);
        setSelectedCity(cityData);
        // @ts-ignore
        prevSelectedCityRef.current = cityData;
      }

      // 增加渲染计数，强制Target组件重新渲染
      setRenderCount((prev) => prev + 1);
    },
    [selectedCity],
  );

  // 输出调试信息
  useEffect(() => {
    // @ts-ignore
    console.log('Dashboard组件更新，selectedCity:', selectedCity ? selectedCity.name : '无');
    console.log('renderCount:', renderCount);
  }, [selectedCity, renderCount]);

  // 定义整体高度常量，保证各列一致
  const columnHeight = 'calc(100vh - 120px)';

  // 定义滚动容器的样式，包含隐藏滚动条的CSS
  const scrollableColumnStyle = {
    height: columnHeight, // 使用统一的高度变量
    overflowY: 'auto',
    overflowX: 'hidden',
    paddingRight: '4px', // 稍微减少右侧padding
    // 隐藏滚动条 - 适用于不同浏览器
    msOverflowStyle: 'none', // IE和Edge
    scrollbarWidth: 'none', // Firefox
  };

  // 中间列样式，固定高度和弹性布局
  const middleColumnStyle = {
    height: columnHeight, // 使用统一的高度变量
    display: 'flex',
    flexDirection: 'column',
  };

  // 地图容器样式，使用flex-grow使其填充剩余空间
  const mapContainerStyle = {
    flex: 1, // 填充剩余空间
    marginTop: '16px',
    display: 'flex',
    flexDirection: 'column',
  };

  // 地图Card样式
  const mapCardStyle = {
    height: '100%', // 填充整个容器高度
    display: 'flex',
    flexDirection: 'column',
  };

  // 地图Card的body样式
  const mapCardBodyStyle = {
    padding: '12px',
    flex: 1, // 填充Card的剩余空间
    display: 'flex',
  };

  // 添加内联样式来隐藏Webkit浏览器的滚动条(Chrome, Safari)
  const hideScrollbarCSS = `
    .hide-scrollbar::-webkit-scrollbar {
      display: none;
    }
  `;

  // 为Target生成唯一的key，确保在选中状态变化时强制重新渲染
  // @ts-ignore
  const targetKey = `target-${selectedCity ? selectedCity.localNet : 'all'}-${renderCount}`;
  console.log('生成的Target Key:', targetKey);

  return (
    <>
      {/* 添加内联样式标签 */}
      <style>{hideScrollbarCSS}</style>

      <Row gutter={[16, 16]}>
        {/* Left Column - 可滚动，隐藏滚动条 */}
        <Col span={7}>
          {/* @ts-ignore*/}
          <div style={scrollableColumnStyle} className="hide-scrollbar">
            <Row gutter={[0, 16]}>
              <Col span={24}>
                <Card title="万号全业务队列" bodyStyle={{ padding: '12px' }}>
                  <LeftStats />
                </Card>
              </Col>
              <Col span={24}>
                <Card title="10009故障队列">
                  <EnStats />
                </Card>
              </Col>
            </Row>
          </div>
        </Col>

        {/* Middle Column - 使用弹性布局 */}
        <Col span={10}>
          {/* @ts-ignore*/}
          <div style={middleColumnStyle}>
            {/* Target 组件区域 */}
            <div>
              <Target
                // @ts-ignore
                allServiceData={dashboardData?.allService || []}
                // @ts-ignore
                enterpriseData={dashboardData?.enterprise || []}
                selectedCity={selectedCity}
                loading={loading}
                key={targetKey} // 使用复合key确保重新渲染
              />
            </div>

            {/* 地图区域 - 使用flex:1填充剩余空间 */}
            {/* @ts-ignore*/}
            <div style={mapContainerStyle}>
              {/* @ts-ignore*/}
              <Card style={mapCardStyle} bodyStyle={mapCardBodyStyle}>
                <MiddleRightMap
                  // @ts-ignore
                  allServiceData={dashboardData?.allService || []}
                  // @ts-ignore
                  enterpriseData={dashboardData?.enterprise || []}
                  onCityClick={handleCityClick}
                  loading={loading}
                  selectedCity={selectedCity} // 添加selectedCity属性，确保地图组件知道当前选中的城市
                />
              </Card>
            </div>
          </div>
        </Col>

        {/* Right Column - 可滚动，隐藏滚动条 */}
        <Col span={7}>
          {/* @ts-ignore*/}
          <div style={scrollableColumnStyle} className="hide-scrollbar">
            <Row gutter={[0, 16]}>
              <Col span={24}>
                <Card title="工单词云" bodyStyle={{ padding: '12px' }}>
                  {/* 传递词云数据 */}
                  {/* @ts-ignore*/}
                  <MyWordCloud wordCloudData={dashboardData?.wordClouds || []} loading={loading} />
                </Card>
              </Col>
              <Col span={24}>
                <Card title="全业务队列工单" bodyStyle={{ padding: '12px' }}>
                  {/* 传递全业务数据和选中城市 */}
                  <StackedBarChart
                    // @ts-ignore
                    allServiceData={dashboardData?.allService || []}
                    selectedCity={selectedCity}
                    loading={loading}
                  />
                </Card>
              </Col>
              <Col span={24}>
                <Card title="政企故障工单" bodyStyle={{ padding: '12px' }}>
                  {/* 传递政企故障数据和选中城市 */}
                  <EnterpriseBarChart
                    // @ts-ignore
                    enterpriseData={dashboardData?.enterprise || []}
                    selectedCity={selectedCity}
                    loading={loading}
                  />
                </Card>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ paddingTop: '16px' }}>
        <Col span={24}>
          {/* 传递TopList所需的gridTop数据 */}
          {/* @ts-ignore*/}
          <TopList gridTopData={dashboardData?.gridTop || {}} loading={loading} />
        </Col>
      </Row>
      <FloatButton icon={<SyncOutlined />} onClick={handleRefresh} tooltip="刷新数据" />
    </>
  );
};

export default Dashboard;
