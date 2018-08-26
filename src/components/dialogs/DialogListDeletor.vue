<template>
  <div class="dialog">
    <h3 class="header">删除清单</h3>
    <p class="body">"<span class="bold">{{ title }}</span>" 将被永久删除, 你确定执行此操作吗?</p>
    <div class="clos">
        <div class="col-40"> </div>
        <div class="col-30">
          <button class="btn-cancel" @click="closeDialog">取消</button>
        </div>
        <div class="col-30">
          <button class="btn-finish blue" @click="deleteList">确定</button>
        </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DialogListDeletor',
    props: [ 'title' ],
    data () {
      return {}
    },
    methods: {
      closeDialog () {
        this.$emit('closeDialog')
      },
      deleteList () {
        this.$emit('submit')
      }
    }
  }
</script>

<style scoped>
.dialog { width: 392px; margin: 0 auto; background: #fafafa; box-shadow: 0 1px 25px rgba(0, 0, 0, 0.2); border-radius: 3px; display: flex; flex-direction: column; overflow: hidden; font-size: 14px;
}

.dialog .header { line-height: 1; padding: 20px 20px 16px; border-bottom: 1px solid #ebebeb;}
.dialog .body { line-height: 20px; padding: 30px 20px; color: #606266; }
.bold { font-weight: 600; }

.clos { font-size: 0; display: flex; align-items: center; margin-right: -7px; padding: 8px 20px 20px;}
.clos > div { font-size: 14px;}
.clos > .col-40 { width: 40%; display: flex;}
.clos > .col-30 { width: 30%; padding: 0 7px; }

button { color: #737272; font-size: 14px; padding: 8px 12px; background: #fafafa; border: none; box-shadow: inset 0 0 0 1px #d6d6d6; border-radius: 3px; line-height: 14px; width: 100%; white-space: nowrap; overflow: hidden; cursor: pointer; font-weight: bold; user-select: none;}

button:hover { box-shadow: inset 0 0 0 1px rgba(50, 138, 214, 0.8); }
button:active { box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.15); background: #f0f0f0; }
button.blue { color: #fff; box-shadow: inset 0 0 0 1px #328ad6; background: #328ad6; }
button.blue:hover, .footer button.blue:focus { background: #5ba1de; }
button.blue:active { background: #328ad6; }
</style>

