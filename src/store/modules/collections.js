export default {
  state: {
    filtersCollection: [
      {
        id: 'inbox',
        isAnimateUp: false,  //是否隐藏
        title: '收件箱',
        overdueCount: 10,  //过期任务的个数
        count: 1, // 总共的任务数量
        active: false, 
      },{
        id: 'assigned',
        isAnimateUp: false, 
        title: '分配给我',
        overdueCount: 0,
        count: 1,
        active: false,
      },{
        id: 'starred',
        isAnimateUp: false,
        title: '已加星标',
        overdueCount: 0,
        count: 1,
        active: false,
      },{
        id: 'today',
        isAnimateUp: false,
        title: '今天',
        overdueCount: 0,
        count: 1,
        active: false,
      },{
        id: 'week',
        isAnimateUp: false,
        title: '周',
        overdueCount: 0,
        count: 1,
        active: false,
      },{
        id: 'all',
        isAnimateUp: false,
        title: '全部',
        overdueCount: 10,
        count: 4,
        active: false,
      },{
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
        isAnimateUp: false,
        title: '工作',
        overdueCount: 10,
        count: 2,
        active: false,
      },{
        id: '3429676336',
        isAnimateUp: false,
        title: '生活',
        overdueCount: 10,
        count: 1,
        active: false,
      },
    ],

  },
  getters: {
    getCurrentCollection (state) {
     let collection =  state.filtersCollection.find((item, index) => {
        return item.active
      })
      if (collection) { return collection } 
      collection = state.listsCollection.find((item, index) => {
        return item.active
      })
      return collection
    }
  },
  mutations: {
    switchCollection (state, {index, listArea}) {
      state.filtersCollection.forEach(function(item, index){item.active = false})
      state.listsCollection.forEach(function(item, index){item.active = false})
      if(listArea === 'filters'){
        state.filtersCollection[index]['active'] = 'true'
      }
      if(listArea === 'lists'){
        state.listsCollection[index]['active'] = 'true'
      }
    }
  }
}
