<template>
  <div class="login sign-type">
    <a href="/" class="back-home">返回主页</a>
    <h3>reset password</h3>

    <form>
      <div class="field-email relative">
        <label 
          for="signup-email" 
          class="label-name block-tag" 
          :class="{'label-signup-error': inputStatus === 'error'}"
        >Email address</label>
        <input 
          name="signup-email" 
          id="signup-email" 
          type="text" 
          placeholder="you@example.com" 
          class="page-sign-input input-focus" 
          :class="classEmailAutocheck" 
          v-model="content" 
          @input="validateError('email')"
          required >
        <span 
          class="signup-error-message" 
          v-show="inputStatus === 'error'"
        >{{ getEmailErrorMs }}</span>
      </div>

      <button 
        type="submit" 
        class="btn-login block-tag" 
        :class="submitClass" 
        @click="sendEmail()"
      >
      SEND RESET LINK
      </button>

      <div class="field-password-footer">
        <a class="span-underline" href="/login">Back to login</a>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'SignIn',
    data () {
      return {
        inputStatus: false,
        classEmailAutocheck: false,
        content: '',
        submitClass: '',
      }
    },
    computed: {
      getEmailErrorMs () {
        return this.content
      }
    },
    methods: {
      sendEmail () {
        return ''
      },
      validateError () {
        return ''
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

.label-signup-error {
  color: #cb2431;
}

</style>
