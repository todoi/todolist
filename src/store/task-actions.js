import leancloud from '../lib/leancloud'
let { AV, createAVObject, deleteAVAll, deleteAVObject, updateAVObject } = leancloud

export default {
  createItem ({commit}, {className, attributes, commitFn, needCreatedAt}) {
    commit('toggleSyncIcon')
    return createAVObject(className, attributes).then(result => {
      let newItem = Object.assign({}, result.attributes, {id: result.id})
      if (needCreatedAt) newItem.createdAt = new Date(result.createdAt).getTime()
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
    }).then(result => {
      commit('selectListTask', {taskId: result.id, listId: result.attributes.belongTo.id})
      return result
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

  deleteTask ({commit, state, getters}, task) {
    let {subTaskIds, commentIds, fileMetaIds} = getters.getCurrentTaskAllId
    let {allTask, allSubTask, allComment, allFileMeta} = state
    let promises = [
      deleteAVObject('AllTask', task.id), 
      deleteAVAll('AllSubTask', subTaskIds),
      deleteAVAll('AllComment', commentIds), 
      deleteAVAll('AllFileMeta', fileMetaIds)
    ]
    commit('toggleSyncIcon')
    return Promise.all(promises).then((value) => {
      commit('deleteTaskChildren', task.id)
      commit('deleteTask', task)
      commit('toggleSyncIcon')
      return value
    }).catch(error => console.log(error))
  },

  deleteSubTask ({commit}, {subTask, index}) {
    commit('toggleSyncIcon')
    return deleteAVObject('AllSubTask', subTask.id).then(val => {
      commit('deleteSubTask', {subTask, index})
      commit('toggleSyncIcon')
      return val
    }).catch(error => console.log(error))
  },

  deleteFileMeta ({commit}, {fileMeta, index}) {
    commit('toggleSyncIcon')
    return deleteAVObject('AllFileMeta', fileMeta.id).then(val => {
      commit('deleteFileMeta', {fileMeta, index})
      commit('toggleSyncIcon')
      return val
    }).catch(error => console.log(error))
  },

  deleteComment({commit}, {comment, index}) {
    commit('toggleSyncIcon')
    return deleteAVObject('AllComment', comment.id).then(val => {
      commit('deleteComment', {comment, index})
      commit('toggleSyncIcon')
      return val
    }).catch(error => console.log(error))
  },

  updateTask ({commit}, {task, attributes}) {
    commit('toggleSyncIcon')
    return updateAVObject('AllTask', task.id, attributes).then(val => {
      commit('updateTask', {task, attributes})
      commit('toggleSyncIcon')
      return val
    }).catch(error => console.log(error))
  },

  updateSubTask ({commit}, {subTask, index, attributes}) {
    commit('toggleSyncIcon')
    return updateAVObject('AllSubTask', subTask.id, attributes).then(val => {
      commit('updateSubTask', {subTask, index, attributes})
      commit('toggleSyncIcon')
    }).catch(error => console.log(error))
  },

}
