<template>
  <div class="pages">
    <home-page></home-page>
    <section id="sign-page">
      <div class="login sign-type" v-if="loginOrSignup === 'login'">
        <h3>log in</h3>
        <p class="signtype-tip">Need a TodoList account?<span class="span-underline" @click="toggleSignType">Create an account</span></p>
        <p class="login-incorrect clearfix" v-show="!isClosed">Incorrect username or password. <span class="float-right" @click="close"><svg aria-hidden="true" class="octicon octicon-x" height="16" version="1.1" viewBox="0 0 12 16" width="12"><path fill-rule="evenodd" d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48z"></path></svg></span></p>
        <div class="field-username">
          <label class="block-tag label-name" for="login-username">username</label>
          <input type="text" name="login-username" id="login-username" class="page-sign-input input-focus" v-model.lazy.trim="login.username">
        </div>
        <div class="field-password">
          <div class="clearfix">
            <label class="label-name float-left inline-block-tag" for="login-password">password</label>
            <div class="float-right">
              <input type="checkbox" class="hide show-password" name="login-show-password" id="login-show-password" v-model="hidePassword">
              <label for="login-show-password" title="Show Password" class="password-icon relative cursor-pointer" v-bind:class="hidePassword ? 'show-password-icon' : 'hide-password-icon'">{{ hidePassword ? 'show' : 'hide'}}</label>
            </div>
          </div>
          <input v-model.lazy="login.password" v-bind:type="hidePassword ? 'password' : 'text'" name="login-password" id="login-password" class="page-sign-input input-focus">
          <button type="submit" class="btn-login block-tag" v-bind:class="login.submitClass" @click="loginSubmit">{{ login.btnContent }}</button>
          <div class="field-password-footer">
            <label class="label-checkbox-remember">
              <input type="checkbox" class="checkbox-remember" v-bind:class="checkboxRememberClass" @click="toggleCheckboxBg" @focusin="focusinCheckboxRemember" @focusout="focusoutCheckboxRemember" @mouseover="mouseoverCheckboxRemember" @mouseout="mouseoutCheckboxRemember" > Keep me logged in
            </label>
            <span class="span-underline">forgot your password?</span>
          </div>
        </div>
      </div>

      <div class="signup sign-type" v-if="loginOrSignup === 'signup'">
        <h3>sign up</h3>
        <p class="signtype-tip">Already have a TodoList account?<span class="span-underline" @click="toggleSignType">Log in here</span></p>
        <div class="field-username relative">
          <label class="label-name block-tag" for="signup-username" v-bind:class="{'label-signup-error': isCheck.username.error}">Username</label>
          <input name="signup-username" id="signup-username" type="text" placeholder="Pick a username" class="page-sign-input input-focus " v-model.trim="signup.username.content" v-bind:class="{'is-autocheck-successful': isCheck.username.successful, 'is-autocheck-errored': isCheck.username.error, 'is-autocheck-loading': isCheck.username.loading}">
          <span class="signup-error-message" v-show="isCheck.username.error">{{isCheck.username.errorMessage}}</span>
        </div>
        <div class="field-email relative">
          <label class="label-name block-tag" for="signup-email" v-bind:class="{'label-signup-error': isCheck.email.error}">Email</label>
          <input name="signup-email" id="signup-email" type="text" placeholder="you@example.com" class="page-sign-input input-focus" v-model.trim="signup.email.content" v-bind:class="{'is-autocheck-successful': isCheck.email.successful, 'is-autocheck-errored': isCheck.email.error, 'is-autocheck-loading': isCheck.username.loading}">
          <span class="signup-error-message" v-show="isCheck.email.error">Email is invalid or already taken</span>
        </div>
        <div class="field-password relative">
          <div class="clearfix">
            <label class="label-name float-left inline-block-tag" for="signup-password" v-bind:class="{'label-signup-error': isCheck.password.error}">password</label>
            <div class="float-right">
              <input type="checkbox" class="hide show-password" name="signup-show-password" id="signup-show-password" v-model="hidePassword">
              <label for="signup-show-password" title="Show Password" class="password-icon relative cursor-pointer" v-bind:class="hidePassword ? 'show-password-icon' : 'hide-password-icon'">{{ hidePassword ? 'show' : 'hide'}}</label>
            </div>
          </div>
          <input name="signup-password" id="signup-password" placeholder="Create a password" class="page-sign-input input-focus" v-model="signup.password.content" v-bind:type="hidePassword ? 'password' : 'text'" v-bind:class="{'is-autocheck-successful': isCheck.password.successful, 'is-autocheck-errored': isCheck.password.error, 'is-autocheck-loading': isCheck.password.loading}" >
          <p class="signup-tip">Use at least one letter, one numeral, and seven characters.</p>
          <span class="signup-error-message password-error-message" v-show="isCheck.password.error">Password is too short (minimum is 7 characters) and needs at least one number</span>
        </div>
        <button type="submit" class="btn-signup block-tag" v-bind:class="signup.submitClass" @click="signupSubmit">{{ signup.btnContent }}</button>
      </div>
    </section>

    <todo-page></todo-page>
  </div>
</template>
<script>
  import HomePage from './HomePage'
  import TodoPage from './TodoPage'
export default {
  name: 'TodoList',
  data() {
    return {
      loginOrSignup: 'signup',
      isClosed: '',
      hidePassword: true,
      login: {
        username: '',
        password: '',
        submitClass: '',
        btnContent: 'Log In'
      },
      signup: {
        username: {
          content: '',
          timer: null
        },
        password: {
          content: '',
          timer: null
        },
        email: {
          contern: '',
          timer: null
        },
        submitClass: '',
        btnContent: 'Sign up for TodoList'
      },
      isCheck: {
        username: {
          successful: false,
          error: false,
          loading: false,
          errorType:{
            existError: 'Username is already taken',
            syntaxError: 'Username may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen'
          },
          errorMessage: 'Username is already taken'
        },
        email: {
          successful: false,
          error: true,
          loading: false
        },
        password: {
          successful: true,
          error: false,
          loading: false
        }
      },
      checked: false,
      checkboxRememberClass: 'checkbox-remember-initial'
    }
  },
  watch: {
    'signup.username.content': function(){
      this.resetSignupError('username')
      var usernameCheck = this.isCheck.username
      var username = this.signup.username
      this.lazyLoad(username, function(){
        usernameCheck.loading = true
        var isSyntaxError = !(/^[a-zA-Z0-9_]{3,16}$/.test(username.content))
        if(isSyntaxError){
          usernameCheck.loading = false
          usernameCheck.error = true
          usernameCheck.errorMessage = usernameCheck.errorType.syntaxError
        }else{
          usernameCheck.loading = false
          usernameCheck.successful = true
        }
      }, 500)
    },
    'signup.email.content': function(){
      this.lazyLoad(this.signup.email, function(){
        console.log(2)
      }, 500)
    },
    'signup.password.content': function(){
      this.lazyLoad(this.signup.password, function(){
        console.log(3)
      }, 500)
    }
  },
  methods:{
    toggleSignType: function(){
      switch (this.loginOrSignup){
        case 'signup':
          this.loginOrSignup =  'login'
          break
        case 'login':
          this.loginOrSignup = 'signup'
          break
        default:
          this.loginOrSignup = 'signup'
          break
      }
      this.hidePassword = true
    },
    close: function(){
      this.isClosed = true
    },
    toggleCheckboxBg: function(){
      this.checked = !this.checked
      if(!this.checked){
        this.focusinCheckboxRemember()
      }else if(this.checked){
        if(this.checkboxRememberClass === 'checkbox-remember-focused') this.checkboxRememberClass = 'checkbox-remember-checked-focused'
      }
    },
    focusinCheckboxRemember: function(){
      if(!this.checked) this.checkboxRememberClass = 'checkbox-remember-focused'
    },
    focusoutCheckboxRemember: function(){
      this.checkboxRememberClass = this.checked ? 'checkbox-remember-checked' : 'checkbox-remember-initial'
    },
    mouseoverCheckboxRemember: function(){
      this.checkboxRememberClass = this.checked ? 'checkbox-remember-checked-hover' : 'checkbox-remember-hover'
    },
    mouseoutCheckboxRemember: function(){
      this.checkboxRememberClass = this.checked ? 'checkbox-remember-checked' : 'checkbox-remember-initial'
    },
    loginSubmit: function(){
      this.login.submitClass = 'btn-loading'
      this.login.btnContent = 'Please Wait ...'
    },
    signupSubmit: function(){
      this.signup.submitClass = 'btn-loading'
      this.signup.btnContent = 'Please Wait ...'
    },
    lazyLoad: function(inputObject, callback, delay){
      if (inputObject.timer){
        window.clearTimeout(inputObject.timer)
      }
      inputObject.timer = window.setTimeout(function(){
        callback()
      }, delay)
    },
    resetSignupError: function (inputName){
      this.isCheck[inputName].successful = ''
      this.isCheck[inputName].error = ''
      this.isCheck[inputName].loading = ''
    }
  },
  components: {
    HomePage, TodoPage
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pages {text-align: center; }
.block-tag {display: block; }
.inline-block-tag{display: inline-block; vertical-align: baseline;}
.span-underline{margin-left: 6px; border-bottom: 1px solid; vertical-align: baseline; color: #237D93; cursor: pointer; user-select: none; }
.hide{width: 0;}
.relative{position: relative;}
.cursor-pointer{cursor:pointer;}
.input-focus:focus{border-color: #A6C7FD;}
.btn-loading{background-image: url('../assets/images/loading-gif-button-blue.png'); background-size: 30px; background-position: 15px center; background-repeat: no-repeat; padding-left: 55px;}

#sign-page {background: #F8F8F8; height: 100vh; text-align: left; }
#sign-page .sign-type {max-width: 500px; min-height: 600px; padding: 50px; margin: 0 auto; border: 1px solid #d8dee2; border-radius: 5px; background: #fff; position: relative; top: 50px;}
#sign-page h3 {text-align: center; margin-bottom: 18px; font-size: 30px; line-height: 1.6em; letter-spacing: -0.029em; text-transform: capitalize; }
.signtype-tip {font-size: 15px; line-height: 24px; margin-bottom: 30px; }
.label-name {color: #484848; padding-bottom: .8em; font-weight: 600; user-select: none; text-transform: capitalize; }
.password-icon{color: #237a91; padding-left: 30px; line-height: 18px; font-weight: 600; user-select: none;}
.password-icon:before{position: absolute; left: 0; font-family: 'freddicons'; speak: none; vertical-align: top; display: inline-block; line-height: unset; font-weight: normal !important; font-style: normal !important; text-transform: none !important; font-size: 20px !important; -webkit-font-smoothing: antialiased; -webkit-user-select: none; user-select: none;}
.show-password-icon:before{content: '\e054';}
.hide-password-icon:before{content: '\e107';}
.page-sign-input{min-height: 52px; width: 400px; margin-bottom: 2em; border-radius: 3px; background-color: #ffffff; border: 2px solid #c9c9c9; font-size: 18px; line-height: 20px; padding: 0 15px; }
#sign-page input::-webkit-input-placeholder { /* Chrome/Opera/Safari */ color:#6a737d; letter-spacing: 1px; font-size: 16px; opacity:0.54; font-weight: 300; }
.btn-login:hover, .btn-signup:hover{cursor: pointer; color: #ffffff; background-color: #4FABC3;}
.btn-login, .btn-signup{width: 400px; height: 48px; padding: 0 42px; margin-bottom: 30px; line-height: 48px; font-size: 18px; color: #ffffff; border: 0 none; border-radius: 3px; font-weight: 600; outline: 0 none; user-select: none; background-color: #52bad5; transition: background-color 0.2s ease-in-out 0s, opacity 0.2s ease-in-out 0s;}
.field-password-footer{display: flex; align-items: center; justify-content: space-around;}
.label-checkbox-remember{cursor: pointer; line-height: 24px; font-weight: 600; user-select: none;}
.checkbox-remember{width: 24px; height: 24px; margin-right:6px; cursor: pointer; vertical-align: top; border: 0; outline: 0 none; -webkit-appearance: none; overflow: hidden; background:url('../assets/images/checkmarks-sprite.png') no-repeat 0 0; background-size: 24px 384px;}
.checkbox-remember-initial{background-position: 0 0;}
.checkbox-remember-hover{background-position: 0 -24px;}
.checkbox-remember-checked{background-position: 0 -144px;}
.checkbox-remember-focused{background-position: 0 -72px;}
.checkbox-remember-checked-focused{background-position: 0 -96px;}
.checkbox-remember-checked-hover{background-position: 0 -120px;}
.field-password-footer .span-underline{margin:0; height: 18px;}
.login-incorrect{padding: 15px 20px; margin-bottom: 20px; font-size: 13px; color: #86181d; border-radius: 5px; border:1px solid rgba(27,31,35,0.15); background-color: #ffdce0;}
.octicon{vertical-align: text-bottom; fill: currentcolor; opacity: 0.6;}

#signup-password{margin-bottom: 0;}
.signup-tip{margin-top: 5px; margin-bottom: 30px; font-size: 12px; color: #6a737d; margin-left: 5px;}
.is-autocheck-successful{padding-right: 30px; background:url('../assets/images/success.png') no-repeat right 8px center; background-size: 16px 16px; }
.is-autocheck-loading{padding-right: 30px; background-image: url('../assets/images/check-loading.gif'); background-size: 16px 16px; background-position: right 8px center; background-repeat: no-repeat;}
.is-autocheck-errored{padding-right: 30px; background:url('../assets/images/error.png') no-repeat right 8px center; background-size: 16px 16px; }
.signup-error-message{position: absolute; z-index: 1; top: 88px; max-width: 400px; padding: 6px 8px; font-size: 13px; color: #86181d; border: 1px solid; border-radius: 3px; background-color: #ffdce0; border-color: #cea0a5;}
.signup-error-message:before{position: absolute; width: 0; height: 0; bottom: 100%; left: 10px; pointer-events: none; content: " "; border: 6px solid transparent; margin-left: -1px; border-bottom-color: #cea0a5;}
.signup-error-message:after{position: absolute; width: 0; height: 0; bottom: 100%; left: 10px; pointer-events: none; content: " "; border: 5px solid transparent; border-bottom-color: #ffdce0;}
.password-error-message{top: 105px;}
.label-signup-error{color:#cb2431;}

</style>
