import leancloud from '../lib/leancloud'
let { AV, createObject, deleteAll, deleteObject } = leancloud
export default {
  createList ({ commit, state: {allList} }, title) {
    let promise, id, length = allList.length
    promise = createObject('AllList', {title, owner: AV.User.current()})
    if (!promise) return
    // console.log(promise)
    return promise.then(result => {
      id = result.id
      commit('initList', { id, title, active: true })
      commit('switchList', {index: length, listArea: 'lists'} )
      return result
    }).catch(error => console.log(error))
  },
  deleteList ({ commit, state, getters }, { index, id }) {
    let promises = []
    let {taskIds, subTaskIds, commentIds, fileMetaIds} = getters.getCurrentListAllId
    let {allList, allTask, allSubTask, allComment, allFileMeta} = state
    promises.push(deleteObject('AllList', id))
    promises.push(deleteAll('AllTask', taskIds))
    promises.push(deleteAll('AllSubTask', subTaskIds))
    promises.push(deleteAll('AllComment', commentIds))
    promises.push(deleteAll('AllFileMeta', fileMetaIds))
    return Promise.all(promises).then((value) => {
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
}
