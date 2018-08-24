<template>
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
</template>

<script>
import DatePicker from 'vuejs-datepicker'
export default {
  name: 'AddTask',
  components: { DatePicker },
  data () {
    return {
      addTaskData: {
        focusAddTask: false,
        hiddenAddTaskMeta: {star: false, assign: false, date: false,},
        starred: false,
      },
      datePickerState: {
        date: '',
        highlighted: {
          dates: [ // Highlight an array of dates
            new Date(), // 当天高亮
          ],
        }
      },
      newTask: this.createTaskTemplate(),
    }
  },
  computed: {
    hiddenAllAddTaskMeta (){
      return !this.addTaskData.focusAddTask
    },
    datePickerDate(){
    // 当选择日期之时 要改变日历上的数字
      // 更新任务模板中的到期时间
      this.newTask.deadline = this.datePickerState.date ? new Date(this.datePickerState.date).getTime() : null
      return this.datePickerState.date && new Date(this.datePickerState.date).getDate()
    },
  },
  methods: {
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
    focusAddTaskData (){
      // 是否 focus 在添加任务的输入框
      this.addTaskData.focusAddTask = true
    },
    blurAddTaskData (){
      // 是否 blur 在添加任务的输入框
      this.addTaskData.focusAddTask = false
    },
    toggleNewTaskStarred(){
      // 切换输入框处的 星星
      this.addTaskData.starred = !this.addTaskData.starred
      // 更新 newTask 中的 taskStarred 标记
      this.newTask.taskStarred = this.addTaskData.starred
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
  }
}

</script>

<style scoped>
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
</style>
