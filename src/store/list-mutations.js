import Vue from 'vue'
export default {
  // 使用从leancloud 上拉到的数据 初始化 state
  initTodo (state, obj) {
    Vue.set(state, 'allList', obj.allList)
    Vue.set(state, 'allTask', obj.allTask)
    Vue.set(state, 'allSubTask', obj.allSubTask)
    Vue.set(state, 'allComment', obj.allComment)
    Vue.set(state, 'allFileMeta', obj.allFileMeta)
  },

  // 切换侧边栏上的 tab 
  switchList (state, {index, listArea}) {
    let {filterCollection, allList, allTask, currentList, currentTask} = state

    // 重置 task 的状态
    let listId = currentTask.belongTo.id 
    allTask[listId] && allTask[listId].forEach(task => task.selected = false)
    state.currentTask = {belongTo: {}}

    // 重置所有 list 的状态
    filterCollection.forEach(item => item.active = false)
    allList.forEach(item => item.active = false)

    // 选中侧边栏中的 List 
    // currentList 写入 index 和 isFilter 两个属性
    if(listArea === 'filters'){
      filterCollection[index]['active'] = 'true'
      Object.assign(currentList, filterCollection[index], {index, isFilter: true})
    }
    if(listArea === 'lists'){
      allList[index]['active'] = 'true'
      Object.assign(currentList, allList[index], {index, isFilter: false})
    }
  },

  // 更新 List 的名称等
  updateList ({ allList }, { list, attributes }) {
    if (!list.isFilter) {
      Object.assign(allList[list.index], attributes)
    }
  },

  // 初始化一个新的 list
  initList ({allList, allTask}, { id, title, active }) {
    //allTask[id] = []
    allList.push({ id, title, active: true })
    //Vue.set(allTask, id, [])
  },

  // 删除一个 list
  deleteList ({allList, allTask, currentList}, {listId, listIndex}) {
    allList.splice(listIndex, 1)
    // 判断在删除请求的期间 是否用户点击了其他tab 或者 创建一个新的tab
    if (listId === currentList.id && allList.length > 0) {
      if (listIndex === 0) {
        Object.assign(currentList, allList[0], {index: 0, active: true})
        Vue.set(allList[0], 'active', true)
      } else {
        Object.assign(currentList, allList[listIndex - 1], {index: listIndex - 1, active: true})
        Vue.set(allList[listIndex - 1], 'active', true)
      }
    }
    delete allTask[listId]
  },

  // 删除 一个task 下面 所有的 comment, filemeta, subtask
  deleteTaskChildren ({allSubTask, allComment, allFileMeta}, taskId) {
    delete allSubTask[taskId]
    delete allComment[taskId]
    delete allFileMeta[taskId]
  },

  // 切换 loading 图标
  toggleSyncIcon (state) {
    state.hideSyncIcon = !state.hideSyncIcon
  }

}
