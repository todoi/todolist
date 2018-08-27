<template>
  <div class="task-list starred">
    <div v-if="currentList.isFilter">
      <div v-for="(item ,index) in $store.getters[`get${toCapitalize(currentList.id)}Sort`]">
        <h2 class="heading normal">
          <a class="group-header">{{ $store.getters.getListById(item.listId).title }}</a>
        </h2>
        <Tasks 
          :items="item.tasks"
          :isDoneItem="currentList.id === 'completed'"
          @selectTaskItem="selectFilterTask"
          @openTaskEditor="$emit('openTaskEditor')"
          @triggerCheckEvent="filterCheckEvent"
          @toggleTaskStar="toggleTaskStar" />
      </div>
    </div>

    <div v-else>
      <Tasks 
        :items="taskItems"
        @selectTaskItem="selectListTask"
        @openTaskEditor="$emit('openTaskEditor')"
        @triggerCheckEvent="checkTask"
        @toggleTaskStar="toggleTaskStar" />
      <h2 tabindex="0" class="heading normal" :class="{hidden: !doneTaskItems.length}">
        <a class="group-header" @click.stop="toggleDoneTaskItems">显示已完成任务</a>
      </h2>
      <Tasks
        v-if="this.isShowDoneItems" 
        :isDoneItem="true"
        :items="doneTaskItems"
        @selectTaskItem="selectListTask"
        @openTaskEditor="$emit('openTaskEditor')"
        @triggerCheckEvent="restoreTask"
        @toggleTaskStar="toggleTaskStar" />
    </div>

  </div>
</template>

<script>
import Tasks from './Tasks'
import utils from '../../lib/utils'

export default {
  name: 'TaskList',
  components: { Tasks },
  props: ['currentList'],
  data(){
    return {
      isShowDoneItems: true,  // 显示已经完成任务列表
    }
  },
  computed:{
    taskItems () {
      return this.$store.getters.getTaskItems
    },
    doneTaskItems () {
      return this.$store.getters.getDoneTaskItems 
    },
  }, 
  methods: {
    // 隐藏或者显示已经完成的任务列表
    toggleDoneTaskItems(){
      this.isShowDoneItems = !this.isShowDoneItems
    },
    // 点击复选框 完成
    checkTask (item) {
      this.$store.commit('checkTask', item)
    },
    // 点击复选框 未完成
    restoreTask (item) {
      this.$store.commit('restoreTask', item)
    },
    // 当任务列表是属于 filter 时 点击复选框的处理函数
    filterCheckEvent (item) {
      this.currentList.id === 'completed' ? this.restoreTask(item) : this.checkTask(item)
    },
    // 切换星标
    toggleTaskStar (item){
      this.$store.commit('toggleTaskStar', item)
    },
    // 返回一个首字母大写的字符串
    toCapitalize (string) {
      let str = string.slice(0, 1).toUpperCase() + string.slice(1)
      return str
    },
    selectListTask (item) {
      this.$store.commit('selectListTask', { taskId: item.id, listId: item.belongTo.id, task: item })
    },
    selectFilterTask (item) {
      let {$store, toCapitalize, currentList} = this
      let items = $store.getters[`get${toCapitalize(currentList.id)}Sort`]
      $store.commit('selectFilterTask', { taskId: item.id, listId: item.belongTo.id, task: item, items })
    },
  },
}




</script>

<style scoped>
.task-list{padding-bottom: 72px;}
.heading{margin-top: 20px; margin-bottom: 10px; font-size: 12px; color: #fff; word-wrap: break-word; word-break: break-word; user-select: none;}
.heading a{padding: 3px 10px; text-transform: uppercase; letter-spacing: 1px; font-weight: 400; line-height: 16px; border-radius: 3px; background: rgba(14, 145, 197, 0.75);}

</style>

