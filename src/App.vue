<template>
  <div class="pages">
    <section>
      <home-page v-show="showPage === 'homePage'" v-on:change-page="changePage"></home-page>
    </section>
    <section class="sign-page" v-show="showPage === 'login' || showPage === 'signup'">
      <sign-up :showPage="showPage"></sign-up>
      <sign-in :showPage="showPage"></sign-in>
    </section>
    <section>
      <todo-page v-show="showPage === 'todolist'" :username="login.username"></todo-page>
    </section>
  </div>
</template>
<script>
import HomePage from './components/HomePage'
import TodoPage from './components/TodoPage'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'


export default {
  name: 'App',
  components: { HomePage, TodoPage, SignUp, SignIn },
  data () {
    return {
      showPage: 'homePage',
      login: {
        username: 'todoi'
      }
    }
  },
  methods: {
    changePage: function(pageName) {
      this.showPage = pageName
    }
  }
}
</script>

<style>
html{ font-family: "Helvetica Neue",Arial,Helvetica,sans-serif; font-size: 16px;}
*{ margin: 0; padding: 0; box-sizing: border-box; }
:before, :after{ box-sizing: border-box; }
ul,ol{ list-style: none; }
a{text-decoration: none; color: inherit; cursor: pointer; outline: none;}
.clearfix:after{ content: ''; display: block; clear: both; };
.float-left{float: left;}
.float-right{float: right;}
.hidden{display: none !important; outline: 0; box-shadow: none;}
.disabled{pointer-events: none;}
.chromeless{border: none; box-shadow: none; background: none; border-radius: 0; padding: 0; line-height: 20px;}
.chromeless:focus{outline: 0;}
.transparent{opacity: 0 !important; pointer-events: none;}
.invisible{visibility: hidden;}
*:focus{outline: none;}
*::-webkit-scrollbar{width: 6px;}
*::-webkit-scrollbar-corner{background: transparent;}
*::-webkit-scrollbar-button:start:decrement, *::-webkit-scrollbar-button:end:increment{height: 0; background-color: transparent;}
*::-webkit-scrollbar-thumb:vertical{border-radius: 6px; background-color: rgba(0, 0, 0, 0.2);}
div[tabindex]{outline: none;}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.sign-page {
  background: #F8F8F8;
  height: 100vh;
  text-align: left;
}

@keyframes rotate{
  0%{
    transform: rotate(0deg)
  }
  100%{
    transform: rotate(360deg)
  }
}

/* 在 task 组件中日期组件的样式 */ 
.date-picker-input{background: transparent; border: 0; display:none;}
.date-picker-icon{display: block; width: 20px; height: 20px;}
.date-picker-calendar{right:0;}
.date-picker-wrapper{position: absolute; color: #000; user-select: none;}
.vdp-datepicker__clear-button{position: absolute; top: -7px; right: -6px; color: #423e3e; width: 12px; height: 12px; line-height: 12px; text-align: center; border-radius: 50%; background: #fbfaf9;}

/* 在 taskdetail 组件中日期组件的样式 */ 
.date-picker-input-taskdetail{background: transparent; border: 0; display:none;}
.date-picker-icon-taskdetail{position: absolute; width: 100%; height: 100%; top: 0; left: 0;}
.date-picker-calendar-taskdetail{width:18vw; top: 90%; left: 50%; transform: translate(-50%);}
.date-picker-wrapper-taskdetail{position: absolute; color: #000; user-select: none; top: 0; right: 40px; width: 100%; height: 100%; 
  border-radius: 8px; }
.calender-trigon{position: absolute; z-index: 99; width: 0; height: 0; top: 19px; left:50%; transform: translateX(-50%); border: 12px solid transparent; }
.calender-trigon.trigon1{ border-bottom-color: #ccc; -webkit-filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));}
.calender-trigon.trigon2{ border-bottom-color: #fff ; z-index: 101; top: 20px;}

</style>
