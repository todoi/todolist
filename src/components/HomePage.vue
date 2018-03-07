<template>
  <section id="home-page" style="display: none;">
    <div class="topbar clearfix">
      <label class="topbar-label topbar-login">
        <input type="radio" name="sign-type" value="login">登录</label>
      <label class="topbar-label topbar-signup">
        <input type="radio" name="sign-type" value="signup">注册</label>
    </div>
  </section>
</template>
<script>
export default {
  name: 'HomePage',
}

</script>
<style scope>
#home-page {}
.topbar {height: 60px; padding: 0 100px; box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.066); }
.topbar-label {float: right; line-height: 60px; }
.topbar-label>input {width: 0; }
.topbar-login {padding: 0 24px; color: #3a3a3a; font-weight: 600; }
.topbar-login:hover {background: #f5f5f5; }
.topbar-signup {padding: 0 50px; line-height: 40px; margin-top: 10px; -webkit-font-smoothing: antialiased; border-radius: 4px; transition: all 0.2s ease; color: #fff; background: #52bad5; }
 .topbar-signup:hover {background: #2c9ab7; }
</style>
