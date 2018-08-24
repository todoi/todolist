<template>
  <div class="task-list starred">
    <h2 class="heading normal">
      <a class="group-header">inbox</a>
    </h2>
    <Tasks 
      :items="taskItems"
      @selectTaskItem
      />

    <h2 tabindex="0" class="heading normal" :class="{hidden: !doneTaskItems.length}">
      <a class="group-header" @click.stop="toggleDoneTaskItems">显示已完成任务</a>
    </h2>
    <Tasks
      isDoneItem="true"
      :class="{hidden: this.isShowDoneItems}" 
      :items="doneTaskItems"
      @selectTaskItem
      />

  </div>
</template>

<script>
import Tasks from './Tasks'

// var d
export default {
  name: 'TaskList',
  props: ['username'],
  components: { Tasks },
  data(){
    return {
      isShowDoneItems: true,  // 显示已经完成任务列表
    }
  },
  computed:{
    deadlineSortClass(){
    // 用于更新排序下拉框中 到期日排序的 选项是否可以用
      let result = 0
      for(let item of this.taskItems){
        if(item.deadline){
          // 如果有一个task 有设置deadline 那么就可以使用 到期日 排序
          result = 1
          break
        }
      }
      return result ? '' : 'disabled'
    },
    taskItems () {
      return this.$store.state.list.taskItems
    },
    doneTaskItems () {
      return this.$store.state.list.doneTaskItems
    }
  },
  methods: {
    toggleDoneTaskItems(){
      // 隐藏或者显示已经完成的任务列表
      if(this.isShowDoneItems){
        for(let i=0; i<this.doneTaskItems.length; i++){
          let item = this.doneTaskItems[i]
          // 更新距离时间
          item.deltaTime = this.showTime(item)
        }
      }
      this.isShowDoneItems = !this.isShowDoneItems
    },
    toggleTaskCheck ({ index, item }){
    // 点击复选框 完成 或 未完成
      if(item.isCompleted === true){
      // 用户在已经完成 item 的checkbox 上点击
        this.doneTaskItems = [].concat(this.doneTaskItems.slice(0, index), this.doneTaskItems.slice(index + 1))
        // this.doneTaskItems.splice(this.doneTaskItems.indexOf(item), 1)
        // 重置为 未完成
        item.isCompleted = false
        // 完成时间重置为 null
        item.doneDate = null
        this.taskItems.push(item)
      }else if(item.isCompleted === false){
      // 用户在未完成 item 的checkbox 上点击
        this.taskItems = [].concat(this.taskItems.slice(0, index), this.taskItems.slice(index + 1))
        // this.taskItems.splice(this.taskItems.indexOf(item), 1)
        // 完成时间为当前时间
        item.doneDate = new Date().getTime()
        // 更新距离时间
        item.deltaTime = this.showTime(item)
        // 重置为 已经完成
        item.isCompleted = true
        this.doneTaskItems.push(item)
      }else{
        throw Error('toggleTaskCheck 函数报错')
      }
    },
    toggleTaskStarred ({index, isDoneItem}){
      if (isDoneItem){
        this.doneTaskItems[index].taskStarred = !this.doneTaskItems[index].taskStarred
      }else{
        this.taskItems[index].taskStarred = !this.taskItems[index].taskStarred
      }
    },
    selectTaskItem ({index, isDoneItem}){
      this.taskItems.forEach(element => element.selected = false )
      this.doneTaskItems.forEach(element => element.selected = false )
      isDoneItem ? this.doneTaskItems[index].selected = true : this.taskItems[index].selected = true
    },
    showTime(item){
      // 输入一个 完成的任务对象
      // 输出新的时间 和 旧的时间之间的间隔
      let newDate = new Date().getTime()
      let delta = Math.ceil((newDate - item.doneDate)/1000)
      let days, hours, minutes, result //, seconds
      days = Math.floor(delta / (60*60*24))
      hours = Math.floor(delta / (60*60)) % 24
      minutes = Math.floor(delta / 60) % 60
      // seconds = delta % 60
      result = '几秒钟'
      if(minutes) result = `${minutes}分钟`
      if(hours) result = `${hours}小时`
      if(days) result = `${days}天`
      return `${result}之前`
    },
    editTask({ index, item }){
    // 打开任务编辑的区域
      this.showDetail = true
      this.editItem = item
    },
  },
}




</script>

<style scoped>
.task-list{padding-bottom: 72px;}
.heading{margin-top: 20px; margin-bottom: 10px; font-size: 12px; color: #fff; word-wrap: break-word; word-break: break-word; user-select: none;}
.heading a{padding: 3px 10px; text-transform: uppercase; letter-spacing: 1px; font-weight: 400; line-height: 16px; border-radius: 3px; background: rgba(14, 145, 197, 0.75);}

</style>

