import utils from '../../lib/utils'
export default {
  state: {
    currentList: {
      // 侧边栏选中的list
      id: '',
      title: '',
      index: ''
    },
    filtersCollection: [
      {
        id: 'all',
        id: 'all',
        isAnimateUp: false,
        title: '全部',
        overdueCount: 10,
        count: 4,
        active: false,
      },{
        id: 'starred',
        id: 'starred',
        isAnimateUp: false,
        title: '已加星标',
        overdueCount: 0,
        count: 1,
        active: false,
      },{
        id: 'today',
        id: 'today',
        isAnimateUp: false,
        title: '今天',
        overdueCount: 0,
        count: 1,
        active: false,
      },{
        id: 'week',
        id: 'week',
        isAnimateUp: false,
        title: '周',
        overdueCount: 0,
        count: 1,
        active: false,
      },{
        id: 'completed',
        id: 'completed',
        isAnimateUp: false,
        title: '已完成',
        overdueCount: 0,
        count: 0,
        active: false,
      },
    ],
    listsCollection:[
      {
        id: '3429677865',
        id: 'work',
        title: '工作',
        overdueCount: 10,
        count: 2,
        active: false,
      },{
        id: '3429676336',
        id: 'life',
        title: '生活',
        overdueCount: 10,
        count: 1,
        active: false,
      },
    ],

  },
  getters: {
  },
  mutations: {
  }
}
