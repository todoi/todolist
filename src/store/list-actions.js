import leancloud from '../lib/leancloud'
import fetchAll from './fetchTodo'

let { AV, createAVObject, deleteAVAll, deleteAVObject, updateAVObject } = leancloud
export default {
  fetchTodo ({commit, state}) {
    if (!state.allList.length) {
      fetchAll().then(allObj => {
        commit('initTodo', allObj)
      }).catch(error => console.log(error))
    }
  },

  createList ({ commit, state: {allList} }, title) {
    commit('toggleSyncIcon')
    let length = allList.length
    return createAVObject('AllList', {title, owner: AV.User.current()}).then(result => {
      commit('initList', { id: result.id, title, active: true })
      commit('switchList', {index: length, listArea: 'lists'} )
      commit('toggleSyncIcon')
      return result
    }).catch(error => console.log(error))
  },

  // 删除整个 list
  deleteList ({ commit, state, getters }, { index, id }) {
    commit('toggleSyncIcon')
    let {taskIds, subTaskIds, commentIds, fileMetaIds} = getters.getCurrentListAllId
    let {allList, allTask, allSubTask, allComment, allFileMeta} = state
    let promises = [
      deleteAVObject('AllList', id), 
      deleteAVAll('AllTask', taskIds), 
      deleteAVAll('AllSubTask', subTaskIds),
      deleteAVAll('AllComment', commentIds), 
      deleteAVAll('AllFileMeta', fileMetaIds)
    ]
    return Promise.all(promises).then((value) => {
      taskIds.forEach(taskId => {
        commit('deleteTaskChildren', taskId)
      })
      commit('deleteList', {listId: id, listIndex: index})
      commit('toggleSyncIcon')
      return value
    }).catch(error => console.log(error))
  },

  updateList ({commit}, {list, attributes}) {
    commit('toggleSyncIcon')
    return updateAVObject('AllList', list.id, attributes).then(val => {
      commit('updateList', {list, attributes})
      commit('toggleSyncIcon')
      return val
    }).catch(error => console.log(error))
  },
}
