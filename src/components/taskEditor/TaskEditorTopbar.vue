<template>
  <div class="topbar">
    <a 
      class="detail-checkbox checkbox" 
      tabindex="0" 
      @click.stop="toggleCheck"
    >
      <span title="标记为已完成">
        <svg class="detail-check" :class="{hidden: taskItem.isCompleted}"  width="20px" height="20px">
          <use xlink:href="#icon-detail-check"></use>
        </svg>
      </span>

      <span title="标记为未完成">
        <svg class="detail-checked" :class="{hidden: !taskItem.isCompleted}"  width="20px" height="20px">
          <use xlink:href="#icon-detail-checked"></use>
        </svg>
      </span>
    </a>

    <a 
      class="detail-star" 
      tabindex="0" 
      @click.stop="toggleTaskStar"
    >
      <span class="star-wrapper" title="标记为星标" :class="{hidden: taskItem.starred}">
        <svg width="100%" height="100%">
          <use xlink:href="#icon-star-detail"></use>
        </svg>
      </span>
      <span class="starred-wrapper" title="移除星标" :class="{hidden: !taskItem.starred}">
        <svg width="100%" height="100%">
          <use xlink:href="#icon-starred-detail"></use>
        </svg>
      </span>
    </a>

    <div class="title-container">
      <div tabindex="0" class="title">
        <span class="title-text">
          <div class="content-fakable" @click="openTextEditor">

            <div class="display-view" :class="{hidden: !displayView}">
              <span>{{ taskItem.title }}</span>
            </div>

            <div 
              class="edit-view" 
              :class="{hidden: displayView}" 
              @focusout="displayView = true"
            >
              <div class="expandingArea active">
                <pre>{{ title }}</pre>
                <textarea 
                  tabindex="0" 
                  v-model.trim="title" 
                  @keypress.enter.prevent="changeTaskTitle"
                >{{ title }}</textarea>
              </div>
            </div>

          </div>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaskEditorTopbar',
  props: ['taskItem'],
  data () {
    return {
      displayView: true, // 显示文字编辑是否已经完成
      title: this.taskItem.title
    }
  },
  computed: {
  },
  methods: {
    toggleCheck () {
      if (this.taskItem.isCompleted) {
        this.$store.commit('restoreTask', this.taskItem)
      } else {
        this.$store.commit('checkTask', this.taskItem) 
      }
    },
    toggleTaskStar () {
      this.$store.commit('toggleTaskStar', this.taskItem )
    },
    changeTaskTitle () {
      this.displayView = true
      if (!this.title) {
        this.title = this.taskItem.title
      } else {
        this.$store.commit('changeTaskTitle', this.title)
      }
    },
    openTextEditor () {
      this.displayView = false
      this.title = this.taskItem.title
    }
  }
}
</script>

<style scoped>
.topbar{min-height: 55px; position: relative;}
.detail-checkbox{position: absolute; left: 18px; top: 18px; z-index: 3;}
.checkbox .detail-check{stroke: rgba(0, 0, 0, 0.35);}
.checkbox .detail-checked{fill: rgba(0, 0, 0, 0.35);}
.detail-star{position: absolute; top: 0; right: 0; z-index: 2;}
.star-wrapper{position: absolute; fill: rgba(0, 0, 0, 0.3); right: 15px; top: -4px; z-index: 1; width: 22px; height: 49px;}
.starred-wrapper{position: absolute; fill: #d74e48; right: 15px; top: -4px; z-index: 1; width: 22px; height: 49px;}
.title-container{position: relative; z-index: 1;}
.title{min-height: 24px; padding: 16px 50px 13px; font-size: 16px; text-align: left; line-height: 24px; font-weight: 600; border-bottom: 1px solid #ebebeb; outline: none; overflow: hidden;}

textarea{outline: none; background: transparent; font-weight: 500; line-height: 20px;}
textarea::-webkit-input-placeholder{font-weight: 500; line-height: 20px;}
.content-fakable .display-view{white-space: pre-wrap; word-wrap: break-word; word-break: break-all; overflow: hidden; margin-top: 1px;}
.content-fakable .display-view span{white-space: pre-wrap; user-select: text;}
.expandingArea{position: relative;}
.expandingArea pre{line-height: 24px; min-height: 24px; font-size: 16px; font-weight: bold; tab-size: 1; margin-top: 1px; padding: 0; border: none;
  visibility: hidden; display: block; white-space: pre-wrap; word-wrap: break-word; word-break: break-all;font-family: 'Avenir', Helvetica, Arial, sans-serif;}
.expandingArea textarea{line-height: 24px; font-size: 16px; 
  overflow: hidden; position: absolute; top: -1px; left: 0; width: 100%; height: 100%;
  font-weight: bold; tab-size: 1; resize: none; color: #262626; margin-top: 1px; padding: 0; 
  border: none; display: block; white-space: pre-wrap; word-wrap: break-word; word-break: break-all; font-family: 'Avenir', Helvetica, Arial, sans-serif;}

</style>
