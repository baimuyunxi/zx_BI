import { Card, Col, Radio, Row, Spin } from 'antd';
import React, { useState, useEffect } from 'react';
import useStyles from '../style.style';

interface RankingData {
  orgName: string;
  value: number;
}

interface CategoryData {
  category: string;
  orgLvl7: RankingData[];
}

interface GridTopData {
  fault?: CategoryData[];
  complaints?: CategoryData[];
}

interface TopListProps {
  gridTopData?: GridTopData;
  loading?: boolean;
}

const TopList: React.FC<TopListProps> = ({ gridTopData = {}, loading = false }) => {
  const { styles } = useStyles();
  const [listType, setListType] = useState<string>('gz');
  const [rankingData, setRankingData] = useState<CategoryData[]>([]);

  // 当gridTopData或listType变化时更新数据
  useEffect(() => {
    if (!gridTopData) return;

    // 根据选择的类型设置数据
    if (listType === 'gz' && gridTopData.fault) {
      setRankingData(gridTopData.fault);
    } else if (listType === 'tx' && gridTopData.complaints) {
      setRankingData(gridTopData.complaints);
    } else {
      setRankingData([]);
    }
  }, [gridTopData, listType]);

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
          <Col xl={8} lg={12} md={12} sm={24} xs={24} key={category.category}>
            <div className={styles.salesRank}>
              <h2 className={styles.rankingTitle}>
                <strong>
                  <strong>{category.category}</strong>
                </strong>
              </h2>
              <ul className={styles.rankingList}>
                {category.orgLvl7.map((item, i) => (
                  <li key={`${item.orgName}-${i}`}>
                    <span
                      className={`${styles.rankingItemNumber} ${
                        i < 3 ? styles.rankingItemNumberActive : ''
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span className={styles.rankingItemTitle} title={item.orgName}>
                      {item.orgName}
                    </span>
                    <span>{item.value}</span>
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
                <Radio.Group value={listType} onChange={handleTypeChange}>
                  <Radio.Button value="gz">故障</Radio.Button>
                  <Radio.Button value="tx">投诉</Radio.Button>
                </Radio.Group>
              </div>
            </div>
            <a href="#">More</a>
          </>
        }
      >
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '30px 0' }}>
            <Spin tip="加载中..." />
          </div>
        ) : (
          renderRows()
        )}
      </Card>
    </>
  );
};

export default TopList;
