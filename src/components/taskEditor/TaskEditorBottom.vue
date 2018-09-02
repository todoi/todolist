<template>
  <div class="bottom">
    <a 
      tabindex="0" 
      class="detail-close" 
      title="隐藏详细视图" 
      @click="$emit('triggerClose')"
    >
      <svg class="close-right" width="20px" height="20px">
        <use xlink:href="#icon-close-right"></use>
      </svg>
    </a>

    <a 
      tabindex="0" 
      class="detail-trash" 
      title="删除任务" 
      @click="$emit('triggerDelete')"
    >
      <svg class="trash" width="20px" height="20px">
        <use xlink:href="#icon-trash"></use>
      </svg>
    </a>

    <div class="comments">
      <div class="comments-bottom">
        <!-- <div class="last-comment hidden">
          <span class="unread-count"></span>
          </div> -->
          <div class="comments-add">
            <div class="input-fake">
              <div class="expandingArea active">
                <pre>{{ comment }}</pre>
                <textarea 
                  tabindex="0" 
                  placeholder="添加评论..." 
                  v-model="comment" 
                  @keypress.enter.prevent="addComment"
                ></textarea>
              </div>
            </div>
          </div>

      </div>
    </div>

    <div class="detail-info">
      <span :title="formatDate(taskItem.createdAt)">{{'创建于 ' + formatDate(createdAt)}}</span>
    </div>
  </div>
</template>

<script>
import utils from '../../lib/utils'
export default {
  name: 'TaskEditorBottom',
  props: ['taskItem'],
  data () {
    return {
      comment: '',
      taskId: this.taskItem.id
    }
  },
  computed: {
    username () {
      return this.$store.state.user.username
    },
    createdAt () {
      if (this.taskItem.id !== this.taskId) {
        this.comment = ''
        this.taskId = this.taskItem.id
      }
      return this.taskItem.createdAt
    }
  },
  methods: {
    addComment () {
      if(this.comment){
        let comment = {
          content: this.comment,
          username: this.username
        }
        this.$store.dispatch('createComment', {taskId: this.taskItem.id, comment})
          .then(val => {
            // 重置 comment
            this.comment = ''
            // 滚动条滚到底
            this.$nextTick(function(){
              this.$parent.$refs.body.scrollTop = 10000
            })
          })
      }
    },
    // 传入一个时间戳 返回一个 '周二,5月15 到期' 的时间格式
    formatDate (timeStamp) {
      return utils.formatDate(timeStamp)
    },
  }
}
</script>

<style scoped>
.bottom{position: relative;}
.bottom .detail-close, .bottom .detail-trash{position: absolute; bottom: 8px; opacity: 0.6}
.bottom .detail-close:hover, .bottom .detail-trash:hover{opacity: 0.8}
.bottom .detail-close{left: 8px;}
.bottom .detail-trash{right: 6px;}
.comments-bottom{border-top: 1px solid #ebebeb; background: #fff;}
.last-comment{position: absolute; z-index: 1; left: 0; right: 0; top: -44px; border-top: 1px solid #ebebeb;}
.comments-bottom .unread-count{position: absolute; display: none; right: 15px; top: 10px; color: #fff; font-size: 12px; line-height: 12px; border-radius: 20px; padding: 2px; padding-bottom: 3px; text-align: center; min-width: 11px; background: #d74e48;}
.comments-add{padding: 10px; padding-bottom: 0;}
.input-fake{width: 100%; min-height: 32px; padding: 7px; transition: all 150ms ease-in-out; box-shadow: inset 0 0 0 1px #d6d6d6; border-radius: 3px; color: #262626;}
.input-fake textarea{top: 1px; font-weight: normal; line-height: 20px;}
.input-fake pre{font-weight: normal; line-height: 20px;}
.detail-info{font-size: 12px; text-align: center; padding: 14px 35px; color: #a3a3a2;}
.detail-info span{display: inline-block; max-width: 100%; height: 15px; }
</style>
