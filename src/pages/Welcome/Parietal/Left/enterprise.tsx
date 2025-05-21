import React from 'react';
import { Row, Col } from 'antd';
import EnterpriseChart from '@/pages/Welcome/Parietal/Left/enterprise/EnterpriseChart';

// 定义组件props接口
interface EnStatsProps {
  hwEnterprise?: any[];
  selectedCity?: any | null;
  loading?: boolean;
}

const EnStats: React.FC<EnStatsProps> = ({
  hwEnterprise = [],
  selectedCity = null,
  loading = false,
}) => {
  return (
    <>
      <Row gutter={[0, 16]}>
        <Col span={24}>
          {/*话务情况*/}
          <EnterpriseChart
            // @ts-ignore
            hwEnterprise={hwEnterprise}
            selectedCity={selectedCity}
            loading={loading}
          />
        </Col>
      </Row>
    </>
  );
};

export default EnStats;
