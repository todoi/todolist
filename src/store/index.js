import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
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
  }
})
