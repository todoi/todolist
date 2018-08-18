// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store/index'
import icons from './assets/icons'

import HomePage from './components/HomePage'
import TodoPage from './components/TodoPage'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import ResetPassword from './components/ResetPassword'

import AV from './lib/leancloud'

require('./assets/css/fonts.css')
require('./assets/css/reset.css')

Vue.config.productionTip = false

const homePage = { components: {HomePage}, template: '<HomePage />' }
const todoPage = { components: {TodoPage}, template: '<TodoPage />' }
const signUp = { components: {SignUp}, template: '<SignUp />' }
const signIn = { components: {SignIn}, template: '<SignIn />' }
const resetPassword = { components: {ResetPassword}, template: '<ResetPassword />' }

const routes = {
  '/': homePage,
  '/signup': signUp,
  '/login': signIn,
  '/todopage': todoPage,
  '/p/reset': resetPassword
}


/* eslint-disable no-new */
var vm = new Vue({
  el: '#app',
  components: { App },
  store,
  created () {
    document.body.insertAdjacentHTML('afterbegin', icons)
  },
  data: {
    currentRoute: window.location.pathname
  },
  computed: {
    ViewComponent () {
      return routes[this.currentRoute]
    }
  },
  render (h) {
    return h(this.ViewComponent)
  }
})
