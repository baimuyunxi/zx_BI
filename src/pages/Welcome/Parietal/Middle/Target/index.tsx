import React, { useMemo, useEffect } from 'react';
import { Row, Col, Statistic, Card, Spin, Skeleton, Progress } from 'antd';
import type { StatisticProps } from 'antd';
import CountUp from 'react-countup';
import ChartCard from './ChartCard';
import Field from './Field';
import Trend from './Trend';

// 使用 CountUp 组件作为格式化器，保持原代码风格
const formatter: StatisticProps['formatter'] = (value) => (
  <CountUp end={value as number} separator="," />
);

// 定义组件props接口
interface TargetProps {
  allServiceData?: any[];
  enterpriseData?: any[];
  hwEnterprise?: any[];
  hwFullService?: any[];
  hwConRate?: any;
  selectedCity?: any | null;
  loading?: boolean;
}

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 6,
};

const Target: React.FC<TargetProps> = ({
  allServiceData = [],
  enterpriseData = [],
  hwEnterprise = [],
  hwFullService = [],
  hwConRate = {},
  selectedCity = null,
  loading = false,
}) => {
  // 添加日志以便调试
  console.log('Target组件渲染，selectedCity:', selectedCity);
  console.log('hwEnterprise数据:', hwEnterprise);
  console.log('hwFullService数据:', hwFullService);
  console.log('hwConRate数据:', hwConRate);

  // 使用useEffect记录选中状态变化，方便调试
  useEffect(() => {
    console.log('Target组件选中状态变化:', selectedCity);
  }, [selectedCity]);

  // 计算统计数据
  const stats = useMemo(() => {
    // 默认为全部数据
    let filteredAllService = allServiceData;
    let filteredEnterprise = enterpriseData;

    // 用于计算话务量数据的变量
    let selectedHwEnterprise = hwEnterprise;
    let selectedHwFullService = hwFullService;
    let selectedLocalCode = null;

    // 如果选择了城市，则根据localNet过滤数据
    if (selectedCity && selectedCity.localNet) {
      const localNetCode = selectedCity.localNet;
      selectedLocalCode = localNetCode;

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

    // ----- 计算话务量相关数据 -----

    // 1. 计算10009来话数据 (enterprise数据中的最大时间点grandto总和)
    let queue10009 = 0;
    try {
      if (selectedLocalCode) {
        // 选中特定城市时，查找该城市的数据
        const cityData = selectedHwEnterprise.find((city: any) => city.local === selectedLocalCode);
        if (cityData && cityData.marked && cityData.marked.length > 0) {
          // 获取最新时间点的数据
          const latestTimeData = cityData.marked[cityData.marked.length - 1];
          queue10009 = latestTimeData.grandto || 0;
        }
      } else {
        // 未选中城市时，累加所有城市最新时间点的grandto
        queue10009 = selectedHwEnterprise.reduce((total: number, city: any) => {
          if (city.marked && city.marked.length > 0) {
            const latestTimeData = city.marked[city.marked.length - 1];
            return total + (latestTimeData.grandto || 0);
          }
          return total;
        }, 0);
      }
    } catch (error) {
      console.error('计算10009来话数据出错:', error);
    }

    // 2. 计算10000政企来话数据 (fullService数据中最大时间点的grandto总和)
    let allBusinessQueue = 0;
    try {
      if (selectedLocalCode) {
        // 选中特定城市时
        const cityData = selectedHwFullService.find(
          (city: any) => city.local === selectedLocalCode,
        );
        if (cityData && cityData.marked && cityData.marked.length > 0) {
          // 获取最新时间点数据
          const latestTimeData = cityData.marked[cityData.marked.length - 1];

          // 累加该时间点下所有标签的grandto值
          if (latestTimeData.labelSet && latestTimeData.labelSet.length > 0) {
            allBusinessQueue = latestTimeData.labelSet.reduce((sum: number, label: any) => {
              return sum + (label.grandto || 0);
            }, 0);
          }
        }
      } else {
        // 未选中城市时，累加所有城市
        allBusinessQueue = selectedHwFullService.reduce((total: number, city: any) => {
          if (city.marked && city.marked.length > 0) {
            const latestTimeData = city.marked[city.marked.length - 1];

            // 累加该时间点下所有标签的grandto值
            if (latestTimeData.labelSet && latestTimeData.labelSet.length > 0) {
              const cityTotal = latestTimeData.labelSet.reduce((sum: number, label: any) => {
                return sum + (label.grandto || 0);
              }, 0);
              return total + cityTotal;
            }
          }
          return total;
        }, 0);
      }
    } catch (error) {
      console.error('计算10000政企来话数据出错:', error);
    }

    // 3. 总呼入量 = 10009来话 + 10000政企来话
    const inboundCalls = queue10009 + allBusinessQueue;

    // 4. 计算接通率
    let connectionRate = 78; // 默认值
    try {
      if (hwConRate) {
        const { zqTurned = 0, wanTurned = 0, wanCallIn = 0, zqCallIn = 0 } = hwConRate;
        const totalTurned = zqTurned + wanTurned;
        const totalCallIn = wanCallIn + zqCallIn;

        if (totalCallIn > 0) {
          connectionRate = parseFloat(((totalTurned / totalCallIn) * 100).toFixed(2));
        }
      }
    } catch (error) {
      console.error('计算接通率出错:', error);
    }

    // 输出计算结果用于调试
    console.log('计算结果:', {
      allServiceTotal,
      enterpriseTotal,
      totalTickets,
      queue10009,
      allBusinessQueue,
      inboundCalls,
      connectionRate,
    });

    return {
      allServiceTotal,
      enterpriseTotal,
      totalTickets,
      queue10009,
      allBusinessQueue,
      inboundCalls,
      connectionRate,
    };
  }, [allServiceData, enterpriseData, hwEnterprise, hwFullService, hwConRate, selectedCity]);

  return (
    <Spin spinning={loading}>
      {/* 第一行 */}
      <Row gutter={[16, 16]}>
        <Col {...topColResponsiveProps}>
          <ChartCard
            bordered={false}
            title="总呼入量"
            // action={
            //   <Tooltip title="">
            //     <InfoCircleOutlined />
            //   </Tooltip>
            // }
            total={
              loading ? (
                <Skeleton.Input style={{ width: 100 }} active />
              ) : (
                <Statistic value={stats.inboundCalls} formatter={formatter} />
              )
            }
            contentHeight={46}
          />
        </Col>
        <Col {...topColResponsiveProps}>
          <ChartCard
            bordered={false}
            title="10000政企来话"
            // action={
            //   <Tooltip title="">
            //     <InfoCircleOutlined />
            //   </Tooltip>
            // }
            total={
              loading ? (
                <Skeleton.Input style={{ width: 100 }} active />
              ) : (
                <Statistic value={stats.allBusinessQueue} formatter={formatter} />
              )
            }
            contentHeight={46}
          />
        </Col>
        <Col {...topColResponsiveProps}>
          <ChartCard
            bordered={false}
            title="10009来话"
            // action={
            //   <Tooltip title="">
            //     <InfoCircleOutlined />
            //   </Tooltip>
            // }
            total={
              loading ? (
                <Skeleton.Input style={{ width: 100 }} active />
              ) : (
                <Statistic value={stats.queue10009} formatter={formatter} />
              )
            }
            contentHeight={46}
          />
        </Col>
        <Col {...topColResponsiveProps}>
          <ChartCard
            bordered={false}
            title="全省接通率"
            // action={
            //   <Tooltip title="">
            //     <InfoCircleOutlined />
            //   </Tooltip>
            // }
            total={
              loading ? (
                <Skeleton.Input style={{ width: 100 }} active />
              ) : (
                <Statistic value={`${stats.connectionRate}%`} />
              )
            }
            contentHeight={46}
          />
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
            <Statistic
              title={`政企查询/投诉/商机工单`}
              value={stats.allServiceTotal}
              formatter={formatter}
            />
          </Card>
        </Col>
        <Col md={8} sm={12} xs={24}>
          <Card variant="borderless">
            <Statistic title={`政企故障工单`} value={stats.enterpriseTotal} formatter={formatter} />
          </Card>
        </Col>
      </Row>
    </Spin>
  );
};

// @ts-ignore
export default Target;
