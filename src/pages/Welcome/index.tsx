import React from 'react';
import { Row, Col, Card } from 'antd';
import MiddleLeft from '@/pages/Welcome/Middle/Left';
import MiddleRight from '@/pages/Welcome/Middle/Right';

const Dashboard = () => {
  return (
    <Row gutter={[16, 16]}>
      {/* Left Column - Reduced from 6 to 5 */}
      <Col span={5}>
        <Row gutter={[0, 16]}>
          <Col span={24}>
            <Card
              title="万号全业务队列"
              headStyle={{ color: '#4dabf7' }}
              bodyStyle={{ padding: '12px' }}
            >
              <div className="h-64 w-full"></div>
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
      <Col span={14} className="px-4">
        <Row gutter={[0, 16]}>
          <Col span={24}>
            <Card bodyStyle={{ padding: '12px' }}>
              <Row>
                {/* Left stats section - reduced width */}
                <Col span={4}>
                  <MiddleLeft />
                </Col>

                {/* Right map section - increased width */}
                <Col span={20}>
                  <MiddleRight />
                </Col>
              </Row>
            </Card>
          </Col>

          <Col span={24}>
            <Card
              title="实时工单信息记录"
              headStyle={{ color: '#4dabf7' }}
              bodyStyle={{ padding: '12px' }}
            ></Card>
          </Col>
        </Row>
      </Col>

      {/* Right Column - Reduced from 6 to 5 */}
      <Col span={5}>
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
