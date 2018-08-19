<template>
  <div id="tasks">

    <div class="tasks-main">
      <div class="list-toolbar">
        <h1 class="title">工作</h1>
        <div class="action-bar expanded" @mouseleave="hideActionBar">
          <div class="action-bar-top" :style="`height: ${actionBarTopHeight}`">
            <ul class="action-bar-top-sort" :class="actionBarTopActive === 'sort' && 'active'">
              <!-- 排序列表 -->
              <li tabindex="0" v-for="item in actionBarTopSort" :class="item.sortFn === 'sortByDeadline' ? deadlineSortClass : item.liClassName" @click="sortFn(item.sortFn)">
                <a :class="item.aClassName">

                  <svg :class="item.svgClassName" width="20px" height="20px">
                    <use :xlink:href="`#icon-${item.svgClassName}`"></use>
                  </svg>

                  <span>{{ item.text }}</span>
                </a>
              </li>
            </ul>

            <ul class="action-bar-top-more" :class="actionBarTopActive === 'more' && 'active'">
              <!-- 更多列表 -->
              <li tabindex="0" v-for="item in actionBarTopMore" :class="item.liClassName">
                <a :class="item.aClassName">

                  <svg :class="item.svgClassName" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <use :xlink:href="`#icon-${item.svgClassName}`"></use>
                  </svg>

                  <span v-if="typeof item.text === 'string'">{{ item.text }}</span>
                  <template v-if="typeof item.text === 'object'">
                    <span v-for="text in item.text" :class="[text.className.commonClassName, text.className.turnOn]">{{ text.content }}</span>
                  </template>
                </a>
              </li>
              <li tabindex="0">
                <a class="action-bar-top-paste-item">
                  <svg width="20px" height="20px">
                    <use xlink:href="#icon-paste"></use>
                  </svg>
                  <span>粘贴 <i class="token_0">0</i> 个任务</span>
                </a>
              </li>
            </ul>
          </div>

          <div class="action-bar-bottom">
            <a class="tab share first-tab" @click="showActionBarTop('share')" :class="{active: actionBarBottomActive.share}">
              <svg class="share rtl-flip" width="20px" height="20px">
                <use xlink:href="#icon-share"></use>
              </svg>
              <span class="tab-text">共享</span>
            </a>
            <a class="tab sort-az" @click="showActionBarTop('sort')" :class="{active: actionBarBottomActive.sort,}">
              <svg class="sort-az" width="20px" height="20px">
                <use xlink:href="#icon-sort-az"></use>
              </svg>
              <span class="tab-text">排序</span>
            </a>

            <!-- 更多这个功能被砍掉了 -->
            <a class="tab last-tab" @click="showActionBarTop('more')" :class="{active: actionBarBottomActive.more}">
              <svg class="folder-option" width="20px" height="20px">
                <use xlink:href="#icon-folder-option"></use>
              </svg>
              <span class="tab-text">更多</span>
            </a>
          </div>

        </div>
      </div>

      <div class="tasks-scroll">
        <div class="addTask" :class="{focus: addTaskData.focusAddTask}" @focusin="focusAddTaskData" @focusout="blurAddTaskData" tabindex="1" >
          <!-- invisible transparent -->
          <div class="addTask-meta" :class="{'invisible transparent': hiddenAllAddTaskMeta}">
            <a class="addTask-meta-star float-right" title="星标任务" :class="{hidden: addTaskData.hiddenAddTaskMeta.star}" @click="toggleNewTaskStarred">
              <svg class="starred-full" width="20px" height="20px" v-if="addTaskData.starred">
                <use xlink:href="#icon-starred-full"></use>
              </svg>
              <svg class="starred" width="20px" height="20px" v-else>
                <use xlink:href="#icon-starred"></use>
              </svg>
            </a>
            <a class="addTask-meta-assign float-right" :class="{hidden: addTaskData.hiddenAddTaskMeta.assign}" title="分配给">
              <svg class="assigned" width="20px" height="20px">
                <use xlink:href="#icon-assigned"></use>
              </svg>
              <span class="icon input-assign-frame"></span>
              <span class="icon input-assign-delete"></span>
            </a>

             <!--dated 当已经有日期被选择 那么就高亮-->
            <a class="addTask-meta-date float-right" :class="{hidden: addTaskData.hiddenAddTaskMeta.date}" title="设置到期日">
              <span class="addTask-meta-date-label">{{ datePickerDate }}</span>
              <!-- 
                :input-class 输入框的类名，被我隐藏了
                :wrapper-class 最外面的div 的类名
                :calendar-class 日历的类名
                :calendar-button-icon 日历小按钮的类名 被我覆盖在 svg.today 上
                :calendar-button-icon-content="''"  日历小按钮的内容 设置为空
                :calendar-button="true"  
                :clear-button="true" 出现清空按钮
                :highlighted="datePickerState.highlighted 让日期高亮
              -->
              <date-picker 
                v-model="datePickerState.date" 
                :input-class="'date-picker-input'" 
                :wrapper-class="'date-picker-wrapper'"
                :calendar-class="'date-picker-calendar'" 
                :calendar-button-icon="'date-picker-icon'" 
                :calendar-button-icon-content="''" 
                :calendar-button="true" 
                :clear-button="true"
                :highlighted="datePickerState.highlighted"></date-picker>
              <!--
              <span class="icon input-assign-delete">
                <svg  class="delete-today" width="200" height="200">
                  <use xlink:href="#icon-delete-today"></use>
                </svg>
              </span>
              -->
              <svg class="today" width="20px" height="20px">
                <use xlink:href="#icon-today"></use>
              </svg>
            </a>
          </div>
          <a class="plus-wrapper" :class="{hidden: addTaskData.focusAddTask}">
            <svg class="plus-small" width="20px" height="20px">
              <use xlink:href="#icon-plus-small"></use>
            </svg>
          </a>
          <input type="text" class="addTask-input chromeless" placeholder="添加任务..." @keypress.enter="addTask" v-model="newTask.title">
          <a class="speech-wrapper" :class="{hidden: !addTaskData.focusAddTask}">
            <svg class="speech" width="20px" height="20px">
              <use xlink:href="#icon-speech"></use>
            </svg>
          </a>
        </div>

        <div class="task-list starred">
          <h2 class="heading normal">
            <a class="group-header" href="/#/lists/inbox">inbox</a>
          </h2>
          <ol class="tasks">
            <li tabindex="0" class="taskItem" draggable="true" v-for="(item, index) in taskItems" :class="{selected: item.selected}" @click="selectTaskItem($event, index)" @dblclick="editTask(item)">
              <div class="taskItem-body">
                <a class="taskItem-checkboxWrapper checkbox" tabindex="-1" @click.stop="toggleTaskCheck(item)">
                  <span title="标记为已完成">
                    <svg class="task-check" :class="{hidden: item.isCompleted}" width="20px" height="20px">
                      <use xlink:href="#icon-task-check"></use>
                    </svg>
                  </span>  
                  <span title="标记为未完成">
                    <svg class="task-checked" :class="{hidden: !item.isCompleted}" width="20px" height="20px">
                      <use xlink:href="#icon-task-checked"></use>
                    </svg>
                  </span>
                </a>
                <div class="taskItem-titleWrapper" tabindex="-1">
                  <span class="taskItem-titleWrapper-title">{{ item.title }}</span>
                </div>
                <span class="conversations-wrapper" :class="{hidden: !item.comments.length}" title="此任务已有评论" tabindex="-1">
                  <svg class="conversations-small rtl-flip" width="20px" height="20px">
                    <use xlink:href="#icon-conversations-small"></use>
                  </svg>
                </span>
                <span class="attachment-wrapper" :class="{hidden: !item.fileList.length}" title="此任务带有附件" tabindex="-1">
                  <svg class="attachment" width="20px" height="20px">
                    <use xlink:href="#icon-attachment"></use>
                  </svg>
                </span>
                <!-- 过期为红色，没过期为蓝色，没有倒计时就隐藏元素 -->
                <!-- 时间格式为2018/5/3 -->
                <span class="taskItem-deadline" tabindex="-1" aria-hidden="true" 
                  :class="item.deadline ? (new Date().getTime() > item.deadline && 'overdue')  : 'hidden' ">
                    {{formatDate(item.deadline)}}
                </span>
                <!-- 暂时没有实现 -->
                <span class="recurrence-wrapper" title="Recurring to-do" tabindex="-1">
                  <svg class="recurrence" width="20px" height="20px">
                    <use xlink:href="#icon-recurrence"></use>
                  </svg>
                </span>
                <a class="taskItem-star" tabindex="-1" @click.stop="toggleTaskStarred(index)">
                  <span class="star-wrapper" :class="{hidden: item.taskStarred}" title="标记为星标">
                    <svg width="18px" height="18px">
                      <use xlink:href="#icon-star-taskItem"></use>
                    </svg>
                  </span>
                  <span class="starred-wrapper" :class="{hidden: !item.taskStarred}" title="移除星标">
                    <svg width="22px" height="44px">
                      <use xlink:href="#icon-starred-taskItem"></use>
                    </svg>
                  </span>
                </a>
                <div class="taskItem-progress">
                  <span class="taskItem-progress-bar" :style="item.subTasks.length && `width: ${item.subTasksCompletedNumber/item.subTasks.length*100}%`"></span>
                </div>
              </div>
            </li>
          </ol>
          <h2 tabindex="0" class="heading normal" :class="{hidden: !doneTaskItems.length}">
            <a href="/#/lists/342865566" class="group-header" @click="toggleDoneTaskItems">显示已完成任务</a>
          </h2>
          <!--:class="{hidden: this.isShowDoneItems}"-->
          <ol class="tasks" :class="{hidden: this.isShowDoneItems}">
            <!-- 暂不实现拖动的功能 -->
            <li tabindex="0" class="taskItem done" draggable="true" v-for="(item, index) in doneTaskItems" :class="{selected: item.selected}" @click="selectTaskItem($event, index, true)" @dblclick="editTask(item)">
              <div class="taskItem-body">
                <a class="taskItem-checkboxWrapper checkbox checked" tabindex="-1" @click.stop="toggleTaskCheck(item)">
                  <span title="标记为已完成">
                    <svg class="task-check" width="20px" height="20px">
                      <use xlink:href="#icon-task-check"></use>
                    </svg>
                  </span>  
                  <span title="标记为未完成">
                    <svg class="task-checked" width="20px" height="20px">
                      <use xlink:href="#icon-task-checked"></use>
                    </svg>
                  </span>
                </a>
                <div class="taskItem-titleWrapper" tabindex="-1">
                  <span class="taskItem-titleWrapper-title">{{ item.title }}</span>
                  <div class="taskItem-titleMeta-info">{{item.deltaTime}} 由 {{username}}</div>
                </div>
                <span class="conversations-wrapper" :class="{hidden: !item.comments.length}" title="此任务已有评论" tabindex="-1">
                  <svg class="conversations-small rtl-flip" width="20px" height="20px">
                    <use xlink:href="#icon-conversations-small"></use>
                  </svg>
                </span>
                <span class="attachment-wrapper" :class="{hidden: !item.fileList.length}" title="此任务带有附件" tabindex="-1">
                  <svg class="attachment" width="20px" height="20px">
                    <use xlink:href="#icon-attachment"></use>
                  </svg>
                </span>
                <span class="recurrence-wrapper hidden" :class="{hidden: item.hiddenRecurrence}" title="Recurring to-do" tabindex="-1">
                  <svg class="recurrence" width="20px" height="20px">
                    <use xlink:href="#icon-recurrence"></use>
                  </svg>
                </span>
                <a class="taskItem-star" tabindex="-1" @click.stop="toggleTaskStarred(index, true)">
                  <span class="star-wrapper" :class="{hidden: item.taskStarred}" title="标记为星标">
                    <svg width="18px" height="18px">
                      <use xlink:href="#icon-star-taskItem"></use>
                    </svg>
                  </span>
                  <span class="starred-wrapper" :class="{hidden: !item.taskStarred}" title="移除星标">
                    <svg width="22px" height="44px">
                      <use xlink:href="#icon-starred-taskItem"></use>
                    </svg>
                  </span>
                </a>
                <div class="taskItem-progress">
                  <span class="taskItem-progress-bar" :style="item.subTasks.length && `width: ${item.subTasksCompletedNumber/item.subTasks.length*100}%`"></span>
                </div>
              </div>
            </li>
          </ol>
        </div>

        <div class="task-404 hidden" >
          <svg class="search rtl-flip" width="20px" height="20px">
            <use xlink:href="#icon-search-big"></use>
          </svg>
          <h2>无搜索结果</h2>
        </div>
      </div>
    </div>

    <!-- 编辑任务 -->
    <task-detail :username="username" v-show="showDetail" :taskItem="editItem" @toggleDetailCheckbox="toggleTaskCheck" @close="showDetail = false" @delete="deleteTask"></task-detail>
  </div>
</template>

<script>
import DatePicker from 'vuejs-datepicker'
import TaskDetail from './TaskDetail'
// var d
export default {
  name: 'Task',
  components: {DatePicker, TaskDetail},
  props: ['username'],
  data(){
    return {
      // show: true, // 用于显示date-picker
      // date: '', // date-picker 中 date 双向绑定
      datePickerState,
      showDetail: true, // 打开任务编辑区域
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
      actionBarTopSort:[
  // 排序的内容框
  {
    liClassName: 'first-menu-item',
    aClassName: 'action-bar-top-sort-az',
    svgClassName: 'sort-az',
    text: '按字母顺序排序',
    sortFn: 'sortByLetter',
  },
  {
    // liClassName: console.log(this.taskItems) || 'disabled',
    // liClassName: this.deadlineSortClass ? this.deadlineSortClass() : 'disabled'  ,
    aClassName: 'action-bar-top-sort-date',
    svgClassName: 'sort-date',
    text: '按到期日排序',
    sortFn: 'sortByDeadline',
  },
  {
    liClassName: '',
    aClassName: 'action-bar-top-sort-creation',
    svgClassName: 'sort-creation',
    text: '按创建日期排序',
    sortFn: 'sortByCreation',
  },
  {
    // 这个功能不实现
    liClassName: 'disabled',
    aClassName: 'action-bar-top-sort-assign',
    svgClassName: 'assigned',
    text: '按受托人排序',
    sortFn: 'sortByAssign',
  },
  {
    liClassName: 'last-menu-item',
    aClassName: 'action-bar-top-sort-priority',
    svgClassName: 'starred',
    text: '按优先级排序',
    sortFn: 'sortByPriority',
  },
      ],
      actionBarTopMore,
      actionBarBottomActive: {share: false, sort: true, more: true,},
      actionBarTopActive: '',
      actionBarTopHeight: '0px',
      addTaskData,
      doneTaskItems,
      isShowDoneItems: true,  // 显示已经完成任务列表
      newTask: this.createTaskTemplate(),
      editItem: this.createTaskTemplate(),
    }
  },
  methods: {
    toggleNewTaskStarred(){
      // 切换输入框处的 星星
      this.addTaskData.starred = !this.addTaskData.starred
      // 更新 newTask 中的 taskStarred 标记
      this.newTask.taskStarred = this.addTaskData.starred
    },
    createTaskTemplate(){
      // 返回一个 任务模板
      return {
        selected: false, // 用于设置被选中时的样式
        title: '',
        taskStarred: false,  // 是否加了星星
        createDate: null, // 创建的时间
        deadline: null, // 到期时间
        isCompleted: false, // 是否已经完成
        subTasks: [],   // 子任务数组
        subTasksCompletedNumber: 0, // 子任务完成的数量
        note: {content: '', displayView: true},  // 备注
        comments: [], // 评论
        fileList: [], // 附件
      }
    },
    addTask (){
      // 在添加任务的输入框中 按下 enter 键时调用
      if(this.newTask.title){
        let item = JSON.parse(JSON.stringify(this.newTask))
        // 写入创建时间 
        item.createDate = new Date().getTime() 
        this.taskItems.unshift(item)
        // 重置 newTask
        this.newTask = this.createTaskTemplate()
        // 去掉 星星 的 starred 类名
        this.addTaskData.starred = false
        // 重置date 上面的日期
        this.datePickerState.date = ''
      }
    },
    toggleDoneTaskItems(){
      // 隐藏或者显示已经完成的任务列表
      if(this.isShowDoneItems){
        for(let i=0; i<this.doneTaskItems.length; i++){
          let item = this.doneTaskItems[i]
          // 更新距离时间
          item.deltaTime = this.showTime(item)
        }
      }
      this.isShowDoneItems = !this.isShowDoneItems
    },
    showActionBarTop: function(type){
    // 显示 排序、更多 下拉框
      if(this.actionBarTopHeight > '0px'){
        // 如果下拉框已经显示，再次点击就隐藏下拉框
        this.actionBarTopHeight = '0px'
        return 
      }
      if (type === 'sort' && this.actionBarBottomActive.sort){
        this.actionBarTopActive = 'sort'
        this.actionBarTopHeight = `${this.actionBarTopSort.length * 38}px`
      }else if (type === 'more' && this.actionBarBottomActive.more){
        this.actionBarTopActive = 'more'
        this.actionBarTopHeight = `${this.actionBarTopMore.length * 42}px`
      }else if (type === 'share' && this.actionBarBottomActive.share){
        this.actionBarTopHeight = `0px`
      }else{
        this.actionBarTopHeight = `0px`
      }
    },
    hideActionBar: function(){
      // 隐藏 排序 更多 下拉框
      this.actionBarTopHeight = '0px'
    },
    focusAddTaskData (){
      // 是否 focus 在添加任务的输入框
      this.addTaskData.focusAddTask = true
    },
    blurAddTaskData (){
      // 是否 blur 在添加任务的输入框
      this.addTaskData.focusAddTask = false
    },
    toggleTaskCheck (item){
    // 点击复选框 完成 或 未完成
      let index
      if(item.isCompleted === true){
      // 用户在已经完成 item 的checkbox 上点击
        index = this.doneTaskItems.indexOf(item)
        this.doneTaskItems = [].concat(this.doneTaskItems.slice(0, index), this.doneTaskItems.slice(index + 1))
        // this.doneTaskItems.splice(this.doneTaskItems.indexOf(item), 1)
        // 重置为 未完成
        item.isCompleted = false
        // 完成时间重置为 null
        item.doneDate = null
        this.taskItems.push(item)
      }else if(item.isCompleted === false){
      // 用户在未完成 item 的checkbox 上点击
        index = this.taskItems.indexOf(item)
        this.taskItems = [].concat(this.taskItems.slice(0, index), this.taskItems.slice(index + 1))
        // this.taskItems.splice(this.taskItems.indexOf(item), 1)
        // 完成时间为当前时间
        item.doneDate = new Date().getTime()
        // 更新距离时间
        item.deltaTime = this.showTime(item)
        // 重置为 已经完成
        item.isCompleted = true
        this.doneTaskItems.push(item)
      }else{
        throw Error('toggleTaskCheck 函数报错')
      }
    },
    toggleTaskStarred (index, isDone){
      if (isDone){
        this.doneTaskItems[index].taskStarred = !this.doneTaskItems[index].taskStarred
      }else{
        this.taskItems[index].taskStarred = !this.taskItems[index].taskStarred
      }
    },
    selectTaskItem ($event,index, isDone){
      this.taskItems.forEach(element => element.selected = false )
      this.doneTaskItems.forEach(element => element.selected = false )
      isDone ? this.doneTaskItems[index].selected = true : this.taskItems[index].selected = true
    },
    showTime(item){
      // 输入一个 完成的任务对象
      // 输出新的时间 和 旧的时间之间的间隔
      let newDate = new Date().getTime()
      let delta = Math.ceil((newDate - item.doneDate)/1000)
      let days, hours, minutes, result //, seconds
      days = Math.floor(delta / (60*60*24))
      hours = Math.floor(delta / (60*60)) % 24
      minutes = Math.floor(delta / 60) % 60
      // seconds = delta % 60
      result = '几秒钟'
      if(minutes) result = `${minutes}分钟`
      if(hours) result = `${hours}小时`
      if(days) result = `${days}天`
      return `${result}之前`
    },
    sortFn(sortFnName){
      // 输入根据什么东西排序，然后调用这个方法
      this[sortFnName].call(this)
    },
    sortByCreation(){
      // 根据创建时间排序
      this.taskItems.sort((a, b)=>{ return a.createDate - b.createDate})
    },
    sortByLetter(){
      // 根据字母排序
      this.taskItems.sort((a, b)=>{
        if(a.title === b.title) return 0
        if(a.title > b.title) return 1
        if(a.title < b.title) return -1
      })
    },
    sortByPriority(){
      // 根据星星排序
      this.taskItems.sort((a, b) => {
        // taskStarred 是个布尔值
        // 加星星的优先级比较高，所以在前面加个 符号
        return -(Number(a.taskStarred) - Number(b.taskStarred))
      })
    },
    sortByDeadline(){
      // 根据到期日排序
      this.taskItems.sort((a, b) => {
        // a，b 都没设置到期日
        if(!a.deadline && !b.deadline) return 0
        // a没设置 b有设置
        if(!a.deadline) return 1
        if(!b.deadline) return -1
        return a.deadline - b.deadline
      })
    },
    editTask(item){
    // 打开任务编辑的区域
      this.showDetail = true
      this.editItem = item
    },
    deleteTask(item){
      if(item.isCompleted){
        this.doneTaskItems.splice(this.doneTaskItems.indexOf(item), 1)
      }else{
        this.taskItems.splice(this.taskItems.indexOf(item), 1)
      }
      this.showDetail = false
    },
    formatDate(timeStamp){
    // 传入一个时间戳 返回一个 '2018-05-20' 的时间格式
      return new Date(timeStamp).toLocaleString().split(' ')[0].replace(/(\d+)\/(\d+)\/(\d+)/g, function(str,$1, $2, $3){
        return $1 + '-' + (Number($2) < 10 ? '0'+$2 : $2) + '-' + (Number($3) < 10 ? '0'+$3 : $3)
      }) 
    },
  },
  computed:{
    hiddenAllAddTaskMeta (){
      return !this.addTaskData.focusAddTask
    },
    datePickerDate(){
    // 当选择日期之时 要改变日历上的数字
      // 更新任务模板中的到期时间
      this.newTask.deadline = this.datePickerState.date ? new Date(this.datePickerState.date).getTime() : null
      return this.datePickerState.date && new Date(this.datePickerState.date).getDate()
    },
    deadlineSortClass(){
    // 用于更新排序下拉框中 到期日排序的 选项是否可以用
      let result = 0
      for(let item of this.taskItems){
        if(item.deadline){
          // 如果有一个task 有设置deadline 那么就可以使用 到期日 排序
          result = 1
          break
        }
      }
      return result ? '' : 'disabled'
    },
  },
}

let datePickerState = {
  date: '',
  highlighted: {
    dates: [ // Highlight an array of dates
      new Date(), // 当天高亮
    ],
  }
}

let doneTaskItems = [
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

let addTaskData = {
  focusAddTask: false,
  hiddenAddTaskMeta: {star: false, assign: false, date: false,},
  starred: false,
}

let actionBarTopMore = [
// 更多的功能被我砍掉了
  {
    liClassName: 'first-menu-item',
    aClassName: 'action-bar-top-duplicate-list',
    svgClassName: 'duplicate-list',
    text: '复制清单',
  },
  {
    liClassName: '',
    aClassName: 'action-bar-top-copy-item',
    svgClassName: 'copy-item',
    text: '复制所选任务',
  },
  {
    liClassName: '',
    aClassName: 'action-bar-top-paste-item',
    svgClassName: 'paste',
    text: '粘贴',
  },
  {
    liClassName: '',
    aClassName: 'action-bar-top-email-all',
    svgClassName: 'email',
    text: '以电子邮件发送清单',
  },
  {
    liClassName: 'disabled',
    aClassName: 'action-bar-top-email-selected',
    svgClassName: 'email',
    text: '用电子邮件发送所选任务',
  },
  {
    liClassName: '',
    aClassName: 'action-bar-top-print-all',
    svgClassName: 'print',
    text: '打印清单',
  },
  {
    liClassName: 'disabled',
    aClassName: 'action-bar-top-print-selected',
    svgClassName: 'print',
    text: '打印所选任务',
  },
  {
    liClassName: 'disabled',
    aClassName: 'action-bar-top-do-not-disturb',
    svgClassName: 'do-no-disturb',
    text: [{className: { commonClassName:'un-mute'}, content: '勿扰',},{className: {commonClassName: 'status-label float-right', turnOn: 'on'}, content: '开启',},{className: { commonClassName:'status-label float-right', turnOn: 'off'}, content: '关闭',}],
  },
  {
    liClassName: 'last-menu-item disabled',
    aClassName: 'action-bar-top-trash disabled',
    svgClassName: 'trash',
    text: '删除所选任务',
  },
]
</script>

<style scoped>
#tasks{height: 100vh; position: relative; display: flex;}
.tasks-main{height: 100vh; position: relative; display: flex; flex-direction: column; flex:1;}
.list-toolbar{position: relative; height: 45px; min-height: 45px; display: flex; align-items: center; background: #0e91c5;}
.list-toolbar h1{flex:1; font-size: 20px; color: #fff; padding: 10px 14px; font-weight: 200; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; text-align: left;}
.action-bar{position: relative; opacity: 1; filter: none; transition: opacity 200ms ease-in;}

.action-bar-bottom{text-align: center; font-size: 0; height: 45px;}
.action-bar-bottom a{display: inline-block; min-width: 52px; padding: 6px;}
.action-bar-bottom a svg{fill: #fff;}
.action-bar-bottom a .tab-text{font-size: 12px; color: #fff; display: block; text-align: center;}
.action-bar.expanded .action-bar-bottom a{opacity: 0.4;}
.action-bar.expanded .action-bar-bottom a.active{opacity: 1; filter: none;}

.action-bar-top{position: absolute; width: 250px; right: 0; top: 45px; transition: height 120ms linear; z-index: 1; background: #0e91c5; overflow: hidden; }
.action-bar-top ul{position: absolute; z-index: 0; top: 0; left:0; right: 0;}
.action-bar.expanded .action-bar-top ul.active{z-index: 1;}
.action-bar-top li a.disabled{opacity: 0.4;}
.action-bar-top li{position: relative; padding: 2px; padding-top: 1px; opacity: 0; transition: opacity 200ms linear;}
.action-bar.expanded .action-bar-top ul.active li{opacity: 1; filter: none;}
.action-bar.expanded .action-bar-top ul.active li.disabled{opacity: 0.4;}
.action-bar-top li a{display: block; padding: 7px; padding-left: 34px; color: #fff; text-align: left; font-size: 14px;}
.action-bar-top ul.active li.disabled a{display: block; padding: 7px; padding-left: 34px; color: #fff; text-align: left; font-size: 14px;}
.action-bar-top li a svg{position: absolute; fill: #fff; top: 7px; left: 8px;}
.action-bar-top li a .status-label{font-size: 85%; text-transform: uppercase; padding: 1px; display: none; color: #b2b2b2;}
.action-bar-top li a .status-label.active{display: block;}

.tasks-scroll{flex: 1; padding:0 14px; overflow-y: auto; overflow-x: hidden; text-align: left;}
.addTask{position: relative; margin: 14px 0; padding: 0 12px; border-radius: 3px; background: rgba(14, 145, 197, 0.75);}
.addTask-meta{position: absolute; top: 12px; right: 0; opacity: 0; transition: opacity 200ms linear;}
.addTask.focus .addTask-meta{opacity: 1; filter: none;}
.plus-wrapper{position: absolute; width: 20px; height: 20px; top: 14px; left: 10px; opacity: .7; pointer-events: none;}
.plus-small{fill: #fff;}
.addTask-input{width: 100%; padding:13px 60px 14px 28px; font-weight: 500; line-height: 20px; font-size: 16px; color: #fff; user-select: none;}
.addTask-input::placeholder{color: rgba(255, 255, 255, 0.6);}
.speech-wrapper{position: absolute; width: 20px; height: 20px; top: 13px; left: 10px; opacity: .7; pointer-events: none;}
.speech{fill: #fff;}
.addTask-meta > .float-right{margin-right: 15px;}
.addTask-meta > .addTask-meta-star{margin-right: 9px;}

.addTask-meta-star, .addTask-meta-assign, .addTask-meta-date{opacity: 0.7; color: #fff;}
.addTask-meta-star .starred-full {opacity: 1; filter:none;}
.addTask-meta svg{fill: #fff;}
.addTask-meta-star.starred svg path:last-child{opacity: 1; filter: none;}

.addTask-meta-date{position: relative;}
.addTask-meta-date.dated{opacity: 1; filter:none;}
.addTask-meta-date .input-assign-delete{position: absolute; top: -8px; right: -8px; z-index: 2;}
.addTask-meta-date .input-assign-delete svg{width: 12px; height: 12px;}
.addTask-meta-date .addTask-meta-date-label{position: absolute; transform: scale(0.5); transform-origin: 0 0; top: 8px; left: 0; height: 20px; width: 40px; color: #fff; font-size: 16px; font-weight: bold; 
  text-align: center;}

.task-list{padding-bottom: 72px;}
.heading{margin-top: 20px; margin-bottom: 10px; font-size: 12px; color: #fff; word-wrap: break-word; word-break: break-word;}
.heading a{padding: 3px 10px; text-transform: uppercase; letter-spacing: 1px; font-weight: 400; line-height: 16px; border-radius: 3px; background: rgba(14, 145, 197, 0.75);}
.taskItem{height: 47px;}
.taskItem-body{height: 46px; display: flex; position: relative; align-items: center; padding: 0 4px; overflow: hidden; border-radius: 3px; background: #fff;}
.taskItem.selected .taskItem-body{background: #e1f2fe;}
.taskItem-checkboxWrapper{padding: 0 8px; height: 20px;}
.checkbox .task-check{stroke: rgba(0, 0, 0, 0.35);}
.checkbox .task-checked{fill: rgba(0, 0, 0, 0.35);}
.taskItem-titleWrapper{flex: 1; color: #262626; font-size: 16px; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-top: -3px;}
.conversations-wrapper{height: 20px; fill: rgba(0, 0, 0, 0.3); padding: 0 2px;}
.attachment-wrapper{width: 22px; height: 20px; fill: rgba(0, 0, 0, 0.3); padding: 0 2px;}
.recurrence-wrapper{height: 14px; fill: #328ad6; padding: 0 2px;}
.recurrence-wrapper svg{width: 14px; height: 14px;}
.star-wrapper{padding: 0 6px; fill: rgba(0, 0, 0, 0.3);}
.starred-wrapper{width: 30px; padding: 0 4px; fill: #d74e48;}

.taskItem-deadline, .taskTtem-assign{padding-left: 4px; padding-right: 4px;}
.taskItem-deadline{font-size:12px; color: #328ad6; max-width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;}
.taskItem-deadline.overdue{color: #b3312d;}

.task-404{padding: 25px; position: absolute; left: 0; right: 0; text-align: center; top: 50%; margin-top: -110px;}
.task-404 svg{height: 100px; width: 100px; fill: #fff; filter: drop-shadow(0 1px 0 rgba(0, 0, 0, 0.2));}
.task-404 h2{font-size: 18px; color: rgba(255, 255, 255, 0.85); filter: drop-shadow(0 1px 0 rgba(0, 0, 0, 0.2));}

.taskItem.done{opacity: 0.6;}
.checkbox.checked .task-check{display: none;}
.checkbox.checked .task-checked{display: block;}
.taskItem.done .taskItem-titleWrapper-title{text-decoration: line-through;}
.taskItem.done .taskItem-titleMeta-info{font-size: 10px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;}

.taskItem-progress{outline: 1px solid red; position: absolute; top: 0; left: 0; right: 0; height: 100%; opacity: 1; transition: all 225ms ease; pointer-events: none; filter: none;}
.taskItem-progress-bar{background: rgba(14,145,197,0.1); display: block; height: 100%; width: 0%; transition:all 225ms ease; border-right-width: 1px; border-right-style: solid; border-right-color: rgba(14,145,197,0.2);}

</style>

