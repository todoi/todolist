<template>
  <div class="login sign-type">
    <a href="/" class="back-home">返回主页</a>
    <div class="reset-successful" v-if="isSuccess">
      <!--<h3>Check your email</h3>-->
      <h3>Check your email</h3>
      <svg width="65" height="64" viewBox="0 0 31 31" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g fill="none" fill-rule="evenodd"><path d="M12.902 21.79l-4.965-4.926c-.355-.35-.357-.925-.006-1.28.353-.355.926-.357 1.282-.005l3.702 3.672 8.394-8.182c.36-.35.93-.342 1.28.016.348.358.34.932-.017 1.28l-9.668 9.425" fill="#80bb35"></path><path d="M29.826 15.663c0 7.823-6.34 14.163-14.163 14.163-7.822 0-14.163-6.34-14.163-14.163C1.5 7.843 7.84 1.5 15.663 1.5c3.804 0 7.258 1.5 9.802 3.94 2.687 2.578 4.36 6.205 4.36 10.223z" stroke="#80bb35"></path></g></svg>

      <p class="reset-successful-message">我们已向你的邮箱发送一封包含重置密码的特殊链接的电子邮件, 请点击链接重置密码, 链接在 48小时内有效!</p>
      <!--<p class="reset-successful-message">you will receive a password recovery link at your email address in a few minutes.</p>-->
    </div>
    <div v-else>
      <!--<h3>reset password</h3>-->
      <h3>重置密码</h3>
      <p 
        class="clearfix" 
        :class="emailError ? 'login-incorrect-visible' : 'login-incorrect-hidden'"
        > {{ errorMessage }}
        <span class="btn-close-error" @click="close()" >
          <svg class="octicon octicon-x" height="16" width="12">
            <use xlink:href="#icon-octicon"></use>
          </svg>
        </span>
      </p>

      <form @submit.prevent="sendEmail()">
        <div class="field-email relative">
          <label 
            for="signup-email" 
            class="label-name block-tag" 
          >请输入邮箱帐号</label>
          <!--Email address-->

          <input 
            name="signup-email" 
            id="signup-email" 
            type="text" 
            placeholder="you@example.com" 
            class="page-sign-input input-focus" 
            v-model="content" 
            @input="emailError = false"
            required >
        </div>

        <button 
          type="submit" 
          class="btn-login block-tag" 
          :class="submitClass" 
        > {{ btnContent }} </button>
      </form>
    </div>

    <div class="field-password-footer">
      <!--Back to login-->
      <a class="span-underline" href="/login">返回登录页</a>
    </div>
  </div>
</template>

<script>
  import leancloud from '../lib/leancloud.js'
  import getErrorMessages from '../lib/getErrorMessages'
  export default {
    name: 'SignIn',
    data () {
      return {
        isSuccess: false,
        content: '',
        submitClass: '',
        btnContent: '发送重置密码邮件', //SEND RESET LINK
        errorMessage: '',
        emailError: false
      }
    },
    methods: {
      switchSubmitStatus (type) { //改变按钮为等待状态
        if (type === 'loading') {
          this.submitClass = 'btn-loading'
          this.btnContent = '努力加载...' //Please Wait ...
        } else if (type === 'successful') {
          this.submitClass = ''
          this.btnContent = '已发送' //successful
        } else if (type === 'again') {
          this.submitClass = ''
          this.btnContent = '再试一次' // Try Again
        } else {
          submitClass = '',
          btnContent = '确定' //SEND RESET LINK
        }
      },
      sendEmail () {
        this.switchSubmitStatus('loading')
        leancloud.AV.User.requestPasswordReset(this.content)
          .then((success) => {
            this.switchSubmitStatus('successful')
            this.isSuccess = true
          }, (error) => {
            this.emailError = true
            this.errorMessage = getErrorMessages({code: error.code})
            this.switchSubmitStatus('again')
          });
      },
      close() {
        this.emailError = false
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

.reset-successful {
  text-align: center;
}

.reset-successful-message {
  text-align: left;
  line-height: 1.5;
  font-size: 0.875em;
  color: #4a4a4a;
  margin-top: 24px;
  margin-bottom: 24px;
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
  min-height: 300px;
  padding: 50px;
  margin: 0 auto;
  border: 1px solid #d8dee2;
  border-radius: 5px;
  background: #fff;
  position: relative;
  top: 100px;
}

h3 {
  text-align: center;
  margin-bottom: 18px;
  font-size: 30px;
  line-height: 1.6em;
  letter-spacing: -0.029em;
  text-transform: capitalize;
  opacity: 0.8;
}

.label-name {
  color: #484848;
  padding-bottom: .8em;
  font-weight: 600;
  user-select: none;
  text-transform: capitalize;
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
  justify-content: center;
}

.field-password-footer .span-underline {
  margin: 0;
  height: 18px;
}

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

.label-signup-error {
  color: #cb2431;
}

</style>
