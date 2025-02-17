import { ProColumns } from '@ant-design/pro-components';

export interface DataType {
  LocalNetwork: string; // 本地网
  EmployeeArea: string; // 员工区域
  TheTicketNumber: string; // 工单号
  TheTicketType: string; // 工单类型
  Status: string; // 当前状态
  AssociatedTraffic: string; // 话务关联id
  TheNameOfTheCustomer: string; // 客户名称
  CustomerStarRatings: string; // 客户星级
  CallerID: string; // 来话号码
  BusinessNumber: string; // 业务号码
  ContactNumber: string; // 联系号码
  SourceOfAcceptance: string; //受理来源
  EmployeeID: string; // 员工id
  EmployeeName: string; // 员工名称
  ReceptionHours: string; // 受理时间
  ClosingTime: string; // 办结时间
  ContentsOfAcceptance: string; // 受理内容
  Level1Acceptance: string; // 受理一级
  Level2Acceptance: string; // 受理二级
  Level3Acceptance: string; // 受理三级
  Level4Acceptance: string; // 受理四级
  Level5Acceptance: string; // 受理五级
  Level6Acceptance: string; // 受理六级
}

export const dataTypes: ProColumns<DataType>[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
    align: 'center',
  },
  {
    title: '本地网',
    dataIndex: 'LocalNetwork',
    align: 'center',
    width: 120,
    ellipsis: true,
  },
  {
    title: '员工区域',
    dataIndex: 'EmployeeArea',
    align: 'center',
    width: 120,
    ellipsis: true,
  },
  {
    title: '工单号',
    dataIndex: 'TheTicketNumber',
    align: 'center',
    width: 120,
    ellipsis: true,
    copyable: true,
  },
  {
    title: '工单类型',
    dataIndex: 'TheTicketType',
    align: 'center',
    width: 120,
    ellipsis: true,
  },
  {
    title: '当前状态',
    dataIndex: 'Status',
    align: 'center',
    width: 120,
    ellipsis: true,
  },
  {
    title: '话务关联id',
    dataIndex: 'AssociatedTraffic',
    align: 'center',
    width: 120,
    ellipsis: true,
    copyable: true,
  },
  {
    title: '客户名称',
    dataIndex: 'TheNameOfTheCustomer',
    align: 'center',
    width: 120,
    ellipsis: true,
  },
  {
    title: '客户星级',
    dataIndex: 'CustomerStarRatings',
    align: 'center',
    width: 120,
    ellipsis: true,
  },
  {
    title: '来话号码',
    dataIndex: 'CallerID',
    align: 'center',
    width: 120,
    ellipsis: true,
    copyable: true,
  },
  {
    title: '业务号码',
    dataIndex: 'BusinessNumber',
    align: 'center',
    width: 120,
    ellipsis: true,
    copyable: true,
  },
  {
    title: '联系号码',
    dataIndex: 'ContactNumber',
    align: 'center',
    width: 120,
    ellipsis: true,
    copyable: true,
  },
  {
    title: '受理来源',
    dataIndex: 'SourceOfAcceptance',
    align: 'center',
    width: 120,
    ellipsis: true,
  },
  {
    title: '员工id',
    dataIndex: 'EmployeeID',
    align: 'center',
    width: 120,
    ellipsis: true,
  },
  {
    title: '员工名称',
    dataIndex: 'EmployeeName',
    align: 'center',
    width: 120,
    ellipsis: true,
  },
  {
    title: '受理时间',
    dataIndex: 'ReceptionHours',
    align: 'center',
    width: 120,
    ellipsis: true,
  },
  {
    title: '办结时间',
    dataIndex: 'ClosingTime',
    align: 'center',
    width: 120,
    ellipsis: true,
  },
  {
    title: '受理内容',
    dataIndex: 'ContentsOfAcceptance',
    align: 'center',
    width: 120,
    ellipsis: true,
  },
  {
    title: '受理一级',
    dataIndex: 'Level1Acceptance',
    align: 'center',
    width: 120,
    ellipsis: true,
  },
  {
    title: '受理二级',
    dataIndex: 'Level2Acceptance',
    align: 'center',
    width: 120,
    ellipsis: true,
  },
  {
    title: '受理三级',
    dataIndex: 'Level3Acceptance',
    align: 'center',
    width: 120,
    ellipsis: true,
  },
  {
    title: '受理四级',
    dataIndex: 'Level4Acceptance',
    align: 'center',
    width: 120,
    ellipsis: true,
  },
  {
    title: '受理五级',
    dataIndex: 'Level5Acceptance',
    align: 'center',
    width: 120,
    ellipsis: true,
  },
  {
    title: '受理六级',
    dataIndex: 'Level6Acceptance',
    align: 'center',
    width: 120,
    ellipsis: true,
  },
];
