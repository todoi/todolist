import leancloud from '../lib/leancloud'

let {AV} = leancloud
let allList = [], allTask = {}, allSubTask = {}, allComment = {}, allFileMeta = {}

new AV.Query('AllList').find()
  .then(lists => {
    lists.forEach(list => {
      let {id, attributes} = list
      allList.push(list)
    });
  })
  .then(() => {
    return new AV.Query('AllTask').find()
  })
