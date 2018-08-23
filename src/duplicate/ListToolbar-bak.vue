<template>
  <div class="list-toolbar">
    <h1 class="title">{{ currentList.title }}</h1>
    <div class="action-bar expanded" @mouseleave="hideActionBar">

      <div class="action-bar-top" :style="`height: ${actionBarTopHeight}`">
        <ul class="action-bar-top-sort" :class="actionBarTopActive === 'sort' && 'active'">
          <!-- 排序列表 -->
          <!--deadlineSortClass-->
          <li tabindex="0" v-for="item in actionBarTopSort" :class="item.sortFn === 'sortByDeadline' ? 'disabled' : item.liClassName" @click="sortFn(item.sortFn)">
            <a :class="item.aClassName">

              <svg :class="item.svgClassName" width="20px" height="20px">
                <use :xlink:href="`#icon-${item.svgClassName}`"></use>
              </svg>

              <span>{{ item.text }}</span>
            </a>
          </li>
        </ul>

        <ul class="action-bar-top-more" :class="actionBarTopActive === 'more' && 'active'">
          <!-- 更多列表 -->
          <li tabindex="0" v-for="item in actionBarTopMore" :class="item.liClassName">
            <a :class="item.aClassName">

              <svg :class="item.svgClassName" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <use :xlink:href="`#icon-${item.svgClassName}`"></use>
              </svg>

              <span v-if="typeof item.text === 'string'">{{ item.text }}</span>
              <template v-if="typeof item.text === 'object'">
                <span v-for="text in item.text" :class="[text.className.commonClassName, text.className.turnOn]">{{ text.content }}</span>
              </template>
            </a>
          </li>
          <li tabindex="0">
            <a class="action-bar-top-paste-item">
              <svg width="20px" height="20px">
                <use xlink:href="#icon-paste"></use>
              </svg>
              <span>粘贴 <i class="token_0">0</i> 个任务</span>
            </a>
          </li>
        </ul>
      </div>

      <div class="action-bar-bottom">
        <a class="tab share first-tab" @click="showActionBarTop('share')" :class="{active: actionBarBottomActive.share}">
          <svg class="share rtl-flip" width="20px" height="20px">
            <use xlink:href="#icon-share"></use>
          </svg>
          <span class="tab-text">共享</span>
        </a>

        <a class="tab sort-az" @click="showActionBarTop('sort')" :class="{active: actionBarBottomActive.sort,}">
          <svg class="sort-az" width="20px" height="20px">
            <use xlink:href="#icon-sort-az"></use>
          </svg>
          <span class="tab-text">排序</span>
        </a>

        <!-- 更多这个功能被砍掉了 -->
        <a class="tab last-tab" @click="showActionBarTop('more')" :class="{active: actionBarBottomActive.more}">
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
export default {
  name: 'ListToolbar',
  data () {
    return {
      actionBarTopHeight: '0px',
      actionBarTopActive: '',
      actionBarBottomActive: {share: false, sort: true, more: true,},
      actionBarTopSort:[
  // 排序的内容框
  {
    liClassName: 'first-menu-item',
    aClassName: 'action-bar-top-sort-az',
    svgClassName: 'sort-az',
    text: '按字母顺序排序',
    sortFn: 'sortByLetter',
  },
  {
    // liClassName: console.log(this.taskItems) || 'disabled',
    // liClassName: this.deadlineSortClass ? this.deadlineSortClass() : 'disabled'  ,
    aClassName: 'action-bar-top-sort-date',
    svgClassName: 'sort-date',
    text: '按到期日排序',
    sortFn: 'sortByDeadline',
  },
  {
    liClassName: '',
    aClassName: 'action-bar-top-sort-creation',
    svgClassName: 'sort-creation',
    text: '按创建日期排序',
    sortFn: 'sortByCreation',
  },
  {
    // 这个功能不实现
    liClassName: 'disabled',
    aClassName: 'action-bar-top-sort-assign',
    svgClassName: 'assigned',
    text: '按受托人排序',
    sortFn: 'sortByAssign',
  },
  {
    liClassName: 'last-menu-item',
    aClassName: 'action-bar-top-sort-priority',
    svgClassName: 'starred',
    text: '按优先级排序',
    sortFn: 'sortByPriority',
  },
      ],
      actionBarTopMore: [
// 更多的功能被我砍掉了
  {
    liClassName: 'first-menu-item',
    aClassName: 'action-bar-top-duplicate-list',
    svgClassName: 'duplicate-list',
    text: '复制清单',
  },
  {
    liClassName: '',
    aClassName: 'action-bar-top-copy-item',
    svgClassName: 'copy-item',
    text: '复制所选任务',
  },
  {
    liClassName: '',
    aClassName: 'action-bar-top-paste-item',
    svgClassName: 'paste',
    text: '粘贴',
  },
  {
    liClassName: '',
    aClassName: 'action-bar-top-email-all',
    svgClassName: 'email',
    text: '以电子邮件发送清单',
  },
  {
    liClassName: 'disabled',
    aClassName: 'action-bar-top-email-selected',
    svgClassName: 'email',
    text: '用电子邮件发送所选任务',
  },
  {
    liClassName: '',
    aClassName: 'action-bar-top-print-all',
    svgClassName: 'print',
    text: '打印清单',
  },
  {
    liClassName: 'disabled',
    aClassName: 'action-bar-top-print-selected',
    svgClassName: 'print',
    text: '打印所选任务',
  },
  {
    liClassName: 'disabled',
    aClassName: 'action-bar-top-do-not-disturb',
    svgClassName: 'do-no-disturb',
    text: [{className: { commonClassName:'un-mute'}, content: '勿扰',},{className: {commonClassName: 'status-label float-right', turnOn: 'on'}, content: '开启',},{className: { commonClassName:'status-label float-right', turnOn: 'off'}, content: '关闭',}],
  },
  {
    liClassName: 'last-menu-item disabled',
    aClassName: 'action-bar-top-trash disabled',
    svgClassName: 'trash',
    text: '删除所选任务',
  },
]
    }
  },
  computed: {
    currentList () {
      return this.$store.state.collections.currentList
    }
  },
  methods: {
    hideActionBar: function(){
      // 隐藏 排序 更多 下拉框
      this.actionBarTopHeight = '0px'
    },
    sortFn(sortFnName){
      // 输入根据什么东西排序，然后调用这个方法
      this[sortFnName].call(this)
    },
    showActionBarTop: function(type){
    // 显示 排序、更多 下拉框
      if(this.actionBarTopHeight > '0px'){
        // 如果下拉框已经显示，再次点击就隐藏下拉框
        this.actionBarTopHeight = '0px'
        return 
      }
      if (type === 'sort' && this.actionBarBottomActive.sort){
        this.actionBarTopActive = 'sort'
        this.actionBarTopHeight = `${this.actionBarTopSort.length * 38}px`
      }else if (type === 'more' && this.actionBarBottomActive.more){
        this.actionBarTopActive = 'more'
        this.actionBarTopHeight = `${this.actionBarTopMore.length * 42}px`
      }else if (type === 'share' && this.actionBarBottomActive.share){
        this.actionBarTopHeight = `0px`
      }else{
        this.actionBarTopHeight = `0px`
      }
    },
  }
}
</script>

<style scoped>
.list-toolbar{position: relative; height: 45px; min-height: 45px; display: flex; align-items: center; background: #0e91c5;}
.list-toolbar h1{flex:1; font-size: 20px; color: #fff; padding: 10px 14px; font-weight: 200; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; text-align: left;}
.action-bar{position: relative; opacity: 1; filter: none; transition: opacity 200ms ease-in;}

.action-bar-bottom{text-align: center; font-size: 0; height: 45px;}
.action-bar-bottom a{display: inline-block; min-width: 52px; padding: 6px;}
.action-bar-bottom a svg{fill: #fff;}
.action-bar-bottom a .tab-text{font-size: 12px; color: #fff; display: block; text-align: center;}
.action-bar.expanded .action-bar-bottom a{opacity: 0.4;}
.action-bar.expanded .action-bar-bottom a.active{opacity: 1; filter: none;}

.action-bar-top{position: absolute; width: 250px; right: 0; top: 45px; transition: height 120ms linear; z-index: 1; background: #0e91c5; overflow: hidden; }
.action-bar-top ul{position: absolute; z-index: 0; top: 0; left:0; right: 0;}
.action-bar.expanded .action-bar-top ul.active{z-index: 1;}
.action-bar-top li a.disabled{opacity: 0.4;}
.action-bar-top li{position: relative; padding: 2px; padding-top: 1px; opacity: 0; transition: opacity 200ms linear;}
.action-bar.expanded .action-bar-top ul.active li{opacity: 1; filter: none;}
.action-bar.expanded .action-bar-top ul.active li.disabled{opacity: 0.4;}
.action-bar-top li a{display: block; padding: 7px; padding-left: 34px; color: #fff; text-align: left; font-size: 14px;}
.action-bar-top ul.active li.disabled a{display: block; padding: 7px; padding-left: 34px; color: #fff; text-align: left; font-size: 14px;}
.action-bar-top li a svg{position: absolute; fill: #fff; top: 7px; left: 8px;}
.action-bar-top li a .status-label{font-size: 85%; text-transform: uppercase; padding: 1px; display: none; color: #b2b2b2;}
.action-bar-top li a .status-label.active{display: block;}
</style>
