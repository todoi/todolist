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
    if (currentTask.id === taskId && currentTask.selected) {return}
    allTask[listId].forEach(task => task.id === taskId ? task.selected=true : task.selected=false )
    Object.assign(currentTask, item)
  },
  // 点击在 filter 列表的 的某个任务
  // 比如点击在 '已加星标' 的某个任务上
  selectFilterTask ({ allTask, currentTask }, {taskId, listId, task, items}) {
    if (currentTask.id === taskId && currentTask.selected) {return}
    items.forEach(item => {
      if (item.listId === listId) {
        allTask[item.listId].forEach(task => task.id === taskId ? task.selected=true : task.selected=false)
      } else {
        allTask[item.listId].forEach(task => task.selected=false)
      }
    })
    Object.assign(currentTask, task)
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
    Object.assign(currentTask, task)
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
        task.finishAt= 0
      }
    })
    Object.assign(currentTask, task)
  },
  toggleTaskStar ({allTask}, task){
    let listId = task.belongTo.id
    let taskId = task.id
    allTask[listId].forEach(task => {
      if (task.id === taskId) {
        task.starred = !task.starred
      }
    })
  },
}
