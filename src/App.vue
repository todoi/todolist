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
.clearfix:after{ content: ''; display: block; clear: both; };
.float-left{float: left;}
.float-right{float: right;}
.hidden{display: none;}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

</style>
