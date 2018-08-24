export default {
  state: {
    currentTask: {
      index: 0,
      isDoneItem: false
    },
    taskItems: [
      {
        selected: false,
        title: '码代码1',
        taskStarred: false,
        createDate: 1525331956726,
        deadline: 1525331976726,
        isCompleted: false,
        subTasks: [
          {title:'份额份额', isCompleted: false, displayView: true,}, 
          {title: 'dd', isCompleted: true, displayView: true,}, 
          {title: 'hh', isCompleted: true, displayView:true,}
        ],
        subTasksCompletedNumber: 2,
        note: {content: 'jfieji', displayView: true},
        comments:[
          {
            content:'fjidjifedf', 
            username: 'todoi', 
            createDate: 1525332096726, 
            imgSrc: '//via.placeholder.com/50x50'},
          {
            content:'fjidjifedfdddddddd', 
            username: 'todoi', 
            createDate: 1525343096726, 
            imgSrc: '//via.placeholder.com/50x50'
          }
        ],
        fileList:[ 
          {
            fileExtension: 'jpg', 
            fileName: 'Chrysanthemum.jpg', 
            uploadDate: 1525331956728, 
            fileSrc: '//via.placeholder.com/50x50', 
            creatorName: 'todoi', 
            creatorAvatar: '//via.placeholder.com/50x50', 
          },
        ],
      },{
        selected: false,
        title: '代码3',
        taskStarred: true,
        createDate: 1525331956727,
        deadline: null,
        isCompleted: false,
        subTasks: [],
        subTasksCompletedNumber: 0,
        note: {content: '', displayView: true},
        comments: [],
        fileList: [],
      }
    ],
    doneTaskItems: [
      {
        selected: false,
        title: '码代码2',
        taskStarred: false,
        createDate: 1525331956728,
        doneDate: 1525331966728,
        dealine: null,
        isCompleted: true,
        subTasks: [],
        subTasksCompletedNumber: 0,
        note: {content: '', displayView: true},
        comments: [],
        fileList: [],
      },
    ]
  },
  getters: {
    getSelectedTask ({ currentTask: { index, isDoneItem }, taskItems, doneTaskItems }) {
      if (isDoneItem) {
        return doneTaskItems[index]
      }
      return taskItems[index]
    }
  },
  mutations: {
    // 用户在未完成 item 的checkbox 上点击
    checkTask ({ taskItems, doneTaskItems }, { index }) {
      let item = taskItems[index]
      taskItems.splice(index, 1)
      // 重置为 已经完成
      item.isCompleted = true
      // 完成时间为当前时间
      item.doneDate = new Date().getTime()
      doneTaskItems.push(item)
    },
    // 用户在已经完成 item 的checkbox 上点击
    restoreTask ({ taskItems, doneTaskItems }, { index }) {
      let item = doneTaskItems[index]
      doneTaskItems.splice(index, 1)
      // 重置为 未完成
      item.isCompleted = false
      // 完成时间重置为 null
      item.doneDate = 0
      taskItems.push(item)
    },
    // 切换星标
    toggleTaskStar ({ taskItems, doneTaskItems }, {index, isDoneItem}){
      if (isDoneItem){
        doneTaskItems[index].taskStarred = !doneTaskItems[index].taskStarred
      }else{
        taskItems[index].taskStarred = !taskItems[index].taskStarred
      }
    },
    selectTaskItem ({ taskItems, doneTaskItems, currentTask }, {index, isDoneItem}) {
      taskItems.forEach(item => item.selected = false )
      doneTaskItems.forEach(item => item.selected = false )
      isDoneItem ? doneTaskItems[index].selected = true : taskItems[index].selected = true
      Object.assign(currentTask, { index, isDoneItem })
    },
  }
}
