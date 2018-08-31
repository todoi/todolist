import Vue from 'vue'
export default {
  initTodo (state, obj) {
    Vue.set(state, 'allList', obj.allList)
    Vue.set(state, 'allTask', obj.allTask)
    Vue.set(state, 'allSubTask', obj.allSubTask)
    Vue.set(state, 'allComment', obj.allComment)
    Vue.set(state, 'allFileMeta', obj.allFileMeta)
  },

  switchList ({filterCollection, allList, currentList}, {index, listArea}) {
    // 选中侧边栏中的 List 
    filterCollection.forEach(item => item.active = false)
    allList.forEach(item => item.active = false)
    if(listArea === 'filters'){
      filterCollection[index]['active'] = 'true'
      Object.assign(currentList, filterCollection[index], {index, isFilter: true})
    }
    if(listArea === 'lists'){
      allList[index]['active'] = 'true'
      Object.assign(currentList, allList[index], {index, isFilter: false})
    }
  },

  updateList ({ allList }, { list, attributes }) {
    if (!list.isFilter) {
      Object.assign(allList[list.index], attributes)
    }
  },

  initList ({allList, allTask}, { id, title, active }) {
    //allTask[id] = []
    allList.push({ id, title, active: true })
    //Vue.set(allTask, id, [])
  },

  deleteList ({allList, allTask}, {listId, listIndex}) {
    allList.splice(listIndex, 1)
    delete allTask[listId]
  },

  deleteTaskChildren ({allSubTask, allComment, allFileMeta}, taskId) {
    delete allSubTask[taskId]
    delete allComment[taskId]
    delete allFileMeta[taskId]
  },

  toggleSyncIcon (state) {
    state.hideSyncIcon = !state.hideSyncIcon
  }
}
