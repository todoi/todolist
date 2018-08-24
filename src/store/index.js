import Vuex from 'vuex'
import Vue from 'vue'

import collections  from './modules/collections'
import list  from './modules/list'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    user: {
      id: '',
      username: '',
      email: ''
    },
  },
  mutations: {
    setUser (state, user) {
      state.user = user
    },
  },
  modules: {
    collections,
    list
  }
})
