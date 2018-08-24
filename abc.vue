<template>
  <ol class="tasks" :class="{hidden: this.isShowDoneItems}">
    <!-- 暂不实现拖动的功能 -->
    <li tabindex="0" class="taskItem done" draggable="true" v-for="(item, index) in doneTaskItems" :class="{selected: item.selected}" @click="selectTaskItem($event, index, true)" @dblclick="editTask(item)">

      <div class="taskItem-body">
        <a class="taskItem-checkboxWrapper checkbox checked" tabindex="-1" @click.stop="toggleTaskCheck(item)">
          <span title="标记为已完成">
            <svg class="task-check" width="20px" height="20px">
              <use xlink:href="#icon-task-check"></use>
            </svg>
          </span>  
          <span title="标记为未完成">
            <svg class="task-checked" width="20px" height="20px">
              <use xlink:href="#icon-task-checked"></use>
            </svg>
          </span>
        </a>

        <div class="taskItem-titleWrapper" tabindex="-1">
          <span class="taskItem-titleWrapper-title">{{ item.title }}</span>
          <div class="taskItem-titleMeta-info">{{item.deltaTime}} 由 {{username}}</div>
        </div>

        <span class="conversations-wrapper" :class="{hidden: !item.comments.length}" title="此任务已有评论" tabindex="-1">
          <svg class="conversations-small rtl-flip" width="20px" height="20px">
            <use xlink:href="#icon-conversations-small"></use>
          </svg>
        </span>

        <span class="attachment-wrapper" :class="{hidden: !item.fileList.length}" title="此任务带有附件" tabindex="-1">
          <svg class="attachment" width="20px" height="20px">
            <use xlink:href="#icon-attachment"></use>
          </svg>
        </span>

        <span class="recurrence-wrapper hidden" :class="{hidden: item.hiddenRecurrence}" title="Recurring to-do" tabindex="-1">
          <svg class="recurrence" width="20px" height="20px">
            <use xlink:href="#icon-recurrence"></use>
          </svg>
        </span>

        <a class="taskItem-star" tabindex="-1" @click.stop="toggleTaskStarred(index, true)">
          <span class="star-wrapper" :class="{hidden: item.taskStarred}" title="标记为星标">
            <svg width="18px" height="18px">
              <use xlink:href="#icon-star-taskItem"></use>
            </svg>
          </span>
          <span class="starred-wrapper" :class="{hidden: !item.taskStarred}" title="移除星标">
            <svg width="22px" height="44px">
              <use xlink:href="#icon-starred-taskItem"></use>
            </svg>
          </span>
        </a>

        <div class="taskItem-progress">
          <span class="taskItem-progress-bar" :style="item.subTasks.length && `width: ${item.subTasksCompletedNumber/item.subTasks.length*100}%`"></span>
        </div>

      </div>

    </li>
  </ol>
</template>

<script>
</script>

<style>
</style>
