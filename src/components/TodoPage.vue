<template>
  <div id="todo-page">
    <div id="main-interface">
      <div id="lists-nav" :class="{'collapsed': isCollapsed}">
        <div class="lists-inner" tabindex="0">
          <SideSearchToolbar @collapse="isCollapsed = !isCollapsed" />
          <SideUserToolbar @openPopover="openPopover"/>
          <SideListsScroll @collapse="isCollapsed = !isCollapsed" />
          <SidebarActions />
        </div>
      </div>
      <Task class="tasks"></Task>
    </div>
    <div class="popover-area" tabindex="-1" ref="popover" @focusout="closePopover">
      <UserPopover v-show="currentPopover === 'user'"/>
      <ActivityPopover v-show="currentPopover === 'activity'"/>
    </div>
  </div>
</template>

<script>
import SideSearchToolbar from './SideSearchToolbar'
import SideUserToolbar from './SideUserToolbar'
import SideListsScroll from './SideListsScroll'
import SidebarActions from './SidebarActions'
import Task from './Task'
import UserPopover from './UserPopover'
import ActivityPopover from './ActivityPopover'

import AV from '../lib/leancloud'
import utils from '../lib/utils'
import icon from '../assets/icons.js'

export default {
  name: 'TodoPage',
  components: {SideSearchToolbar, SideUserToolbar, SideListsScroll, SidebarActions, Task, UserPopover, ActivityPopover},
  created () {
    this.$store.commit('setUser', utils.getAVUser())
    utils.goHomePage()
  },
  data (){
    return {
      isCollapsed: false,
      currentPopover: ''
    }
  },
  computed: {
  },
  methods: {
    openPopover (type) {
      this.currentPopover = type
      this.$nextTick().then(() => {
        this.$refs.popover.focus()
      })
    },
    closePopover () {
      this.currentPopover = ''
    }
  }
}

</script>
<style scoped>
*{box-sizing: content-box;}
#main-interface { display: flex; }
#main-interface:before{content:''; position: fixed; top: 0; right: 0; bottom: 0; left: 0; background: url('../assets/images/bg.jpg') center top/ cover no-repeat; z-index: -1;}
.tasks{overflow: hidden; flex: 1;}

#lists-nav :focus{outline: none;}
#lists-nav{width: 280px; background: #f7f7f7; z-index: 3; overflow: hidden; transition: width 100ms ease; user-select: none;}
#lists-nav.collapsed{width: 42px; flex-basis: 42px;}

.lists-inner{display: flex;position: relative; flex-direction: column; height: 100vh;}

</style>
