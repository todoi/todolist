// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store/index.js'

import HomePage from './components/HomePage'
import TodoPage from './components/TodoPage'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import Xyz from './components/ResetPassword'

require('./assets/css/fonts.css')
require('./assets/css/reset.css')

Vue.config.productionTip = false

const Home = { components: {HomePage}, template: '<HomePage />' }
const Todo = { components: {TodoPage}, template: '<TodoPage />' }
const Signup = { components: {SignUp}, template: '<SignUp />' }
const Signin = { components: {SignIn}, template: '<SignIn />' }
const xyz = { components: {Xyz}, template: '<Xyz />' }

const routes = {
  '/': Home,
  '/signup': Signup,
  '/login': Signin,
  '/todopage': TodoPage,
  '/p/reset': xyz
}


/* eslint-disable no-new */
var vm = new Vue({
  el: '#app',
  components: { App },
  store,
  data: {
    currentRoute: window.location.pathname
  },
  computed: {
    ViewComponent () {
      return routes[this.currentRoute]
    }
  },
  //template: '<App/>'
  render (h) {
    return h(this.ViewComponent)
  }
})
