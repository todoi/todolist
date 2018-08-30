<template>
  <div id="task-detail" class="animate">
    <TaskEditorTopbar :taskItem="taskItem" />

    <div class="body" ref="body">
      <Deadline :taskItem="taskItem"/>

      <!--没有实现-->
      <Reminder  class="hidden"/>

      <SubTasks :taskItem="taskItem"/>

      <Note :taskItem="taskItem"/>

      <UploadFile :taskItem="taskItem" />

      <CommentList :taskItem="taskItem" :comments="comments"/>

    </div>
    <!--<div class="dropTarget"></div>-->
    <TaskEditorBottom 
      :taskItem="taskItem"
      @triggerClose="$emit('closeTaskEditor')"
      @triggerDelete="$emit('openDialogDeletor')"
    />

  </div>
</template>

<script>
import utils from '../../lib/utils'
import TaskEditorTopbar from './TaskEditorTopbar'
import Deadline from './Deadline'
import Reminder from './Reminder'
import UploadFile from './UploadFile'
import SubTasks from './SubTasks'
import Note from './Note'
import CommentList from './CommentList'
import TaskEditorBottom from './TaskEditorBottom'

export default {
  name: 'TaskDetail',
  props: ['taskItem'],
  components: {TaskEditorTopbar, Deadline, Reminder, UploadFile, SubTasks, Note, CommentList, TaskEditorBottom},
  data() {
    return {
    }
  },
  computed: {
    username () {
      return this.$store.state.user.username
    },
    getAvatarSrc () {
      return utils.getAvatarSrc(this.username)
    },
    comments () {
      return this.$store.state.allComment[this.taskItem.id]
    }
  },
  methods: {
    toggleTaskStarred () {
      this.taskItem.starred = !this.taskItem.starred
    },
  },
}


</script>
<style scoped>
#task-detail{display: flex; flex-direction: column; height: 100vh; width: 367px; position: relative; overflow: hidden; background: #fff;}
#task-detail.animate{transition: 100ms width ease;}

textarea{outline: none; background: transparent; font-weight: 500; line-height: 20px;}
textarea::-webkit-input-placeholder{font-weight: 500; line-height: 20px;}
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


.section-attachments{text-align: center;}
.section-attachments svg{margin: 6px;}
.section-attachments span{display: inline-block; width: 32px; height: 32px;}

</style>
