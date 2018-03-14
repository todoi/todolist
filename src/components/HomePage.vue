<template>
  <section id="home-page" style="display: ;">
    <div class="topbar-wrapper">
      <div class="topbar clearfix">
        <span class="logo-title"><i class="light-yellow">to</i><i class="light-green">to</i><i class="light-blue">do</i></span>
        <label class="topbar-label topbar-login">
          <input type="radio" name="sign-type" value="login" @click="passPageName('login')">登录</label>
        <label class="topbar-label topbar-signup">
          <input type="radio" name="sign-type" value="signup" @click="passPageName('signup')">注册</label>
      </div>
    </div>
    <div class="main-wrapper">
      <div class="main">
        <!-- <div class="widget-image"></div> -->
        <div class="main-txt">
          <h3 class="main-title"><i class="icon-pen"></i> totodo</h3>
          <ul class="main-intro">
            <li>totodo是一个在线的任务管理网站</li>
            <li>totodo帮你把要做的事情列出来，并跟进所有事情。</li>
            <li>规划你的生活，提高工作效率</li>
        </ul>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'HomePage',
  date (){
    return {
    }
  },
  methods: {
    passPageName: function (pageName){
        this.$emit('change-page', pageName)
    }
  }
}

</script>
<style scope>
#home-page {height: 100vh; display: flex; flex-direction: column;}
.topbar-wrapper {position: relative; box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.066); z-index:1;}
.topbar {height: 60px; max-width: 1200px; margin: 0 auto; padding: 0 30px; }
.logo-title{float: left; font-size: 60px; font-weight: 600; font-style: italic;}
.light-blue{color: #B1E1E5;}
.light-green{color: #79B913;}
.light-yellow{color: #B7B53E;}
.topbar-label {float: right; line-height: 60px;}
.topbar-label>input {width: 0; }
.topbar-login {padding: 0 24px; color: #3a3a3a; font-weight: 600; }
.topbar-login:hover {background: #f5f5f5; }
.topbar-signup {padding: 0 50px; line-height: 40px; margin-top: 10px; -webkit-font-smoothing: antialiased; border-radius: 4px; transition: all 0.2s ease; color: #fff; background: #52bad5; }
.topbar-signup:hover {background: #2c9ab7; }
.main-wrapper {flex-grow: 1; position: relative; display: flex; overflow: hidden;}
/*.main-wrapper:before {content: ''; z-index: -1; position: absolute; width: 100%; height: 100%; }*/
.main {position: relative; overflow: hidden; width: 1200px; margin: 0 auto; color: #eee; background: linear-gradient(to right, #38D78F, #40B8AD);}
.main:before{position: absolute; content: ''; width: 800px; height: 800px; left: -100px; top: 50%; transform: translateY(-50%); background: url('../assets/images/office.png') center / cover no-repeat;}
.main-txt{position: absolute; width: 500px;  z-index: 2; right: 0; top: 50%; transform: translateY(-50%); text-align: left;}
.main-title{line-height: 80px; font-size: 80px; font-weight: 300; letter-spacing: 2px; margin-left: -30px; text-transform: uppercase; }
.icon-pen{display: inline-block; width: 70px; height: 70px; vertical-align: top;  background:url("../assets/images/pen.png") no-repeat 0 0; background-size: 100% 100%; -webkit-background-size: 100% 100%;}
.main-intro{margin-top: 30px; font-size: 20px; letter-spacing: 1px; color: #e5e5e5;}
.main-intro li{position: relative; margin: 20px 0; padding-left: 10px;}
.main-intro li:before{content: ''; position: absolute; width: 14px; height: 14px; left: -20px; top: 8px; border: 2px solid #E5E5E5; border-radius: 50%;}
/*.widget-image{position: absolute; bottom:0; right:0; width: 400px; height: 300px; margin: 0 auto;  opacity: 0.8; background: url('../assets/images/homeBg.gif') center/cover no-repeat;}*/
</style>
