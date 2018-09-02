import Vuex from 'vuex'
import Vue from 'vue'

import newState from './state'

import listGetters from './list-getters.js'
import listMutations from './list-mutations.js'
import listActions from './list-actions.js'

import taskGetters from './task-getters.js'
import taskMutations from './task-mutations.js'
import taskActions from './task-actions.js'

Vue.use(Vuex)

let allList=[], allTask={}, allSubTask={}, allComment={}, allFileMeta={}


let store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    user: {
      id: '',
      username: '',
      email: ''
    },
    hideSyncIcon: true,
    // 侧边栏选中的list
    currentList: {
      id: 'all',
      title: '全部',
      index: 0,
      isFilter: true,
    },
    currentTask: {
      id: '',
      title: '',
      belongTo: {id: ''},
      selected: false,
      starred: false,
      createdAt: 0,
      deadline: 0,
      isCompleted: false,
      note: '',
    },
    duplicateTask: {},
    filterCollection: [
      {
        id: 'all',
        isAnimateUp: false,
        title: '全部',
        active: false,
      },{
        id: 'starred',
        isAnimateUp: false,
        title: '已加星标',
        active: false,
      },{
        id: 'today',
        isAnimateUp: false,
        title: '今天到期',
        active: false,
      },{
        id: 'week',
        isAnimateUp: false,
        title: '本周到期',
        active: false,
      },{
        id: 'completed',
        isAnimateUp: false,
        title: '已完成',
        active: false,
      }
    ],
    allList, allTask, allComment, allSubTask, allFileMeta,
    //...newState
  },
  getters: {
    ...listGetters,
    ...taskGetters,
  },
  mutations: {
    setUser (state, newUser) {
      state.user = newUser
    },
    resetUser ({user}) {
      user.username = ''
      user.id = ''
      user.email = ''
    },
    ...listMutations,
    ...taskMutations,
  },
  actions: {
    ...listActions,
    ...taskActions,
  }
})

export default store
