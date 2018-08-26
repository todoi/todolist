export default {
  // 侧边栏选中的list
  currentList: {
    objectId: '',
    title: '',
    index: 0,
    isFilter: true,
  },
  allList: [
    {
      objectId: 'work',
      title: '工作',
      active: false, // 拉倒数据是添加进去的
    },{
      objectId: 'life',
      title: '生活',
      active: false,
    },
  ],
  // list 的 leancloud objectId 为 key
  allTask: {
    work: [
      {
        objectId: 'workTask0',
        title: '工作 1',
        selected: false,
        starred: false,
        createAt: 1525331956726,
        deadline: 1525331976726,
        isCompleted: false,
        note: 'jfieji'
      },{
        objectId: 'workTask1',
        title: '代码 2',
        selected: false,
        starred: true,
        createAt: 1525331956727,
        deadline: null,
        isCompleted: false,
        note: ''
      },
      {
        objectId: 'workTask2',
        selected: false,
        title: '小珠子 333',
        starred: false,
        createAt: 1525331956728,
        doneDate: 1525331966728,
        deadline: null,
        isCompleted: true,
        note: ''
      }
    ],
    life: [
      {
        objectId: 'life0',
        title: '生活 a',
        selected: false,
        starred: true,
        createAt: 1525331956726,
        deadline: 1525331976726,
        isCompleted: false,
        note: 'jfieji',
      },{
        objectId: 'life1',
        title: '生活 b',
        selected: false,
        starred: true,
        createAt: 1525331956727,
        deadline: null,
        isCompleted: false,
        note: '',
      },
      {
        objectId: 'life2',
        selected: false,
        title: '生活 c',
        starred: false,
        createAt: 1525331956728,
        doneDate: 1525331966728,
        deadline: null,
        isCompleted: true,
        note: '',
      }
    ]
  },

  // task 的 leancloud objectId 为 key
  allSubTask: {
    work0: [
      {title:'份额份额', isCompleted: false, displayView: true,}, 
      {title: 'dd', isCompleted: true, displayView: true,}, 
      {title: 'hh', isCompleted: true, displayView:true,}
    ],
    work1: [
      {title: 'wor1-subtask a', isCompleted: false, displayView: true,}, 
      {title: 'wor1-subtask b', isCompleted: true, displayView: true,}, 
      {title: 'wor1-subtask c', isCompleted: true, displayView:true,}
    ],
    work2: [],
    life0: [
      {title: 'life0-subtask a', isCompleted: false, displayView: true,}, 
      {title: 'life0-subtask b', isCompleted: true, displayView: true,}, 
      {title: 'life0-subtask c', isCompleted: true, displayView:true,}
    ],
    left1: [
      {title: 'life1-subtask a', isCompleted: false, displayView: true,}, 
      {title: 'life1-subtask b', isCompleted: true, displayView: true,}, 
      {title: 'life1-subtask c', isCompleted: true, displayView:true,}
    ],
    left2: [],
  },
  allComment: {
    work0: [
      { content: 'fjidjifedf', createAt: 1525332096726, },
      { content: 'fjidjifedfdddddddd', createAt: 1525343096726, }
    ],
    work1: [
      { content: 'work1-comment 0', createAt: 1525332096726, },
      { content: 'work1-comment 1', createAt: 1525343096726, }
    ],
    work2: [],
    life0: [
      { content: 'life0-comment 0', createAt: 1525332096726, },
      { content: 'life0-comment 1', createAt: 1525343096726, }
    ],
    left1: [],
    left2: [],
  },
  allFileMeta: {
    work0: [
      {
        fileExtension: 'jpg', 
        fileName: 'Chrysanthemum.jpg', 
        uploadDate: 1525331956728, 
        fileSrc: '//via.placeholder.com/50x50', 
        creatorName: 'todoi', 
      }
    ],
    work1: [],
    work2: [],
    life0: [
      {
        fileExtension: 'jpg', 
        fileName: 'Chrysanthemum.jpg', 
        uploadDate: 1525331956728, 
        fileSrc: '//via.placeholder.com/50x50', 
        creatorName: 'todoi', 
      }
    ],
    left1: [],
    left2: [],
  },
  filterCollection: [
    {
      objectId: 'all',
      isAnimateUp: false,
      title: '全部',
      active: false,
    },{
      objectId: 'starred',
      isAnimateUp: false,
      title: '已加星标',
      active: false,
    },{
      objectId: 'today',
      isAnimateUp: false,
      title: '今天',
      active: false,
    },{
      objectId: 'week',
      isAnimateUp: false,
      title: '周',
      active: false,
    },{
      objectId: 'completed',
      isAnimateUp: false,
      title: '已完成',
      active: false,
    }
  ]
}
