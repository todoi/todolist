<template>
  <div 
    tabindex="0" 
    class="section section-item detail-date" 
    :class="{
      'overdue' : deadline && (new Date().getTime() > deadline), 
      date: deadline
    }"
  >
    <div class="section-icon">
      <svg class="date" width="20px" height="20px">
        <use xlink:href="#icon-date"></use>
      </svg>
    </div>

    <div class="section-content">
      <div class="section-title">
        {{ deadline ? formatDate(deadline) + '到期' : '设置到期日'}}
      </div>

      <date-picker 
        :input-class="'date-picker-input-taskdetail'" 
        :wrapper-class="'date-picker-wrapper-taskdetail'"
        :calendar-class="'date-picker-calendar-taskdetail'" 
        :calendar-button-icon="'date-picker-icon-taskdetail'" 
        :calendar-button-icon-content="''" 
        :calendar-button="true" 
        :highlighted="highlighted" 
        :ref="'date-picker'"
        @closed="showCalenderTrigon = !showCalenderTrigon"
        @opened="showCalenderTrigon = !showCalenderTrigon"
        @selected="changeDeadline"
      >
        <template slot="afterDateInput">
          <div class="calender-trigon trigon1" v-show="showCalenderTrigon"></div>
          <div class="calender-trigon trigon2" v-show="showCalenderTrigon"></div>
        </template>
      </date-picker>

      <div class="section-description"></div>
    </div>

    <a
      tabindex="0" 
      title="删除" 
      class="section-delete" 
      v-show="deadline"
      @click="clearDeadline"
    >
      <svg class="delete" width="20px" height="20px">
        <use xlink:href="#icon-delete"></use>
      </svg>
    </a>
  </div>
</template>

<script>
import DatePicker from 'vuejs-datepicker'
import utils from '../../lib/utils'

export default {
  name: 'Deadline',
  components: {DatePicker},
  props: ['taskItem'],
  data () {
    return {
      // Highlight an array of dates
      highlighted: {
        dates: [ new Date() ]// 当天高亮 
      },
      showCalenderTrigon: false,
      taskId: this.taskItem.id,
    }
  },
  computed: {
    deadline () {
      if (this.taskId !== this.taskItem.id){
        // 如果换了一个项目，关闭 date-picker 和 倒三角
        this.$refs['date-picker'].close()
        this.showCalenderTrigon = false
      }
      return this.taskItem.deadline
    }
  },
  methods: {
    // 传入一个时间戳 返回一个 '周二,5月15 到期' 的时间格式
    formatDate (timeStamp) {
      return utils.formatDate(timeStamp)
    },
    changeDeadline (date) {
      this.$store.dispatch('updateTask', {
        task: this.taskItem,
        attributes: {deadline: date ? new Date(date).getTime() : 0}
      })
    },
    clearDeadline () {
      this.$refs['date-picker'].clearDate()
    }
  }
}
</script>

<style scoped>
</style>
