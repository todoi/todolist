<template>
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
</template>

<script>
import DatePicker from 'vuejs-datepicker'
// var d
export default {
  name: 'Task',
  components: {DatePicker},
  props: ['username'],
  data(){
    return {
      // show: true, // 用于显示date-picker
      // date: '', // date-picker 中 date 双向绑定
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
      doneTaskItems,
      isShowDoneItems: true,  // 显示已经完成任务列表
    }
  },
  methods: {
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
    editTask(item){
    // 打开任务编辑的区域
      this.showDetail = true
      this.editItem = item
    },
    formatDate(timeStamp){
    // 传入一个时间戳 返回一个 '2018-05-20' 的时间格式
      return new Date(timeStamp).toLocaleString().split(' ')[0].replace(/(\d+)\/(\d+)\/(\d+)/g, function(str,$1, $2, $3){
        return $1 + '-' + (Number($2) < 10 ? '0'+$2 : $2) + '-' + (Number($3) < 10 ? '0'+$3 : $3)
      }) 
    },
  },
  computed:{
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


</script>

<style scoped>
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


.taskItem.done{opacity: 0.6;}
.checkbox.checked .task-check{display: none;}
.checkbox.checked .task-checked{display: block;}
.taskItem.done .taskItem-titleWrapper-title{text-decoration: line-through;}
.taskItem.done .taskItem-titleMeta-info{font-size: 10px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;}

.taskItem-progress{outline: 1px solid red; position: absolute; top: 0; left: 0; right: 0; height: 100%; opacity: 1; transition: all 225ms ease; pointer-events: none; filter: none;}
.taskItem-progress-bar{background: rgba(14,145,197,0.1); display: block; height: 100%; width: 0%; transition:all 225ms ease; border-right-width: 1px; border-right-style: solid; border-right-color: rgba(14,145,197,0.2);}

</style>

