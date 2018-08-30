import leancloud from '../lib/leancloud'
let { AV, createObject, deleteAll, deleteObject, updateObject } = leancloud
export default {
  createList ({ commit, state: {allList} }, title) {
    commit('toggleSyncIcon')
    let promise, id, length = allList.length
    promise = createObject('AllList', {title, owner: AV.User.current()})
    if (!promise) return
    // console.log(promise)
    return promise.then(result => {
      id = result.id
      commit('toggleSyncIcon')
      commit('initList', { id, title, active: true })
      commit('switchList', {index: length, listArea: 'lists'} )
      return result
    }).catch(error => console.log(error))
  },

  // 删除整个 list
  deleteList ({ commit, state, getters }, { index, id }) {
    commit('toggleSyncIcon')
    let {taskIds, subTaskIds, commentIds, fileMetaIds} = getters.getCurrentListAllId
    let {allList, allTask, allSubTask, allComment, allFileMeta} = state
    let promises = [
      deleteObject('AllList', id), 
      deleteAll('AllTask', taskIds), 
      deleteAll('AllSubTask', subTaskIds),
      deleteAll('AllComment', commentIds), 
      deleteAll('AllFileMeta', fileMetaIds)
    ]
    return Promise.all(promises).then((value) => {
      commit('toggleSyncIcon')
      taskIds.forEach(taskId => {
        commit('deleteItem', {id: taskId, collectionName: 'allSubTask'})
        commit('deleteItem', {id: taskId, collectionName: 'allComment'})
        commit('deleteItem', {id: taskId, collectionName: 'allFileMeta'})
      })
      commit('deleteItem', {id, collectionName: 'allTask'})
      commit('deleteItem', {collectionName: 'allList', index})
      return value
    }).catch(error => console.log(error))
  },

  updateList ({commit}, {list, attributes}) {
    commit('toggleSyncIcon')
    return updateObject('AllList', list.id, attributes).then(val => {
      commit('toggleSyncIcon')
      commit('updateList', {list, attributes})
      return val
    }).catch(error => console.log(error))
  },
}
