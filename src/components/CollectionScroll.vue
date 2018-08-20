<template>
  <ul>
    <li 
      class="sidebar-item" 
      v-for="(item, index) in items" 
      :class="{
        active: item.active, 
        overdue: item.overdueCount, 
        'animate-up': item.isAnimateUp, 
        'owner list draggable': isList
      }" 
      :tabindex="item.isAnimateUp ? -1 : 0" 
      @click="selectItem($event, index, itemType)"
      >
      <a :href="'#/lists/' + item.id">
        <span 
          class="list-icon" 
          :title="item.title"
          >
          <svg width="20px" height="20px" class="list rtl-flip" v-if="isList">
            <use xlink:href="#icon-list"></use>
          </svg>
          <svg width="20px" height="20px" :class="item.id" v-else>
            <use :xlink:href="`#icon-${item.id}`"></use>
          </svg>
        </span>
        <span class="title">{{ item.title }}</span>
        <span class="overdue-count">{{ item.overdueCount }}</span>
        <span class="count">{{ item.count ? item.count : '' }}</span>
        <span class="list-options" title="清单选项">
          <svg class="options rtl-flip" width="20px" height="20px">
            <use xlink:href="#icon-options"></use>
          </svg>
        </span>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Xyz',
  props: ['isList', 'items', 'itemType'],
  methods: {
    selectItem: function($event, index, listArea){
      this.$emit('selectItem', {index, listArea})
    },
  }
}
</script>

<style scoped>
*{box-sizing: content-box;}

#lists-nav.collapsed #sync, #lists-nav.collapsed .count, #lists-nav.collapsed .folder-arrow, #lists-nav.collapsed .folder-option, #lists-nav.collapsed .lists-collection, #lists-nav.collapsed .new-list-dropzone, #lists-nav.collapsed .options, #lists-nav.collapsed .overdue-count, #lists-nav.collapsed .sidebar-actions-label, #lists-nav.collapsed .stream-counts, #lists-nav.collapsed .tagCloud, #lists-nav.collapsed .title, #lists-nav.collapsed .user-arrow, #lists-nav.collapsed .user-name, #lists-nav.collapsed .foldersGuide {
    display: none;
}

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
</style>
