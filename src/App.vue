<template>
  <div id="app">
    <todo-list></todo-list>
  </div>
</template>
<script>
import TodoList from './components/TodoList'

export default {
    name: 'App',
    components: {
        TodoList
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

@keyframes rotate{
  0%{
    transform: rotate(0deg)
  }
  100%{
    transform: rotate(360deg)
  }
}

/* 日期组件的样式 */ 
.date-picker-input{background: transparent; border: 0; display:none;}
.date-picker-icon{display: block; width: 20px; height: 20px;}
.date-picker-calendar{right:0;}
.date-picker-wrapper{position: absolute; color: #000; user-select: none;}
.vdp-datepicker__clear-button{position: absolute; top: -7px; right: -6px; color: #423e3e; width: 12px; height: 12px; line-height: 12px; text-align: center; border-radius: 50%; background: #fbfaf9;}

</style>
