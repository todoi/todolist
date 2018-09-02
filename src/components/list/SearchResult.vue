<template>
  <div class="task-list starred">
    <div v-if="searchResult.length" v-for="(item ,index) in searchResult" >
      <h2 class="heading normal">
        <a class="group-header">{{ $store.getters.getListById(item.listId).title }}</a>
      </h2>
      <Tasks 
        :items="item.tasks"
        :isDoneItem="false"
        @selectTaskItem="selectFilterTask"
        @openTaskEditor="$emit('openTaskEditor')"
        @triggerCheckEvent="checkTask"
        @toggleTaskStar="toggleTaskStar" />
    </div>

    <NotFound v-show="!searchResult.length" />
  </div>
</template>

<script>
import Tasks from './Tasks'
import NotFound from './NotFound'
import utils from '../../lib/utils'

export default {
  name: 'TaskList',
  components: { Tasks, NotFound },
  props: ['searchResult'],
  data(){
    return { }
  },
  methods: {
    // 点击复选框 完成
    checkTask (item) {
      this.$store.dispatch('updateTask', {
        task: item,
        attributes: {
          isCompleted: !item.isCompleted,
          finishAt: new Date().getTime()
        }
      }).then()
    },

    // 切换星标
    toggleTaskStar (item){
      this.$store.dispatch('updateTask', {
        task: item,
        attributes: {starred: !item.starred}
      })
    },

    // 选择 task
    selectFilterTask (item) {
      let items = this.searchResult
      this.$store.commit('selectFilterTask', { 
        taskId: item.id,
        listId: item.belongTo.id,
        task: item,
        items 
      })
    },
  },
}




</script>

<style scoped>
.task-list{padding-bottom: 72px;}
.heading{margin-top: 20px; margin-bottom: 10px; font-size: 12px; color: #fff; word-wrap: break-word; word-break: break-word; user-select: none;}
.heading a{padding: 3px 10px; text-transform: uppercase; letter-spacing: 1px; font-weight: 400; line-height: 16px; border-radius: 3px; background: rgba(14, 145, 197, 0.75);}

</style>

