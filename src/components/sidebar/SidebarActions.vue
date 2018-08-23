<template>
  <div class="sidebar-actions" @click="$emit('openDialogListCreator')">
    <a class="sidebar-actions-addList">
      <span class="sidebar-actions-icon">
        <svg class="plus-small" width="20px" height="20px">
          <use xlink:href="#icon-plus-small"></use>
        </svg>
      </span>
      <span class="sidebar-actions-label">创建清单</span>
    </a>
  </div>
</template>

<script>

export default {
  name: 'SidebarActions',
  data() {
    return {
    }
  },
}

</script>
<style scoped>
*{box-sizing: content-box;}

#lists-nav.collapsed #sync, #lists-nav.collapsed .count, #lists-nav.collapsed .folder-arrow, #lists-nav.collapsed .folder-option, #lists-nav.collapsed .lists-collection, #lists-nav.collapsed .new-list-dropzone, #lists-nav.collapsed .options, #lists-nav.collapsed .overdue-count, #lists-nav.collapsed .sidebar-actions-label, #lists-nav.collapsed .stream-counts, #lists-nav.collapsed .tagCloud, #lists-nav.collapsed .title, #lists-nav.collapsed .user-arrow, #lists-nav.collapsed .user-name, #lists-nav.collapsed .foldersGuide {
    display: none;
}

.sidebar-actions{border-top: 1px solid rgba(0, 0, 0, 0.1); background: #f7f7f7;}
.sidebar-actions-addList{display: flex; height: 42px; align-items: center; font-size: 15px; color: #328ad6; fill: #328ad6;}
.sidebar-actions-icon{height:20px; padding: 0 10px;}
.sidebar-actions-label{flex: 1; text-align: left;}

</style>
