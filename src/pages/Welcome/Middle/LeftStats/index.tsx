import React from 'react';
import type { StatisticProps } from 'antd';
import { Row, Col, Statistic } from 'antd';
import CountUp from 'react-countup';

const formatter: StatisticProps['formatter'] = (value) => (
  <CountUp end={value as number} separator="," />
);

const MiddleLeftStats = () => {
  return (
    <Row>
      <Col span={24} style={{ width: '100%' }}>
        <div
          style={{
            position: 'relative',
            borderTop: '1px solid #e5e7eb',
            borderBottom: '1px solid #e5e7eb',
            marginBottom: '16px',
            width: '100%',
            padding: '2px 0',
            right: 5,
          }}
        >
          <div
            style={{
              position: 'absolute',
              width: '100%',
              top: '4px',
              left: 0,
            }}
          >
            <div
              style={{
                padding: '4px 12px',
                fontSize: '12px',
                color: '#fff',
                backgroundColor: '#1890ff',
                width: '100%',
                top: '4px',
              }}
            >
              呼入总量
            </div>
          </div>
          <Statistic
            value={7600}
            formatter={formatter}
            valueStyle={{
              fontSize: '21px',
              fontFamily: 'DIN',
              color: '#4dabf7',
              fontWeight: '500',
              width: '100%',
              marginTop: '28px',
            }}
          />
        </div>

        <div
          style={{
            position: 'relative',
            borderTop: '1px solid #e5e7eb',
            borderBottom: '1px solid #e5e7eb',
            marginBottom: '16px',
            width: '100%',
            padding: '2px 0',
            right: 5,
          }}
        >
          <div
            style={{
              position: 'absolute',
              width: '100%',
              top: '4px',
              left: 0,
            }}
          >
            <div
              style={{
                padding: '4px 12px',
                fontSize: '12px',
                color: '#fff',
                backgroundColor: '#1890ff',
                width: '100%',
                top: '4px',
              }}
            >
              10009队列
            </div>
          </div>
          <Statistic
            value={7700}
            formatter={formatter}
            valueStyle={{
              fontSize: '21px',
              fontFamily: 'DIN',
              color: '#4dabf7',
              fontWeight: '500',
              width: '100%',
              marginTop: '28px',
            }}
          />
        </div>

        <div
          style={{
            position: 'relative',
            borderTop: '1px solid #e5e7eb',
            borderBottom: '1px solid #e5e7eb',
            marginBottom: '16px',
            width: '100%',
            padding: '2px 0',
            right: 5,
          }}
        >
          <div
            style={{
              position: 'absolute',
              width: '100%',
              top: '4px',
              left: 0,
            }}
          >
            <div
              style={{
                padding: '4px 12px',
                fontSize: '12px',
                color: '#fff',
                backgroundColor: '#1890ff',
                width: '100%',
                top: '4px',
              }}
            >
              全业务队列
            </div>
          </div>
          <Statistic
            value={39}
            formatter={formatter}
            valueStyle={{
              fontSize: '21px',
              fontFamily: 'DIN',
              color: '#4dabf7',
              fontWeight: '500',
              width: '100%',
              marginTop: '28px',
            }}
          />
        </div>

        <div
          style={{
            position: 'relative',
            borderTop: '1px solid #e5e7eb',
            borderBottom: '1px solid #e5e7eb',
            marginBottom: '16px',
            width: '100%',
            padding: '2px 0',
            right: 5,
          }}
        >
          <div
            style={{
              position: 'absolute',
              width: '100%',
              top: '4px',
              left: 0,
            }}
          >
            <div
              style={{
                padding: '4px 12px',
                fontSize: '12px',
                color: '#fff',
                backgroundColor: '#1890ff',
                width: '100%',
                top: '4px',
              }}
            >
              政企工单
            </div>
          </div>
          <Statistic
            value={4}
            formatter={formatter}
            valueStyle={{
              fontSize: '21px',
              fontFamily: 'DIN',
              color: '#f59f00',
              fontWeight: '500',
              width: '100%',
              marginTop: '28px',
            }}
          />
        </div>

        <div
          style={{
            position: 'relative',
            borderTop: '1px solid #e5e7eb',
            borderBottom: '1px solid #e5e7eb',
            marginBottom: '16px',
            width: '100%',
            padding: '2px 0',
            right: 5,
          }}
        >
          <div
            style={{
              position: 'absolute',
              width: '100%',
              top: '4px',
              left: 0,
            }}
          >
            <div
              style={{
                padding: '4px 12px',
                fontSize: '12px',
                color: '#fff',
                backgroundColor: '#1890ff',
                width: '100%',
                top: '4px',
              }}
            >
              全业务工单
            </div>
          </div>
          <Statistic
            value={123}
            formatter={formatter}
            valueStyle={{
              fontSize: '21px',
              fontFamily: 'DIN',
              color: '#4dabf7',
              fontWeight: '500',
              width: '100%',
              marginTop: '28px',
            }}
          />
        </div>
      </Col>
    </Row>
  );
};

export default MiddleLeftStats;
