import utils from '../lib/utils'

export default {
  getFilterCollection (state) {
    return state.filterCollection
  },
  getListCollection (state) {
    return state.allList
  },
  getAllTasks ({allTasks}) {
    let arr = []
    for (var key in allTasks) {
      if (allTasks.hasOwnProperty(key)) {
        arr = arr.concat(allTasks[key])
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
  getListOverdue ({allTasks}) {
    return (objectId) => {
      let nowTimeStamp = new Date().getTime()
      let arr = allTasks[objectId].filter(task => task.deadline && task.deadline < nowTimeStamp)
      return arr
    }
  }
}
