import React from 'react';
import { Row, Col, Statistic, Card } from 'antd';
import type { StatisticProps } from 'antd';
import CountUp from 'react-countup';

// 使用 CountUp 组件作为格式化器，保持原代码风格
const formatter: StatisticProps['formatter'] = (value) => (
  <CountUp end={value as number} separator="," />
);

const Target: React.FC = () => {
  return (
    <>
      {/* 第一行 */}
      <Row gutter={[16, 16]}>
        <Col md={8} sm={12} xs={24}>
          <Card variant="borderless">
            <Statistic title="呼入总量" value={7600} formatter={formatter} />
          </Card>
        </Col>
        <Col md={8} sm={12} xs={24}>
          <Card variant="borderless">
            <Statistic title="10009队列" value={7700} formatter={formatter} />
          </Card>
        </Col>
        <Col md={8} sm={12} xs={24}>
          <Card variant="borderless">
            <Statistic title="全业务队列" value={39} formatter={formatter} />
          </Card>
        </Col>
      </Row>

      {/* 第二行 */}
      <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
        <Col md={8} sm={12} xs={24}>
          <Card variant="borderless">
            <Statistic title="工单总量" value={127} formatter={formatter} />
          </Card>
        </Col>
        <Col md={8} sm={12} xs={24}>
          <Card variant="borderless">
            <Statistic title="政企工单" value={4} formatter={formatter} />
          </Card>
        </Col>
        <Col md={8} sm={12} xs={24}>
          <Card variant="borderless">
            <Statistic title="全业务工单" value={123} formatter={formatter} />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Target;
