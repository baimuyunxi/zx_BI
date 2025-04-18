import { Card, Radio, Spin } from 'antd';
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

  // 定义两行的类别顺序
  const firstRowCategories = ['老干部', '要客VVIP', '政企VVIP', '战略客户'];
  const secondRowCategories = ['行业客户', '商业客户', '高校客户', '中小学客户'];

  // 当gridTopData或listType变化时更新数据
  useEffect(() => {
    if (!gridTopData) return;

    // 根据选择的类型设置数据
    let data: CategoryData[] = [];
    if (listType === 'gz' && gridTopData.fault) {
      data = gridTopData.fault;
    } else if (listType === 'tx' && gridTopData.complaints) {
      data = gridTopData.complaints;
    }

    // 根据预定义的顺序对数据进行排序
    if (data.length > 0) {
      const allCategories = [...firstRowCategories, ...secondRowCategories];
      data.sort((a, b) => {
        return allCategories.indexOf(a.category) - allCategories.indexOf(b.category);
      });
    }

    setRankingData(data);
  }, [gridTopData, listType]);

  const handleTypeChange = (e: any) => {
    setListType(e.target.value);
  };

  // 获取第一行数据 - 确保只取前4个
  const getFirstRowData = () => {
    return rankingData.filter((item) => firstRowCategories.includes(item.category)).slice(0, 4);
  };

  // 获取第二行数据 - 确保只取前4个
  const getSecondRowData = () => {
    return rankingData.filter((item) => secondRowCategories.includes(item.category)).slice(0, 4);
  };

  // 为Card.Grid添加内联样式，有边框
  const gridStyle: React.CSSProperties = {
    width: '25%',
    padding: '24px 12px',
  };

  return (
    <Card
      className={styles.projectList}
      title="万号工单网格TOP"
      bordered={false}
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
      bodyStyle={{
        padding: 0,
      }}
    >
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '30px 0' }}>
          <Spin tip="加载中..." />
        </div>
      ) : (
        <div className={styles.gridContainer}>
          {/* 第一行数据 */}
          <div className={styles.categoryRowContainer}>
            {getFirstRowData().map((category) => (
              <Card.Grid
                style={gridStyle}
                className={`${styles.categoryGrid} ${styles.firstRowGrid}`}
                key={category.category}
              >
                <Card
                  bodyStyle={{
                    padding: 0,
                  }}
                  bordered={false}
                >
                  <Card.Meta
                    title={
                      <div className={styles.cardTitle}>
                        <strong>{category.category}</strong>
                      </div>
                    }
                  />
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
                </Card>
              </Card.Grid>
            ))}
          </div>

          {/* 第二行数据 */}
          <div className={styles.categoryRowContainer}>
            {getSecondRowData().map((category) => (
              <Card.Grid style={gridStyle} className={styles.categoryGrid} key={category.category}>
                <Card
                  bodyStyle={{
                    padding: 0,
                  }}
                  bordered={false}
                >
                  <Card.Meta
                    title={
                      <div className={styles.cardTitle}>
                        <strong>{category.category}</strong>
                      </div>
                    }
                  />
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
                </Card>
              </Card.Grid>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};

export default TopList;
