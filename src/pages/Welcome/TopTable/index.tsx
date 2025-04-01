import { Card, Col, Radio, Row } from 'antd';
import useStyles from '../style.style';

const tabListNoTitle = [
  {
    key: 'gz',
    label: '故障',
  },
  {
    key: 'tx',
    label: '投诉',
  },
];

const rankingListData: {
  title: string;
  total: number;
}[] = [];

for (let i = 0; i < 5; i += 1) {
  rankingListData.push({
    title: `网格 ${i} 号`,
    total: 32,
  });
}

const TopList = () => {
  const { styles } = useStyles();
  const salesType = useStyles('gz');

  return (
    <>
      <Card
        title={'全业务队列工单TOP'}
        className={styles.salesCard}
        extra={
          <>
            <div className={styles.salesCardExtra}>
              <div className={styles.salesTypeRadio}>
                <Radio.Group defaultValue={"gz"}>
                  <Radio.Button value="gz">故障</Radio.Button>
                  <Radio.Button value="tx">投诉</Radio.Button>
                </Radio.Group>
              </div>
            </div>
            <a href="#">More</a>
          </>
        }
      >
        <Row gutter={[16, 16]}>
          <Col xl={8} lg={12} md={12} sm={24} xs={24}>
            <div className={styles.salesRank}>
              <h4 className={styles.rankingTitle}>行客</h4>
              <ul className={styles.rankingList}>
                {rankingListData.map((item, i) => (
                  <li key={item.title}>
                    <span
                      className={`${styles.rankingItemNumber} ${
                        i < 3 ? styles.rankingItemNumberActive : ''
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span className={styles.rankingItemTitle} title={item.title}>
                      {item.title}
                    </span>
                    <span>{item.total}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Col>
          <Col xl={8} lg={12} md={12} sm={24} xs={24}>
            <div className={styles.salesRank}>
              <h4 className={styles.rankingTitle}>商客</h4>
              <ul className={styles.rankingList}>
                {rankingListData.map((item, i) => (
                  <li key={item.title}>
                    <span
                      className={`${styles.rankingItemNumber} ${
                        i < 3 ? styles.rankingItemNumberActive : ''
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span className={styles.rankingItemTitle} title={item.title}>
                      {item.title}
                    </span>
                    <span>{item.total}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Col>
          <Col xl={8} lg={12} md={12} sm={24} xs={24}>
            <div className={styles.salesRank}>
              <h4 className={styles.rankingTitle}>高校</h4>
              <ul className={styles.rankingList}>
                {rankingListData.map((item, i) => (
                  <li key={item.title}>
                    <span
                      className={`${styles.rankingItemNumber} ${
                        i < 3 ? styles.rankingItemNumberActive : ''
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span className={styles.rankingItemTitle} title={item.title}>
                      {item.title}
                    </span>
                    <span>{item.total}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Col>
        </Row>
        <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
          <Col xl={8} lg={12} md={12} sm={24} xs={24}>
            <div className={styles.salesRank}>
              <h4 className={styles.rankingTitle}>中小学</h4>
              <ul className={styles.rankingList}>
                {rankingListData.map((item, i) => (
                  <li key={item.title}>
                    <span
                      className={`${styles.rankingItemNumber} ${
                        i < 3 ? styles.rankingItemNumberActive : ''
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span className={styles.rankingItemTitle} title={item.title}>
                      {item.title}
                    </span>
                    <span>{item.total}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Col>
          <Col xl={8} lg={12} md={12} sm={24} xs={24}>
            <div className={styles.salesRank}>
              <h4 className={styles.rankingTitle}>战客</h4>
              <ul className={styles.rankingList}>
                {rankingListData.map((item, i) => (
                  <li key={item.title}>
                    <span
                      className={`${styles.rankingItemNumber} ${
                        i < 3 ? styles.rankingItemNumberActive : ''
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span className={styles.rankingItemTitle} title={item.title}>
                      {item.title}
                    </span>
                    <span>{item.total}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Col>
          <Col xl={8} lg={12} md={12} sm={24} xs={24}>
            <div className={styles.salesRank}>
              <h4 className={styles.rankingTitle}>政企关键人</h4>
              <ul className={styles.rankingList}>
                {rankingListData.map((item, i) => (
                  <li key={item.title}>
                    <span
                      className={`${styles.rankingItemNumber} ${
                        i < 3 ? styles.rankingItemNumberActive : ''
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span className={styles.rankingItemTitle} title={item.title}>
                      {item.title}
                    </span>
                    <span>{item.total}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default TopList;
