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

  updateTask ({allTask}, {task, attributes}) {
    let taskId = task.id
    let listId = task.belongTo.id
    Object.assign(allTask[listId].find(task => task.id === taskId), attributes)
  },


  addSubTask ({allSubTask}, newSubTask) {
    let taskId = newSubTask.belongTo.id
    allSubTask[taskId].push(newSubTask)
  },

  addComment ({allComment}, newComment) {
    let taskId = newComment.belongTo.id
    allComment[taskId].push(newComment)
  },

  addFileMeta ({allFileMeta}, newFileMeta) {
    allFileMeta[newFileMeta.belongTo.id].unshift(newFileMeta)
  },

  deleteSubTask ({allSubTask}, {subTask, index}) {
    let taskId = subTask.belongTo.id
    allSubTask[taskId].splice(index, 1)
  },

  updateSubTask ({allSubTask}, {index, subTask, attributes}) {
    Object.assign(allSubTask[subTask.belongTo.id][index], attributes)
  },

  deleteFileMeta ({allFileMeta}, {fileMeta, index}) {
    allFileMeta[fileMeta.belongTo.id].splice(index, 1)
  },

  deleteComment ({allComment}, {comment, index}) {
    allComment[comment.belongTo.id].splice(index, 1)
  },

  deleteTask ({allTask}, task) {
    let index
    allTask[task.belongTo.id].find((t, i) => {
      if (t.id === task.id) index = i
    })
    allTask[task.belongTo.id].splice(index, 1)
  }

}
