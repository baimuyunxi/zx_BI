import React, { useRef } from 'react';
import { Modal } from 'antd';
import { OrderDetailColumns, OrderDetailType } from '@/pages/Welcome/entity/epithet';
import { ActionType, ProTable } from '@ant-design/pro-components';


const PopUpTable:React.FC<any> = (props) => {
  const actionRef = useRef<ActionType>();

  return (
    <>
      <Modal>
        <ProTable<OrderDetailType>
          bordered={true}
          columns={OrderDetailColumns}
          actionRef={actionRef}
          scroll={{ x: 1300 }}
          search={{
            optionRender: false,
            collapsed: false,
          }}
        />
      </Modal>
    </>
  )
}

export default PopUpTable;
