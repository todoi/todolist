<template>
  <div class="pages">
    <section id="page-home" style="display: none;">
      <div class="topbar clearfix">
        <label class="topbar-label topbar-login">
          <input type="radio" name="sign-type" value="login">登录</label>
        <label class="topbar-label topbar-signup">
          <input type="radio" name="sign-type" value="signup">注册</label>
      </div>
    </section>
    <section id="page-sign">
      <div class="login sign-type">
        <h3>log in</h3>
        <p class="signtype-tip">Need a MailChimp account?<span class="span-underline">Create an account</span></p>
        <div class="field-username">
          <label class="block-tag label-name" for="login-username">username</label>
          <input type="text" name="login-username" id="login-username" class="page-sign-input">
        </div>
        <div class="field-password">
          <div class="clearfix">
            <label class="label-name float-left inline-block-tag" for="login-password">password</label>
            <div class="float-right">
              <input type="checkbox" class="hide show-password" name="login-show-password" id="login-show-password">
              <label for="login-show-password" title="Show Password" class="password-icon hide-password-icon relative cursor-pointer">Show</label>
            </div>
          </div>
          <input type="password" name="login-password" id="login-password" class="page-sign-input">
          </label>
          <button type="submit" class="btn-login block-tag">Log In</button>
          <div class="field-password-footer">
            <label class="label-checkbox-remember">
              <input type="checkbox" class="checkbox-remember checkbox-remember-initial"> Keep me logged in
            </label>
            <span class="span-underline">forgot your password?</span>
          </div>
        </div>
      </div>

      <div class="signup sign-type" style="display: none">
        <h3>sign up</h3>
        <p class="signtype-tip">Already have a MailChimp account?<span class="span-underline">Log in here</span></p>
        <div class="field-username">
          <label class="label-name block-tag" for="signup-username">Username</label>
          <input class="" name="signup-username" id="signup-username" type="text" placeholder="Pick a username" class="page-sign-input">
        </div>
        <div class="field-email">
          <label class="label-name block-tag" for="signup-email">Email</label>
          <input class="" name="signup-email" id="signup-email" type="text" placeholder="you@example.com" class="page-sign-input">
        </div>
        <div class="field-password">
          <div class="clearfix">
            <label class="label-name float-left inline-block-tag" for="signup-password">password</label>
            <div class="float-right">
              <input type="checkbox" class="hide show-password" name="signup-show-password" id="signup-show-password">
              <label for="signup-show-password" title="Show Password" class="password-icon show-password-icon relative cursor-pointer">Show</label>
            </div>
          </div>
          <input class="" name="signup-password" id="signup-password" type="password" placeholder="Create a password" class="page-sign-input">
          <p class="signup-tip">Use at least one letter, one numeral, and seven characters.</p>
        </div>
        <button type="submit" class="btn-signup block-tag">Sign up for TodoList</button>
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
.pages {text-align: center; }
.block-tag {display: block; }
.inline-block-tag{display: inline-block; vertical-align: baseline;}
.span-underline {margin-left: 6px; border-bottom: 1px solid; vertical-align: baseline; color: #237D93; cursor: pointer; }
.hide{width: 0;}
.relative{position: relative;}
.cursor-pointer{cursor:pointer;}


#page-home {}
.topbar {height: 60px; padding: 0 100px; box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.066); }
.topbar-label {float: right; line-height: 60px; }
.topbar-label>input {width: 0; }
.topbar-login {padding: 0 24px; color: #3a3a3a; font-weight: 600; }
.topbar-login:hover {background: #f5f5f5; }
.topbar-signup {padding: 0 50px; line-height: 40px; margin-top: 10px; -webkit-font-smoothing: antialiased; border-radius: 4px; transition: all 0.2s ease; color: #fff; background: #52bad5; }
.topbar-signup:hover {background: #2c9ab7; }

#page-sign {background: #F8F8F8; height: 100vh; text-align: left; }
#page-sign .sign-type {max-width: 500px; min-height: 600px; padding: 50px; margin: 0 auto; border: 1px solid #d8dee2; border-radius: 5px; background: #fff; position: relative; top: 50px;}
#page-sign h3 {text-align: center; margin-bottom: 18px; font-size: 30px; line-height: 1.6em; letter-spacing: -0.029em; text-transform: capitalize; }
.signtype-tip {font-size: 15px; line-height: 24px; margin-bottom: 30px; }
.label-name {color: #484848; padding-bottom: .8em; font-weight: 600; user-select: none; text-transform: capitalize; }
.password-icon{color: #237a91; padding-left: 30px; line-height: 18px; font-weight: 600;}
.password-icon:before{position: absolute; left: 0; font-family: 'freddicons'; speak: none; vertical-align: top; display: inline-block; line-height: unset; font-weight: normal !important; font-style: normal !important; text-transform: none !important; font-size: 20px !important; -webkit-font-smoothing: antialiased; -webkit-user-select: none; user-select: none;}
.show-password-icon:before{content: '\e054';}
.hide-password-icon:before{content: '\e107';}
.page-sign-input{min-height: 52px; width: 400px; margin-bottom: 2em; border-radius: 3px; background-color: #ffffff; border: 2px solid #c9c9c9; font-size: 18px; line-height: 20px; padding: 0 15px; }
#page-sign input::-webkit-input-placeholder { /* Chrome/Opera/Safari */ color:#6a737d; letter-spacing: 1px; font-size: 16px; opacity:0.54; font-weight: 300; }
.btn-login:hover, .btn-signup:hover{cursor: pointer; color: #ffffff; background-color: #3db2d0;}
.btn-login, .btn-signup{width: 400px; height: 48px; padding: 0 42px; margin-bottom: 30px; line-height: 48px; font-size: 18px; color: #ffffff; border: 0 none; border-radius: 3px; font-weight: 600; user-select: none; background-color: #52bad5; transition: background-color 0.2s ease-in-out 0s, opacity 0.2s ease-in-out 0s;}
.field-password-footer{display: flex; align-items: center; justify-content: space-around;}
.label-checkbox-remember{cursor: pointer; line-height: 24px; font-weight: 600;}
.checkbox-remember{width: 24px; height: 24px; margin-right:6px; cursor: pointer; vertical-align: top; border: 0; outline: 0 none; -webkit-appearance: none; overflow: hidden; background:url('../assets/images/checkmarks-sprite.png') no-repeat 0 0; background-size: 24px 384px;}
.checkbox-remember-initial{background-position: 0 0;}
.checkbox-remember-checked{background-position: 0 -144px;}
.checkbox-remember-focusing{background-position: 0 -72px;}
.field-password-footer .span-underline{margin:0; height: 18px;}
#signup-password{margin-bottom: 0;}
.signup-tip{margin-top: 5px; margin-bottom: 30px; font-size: 12px; color: #6a737d; margin-left: 5px;}


#page-todo {}

</style>
