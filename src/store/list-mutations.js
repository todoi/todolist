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
  deleteList ({allList, allTask}, {listId, listIndex}) {
    allList.splice(listIndex, 1)
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
  },

  // 任务按 创建日期 排序
  sortTaskByCreation ({allList, allTask}) {
    allList.forEach(list => {
      allTask[list.id].sort((a, b) => b.createdAt - a.createdAt )
    })
  },

  // 任务按 字母顺序 排序
  sortTaskByLetter ({allList, allTask}) {
    allList.forEach(list => {
      allTask[list.id].sort((a, b) => {
        if(a.title === b.title) return 0
        if(a.title > b.title) return 1
        if(a.title < b.title) return -1
      })
    })
  },

  // 任务按 优先级 排序
  sortTaskByPriority ({allList, allTask}) {
    // starred 是个布尔值
    // 加星星的优先级比较高
    allList.forEach(list => {
      allTask[list.id].sort((a, b) => Number(b.starred) - Number(a.starred))
    })
  },

  // 任务按 到期日 排序
  sortTaskByDeadline ({allList, allTask}) {
    allList.forEach(list => {
      allTask[list.id].sort((a, b) => {
        // a，b 都没设置到期日
        if(!a.deadline && !b.deadline) return 0
        // a没设置 b有设置
        if(!a.deadline) return 1
        if(!b.deadline) return -1
        return a.deadline - b.deadline
      })
    })
  },
}
