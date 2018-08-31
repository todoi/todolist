import utils from '../lib/utils'

export default {
  getFilterCollection (state) {
    return state.filterCollection
  },
  getListCollection (state) {
    return state.allList
  },
  getAllTasks ({allTask}) {
    let arr = []
    console.log(allTask)
    for (var key in allTask) {
      if (allTask.hasOwnProperty(key)) {
        arr = arr.concat(allTask[key])
      }
    }
    return arr
  },
  // 不包含已完成的任务 侧边栏 '全部' tab 
  getAll (state, { getAllTasks }) {
    console.log(getAllTasks)
    let arr = getAllTasks.filter(task => !task.isCompleted)
    return arr
  },
  // 只包含已经完成的任务 侧边栏 '已完成' tab
  getCompleted (state, { getAllTasks }) {
    return getAllTasks.filter(task => task.isCompleted)
  },
  getCompletedOverdue () {
    return []
  },
  getAllHasDeadline (state, { getAll }) {
    return getAll.filter(task => task.deadline)
  },
  // 不包含已完成的任务 侧边栏 '全部' tab 的过期任务数量 
  getAllOverdue (state, { getAllHasDeadline }) {
    let nowTimeStamp = new Date().getTime()
    return getAllHasDeadline.filter(task => task.deadline < nowTimeStamp)
  },
  // 不包含已完成的任务 侧边栏 '已加星标' tab 
  getStarred (state, { getAll }) {
    return getAll.filter(task => task.starred)
  },
  getStarredOverdue (state, { getAllOverdue }) {
    return getAllOverdue.filter(task => task.starred)
  },
  // 不包含已完成的任务 侧边栏 '今天'到期的 tab 
  getToday (state, { getAllHasDeadline }) {
    let {min, max} = utils.getTodayDuration(new Date().getTime())
    return getAllHasDeadline.filter(task => task.deadline >= min && task.deadline < max)
  },
  getTodayOverdue (state, { getToday }) {
    let nowTimeStamp = new Date().getTime()
    return getToday.filter(task => task.deadline < nowTimeStamp)
  },
  // 不包含已完成的任务 侧边栏 '周'到期的 tab 
  getWeek (state, { getAllHasDeadline }) {
    let {min, max} = utils.getWeekDuration(new Date().getTime())
    return getAllHasDeadline.filter(task => task.deadline >= min && task.deadline < max)
  },
  getWeekOverdue (state, { getWeek }) {
    let nowTimeStamp = new Date().getTime()
    return getWeek.filter(task => task.deadline < nowTimeStamp)
  },
  getListOverdue ({allTask}) {
    return (id) => {
      let nowTimeStamp = new Date().getTime()
      return allTask[id].filter(task => task.deadline && task.deadline < nowTimeStamp)
    }
  },
  getCurrentListAllId (state) {
    let {currentList: {id}, allTask, allSubTask, allComment, allFileMeta} = state
    let taskIds, subTaskIds = [], commentIds = [], fileMetaIds = []
    taskIds = allTask[id].map(task => task.id)
    taskIds.forEach(id => {
      allSubTask[id].forEach(subTask =>  subTaskIds.push(subTask.id))
      allComment[id].forEach(comment =>  commentIds.push(comment.id))
      allFileMeta[id].forEach(fileMeta =>  fileMetaIds.push(fileMeta.id))
    })
    return {taskIds, subTaskIds, commentIds, fileMetaIds}
  }
}
