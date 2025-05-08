import React, { useEffect, useRef, useState } from 'react';
import { Modal, Spin } from 'antd';
import { OrderDetailColumns, OrderDetailType } from '@/pages/Welcome/entity/epithet';
import { ActionType, ProTable } from '@ant-design/pro-components';
import { getDetailsOrder, DetailOrderParams } from '@/pages/Welcome/service';

interface PopUpTableProps {
  visible: boolean;
  onCancel: () => void;
  params: DetailOrderParams;
}

const PopUpTable: React.FC<PopUpTableProps> = (props) => {
  const { visible, onCancel, params } = props;
  const actionRef = useRef<ActionType>();
  const [loading, setLoading] = useState<boolean>(false);
  const [orderData, setOrderData] = useState<OrderDetailType[]>([]);

  // 获取订单详情数据
  const fetchOrderDetails = async () => {
    if (!visible) return;

    setLoading(true);
    try {
      console.log('正在请求工单详情，参数:', params);
      const result = await getDetailsOrder(params);
      console.log('获取工单详情成功:', result);
      if (result && Array.isArray(result.data)) {
        setOrderData(result.data);
      } else {
        setOrderData([]);
      }
    } catch (error) {
      console.error('获取订单详情失败:', error);
      setOrderData([]);
    } finally {
      setLoading(false);
    }
  };

  // 当弹窗显示或参数变化时获取数据
  useEffect(() => {
    if (visible) {
      fetchOrderDetails();
    }
  }, [visible, params]);

  return (
    <Modal
      // title="工单详情"
      width={1200}
      open={visible}
      onCancel={onCancel}
      footer={null}
      destroyOnClose
    >
      <Spin spinning={loading}>
        <ProTable<OrderDetailType>
          headerTitle="工单详情"
          bordered={true}
          columns={OrderDetailColumns}
          actionRef={actionRef}
          dataSource={orderData}
          scroll={{ x: 1300, y: 400 }}
          search={false}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
          }}
          // options={false}
          rowKey="serviceOrderId"
        />
      </Spin>
    </Modal>
  );
};

export default PopUpTable;
