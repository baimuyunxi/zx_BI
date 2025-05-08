import type { ProColumns } from '@ant-design/pro-components';

export interface OrderDetailType {
  /**
   * 本地网
   */
  regionName: string;

  /**
   * 工单号
   */
  serviceOrderId: string;

  /**
   * 编号
   */
  orderVesion: string;

  /**
   * 工单类型
   */
  serviceTypeDesc: string;

  /**
   * 主叫号码
   */
  sourceNum: string;

  /**
   * 业务号码
   */
  prodNum: string;

  /**
   * 联系号码
   */
  relaInfo: string;

  /**
   * 受理来源
   */
  acceptComeFromDesc: string;

  /**
   * 受理员工ID
   */
  acceptStaffId: string;

  /**
   * 受理员工
   */
  acceptStaffName: string;

  /**
   * 受理部门
   */
  acceptOrgName: string;

  /**
   * 受理时间
   */
  acceptDate: string;

  /**
   * 办结时间
   */
  finishDate: string;

  /**
   * 当前状态
   */
  orderStatuDesc: string;

  /**
   * 星级
   */
  custServGradeDesc: string;

  /**
   * 标签
   */
  COMMENTS: string;

  /**
   * 产品类型
   */
  productTypeName: string;

  /**
   * 工单类型二
   */
  appealDetailDesc: string;

  /**
   * 申诉一级
   */
  appealProdName: string;

  /**
   * 申诉二级
   */
  appealReasonDesc: string;

  /**
   * 申诉三级
   */
  appealChildDesc: string;

  /**
   * 申诉四级
   */
  fouGradeCatalogDesc: string;

  /**
   * 申诉五级
   */
  fiveGradeCatalogDesc: string;

  /**
   * 申诉六级
   */
  sixGradeCatalogDesc: string;

  /**
   * 受理内容
   */
  acceptContent: string;

  /**
   * 智能诊断一
   */
  guideSteps: string;

  /**
   * 智能诊断二
   */
  oneDiagnose: string;

  /**
   * 六类标签
   */
  sixCategoryLabel: string;

  /**
   * 网格
   */
  orgLvl7Name: string;
}

export const OrderDetailColumns: ProColumns<OrderDetailType>[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    fixed: 'left',
    width: 48,
    ellipsis: true,
  },
  {
    title: '本地网',
    dataIndex: 'regionName',
    fixed: 'left',
    width: 80,
    align: 'center',
    ellipsis: true,
  },
  {
    title: '工单号',
    dataIndex: 'serviceOrderId',
    fixed: 'left',
    width: 80,
    align: 'center',
    ellipsis: true,
    copyable: true,
  },
  {
    title: '工单类型',
    dataIndex: 'serviceTypeDesc',
    fixed: 'left',
    width: 80,
    align: 'center',
    ellipsis: true,
  },
  {
    title: '业务号码',
    dataIndex: 'prodNum',
    fixed: 'left',
    width: 120,
    align: 'center',
    ellipsis: true,
    copyable: true,
  },
  {
    title: '主叫号码',
    dataIndex: 'sourceNum',
    copyable: true,
    width: 120,
    align: 'center',
    ellipsis: true,
  },
  {
    title: '联系号码',
    dataIndex: 'relaInfo',
    copyable: true,
    width: 120,
    align: 'center',
    ellipsis: true,
  },
  {
    title: '受理来源',
    dataIndex: 'acceptComeFromDesc',
    width: 120,
    align: 'center',
    ellipsis: true,
  },
  {
    title: '受理员工ID',
    dataIndex: 'acceptStaffId',
    width: 100,
    align: 'center',
    ellipsis: true,
  },
  {
    title: '受理员工',
    dataIndex: 'acceptStaffName',
    width: 80,
    align: 'center',
    ellipsis: true,
  },
  {
    title: '受理部门',
    dataIndex: 'acceptOrgName',
    width: 120,
    align: 'center',
    ellipsis: true,
  },
  {
    title: '受理时间',
    dataIndex: 'acceptDate',
    width: 120,
    align: 'center',
    ellipsis: true,
  },
  {
    title: '办结时间',
    dataIndex: 'finishDate',
    width: 120,
    align: 'center',
    ellipsis: true,
  },
  {
    title: '当前状态',
    dataIndex: 'orderStatuDesc',
    width: 80,
    align: 'center',
    ellipsis: true,
  },
  {
    title: '星级',
    dataIndex: 'custServGradeDesc',
    width: 80,
    align: 'center',
    ellipsis: true,
  },
  {
    title: '产品类型',
    dataIndex: 'productTypeName',
    width: 100,
    align: 'center',
    ellipsis: true,
  },
  {
    title: '申诉一级',
    dataIndex: 'appealProdName',
    width: 120,
    align: 'center',
    ellipsis: true,
  },
  {
    title: '申诉二级',
    dataIndex: 'appealReasonDesc',
    width: 120,
    align: 'center',
    ellipsis: true,
  },
  {
    title: '申诉三级',
    dataIndex: 'appealChildDesc',
    width: 120,
    align: 'center',
    ellipsis: true,
  },
  {
    title: '申诉四级',
    dataIndex: 'fouGradeCatalogDesc',
    width: 120,
    align: 'center',
    ellipsis: true,
  },
  {
    title: '申诉五级',
    dataIndex: 'fiveGradeCatalogDesc',
    width: 120,
    align: 'center',
    ellipsis: true,
  },
  {
    title: '申诉六级',
    dataIndex: 'sixGradeCatalogDesc',
    width: 120,
    align: 'center',
    ellipsis: true,
  },
  {
    title: '受理内容',
    dataIndex: 'acceptContent',
    width: 220,
    align: 'center',
    ellipsis: true,
  },
  {
    title: '智能诊断一',
    dataIndex: 'guideSteps',
    width: 220,
    align: 'center',
    ellipsis: true,
  },
  {
    title: '智能诊断二',
    dataIndex: 'oneDiagnose',
    width: 220,
    align: 'center',
    ellipsis: true,
  },
  {
    title: '六类标签',
    dataIndex: 'sixCategoryLabel',
    width: 120,
    align: 'center',
    ellipsis: true,
  },
  {
    title: '7级网格',
    dataIndex: 'orgLvl7Name',
    width: 220,
    align: 'center',
    ellipsis: true,
  },
];
