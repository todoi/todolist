<template>
  <a 
    :href="href"
    @click="go"
  >
    <slot></slot>
  </a>
</template>

<script>
import routes from '../lib/routes'
export default {
  name: 'VLink',
  props: {
    href: {
      type: String,
      required: true
    }
  },
  methods: {
    go (event) {
      event.preventDefault()
      this.$root.currentRoute = this.href
      window.history.pushState( null, routes[this.href], this.href )
    }
  }
}
</script>
