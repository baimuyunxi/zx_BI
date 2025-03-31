import React from 'react';
import { Row, Col } from 'antd';
import WeatherChart from '@/pages/Welcome/Parietal/Left/Sublayer/IncomeTimePeriod';

const EnStats = () => {
  return (
    <>
      <Row gutter={[0, 16]}>
        <Col span={24}>
          {/*话务情况*/}
          <WeatherChart />
        </Col>
      </Row>
    </>
  );
};

export default EnStats;
