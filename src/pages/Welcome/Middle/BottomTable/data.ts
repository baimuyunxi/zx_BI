import { DataType } from './entity/DataType';

function getRandomItem(arr: string[]): string {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomNumberString(length: number): string {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += Math.floor(Math.random() * 10).toString();
  }
  return result;
}

function getRandomDate(): string {
  const start = new Date(2020, 0, 1);
  const end = new Date();
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().replace('T', ' ').split('.')[0];
}

const localNetworks = ['网一', '网二', '网三'];
const employeeAreas = ['华北', '华东', '华南', '西南', '东北'];
const ticketTypes = ['类型A', '类型B', '类型C'];
const statuses = ['待处理', '处理中', '已完成'];
const sources = ['电话', '网络', '现场'];
const names = ['张三', '李四', '王五', '赵六', '孙七'];
const starRatings = ['1星', '2星', '3星', '4星', '5星'];

export const data: DataType[] = Array.from({ length: 30 }).map((_, index) => ({
  LocalNetwork: getRandomItem(localNetworks),
  EmployeeArea: getRandomItem(employeeAreas),
  TheTicketNumber: '工单-' + getRandomNumberString(6),
  TheTicketType: getRandomItem(ticketTypes),
  Status: getRandomItem(statuses),
  AssociatedTraffic: '关联-' + getRandomNumberString(6),
  TheNameOfTheCustomer: getRandomItem(names),
  CustomerStarRatings: getRandomItem(starRatings),
  CallerID: '138' + getRandomNumberString(8),
  BusinessNumber: '业务-' + getRandomNumberString(6),
  ContactNumber: '139' + getRandomNumberString(8),
  SourceOfAcceptance: getRandomItem(sources),
  EmployeeID: 'E' + getRandomNumberString(4),
  EmployeeName: getRandomItem(names),
  ReceptionHours: getRandomDate(),
  ClosingTime: getRandomDate(),
  ContentsOfAcceptance: '问题描述' + getRandomNumberString(3),
  Level1Acceptance: '一级-' + getRandomNumberString(2),
  Level2Acceptance: '二级-' + getRandomNumberString(2),
  Level3Acceptance: '三级-' + getRandomNumberString(2),
  Level4Acceptance: '四级-' + getRandomNumberString(2),
  Level5Acceptance: '五级-' + getRandomNumberString(2),
  Level6Acceptance: '六级-' + getRandomNumberString(2),
}));
