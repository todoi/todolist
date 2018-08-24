<template>
  <div id="todo-page">
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
          :title="currentList.title"
          v-if="currentDialog === 'deletor'"
          @closeDialog="closeDialog"
          @submit="deleteList"
          />
      </div>
      <div id="lists-nav" :class="{'collapsed': isCollapsed}">
        <div class="lists-inner" tabindex="0">
          <SideSearchToolbar @collapse="isCollapsed = !isCollapsed" />
          <SideUserToolbar @openPopover="openPopover"/>
          <SideListsScroll 
            ref="sideListsScroll"
            @collapse="isCollapsed = !isCollapsed" 
            @openDialogListChanger="openDialogListChanger"/>
          <SidebarActions @openDialogListCreator="currentDialog = 'creator'"/>
        </div>
      </div>
      <div id="tasks">
        <div class="tasks-main">
          <ListToolbar />
          <div class="tasks-scroll">
            <AddTask/>
            <TaskList></TaskList>
            <NotFound class="hidden" />
          </div>
        </div>
      </div>
      <!-- 编辑任务 -->
      <TaskDetail v-show="showDetail" :taskItem="editItem" @toggleDetailCheckbox="showDetail = false" @close="showDetail = false" @delete="showDetail = false" />
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
import NotFound from './list/NotFound'

import TaskDetail from './taskEditor/TaskDetail'

import DialogListEditor from './dialogs/DialogListEditor'
import DialogListDeletor from './dialogs/DialogListDeletor'
import UserPopover from './popovers/UserPopover.vue'
import ActivityPopover from './popovers/ActivityPopover.vue'
import ConversationPopover from './popovers/ConversationPopover.vue'


// import js file
import AV from '../lib/leancloud'
import utils from '../lib/utils'
import icon from '../assets/icons.js'

export default {
  name: 'TodoPage',
  components: {DialogListEditor, DialogListDeletor, SideSearchToolbar, SideUserToolbar, SideListsScroll, SidebarActions, TaskList, ListToolbar, AddTask, NotFound, TaskDetail, UserPopover, ActivityPopover, ConversationPopover},
  created () {
    this.$store.commit('setUser', utils.getAVUser())
    utils.goHomePage()
  },
  data (){
    return {
      isCollapsed: false,
      currentPopover: '',
      currentDialog: '',
      showDetail: true, // 打开任务编辑区域
      editItem: {subTasks: [], note: {}, comments: [], fileList: []},
    }
  },
  computed: {
    currentList () {
      return this.$store.state.collections.currentList
    }
  },
  methods: {
    closeDialog () {
      this.currentDialog = ''
    },
    openPopover (type) {
      this.currentPopover = type
      this.$nextTick().then(() => {
        this.$refs.popover.focus()
      })
    },
    changeListTitle (newTitle) {
      let obj = Object.assign({}, this.currentList, { newTitle })
      this.$store.commit('changeListTitle', obj)
    },
    createList (title) {
      this.$store.commit('createList', title )
      this.$nextTick().then(() => {
        this.$refs.sideListsScroll.$el.scrollTop = '10000'
      })
    },
    deleteList () {
      this.$store.commit('deleteList', this.currentList)
    },
    openDialogListChanger () { 
      //payload = {listId, index, title}
      this.currentDialog = 'changer'
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
