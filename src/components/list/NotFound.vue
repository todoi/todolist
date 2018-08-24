<template>
  <div class="task-404" >
    <svg class="search rtl-flip" width="20px" height="20px">
      <use xlink:href="#icon-search-big"></use>
    </svg>
    <h2>无搜索结果</h2>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
}
</script>

<style scoped>
.task-404{padding: 25px; position: absolute; left: 0; right: 0; text-align: center; top: 50%; margin-top: -110px;}
.task-404 svg{height: 100px; width: 100px; fill: #fff; filter: drop-shadow(0 1px 0 rgba(0, 0, 0, 0.2));}
.task-404 h2{font-size: 18px; color: rgba(255, 255, 255, 0.85); filter: drop-shadow(0 1px 0 rgba(0, 0, 0, 0.2));}
</style>
