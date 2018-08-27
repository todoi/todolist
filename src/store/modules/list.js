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
        subTasksLength: 3,
        subTasksCompletedNumber: 2,
        note: {content: 'jfieji', displayView: true},
        comments:[
          {
            content:'fjidjifedf', 
            username: 'todoi', 
            createDate: 1525332096726, 
          },{
            content:'fjidjifedfdddddddd', 
            username: 'todoi', 
            createDate: 1525343096726, 
          }
        ],
        fileList:[ 
          {
            fileExtension: 'jpg', 
            fileName: 'Chrysanthemum.jpg', 
            uploadDate: 1525331956728, 
            fileSrc: '//via.placeholder.com/50x50', 
            creatorName: 'todoi', 
          },
        ],
      },{
        selected: false,
        title: '代码3',
        taskStarred: true,
        createDate: 1525331956727,
        deadline: null,
        isCompleted: false,
        subTasksLength: 1,
        subTasksCompletedNumber: 1,
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
        deadline: null,
        isCompleted: true,
        subTasksLength: 0,
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
    },
  },
  mutations: {
  }
}
