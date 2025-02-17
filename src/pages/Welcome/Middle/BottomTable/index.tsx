import React from 'react';
import { DataType, dataTypes } from '@/pages/Welcome/Middle/BottomTable/entity/DataType';
import { ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import { data } from '@/pages/Welcome/Middle/BottomTable/data';

const BottomTable = () => {
  return (
    <>
      <ProTable<DataType>
        size="small"
        headerTitle={
          <span style={{ color: '#4dabf7', fontSize: '18px', fontWeight: 'bold' }}>
            实时工单信息记录
          </span>
        }
        search={false}
        bordered={true}
        columns={dataTypes}
        dataSource={data}
        scroll={{ y: 200 }}
        pagination={{
          showSizeChanger: true,
        }}
        toolBarRender={() => [
          <Button key="button" onClick={() => {}} type="primary">
            下载
          </Button>,
        ]}
      />
    </>
  );
};

export default BottomTable;
