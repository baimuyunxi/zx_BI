import React from 'react';
import { Row, Col, Card } from 'antd';
import MiddleRightMap from '@/pages/Welcome/Parietal/Middle/Map';
import LeftStats from '@/pages/Welcome/Parietal/Left/fullService';
import MyWordCloud from '@/pages/Welcome/Parietal/Right/WordCloud';
import StackedBarChart from '@/pages/Welcome/Parietal/Right/fullService';
import EnterpriseBarChart from '@/pages/Welcome/Parietal/Right/Enterprise';
import Target from '@/pages/Welcome/Parietal/Middle/Target';
import EnStats from '@/pages/Welcome/Parietal/Left/enterprise';

const Dashboard = () => {
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

  return (
    <>
      {/* 添加内联样式标签 */}
      <style>{hideScrollbarCSS}</style>

      <Row>
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
                <Target />
              </div>

              {/* 地图区域 - 使用flex:1填充剩余空间 */}
              {/* @ts-ignore*/}
              <div style={mapContainerStyle}>
                {/* @ts-ignore*/}
                <Card style={mapCardStyle} bodyStyle={mapCardBodyStyle}>
                  <MiddleRightMap />
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
                    <MyWordCloud />
                  </Card>
                </Col>
                <Col span={24}>
                  <Card title="全业务队列工单" bodyStyle={{ padding: '12px' }}>
                    <StackedBarChart />
                  </Card>
                </Col>
                <Col span={24}>
                  <Card title="政企故障工单" bodyStyle={{ padding: '12px' }}>
                    <EnterpriseBarChart />
                  </Card>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Row>
    </>
  );
};

export default Dashboard;
