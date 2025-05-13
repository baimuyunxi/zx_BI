// 定义接口类型
interface LabelItem {
  tag: string;
  cnt: number;
  lastCnt: number;
  grandto: number;
  lastgrandto: number;
}

interface MarkedTimeItem {
  time: string;
  labelSet: LabelItem[];
}

interface EnterpriseMarkedTimeItem {
  time: string;
  cnt: number;
  lastCnt: number;
  grandto: number;
  lastgrandto: number;
}

interface LocalData {
  local: string;
  marked: MarkedTimeItem[];
}

interface EnterpriseLocalData {
  local: string;
  marked: EnterpriseMarkedTimeItem[];
}

interface ConRate {
  wanTurned: number;   // 政企全业务队列接通量
  wanCallIn: number;   // 政企全业务队列呼入量
  zqTurned: number;    // 10009队列接通量
  zqCallIn: number;    // 10009队列呼入量
}

interface ApiResponse {
  fullService: LocalData[];
  enterprise: EnterpriseLocalData[];
  conRate: ConRate;
  code: number;
  success: boolean;
}

// 定义常量
const TAG_TYPES = ['校园客户', '行业客户', '商业客户', '要客', '战略客户', '老干部'];
const TIME_SLOTS = [
  '00:00', '02:00', '04:00', '06:00', '08:00', '10:00',
  '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'
];
const HUNAN_CITIES = [
  { code: '0731', name: '长沙' },
  { code: '0732', name: '湘潭' },
  { code: '0733', name: '株洲' },
  { code: '0734', name: '衡阳' },
  { code: '0735', name: '郴州' },
  { code: '0736', name: '常德' },
  { code: '0737', name: '益阳' },
  { code: '0738', name: '娄底' },
  { code: '0739', name: '邵阳' },
  { code: '0743', name: '湘西' },
  { code: '0744', name: '张家界' },
  { code: '0745', name: '怀化' },
  { code: '0746', name: '永州' },
  { code: '0747', name: '岳阳' }
];

// 生成随机数据的辅助函数
function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 生成标签数据
function generateLabelData(time: string, prevGrandtotals: Map<string, number> = new Map()): {
  labelSet: LabelItem[],
  newGrandtotals: Map<string, number>
} {
  const labelSet: LabelItem[] = [];
  const newGrandtotals = new Map<string, number>();

  for (const tag of TAG_TYPES) {
    const cnt = getRandomInt(50, 200);
    const lastCnt = getRandomInt(50, 200);

    const prevGrandto = prevGrandtotals.get(tag) || 0;
    const grandto = prevGrandto + cnt;

    const prevLastGrandto = prevGrandtotals.get(`last_${tag}`) || 0;
    const lastgrandto = prevLastGrandto + lastCnt;

    labelSet.push({
      tag,
      cnt,
      lastCnt,
      grandto,
      lastgrandto
    });

    newGrandtotals.set(tag, grandto);
    newGrandtotals.set(`last_${tag}`, lastgrandto);
  }

  return { labelSet, newGrandtotals };
}

// 生成企业时间段数据
function generateEnterpriseTimeData(time: string, prevGrandto: number = 0, prevLastGrandto: number = 0): {
  timeData: EnterpriseMarkedTimeItem,
  newGrandto: number,
  newLastGrandto: number
} {
  const cnt = getRandomInt(100, 200);
  const lastCnt = getRandomInt(100, 200);

  const grandto = prevGrandto + cnt;
  const lastgrandto = prevLastGrandto + lastCnt;

  return {
    timeData: {
      time,
      cnt,
      lastCnt,
      grandto,
      lastgrandto
    },
    newGrandto: grandto,
    newLastGrandto: lastgrandto
  };
}

// 为每个城市生成随时段数据
function generateCityData(cityCode: string, timeSlots: string[] = TIME_SLOTS.slice(0, 3)): LocalData {
  let grandtotals = new Map<string, number>();
  const marked: MarkedTimeItem[] = [];

  for (const time of timeSlots) {
    const { labelSet, newGrandtotals } = generateLabelData(time, grandtotals);
    marked.push({
      time,
      labelSet
    });
    grandtotals = newGrandtotals;
  }

  return {
    local: cityCode,
    marked
  };
}

// 为每个城市生成企业数据
function generateEnterpriseCityData(cityCode: string, timeSlots: string[] = TIME_SLOTS.slice(0, 3)): EnterpriseLocalData {
  let grandto = 0;
  let lastGrandto = 0;
  const marked: EnterpriseMarkedTimeItem[] = [];

  for (const time of timeSlots) {
    const { timeData, newGrandto, newLastGrandto } = generateEnterpriseTimeData(time, grandto, lastGrandto);
    marked.push(timeData);
    grandto = newGrandto;
    lastGrandto = newLastGrandto;
  }

  return {
    local: cityCode,
    marked
  };
}

// 生成完整数据
function generateFullData(): ApiResponse {
  // 全服务数据
  const fullService: LocalData[] = HUNAN_CITIES.map(city => {
    // 为所有地市使用完整的时间段（整天24小时）
    return generateCityData(city.code, TIME_SLOTS);
  });

  // 企业数据
  const enterprise: EnterpriseLocalData[] = HUNAN_CITIES.map(city => {
    // 为所有地市使用完整的时间段（整天24小时）
    return generateEnterpriseCityData(city.code, TIME_SLOTS);
  });

  // 接通率数据
  const conRate: ConRate = {
    wanTurned: getRandomInt(8000, 12000),
    wanCallIn: getRandomInt(10000, 15000),
    zqTurned: getRandomInt(5000, 8000),
    zqCallIn: getRandomInt(6000, 10000)
  };

  return {
    fullService,
    enterprise,
    conRate,
    code: 200,
    success: true
  };
}

// 生成数据并输出JSON字符串
const mockApiResponse = generateFullData();
console.log(JSON.stringify(mockApiResponse, null, 2));

// 导出类型定义和生成函数
export type {
  LabelItem,
  MarkedTimeItem,
  EnterpriseMarkedTimeItem,
  LocalData,
  EnterpriseLocalData,
  ConRate,
  ApiResponse
};

export {
  generateFullData
};
