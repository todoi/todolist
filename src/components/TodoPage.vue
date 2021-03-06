<template>
  <div id="todo-page" v-if="user.id">
    <div id="main-interface">
      <div class="dialog-wrapper" v-if="currentDialog">
        <DialogListEditor
          role="changer" 
          header="编辑清单"
          :title="currentList.title"
          v-if="currentDialog === 'changer'"
          @closeDialog="closeDialog"
          @openDialogDeletor="currentDialog = 'deletor'"
          @finish="changeListTitle"
          />

        <DialogListEditor
          role="creator" 
          header="创建新清单"
          title=""
          v-if="currentDialog === 'creator'"
          @closeDialog="closeDialog"
          @finish="createList"
          />

        <DialogListDeletor
          header="删除清单"
          :title="currentList.title"
          v-if="currentDialog === 'deletor'"
          @closeDialog="closeDialog"
          @submit="deleteList"
          />

        <DialogListDeletor
          header="删除任务"
          :title="taskItem.title"
          v-if="currentDialog === 'deleteTask'"
          @closeDialog="closeDialog"
          @submit="deleteTask"
          />
      </div>
      <div id="lists-nav" :class="{'collapsed': isCollapsed}">
        <div class="lists-inner" tabindex="0">
          <SideSearchToolbar 
          v-model="searchText"
          @collapse="isCollapsed = !isCollapsed" 
          @sendSearchResult="setSearchResult" />

          <SideUserToolbar 
            :hideOfflineIcon="hideOfflineIcon"
            :hideSyncIcon="hideSyncIcon"
            @openPopover="openPopover" />

          <SideListsScroll 
            ref="sideListsScroll"
            @collapse="isCollapsed = !isCollapsed" 
            @closeTaskEditor="showTaskEditor = false"
            @clearSearch="searchText = ''"
            @openDialogListChanger="currentDialog = 'changer'"/>

          <SidebarActions @openDialogListCreator="currentDialog = 'creator'"/>
        </div>
      </div>
      <div id="tasks">
        <div class="tasks-main">
          <ListToolbar 
            :searchText="searchText"
            @closeTaskEditor="showTaskEditor = false"/>

          <div class="tasks-scroll">
            <SearchResult 
              v-if="searchText"
              :searchResult="searchResult" />

            <div v-else>
              <AddTask v-if="!currentList.isFilter"/>
              <TaskList :currentList="currentList" @openTaskEditor="showTaskEditor = true"/>
            </div>
          </div>
        </div>
      </div>

      <!-- 编辑任务 -->
      <TaskDetail 
        :taskItem="taskItem"
        v-if="showTaskEditor" 
        @closeTaskEditor="showTaskEditor = false" 
        @openDialogDeletor="currentDialog = 'deleteTask'" />

    </div>
    <div class="popover-area" tabindex="-1" ref="popover" @focusout="currentPopover = ''">
      <UserPopover v-show="currentPopover === 'user'"/>
      <ActivityPopover v-show="currentPopover === 'activity'"/>
      <ConversationPopover v-show="currentPopover === 'conversation'"/>
    </div>
  </div>
</template>

<script>
// import vue components
import SideSearchToolbar from './sidebar/SideSearchToolbar'
import SideUserToolbar from './sidebar/SideUserToolbar'
import SideListsScroll from './sidebar/SideListsScroll'
import SidebarActions from './sidebar/SidebarActions'

import TaskList from './list/TaskList'
import ListToolbar from './list/ListToolbar'
import AddTask from './list/AddTask'
import SearchResult from './list/SearchResult'


import TaskDetail from './taskEditor/TaskDetail'

import DialogListEditor from './dialogs/DialogListEditor'
import DialogListDeletor from './dialogs/DialogListDeletor'
import UserPopover from './popovers/UserPopover.vue'
import ActivityPopover from './popovers/ActivityPopover.vue'
import ConversationPopover from './popovers/ConversationPopover.vue'


// import js file
import leancloud from '../lib/leancloud'
import utils from '../lib/utils'
import icon from '../assets/icons.js'

export default {
  name: 'TodoPage',
  components: {DialogListEditor, DialogListDeletor, SideSearchToolbar, SideUserToolbar, SideListsScroll, SidebarActions, TaskList, ListToolbar, AddTask, SearchResult, TaskDetail, UserPopover, ActivityPopover, ConversationPopover},
  beforeCreate () {
    let isAutoLogin = window.localStorage.getItem('isAutoLogin') && window.JSON.parse(window.localStorage.getItem('isAutoLogin'))
    if (!isAutoLogin) {
      leancloud.removeStorageItem()
    }
  },
  data (){
    return {
      isCollapsed: false,
      currentPopover: '',
      currentDialog: '',
      showTaskEditor: false, // 打开任务编辑区域
      hideOfflineIcon: true,
      searchText: '',
      searchResult: []
    }
  },
  created () {
    if (leancloud.getAVUser().id) {
      this.$store.dispatch('fetchTodo')
      this.$store.commit('setUser', leancloud.getAVUser())
    } else {
      this.$store.commit('resetUser')
      utils.goHomePage(this.$root)
    }
  },
  mounted () {
    window.addEventListener('offline', () => {
      this.hideOfflineIcon = false
    })
    window.addEventListener('online', () => {
      this.hideOfflineIcon = true
    })
  },
  computed: {
    user () {
      return this.$store.state.user
    },
    currentList () {
      return this.$store.state.currentList
    },
    taskItem () {
      //return this.$store.getters.getCurrentTask  
      return this.$store.state.currentTask
    },
    hideSyncIcon () {
      return this.$store.state.hideSyncIcon
    }
  },
  methods: {
    closeDialog () {
      this.currentDialog = ''
      this.showTaskEditor = false
      this.searchText = ''
    },
    openPopover (type) {
      this.currentPopover = type
      this.$nextTick().then(() => {
        this.$refs.popover.focus()
      })
    },
    setSearchResult (searchResult) {
      this.searchResult = searchResult
    },
    changeListTitle (newTitle) {
      let obj = Object.assign({}, this.currentList )
      this.$store.dispatch('updateList', {
        list: obj, 
        attributes: {title: newTitle}
      })
    },
    createList (title) {
      this.$store.dispatch('createList', title ).then(value => {
        this.$nextTick().then(() => {
          this.$refs.sideListsScroll.$el.scrollTop = '10000'
        })
      })
    },
    deleteList () {
      let promise = this.$store.dispatch('deleteList', this.currentList)
      promise.then(value =>  this.closeDialog())
    },
    // 打开任务编辑的区域
    deleteTask () {
      this.showTaskEditor = false
      this.$store.dispatch('deleteTask', this.taskItem)
      this.closeDialog()
    }
  }
}

</script>
<style scoped>
*{box-sizing: content-box;}
#main-interface { display: flex; }
#main-interface:before{content:''; position: fixed; top: 0; right: 0; bottom: 0; left: 0; background: url('../assets/images/bg.jpg') center top/ cover no-repeat; z-index: -1;}

#lists-nav :focus{outline: none;}
#lists-nav{width: 280px; background: #f7f7f7; z-index: 3; overflow: hidden; transition: width 100ms ease; user-select: none;}
#lists-nav.collapsed{width: 42px; flex-basis: 42px;}
.lists-inner{display: flex;position: relative; flex-direction: column; height: 100vh;}

.dialog-wrapper {position: absolute; display: flex; align-items: center; width: 100%; height: 100%; z-index: 1000; background: rgba(0,0, 0, 0.4);}

#tasks{height: 100vh; position: relative; display: flex; overflow: hidden; flex: 1;}
.tasks-main{height: 100vh; position: relative; display: flex; flex-direction: column; flex:1;}
.tasks-scroll{flex: 1; padding:0 14px; overflow-y: auto; overflow-x: hidden; text-align: left;}

</style>
