import React from 'react';
import { Row, Col, Card } from 'antd';
import MiddleLeftStats from '@/pages/Welcome/Middle/LeftStats';
import MiddleRightMap from '@/pages/Welcome/Middle/RightMap';
import BottomTable from '@/pages/Welcome/Middle/BottomTable';
import LeftStats from '@/pages/Welcome/Left/fullService';
import MyWordCloud from '@/pages/Welcome/Right/WordCloud';
import StackedBarChart from '@/pages/Welcome/Right/fullService';
import EnterpriseBarChart from '@/pages/Welcome/Right/Enterprise';

const Dashboard = () => {
  // 定义滚动容器的样式，包含隐藏滚动条的CSS
  const scrollableColumnStyle = {
    height: 'calc(100vh - 120px)', // 可根据实际需要调整高度
    overflowY: 'auto',
    overflowX: 'hidden',
    paddingRight: '4px', // 稍微减少右侧padding
    // 隐藏滚动条 - 适用于不同浏览器
    msOverflowStyle: 'none', // IE和Edge
    scrollbarWidth: 'none', // Firefox
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

      <Row gutter={[16, 16]}>
        {/* Left Column - 可滚动，隐藏滚动条 */}
        <Col span={7}>
          <div style={scrollableColumnStyle} className="hide-scrollbar">
            <Row gutter={[0, 16]}>
              <Col span={24}>
                <Card
                  title="万号全业务队列"
                  headStyle={{ color: '#4dabf7' }}
                  bodyStyle={{ padding: '12px' }}
                >
                  <LeftStats />
                </Card>
              </Col>
              <Col span={24}>
                <Card
                  title="10009故障队列"
                  headStyle={{ color: '#4dabf7' }}
                  bodyStyle={{ padding: '12px' }}
                >
                  <div className="h-64 w-full"></div>
                </Card>
              </Col>
            </Row>
          </div>
        </Col>

        {/* Middle Column - 不变 */}
        <Col span={10}>
          <Row gutter={[0, 16]}>
            <Col span={24}>
              <Card>
                <Row>
                  <Col span={4}>
                    <MiddleLeftStats />
                  </Col>
                  <Col span={20}>
                    <MiddleRightMap />
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col span={24}>
              <BottomTable />
            </Col>
          </Row>
        </Col>

        {/* Right Column - 可滚动，隐藏滚动条 */}
        <Col span={7}>
          <div style={scrollableColumnStyle} className="hide-scrollbar">
            <Row gutter={[0, 16]}>
              <Col span={24}>
                <Card
                  title="工单词云"
                  className="bg-slate-800 text-blue-400"
                  headStyle={{ color: '#4dabf7' }}
                  bodyStyle={{ padding: '12px' }}
                >
                  <MyWordCloud />
                </Card>
              </Col>
              <Col span={24}>
                <Card
                  title="全业务队列工单"
                  className="bg-slate-800 text-blue-400"
                  headStyle={{ color: '#4dabf7' }}
                  bodyStyle={{ padding: '12px' }}
                >
                  <StackedBarChart />
                </Card>
              </Col>
              <Col span={24}>
                <Card
                  title="政企故障工单"
                  className="bg-slate-800 text-blue-400"
                  headStyle={{ color: '#4dabf7' }}
                  bodyStyle={{ padding: '12px' }}
                >
                  <EnterpriseBarChart />
                </Card>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
