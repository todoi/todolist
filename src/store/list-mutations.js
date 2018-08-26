export default {
  switchList ({filterCollection, allList, currentList}, {index, listArea}) {
    // 选中侧边栏中的 List 
    filterCollection.forEach(item => item.active = false)
    allList.forEach(item => item.active = false)
    if(listArea === 'filters'){
      filterCollection[index]['active'] = 'true'
      Object.assign(currentList, filterCollection[index], {index})
    }
    if(listArea === 'lists'){
      allList[index]['active'] = 'true'
      Object.assign(currentList, allList[index], {index})
      console.log(currentList)
    }
  }
}
