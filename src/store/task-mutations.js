import Vue from 'vue'
export default {
  // 添加新的 Task
  addTask ({allTask, allSubTask, allComment, allFileMeta}, newTask) {
    newTask.selected = true
    let listId = newTask.belongTo.id
    if (!allTask[listId]) Vue.set(allTask, listId, [])
    allTask[listId] = [newTask].concat(allTask[newTask.belongTo.id])
    //Vue.set(allSubTask, newTask.id, [])
    //Vue.set(allComment, newTask.id, [])
    //Vue.set(allFileMeta, newTask.id, [])
  },

  // 点击在 list 列表的 的某个任务
  selectListTask (state, {taskId, listId, item}) {
    let { allTask, currentTask } = state
    allTask[listId].forEach(task => task.id === taskId 
      ? (task.selected=true, state.currentTask = Object.assign({}, task))
      : task.selected=false )
  },

  // 点击在 filter 列表的 的某个任务
  // 比如点击在 '已加星标' 的某个任务上
  selectFilterTask (state, {taskId, listId, task, items}) {
    let { allTask, currentTask } = state
    items.forEach(item => {
      if (item.listId === listId) {
        allTask[item.listId].forEach(task => task.id === taskId 
          ? (task.selected=true, state.currentTask = Object.assign({}, task))
          : task.selected=false)
      } else {
        allTask[item.listId].forEach(task => task.selected=false)
      }
    })
  },

  // 更新 task
  updateTask ({allTask}, {task, attributes}) {
    let taskId = task.id
    let listId = task.belongTo.id
    Object.assign(allTask[listId].find(task => task.id === taskId), attributes)
  },

  // 添加一个子任务
  addSubTask ({allSubTask}, newSubTask) {
    let taskId = newSubTask.belongTo.id
    if (!allSubTask[taskId]) Vue.set(allSubTask, taskId, [])
    allSubTask[taskId].push(newSubTask)
  },

  // 添加一个评论
  addComment ({allComment}, newComment) {
    let taskId = newComment.belongTo.id
    if (!allComment[taskId]) Vue.set(allComment, taskId, [])
    allComment[taskId].push(newComment)
  },

  // 添加 一个 filemeta
  addFileMeta ({allFileMeta}, newFileMeta) {
    let taskId = newFileMeta.belongTo.id
    if (!allFileMeta[taskId]) Vue.set(allFileMeta, taskId, [])
    allFileMeta[taskId].unshift(newFileMeta)
  },

  // 删除子任务
  deleteSubTask ({allSubTask}, {subTask, index}) {
    let taskId = subTask.belongTo.id
    allSubTask[taskId].splice(index, 1)
  },

  // 更新子任务
  updateSubTask ({allSubTask}, {index, subTask, attributes}) {
    Object.assign(allSubTask[subTask.belongTo.id][index], attributes)
  },

  // 删除 一个filemeta
  deleteFileMeta ({allFileMeta}, {fileMeta, index}) {
    allFileMeta[fileMeta.belongTo.id].splice(index, 1)
  },

  // 删除 一个评论
  deleteComment ({allComment}, {comment, index}) {
    allComment[comment.belongTo.id].splice(index, 1)
  },

  // 删除任务
  deleteTask ({allTask}, task) {
    let index
    allTask[task.belongTo.id].find((t, i) => {
      if (t.id === task.id) index = i
    })
    allTask[task.belongTo.id].splice(index, 1)
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

  setDuplication (state) {
    state.duplicateTask = Object.assign({}, state.currentTask)
  },

}
