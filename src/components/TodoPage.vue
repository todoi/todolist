<template>
  <section id="todo-page">
    <div class="todo-page-inner">
      <lists-navigation class="navigation"></lists-navigation>
      <div class="tasks"></div>
      <task-detail class="detail"></task-detail>
    </div>
  </section>
</template>

<script>
import ListsNavigation from './ListsNavigation'
import TaskDetail from './TaskDetail'
export default {
  name: 'TodoPage',
  components: {ListsNavigation, TaskDetail},
  data (){
    return {
    }
  }
}

</script>
<style scoped>
  #todo-page:before{content:''; position: fixed; top: 0; right: 0; bottom: 0; left: 0; background: #ddd; z-index: -1;}
  .todo-page-inner{display: flex;}
</style>
