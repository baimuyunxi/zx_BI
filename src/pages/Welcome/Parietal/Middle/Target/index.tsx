import React, { useMemo, useEffect } from 'react';
import { Row, Col, Statistic, Card, Spin } from 'antd';
import type { StatisticProps } from 'antd';
import CountUp from 'react-countup';

// 使用 CountUp 组件作为格式化器，保持原代码风格
const formatter: StatisticProps['formatter'] = (value) => (
  <CountUp end={value as number} separator="," />
);

// 定义组件props接口
interface TargetProps {
  allServiceData?: any[];
  enterpriseData?: any[];
  selectedCity?: any | null;
  loading?: boolean;
}

const Target: React.FC<TargetProps> = ({
  allServiceData = [],
  enterpriseData = [],
  selectedCity = null,
  loading = false,
}) => {
  // 添加日志以便调试
  console.log('Target组件渲染，selectedCity:', selectedCity);

  // 使用useEffect记录选中状态变化，方便调试
  useEffect(() => {
    console.log('Target组件选中状态变化:', selectedCity);
  }, [selectedCity]);

  // 计算统计数据
  const stats = useMemo(() => {
    // 默认为全部数据
    let filteredAllService = allServiceData;
    let filteredEnterprise = enterpriseData;

    // 如果选择了城市，则根据localNet过滤数据
    if (selectedCity && selectedCity.localNet) {
      const localNetCode = selectedCity.localNet;
      filteredAllService = allServiceData.filter((item) => item.localNet === localNetCode);
      filteredEnterprise = enterpriseData.filter((item) => item.localNet === localNetCode);

      console.log('已过滤数据，城市:', selectedCity.region, '代码:', localNetCode);
    } else {
      console.log('使用所有地市数据');
    }

    // 计算全业务工单总数
    const allServiceTotal = filteredAllService.reduce((total, region) => {
      return (
        total +
        (region.services?.reduce(
          (sum: any, service: { count: any }) => sum + (service.count || 0),
          0,
        ) || 0)
      );
    }, 0);

    // 计算政企故障工单总数 - 更新为包含count和noCnt的总和
    const enterpriseTotal = filteredEnterprise.reduce((total, region) => {
      return (
        total +
        (region.productTypes?.reduce(
          (sum: any, product: { count: any; noCnt: any }) =>
            sum + (product.count || 0) + (product.noCnt || 0),
          0,
        ) || 0)
      );
    }, 0);

    // 计算总工单数
    const totalTickets = allServiceTotal + enterpriseTotal;

    // 输出计算结果用于调试
    console.log('计算结果:', { allServiceTotal, enterpriseTotal, totalTickets });

    return {
      allServiceTotal,
      enterpriseTotal,
      totalTickets,
      // 以下是默认数据
      inboundCalls: 7600,
      queue10009: 7700,
      allBusinessQueue: 39,
    };
  }, [allServiceData, enterpriseData, selectedCity]);

  return (
    <Spin spinning={loading}>
      {/* 第一行 */}
      <Row gutter={[16, 16]}>
        <Col md={8} sm={12} xs={24}>
          <Card variant="borderless">
            <Statistic title="呼入总量" value={stats.inboundCalls} formatter={formatter} />
          </Card>
        </Col>
        <Col md={8} sm={12} xs={24}>
          <Card variant="borderless">
            <Statistic title="10009来话" value={stats.queue10009} formatter={formatter} />
          </Card>
        </Col>
        <Col md={8} sm={12} xs={24}>
          <Card variant="borderless">
            <Statistic title="10000政企来话" value={stats.allBusinessQueue} formatter={formatter} />
          </Card>
        </Col>
      </Row>

      {/* 第二行 */}
      <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
        <Col md={8} sm={12} xs={24}>
          <Card variant="borderless">
            <Statistic title={`工单总量`} value={stats.totalTickets} formatter={formatter} />
          </Card>
        </Col>
        <Col md={8} sm={12} xs={24}>
          <Card variant="borderless">
            <Statistic title={`政企故障工单`} value={stats.enterpriseTotal} formatter={formatter} />
          </Card>
        </Col>
        <Col md={8} sm={12} xs={24}>
          <Card variant="borderless">
            <Statistic
              title={`政企查询/投诉/商机工单`}
              value={stats.allServiceTotal}
              formatter={formatter}
            />
          </Card>
        </Col>
      </Row>
    </Spin>
  );
};

export default Target;
