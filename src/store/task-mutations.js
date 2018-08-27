export default {
  addTask ({allTask, allSubTask, allComment, allFileMeta}, newTask) {
    allTask[newTask.belongTo.id].unshift(newTask)
    allSubTask[newTask.id] = []
    allComment[newTask.id] = []
    allFileMeta[newTask.id] = []
  }
}
