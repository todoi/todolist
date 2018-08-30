<template>
  <div class="user-toolbar">
    <a class="user" tabindex="0">
      <span class="user-avatar" @click="openPopover('user')">
        <img 
          class="avatar medium"
          :title="user.username"
          :src="getAvatarSrc" >
      </span>
      <span class="user-name" @click="openPopover('user')">{{ user.username }}</span>
      <span class="user-arrow" @click="openPopover('user')">
        <svg width="20px" height="20px">
          <use xlink:href="#icon-down-arrow"></use>
        </svg>
      </span>
      <div id="sync">
        <span class="offline-wrapper" :class="{hidden: hideOfflineIcon}">
          <svg class="offline" width="20px" height="20px" >
            <use xlink:href="#icon-offline"></use>
          </svg>
        </span>
        <span class="syncing-wrapper" :class="{hidden: hideSyncIcon}">
          <svg class="sync" width="20px" height="20px" >
            <use xlink:href="#icon-sync"></use>
          </svg>
        </span>
      </div>
    </a>
    <!-- 这两个功能被砍掉了 -->
    <div class="stream-counts hidden">
      <!-- 有设置提醒的任务 -->
      <a class="activities-count" @click="openPopover('activity')">
        <svg class="bell" width="20px" height="20px">
          <use xlink:href="#icon-bell"></use>
        </svg>
        <span class="count">10</span>
      </a>
      <!-- 被评论过的 -->
      <a class="conversations-count" @click="openPopover('conversation')">
        <svg class="conversations rtl-flip" width="20px" height="20px" >
          <use xlink:href="#icon-conversations"></use>
        </svg>
        <span class="count">0</span>
      </a>
    </div>
  </div>
</template>

<script>
import utils from '../../lib/utils'

export default {
  name: 'SideUserToolbar',
  props: ['hideOfflineIcon', 'hideSyncIcon'],
  data () {
    return {}
  },
  computed: {
    user () {
      return this.$store.state.user
    },
    getAvatarSrc () {
      return utils.getAvatarSrc(this.user.username)
    }
  },
  methods: {
    openPopover (type) {
      this.$emit('openPopover', type)
    }
  }
}
</script>

<style scoped>
*{box-sizing: content-box;}

#lists-nav.collapsed #sync, #lists-nav.collapsed .count, #lists-nav.collapsed .stream-counts, #lists-nav.collapsed .user-arrow, #lists-nav.collapsed .user-name {
    display: none;
}

.user-toolbar{height: 45px; display: flex; -webkit-box-align: center; align-items: center; padding-top: 2px; padding-bottom: 4px;}
.user-toolbar svg{fill: #737272;}
.user{height: 45px; display: flex; align-items: center; flex-basis: 42px; flex-shrink: 0; flex-grow: 1; overflow: hidden;}
.user-avatar{ padding: 0 5px; flex-shrink: 0;}
.avatar{width: 32px; height: 32px; border-radius: 50%; vertical-align: middle;}
.user-name{padding: 0 5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-size: 15px; line-height: 32px; color: #262626;}
.user-arrow{width: 20px; height: 20px;}
#sync{min-width: 20px; margin-top: 4px;}
svg.offline{fill: #d74e48;}
.syncing-wrapper{display: inline-block; width: 20px; height: 20px; animation: rotate 0.8s linear infinite;}
.stream-counts{display: flex; margin-top: 3px; flex-shrink: 0;}
.activities-count, .conversations-count{position: relative; padding: 0 10px;}
.user-toolbar .count{position: absolute; top: -8px; right: 6px; font-size: 10px; line-height: 10px; min-width: 11px; border-radius: 20px; padding: 3px 2px 2px 2px; text-align: center; background: #d74e48; color: #fff;}

</style>
