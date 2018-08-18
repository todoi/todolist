<template>
  <div id="todo-page">
    <lists-navigation></lists-navigation>
    <Task class="tasks"></Task>
    <button @click="logOut()">登出</button>
  </div>
</template>

<script>
import ListsNavigation from './ListsNavigation'
import Task from './Task'

import AV from '../lib/leancloud'
import utils from '../lib/utils'
import icon from '../assets/icons.js'

export default {
  name: 'TodoPage',
  components: {ListsNavigation, Task},
  data (){
    return {
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
  #todo-page { display: flex; }
  #todo-page:before{content:''; position: fixed; top: 0; right: 0; bottom: 0; left: 0; background: url('../assets/images/bg.jpg') center top/ cover no-repeat; z-index: -1;}
  .tasks{overflow: hidden; flex: 1;}
</style>
