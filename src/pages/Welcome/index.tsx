import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Row, Col, Card, FloatButton } from 'antd';
import { getWelcomeData, getTrafficData } from './service'; // 导入刚刚创建的函数
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
  const [trafficData, setTrafficData] = useState(null);
  const [loading, setLoading] = useState(true);
  // 添加状态来存储选中的地市
  const [selectedCity, setSelectedCity] = useState(null);
  // 添加计数器状态，用于强制更新Target组件
  const [renderCount, setRenderCount] = useState(0);
  // 使用ref保存上一次选中的城市，用于比较
  const prevSelectedCityRef = useRef(null);
  // 使用ref来存储定时器ID，便于清理
  const timerRef = useRef(null);
  // 使用ref记录上次刷新时间，避免重复刷新
  const lastRefreshTimeRef = useRef(0);

  // 获取数据的函数
  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      console.log('开始获取Dashboard数据...');
      const data = await getWelcomeData();
      const traffic = await getTrafficData();
      setDashboardData(data);
      setTrafficData(traffic);
      // 重置选中的地市
      setSelectedCity(null);
      prevSelectedCityRef.current = null;
      // 增加渲染计数，强制重新渲染
      setRenderCount((prev) => prev + 1);
      // 更新最后刷新时间
      lastRefreshTimeRef.current = Date.now();
      console.log('Dashboard数据获取成功，时间:', new Date().toLocaleTimeString());
    } catch (error) {
      console.error('获取Dashboard数据失败:', error);
    } finally {
      setLoading(false);
    }
  };

  // 检查是否应该自动刷新的函数
  const checkAutoRefresh = useCallback(() => {
    const now = new Date();
    const minute = now.getMinutes();

    // 检查当前分钟是否是5的倍数
    if (minute % 5 === 0) {
      // 确保在同一分钟内不会重复刷新
      const currentTime = Date.now();
      if (currentTime - lastRefreshTimeRef.current > 4 * 60 * 1000) {
        // 至少间隔4分钟
        console.log('自动刷新触发，当前时间:', now.toLocaleTimeString());
        fetchDashboardData();
      }
    }
  }, []);

  // 初始加载和设置自动刷新
  useEffect(() => {
    // 初始加载数据
    fetchDashboardData();

    // 设置定时器，每分钟检查一次是否需要刷新
    // @ts-ignore
    timerRef.current = setInterval(() => {
      checkAutoRefresh();
    }, 60 * 1000); // 每分钟检查一次

    // 立即进行一次检查，以防初始加载时正好是刷新时间
    checkAutoRefresh();

    // 清理函数
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [checkAutoRefresh]);

  // 页面可见性变化检测 - 当页面从隐藏变为可见时，检查是否需要刷新
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        console.log('页面变为可见，检查是否需要刷新');
        checkAutoRefresh();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [checkAutoRefresh]);

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
                <Card title="10000政企来话">
                  <LeftStats
                    // @ts-ignore
                    hwFullService  = {trafficData?.fullService || []}
                    selectedCity={selectedCity}
                    loading={loading}
                  />
                </Card>
              </Col>
              <Col span={24}>
                <Card title="10009来话">
                  <EnStats
                    // @ts-ignore
                    hwEnterprise = {trafficData?.enterprise || []}
                    selectedCity={selectedCity}
                    loading={loading}
                  />
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
                // @ts-ignore
                hwEnterprise = {trafficData?.enterprise || []}
                // @ts-ignore
                hwFullService  = {trafficData?.fullService || []}
                // @ts-ignore
                hwConRate = {trafficData?.conRate || []}
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
                  // @ts-ignore
                  hwEnterprise = {trafficData?.enterprise || []}
                  // @ts-ignore
                  hwFullService  = {trafficData?.fullService || []}
                  // @ts-ignore
                  hwConRate = {trafficData?.conRate || []}
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
                <Card title="政企查询/投诉/商机工单" bodyStyle={{ padding: '12px' }}>
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
