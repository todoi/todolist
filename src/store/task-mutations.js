export default {
  // 添加新的 Task
  addTask ({allTask, allSubTask, allComment, allFileMeta}, newTask) {
    allTask[newTask.belongTo.id].unshift(newTask)
    // init allSubTask
    allSubTask[newTask.id] = []
    allComment[newTask.id] = []
    allFileMeta[newTask.id] = []
  },
  // 点击在 list 列表的 的某个任务
  selectListTask ({ allTask, currentTask }, {taskId, listId, item}) {
    allTask[listId].forEach(task => task.id === taskId 
      ? (task.selected=true, Object.assign(currentTask, task))
      : task.selected=false )
  },
  // 点击在 filter 列表的 的某个任务
  // 比如点击在 '已加星标' 的某个任务上
  selectFilterTask ({ allTask, currentTask }, {taskId, listId, task, items}) {
    items.forEach(item => {
      if (item.listId === listId) {
        allTask[item.listId].forEach(task => task.id === taskId 
          ? (task.selected=true, Object.assign(currentTask, task))
          : task.selected=false)
      } else {
        allTask[item.listId].forEach(task => task.selected=false)
      }
    })
    
  },
  // 用户在未完成 item 的checkbox 上点击
  checkTask ({ currentTask, allTask }, task) {
    let listId = task.belongTo.id
    let taskId = task.id
    allTask[listId].forEach(task => {
      if (task.id === taskId) {
        task.isCompleted = true
        // 完成时间为当前时间
        task.finishAt= new Date().getTime()
      }
    })
  },
  // 用户在已经完成 item 的checkbox 上点击
  restoreTask ({ currentTask, allTask }, task) {
    let listId = task.belongTo.id
    let taskId = task.id
      allTask[listId].forEach(task => {
        if (task.id === taskId) {
        // 重置为 未完成
        task.isCompleted = false
        // 完成时间重置为 null
        task.finishAt= ''
      }
    })
  },
  // 切换星标
  toggleTaskStar ({allTask}, task){
    let listId = task.belongTo.id
    let taskId = task.id
    allTask[listId].forEach(task => {
      if (task.id === taskId) {
        task.starred = !task.starred
      }
    })
  },
  // 更改任务标题
  changeTaskTitle ({ currentTask, allTask }, title) {
    let taskId = currentTask.id
    let listId = currentTask.belongTo.id
    allTask[listId].find(task => task.id === taskId).title = title
  },
  toggleSubTaskBox ({ currentTask, allSubTask }, {index, item: subTask}) {
    let sb = allSubTask[currentTask.id][index]  
    sb.isCompleted = !sb.isCompleted
  }
}
