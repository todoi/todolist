<template>
  <div 
    tabindex="0" 
    class="section section-item note" 
    :class="{hasNote: taskItem.note}" 
    @focusout="changeNote"
  >

    <div class="section-icon">
      <svg class="options rtl-flip" width="20px" height="20px">
        <use xlink:href="#icon-options"></use>
      </svg>
    </div>

    <div class="section-content top">
      <!-- <div class="section-title note-add" v-if="!taskItem.note">添加备注...</div> -->
      <div class="note-body selectable"> <!-- v-else -->
        <div class="content-fakable">
          <div 
            class="display-view" 
            :class="{hidden: !displayView, active: taskItem.note}" 
            @click="editNote"
          >{{ taskItem.note ? taskItem.note : '添加备注...'}}</div>

          <div class="edit-view" :class="{hidden: displayView}">
            <div class="expandingArea active">
              <pre>{{ newNote }}</pre>
              <textarea 
                tabindex="0" 
                placeholder="添加备注..." 
                v-model.trim="newNote" 
                @focusin="editNote"
              ></textarea>
            </div>

          </div>

        </div>
      </div>
    </div>

    <!-- 功能暂不实现 note -->
    <div class="section-attachments hidden" title="删除" tabindex="0">
      <a class="open-fullscreen-note" title="全屏打开笔记" tabindex="0">
        <svg class="fullscreen" width="20px" height="20px">
          <use xlink:href="#icon-fullscreen"></use>
        </svg>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Note',
    props: ['taskItem'],
    data () {
      return {
        displayView: true,
        newNote: '',
      }
    },
    methods: {
      changeNote () {
        this.displayView = true
        if (this.newNote && this.newNote !== this.taskItem.note) {
          this.$store.dispatch('updateTask', {
            task: this.taskItem,
            attributes: {note: this.newNote}
          })
        }
      },
      editNote () {
        this.newNote = this.taskItem.note
        this.displayView = false
      }
    }
  }
</script>

<style>
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

.note.hasNote .section-icon svg{fill: #e29600;}
.note .note-body{height:auto; border: none; font-size: 16px; line-height: 20px; word-wrap: break-word;}
.note .note-body .display-view{color:#9fa2a6;}
.note .note-body .display-view.active{color:#2c3e50;}
.note .note-body .expandingArea pre{min-height: 100px; font-weight: normal;}
.note .note-body .expandingArea textarea{min-height: 100px; font-weight: normal;}

.section-attachments{text-align: center;}
.section-attachments svg{margin: 6px;}
.section-attachments span{display: inline-block; width: 32px; height: 32px;}
</style>
