<template>
  <label class="label-checkbox-remember">
    <input 
    type="checkbox" 
    class="checkbox-remember" 
    :class="checkboxClass" 
    @click="click" 
    @focusin="focusIn" 
    @focusout="focusOut" 
    @mouseover="mouseOver" 
    @mouseout="mouseOut">记住我
  </label>
  <!--Keep me logged in-->
</template>

<script>
var classObject = {
  focus: 'checkbox-remember-focused',
  checked: 'checkbox-remember-checked',
  hover: 'checkbox-remember-hover',
  initial: 'checkbox-remember-initial',
  checkedHover: 'checkbox-remember-checked-hover',
  checkedFocus: 'checkbox-remember-checked-focused',
  checkedHoverFocus: 'checkbox-remember-checked-hover-focused'
}
export default {
  name: 'Xyz',
  data () {
    return {
      checked: false,
      checkboxClass: 'checkbox-remember-initial'
    }
  },
  methods: {
    focusIn () {
      if (!this.checked) this.checkboxClass = classObject.focus
    },
    focusOut () {
      this.checkboxClass = this.checked ? classObject.checked : classObject.initial
    },
    mouseOver () {
      if (this.checkboxClass === classObject.focus) { return }
      if (this.checkboxClass === classObject.checkedFocus) {
        return this.checkboxClass = classObject.checkedHoverFocus 
      }
      this.checkboxClass = this.checked ? classObject.checkedHover : classObject.hover
    },
    mouseOut () {
      if (this.checkboxClass === classObject.focus) { return }
      if (this.checkboxClass === classObject.checkedHoverFocus) { return this.checkboxClass = classObject.checkedFocus }
      this.checkboxClass = this.checked ? classObject.checked : classObject.initial
    },
    click () {
      this.checked = !this.checked
      console.log(0)
      this.$store.commit('setAutoLogin', this.checked)
      this.checkboxClass = this.checked ? classObject.checkedFocus : classObject.focus
    },
  }
}
</script>

<style scoped>
.label-checkbox-remember {
  cursor: pointer;
  line-height: 24px;
  font-weight: 500;
  user-select: none;
  color: rgba(0, 0, 0, 0.6);
}

.checkbox-remember {
  width: 24px;
  height: 24px;
  margin-right: 6px;
  cursor: pointer;
  vertical-align: top;
  border: 0;
  outline: 0 none;
  -webkit-appearance: none;
  overflow: hidden;
  background: url('../assets/images/checkmarks-sprite.png') no-repeat 0 0;
  background-size: 24px 384px;
}

.checkbox-remember-initial {
  background-position: 0 0;
}

.checkbox-remember-hover {
  background-position: 0 -24px;
}

.checkbox-remember-checked {
  background-position: 0 -144px;
}

.checkbox-remember-focused {
  background-position: 0 -72px;
}

.checkbox-remember-checked-focused {
  background-position: 0 -96px;
}

.checkbox-remember-checked-hover {
  background-position: 0 -120px;
}

.checkbox-remember-checked-hover-focused {
  background-position: 0 -120px;
}
</style>
