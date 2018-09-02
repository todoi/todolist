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
        :value="value" 
        @input="searchTask($event)"
        @click="changeSearchIcon($event)" >
    </div>

    <div class="search-icon-wrapper">
      <label 
        class="search-icon" 
        v-if="searchIcon === 'search'"
      >
        <svg class="search rtl-flip" width="20px" height="20px">
          <use xlink:href="#icon-search"></use>
        </svg>
        <input 
          type="radio" 
          class="hidden" 
          name="search-icon" 
          value="stopSearch" 
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
          value="search" 
          v-model="searchIcon" >
      </label>
    </div>
  </div>
</template>

<script>
import utils from '../../lib/utils'
export default {
  name: 'SideSearchToolbar',
  props: ['value'],
  data () {
    return {
      searchIcon: 'search',
    }
  },
  watch: {
    searchIcon: function(){
      if (this.searchIcon === 'stopSearch'){
        this.$refs.search.focus()
      }else{
        this.$emit('input', '')
      }
    },
  },
  computed: {
    getAll () {
      return this.$store.getters.getAll
    }
  },
  methods: {
    changeSearchIcon ($event) {
      this.searchIcon = 'stopSearch'
    },
    collapse () {
      this.$emit('collapse')
    },
    searchTask (event) {
      let value = event.target.value
      let result = []
      this.$emit('input', value)
      this.getAll.forEach(task => task.title.indexOf(value) >= 0 && result.push(task))
      this.$emit('sendSearchResult', utils.sortFilterTasks(result))
    }
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
