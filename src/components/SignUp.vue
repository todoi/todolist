<template>
  <div class="signup sign-type">
    <VLink href="/" class="back-home">返回主页</VLink>
    <!--sign up-->
    <h3>注册</h3>
    <!--<p class="signtype-tip">Already have a TodoList account?<a class="span-underline" href="/login">Log in here</a></p>-->
    <p class="signtype-tip">已经有 TodoList 账号<VLink class="span-underline" href="/login">点击这里登录</VLink></p>

    <form @submit.prevent="signUp()" >
      <div class="field-username relative">
        <!--Username-->
        <label 
          class="label-name block-tag" 
          for="signup-username" 
          :class="{'label-signup-error': username.inputStatus === 'error'}"
        >用户名</label>

        <!--placeholder="Pick a username" -->
        <input 
          name="signup-username" 
          id="signup-username" 
          type="text" 
          placeholder="填写用户名"
          class="page-sign-input input-focus " 
          :class="classUsernameAutocheck" 
          v-model="username.content" 
          @input="validateError('username')"
          required >
        <!--@focusout="blankCheck('username')" -->
        <span 
          class="signup-error-message" 
          v-show="username.inputStatus === 'error'"
        >{{ getUsernameErrorMs }}</span>
      </div>

      <div class="field-email relative">
        <!--Email-->
        <label 
          for="signup-email" 
          class="label-name block-tag" 
          :class="{'label-signup-error': email.inputStatus === 'error'}"
        >邮箱</label>
        <input 
          name="signup-email" 
          id="signup-email" 
          type="text" 
          placeholder="you@example.com" 
          class="page-sign-input input-focus" 
          :class="classEmailAutocheck" 
          v-model="email.content" 
          @input="validateError('email')"
          required >
        <!--@focusout="blankCheck('email')" -->
        <span 
          class="signup-error-message" 
          v-show="email.inputStatus === 'error'"
        >{{ getEmailErrorMs }}</span>
      </div>

      <div class="field-password relative">
        <div class="clearfix">
          <!--password-->
          <label 
            for="signup-password" 
            class="label-name float-left inline-block-tag" 
            :class="{'label-signup-error': password.inputStatus === 'error'}"
          >密码</label>
          <div class="float-right show-password-wrapper">
            <input 
              type="checkbox" 
              class="hide show-password" 
              name="signup-show-password" 
              id="signup-show-password" 
              v-model="hidePassword" >
            <label 
              for="signup-show-password" 
              title="Show Password" 
              class="password-icon relative cursor-pointer" 
              :class="hidePassword ? 'show-password-icon' : 'hide-password-icon'" 
            >{{ hidePassword ? '显示' : '隐藏' }}</label>
            <!--hidePassword ? 'show' : 'hide'-->
          </div>
        </div>
        <!--placeholder="Create a password" -->
        <input 
          name="signup-password" 
          id="signup-password" 
          placeholder="创建密码"
          class="page-sign-input input-focus" 
          :class="classPasswordAutocheck" 
          :type="hidePassword ? 'password' : 'text'" 
          v-model="password.content" 
          @input="validateError('password')"
          required
        >
        <!--@focusout="blankCheck('password')" -->
        <!--<p class="signup-tip">Use at least one letter, one numeral, and seven characters.</p>-->
        <p class="signup-tip">至少6个字符，区分大小写, 要求有数字和字母</p>
        <span 
          class="signup-error-message password-error-message" 
          v-show="password.inputStatus === 'error'">{{ getPasswordErrorMs }}</span>
      </div>

      <button 
        type="submit" 
        class="btn-signup block-tag" 
        :class="submitClass" 
      >{{ btnContent }}</button>
    </form>
  </div>
</template>

<script>
  import leancloud from '../lib/leancloud'
  import utils from '../lib/utils'
  import getErrorMessages from '../lib/getErrorMessages'
  import VLink from './VLink'

  // inputStatus = ['successful', 'error', 'loading', 'initial'] 

  export default {
    name: 'Aba',
    components: {VLink},
    created () {
      utils.goTodoPage(this.$root)
    },
    props: ['showPage'],
    data () {
      return {
        hidePassword: true,
        username: {
          content: '',
          inputStatus: 'initial',
          errorCode: 0
        },
        password: {
          content: '',
          inputStatus: 'initial',
          errorCode: 0
        },
        email: {
          content: '',
          inputStatus: 'initial',
          errorCode: 0
        },
        submitClass: '',
        btnContent: '立即注册' //Sign up for TodoList
      }
    },
    computed: {
      getUsernameErrorMs () {
        return getErrorMessages({code: this.username.errorCode})
      },
      getEmailErrorMs () {
        return getErrorMessages({code: this.email.errorCode})
      },
      getPasswordErrorMs () {
        return getErrorMessages({code: this.password.errorCode})
      },
      classUsernameAutocheck () {
        let obj = {}
        obj[`is-autocheck-${this.username.inputStatus}`] = true
        return obj
      },
      classEmailAutocheck () {
        let obj = {}
        obj[`is-autocheck-${this.email.inputStatus}`] = true
        return obj
      },
      classPasswordAutocheck () {
        let obj = {}
        obj[`is-autocheck-${this.password.inputStatus}`] = true
        return obj
      }
    },
    methods: {
      resetSignupError (inputName) { //重置错误信息
        this[inputName].inputStatus = 'initial'
        this[inputName].errorCode = 0
      },
      validateError (inputName) { //监听input 事件函数
        this.resetSignupError(inputName)
        let errorCode = 0,
          inputObj = this[inputName], 
          content = inputObj.content

        inputObj.inputStatus = 'loading'
        utils.throttle(inputObj, () => {
          if (!content.trim()) { 
            //删除空格到开始地方不会马上提示错误 而是在失去焦点的时候提示
            this.resetSignupError(inputName)
            this.blankCheck(inputName)
            return 
          } 
          if (this.syntaxCheck(inputName)){ return } // 语法检查
          if (inputName === 'username' || inputName === 'email') { 
             //判断输入的用户名和邮箱是否已经被使用过了
            errorCode = utils.validateExist(inputName, content).then(errorCode => {
              if (errorCode) {
                inputObj.inputStatus = 'error'
                inputObj.errorCode = errorCode
              } else {
                inputObj.inputStatus = 'successful'
              }
            })
          } else {
            inputObj.inputStatus = 'successful'
          }
        }, 500)
      },
      syntaxCheck (inputName) {
        let errorCode = 0,
          capitalize = inputName.charAt(0).toUpperCase() + inputName.slice(1)
        errorCode = utils[`validate${capitalize}`](this[inputName].content)
        if(errorCode){
          this[inputName].inputStatus = 'error'
          this[inputName].errorCode = errorCode
        } 
        return errorCode ? true : false
      },
      blankCheck (inputName) { //确认是否为空格, 如果是空格，触发空格错误
        if (this[inputName].content.length === 0) {
          this.resetSignupError(inputName)
          return 
        }
        if (!this[inputName].content.trim()) {
          var checkName = this[inputName]
          checkName.inputStatus = 'error'
          if (inputName === 'username') checkName.errorCode = 703
          if (inputName === 'email')  checkName.errorCode = 803
          if (inputName === 'password') checkName.errorCode = 903
        }
      },
      switchSubmitStatus (type) { //改变按钮为等待状态
        if (type === 'loading') {
          this.submitClass = 'btn-loading'
          this.btnContent = '努力加载...' //Please Wait ...
        } else if (type === 'successful') {
          this.submitClass = ''
          this.btnContent = '注册成功' //successful
        } else if (type === 'again') {
          this.submitClass = ''
          this.btnContent = '再试一次' // Try Again
        } else {
          submitClass = '',
          btnContent = '立即注册' //Sign up for TodoList
        }
      },
      signUp () {
        this.switchSubmitStatus('loading')
        window.setTimeout(() => { //因为点击事件先触发，而验证用户输入需要时间，所以要延迟500ms 等验证结果
          if (this.alertMessage()){
            this.switchSubmitStatus('again')
            return
          }
          var user = new leancloud.AV.User();
          user.setUsername(this.username.content);
          user.setPassword(this.password.content);
          user.setEmail(this.email.content);
          user.signUp().then((loginedUser) => {
            // console.log(loginedUser);
            this.updateUserAndEmailStore(loginedUser.attributes)
              .catch(error => {
                console.log(error)
              })
              .finally(() => {
                this.switchSubmitStatus('successful')
                window.setTimeout(() => utils.goTodoPage(this.$root), 1000)
              })
          }, (error) => {
            this.switchSubmitStatus('again')
            alert(getErrorMessages({code: error.code}))
          });
        }, 500)
      },
      updateUserAndEmailStore ({username, email}) {
        var Store = leancloud.AV.Object.extend('UsernameAndEmail');
        var store = new Store();
        store.set('username', username);
        store.set('email', email);
        return store.save()
      },
      alertMessage () {
        let message = ''
        if (this.username.errorCode) message += '用户名填写错误\n'
        if (this.email.errorCode) message += '邮箱地址填写错误\n'
        if (this.password.errorCode) message += '密码填写错误'
        message && alert(message)
        return message ? true : false
      }
    }
  }
</script>

<style scoped>
* { box-sizing: border-box; margin: 0; padding: 0; }
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
  color: #237D93;
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

.show-password-wrapper {margin-top: .3em;}

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
  justify-content: space-around;
}

.field-password-footer .span-underline {
  margin: 0;
  height: 18px;
}

.login-incorrect {
  position: relative;
  padding: 15px 20px;
  margin-bottom: 20px;
  font-size: 13px;
  color: #86181d;
  border-radius: 5px;
  border: 1px solid rgba(27, 31, 35, 0.15);
  background-color: #ffdce0;
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

.is-autocheck-error {
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
