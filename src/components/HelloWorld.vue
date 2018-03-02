<template>
  <div class="hello">
    <h1>{{ title }}</h1>
    <input type="text" v-model.trim="userInput" placeholder="hello world" v-on:keyup.enter="submit($event)">
    <ul>
      <li v-for="item in items"><span v-bind:class="{isFinished: item.isFinished}" v-on:click="toggleClass($event, item)">{{ item.description }}</span></li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      title: 'TODOLIST',
      items: [
        {
          description: 'coding',
          isFinished: true
        },
        {
          description: 'call back girlfriend',
          isFinished: false
        }
      ],
      userInput: ''
    }
  },
  methods: {
    toggleClass: function($event, item){
      item.isFinished = !item.isFinished
      console.log(this)
    },
    submit: function($event){
      console.log($event)
      this.userInput && this.items.push({
        description: this.userInput,
        isFinished: false
      })
      this.userInput = ''
      console.log('input:' + this.userInput)
    }
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {font-weight: normal; }
ul {list-style-type: circle; padding: 0; text-align: left;}
a {color: #42b983; }
.hello{max-width: 600px; margin: 0 auto; font-size: 20px;}
.isFinished{color: red;}
</style>
