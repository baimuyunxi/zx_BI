import React from 'react';
import { Row, Col } from 'antd';
import SixTypesLabel from '@/pages/Welcome/LeftStats/FirstFool/SixTypesLabel';
import WeatherChart from '@/pages/Welcome/LeftStats/Sublayer/IncomeTimePeriod';

const LeftStats = () => {
  return (
    <>
      <Row gutter={[0, 16]}>
        <Col span={24}>
          {/*六类标签*/}
          <SixTypesLabel />
        </Col>
        <Col span={24}>
          {/*话务情况*/}
          <WeatherChart />
        </Col>
      </Row>
    </>
  );
};

export default LeftStats;
