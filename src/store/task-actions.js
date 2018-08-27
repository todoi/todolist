import leancloud from '../lib/leancloud'
let { AV, createObject, deleteAll, deleteObject } = leancloud

export default {
  // 将 Task 上传到 leancloud
  createTask ({ commit, state: {allTask, currentList} }, newTask) {
    let promise, createdAt, deadline
    let listAVObject = AV.Object.createWithoutData('AllList', currentList.id)
    promise = createObject('AllTask', Object.assign({}, newTask, {belongTo: listAVObject,}))
    if (!promise) return
    promise.then(result => {
      let {id, attributes: {deadline}, createdAt} = result
      createdAt = new Date(createdAt).getTime()
      deadline = new Date(deadline).getTime()
      commit('addTask', Object.assign({}, result.attributes, {id: result.id, createdAt, deadline}))
    }).catch(error => console.log(error))
  },
}
