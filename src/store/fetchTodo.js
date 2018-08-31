import leancloud from '../lib/leancloud'

let {AV} = leancloud
let allList = [], allTask = {}, allSubTask = {}, allComment = {}, allFileMeta = {}
let tasks = [], subTasks = [], comments = [], fileMetas = []

function loopAVArray (obj) {
  let {items, arr, needCreatedAt, otherAttributes} = obj
  items.forEach((item) => {
    let {id, attributes, createdAt} = item
    let newItem = Object.assign({id}, attributes, otherAttributes)
    if (needCreatedAt) {
      newItem.createdAt = new Date(createdAt).getTime()
    }
    arr.push(newItem)
  })
}

function sortItems (arr, obj) {
  arr.forEach(item => {
    let parentId = item.belongTo.id
    if (!obj[parentId]) {
      obj[parentId] = []
      obj[parentId].push(item)
    } else {
      obj[parentId].push(item)
    }
  })
}

let promise = new AV.Query('AllList').find()
  .then(items => {
    return loopAVArray({
      items,
      arr: allList,
      needCreatedAt: false,
      otherAttributes: {active: false}
    })
  }).then(() => {
    return new AV.Query('AllTask').find()
      .then(items => {
        loopAVArray({
          items,
          arr: tasks,
          needCreatedAt: true,
          otherAttributes: {selected: false}
        })
      })
  }).then(() => {
    return new AV.Query('AllSubTask').find()
      .then(items => {
        loopAVArray({
          items,
          arr: subTasks,
          needCreatedAt: false,
          otherAttributes: {}
        })
      })
  }).then(() => {
    return new AV.Query('AllComment').find()
      .then(items => {
        loopAVArray({
          items,
          arr: comments,
          needCreatedAt: true,
          otherAttributes: {}
        })
      })
  }).then(() => {
    return new AV.Query('AllFileMeta').find()
      .then(items => {
        loopAVArray({
          items,
          arr: fileMetas,
          needCreatedAt: true,
          otherAttributes: {}
        })
      })
  }).then(() => {
    sortItems(tasks, allTask)
    sortItems(subTasks, allSubTask)
    sortItems(comments, allComment)
    sortItems(fileMetas, allFileMeta)
    return {allList, allTask, allSubTask, allComment, allFileMeta}
  })

export default promise

