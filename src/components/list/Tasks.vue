<template>
  <ol class="tasks">
    <li 
      tabindex="0" 
      draggable="true"
      class="taskItem" 
      v-for="(item, index) in taskItems" 
      :class="{selected: item.selected, done: isDoneItem}" 
      @click="selectTaskItem($event, index, isDoneItem)" 
      @dblclick="editTask(item)"
    >
      <div class="taskItem-body">

        <a 
          class="taskItem-checkboxWrapper checkbox" 
          tabindex="-1" 
          @click.stop="toggleTaskCheck(item)"
        >
          <span title="标记为已完成">
            <svg class="task-check" :class="{hidden: item.isCompleted}" width="20px" height="20px">
              <use xlink:href="#icon-task-check"></use>
            </svg>
          </span>  
          <span title="标记为未完成">
            <svg class="task-checked" :class="{hidden: !item.isCompleted}" width="20px" height="20px">
              <use xlink:href="#icon-task-checked"></use>
            </svg>
          </span>
        </a>

        <div class="taskItem-titleWrapper" tabindex="-1">
          <span class="taskItem-titleWrapper-title">{{ item.title }}</span>
          <div 
            class="taskItem-titleMeta-info" 
            :class="{ hidden: !isDoneItem }"
          >{{item.deltaTime}} 由 {{username}}</div>
        </div>

        <span 
          title="此任务已有评论" tabindex="-1"
          class="conversations-wrapper" 
          :class="{hidden: !item.comments.length}" 
        >
          <svg class="conversations-small rtl-flip" width="20px" height="20px">
            <use xlink:href="#icon-conversations-small"></use>
          </svg>
        </span>

        <span 
          title="此任务带有附件" tabindex="-1"
          class="attachment-wrapper" 
          :class="{hidden: !item.fileList.length}" 
        >
          <svg class="attachment" width="20px" height="20px">
            <use xlink:href="#icon-attachment"></use>
          </svg>
        </span>

        <!-- 过期为红色，没过期为蓝色，没有倒计时就隐藏元素 -->
        <!-- 时间格式为2018/5/3 -->
        <span 
          class="taskItem-deadline" 
          tabindex="-1" 
          aria-hidden="true" 
          :class="item.deadline ? (new Date().getTime() > item.deadline && 'overdue')  : 'hidden' "
        >
          {{formatDate(item.deadline)}}
        </span>

        <!-- 暂时没有实现 -->
        <span class="recurrence-wrapper" title="Recurring to-do" tabindex="-1">
          <svg class="recurrence" width="20px" height="20px">
            <use xlink:href="#icon-recurrence"></use>
          </svg>
        </span>

        <a 
          class="taskItem-star" 
          tabindex="-1" 
          @click.stop="toggleTaskStarred(index)"
        >
          <span 
            title="标记为星标"
            class="star-wrapper" 
            :class="{hidden: item.taskStarred}" 
          >
            <svg width="18px" height="18px">
              <use xlink:href="#icon-star-taskItem"></use>
            </svg>
          </span>
          <span 
            title="移除星标"
            class="starred-wrapper" 
            :class="{hidden: !item.taskStarred}" 
          >
            <svg width="22px" height="44px">
              <use xlink:href="#icon-starred-taskItem"></use>
            </svg>
          </span>
        </a>

        <div class="taskItem-progress">
          <span 
            class="taskItem-progress-bar" 
            :style="item.subTasks.length && `width: ${item.subTasksCompletedNumber/item.subTasks.length*100}%`"></span>
        </div>
      </div>

    </li>
  </ol>
</template>

<script>
export default {
  name: 'Tasks',
  props: [ 'isDoneItem', ],
  data () {
  },
}
</script>

<style scoped>
</style>
