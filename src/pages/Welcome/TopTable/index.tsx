import { Card, Col, Radio, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import useStyles from '../style.style';
import { fetchTopListData } from './mockData';

interface RankingData {
  reseau: string;
  total: number;
}

interface CategoryData {
  title: string;
  collection: RankingData[];
}

interface ApiResponse {
  code: string;
  meg: string;
  data: CategoryData[];
}

const TopList: React.FC = () => {
  const { styles } = useStyles();
  const [listType, setListType] = useState<string>('gz');
  const [rankingData, setRankingData] = useState<CategoryData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetchTopListData(listType);
        setRankingData(response.data);
      } catch (error) {
        console.error('获取数据失败:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [listType]);

  const handleTypeChange = (e: any) => {
    setListType(e.target.value);
  };

  // 生成行，每行最多3个Col
  const renderRows = () => {
    const rows = [];
    let currentRow = [];

    // 将类别分组为每行最多3个
    for (let i = 0; i < rankingData.length; i++) {
      currentRow.push(rankingData[i]);

      // 当达到3个或处理到最后一个时创建一行
      if (currentRow.length === 3 || i === rankingData.length - 1) {
        rows.push([...currentRow]);
        currentRow = [];
      }
    }

    // 渲染行
    return rows.map((row, rowIndex) => (
      <Row gutter={[16, 16]} key={rowIndex} style={{ marginTop: rowIndex > 0 ? '16px' : 0 }}>
        {row.map((category) => (
          <Col xl={8} lg={12} md={12} sm={24} xs={24} key={category.title}>
            <div className={styles.salesRank}>
              <h2 className={styles.rankingTitle}>
                <strong>
                  <strong>{category.title}</strong>
                </strong>
              </h2>
              <ul className={styles.rankingList}>
                {category.collection.map((item, i) => (
                  <li key={item.reseau}>
                    <span
                      className={`${styles.rankingItemNumber} ${
                        i < 3 ? styles.rankingItemNumberActive : ''
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span className={styles.rankingItemTitle} title={item.reseau}>
                      {item.reseau}
                    </span>
                    <span>{item.total}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Col>
        ))}
      </Row>
    ));
  };

  return (
    <>
      <Card
        title={'全业务队列工单TOP'}
        className={styles.salesCard}
        loading={loading}
        extra={
          <>
            <div className={styles.salesCardExtra}>
              <div className={styles.salesTypeRadio}>
                <Radio.Group defaultValue={listType} onChange={handleTypeChange}>
                  <Radio.Button value="gz">故障</Radio.Button>
                  <Radio.Button value="tx">投诉</Radio.Button>
                </Radio.Group>
              </div>
            </div>
            <a href="#">More</a>
          </>
        }
      >
        {renderRows()}
      </Card>
    </>
  );
};

export default TopList;
