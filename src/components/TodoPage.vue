<template>
  <div id="todo-page">
    <div id="lists-nav" :class="{'collapsed': isCollapsed}">
      <div class="lists-inner" tabindex="0">
        <SideSearchToolbar @collapse="isCollapsed = !isCollapsed" />
        <SideUserToolbar />
        <SideListsScroll @collapse="isCollapsed = !isCollapsed" />
        <SidebarActions />
      </div>
    </div>
    <Task class="tasks"></Task>
  </div>
</template>

<script>
import SideSearchToolbar from './SideSearchToolbar'
import SideUserToolbar from './SideUserToolbar'
import SideListsScroll from './SideListsScroll'
import SidebarActions from './SidebarActions'
import Task from './Task'

import AV from '../lib/leancloud'
import utils from '../lib/utils'
import icon from '../assets/icons.js'

export default {
  name: 'TodoPage',
  components: {SideSearchToolbar, SideUserToolbar, SideListsScroll, SidebarActions, Task},
  data (){
    return {
      isCollapsed: false,
    }
  },
  created () {
    this.$store.commit('setUser', utils.getAVUser())
    utils.goHomePage()
  },
  methods: {
    logOut () {
      utils.logOut()
    }
  }
}

</script>
<style scoped>
*{box-sizing: content-box;}
#todo-page { display: flex; }
#todo-page:before{content:''; position: fixed; top: 0; right: 0; bottom: 0; left: 0; background: url('../assets/images/bg.jpg') center top/ cover no-repeat; z-index: -1;}
.tasks{overflow: hidden; flex: 1;}

#lists-nav :focus{outline: none;}
#lists-nav{width: 280px; background: #f7f7f7; z-index: 3; overflow: hidden; transition: width 100ms ease; user-select: none;}
#lists-nav.collapsed{width: 42px; flex-basis: 42px;}

.lists-inner{display: flex;position: relative; flex-direction: column; height: 100vh;}

</style>
