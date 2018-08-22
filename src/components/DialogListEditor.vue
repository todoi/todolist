<template>
  <div class="dialog">
    <div class="header">
      <h3>{{ header }}</h3>
      <div class="separator">
        <input 
          class="list-title" 
          type="text" 
          placeholder="清单名称" 
          v-model.trim="titleDuplicate"
          @keypress.enter="titleDuplicate && triggerFinish()">
      </div>
    </div>

    <div class="owner">
      <div class="owner-avatar">
        <img :src="getAvatarSrc" alt="" :title="user.usename">
      </div>
      <div class="owner-meta">
        <div class="owner-name">
          <span class="owner-name-label">todoi</span>
          <div class="owner-name-badge">
            <span class="badge">所有者</span>
          </div>
        </div>
        <span class="owner-email">{{ user.email }}</span>
      </div>
    </div>

    <div class="footer">
      <div class="clos">
        <div class="col-40">
          <a 
            title="删除清单" 
            class="delete-list" 
            :class= "{ 'hidden': role !== 'changer' }"
            @click="openDialogDeletor"
          >
            <svg class="icon-trash" width="20px" height="20px">
              <use xlink:href="#icon-trash"></use>
            </svg>
          </a>
          <a title="复制清单" class="duplicate-list hidden">
            <svg class="icon-duplicate-list" width="20px" height="20px">
              <use xlink:href="#icon-duplicate-list"></use>
            </svg>
          </a>
        </div>
        <div class="col-30">
          <button class="btn-cancel" @click="closeDialog()">取消</button>
        </div>
        <div class="col-30">
          <button class="btn-finish blue" :class="{'disabled': !titleDuplicate}" @click="triggerFinish">完成</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import utils from '../lib/utils'
  export default {
    name: 'DialogListEditor',
    props: [ 'title', 'role', 'header' ],
    data () {
      return {
        titleDuplicate: this.title
      }
    },
    computed: {
      user () {
        return this.$store.state.user
      },
      getAvatarSrc () {
        return utils.getAvatarSrc(this.user.username)
      },
    },
    methods: {
      closeDialog () {
        this.$emit('closeDialog')
      },
      triggerFinish () {
        this.closeDialog()
        if (!this.titleDuplicate) {
          return 
        }
        this.$emit('finish', this.titleDuplicate)
      },
      openDialogDeletor () {
        this.closeDialog()
        this.$emit('openDialogDeletor')
      }
    }
  }
</script>

<style scoped>
.dialog { width: 392px; margin: 0 auto; background: #fafafa; box-shadow: 0 1px 25px rgba(0, 0, 0, 0.2); border-radius: 3px; display: flex; flex-direction: column; overflow: hidden; font-size: 14px;
}

.header { padding: 14px 14px 0; border-bottom: 1px solid #ebebeb; flex-shrink: 0; background: #fff; }
.header > h3 { text-align: center; }
.header .separator { margin: 14px 0; }
.header .list-title { padding: 9px 10px 10px; width: 100%; font-weight: 500; color: #262626; background: #fff; border: none; box-shadow: inset 0 0 0 1px #d6d6d6; border-radius: 3px; transition: all 0.15s ease-in-out;  }
.header .list-title:focus { box-shadow: inset 0 0 0 1px rgba(50, 138, 214, 0.8); }

.owner { height: 56px;  overflow: hidden; padding: 12px 14px; display: flex; align-items: center;}
.owner .owner-avatar { width: 32px; height: 32px; border-radius: 50%; overflow: hidden;}
.owner .owner-avatar img { width: 32px; height: 32px; }
.owner .owner-meta { padding: 0 10px; flex: 1; }
.owner .owner-meta .owner-name { display: flex; align-items: center; font-weight: bold; line-height: 16px; cursor: default; font-size: 14px; }
.owner .owner-meta .owner-name-label { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.owner .owner-meta .owner-name-badge { white-space: nowrap; margin: 0 5px; flex-shrink: 0; border: 1px solid red; padding: 3px 7px; color: #1f7bcc; border: 1px solid #328ad6; border-radius: 10px; }
.owner .owner-meta .owner-name-badge .badge { display: block; font-size: 12px; line-height: 12px; zoom: 0.7;  }
.owner .owner-meta .owner-email { font-size: 12px; color: #737272; line-height: 16px; cursor: default; }

.footer { padding: 12px; border-top: 1px solid #e0e0df; }
.footer .clos { font-size: 0; display: flex; align-items: center; }
.footer .clos > div { font-size: 14px;}
.footer .clos > .col-40 { width: 40%; display: flex;}
.footer .clos > .col-40 > a { opacity: 0.6; margin-right: 8px; }
.footer .clos > .col-40 svg { vertical-align: middle; }
.footer .clos > .col-30 { width: 30%; padding: 0 7px; }

.footer button { color: #737272; font-size: 14px; padding: 8px 12px; background: #fafafa; border: none; box-shadow: inset 0 0 0 1px #d6d6d6; border-radius: 3px; line-height: 14px; width: 100%; white-space: nowrap; overflow: hidden; cursor: pointer; font-weight: bold; user-select: none;}

.footer button:hover { box-shadow: inset 0 0 0 1px rgba(50, 138, 214, 0.8); }
.footer button:active { box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.15); background: #f0f0f0; }
.footer button.blue { color: #fff; box-shadow: inset 0 0 0 1px #328ad6; background: #328ad6; }
.footer button.blue:hover, .footer button.blue:focus { background: #5ba1de; }
.footer button.blue:active { background: #328ad6; }

.footer button.disabled { opacity: 0.5; }
</style>
