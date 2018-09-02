<template>
  <div class="list-toolbar">
    <h1 class="title">{{ currentList.title }}</h1>
    <div class="action-bar expanded" @mouseleave="hideActionBar">

      <div 
        class="action-bar-top" 
        :style="`height: ${actionBarHeight}`"
      >
        <!-- 排序列表 -->
        <ul 
          class="action-bar-top-sort" 
          :class="{active: actionBarActive === 'sort'}"
        >
          <li 
            tabindex="0" 
            v-for="item in actionBarSort" 
            @click="sortFn(item.fnName)"
          >
            <a>
              <svg :class="item.svgClassName" width="20px" height="20px">
                <use :xlink:href="`#icon-${item.svgClassName}`"></use>
              </svg>
              <span>{{ item.text }}</span>
            </a>
          </li>
        </ul>

        <!-- 更多列表 -->
        <ul 
          class="action-bar-top-more" 
          :class="{active: actionBarActive === 'more'}"
        >
          <li 
            tabindex="0" 
            v-for="item in actionBarMore"
            :class="{disabled: (item.fnName === 'paste' && (!duplicateTask.id || isInFilter)) || (item.fnName !== 'paste' && !currentTask.id)}"
            @click="moreFn(item.fnName)"
          >
            <a>
              <svg :class="item.svgClassName" width="20px" height="20px">
                <use :xlink:href="`#icon-${item.svgClassName}`"></use>
              </svg>
              <span>{{ item.text }}</span>
            </a>
          </li>
        </ul>
      </div>

      <div class="action-bar-bottom">
        <a class="tab share first-tab" @click="showShareActions()">
          <svg class="share rtl-flip" width="20px" height="20px">
            <use xlink:href="#icon-share"></use>
          </svg>
          <span class="tab-text">共享</span>
        </a>

        <a 
          class="tab sort-az" 
          :class="{active: !actionBarActive || actionBarActive === 'sort'}"
          @click="showActionBar('sort')"
        >
          <svg class="sort-az" width="20px" height="20px">
            <use xlink:href="#icon-sort-az"></use>
          </svg>
          <span class="tab-text">排序</span>
        </a>

        <a 
          class="tab last-tab" 
          :class="{active: !actionBarActive || actionBarActive === 'more'}"
          @click="showActionBar('more')"
        >
          <svg class="folder-option" width="20px" height="20px">
            <use xlink:href="#icon-folder-option"></use>
          </svg>
          <span class="tab-text">更多</span>
        </a>
      </div>

    </div>
  </div>
</template>

<script>
import obj from '../../lib/actionBarList'

export default {
  name: 'ListToolbar',
  data () {
    return {
      actionBarHeight: '0px',
      actionBarActive: '',
      actionBarSort: obj.actionBarSort,
      actionBarMore: obj.actionBarMore,
      filterListIds: ['all', 'starred', 'today', 'week', 'completed']
    }
  },
  computed: {
    currentList () {
      return this.$store.state.currentList
    },

    currentTask () {
      return this.$store.state.currentTask
    },

    duplicateTask () {
      return this.$store.state.duplicateTask
    },

    isInFilter () {
      let result = this.filterListIds.indexOf(this.currentList.id)
      return result >= 0
    }

    // 用于更新排序下拉框中 到期日排序的 选项是否可以用
    //deadlineSortClass(){
    //  let result = 0
    //  for(let item of this.taskItems){
    //    // 如果有一个task 有设置deadline 那么就可以使用 到期日 排序
    //    if(item.deadline){
    //      result = 1
    //      break
    //    }
    //  }
    //  return result ? '' : 'disabled'
    //},
  },
  methods: {
    showShareActions () {
      this.actionBarHeight = `0px`
    },

    // 显示 更多 下拉框
    showActionBar (type) {
      // 如果下拉框已经显示，再次点击就隐藏下拉框
      if (this.actionBarActive === type) {
        this.hideActionBar()
        return
      }
      this.actionBarActive = type 
      this.actionBarHeight = `${this['actionBar'+type.slice(0,1).toUpperCase()+type.slice(1)].length * 38}px`
    },

    // 隐藏 排序 更多 下拉框
    hideActionBar () {
      this.actionBarHeight = '0px'
      this.actionBarActive = ''
    },

    // 输入根据什么东西排序，然后调用这个方法
    sortFn (fnName){
      this[fnName].call(this)
      this.hideActionBar()
    },
    moreFn (fnName) {
      this[fnName].call(this)
      this.hideActionBar()
    },

    // 根据创建时间排序
    sortByCreation(){
      this.$store.commit('sortTaskByCreation')
    },

    // 根据字母排序
    sortByLetter(){
      this.$store.commit('sortTaskByLetter')
    },

    // 根据星星排序
    sortByPriority(){
      this.$store.commit('sortTaskByPriority')
    },

    // 根据到期日排序
    sortByDeadline(){
      this.$store.commit('sortTaskByDeadline')
    },

    // 复制所选任务
    copyTask () {
      this.$store.commit('setDuplication')
    },

    // 粘贴
    paste () {
      let {cloneObject, currentList, duplicateTask, $store, createTaskChildren} = this
      let subTasks = $store.state.allSubTask[duplicateTask.id]
      let comments = $store.state.allComment[duplicateTask.id]
      let fileMetas = $store.state.allFileMeta[duplicateTask.id]
      let newTask = cloneObject(duplicateTask, ['id', 'createdAt', 'selected', 'belongTo'])
      $store.dispatch('createTask', {listId: currentList.id, newTask}).then(val => {
        createTaskChildren(subTasks, 'subTask', 'createSubTask', val.id)
        createTaskChildren(comments, 'comment', 'createComment', val.id)
        createTaskChildren(fileMetas, 'fileMeta', 'createFileMeta', val.id)
      }).catch(error => console.log(error))
    },

    // 克隆出一个不同的 对象 浅拷贝
    // origin 要克隆的原对象
    // discardedAttributes 删除克隆对象中不需要的属性
    cloneObject (origin, discardedAttributes) {
      let newTask = Object.assign({}, origin)
      discardedAttributes.forEach(attribute => delete newTask[attribute] )
      return newTask
    },

    // 粘贴 创建新的 subtasks, comments, filemetas
    // arr 信息数组
    // newItemName dispatch 的新对象的名称
    // dispatchFn dispatch 函数名称
    createTaskChildren (arr, newItemName, dispatchFn, taskId) {
      let {$store, cloneObject} = this
      arr.forEach(item => {
        let args = {}
        args.taskId = taskId
        args[newItemName] = cloneObject(item, ['belongTo', 'createdAt', 'id']) 
        $store.dispatch(dispatchFn, args)
      })
    },

    // 删除任务
    deleteTask(){
      this.$emit('closeTaskEditor')
      console.log(this.currentTask)
      this.$store.dispatch('deleteTask', this.currentTask)
    },

  }
}
</script>

<style scoped>
.list-toolbar{position: relative; height: 45px; min-height: 45px; display: flex; align-items: center; background: #0e91c5;}
.list-toolbar h1{flex:1; font-size: 20px; color: #fff; padding: 10px 14px; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; text-align: left;}
.action-bar{position: relative; opacity: 1; filter: none; transition: opacity 200ms ease-in;}

.action-bar-bottom{text-align: center; font-size: 0; height: 45px;}
.action-bar-bottom a{display: inline-block; min-width: 52px; padding: 6px;}
.action-bar-bottom a svg{fill: #fff;}
.action-bar-bottom a .tab-text{font-size: 12px; color: #fff; display: block; text-align: center;}
.action-bar.expanded .action-bar-bottom a{opacity: 0.4;}
.action-bar.expanded .action-bar-bottom a.active{opacity: 1; filter: none;}

.action-bar-top{position: absolute; width: 250px; right: 0; top: 45px; transition: height 120ms linear; z-index: 1; background: #0e91c5; overflow: hidden; }
.action-bar-top ul{position: absolute; z-index: 0; top: 0; left:0; right: 0;}
.action-bar-top ul.active li.disabled a{display: block; padding: 7px; padding-left: 34px; color: #fff; text-align: left; font-size: 14px;}
.action-bar.expanded .action-bar-top ul.active{z-index: 1;}
.action-bar-top li{position: relative; padding: 2px; padding-top: 1px; opacity: 0; transition: opacity 200ms linear;}
.action-bar.expanded .action-bar-top ul.active li{opacity: 1; filter: none;}
.action-bar.expanded .action-bar-top ul.active li.disabled{opacity: 0.4;}
.action-bar-top li a{display: block; padding: 7px; padding-left: 34px; color: #fff; text-align: left; font-size: 14px;}
.action-bar-top li:hover a { color: #fff; background: rgba(255, 255, 255, 0.1); }
.action-bar-top li a.disabled{opacity: 0.4;}
.action-bar-top li a svg{position: absolute; fill: #fff; top: 7px; left: 8px;}
.action-bar-top li a .status-label{font-size: 85%; text-transform: uppercase; padding: 1px; display: none; color: #b2b2b2;}
.action-bar-top li a .status-label.active{display: block;}
</style>
