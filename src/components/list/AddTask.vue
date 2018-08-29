<template>
  <div 
    tabindex="1" 
    class="addTask" 
    :class="{focus: focusAddTask}" 
    @focusin="focusAddTaskData" 
    @focusout="blurAddTaskData" 
  >
    <div class="addTask-meta" :class="{'invisible transparent': hiddenAllAddTaskMeta}">

      <a 
        title="星标任务" 
        class="addTask-meta-star float-right" 
        @click="toggleNewTaskStarred"
      >
        <svg class="starred-full active" width="20px" height="20px" v-if="starred">
          <use xlink:href="#icon-starred-full"></use>
        </svg>
        <svg class="starred" width="20px" height="20px" v-else>
          <use xlink:href="#icon-starred"></use>
        </svg>
      </a>

      <!--dated 当已经有日期被选择 那么就高亮-->
      <a 
        title="设置到期日"
        class="addTask-meta-date float-right"
      >
        <span class="addTask-meta-date-label">{{ datePickerDate }}</span>
        <!-- 
          :input-class 输入框的类名，被我隐藏了
          :wrapper-class 最外面的div 的类名
          :calendar-class 日历的类名
          :calendar-button-icon 日历小按钮的类名 被我覆盖在 svg.today 上
          :calendar-button-icon-content="''"  日历小按钮的内容 设置为空
          :calendar-button="true"  
          :clear-button="true" 出现清空按钮
          :highlighted="highlighted 让日期高亮
        -->
        <date-picker 
          ref="datePicker"
          :input-class="'date-picker-input'" 
          :wrapper-class="'date-picker-wrapper'"
          :calendar-class="'date-picker-calendar'" 
          :calendar-button-icon="'date-picker-icon'" 
          :calendar-button-icon-content="''" 
          :calendar-button="true" 
          :clear-button="true"
          :highlighted="highlighted"
          @selected="setDeadline"
        > </date-picker>

        <svg class="today" width="20px" height="20px" :class="{active: datePickerDate}">
          <use xlink:href="#icon-today"></use>
        </svg>
      </a>

    </div>

    <a class="plus-wrapper" :class="{hidden: focusAddTask}">
      <svg class="plus-small" width="20px" height="20px">
        <use xlink:href="#icon-plus-small"></use>
      </svg>
    </a>

    <input 
      type="text" 
      class="addTask-input chromeless" 
      placeholder="添加任务..." 
      @keypress.enter="addTask" 
      v-model="newTask.title">

    <a class="speech-wrapper" :class="{hidden: !focusAddTask}">
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
      focusAddTask: false,
      starred: false,
      newTask: this.createTaskTemplate(),
      highlighted: {
        dates: [ // Highlight an array of dates
          new Date(), // 当天高亮
        ],
      },
      datePickerDate: '',
    }
  },
  computed: {
    hiddenAllAddTaskMeta (){
      return !this.focusAddTask
    },
  },
  methods: {
    // 返回一个 任务模板
    createTaskTemplate(){
      return {
        title: '',
        selected: false,
        starred: false,
        deadline: 0,
        isCompleted: false,
        note: '',
        finishAt: 0
      }
    },
    setDeadline (date) {
      this.newTask.deadline = date ? new Date (date).getTime() : 0
      this.datePickerDate = date && new Date(date).getDate()
    },
    // 是否 focus 在添加任务的输入框
    focusAddTaskData (){
      this.focusAddTask = true
    },
    // 是否 blur 在添加任务的输入框
    blurAddTaskData (){
      this.focusAddTask = false
      this.$refs.datePicker.close()
    },
    // 切换输入框处的 星星
    toggleNewTaskStarred(){
      this.starred = !this.starred
      // 更新 newTask 中的 starred 标记
      this.newTask.starred = this.starred
    },
    // 在添加任务的输入框中 按下 enter 键时调用
    addTask (){
      if(this.newTask.title){
        let item = JSON.parse(JSON.stringify(this.newTask))
        // 写入创建时间 
        this.$store.dispatch('createTask', item).then(val => {})
        // 重置 newTask
        this.newTask = this.createTaskTemplate()
        // 去掉 星星 的 starred 类名
        this.starred = false
        // 清空日期
        this.$refs.datePicker.clearDate()
      }
    },
  }
}

</script>

<style scoped>
.addTask{position: relative; margin: 14px 0; padding: 0 12px; border-radius: 3px; background: rgba(14, 145, 197, 0.75);}
.addTask.focus {z-index: 2;}
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

.addTask-meta-star svg, .addTask-meta-assign svg, .addTask-meta-date svg{opacity: 0.7; color: #fff;}
.addTask-meta-star svg.active, .addTask-meta-assign svg.active, .addTask-meta-date svg.active{opacity: 1; }
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
