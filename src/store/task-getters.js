import utils from '../lib/utils'
export default {
  // 得到当前 tab 下 所有的 task
  getListAllTask ({ currentList, allTask }, getters) {
    let arr
    if (currentList.isFilter) {
      arr = getters[`get${utils.toCapitalize(currentList.id)}`]
    } else {
      arr = allTask[currentList.id]
    }
    return arr
  },
  // 得到当前 list 下面没有完成的 task
  getTaskItems ({currentList}, { getListAllTask }) {
    if (currentList.id === 'completed') return []
    return getListAllTask.filter(task => !task.isCompleted)
  },
  // 得到当前 list 下面已经完成的 task
  getDoneTaskItems ({currentList}, { getListAllTask }) {
    if (currentList.id === 'completed') {
      return getListAllTask.filter(task => task.isCompleted)
    } else if (currentList.isFilter) {
      return []
    } else {
      return getListAllTask.filter(task => task.isCompleted)
    }
  },
  // 根据 taskId 得到下面所有的 subtask
  getCurrentSubTasks ({allSubTask}) {
    return (id) => {
      return allSubTask[id]
    }
  },
  // 根据 taskId 得到下面所有已经完成的 subtask
  getCompletedSubTasks ({allSubTask}) {
    return (id) => {
      return allSubTask[id].filter(subTask => subTask.isCompleted)
    }
  },
  // 根据 taskId 得到下面所有的 comment
  getCurrentComments ({allComment}) {
    return (id) => {
      return allComment[id]
    }
  },
  // 根据 taskId 得到下面所有的 filemeta
  getCurrentFileMetas ({allFileMeta}) {
    return (id) => {
      return allFileMeta[id]
    }
  },
  // 得到按listName 分类 '全部' tab 下面所有的 未完成 的 task 
  getAllSort (state, {getAll}) {
    return utils.sortFilterTasks (getAll)
  },
  // 得到按listName 分类 '已完成' tab 下面所有的 未完成 的 task 
  getCompletedSort (state, {getCompleted}) {
    return utils.sortFilterTasks (getCompleted)
  },
  // 得到按listName 分类 '已加星标' tab 下面所有的 未完成 的 task 
  getStarredSort (state, {getStarred}) {
    return utils.sortFilterTasks (getStarred)
  },
  // 得到按listName 分类 '今天' tab 下面所有的 未完成 的 task 
  getTodaySort (state, {getToday}) {
    return utils.sortFilterTasks (getToday)
  },
  // 得到按listName 分类 '周' tab 下面所有的 未完成 的 task 
  getWeekSort (state, {getWeek}) {
    return utils.sortFilterTasks (getWeek)
  },
  getListById ({allList}) {
    return (listId) => {
      return allList.filter(list => list.id === listId)[0]
    }
  },
}
