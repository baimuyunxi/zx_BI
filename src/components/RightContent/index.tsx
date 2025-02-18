import { QuestionCircleOutlined } from '@ant-design/icons';
import { SelectLang as UmiSelectLang } from '@umijs/max';
import React, { useState, useEffect } from 'react';

export type SiderTheme = 'light' | 'dark';

// 数字时钟组件
export const DigitalClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // 每秒更新一次时间
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // 组件卸载时清除定时器
    return () => {
      clearInterval(timer);
    };
  }, []);

  // 格式化时间，确保两位数显示
  const formatNumber = (num) => {
    return num.toString().padStart(2, '0');
  };

  const year = time.getFullYear();
  const month = formatNumber(time.getMonth() + 1);
  const day = formatNumber(time.getDate());
  const hours = formatNumber(time.getHours());
  const minutes = formatNumber(time.getMinutes());
  const seconds = formatNumber(time.getSeconds());

  return (
    <div
      className="digital-clock"
      style={{
        fontSize: '22px',
        fontWeight: 'bold',
        marginRight: '20px',
        display: 'flex',
        alignItems: 'center',
        fontStyle: 'italic',
        color: '#9cb4ef',
      }}
    >
      {year}-{month}-{day} {hours}:{minutes}:{seconds}
    </div>
  );
};

export const SelectLang = () => {
  return <UmiSelectLang />;
};

export const Question = () => {
  return (
    <div
      style={{
        display: 'flex',
        height: 26,
      }}
      onClick={() => {
        window.open('https://pro.ant.design/docs/getting-started');
      }}
    >
      <QuestionCircleOutlined />
    </div>
  );
};
