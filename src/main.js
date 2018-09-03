// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './store/index'
import icons from './assets/icons'

import HomePage from './components/HomePage'
import TodoPage from './components/TodoPage'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import ResetPassword from './components/ResetPassword'

import routes from './lib/routes'

require('./assets/css/fonts.css')
require('./assets/css/reset.css')

Vue.config.productionTip = false

let components = { 
  HomePage: {components: {HomePage}, template: '<HomePage />'},
  TodoPage: {components: {TodoPage}, template: '<TodoPage />'},
  SignUp: {components: {SignUp}, template: '<SignUp />'},
  SignIn: {components: {SignIn}, template: '<SignIn />'},
  ResetPassword: {components: {ResetPassword}, template: '<ResetPassword />'}
}

/* eslint-disable no-new */
var vm = new Vue({
  el: '#app',
  store,
  created () {
    document.body.insertAdjacentHTML('afterbegin', icons)
  },
  data: {
    currentRoute: window.location.pathname
  },
  computed: {
    ViewComponent () {
      let matchingView = routes[this.currentRoute]
      return matchingView && components[matchingView]
    }
  },
  render (h) {
    return h(this.ViewComponent)
  }
})

window.addEventListener('popstate', () => {
  vm.currentRoute = window.location.pathname
})
