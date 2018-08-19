<template>
  <div id="task-detail" class="animate">
      <div class="topbar">
        <a class="detail-checkbox checkbox" tabindex="0"  @click.stop="emitCheckedEvent">
          <span title="标记为已完成">
            <svg class="detail-check" :class="{hidden: taskItem.isCompleted}"  width="20px" height="20px">
              <use xlink:href="#icon-detail-check"></use>
            </svg>
          </span>
          <span title="标记为未完成">
            <svg class="detail-checked" :class="{hidden: !taskItem.isCompleted}"  width="20px" height="20px">
              <use xlink:href="#icon-detail-checked"></use>
            </svg>
          </span>
        </a>

        <a class="detail-star" tabindex="0" @click.stop="toggleTaskStarred">
          <span class="star-wrapper" title="标记为星标" :class="{hidden: taskItem.taskStarred}">
            <svg width="100%" height="100%">
              <use xlink:href="#icon-star-detail"></use>
            </svg>
          </span>
          <span class="starred-wrapper" title="移除星标" :class="{hidden: !taskItem.taskStarred}">
            <svg width="100%" height="100%">
              <use xlink:href="#icon-starred-detail"></use>
            </svg>
          </span>
        </a>

        <div class="title-container">
          <div tabindex="0" class="title">
            <span class="title-text">
              <div class="content-fakable" @click="displayView = false">
                <div class="display-view" :class="{hidden: !displayView}">
                  <span>{{ taskItem.title }}</span>
                </div>
                <div class="edit-view" :class="{hidden: displayView}" @focusout="displayView = true">
                  <div class="expandingArea active">
                    <pre>{{taskItem.title}}</pre>
                    <textarea tabindex="0" v-model="taskItem.title" @keypress.enter.prevent="displayView = true">{{taskItem.title}}</textarea>
                  </div>
                </div>
              </div>
            </span>
          </div>
        </div>
      </div>

      <div class="body" ref="body">
        <div class="section section-item detail-assign" tabindex="0">
          <div class="section-icon">
            <svg class="assigned" width="20px" height="20px">
              <use xlink:href="#icon-assigned"></use>
            </svg>
          </div>
          <div class="section-content">
            <div class="section-title">分配给</div>
            <div class="section-edit hidden">
              <input type="text" class="assign chromeless" placeholder="分配给">
            </div>
          </div>
          <a class="section-delete" title="删除" tabindex="0">
            <svg class="delete" width="20px" height="20px">
              <use xlink:href="#icon-delete"></use>
            </svg>
          </a>
        </div>

        <div class="section section-item detail-date" tabindex="0" :class="{'overdue' : taskItem.deadline && (new Date().getTime() > taskItem.deadline), date: taskItem.deadline}">
          <div class="section-icon">
            <svg class="date" width="20px" height="20px">
              <use xlink:href="#icon-date"></use>
            </svg>
          </div>
          <div class="section-content">
            <div class="section-title">
                {{ taskItem.deadline ? formatDate(taskItem.deadline) + '到期' : '设置到期日'}}
            </div>
            <date-picker 
              v-model="taskItem.deadline" 
              :input-class="'date-picker-input-taskdetail'" 
              :wrapper-class="'date-picker-wrapper-taskdetail'"
              :calendar-class="'date-picker-calendar-taskdetail'" 
              :calendar-button-icon="'date-picker-icon-taskdetail'" 
              :calendar-button-icon-content="''" 
              :calendar-button="true" 
              :highlighted="datePickerState.highlighted" 
              v-on:closed="showCalenderTrigon = !showCalenderTrigon"
              v-on:opened="showCalenderTrigon = !showCalenderTrigon"
              :ref="'task-detail-date-picker'"
            >
                <template slot="afterDateInput">
                  <div class="calender-trigon trigon1" v-show="showCalenderTrigon"></div>
                  <div class="calender-trigon trigon2" v-show="showCalenderTrigon"></div>
                </template>
              </date-picker>
            <div class="section-description"></div>
          </div>
          <a class="section-delete" title="删除" tabindex="0" @click="taskItem.deadline = null">
            <svg class="delete" width="20px" height="20px">
              <use xlink:href="#icon-delete"></use>
            </svg>
          </a>
        </div>

        <div class="section section-item detail-reminder date overdue" tabindex="0">
          <div class="section-icon">
            <svg class="reminder" width="20px" height="20px">
              <use xlink:href="#icon-reminder"></use>
            </svg>
          </div>
          <div class="section-content">
            <div class="section-title repeat">提醒我</div>
            <div class="section-description repeat">今天</div>
          </div>
          <a class="section-delete" title="删除" tabindex="0">
            <svg class="delete" width="20px" height="20px">
              <use xlink:href="#icon-delete"></use>
            </svg>
          </a>
        </div>

        <div class="section subtasks" :class="{hasSubtasks: taskItem.subTasks.length}" tabindex="0">
          <ul>
            <!-- done -->
            <!-- 没有实现拖动功能 -->
            <li tabindex="0" class="section-item subtask" draggable="true" v-for="(item, index) in taskItem.subTasks" :class="{done: item.isCompleted}" @focusout="item.displayView = true">
              <div class="section-icon">
                <!-- checked -->
                <a class="subtask-checkbox check-box" :class="{checked: item.isCompleted}" @click="toggleSubtaskCheckbox(index)">
                  <svg class="task-check" width="20px" height="20px">
                    <use xlink:href="#icon-task-check"></use>
                  </svg>
                  <svg class="task-checked" width="20px" height="20px">
                    <use xlink:href="#icon-task-checked"></use>
                  </svg>
                </a>
              </div>
              <div class="section-content top" :ref="`subtask-${index}`" >
                <div class="section-title selectable" tabindex=0>
                  <!-- 将其他的子任务displayView 改为 true -->
                  <div class="content-fakable">
                    <div class="display-view" :class="{hidden: !item.displayView}" @click="editSubtask(item, index)">{{ item.title }}</div>
                    <div class="edit-view" :class="{hidden: item.displayView}">
                      <div class="expandingArea active">
                        <pre>{{ item.title }}</pre>
                        <textarea v-model="item.title" @keypress.enter.prevent="item.displayView = true" @focusin="item.displayView = false"></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <a class="section-delete" @click="deleteSubtask(item, index)">
                <svg class="delete" width="20px" height="20px">
                  <use xlink:href="#icon-delete"></use>
                </svg>
              </a>
            </li>
          </ul>
          <div class="section-item subtask-add">
            <div class="section-icon">
              <svg class="plus-small" width="20px" height="20px">
                <use xlink:href="#icon-plus-small"></use>
              </svg>
            </div>
            <div class="section-content top">
              <!-- <div class="section-title hidden">添加子任务</div> -->
              <div class="section-edit">
                <div class="expandingArea active">
                  <pre>{{newSubtask.title}}</pre>
                  <textarea tabindex="0" placeholder="添加子任务" v-model="newSubtask.title" @keypress.enter.prevent="addSubtask" @focusout="addSubtask"></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>

       <!-- 没有实现 note 功能 -->
        <div class="section section-item note" :class="{hasNote: taskItem.note.content}" tabindex="0" @focusout="taskItem.note.displayView = true">
          <div class="section-icon">
            <svg class="options rtl-flip" width="20px" height="20px">
              <use xlink:href="#icon-options"></use>
            </svg>
          </div>
          <div class="section-content top">
            <!-- <div class="section-title note-add" v-if="!taskItem.note.content">添加备注...</div> -->
            <div class="note-body selectable"> <!-- v-else -->
              <div class="content-fakable">
                <div class="display-view" :class="{hidden: !taskItem.note.displayView, active: taskItem.note.content}" @click="taskItem.note.displayView = false">{{ taskItem.note.content ? taskItem.note.content : '添加备注...'}}</div>
                <div class="edit-view" :class="{hidden: taskItem.note.displayView}">
                  <div class="expandingArea active">
                    <pre>{{ taskItem.note.content }}</pre>
                    <textarea tabindex="0" placeholder="添加备注..." v-model.trim="taskItem.note.content" @focusin="taskItem.note.displayView = false"></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 功能暂不实现 note -->
          <div class="section-attachments" title="删除" tabindex="0">
            <a class="open-fullscreen-note" title="全屏打开笔记" tabindex="0">
              <svg class="fullscreen" width="20px" height="20px">
                <use xlink:href="#icon-fullscreen"></use>
              </svg>
            </a>
          </div>
        </div>

        <div class="section section-files" tabindex="0" :class="{hasFiles: taskItem.fileList.length}">
          <div class="audio-recorder hidden">
            <div class="audio-recorder-container">
              <audio></audio>
              <a class="start-recording-audio" tabindex="0" title="开始/暂停录音"><span class="icon-file record-audio"></span></a>
              <a class="play-recorded-audio disabled" tabindex="0" title="播放"><span class="icon-file play-audio"></span></a>
              <span class="duration">00:00</span>
              <a class="clear-recorded-audio" tabindex="0" title="清除录音"><span class="icon-file clear-audio"></span></a>
              <a class="upload-recorded-audio disabled" tabindex="0" title="上传录音"><span class="icon-file upload-audio"></span></a>
            </div>
          </div>
          <div class="section-item files-add" @click="triggerUpload">
            <div class="section-icon add-file" tabindex="0">
              <svg class="clip" width="20" height="20">
                <use xlink:href="#icon-clip"></use>
              </svg>
            </div>
            <div class="section-content">
              <div class="section-title files-add-label">
                <span>添加一个文件</span>
              </div>
            </div>
            <!-- 录音功能暂不实现 -->
            <div class="section-attachments">
              <span class="add-sound" tabindex="0" title="添加录音">
                <svg class="speech" width="20px" height="20px">
                  <use xlink:href="#icon-speech"></use>
                </svg>
              </span>
            </div>
          </div>
          <!-- <ul class="files-list"></ul> -->
          <upload-file ref="fileList" :fileList="taskItem.fileList"></upload-file>
        </div>

        <div class="comments-main has-comments">
          <!-- 没用到 promise 暂不实现这个功能 -->
          <div class="state loading spinner">
            <span class="dark"></span>
            <div class="error hidden">很抱歉，我们无法载入评论，请重试。</div>
          </div>
          <ul class="comments-list">
            <li tabindex="0" class="section-item section-item-comment active-user" v-for="(comment, index) in taskItem.comments">
              <div class="section-icon picture">
                <div class="avatar medium" :title="comment.username">
                  <img :src="comment.imgSrc">
                </div>
              </div>
              <div class="section-content">
                <span class="comment-author">{{ comment.username }}</span>
                <span class="comment-time">{{ showTime(comment.createDate) }}</span>
                <div class="comment-text">{{ comment.content }}</div>
              </div>
              <a class="section-delete" title="删除" @click="taskItem.comments.splice(index, 1)">
                <svg class="delete" width="20px" height="20px">
                  <use xlink:href="#icon-delete"></use>
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="dropTarget"></div>
      <div class="bottom">
        <a class="detail-close" tabindex="0" title="隐藏详细视图" @click="triggerClose">
          <svg class="close-right" width="20px" height="20px">
            <use xlink:href="#icon-close-right"></use>
          </svg>
        </a>
        <a class="detail-trash" tabindex="0" title="删除任务" @click="triggerDelete">
          <svg class="trash" width="20px" height="20px">
            <use xlink:href="#icon-trash"></use>
          </svg>
        </a>
        <div class="comments">
          <div class="comments-bottom">
            <!-- <div class="last-comment hidden">
              <span class="unread-count"></span>
            </div> -->
            <div class="comments-add">
              <div class="input-fake">
                <div class="expandingArea active">
                  <pre>{{ newComment.content }}</pre>
                  <textarea tabindex="0" placeholder="添加评论..." v-model="newComment.content" @keypress.enter.prevent="addComment"></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="detail-info">
          <span :title="formatDate(this.taskItem.createDate)">{{'创建于 ' + formatDate(this.taskItem.createDate)}}</span>
        </div>
      </div>
  </div>
</template>

<script>
import DatePicker from 'vuejs-datepicker'
import UploadFile from './UploadFile.vue'
let chineseWeekDate = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
export default {
  name: 'TaskDetail',
  props: ['username', 'taskItem'],
  components: {DatePicker, UploadFile},
  data() {
    return {
      displayView: true,
      datePickerState,
      showCalenderTrigon: false,
      newSubtask: this.createSubtaskTemplate(),
      newComment: this.createCommentTemplate(),
    }
  },
  methods: {
    log(args){
      return console.log.call(null, args)
    },
    triggerClose(){
      this.$emit('close')
    },
    triggerDelete(){
      this.$emit('delete', this.taskItem)
    },
    toggleTaskStarred(){
      this.taskItem.taskStarred = !this.taskItem.taskStarred
    },
    emitCheckedEvent(){
    // this.taskItem.isCompleted = !this.taskItem.isCompleted
      this.$emit('toggleDetailCheckbox', this.taskItem)
    },
    toggleSubtaskCheckbox(index){
      if(this.taskItem.subTasks[index].isCompleted) {
      // 如果由完成改为未完成
        this.taskItem.subTasks[index].isCompleted = false
        // 完成数量减一
        this.taskItem.subTasksCompletedNumber --
      }else{
      // 如果由未完成改为已经完成
        this.taskItem.subTasks[index].isCompleted = true
        // 完成数量加一
        this.taskItem.subTasksCompletedNumber ++ 
      }
      // 自己的 displayView 改为true
      this.taskItem.subTasks[index].displayView = true
    },
    addComment(){
      if(this.newComment.content){
        // 写入创建时间
        this.newComment.createDate = new Date().getTime()
        this.taskItem.comments.push(this.newComment)
        // 重置 newComment
        this.newComment = this.createCommentTemplate()
        // 滚动条滚到底
        this.$nextTick(function(){
          this.$refs.body.scrollTop = this.$refs.body.scrollHeight
        })
      }
    },
    deleteSubtask(item, index){
    // 删除子任务
      this.taskItem.subTasks.splice(index, 1)
      // 完成数量减一个
      if(item.isCompleted) this.taskItem.subTasksCompletedNumber--
    },
    addSubtask(){
    // 添加子任务
      if(this.newSubtask.title){
        this.taskItem.subTasks.push(this.newSubtask)
        this.newSubtask = this.createSubtaskTemplate()
      }
    },
    editSubtask(item, index){
    // 编辑子任务
      item.displayView = false
    },
    formatDate(timeStamp){
    // 传入一个时间戳 返回一个 '周二,5月15 到期' 的时间格式
      let date = new Date(timeStamp)
      let week = chineseWeekDate[date.getDay()]
      let month = date.getMonth() + 1
      let day = date.getDate()
      return `${week}，${month}月${day} `
    },
    showTime(createDate){
      // 输入一个 完成的任务对象
      // 输出新的时间 和 旧的时间之间的间隔
      let newDate = new Date().getTime()
      let delta = Math.ceil((newDate - createDate)/1000)
      let days, hours, minutes, result //, seconds
      days = Math.floor(delta / (60*60*24))
      hours = Math.floor(delta / (60*60)) % 24
      minutes = Math.floor(delta / 60) % 60
      // seconds = delta % 60
      result = '几秒钟'
      if(minutes) result = `${minutes} 分钟`
      if(hours) result = `${hours} 小时`
      if(days) result = `${days} 天`
      return `${result} 之前`
    },
    createSubtaskTemplate(){
      return {title:'', isCompleted: false, displayView: true,}
    },
    createCommentTemplate(){
      return {content:'', username: this.username, imgSrc: '//via.placeholder.com/50x50', createDate: null}
    },
    triggerUpload(){
      this.$refs.fileList.$refs.select.click()
    },
  },
  watch: {
    taskItem(){
    // 如果换了一个项目，关闭 date-picker 和 倒三角
      this.$refs['task-detail-date-picker'].close()
      this.showCalenderTrigon = false
    }
  }
}

let datePickerState = {
  highlighted: {
    dates: [ // Highlight an array of dates
      new Date(), // 当天高亮
    ],
  }
}

</script>
<style scoped>
#task-detail{display: flex; flex-direction: column; height: 100vh; width: 367px; position: relative; overflow: hidden; background: #fff;}
#task-detail.animate{transition: 100ms width ease;}
textarea{outline: none; background: transparent; font-weight: 500; line-height: 20px;}
textarea::-webkit-input-placeholder{font-weight: 500; line-height: 20px;}

.topbar{min-height: 55px; position: relative;}
.detail-checkbox{position: absolute; left: 18px; top: 18px; z-index: 3;}
.checkbox .detail-check{stroke: rgba(0, 0, 0, 0.35);}
.checkbox .detail-checked{fill: rgba(0, 0, 0, 0.35);}
.detail-star{position: absolute; top: 0; right: 0; z-index: 2;}
.star-wrapper{position: absolute; fill: rgba(0, 0, 0, 0.3); right: 15px; top: -4px; z-index: 1; width: 22px; height: 49px;}
.starred-wrapper{position: absolute; fill: #d74e48; right: 15px; top: -4px; z-index: 1; width: 22px; height: 49px;}
.title-container{position: relative; z-index: 1;}
.title{min-height: 24px; padding: 16px 50px 13px; font-size: 16px; text-align: left; line-height: 24px; font-weight: 600; border-bottom: 1px solid #ebebeb; outline: none; overflow: hidden;}
.content-fakable .display-view{white-space: pre-wrap; word-wrap: break-word; word-break: break-all; overflow: hidden; margin-top: 1px;}
.content-fakable .display-view span{white-space: pre-wrap; user-select: text;}
.expandingArea{position: relative;}
.expandingArea pre{line-height: 24px; min-height: 24px; font-size: 16px; font-weight: bold; tab-size: 1; margin-top: 1px; padding: 0; border: none;
 visibility: hidden; display: block; white-space: pre-wrap; word-wrap: break-word; word-break: break-all;font-family: 'Avenir', Helvetica, Arial, sans-serif;}
.expandingArea textarea{line-height: 24px; font-size: 16px; 
  overflow: hidden; position: absolute; top: -1px; left: 0; width: 100%; height: 100%;
  font-weight: bold; tab-size: 1; resize: none; color: #262626; margin-top: 1px; padding: 0; 
  border: none; display: block; white-space: pre-wrap; word-wrap: break-word; word-break: break-all; font-family: 'Avenir', Helvetica, Arial, sans-serif;}

.body{flex: 1; padding-bottom: 16px; transition: margin 150ms; background: #fafafa; overflow-x: hidden; overflow-y: auto;}
.section{outline: none; position: relative; padding: 8px 0; text-align: left;}
.section-item{position: relative; outline: none; padding-left: 10px; padding-right: 10px; display: flex; align-items: center;}
.section:before{content: ''; position: absolute; bottom: 0; left: 50px; right: 0; border-bottom: 1px solid #ebebebeb;}
.section-item .section-icon, .section-item .section-attachments{align-self: flex-start; flex-shrink: 0; height: 32px; min-width: 32px; fill:#a3a3a2;}
.section-item .section-icon svg{margin: 6px;}
.section-item .section-content{flex: auto; margin: 0 8px; overflow: hidden;}
.section-item .section-title{font-size: 16px; line-height: 20px; color: #9fa2a6; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.section-item .section-edit .assign{font-size: 16px;}
.section-item .section-delete{visibility: hidden; align-self: flex-start; flex-shrink: 0; height: 32px; min-width: 32px; fill: #a3a3a2; margin-left: auto;}
.section-item:hover .section-delete{visibility: visible;}
.section-item .section-delete svg{margin: 6px; fill: #737372;}
.section-item.date .section-title{color: #328ad6;}
.section-item.date.overdue .section-title{color: #b3312d;}
.section-item.date.overdue .reminder, .section-item.date.overdue .date{fill: #b3312d;}
.section-item.date .reminder, .section-item.date .date{fill: #328ad6;}
.section-item .section-description{font-size: 12px;}
.section-files.hasFiles .section-icon svg{fill: #63b4be;}

.subtasks a{color: #328ad6;}
.subtasks .section-icon .task-check{stroke: #67ae2b;}
.subtasks .check-box .task-checked{fill: rgba(0, 0, 0, 0.35); display: none;}
.subtasks .check-box.checked .task-check{display: none;}
.subtasks .check-box.checked .task-checked{display: block;}
.section-item .section-content.top{align-self: flex-start; padding: 6px 0;}
.subtask .section-title{color: #262626;}
.subtask.done .display-view{text-decoration: line-through; color: #aaa;}
.subtasks pre{line-height: 20px; font-weight: normal;}
.subtasks textarea{line-height: 20px; font-weight: normal;}
.subtask-add textarea{font-size: 14px;}
.subtasks.hasSubtasks .plus-small{fill: #67ae2b;}

.note.hasNote .section-icon svg{fill: #e29600;}
.note .note-body{height:auto; border: none; font-size: 16px; line-height: 20px; word-wrap: break-word;}
.note .note-body .display-view{color:#9fa2a6;}
.note .note-body .display-view.active{color:#2c3e50;}
.note .note-body .expandingArea pre{min-height: 100px; font-weight: normal;}
.note .note-body .expandingArea textarea{min-height: 100px; font-weight: normal;}
.section-attachments{text-align: center;}
.section-attachments svg{margin: 6px;}
.section-attachments span{display: inline-block; width: 32px; height: 32px;}

.audio-recorder-container{border-radius: 3px; border: 1px solid #c9c9c9; margin:11px 0 10px;  background: #fff; text-align: center;}
.audio-recorder-container a, .audio-recorder-container .duration{vertical-align: middle;}
.audio-recorder-container span{display: inline-block;}
.icon-file{background-image: url('../assets/images/files.png');}
.icon-file.record-audio{width: 18px; height: 18px; background-position: -129px -162px;}
.audio-recorder-container a{display: inline-block; width: 48px; padding: 10px 0; margin: 0 2px; font-size: 0; font-weight: bold; text-align: center;}
.audio-recorder-container .start-recording-audio{color: #f00;}
.audio-recorder-container .play-recorded-audio{color: #008000;}
.icon-file.play-audio{width: 18px; height: 18px; background-position: -75px -162px;}
a.disabled .play-audio{width: 18px; height: 18px; background-position: -111px -162px;}
.audio-recorder-container .duration{width: 84px; font-size: 16px; font-weight: bold; color: #737372;}
.audio-recorder-container .icon-file.clear-audio{width: 19px; height: 19px; background-position: 0 -162px;}
.cion-file.upload-audio{width: 19px; height: 19px; background-position: -19px -162px;}
a.disabled .upload-audio{width: 19px; height: 19px; background-position: -162px -137px;}

.comments-main{position: relative;}
.comments-main .spinner{height: 0; transition: all 250ms ease; position: relative;}
.comments-main .dark{opacity: 0.6; margin-top: 10px; position: absolute; left: 50%; top: 0; margin-left: -10px; width: 19px; height: 19px; background: url('../assets/images/loading_black.png'); animation: rotate .8s linear infinite;}
.comments-mian li{line-height: 16px;}
.section-item.section-item-comment{padding-top: 16px;}
.avatar.medium{width: 32px; height: 32px;}
.avatar img{width: 100%; height: 100%; border-radius: 50%; display: block;}
.comments-main li .section-content{text-align: left; font-size: 14px;}
.comments-main li .comment-author{font-weight: bold; max-width: 100px; display: inline-block; vertical-align: top; height: 16px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;}
.comments-main li .comment-time{color: #737272; vertical-align: top;}
.comments-main li .comment-text{line-height: 18px; word-wrap: break-word; white-space: pre-wrap;}

.bottom{position: relative;}
.bottom .detail-close, .bottom .detail-trash{position: absolute; bottom: 8px; opacity: 0.6}
.bottom .detail-close:hover, .bottom .detail-trash:hover{opacity: 0.8}
.bottom .detail-close{left: 8px;}
.bottom .detail-trash{right: 6px;}
.comments-bottom{border-top: 1px solid #ebebeb; background: #fff;}
.last-comment{position: absolute; z-index: 1; left: 0; right: 0; top: -44px; border-top: 1px solid #ebebeb;}
.comments-bottom .unread-count{position: absolute; display: none; right: 15px; top: 10px; color: #fff; font-size: 12px; line-height: 12px; border-radius: 20px; padding: 2px; padding-bottom: 3px; text-align: center; min-width: 11px; background: #d74e48;}
.comments-add{padding: 10px; padding-bottom: 0;}
.input-fake{width: 100%; min-height: 32px; padding: 7px; transition: all 150ms ease-in-out; box-shadow: inset 0 0 0 1px #d6d6d6; border-radius: 3px; color: #262626;}
.input-fake textarea{top: 1px; font-weight: normal; line-height: 20px;}
.input-fake pre{font-weight: normal; line-height: 20px;}
.detail-info{font-size: 12px; text-align: center; padding: 14px 35px; color: #a3a3a2;}
.detail-info span{display: inline-block; max-width: 100%; height: 15px; }
</style>
