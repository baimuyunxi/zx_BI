import React from 'react';
import { Row, Col } from 'antd';
import SixTypesLabel from '@/pages/Welcome/Parietal/Left/FirstFool/SixTypesLabel';
import WeatherChart from '@/pages/Welcome/Parietal/Left/Sublayer/IncomeTimePeriod';

// 定义组件props接口
interface LeftStatsProps {
  hwFullService?: any[];
  selectedCity?: any | null;
  loading?: boolean;
}

const LeftStats: React.FC<LeftStatsProps> = ({
  hwFullService = [],
  selectedCity = null,
  loading = false,
}) => {
  return (
    <>
      <Row gutter={[0, 16]}>
        <Col span={24}>
          {/*六类标签*/}
          <SixTypesLabel
            // @ts-ignore
            hwFullService={hwFullService}
            selectedCity={selectedCity}
            loading={loading}
          />
        </Col>
        <Col span={24}>
          {/*话务情况*/}
          <WeatherChart
            // @ts-ignore
            hwFullService={hwFullService}
            selectedCity={selectedCity}
            loading={loading}
          />
        </Col>
      </Row>
    </>
  );
};

export default LeftStats;
