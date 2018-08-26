import leancloud from '../lib/leancloud'
let { AV, createObject } = leancloud
export default {
  createList ({ commit, state: {allList} }, title) {
    let promise, objectId, length = allList.length
    promise = createObject('AllList', {title, owner: AV.User.current()})
    if (!promise) return
    console.log(promise)
    promise.then(result => {
      objectId = result.objectId
      commit('initList', { objectId, title, active: true })
      commit('switchList', {index: length, listArea: 'lists'} )
    })
  },
}
