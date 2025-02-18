import React from 'react';
import { Row, Col, Card } from 'antd';
import MiddleLeftStats from '@/pages/Welcome/Middle/LeftStats';
import MiddleRightMap from '@/pages/Welcome/Middle/RightMap';
import BottomTable from '@/pages/Welcome/Middle/BottomTable';

const Dashboard = () => {
  return (
    <Row gutter={[16, 16]}>
      {/* LeftStats Column - Reduced from 6 to 5 */}
      <Col span={6}>
        <Row gutter={[0, 16]}>
          <Col span={24}>
            <Card
              title="万号全业务队列"
              headStyle={{ color: '#4dabf7' }}
              bodyStyle={{ padding: '12px' }}
            >
              {/*<div className="h-64 w-full"></div>*/}
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
      </Col>

      {/* Middle Column - Increased from 12 to 14 */}
      <Col span={12}>
        <Row gutter={[0, 16]}>
          <Col span={24}>
            <Card bodyStyle={{ padding: '12px' }}>
              <Row>
                {/* LeftStats stats section - reduced width */}
                <Col span={4}>
                  <MiddleLeftStats />
                </Col>

                {/* RightMap map section - increased width */}
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

      {/* RightMap Column - Reduced from 6 to 5 */}
      <Col span={6}>
        <Row gutter={[0, 16]}>
          <Col span={24}>
            <Card
              title="全业务队列工单"
              className="bg-slate-800 text-blue-400"
              headStyle={{ color: '#4dabf7' }}
              bodyStyle={{ padding: '12px' }}
            >
              <div className="h-64 w-full"></div>
            </Card>
          </Col>
          <Col span={24}>
            <Card
              title="政企工单"
              className="bg-slate-800 text-blue-400"
              headStyle={{ color: '#4dabf7' }}
              bodyStyle={{ padding: '12px' }}
            >
              <div className="h-64 w-full"></div>
            </Card>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Dashboard;
