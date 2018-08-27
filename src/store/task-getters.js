import utils from '../lib/utils'
export default {
  getListAllTask ({ currentList, allTask }, getters) {
    let arr
    if (currentList.isFilter) {
      arr = getters[`get${utils.toCapitalize(currentList.id)}`]
    } else {
      arr = allTask[currentList.id]
    }
    return arr
  },
  getTaskItems (state, { getListAllTask }) {
    let arr
    arr = getListAllTask.filter(task => !task.isCompleted)
    return arr
  },
  getDoneTaskItems (state, { getListAllTask }) {
    let arr
    arr = getListAllTask.filter(task => task.isCompleted)
    return arr
  },
  getCurrentSubtasks ({allSubTask}) {
    return (id) => {
      return allSubTask[id]
    }
  },
  getCurrentComments ({allComment}) {
    return (id) => {
      return allComment[id]
    }
  },
  getCurrentFileMetas ({allFileMeta}) {
    return (id) => {
      return allFileMeta[id]
    }
  },
}
