<template>
  <div class="section section-item detail-reminder date overdue" tabindex="0">
    <div class="section-icon">
      <svg class="reminder" width="20px" height="20px">
        <use xlink:href="#icon-reminder"></use>
      </svg>
    </div>
    <div class="section-content">
      <div class="section-title repeat">提醒我</div>
      <div class="section-description repeat">今天</div>
    </div>
    <a class="section-delete" title="删除" tabindex="0">
      <svg class="delete" width="20px" height="20px">
        <use xlink:href="#icon-delete"></use>
      </svg>
    </a>
  </div>
</template>

<script>
export default {
  name: 'Reminder',
  data () {
    return {
    }
  },
}
</script>

<style scoped>
</style>
