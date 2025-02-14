import React from 'react';
import { Statistic, Divider } from 'antd';

const MiddleLeft = () => {
  return (
    <>
      <Statistic
        title={<span className="text-gray-400">10009呼入量</span>}
        value={7700}
        valueStyle={{
          fontSize: '28px',
          fontFamily: 'DIN',
          color: '#4dabf7',
          fontWeight: '500',
        }}
      />
      <Divider style={{ borderColor: 'rgba(137,139,143,0.71)', margin: '16px 0' }} />

      <Statistic
        title={<span className="text-gray-400">万号全业务呼入量</span>}
        value={39}
        valueStyle={{
          fontSize: '28px',
          fontFamily: 'DIN',
          color: '#4dabf7',
          fontWeight: '500',
        }}
      />
      <Divider style={{ borderColor: 'rgba(137,139,143,0.71)', margin: '16px 0' }} />

      <Statistic
        title={<span className="text-gray-400">故障工单平均量</span>}
        value={4}
        valueStyle={{
          fontSize: '28px',
          fontFamily: 'DIN',
          color: '#f59f00',
          fontWeight: '500',
        }}
      />
      <Divider style={{ borderColor: 'rgba(137,139,143,0.71)', margin: '16px 0' }} />

      <Statistic
        title={<span className="text-gray-400">投诉工单平均量</span>}
        value={123}
        valueStyle={{
          fontSize: '28px',
          fontFamily: 'DIN',
          color: '#4dabf7',
          fontWeight: '500',
        }}
      />
    </>
  );
};

export default MiddleLeft;
