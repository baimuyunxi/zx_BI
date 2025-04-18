import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => {
  return {
    // 网格容器
    gridContainer: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    // 类别行容器 - 确保横向排列，且每行显示4个卡片
    categoryRowContainer: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'nowrap', // 防止换行，确保一行4个
    },
    // 项目列表
    projectList: {
      '.ant-card-head': {
        position: 'relative',
      },
      '.ant-card-body': {
        padding: 0,
      },
      // 调整Card.Grid的默认样式 - 保留边框
      '.ant-card-grid': {
        width: '25%', // 强制每行4个
        boxShadow:
          '1px 0 0 0 #f0f0f0, 0 1px 0 0 #f0f0f0, 1px 1px 0 0 #f0f0f0, 1px 0 0 0 #f0f0f0 inset, 0 1px 0 0 #f0f0f0 inset',
        borderRadius: 0,
      },
      // 覆盖Card的边框样式
      '.ant-card': {
        boxShadow: 'none',
      },
    },
    // 类别网格 - 恢复悬停效果
    categoryGrid: {
      position: 'relative',
      boxSizing: 'border-box',
      transition: 'all 0.3s',
      // 悬停效果
      '&:hover': {
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
        transform: 'translateY(-5px)',
        zIndex: 1,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: '#52c41a',
        },
      },
      // 响应式布局
      [`@media screen and (max-width: ${token.screenMD}px)`]: { width: '50%' },
      [`@media screen and (max-width: ${token.screenXS}px)`]: { width: '100%' },
    },
    // 第一行卡片特殊样式 - 添加红色渐变角
    firstRowGrid: {
      position: 'relative',
      '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '80px',
        height: '80px',
        background: 'linear-gradient(135deg, rgba(220,20,60,1) 0%, rgba(220,20,60,0) 70%)',
        zIndex: 1,
        pointerEvents: 'none', // 确保不影响交互
      },
    },
    // 分隔线容器
    dividerContainer: {
      width: '100%',
      padding: '0 24px',
    },
    // 卡片标题
    cardTitle: {
      padding: '8px 0',
      fontSize: '22px',
      fontWeight: 'bold',
    },
    // 排行榜列表
    rankingList: {
      margin: '25px 0 0',
      padding: '0 12px',
      listStyle: 'none',
      border: 'none',
      li: {
        display: 'flex',
        alignItems: 'center',
        marginTop: '16px',
        zoom: '1',
        border: 'none',
        '&::before, &::after': {
          display: 'table',
          content: "' '",
        },
        '&::after': {
          clear: 'both',
          height: '0',
          fontSize: '0',
          visibility: 'hidden',
        },
      },
      [`@media screen and (max-width: ${token.screenLG}px)`]: {
        li: {
          'span:first-child': { marginRight: '8px' },
        },
      },
    },
    rankingItemNumber: {
      display: 'inline-block',
      width: '20px',
      height: '20px',
      marginTop: '1.5px',
      marginRight: '16px',
      fontWeight: '600',
      fontSize: '12px',
      lineHeight: '20px',
      textAlign: 'center',
      borderRadius: '20px',
      backgroundColor: token.colorBgContainerDisabled,
    },
    rankingItemTitle: {
      flex: '1',
      marginRight: '8px',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },
    // 前三名高亮样式 - 加深颜色
    rankingItemNumberActive: {
      color: '#fff',
      backgroundColor: '#1890ff', // 使用更深的蓝色
      fontWeight: 'bold',
    },
    salesCardExtra: {
      display: 'inline-block',
      marginRight: '16px',
    },
    salesTypeRadio: {
      display: 'inline-block',
    },
    rankingTitle: {
      marginBottom: '16px',
      [`@media screen and (max-width: ${token.screenMD}px)`]: {
        marginTop: '16px',
      },
    },
  };
});

export default useStyles;
