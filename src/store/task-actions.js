import leancloud from '../lib/leancloud'
let { AV, createObject, deleteAll, deleteObject, updateObject } = leancloud

export default {
  createItem ({commit}, {className, attributes, commitFn, needCreatedAt}) {
    commit('toggleSyncIcon')
    return createObject(className, attributes).then(result => {
      let newItem = Object.assign({}, result.attributes, {id: result.id})
      if (needCreatedAt) newItem.created = new Date(result.createdAt).getTime()
      commit(commitFn, newItem)
      commit('toggleSyncIcon')
      return result
    }).catch(error => console.log(error))
  },

  // 将 Task 上传到 leancloud
  createTask ({ commit, dispatch, state: {currentList} }, newTask) {
    let listAVObject = AV.Object.createWithoutData('AllList', currentList.id)
    return dispatch('createItem' ,{
      className: 'AllTask',
      attributes: Object.assign({}, newTask, {belongTo: listAVObject,}),
      commitFn: 'addTask',
      needCreatedAt: true
    })
  },

  createSubTask ({ commit, dispatch, state: {currentTask} }, newSubTask) {
    let taskAVObject = AV.Object.createWithoutData('AllTask', currentTask.id)
    return dispatch('createItem' ,{
      className: 'AllSubTask',
      attributes: Object.assign({}, newSubTask, {belongTo: taskAVObject,}),
      commitFn: 'addSubTask',
      needCreatedAt: false
    })
  },

  createFileMeta ({commit, dispatch}, {task, fileMeta}) {
    let taskAVObject = AV.Object.createWithoutData('AllTask', task.id)
    return dispatch('createItem' ,{
      className: 'AllFileMeta',
      attributes: Object.assign({}, fileMeta, {belongTo: taskAVObject}),
      commitFn: 'addFileMeta',
      needCreatedAt: true
    })
  },

  createComment ({commit, dispatch}, {task, comment}) {
    let taskAVObject = AV.Object.createWithoutData('AllTask', task.id)
    return dispatch('createItem' ,{
      className: 'AllComment',
      attributes: Object.assign({}, comment, {belongTo: taskAVObject}),
      commitFn: 'addComment',
      needCreatedAt: true
    })
  },

  deleteTask ({commit, state}, task) {
    let {subTaskIds, commentIds, fileMetaIds} = getters.getCurrentTaskAllId
    let {allTask, allSubTask, allComment, allFileMeta} = state
    let promises = [
      deleteObject('AllTask', task.id), 
      deleteAll('AllSubTask', subTaskIds),
      deleteAll('AllComment', commentIds), 
      deleteAll('AllFileMeta', fileMetaIds)
    ]
    commit('toggleSyncIcon')
    return Promise.all(promises).then((value) => {
      let index = allTask[task.belongTo.id].find(t => t.id === task.id)
      commit('toggleSyncIcon')
      commit('deleteItem', {id: task.id, collectionName: 'allSubTask'})
      commit('deleteItem', {id: task.id, collectionName: 'allComment'})
      commit('deleteItem', {id: task.id, collectionName: 'allFileMeta'})
      commit('deleteItem', {id: task.id, collectionName: 'allTask', index})
      return value
    }).catch(error => console.log(error))
  },

  deleteSubTask ({commit}, {subTask, index}) {
    commit('toggleSyncIcon')
    return deleteObject('AllSubTask', subTask.id).then(val => {
      commit('toggleSyncIcon')
      commit('deleteSubTask', {subTask, index})
      return val
    }).catch(error => console.log(error))
  },

  deleteFileMeta ({commit}, {fileMeta, index}) {
    commit('toggleSyncIcon')
    return deleteObject('AllFileMeta', fileMeta.id).then(val => {
      commit('toggleSyncIcon')
      commit('deleteFileMeta', {fileMeta, index})
      return val
    }).catch(error => console.log(error))
  },

  deleteComment({commit}, {comment, index}) {
    commit('toggleSyncIcon')
    return deleteObject('AllComment', comment.id).then(val => {
      commit('toggleSyncIcon')
      commit('deleteComment', {comment, index})
      return val
    }).catch(error => console.log(error))
  },

  updateTask ({commit}, {task, attributes}) {
    commit('toggleSyncIcon')
    return updateObject('AllTask', task.id, attributes).then(val => {
      commit('toggleSyncIcon')
      commit('updateTask', {task, attributes})
      return val
    }).catch(error => console.log(error))
  },

  updateSubTask ({commit}, {subTask, index, attributes}) {
    commit('toggleSyncIcon')
    return updateObject('AllSubTask', subTask.id, attributes).then(val => {
      commit('toggleSyncIcon')
      commit('updateSubTask', {subTask, index, attributes})
    }).catch(error => console.log(error))
  },

}
