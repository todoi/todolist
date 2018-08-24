export default {
  state: {
    taskItems: [
      {
        selected: false,
        title: '码代码1',
        taskStarred: false,
        createDate: 1525331956726,
        deadline: 1525331976726,
        isCompleted: false,
        subTasks: [{title:'份额份额', isCompleted: false, displayView: true,}, {title: 'dd', isCompleted: true, displayView: true,}, {title: 'hh', isCompleted: true, displayView:true,}],
        subTasksCompletedNumber: 2,
        note: {content: 'jfieji', displayView: true},
        comments:[
          {content:'fjidjifedf', username: 'todoi', createDate: 1525332096726, imgSrc: '//via.placeholder.com/50x50'},
          {content:'fjidjifedfdddddddd', username: 'todoi', createDate: 1525343096726, imgSrc: '//via.placeholder.com/50x50'}
        ],
        fileList:[ 
          {fileExtension: 'jpg', fileName: 'Chrysanthemum.jpg', uploadDate: 1525331956728, fileSrc: '//via.placeholder.com/50x50', creatorName: 'todoi', creatorAvatar: '//via.placeholder.com/50x50', },
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
  mutations: {
  }
}
