export default {
  state: {
    subTasks: []
  },
  getters: {
  },
  mutations: {
    setSubTasks (state, subTasks) {
      state.subTasks = subTasks
    }
  },
  actions: {
    fetchSubTasks ({ state, commit }, id) {
      let subTasks = [
        {title:'份额份额', isCompleted: false, displayView: true,}, 
        {title: 'dd', isCompleted: true, displayView: true,}, 
        {title: 'hh', isCompleted: true, displayView:true,}
      ]
      setTimeout(() => {
        commit('setSubTasks', subTasks)
      }, 1000)
    }
  }
}
