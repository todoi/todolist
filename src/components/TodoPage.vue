<template>
  <section id="todo-page">
    <div class="todo-page-inner">
      <lists-navigation></lists-navigation>
      <task class="tasks"></task>
      <task-detail></task-detail>
    </div>
  </section>
</template>

<script>
import ListsNavigation from './ListsNavigation'
import TaskDetail from './TaskDetail'
import Task from './Task'
export default {
  name: 'TodoPage',
  components: {ListsNavigation, TaskDetail, Task},
  data (){
    return {
    }
  }
}

</script>
<style scoped>
  #todo-page:before{content:''; position: fixed; top: 0; right: 0; bottom: 0; left: 0; background: url('../assets/images/bg.jpg') center top/ cover no-repeat; z-index: -1;}
  .todo-page-inner{display: flex;}
  .tasks{overflow: hidden; flex: 1;}
</style>
