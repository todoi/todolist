import utils from '../../lib/utils'
export default {
  state: {
    filtersCollection: [
      {
        id: 'inbox',
        isAnimateUp: true,  //是否隐藏
        title: '收件箱',
        overdueCount: 10,  //过期任务的个数
        count: 1, // 总共的任务数量
        active: false, 
      },{
        id: 'assigned',
        isAnimateUp: true, 
        title: '分配给我',
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
        title: '工作',
        overdueCount: 10,
        count: 2,
        active: false,
      },{
        id: '3429676336',
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
    },
    createList (state, title) {
      let list = {
        id: utils.createId(title),
        isAnimateUp: false,
        title,
        overdueCount: 0,
        count: 0,
        active: false,
      }
      state.listsCollection.push(list)
    },
    changeListTitle (state, { index, newTitle }) {
      state.listsCollection[index].title = newTitle
    }
  }
}
