<template>
  <div class="comments-main has-comments">
    <!-- 没用到 promise 暂不实现这个功能 -->
    <div class="hidden state loading spinner">
      <span class="dark"></span>
      <div class="error hidden">很抱歉，我们无法载入评论，请重试。</div>
    </div>

    <ul class="comments-list">
      <li 
        tabindex="0" 
        class="section-item section-item-comment active-user" 
        v-for="(comment, index) in comments"
      >

        <div class="section-icon picture">
          <div class="avatar medium" :title="comment.username">
            <img :src="getAvatarSrc(comment.username)">
          </div>
        </div>

        <div class="section-content">
          <span class="comment-author">{{ comment.username }}</span>
          <span class="comment-time">{{ showTime(comment.createdAt) }}</span>
          <div class="comment-text">{{ comment.content }}</div>
        </div>

        <a class="section-delete" title="删除" @click="deleteComment(comment, index)">
          <svg class="delete" width="20px" height="20px">
            <use xlink:href="#icon-delete"></use>
          </svg>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import utils from '../../lib/utils'
export default {
  name: 'CommentList',
  props: ['taskItem', 'comments'],
  data () {
    return {
    }
  },
  computed: {
    username () {
      return this.$store.state.user.username
    },
  },
  methods: {
    getAvatarSrc (username) {
      return utils.getAvatarSrc(username)
    },
    showTime(createdAt){
      // 输入一个 完成的任务对象
      // 输出新的时间 和 旧的时间之间的间隔
      console.log()
      return utils.showDuration(createdAt) + ` 之前`
    },
    deleteComment (comment, index) {
      this.$store.dispatch('deleteComment', {comment, index})
    }
  }
}
</script>

<style scoped>
.section{outline: none; position: relative; padding: 8px 0; text-align: left;}
.section-item{position: relative; outline: none; padding-left: 10px; padding-right: 10px; display: flex; align-items: center;}
.section:before{content: ''; position: absolute; bottom: 0; left: 50px; right: 0; border-bottom: 1px solid #ebebebeb;}
.section-item .section-icon, .section-item .section-attachments{align-self: flex-start; flex-shrink: 0; height: 32px; min-width: 32px; fill:#a3a3a2;}
.section-item .section-icon svg{margin: 6px;}
.section-item .section-content{flex: auto; margin: 0 8px; overflow: hidden;}
.section-item .section-title{font-size: 16px; line-height: 20px; color: #9fa2a6; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.section-item .section-edit .assign{font-size: 16px;}
.section-item .section-delete{visibility: hidden; align-self: flex-start; flex-shrink: 0; height: 32px; min-width: 32px; fill: #a3a3a2; margin-left: auto;}
.section-item:hover .section-delete{visibility: visible;}
.section-item .section-delete svg{margin: 6px; fill: #737372;}
.section-item.date .section-title{color: #328ad6;}
.section-item.date.overdue .section-title{color: #b3312d;}
.section-item.date.overdue .reminder, .section-item.date.overdue .date{fill: #b3312d;}
.section-item.date .reminder, .section-item.date .date{fill: #328ad6;}
.section-item .section-description{font-size: 12px;}
.section-files.hasFiles .section-icon svg{fill: #63b4be;}

.section-attachments{text-align: center;}
.section-attachments svg{margin: 6px;}
.section-attachments span{display: inline-block; width: 32px; height: 32px;}

.comments-main{position: relative;}
.comments-main .spinner{height: 0; transition: all 250ms ease; position: relative;}
.comments-main .dark{opacity: 0.6; margin-top: 10px; position: absolute; left: 50%; top: 0; margin-left: -10px; width: 19px; height: 19px; background: url('../../assets/images/loading_black.png'); animation: rotate .8s linear infinite;}
.comments-mian li{line-height: 16px;}
.section-item.section-item-comment{padding-top: 16px;}
.avatar.medium{width: 32px; height: 32px;}
.avatar img{width: 100%; height: 100%; border-radius: 50%; display: block;}
.comments-main li .section-content{text-align: left; font-size: 14px;}
.comments-main li .comment-author{font-weight: bold; max-width: 100px; display: inline-block; vertical-align: top; height: 16px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;}
.comments-main li .comment-time{color: #737272; vertical-align: top;}
.comments-main li .comment-text{line-height: 18px; word-wrap: break-word; white-space: pre-wrap;}
</style>
