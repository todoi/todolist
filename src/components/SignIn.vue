<template>
  <div class="login sign-type">
    <VLink href="/todolist/dist/" class="back-home">返回主页</VLink>
    <!--log in-->
    <h3>登录</h3>

    <!--Need a TodoList account?-->
    <!--Create an account-->
    <p class="signtype-tip">
      想要一个TodoList账号?<VLink class="span-underline" href="/todolist/dist/signup">去创建账号</VLink>
    </p>

    <p 
      class="clearfix" 
      :class="loginError ? 'login-incorrect-visible' : 'login-incorrect-hidden'"
    >{{ errorMessage }}

      <span class="btn-close-error" @click="close"> 
        <svg  class="octicon octicon-x" width="12" height="16">
          <use xlink:href="#icon-octicon"></use>
        </svg>
      </span>
    </p>

    <form @submit.prevent="signIn()">
      <div class="field-username">
        <!--username-->
        <label class="block-tag label-name" for="login-username">用户名</label>
        <input 
          type="text" 
          name="login-username" 
          id="login-username" 
          class="page-sign-input input-focus" 
          v-model.trim="username" 
          @input="loginError = false"
          required >
      </div>

      <div class="field-password">
        <div class="clearfix">
          <!--password-->
          <label class="label-name float-left inline-block-tag" for="login-password">密码</label>
          <div class="float-right eye-icon">
            <input 
              type="checkbox" 
              class="hide show-password" 
              name="login-show-password" 
              id="login-show-password" 
              v-model="hidePassword">
            <label 
              for="login-show-password" 
              title="Show Password" 
              class="password-icon relative cursor-pointer" 
              :class="hidePassword ? 'show-password-icon' : 'hide-password-icon'"
            > {{ hidePassword ? '显示' : '隐藏'}} </label>
           <!--{{ hidePassword ? 'show' : 'hide'}}-->
          </div>
        </div>

        <input 
          name="login-password" 
          id="login-password" 
          class="page-sign-input input-focus" 
          :type="hidePassword ? 'password' : 'text'" 
          v-model="password" 
          @input="loginError = false"
          required >

        <button 
          type="submit" 
          class="btn-login block-tag" 
          :class="submitClass" 
        > {{ btnContent }} </button>

        <div class="field-password-footer">
          <AutoLogin />
          <!--forget your password?-->
          <VLink class="span-underline" href="/todolist/dist/p/reset">忘记密码?&gt;</VLink>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import leancloud from '../lib/leancloud.js'
  import utils from '../lib/utils'
  import getErrorMessages from '../lib/getErrorMessages'
  import AutoLogin from './AutoLogin'
  import VLink from './VLink'

  export default {
    name: 'SignIn',
    components: {AutoLogin, VLink},
    created () {
      utils.goTodoPage(this.$root)
    },
    data () {
      return {
        hidePassword: true,
        username: '',
        password: '',
        submitClass: '',
        btnContent: '登 录', //Log In
        loginError: false,
        errorMessage: '',
      }
    },
    methods: {
      close() {
        this.loginError = false
      },
      switchSubmitStatus (type) { //改变按钮为等待状态
        if (type === 'loading') {
          this.submitClass = 'btn-loading'
          this.btnContent = '努力加载...' //Please Wait ...
        } else if (type === 'successful') {
          this.submitClass = ''
          this.btnContent = '登录成功' //successful
        } else if (type === 'again') {
          this.submitClass = ''
          this.btnContent = '再试一次' // Try Again
        } else {
          submitClass = '',
          btnContent = '登录'
        }
      },
      signIn () {
        this.switchSubmitStatus('loading')
        leancloud.AV.User.logIn(this.username, this.password).then((loginedUser) => {
          this.switchSubmitStatus('successful')
          utils.goTodoPage(this.$root)
        }, (error) => {
          this.errorMessage = getErrorMessages({code: error.code}) 
          // 'Incorrect username or password.'
          this.loginError = true
          this.switchSubmitStatus('again')
        });
      }
    }
  }
</script>

<style scoped>
.pages {
  text-align: center;
}

.block-tag {
  display: block;
}

.inline-block-tag {
  display: inline-block;
  vertical-align: baseline;
}

.span-underline {
  margin-left: 6px;
  vertical-align: baseline;
  cursor: pointer;
  user-select: none;
  color: rgba(0, 0, 0, 0.6);
}

.span-underline:hover {
  color: #237D93;
}

.hide {
  width: 0;
}

.relative {
  position: relative;
}

.cursor-pointer {
  cursor: pointer;
}

.input-focus:focus {
  border-color: #A6C7FD;
}

.btn-loading {
  background-image: url('../assets/images/loading-gif-button-blue.png');
  background-size: 30px;
  background-position: 15px center;
  background-repeat: no-repeat;
  padding-left: 55px;
}

.back-home {
  position: absolute;
  left: 16px;
  top: 16px;
  color: rgba(0, 0, 0, 0.6);
}

.back-home::before {
  content: '< ';
  color: rgba(0, 0, 0, 0.5);
}

.back-home:hover {
  color: #237D93;
}

.back-home:hover::before {
  color: #237D93;
}

.sign-type {
  max-width: 500px;
  min-height: 600px;
  padding: 50px;
  margin: 0 auto;
  border: 1px solid #d8dee2;
  border-radius: 5px;
  background: #fff;
  position: relative;
  top: 50px;
}

h3 {
  text-align: center;
  margin-bottom: 18px;
  font-size: 30px;
  line-height: 1.6em;
  letter-spacing: -0.029em;
  text-transform: capitalize;
}

.signtype-tip {
  font-size: 15px;
  line-height: 24px;
  margin-bottom: 30px;
}

.label-name {
  color: #484848;
  padding-bottom: .8em;
  font-weight: 600;
  user-select: none;
  text-transform: capitalize;
}

.password-icon {
  color: #237a91;
  padding-left: 30px;
  line-height: 18px;
  font-weight: 600;
  user-select: none;
}

.password-icon:before {
  position: absolute;
  left: 0;
  font-family: 'freddicons';
  speak: none;
  vertical-align: top;
  display: inline-block;
  line-height: unset;
  font-weight: normal !important;
  font-style: normal !important;
  text-transform: none !important;
  font-size: 20px !important;
  -webkit-font-smoothing: antialiased;
  -webkit-user-select: none;
  user-select: none;
}

.eye-icon {
  margin-top: .3em;
}

.show-password-icon:before {
  content: '\e054';
}

.hide-password-icon:before {
  content: '\e107';
}

.page-sign-input {
  min-height: 52px;
  width: 400px;
  margin-bottom: 2em;
  border-radius: 3px;
  background-color: #ffffff;
  border: 2px solid #c9c9c9;
  font-size: 18px;
  line-height: 20px;
  padding: 0 15px;
}

input::-webkit-input-placeholder {
  /* Chrome/Opera/Safari */
  color: #6a737d;
  letter-spacing: 1px;
  font-size: 16px;
  opacity: 0.54;
  font-weight: 300;
}

.btn-login:hover,
.btn-signup:hover {
  cursor: pointer;
  color: #ffffff;
  background-color: #4FABC3;
}

.btn-login,
.btn-signup {
  width: 400px;
  height: 48px;
  padding: 0 42px;
  margin-bottom: 30px;
  line-height: 48px;
  font-size: 18px;
  color: #ffffff;
  border: 0 none;
  border-radius: 3px;
  font-weight: 600;
  outline: 0 none;
  user-select: none;
  background-color: #52bad5;
  transition: background-color 0.2s ease-in-out 0s, opacity 0.2s ease-in-out 0s;
}

.field-password-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.field-password-footer .span-underline {
  margin: 0;
  line-height: 0;
}
/*height: 18px;*/

.login-incorrect-visible {
  position: relative;
  padding: 15px 20px;
  margin-bottom: 20px;
  font-size: 13px;
  color: #86181d;
  border-radius: 5px;
  border: 1px solid rgba(27, 31, 35, 0.15);
  background-color: #ffdce0;
  visibility: visible;
  opacity: 1;
  transition: visible 0s, opacity 0.5s linear ;
}

.login-incorrect-hidden{
  visibility: hidden;
  opacity: 0;
}

.btn-close-error {
  position: absolute;
  top: 50%;
  margin-top: -8px;
  right: 8px;
}

.octicon {
  vertical-align: text-bottom;
  fill: currentcolor;
  opacity: 0.6;
}

#signup-password {
  margin-bottom: 0;
}

.signup-tip {
  margin-top: 5px;
  margin-bottom: 30px;
  font-size: 12px;
  color: #6a737d;
  margin-left: 5px;
}

.is-autocheck-successful {
  padding-right: 30px;
  background: url('../assets/images/success.png') no-repeat right 8px center;
  background-size: 16px 16px;
}

.is-autocheck-loading {
  padding-right: 30px;
  background-image: url('../assets/images/check-loading.gif');
  background-size: 16px 16px;
  background-position: right 8px center;
  background-repeat: no-repeat;
}

.is-autocheck-errored {
  padding-right: 30px;
  border-color: #E75B41;
  background: url('../assets/images/error.png') no-repeat right 8px center;
  background-size: 16px 16px;
}

.signup-error-message {
  position: absolute;
  z-index: 1;
  top: 88px;
  max-width: 400px;
  padding: 6px 8px;
  font-size: 13px;
  color: #86181d;
  border: 1px solid;
  border-radius: 3px;
  background-color: #ffdce0;
  border-color: #cea0a5;
}

.signup-error-message:before {
  position: absolute;
  width: 0;
  height: 0;
  bottom: 100%;
  left: 10px;
  pointer-events: none;
  content: " ";
  border: 6px solid transparent;
  margin-left: -1px;
  border-bottom-color: #cea0a5;
}

.signup-error-message:after {
  position: absolute;
  width: 0;
  height: 0;
  bottom: 100%;
  left: 10px;
  pointer-events: none;
  content: " ";
  border: 5px solid transparent;
  border-bottom-color: #ffdce0;
}

.password-error-message {
  top: 105px;
}

.label-signup-error {
  color: #cb2431;
}

</style>
