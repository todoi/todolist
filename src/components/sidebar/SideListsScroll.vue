<template>
  <div class="lists-scroll">
    <CollectionScroll class="filters-collection" 
      itemType="filters" 
      :items="filterCollection" 
      @selectItem="selectItem" />

    <CollectionScroll class="lists-collection" 
      isList="true"
      itemType="lists" 
      :items="listCollection" 
      @selectItem="selectItem" 
      @openDialogListChanger="$emit('openDialogListChanger')"
      />

    <a 
      class="more-button" 
      @click="collapse"
    >
      <svg class="more-vertical" width="20px" height="20px">
        <use xlink:href="#icon-more-vertical"></use>
      </svg>
    </a>
  </div>
</template>

<script>
import CollectionScroll from './CollectionScroll'
export default {
  name: 'SideListsScroll',
  components: { CollectionScroll },
  computed: {
    filterCollection () {
      return this.$store.state.filterCollection 
    },
    listCollection () {
      return this.$store.state.allList
    },
  },
  methods: {
    collapse () {
      this.$emit('collapse')
    },
    selectItem ({index, listArea}) {
      this.$emit('closeTaskEditor')
      this.$store.commit('switchList', {index, listArea})
    },
  }
}
</script>

<style scoped>
*{box-sizing: content-box;}

#lists-nav.collapsed #sync, #lists-nav.collapsed .count, #lists-nav.collapsed .folder-arrow, #lists-nav.collapsed .folder-option, #lists-nav.collapsed .lists-collection, #lists-nav.collapsed .new-list-dropzone, #lists-nav.collapsed .options, #lists-nav.collapsed .overdue-count, #lists-nav.collapsed .sidebar-actions-label, #lists-nav.collapsed .stream-counts, #lists-nav.collapsed .tagCloud, #lists-nav.collapsed .title, #lists-nav.collapsed .user-arrow, #lists-nav.collapsed .user-name, #lists-nav.collapsed .foldersGuide {
    display: none;
}

.lists-scroll{display: flex; flex:1; overflow-y: auto; overflow-x: hidden; flex-direction: column;}
.lists-scroll .filters-collection, .lists-scroll .lists-collection{flex-shrink: 0;}

.lists-scroll .more-button{display: none; box-sizing: border-box; height: 38px; padding-top: 9px; fill: #328ad6; text-align: center;}
#lists-nav.collapsed .more-button{display: block;}
</style>
