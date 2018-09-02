export default {
  actionBarSort:[
    // 排序的内容框
    {
      svgClassName: 'sort-az',
      text: '按字母顺序排序',
      fnName: 'sortByLetter',
    },
    {
      svgClassName: 'sort-date',
      text: '按到期日排序',
      fnName: 'sortByDeadline',
    },
    {
      svgClassName: 'sort-creation',
      text: '按创建日期排序',
      fnName: 'sortByCreation',
    },
    {
      svgClassName: 'starred',
      text: '按优先级排序',
      fnName: 'sortByPriority',
    },
  ],

  actionBarMore: [
    // 更多的功能被我砍掉了
    //{
      //svgClassName: 'duplicate-list',
      //text: '复制清单',
      //fnName: 'duplicateList',
    //},
    {
      svgClassName: 'copy-item',
      text: '复制所选任务',
      fnName: 'copyTask',
    },
    {
      svgClassName: 'paste',
      text: '粘贴',
      fnName: 'paste',
    },
    //{
      //svgClassName: 'email',
      //text: '以电子邮件发送清单',
      //fnName: 'sendEmail',
    //},
    //{
      //svgClassName: 'print',
      //text: '打印清单',
      //fnName: 'printList',
    //},
    //{
      //svgClassName: 'print',
      //text: '打印所选任务',
      //fnName: 'printTask',
    //},
    {
      svgClassName: 'trash',
      text: '删除所选任务',
      fnName: 'deleteTask',
    },
  ]
}
