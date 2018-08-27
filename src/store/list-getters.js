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
    for (var key in allTask) {
      if (allTask.hasOwnProperty(key)) {
        arr = arr.concat(allTask[key])
      }
    }
    return arr
  },
  // 不包含已完成的任务
  getAll (state, { getAllTasks }) {
    let arr = getAllTasks.filter(task => !task.isCompleted)
    return arr
  },
  // 只包含已经完成的任务
  getCompleted (state, { getAllTasks }) {
    let arr = getAllTasks.filter(task => task.isCompleted)
    return arr
  },
  getCompletedOverdue () {
    return []
  },
  getAllHasDeadline (state, { getAll }) {
    let arr = getAll.filter(task => task.deadline)
    return arr
  },
  getAllOverdue (state, { getAllHasDeadline }) {
    let nowTimeStamp = new Date().getTime()
    let arr = getAllHasDeadline.filter(task => task.deadline < nowTimeStamp)
    return arr
  },
  getStarred (state, { getAll }) {
    let arr = getAll.filter(task => task.starred)
    return arr
  },
  getStarredOverdue (state, { getAllOverdue }) {
    let arr = getAllOverdue.filter(task => task.starred)
    return arr
  },
  getToday (state, { getAllHasDeadline }) {
    let {min, max} = utils.getTodayDuration(new Date().getTime())
    let arr = getAllHasDeadline.filter(task => task.deadline >= min && task.deadline < max)
    return arr
  },
  getTodayOverdue (state, { getToday }) {
    let nowTimeStamp = new Date().getTime()
    let arr = getToday.filter(task => task.deadline < nowTimeStamp)
    return arr
  },
  getWeek (state, { getAllHasDeadline }) {
    let {min, max} = utils.getWeekDuration(new Date().getTime())
    let arr = getAllHasDeadline.filter(task => task.deadline >= min && task.deadline < max)
    return arr
  },
  getWeekOverdue (state, { getWeek }) {
    let nowTimeStamp = new Date().getTime()
    let arr = getWeek.filter(task => task.deadline < nowTimeStamp)
    return arr
  },
  getListOverdue ({allTask}) {
    return (id) => {
      let nowTimeStamp = new Date().getTime()
      let arr = allTask[id].filter(task => task.deadline && task.deadline < nowTimeStamp)
      return arr
    }
  },
  getCurrentListAllId (state) {
    let {currentList: {id}, allTask, allSubTask, allComment, allFileMeta} = state
    let taskIds, subTaskIds = [], commentIds = [], fileMetaIds = []
    taskIds = allTask[id].map(task => task.id)
    taskIds.forEach(id => {
      allSubTask[id].forEach(subTask =>  subTaskIds.push(subTask.id))
      allComment[id].forEach(comment =>  commentIds.push(comment.id))
      allFileMeta[id].forEach(fileMeta =>  fileMetas.push(fileMeta.id))
    })
    return {taskIds, subTaskIds, commentIds, fileMetaIds}
  }
}
