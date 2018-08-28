import Vue from 'vue'
export default {
  // 添加新的 Task
  addTask ({allTask, allSubTask, allComment, allFileMeta}, newTask) {
    // allTask[newTask.belongTo.id].unshift(newTask)
    //allSubTask[newTask.id] = []
    //allComment[newTask.id] = []
    //allFileMeta[newTask.id] = []
    allTask[newTask.belongTo.id] = [newTask].concat(allTask[newTask.belongTo.id])
    Vue.set(allSubTask, newTask.id, [])
    Vue.set(allComment, newTask.id, [])
    Vue.set(allFileMeta, newTask.id, [])
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
  toggleTaskCheckbox ({ allTask }, { task, attributes }) {
    let listId = task.belongTo.id
    let taskId = task.id
    let findTask = allTask[listId].find(task => task.id === taskId) 
    findTask.isCompleted = attributes.isCompleted
    // 重置完成时间
    findTask.finishAt = attributes.finishAt
  },

  // 切换星标
  toggleTaskStar ({allTask}, {task, attributes}){
    let listId = task.belongTo.id
    let taskId = task.id
    allTask[listId].find(task => task.id === taskId).starred = attributes.starred
  },

  // 更改任务标题
  changeTaskTitle ({ currentTask, allTask }, {task, attributes}) {
    let taskId = task.id
    let listId = task.belongTo.id
    allTask[listId].find(task => task.id === taskId).title = attributes.title
  },



  toggleSubTaskBox ({ allSubTask }, {index, subTask, attributes: {isCompleted}}) {
    allSubTask[subTask.belongTo.id][index].isCompleted = isCompleted
  },

  addSubTask ({allSubTask}, newSubTask) {
    let taskId = newSubTask.belongTo.id
    allSubTask[taskId].push(newSubTask)
  },

  deleteSubTask ({allSubTask}, {subTask, index}) {
    let taskId = subTask.belongTo.id
    allSubTask[taskId].splice(index, 1)
  },

  changeSubTaskTitle ({allSubTask}, {index, subTask, attributes: {title: newTitle}}) {
    allSubTask[subTask.belongTo.id][index].title = newTitle
  }
}
