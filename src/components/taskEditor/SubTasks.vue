<template>
  <div 
    tabindex="0"
    class="section subtasks" 
    :class="{hasSubtasks: subTasks.length}" 
  >
    <ul v-if="subTasks.length">
      <!-- done -->
      <!-- 没有实现拖动功能 -->
        <!--draggable="true" -->
      <li 
        tabindex="0" 
        class="section-item subtask" 
        v-for="(item, index) in subTasks"
        :class="{done: item.isCompleted}" 
      >
        <div class="section-icon">
          <!-- checked -->
          <a 
            class="subtask-checkbox check-box" 
            :class="{checked: item.isCompleted}" 
            @click="toggleSubTaskBox(item, index)"
          >
            <svg class="task-check" width="20px" height="20px">
              <use xlink:href="#icon-task-check"></use>
            </svg>
            <svg class="task-checked" width="20px" height="20px">
              <use xlink:href="#icon-task-checked"></use>
            </svg>
          </a>
        </div>

        <div class="section-content top" :ref="`subtask-${index}`" >
          <div 
            tabindex=0
            class="section-title selectable" 
            @focusout="changeSubTaskTitle(item, index)"
            >
            <!-- 将其他的子任务displayView 改为 true -->
            <div class="content-fakable">
              <div 
                class="display-view" 
                :class="{hidden: !displayViewArr[index]}" 
                @click="editSubTask(item, index)"
              >{{ item.title }}</div>

              <div class="edit-view" :class="{hidden: displayViewArr[index]}">
                <div class="expandingArea active">
                  <pre>{{ newTitle }}</pre>
                  <textarea 
                    v-model.trim="newTitle" 
                    @keypress.enter.prevent="changeSubTaskTitle(item, index)" 
                    @focusin="editSubTask(item, index)"
                  ></textarea>
                </div>
              </div>

            </div>
          </div>
        </div>

        <a class="section-delete" @click="deleteSubTask(item, index)">
          <svg class="delete" width="20px" height="20px">
            <use xlink:href="#icon-delete"></use>
          </svg>
        </a>
      </li>
    </ul>

    <div class="section-item subtask-add">
      <div class="section-icon">
        <svg class="plus-small" width="20px" height="20px">
          <use xlink:href="#icon-plus-small"></use>
        </svg>
      </div>

      <div class="section-content top">
        <!-- <div class="section-title hidden">添加子任务</div> -->
        <div class="section-edit">
          <div class="expandingArea active">
            <pre>{{newSubTask.title}}</pre>
            <textarea 
              tabindex="0" 
              placeholder="添加子任务" 
              v-model="newSubTask.title" 
              @keypress.enter.prevent="addSubTask" 
              @focusout="addSubTask"
            ></textarea>
          </div>
        </div>
      </div>

    </div>
  </div>

</template>

<script>
export default {
  name: 'SubTasks',
  data () {
    return {
      newSubTask: this.createSubTaskTemplate(),
      displayViewArr: [],
      newTitle: ''
    }
  },
  computed: {
    subTasks () {
      let subTasks = this.$store.getters.getEditorSubTasks
      let length = subTasks.length
      if (length !== this.displayViewArr.length) {
        this.displayViewArr = []
        for (var i = 0; i < length; i++) {
          this.displayViewArr[i] = true
        }
      }
      return subTasks
    },
  },
  methods: {
    toggleSubTaskBox(item, index){
      this.$store.dispatch('updateSubTask', {
        index,
        subTask: item,
        attributes:{isCompleted: !item.isCompleted},
      })
    },
    // 编辑子任务
    editSubTask(item, index){
      // this.displayViewArr[index] = false
      // this.displayViewArr = [].concat(this.displayViewArr.slice(0, index), this.displayViewArr.slice(index))
      this.newTitle = item.title
      // 触发 setter 更新 
      this.$set(this.displayViewArr, index, false)
    },
    // 删除子任务
    deleteSubTask(item, index){
      this.$store.dispatch('deleteSubTask', {subTask: item, index})
    },
    createSubTaskTemplate(){
      return {title:'', isCompleted: false}
    },
    // 添加子任务
    addSubTask(){
      if(this.newSubTask.title){
        this.$store.dispatch('createSubTask', this.newSubTask).then(val => { })
        this.newSubTask = this.createSubTaskTemplate()
      }
    },
    changeSubTaskTitle (item, index) {
      if (!this.newTitle || this.newTitle === item.title) {
        this.$set(this.displayViewArr, index, true)
        return 
      } else {
        this.$store.dispatch('updateSubTask', {
          index, 
          subTask: item, 
          attributes:{title: this.newTitle},
        })
        this.$set(this.displayViewArr, index, true)
      }
    }
  }
}
</script>

<style scoped>
textarea{outline: none; background: transparent; font-weight: 500; line-height: 20px;}
textarea::-webkit-input-placeholder{font-weight: 500; line-height: 20px;}
.content-fakable .display-view{white-space: pre-wrap; word-wrap: break-word; word-break: break-all; overflow: hidden; margin-top: 1px;}
.content-fakable .display-view span{white-space: pre-wrap; user-select: text;}
.expandingArea{position: relative;}
.expandingArea pre{line-height: 24px; min-height: 20px; font-size: 16px; font-weight: bold; tab-size: 1; margin-top: 1px; padding: 0; border: none;
  visibility: hidden; display: block; white-space: pre-wrap; word-wrap: break-word; word-break: break-all;font-family: 'Avenir', Helvetica, Arial, sans-serif;}
.expandingArea textarea{line-height: 24px; font-size: 16px; 
  overflow: hidden; position: absolute; top: -1px; left: 0; width: 100%; height: 100%;
  font-weight: bold; tab-size: 1; resize: none; color: #262626; margin-top: 1px; padding: 0; 
  border: none; display: block; white-space: pre-wrap; word-wrap: break-word; word-break: break-all; font-family: 'Avenir', Helvetica, Arial, sans-serif;}

.section{outline: none; position: relative; padding: 8px 0; text-align: left;}
.section-item{position: relative; outline: none; padding-left: 10px; padding-right: 10px; display: flex; align-items: center;}
.section:before{content: ''; position: absolute; bottom: 0; left: 50px; right: 0; border-bottom: 1px solid #ebebebeb;}
.section-item .section-icon, .section-item .section-attachments{align-self: flex-start; flex-shrink: 0; height: 32px; min-width: 32px; fill:#a3a3a2;}
.section-item .section-icon svg{margin: 6px;}
.section-item .section-content{flex: auto; margin: 0 8px; overflow: hidden;}
.section-item .section-title{font-size: 16px; line-height: 20px; color: #9fa2a6; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.section-item .section-edit .assign{font-size: 16px;}
.section-item .section-delete{visibility: hidden; align-self: flex-start; flex-shrink: 0; height: 32px; min-width: 32px; fill: #a3a3a2; margin-left: auto;}
.section-item:hover .section-delete{visibility: visible;}
.section-item .section-delete svg{margin: 6px; fill: #737372;}
.section-item.date .section-title{color: #328ad6;}
.section-item.date.overdue .section-title{color: #b3312d;}

.subtasks a{color: #328ad6;}
.subtasks .section-icon .task-check{stroke: #67ae2b;}
.subtasks .check-box .task-checked{fill: rgba(0, 0, 0, 0.35); display: none;}
.subtasks .check-box.checked .task-check{display: none;}
.subtasks .check-box.checked .task-checked{display: block;}
.section-item .section-content.top{align-self: flex-start; padding: 6px 0;}
.subtask .section-title{color: #262626;}
.subtask.done .display-view{text-decoration: line-through; color: #aaa;}
.subtasks pre{line-height: 20px; font-weight: normal;}
.subtasks textarea{line-height: 20px; font-weight: normal;}
.subtask-add textarea{font-size: 14px;}
.subtasks.hasSubtasks .plus-small{fill: #67ae2b;}
</style>
