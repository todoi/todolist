<template>
  <Popover id="user-popover" header="用户">
    <ul>
      <li class="disabled">
        <a>{{ email }}</a>
      </li>
      <li>
        <a @click="logOut">登出</a>
      </li>
    </ul>
  </Popover>
</template>

<script>
import Popover from './Popover'
import leancloud from '../../lib/leancloud'

export default {
  name: 'UserPopover',
  components: { Popover },
  computed: {
    email() {
      return this.$store.state.user.email
    }
  },
  methods: {
    logOut () {
      window.localStorage.setItem('isAutoLogin', false)
      this.$store.commit('resetUser')
      leancloud.logOut()
    }
  }
}
</script>

<style scoped>
  #user-popover {top: 103px; left: 8px;}
  #user-popover .inner ul { padding: 6px 0 1px; }
  #user-popover .inner li.disabled { color: #aaa; }
  #user-popover .inner li > a { display: block; margin: 1px; font-size: 13px; padding: 10px 12px; }
  #user-popover .inner li > a:hover { color: #fff; background: #328ad6;}
</style>
