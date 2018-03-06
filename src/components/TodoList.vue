<template>
  <div class="pages">
    <section id="page-home">
      <div class="topbar clearfix">
        <label class="topbar-label topbar-login">
          <input type="radio" name="sign-type" value="login" >登录</label>
        <label class="topbar-label topbar-signup">
          <input type="radio" name="sign-type" value="signup">注册</label>
      </div>
      <div class="login">
        <h3>Log In</h3>
        <p class="signup-tip">Need a MailChimp account?<a href="">Create an account</a></p>
        <label>
          <span>Username</span>
          <input type="text">
        </label>
        <label>
          <span>Password</span>
          <span><i class="icone-yes"></i>Show</span>
          <input type="text">
        </label>
        <button type="submit">Log In</button>
        <div>
          <label>
            <input type="checkbox"> Keep me logged in</label>
        </div>
        <a href="">forgot your password?</a>
      </div>
      <div class="signup">
        <h3>Sign Up</h3>
        <p>Already have a MailChimp account?<a href="">Log in here</a></p>
        <label>
          <span>Username</span>
          <input type="text" placeholder="Pick a username">
        </label>
        <label>
          <span>Email</span>
          <input type="text" placeholder="you@example.com">
        </label>
        <label>
          <span>Password</span>
          <span><i class="icone-yes"></i>Show</span>
          <input type="text" placeholder="Create a password">
          <p>Use at least one letter, one numeral, and seven characters.</p>
        </label>
        <button type="submit">Sign up for TodoList</button>
      </div>
    </section>
    <section id="page-todo"></section>
  </div>
</template>
<script>
export default {
  name: 'TodoList',
  data() {
    return {}
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pages{ text-align: center; }
#page-home{}
.topbar{ height: 60px; padding: 0 100px; box-shadow: 0 1px 0 0 rgba(0,0,0,0.066); }
.topbar-label{ float: right; line-height: 60px; }
.topbar-label > input{ width: 0; }
.topbar-login{ padding: 0 24px; color: #3a3a3a; font-weight: 600; }
.topbar-login:hover { background: #f5f5f5; }
.topbar-signup{ padding: 0 50px; line-height: 40px; margin-top: 10px; -webkit-font-smoothing: antialiased; border-radius: 4px; transition: all 0.2s ease; color: #fff; background: #52bad5; }
.topbar-signup:hover{ background: #2c9ab7; }
#page-todo{}
</style>
