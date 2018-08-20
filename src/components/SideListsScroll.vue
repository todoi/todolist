<template>
  <div class="lists-scroll">
    <CollectionScroll class="filters-collection" 
      itemType="filters" 
      :items="filtersCollection" 
      @selectItem="selectItem" />
    <CollectionScroll class="lists-collection" 
      isList="true"
      itemType="lists" 
      :items="listsCollection" 
      @selectItem="selectItem" />
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
    filtersCollection () {
      return this.$store.state.collections.filtersCollection 
    },
    listsCollection () {
      return this.$store.state.collections.listsCollection 
    }
  },
  methods: {
    collapse () {
      this.$emit('collapse')
    },
    selectItem: function({index, listArea}){
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

#lists-nav.collapsed #sync, #lists-nav.collapsed .count, #lists-nav.collapsed .folder-arrow, #lists-nav.collapsed .folder-option, #lists-nav.collapsed .lists-collection, #lists-nav.collapsed .new-list-dropzone, #lists-nav.collapsed .options, #lists-nav.collapsed .overdue-count, #lists-nav.collapsed .sidebar-actions-label, #lists-nav.collapsed .stream-counts, #lists-nav.collapsed .tagCloud, #lists-nav.collapsed .title, #lists-nav.collapsed .user-arrow, #lists-nav.collapsed .user-name, #lists-nav.collapsed .foldersGuide {
    display: none;
}

.lists-scroll{display: flex; flex:1; overflow-y: auto; overflow-x: hidden; flex-direction: column;}
.lists-scroll .filters-collection, .lists-scroll .lists-collection{flex-shrink: 0;}

.lists-scroll .more-button{display: none; box-sizing: border-box; height: 38px; padding-top: 9px; fill: #328ad6; text-align: center;}
#lists-nav.collapsed .more-button{display: block;}
</style>
