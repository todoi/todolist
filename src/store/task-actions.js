import leancloud from '../lib/leancloud'
let { AV, createObject, deleteAll, deleteObject, updateObject } = leancloud

export default {
  // 将 Task 上传到 leancloud
  createTask ({ commit, state: {allTask, currentList} }, newTask) {
    let promise, createdAt
    let listAVObject = AV.Object.createWithoutData('AllList', currentList.id)
    promise = createObject('AllTask', Object.assign({}, newTask, {belongTo: listAVObject,}))
    return promise.then(result => {
      let {id, attributes: {deadline}, createdAt} = result
      createdAt = new Date(createdAt).getTime()
      commit('addTask', Object.assign({}, result.attributes, {id, createdAt, deadline}))
    }).catch(error => console.log(error))
  },

  createSubTask ({ commit, state: {currentTask} }, newSubTask) {
    let promise, taskAVObject = AV.Object.createWithoutData('AllTask', currentTask.id)
    promise = createObject('AllSubTask', Object.assign({}, newSubTask, {belongTo: taskAVObject,}))
    return promise.then(result => {
      commit('addSubTask', Object.assign({}, result.attributes, {id: result.id}))
      return result
    }).catch(error => console.log(error))
  },

  deleteSubTask ({commit}, {subTask, index}) {
    return deleteObject('AllSubTask', subTask.id).then(val => {
      commit('deleteSubTask', {subTask, index})
      return val
    }).catch(error => console.log(error))
  },

  updateTask ({commit}, {task, attributes, commitFn}) {
    return updateObject('AllTask', task.id, attributes).then(val => {
      commit(commitFn, {task, attributes})
      return val
    }).catch(error => console.log(error))
  },

  updateSubTask ({commit}, {subTask, index, attributes, commitFn}) {
    return updateObject('AllSubTask', subTask.id, attributes).then(val => {
      commit(commitFn, {subTask, index, attributes})
    }).catch(error => console.log(error))
  }
}
