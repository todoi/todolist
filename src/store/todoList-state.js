export default {
  // 侧边栏选中的list
  currentList: {
    id: 'all',
    title: '全部',
    index: 0,
    isFilter: true,
  },
  currentTask: {
    id: 'work0',
    title: ' ',
    belongTo: {id: 'work'},
    selected: false,
    starred: false,
    createdAt: '',
    deadline: '',
    isCompleted: false,
    note: '',
  },
  allList: [
    {
      id: 'work',
      title: '工作',
      active: false, // 拉倒数据是添加进去的
    },{
      id: 'life',
      title: '生活',
      active: false,
    },
  ],
  // list 的 leancloud id 为 key
  allTask: {
    work: [
      {
        id: 'work0',
        title: '工作 1',
        selected: false,
        starred: false,
        createdAt: 1525331956726,
        deadline: 1525331976726,
        isCompleted: false,
        belongTo: {id: 'work'},
        note: 'jfieji',
      },{
        id: 'work1',
        title: '代码 2',
        selected: false,
        starred: true,
        createdAt: 1525331956727,
        deadline: '',
        isCompleted: false,
        belongTo: {id: 'work'},
        note: ''
      },
      {
        id: 'work2',
        selected: false,
        title: '小珠子 333',
        starred: false,
        createdAt: 1525331956728,
        finishAt: 1525331966728,
        deadline: '',
        isCompleted: true,
        belongTo: {id: 'work'},
        note: ''
      }
    ],
    life: [
      {
        id: 'life0',
        title: '生活 a',
        selected: false,
        starred: true,
        createdAt: 1525331956726,
        deadline: 1525331976726,
        isCompleted: false,
        belongTo: {id: 'life'},
        note: 'jfieji',
      },{
        id: 'life1',
        title: '生活 b',
        selected: false,
        starred: true,
        createdAt: 1525331956727,
        deadline: '',
        isCompleted: false,
        belongTo: {id: 'life'},
        note: '',
      },
      {
        id: 'life2',
        selected: false,
        title: '生活 c',
        starred: false,
        createdAt: 1525331956728,
        finishAt: 1525331966728,
        deadline: '',
        isCompleted: true,
        belongTo: {id: 'life'},
        note: '',
      }
    ]
  },

  // task 的 leancloud id 为 key
  allSubTask: {
    work0: [
      {title:'份额份额', isCompleted: false, displayView: true,}, 
      {title: 'dd', isCompleted: false, displayView: true,}, 
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
      {title: 'life0-subtask b', isCompleted: false, displayView: true,}, 
      {title: 'life0-subtask c', isCompleted: false, displayView:true,}
    ],
    life1: [
      {title: 'life1-subtask a', isCompleted: false, displayView: true,}, 
      {title: 'life1-subtask b', isCompleted: true, displayView: true,}, 
      {title: 'life1-subtask c', isCompleted: true, displayView:true,}
    ],
    life2: [],
  },
  allComment: {
    work0: [
      { content: 'fjidjifedf', createdAt: 1525332096726, },
      { content: 'fjidjifedfdddddddd', createdAt: 1525343096726, }
    ],
    work1: [
      { content: 'work1-comment 0', createdAt: 1525332096726, },
      { content: 'work1-comment 1', createdAt: 1525343096726, }
    ],
    work2: [],
    life0: [
      { content: 'life0-comment 0', createdAt: 1525332096726, },
      { content: 'life0-comment 1', createdAt: 1525343096726, }
    ],
    life1: [],
    life2: [],
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
    life1: [],
    life2: [],
  },
  filterCollection: [
    {
      id: 'all',
      isAnimateUp: false,
      title: '全部',
      active: false,
    },{
      id: 'starred',
      isAnimateUp: false,
      title: '已加星标',
      active: false,
    },{
      id: 'today',
      isAnimateUp: false,
      title: '今天',
      active: false,
    },{
      id: 'week',
      isAnimateUp: false,
      title: '周',
      active: false,
    },{
      id: 'completed',
      isAnimateUp: false,
      title: '已完成',
      active: false,
    }
  ]
}
