import React from 'react';
import { Modal } from 'antd';
import { ProTable } from '@ant-design/pro-components';
import { DataType, dataTypes } from '@/pages/Welcome/Middle/BottomTable/entity/DataType';

interface EnlargedTableProps {
  visible: boolean;
  onClose: () => void;
  data: DataType[];
}

const EnlargedTable: React.FC<EnlargedTableProps> = ({ visible, onClose, data }) => {
  return (
    <Modal
      title={
        <span style={{ color: '#4dabf7', fontSize: '20px', fontWeight: 'bold' }}>
          实时工单信息记录
        </span>
      }
      open={visible}
      onCancel={onClose}
      width="90vw"
      footer={null}
      destroyOnClose
    >
      <ProTable<DataType>
        columns={dataTypes}
        dataSource={data}
        search={false}
        pagination={false}
        bordered
        scroll={{ y: '70vh' }}
        options={false}
      />
    </Modal>
  );
};

export default EnlargedTable;
