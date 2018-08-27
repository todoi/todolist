export default {
  switchList ({filterCollection, allList, currentList}, {index, listArea}) {
    // 选中侧边栏中的 List 
    filterCollection.forEach(item => item.active = false)
    allList.forEach(item => item.active = false)
    if(listArea === 'filters'){
      filterCollection[index]['active'] = 'true'
      Object.assign(currentList, filterCollection[index], {index, isFilter: true})
    }
    if(listArea === 'lists'){
      allList[index]['active'] = 'true'
      Object.assign(currentList, allList[index], {index, isFilter: false})
    }
  },
  changeListTitle ({ allList }, { index, newTitle, isFilter }) {
    if (!isFilter) {
      allList[index].title = newTitle
    }
  },
  initList ({allList, allTask}, { id, title, active }) {
    allList.push({ id, title, active: true })
    allTask[id] = []
  },
  deleteItem (state, {id, collectionName, index}) {
    if (index) {
      state[collectionName].splice(index, 1)
    } else {
      delete state[collectionName].id
    }
  }
}
