// mockData.ts
export const mockTopListData = {
  code: '0000',
  meg: '成功',
  data: [
    {
      title: '行客',
      collection: [
        {
          reseau: '网格1号',
          total: 123
        },
        {
          reseau: '网格2号',
          total: 67
        },
        {
          reseau: '网格3号',
          total: 35
        },
        {
          reseau: '网格4号',
          total: 12
        },
        {
          reseau: '网格5号',
          total: 1
        },
      ]
    },
    {
      title: '商客',
      collection: [
        {
          reseau: '网格1号',
          total: 43
        },
        {
          reseau: '网格2号',
          total: 23
        },
      ]
    },
    {
      title: '高校',
      collection: [
        {
          reseau: '网格1号',
          total: 123
        },
        {
          reseau: '网格2号',
          total: 67
        },
        {
          reseau: '网格3号',
          total: 35
        },
        {
          reseau: '网格4号',
          total: 12
        },
      ]
    },
    {
      title: '中小学',
      collection: [
        {
          reseau: '网格1号',
          total: 89
        },
        {
          reseau: '网格2号',
          total: 56
        },
        {
          reseau: '网格3号',
          total: 32
        },
      ]
    },
    {
      title: '战客',
      collection: [
        {
          reseau: '网格1号',
          total: 78
        },
        {
          reseau: '网格2号',
          total: 45
        },
        {
          reseau: '网格3号',
          total: 21
        },
        {
          reseau: '网格4号',
          total: 9
        },
      ]
    },
  ]
};

// 模拟获取数据的API函数
export const fetchTopListData = (type = 'gz') => {
  // 这里可以根据type返回不同的数据，模拟故障和投诉两种不同数据
  // 为简化示例，目前两种类型返回相同数据
  return Promise.resolve(mockTopListData);
};
