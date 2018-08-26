import leancloud from '../lib/leancloud'
let { AV, createObject, deleteAll, deleteObject } = leancloud
export default {
  createList ({ commit, state: {allList} }, title) {
    let promise, objectId, length = allList.length
    promise = createObject('AllList', {title, owner: AV.User.current()})
    if (!promise) return
    // console.log(promise)
    promise.then(result => {
      objectId = result.id
      commit('initList', { objectId, title, active: true })
      commit('switchList', {index: length, listArea: 'lists'} )
    })
  },
  deleteList ({ commit, state, getters }, { index, objectId }) {
    let promises = []
    let {taskIds, subTaskIds, commentIds, fileMetaIds} = getters.getCurrentListAllId
    let {allList, allTask, allSubTask, allComment, allFileMeta} = state
    promises.push(deleteObject('AllList', objectId))
    promises.push(deleteAll('AllTask', taskIds))
    promises.push(deleteAll('AllSubTask', subTaskIds))
    promises.push(deleteAll('AllComment', commentIds))
    promises.push(deleteAll('AllFileMeta', fileMetaIds))
    Promise.all(promises).then((value) => {
      taskIds.forEach(taskId => {
        commit('deleteItem', {objectId: taskId, collectionName: 'allSubTask'})
        commit('deleteItem', {objectId: taskId, collectionName: 'allComment'})
        commit('deleteItem', {objectId: taskId, collectionName: 'allFileMeta'})
      })
      commit('deleteItem', {objectId, collectionName: 'allTask'})
      commit('deleteItem', {collectionName: 'allList', index})
    })
  },
}
