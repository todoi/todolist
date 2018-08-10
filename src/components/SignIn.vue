<template>
  <div class="login sign-type">
    <h3>log in</h3>
    <p class="signtype-tip">Need a TodoList account?<a class="span-underline" href="signup">Create an account</a></p>
    <p class="login-incorrect clearfix" v-show="login.loginError">{{login.errorMessage}}<span class="btn-close-error" @click="close"><svg aria-hidden="true" class="octicon octicon-x" height="16" version="1.1" viewBox="0 0 12 16" width="12"><path fill-rule="evenodd" d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48z"></path></svg></span></p>

    <div class="field-username">
      <label class="block-tag label-name" for="login-username">username</label>
      <input type="text" name="login-username" id="login-username" class="page-sign-input input-focus" v-model.trim="login.username" @focusin="()=>{this.login.loginError = false}">
    </div>

    <div class="field-password">
      <div class="clearfix">
        <label class="label-name float-left inline-block-tag" for="login-password">password</label>
        <div class="float-right">
          <input type="checkbox" class="hide show-password" name="login-show-password" id="login-show-password" v-model="hidePassword">
          <label for="login-show-password" title="Show Password" class="password-icon relative cursor-pointer" v-bind:class="hidePassword ? 'show-password-icon' : 'hide-password-icon'">{{ hidePassword ? 'show' : 'hide'}}</label>
        </div>
      </div>
      <input name="login-password" id="login-password" class="page-sign-input input-focus" v-model="login.password" v-bind:type="hidePassword ? 'password' : 'text'" @keypress.enter="btnSubmit('login')" @focusin="()=>{this.login.loginError = false}">

      <button type="submit" class="btn-login block-tag" v-bind:class="login.submitClass" @click="btnSubmit('login')">{{ login.btnContent }}</button>

      <div class="field-password-footer">
        <label class="label-checkbox-remember">
          <input type="checkbox" class="checkbox-remember" v-bind:class="checkboxRememberClass" @click="rememberLogin($event)" @focusin="rememberLogin($event)" @focusout="rememberLogin($event)" @mouseover="rememberLogin($event)" @mouseout="rememberLogin($event)"> Keep me logged in
        </label>
        <span class="span-underline">forgot your password?</span>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'SignIn',
    props: ['showPage'],
    data () {
      return {
        hidePassword: true,
        login: {
          username: 'todoi',
          password: '',
          submitClass: '',
          btnContent: 'Log In',
          loginError: false,
          errorMessage: '',
        },
        checked: false,
        checkboxRememberClass: 'checkbox-remember-initial'
      }
    },
    methods: {
      btnSubmit (submitType) {
        if (!this.login.username || this.login.loginError === '') {
          this.login.loginError = true
          return
        }
        this.innerMethods().login.call(this, submitType)
      },
      rememberLogin($event) { //记住登录复选框的7种状态之间的切换
        var type = $event.type
        var classObject = {
          focus: 'checkbox-remember-focused',
          checked: 'checkbox-remember-checked',
          hover: 'checkbox-remember-hover',
          initial: 'checkbox-remember-initial',
          checkedHover: 'checkbox-remember-checked-hover',
          checkedFocus: 'checkbox-remember-checked-focused',
          checkedHoverFocus: 'checkbox-remember-checked-hover-focused'
        }
        if (type === 'focusin') {
          if (!this.checked) this.checkboxRememberClass = classObject.focus
        } else if (type === 'focusout') {
          this.checkboxRememberClass = this.checked ? classObject.checked : classObject.initial
        } else if (type === 'mouseover') {
          if (this.checkboxRememberClass === classObject.focus) { return }
          if (this.checkboxRememberClass === classObject.checkedFocus) { return this.checkboxRememberClass = classObject.checkedHoverFocus }
          this.checkboxRememberClass = this.checked ? classObject.checkedHover : classObject.hover
        } else if (type === 'mouseout') {
          if (this.checkboxRememberClass === classObject.focus) { return }
          if (this.checkboxRememberClass === classObject.checkedHoverFocus) { return this.checkboxRememberClass = classObject.checkedFocus }
          this.checkboxRememberClass = this.checked ? classObject.checked : classObject.initial
        } else if (type === 'click') {
          this.checked = !this.checked
          this.checkboxRememberClass = this.checked ? classObject.checkedFocus : classObject.focus
        }
      },
      close() {
        this.login.loginError = false
      },
      rememberLogin($event) { //记住登录复选框的7种状态之间的切换
        var type = $event.type
        var classObject = {
          focus: 'checkbox-remember-focused',
          checked: 'checkbox-remember-checked',
          hover: 'checkbox-remember-hover',
          initial: 'checkbox-remember-initial',
          checkedHover: 'checkbox-remember-checked-hover',
          checkedFocus: 'checkbox-remember-checked-focused',
          checkedHoverFocus: 'checkbox-remember-checked-hover-focused'
        }
        if (type === 'focusin') {
          if (!this.checked) this.checkboxRememberClass = classObject.focus
        } else if (type === 'focusout') {
          this.checkboxRememberClass = this.checked ? classObject.checked : classObject.initial
        } else if (type === 'mouseover') {
          if (this.checkboxRememberClass === classObject.focus) { return }
          if (this.checkboxRememberClass === classObject.checkedFocus) { return this.checkboxRememberClass = classObject.checkedHoverFocus }
          this.checkboxRememberClass = this.checked ? classObject.checkedHover : classObject.hover
        } else if (type === 'mouseout') {
          if (this.checkboxRememberClass === classObject.focus) { return }
          if (this.checkboxRememberClass === classObject.checkedHoverFocus) { return this.checkboxRememberClass = classObject.checkedFocus }
          this.checkboxRememberClass = this.checked ? classObject.checked : classObject.initial
        } else if (type === 'click') {
          this.checked = !this.checked
          this.checkboxRememberClass = this.checked ? classObject.checkedFocus : classObject.focus
        }
      },
      innerMethods () {
        return {
          changeSubmitBtnWait (submitType) { //改变按钮为等待状态
            this[submitType].submitClass = 'btn-loading'
            this[submitType].btnContent = 'Please Wait ...'
          },
          login: function(submitType) {
            this.innerMethods().changeSubmitBtnWait(submitType)
            console.log('username', this.login.username)
            console.log('password', this.login.password)
            AV.User.logIn(this.login.username, this.login.password).then((loginedUser) => {
              this[submitType].submitClass = ''
              this[submitType].btnContent = 'successful'
              this.showPage = 'todolist'
              console.log(AV.User.current());
            }, (error) => {
              this[submitType].errorMessage = error.code === 219 ? error.rawMessage : 'Incorrect username or password.'
              this[submitType].btnContent = 'Try Again'
              this[submitType].submitClass = ''
              this.login.loginError = true
              console.dir(error)
            });
          }
        }
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
  border-bottom: 1px solid;
  vertical-align: baseline;
  color: #237D93;
  cursor: pointer;
  user-select: none;
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

.label-checkbox-remember {
  cursor: pointer;
  line-height: 24px;
  font-weight: 600;
  user-select: none;
}

.checkbox-remember {
  width: 24px;
  height: 24px;
  margin-right: 6px;
  cursor: pointer;
  vertical-align: top;
  border: 0;
  outline: 0 none;
  -webkit-appearance: none;
  overflow: hidden;
  background: url('../assets/images/checkmarks-sprite.png') no-repeat 0 0;
  background-size: 24px 384px;
}

.checkbox-remember-initial {
  background-position: 0 0;
}

.checkbox-remember-hover {
  background-position: 0 -24px;
}

.checkbox-remember-checked {
  background-position: 0 -144px;
}

.checkbox-remember-focused {
  background-position: 0 -72px;
}

.checkbox-remember-checked-focused {
  background-position: 0 -96px;
}

.checkbox-remember-checked-hover {
  background-position: 0 -120px;
}

.checkbox-remember-checked-hover-focused {
  background-position: 0 -120px;
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
