<template>
  <div id="lists-nav" v-bind:class="isCollapsed">
    <div class="lists-inner" tabindex="0">
      <div class="search-toolbar">
        <a class="toggle-icon" tabindex="0" title="toggle-slidebar" v-on:click="collapse">
          <svg class="list-toggle" width="20px" height="20px">
            <use xlink:href="#icon-list-toggle"></use>
          </svg>
        </a>

        <div class="search-input-wrapper">
          <input class="search-input chromeless" type="text" v-model="searchText" ref="search" @click="changeSearchIcon($event)">
        </div>

        <div class="search-icon-wrapper">
          <label class="search-icon" v-if="searchIcon === 'searchingIcon'">
            <svg class="search rtl-flip" width="20px" height="20px">
              <use xlink:href="#icon-search"></use>
            </svg>
            <input type="radio" class="hidden" name="search-icon" value="stopSearchingIcon" v-model="searchIcon">
          </label>
          <label class="search-stop-icon" v-else>
            <svg width="20px" height="20px">
              <use xlink:href="#icon-search-stop"></use>
            </svg>
            <input type="radio" class="hidden" name="search-icon" value="searchingIcon" v-model="searchIcon">
          </label>
        </div>
      </div>

      <div class="user-toolbar">
        <a class="user" tabindex="0">
          <span class="user-avatar">
            <img :src="getAvatarSrc" alt="" class="avatar medium">
          </span>
          <span class="user-name">{{ user.username }}</span>
          <span class="user-arrow">
            <svg width="20px" height="20px">
              <use xlink:href="#icon-down-arrow"></use>
            </svg>
          </span>
          <div id="sync">
            <span class="offline-wrapper hidden">
              <svg class="offline" width="20px" height="20px" >
                <use xlink:href="#icon-offline"></use>
              </svg>
            </span>
            <span class="syncing-wrapper hidden">
              <svg class="sync" width="20px" height="20px" >
                <use xlink:href="#icon-sync"></use>
              </svg>
            </span>
          </div>
        </a>
        <!-- 这两个功能被砍掉了 -->
        <div class="stream-counts hidden">
          <!-- 有设置提醒的任务 -->
          <a class="activities-count">
            <svg class="bell" width="20px" height="20px">
              <use xlink:href="#icon-bell"></use>
            </svg>
            <span class="count hidden">10</span>
          </a>
          <!-- 被评论过的 -->
          <a class="conversations-count">
            <svg class="conversations rtl-flip" width="20px" height="20px" >
              <use xlink:href="#icon-conversations"></use>
            </svg>
            <span class="count hidden">0</span>
          </a>
        </div>
      </div>

      <div class="lists-scroll">
        <ul class="filters-collection">
          <li v-for="(item, index) in filtersCollection" class="sidebar-item" v-bind:tabindex="item.isAnimateUp ? -1 : 0" v-bind:class="{'animate-up': item.isAnimateUp, active: item.active, overdue: item.overdue}" @click="selectItem($event, index, 'filters')">
            <a v-bind:href="'#/lists/' + item.className">
              <span class="list-icon" :title="item.title">

                <svg :class="item.className" width="20px" height="20px">
                  <use :xlink:href="`#icon-${item.className}`"></use>
                </svg>

              </span>
              <span class="title">{{item.title}}</span>
              <span class="overdue-count">{{item.overdueCount}}</span>
              <span class="count">{{item.count}}</span>
              <span class="list-options" title="清单选项">
                <svg class="options rtl-flip" width="20px" height="20px">
                  <use xlink:href="#icon-options"></use>
                </svg>
              </span>
            </a>
          </li>
        </ul>

        <ul class="lists-collection">
          <li v-for="(item, index) in listsCollection" class="sidebar-item owner list draggable" :class="{active: item.active}" @click="selectItem($event, index, 'lists')">
            <a v-bind:href="item.href">
              <span class="list-icon" :title="item.title">
                <svg class="list rtl-flip" width="20px" height="20px">
                  <use xlink:href="#icon-list"></use>
                </svg>
              </span>
              <span class="title">{{item.title}}</span>
              <span class="overdue-count">{{item.overdueCount}}</span>
              <span class="count">{{item.count}}</span>
              <span class="list-options" title="清单选项">
                <svg class="options rtl-flip" width="20px" height="20px">
                  <use xlink:href="#icon-options"></use>
                </svg>
              </span>
            </a>
          </li>
        </ul>

        <a class="more-button" v-on:click="collapse">
          <svg class="more-vertical" width="20px" height="20px">
            <use xlink:href="#icon-more-vertical"></use>
          </svg>
        </a>
      </div>
      <div class="sidebar-actions">
        <a class="sidebar-actions-addList">
          <span class="sidebar-actions-icon">
            <svg class="plus-small" width="20px" height="20px">
              <use xlink:href="#icon-plus-small"></use>
            </svg>
          </span>
          <span class="sidebar-actions-label">创建清单</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import utils from '../lib/utils'

export default {
  name: 'ListsNavigation',
  computed: {
    user () {
      return this.$store.state.user
    },
    getAvatarSrc () {
      return utils.getAvatarSrc(this.user.username)
    }
  },
  data() {
    return {
      searchIcon: 'searchingIcon',
      searchText: '',
      isCollapsed: '',
      filtersCollection: [
        {
          isAnimateUp: false,  //是否隐藏
          href: '#/lists/index',
          className: 'inbox',
          title: '收件箱',
          overdueCount: 10,  //过期任务的个数
          count: 1, // 总共的任务数量
          active: false,  // 将鼠标点击时，为item 切换上激活的背景
          overdue: true,  // 是否有过期的任务 
        },{
          isAnimateUp: true, 
          className: 'assigned',
          title: '分配给我',
          overdueCount: 10,
          count: 1,
          active: false,
          overdue: false,
        },{
          isAnimateUp: false,
          className: 'starred',
          title: '已加星标',
          overdueCount: 10,
          count: 1,
          active: false,
          overdue: false,
        },{
          isAnimateUp: false,
          className: 'today',
          title: '今天',
          overdueCount: 10,
          count: 1,
          active: false,
          overdue: false,
        },{
          isAnimateUp: false,
          className: 'week',
          title: '周',
          overdueCount: 10,
          count: 1,
          active: false,
          overdue: false,
        },{
          isAnimateUp: false,
          className: 'all',
          title: '全部',
          overdueCount: 10,
          count: 4,
          active: false,
          overdue: false,
        },{
          isAnimateUp: false,
          className: 'completed',
          title: '已完成',
          overdueCount: undefined,
          count: undefined,
          active: false,
          overdue: false,
        },
      ],
      listsCollection:[
        {
          isAnimateUp: false,
          href: '#/lists/3429677865',
          title: '工作',
          overdueCount: 10,
          count: 2,
          active: false,
        },{
          isAnimateUp: false,
          href: '#/lists/3429676336',
          title: '生活',
          overdueCount: 10,
          count: 1,
          active: false,
        },
      ],
    }
  },
  watch: {
    searchIcon: function(){
      if (this.searchIcon === 'stopSearchingIcon'){
        this.$refs.search.focus()
      }else{
        this.searchText = ''
      }
    },
  },
  methods: {
    changeSearchIcon: function($event){
      this.searchIcon = 'stopSearchingIcon'
    },
    collapse: function (){
      this.isCollapsed = this.isCollapsed ? '' : 'collapsed'
    },
    selectItem: function($event, index, listArea){
      this.filtersCollection.forEach(function(item, index){item.active = false})
      this.listsCollection.forEach(function(item, index){item.active = false})
      if(listArea === 'filters'){
        this.filtersCollection[index]['active'] = 'true'
      }
      if(listArea === 'lists'){
        this.listsCollection[index]['active'] = 'true'
      }
    },
  }
}

</script>
<style scoped>
*{box-sizing: content-box;}
#lists-nav :focus{outline: none;}

#lists-nav{width: 280px; background: #f7f7f7; z-index: 3; overflow: hidden; transition: width 100ms ease; user-select: none;}
#lists-nav.collapsed{width: 42px; flex-basis: 42px;}
#lists-nav.collapsed #sync, #lists-nav.collapsed .count, #lists-nav.collapsed .folder-arrow, #lists-nav.collapsed .folder-option, #lists-nav.collapsed .lists-collection, #lists-nav.collapsed .new-list-dropzone, #lists-nav.collapsed .options, #lists-nav.collapsed .overdue-count, #lists-nav.collapsed .sidebar-actions-label, #lists-nav.collapsed .stream-counts, #lists-nav.collapsed .tagCloud, #lists-nav.collapsed .title, #lists-nav.collapsed .user-arrow, #lists-nav.collapsed .user-name, #lists-nav.collapsed .foldersGuide {
    display: none;
}

.lists-inner{display: flex;position: relative; flex-direction: column; height: 100vh;}
.search-toolbar{height: 45px; background: #0c7fad; display: flex;}
.list-toggle{width: 20px; height: 20px; fill: #fff; padding: 13px 11px 12px 11px; flex-shrink:0; box-sizing: content-box;}
.search-input-wrapper{flex:1;}
.search-input{width: 100%; box-sizing: border-box; transition: all 0.15s ease-in-out;}
.search-icon-wrapper{width: 20px; height: 20px; fill:#fff; padding: 13px 11px 12px 11px; flex-shrink: 0; box-sizing: content-box;}
.search-input{font-size: 18px; color: #fff; height: 45px; -webkit-app-regionter:cover no-repeat;}

.user-toolbar{height: 45px; display: box; display: flex; -webkit-box-align: center; align-items: center; padding-top: 2px; padding-bottom: 4px;}
.user-toolbar svg{fill: #737272;}
.user{height: 45px; display: flex; align-items: center; flex-basis: 42px; flex-shrink: 0; flex-grow: 1; overflow: hidden;}
.user-avatar{ padding: 0 5px; flex-shrink: 0;}
.avatar{width: 32px; height: 32px; border-radius: 50%; vertical-align: middle;}
.user-name{padding: 0 5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-size: 15px; line-height: 32px; color: #262626;}
.user-arrow{width: 20px; height: 20px;}
#sync{min-width: 20px; margin-top: 4px;}
svg.offline{fill: #d74e48;}
.syncing-wrapper{display: inline-block; width: 20px; height: 20px; animation: rotate 0.8s linear infinite;}
.stream-counts{display: flex; margin-top: 3px; flex-shrink: 0;}
.activities-count, .conversations-count{position: relative; padding: 0 10px;}
.user-toolbar .count{position: absolute; top: -8px; right: 6px; font-size: 10px; line-height: 10px; min-width: 11px; border-radius: 20px; padding: 3px 2px 2px 2px; text-align: center; background: #d74e48; color: #fff;}


li.animate-up{transition: height 300ms;}
.sidebar-item.animate-up{height: 0; overflow: hidden;}
.lists-scroll{display: flex; flex:1; overflow-y: auto; overflow-x: hidden; flex-direction: column;}
.lists-scroll .filters-collection, .lists-scroll .lists-collection{flex-shrink: 0;}
.sidebar-item{position: relative; height: 38px; overflow: hidden;}
.sidebar-item a{box-sizing: border-box; height: 38px; user-select: none; color: #1c1c1c; display: flex; align-items: center; padding: 0 8px;}
.sidebar-item.active a{background: #e0eefa; color: #262626; text-shadow: 0 1px 1px rgba(0, 0, 0, 0);}
.sidebar-item .list-icon{height: 20px; width: 20px; padding: 0 3px; text-align: center;}
.sidebar-item .list-icon svg.inbox{fill: #2b8dec;}
.sidebar-item .list-icon svg.assigned{fill: #a33684;}
.sidebar-item .list-icon svg.starred{fill: #db4c3f;}
.sidebar-item .list-icon svg.today{fill: #5fa004;}
.sidebar-item .list-icon svg.week{fill: #e29600;}
.sidebar-item .list-icon svg.all{fill: #9b5c1c;}
.sidebar-item .list-icon svg.completed{fill: #737273;}
.sidebar-item .list-icon svg.list{fill: #b9b9b9;}
.sidebar-item .title{font-size: 15px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: #262626; flex: 1; padding: 0 6px; text-align: left;}
.sidebar-item a .overdue-count{display: none; padding: 2px 6px; margin: 0 4px; border-radius: 12px; font-size: 12px; color: #d74e48; background: rgba(215,78,72,0.1); font-weight: 600;}
.sidebar-item.active a .overdue-count{color: #f7f7f7; background: rgba(215, 78, 72, 0.8);}
.sidebar-item.overdue .overdue-count {display: block; }
.sidebar-item a .count{padding: 0 4px; font-size: 12px; color: #bdbcbb; font-weight: 400;}
.sidebar-item.active a .count{color: rgba(38, 38, 38, 0.75); }
.sidebar-item a .list-options{display: none; height: 20px; width: 20px; padding: 0 4px; opacity: 0.6;}
.sidebar-item.list.active a .list-options{display: block;}
.sidebar-item a .label{position: absolute; width: 32px; height: 32px; top: 13px; left: 13px; transform: scale(0.5); transform-origin: 0 0;  padding-top: 7px; box-sizing: border-box; font-size: 16px; color: #5fa004; font-weight: 600; text-align: center;}
.lists-scroll .more-button{display: none; box-sizing: border-box; height: 38px; padding-top: 9px; fill: #328ad6; text-align: center;}
#lists-nav.collapsed .more-button{display: block;}

.sidebar-actions{border-top: 1px solid rgba(0, 0, 0, 0.1); background: #f7f7f7;}
.sidebar-actions-addList{display: flex; height: 42px; align-items: center; font-size: 15px; color: #328ad6; fill: #328ad6;}
.sidebar-actions-icon{height:20px; padding: 0 10px;}
.sidebar-actions-label{flex: 1; text-align: left;}

</style>
