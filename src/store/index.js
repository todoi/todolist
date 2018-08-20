import Vuex from 'vuex'
import Vue from 'vue'
import collections  from './modules/collections'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    user: {
      username: '',
      id: ''
    }
  },
  mutations: {
    setUser (state, user) {
      state.user = user
    } 
  },
  modules: {
    collections,
  }
})
