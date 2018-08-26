import Vuex from 'vuex'
import Vue from 'vue'

import collections  from './modules/collections'
import list  from './modules/list'
import subtasks  from './modules/subtasks'

import newState from './todoList-state'

import listGetters from './list-getters.js'
import listMutations from './list-mutations.js'
import listActions from './list-actions.js'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    user: {
      id: '',
      username: '',
      email: ''
    },
    ...newState
  },
  getters: {
    ...listGetters,
  },
  mutations: {
    setUser (state, user) {
      state.user = user
    },
    ...listMutations,
  },
  actions: {
    ...listActions,
  },
  modules: {
    collections,
    list,
    subtasks
  }
})

