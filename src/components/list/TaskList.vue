<template>
  <div class="task-list starred">
    <h2 class="heading normal">
      <a class="group-header">inbox</a>
    </h2>
    <Tasks 
      :items="taskItems"
      @openTaskEditor="$emit('openTaskEditor')"
      @selectTaskItem="selectTaskItem"
      @triggerCheckEvent="checkTask"
      @toggleTaskStar="toggleTaskStar"
      />

    <h2 tabindex="0" class="heading normal" :class="{hidden: !doneTaskItems.length}">
      <a class="group-header" @click.stop="toggleDoneTaskItems">显示已完成任务</a>
    </h2>
    <Tasks
      :isDoneItem="true"
      v-if="this.isShowDoneItems" 
      :items="doneTaskItems"
      @openTaskEditor="$emit('openTaskEditor')"
      @selectTaskItem="selectTaskItem"
      @triggerCheckEvent="restoreTask"
      @toggleTaskStar="toggleTaskStar"
      />

  </div>
</template>

<script>
import Tasks from './Tasks'
import utils from '../../lib/utils'

export default {
  name: 'TaskList',
  components: { Tasks },
  data(){
    return {
      isShowDoneItems: true,  // 显示已经完成任务列表
    }
  },
  computed:{
    taskItems () {
      return this.$store.state.list.taskItems
    },
    doneTaskItems () {
      return this.$store.state.list.doneTaskItems
    }
  },
  methods: {
    // 隐藏或者显示已经完成的任务列表
    toggleDoneTaskItems(){
      this.isShowDoneItems = !this.isShowDoneItems
    },
    // 点击复选框 完成
    checkTask ({ index, item }) {
      this.$store.commit('checkTask', { index })
    },
    // 点击复选框 未完成
    restoreTask ({ index, item }) {
      this.$store.commit('restoreTask', { index })
    },
    // 切换星标
    toggleTaskStar ({index, isDoneItem}){
      this.$store.commit('toggleTaskStar', { index, isDoneItem })
    },
    selectTaskItem ({index, isDoneItem}){
      this.$store.commit('selectTaskItem', { index, isDoneItem })
    },
  },
}




</script>

<style scoped>
.task-list{padding-bottom: 72px;}
.heading{margin-top: 20px; margin-bottom: 10px; font-size: 12px; color: #fff; word-wrap: break-word; word-break: break-word; user-select: none;}
.heading a{padding: 3px 10px; text-transform: uppercase; letter-spacing: 1px; font-weight: 400; line-height: 16px; border-radius: 3px; background: rgba(14, 145, 197, 0.75);}

</style>

