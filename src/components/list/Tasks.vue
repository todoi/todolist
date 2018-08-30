<template>
  <ol class="tasks">
    <!--没有实现拖动功能-->
    <!--draggable="true"--> 
    <li 
      tabindex="0" 
      class="taskItem" 
      v-for="(item, index) in items" 
      :class="{selected: item.selected, done: isDoneItem}" 
      @click="$emit('selectTaskItem', item)" 
      @dblclick="$emit('openTaskEditor')"
    >
      <div class="taskItem-body">

        <a 
          class="taskItem-checkboxWrapper checkbox" 
          tabindex="-1" 
          @click.stop="$emit('triggerCheckEvent',  item)"
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
          >{{ getDeltaTime(item.finishAt) }} 由 {{ username }}</div>
        </div>

        <span 
          tabindex="-1"
          title="此任务已有评论" 
          class="conversations-wrapper" 
          :class="{hidden: !$store.getters.getCurrentComments(item.id).length}" 
        >
          <svg class="conversations-small rtl-flip" width="20px" height="20px">
            <use xlink:href="#icon-conversations-small"></use>
          </svg>
        </span>

        <span 
          tabindex="-1"
          title="此任务带有附件" 
          class="attachment-wrapper" 
          :class="{hidden: !$store.getters.getCurrentFileMetas(item.id).length}" 
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
          {{ formatDate(item.deadline) }}
        </span>

        <a 
          class="taskItem-star" 
          tabindex="-1" 
          @click.stop="$emit('toggleTaskStar', item)"
        >
          <span 
            title="标记为星标"
            class="star-wrapper" 
            :class="{hidden: item.starred}" 
          >
            <svg width="18px" height="18px">
              <use xlink:href="#icon-star-taskItem"></use>
            </svg>
          </span>
          <span 
            title="移除星标"
            class="starred-wrapper" 
            :class="{hidden: !item.starred}" 
          >
            <svg width="22px" height="44px">
              <use xlink:href="#icon-starred-taskItem"></use>
            </svg>
          </span>
        </a>

        <div class="taskItem-progress">
          <span 
            class="taskItem-progress-bar"
            :style="$store.getters.getCurrentSubTasks(item.id).length && `width: ${$store.getters.getCompletedSubTasks(item.id).length/$store.getters.getCurrentSubTasks(item.id).length*100}%`"
            >
          </span>
        </div>
      </div>

    </li>
  </ol>
</template>

<script>
import utils from '../../lib/utils'
export default {
  name: 'Tasks',
  props: [ 'isDoneItem', 'items' ],
  computed: {
    username () {
      return this.$store.state.user.username
    }
  },
  methods: {
    // 传入一个时间戳 返回一个 '2018-05-20' 的时间格式
    formatDate (timeStamp){
      return new Date(timeStamp)
        .toLocaleString()
        .split(' ')[0]
        .replace(/(\d+)\/(\d+)\/(\d+)/g, (str,$1, $2, $3) => {
          return $1 + '-' + (Number($2) < 10 ? '0'+$2 : $2) + '-' + (Number($3) < 10 ? '0'+$3 : $3)
        }) 
    },
    // 更新距离时间
    getDeltaTime (finishAt) {
      return utils.showDuration(finishAt) + '之前'
    },
  }
}
</script>

<style scoped>

.taskItem{height: 47px;}
.taskItem-body{height: 46px; display: flex; position: relative; align-items: center; padding: 0 4px; overflow: hidden; border-radius: 3px; background: #fff;}
.taskItem.selected .taskItem-body{background: #e1f2fe;}
.taskItem-checkboxWrapper{padding: 0 8px; height: 20px;}
.checkbox .task-check{stroke: rgba(0, 0, 0, 0.35);}
.checkbox .task-checked{fill: rgba(0, 0, 0, 0.35);}
.taskItem-titleWrapper{flex: 1; color: #262626; font-size: 16px; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-top: -3px;}
.conversations-wrapper{height: 20px; fill: rgba(0, 0, 0, 0.3); padding: 0 2px;}
.attachment-wrapper{width: 22px; height: 20px; fill: rgba(0, 0, 0, 0.3); padding: 0 2px;}
.recurrence-wrapper{height: 14px; fill: #328ad6; padding: 0 2px;}
.recurrence-wrapper svg{width: 14px; height: 14px;}
.star-wrapper{padding: 0 6px; fill: rgba(0, 0, 0, 0.3);}
.starred-wrapper{width: 30px; padding: 0 4px; fill: #d74e48;}

.taskItem-deadline, .taskTtem-assign{padding-left: 4px; padding-right: 4px;}
.taskItem-deadline{font-size:12px; color: #328ad6; max-width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;}
.taskItem-deadline.overdue{color: #b3312d;}


.taskItem.done{opacity: 0.6;}
.checkbox.checked .task-check{display: none;}
.checkbox.checked .task-checked{display: block;}
.taskItem.done .taskItem-titleWrapper-title{text-decoration: line-through;}
.taskItem.done .taskItem-titleMeta-info{font-size: 10px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;}

.taskItem-progress{outline: 1px solid red; position: absolute; top: 0; left: 0; right: 0; height: 100%; opacity: 1; transition: all 225ms ease; pointer-events: none; filter: none;}
.taskItem-progress-bar{background: rgba(14,145,197,0.1); display: block; height: 100%; width: 0%; transition:all 225ms ease; border-right-width: 1px; border-right-style: solid; border-right-color: rgba(14,145,197,0.2);}
</style>
