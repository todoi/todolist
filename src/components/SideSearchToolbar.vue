<template>
  <div class="search-toolbar">
    <a 
      class="toggle-icon" 
      tabindex="0" 
      title="toggle-slidebar" 
      @click.prevent="collapse()"
    >
      <svg class="list-toggle" width="20px" height="20px">
        <use xlink:href="#icon-list-toggle"></use>
      </svg>
    </a>

    <div class="search-input-wrapper">
      <input 
        class="search-input chromeless" 
        type="text" 
        ref="search" 
        v-model="searchText" 
        @click="changeSearchIcon($event)" >
    </div>

    <div class="search-icon-wrapper">
      <label 
        class="search-icon" 
        v-if="searchIcon === 'searchingIcon'"
      >
        <svg class="search rtl-flip" width="20px" height="20px">
          <use xlink:href="#icon-search"></use>
        </svg>
        <input 
          type="radio" 
          class="hidden" 
          name="search-icon" 
          value="stopSearchingIcon" 
          v-model="searchIcon">
      </label>
      <label class="search-stop-icon" v-else >
        <svg width="20px" height="20px">
          <use xlink:href="#icon-search-stop"></use>
        </svg>
        <input 
          type="radio" 
          class="hidden" 
          name="search-icon" 
          value="searchingIcon" 
          v-model="searchIcon" >
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SideSearchToolbar',
  data () {
    return {
      searchIcon: 'searchingIcon',
      searchText: '',
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
    collapse () {
      this.$emit('collapse')
    },
  }
}
</script>

<style scoped>
*{box-sizing: content-box;}

.search-toolbar{height: 45px; background: #0c7fad; display: flex;}
.list-toggle{width: 20px; height: 20px; fill: #fff; padding: 13px 11px 12px 11px; flex-shrink:0; box-sizing: content-box;}
.search-input-wrapper{flex:1;}
.search-input{width: 100%; box-sizing: border-box; transition: all 0.15s ease-in-out;}
.search-icon-wrapper{width: 20px; height: 20px; fill:#fff; padding: 13px 11px 12px 11px; flex-shrink: 0; box-sizing: content-box;}
.search-input{font-size: 18px; color: #fff; height: 45px; -webkit-app-regionter:cover no-repeat;}
</style>
