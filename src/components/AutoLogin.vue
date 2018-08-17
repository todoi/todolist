<template>
  <label class="label-checkbox-remember">
    <input 
    type="checkbox" 
    class="checkbox-remember" 
    :class="checkboxRememberClass" 
    @click="rememberLogin($event)" 
    @focusin="rememberLogin($event)" 
    @focusout="rememberLogin($event)" 
    @mouseover="rememberLogin($event)" 
    @mouseout="rememberLogin($event)"> Keep me logged in
  </label>
</template>

<script>
  export default {
    name: 'Xyz',
    data () {
      return {
        checked: false,
        checkboxRememberClass: 'checkbox-remember-initial'
      }
    },
    methods: {
      rememberLogin($event) { //记住登录复选框的7种状态之间的切换
        var type = $event.type
        var classObject = {
          focus: 'checkbox-remember-focused',
          checked: 'checkbox-remember-checked',
          hover: 'checkbox-remember-hover',
          initial: 'checkbox-remember-initial',
          checkedHover: 'checkbox-remember-checked-hover',
          checkedFocus: 'checkbox-remember-checked-focused',
          checkedHoverFocus: 'checkbox-remember-checked-hover-focused'
        }
        if (type === 'focusin') {
          if (!this.checked) this.checkboxRememberClass = classObject.focus
        } else if (type === 'focusout') {
          this.checkboxRememberClass = this.checked ? classObject.checked : classObject.initial
        } else if (type === 'mouseover') {
          if (this.checkboxRememberClass === classObject.focus) { return }
          if (this.checkboxRememberClass === classObject.checkedFocus) { return this.checkboxRememberClass = classObject.checkedHoverFocus }
          this.checkboxRememberClass = this.checked ? classObject.checkedHover : classObject.hover
        } else if (type === 'mouseout') {
          if (this.checkboxRememberClass === classObject.focus) { return }
          if (this.checkboxRememberClass === classObject.checkedHoverFocus) { return this.checkboxRememberClass = classObject.checkedFocus }
          this.checkboxRememberClass = this.checked ? classObject.checked : classObject.initial
        } else if (type === 'click') {
          this.checked = !this.checked
          this.checkboxRememberClass = this.checked ? classObject.checkedFocus : classObject.focus
        }
      }
    }
  }
</script>

<style scoped>
.label-checkbox-remember {
  cursor: pointer;
  line-height: 24px;
  font-weight: 600;
  user-select: none;
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
