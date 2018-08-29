<template>
  <ul class="files-list">
    <li 
      class="section-item section-item-file image" 
      v-for="(item, index) in items"
    >
      <div class="section-icon"></div>
      <div class="section-content section-content-file" tabindex="0">
        <div class="file-preview">
          <div class="file-extension">{{ item.fileExtension }}</div>
        </div>

        <div class="file-info">
          <a 
            class="file-name" 
            :title="item.fileName"
            :target="!isUploadList && '_blank'"
            :href="!isUploadList ? item.fileSrc : '#'" 
          >{{ item.fileName }}</a>

          <div class="file-progress" :class="{active: isUploadList}">
            <div class="bar" :style="'width: ' + item.progress + '%'"></div>
          </div>

          <div class="file-meta" :title="formatDate(item.uploadAt)" v-if="!isUploadList" >
            <span class="creator left">
              <div class="avatar tiny" :title="username">
                <img :src="getAvatarSrc">
              </div>
            </span>

            <span class="ago">{{ formatDate(item.uploadAt )}}</span>
            <!-- <span class="waiting"> ·
              <text rel="upload_file_not_synced_yet">未同步</text>
              </span> -->
          </div>
        </div>

        <div class="control-container" v-if="isUploadList">
          <button 
            class="btn btn-default control-upload" 
            @click="$emit('triggerControl', {item, index})"
            >{{ item.btnText }}</button>
        </div>

        <a 
          class="file-delete" 
          data-key-title="button_delete" 
          title="删除" 
          @click="$emit('triggerDelete', {item, index})"
          >
          <svg class="delete" width="20px" height="20px">
            <use xlink:href="#icon-delete"></use>
          </svg>
        </a>

      </div>
    </li>
  </ul>
</template>

<script>
import utils from '../../lib/utils'

export default {
  name: 'Xyz',
  props: ['items', 'isUploadList'],
  data () {
    return {
    }
  },
  computed: {
    username () {
      return this.$store.state.user.username
    },
    getAvatarSrc () {
      return utils.getAvatarSrc(this.username)
    }
  },
  methods: {
    formatDate (timeStamp) {
      return utils.showDuration(timeStamp) + ' 之前'
    },
  }
}
</script>

<style scoped>
.files-list li{overflow: hidden;}
.section-item{padding-left: 10px; padding-right: 10px; position: relative; display: flex; align-items: center;}
.section-item.section-item-file{margin: 8px 0;}

.section-item .section-icon{align-self: flex-start; flex-shrink: 0; height: 32px; min-width: 32px; fill: #a3a3a2;}
.section-item .section-content{flex: auto; margin-right: 8px; margin-left: 8px; overflow:hidden;}
.section-content-file{position: relative; border-radius: 3px; display: flex; align-items: center;}

.file-preview{width: 40px; height: 40px;}
.file-preview .file-extension{text-align: center; color: #f7f7f7; text-transform: uppercase; font-size: 12px; height: 40px; width: 40px; padding-top: 15px; box-sizing: border-box; background: #63b4be;}

.file-info{margin: 0 10px; flex: 1; overflow: hidden;}
.file-info .file-name{font-size: 14px; font-weight: bold; color: #262626; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: block;}
.file-info .file-progress{display: none; height: 6px; border-radius: 8px; border: 1px solid #9bb6d1; margin-top: 9px;}
.file-info .file-progress .bar{transition: 1ms width ease-in; background: #ccdae6; height: 100%; width: 20%; border-radius: 1px;}
.file-info .file-progress.active{display:block;}

.file-info .file-meta{display: flex; align-items: center; color: #737272; white-space: nowrap; overflow:hidden; text-overflow: ellipsis;}
.left{float: left;}
.avatar{position: relative; display: block; width: 25px; height: 25px;}
.avatar img{border-radius: 50%; overflow:hidden; z-index: 1;}
.avatar.tiny{width: 15px; height: 15px;}
.avatar.tiny img{width: 15px; height: 15px;}
.file-info .file-meta .ago,.file-info .file-meta .waiting{display:inline-block; vertical-align: top; font-size: 12px; margin: 0 6px;}
.file-info .file-meta .waiting{font-weight: bold; display:none;}

.file-delete{margin: 0 5px; fill: #262626; opacity: 0;}
.section-content-file:hover .file-delete{opacity: 1; filter:none;}
.section-content-file::after{content: ''; position: absolute; top:0; border: 1px solid rgba(0, 0, 0, 0.1); bottom: 0; left: 0; right: 0; border-radius: 3px; pointer-events: none;}

.control-container{float: left; width: 22%; box-sizing: border-box;}
.btn{display: inline-block; padding: 4px 5px; margin-bottom: 0; font-size: 14px; font-weight: normal; text-align: center; white-space: nowrap; vertical-align: middle; cursor: pointer; background-image: none; border: 1px solid transparent; border-radius: 4px; user-select: none;}
.btn-default{color: #333; background-color: #fff; border-color: #ccc;}
.control-upload{line-height: 14px;}
.btn-default:hover{color: #333; background-color: #ebebeb; border: #adadad; text-decoration:none;}
.btn:active{outline: 0; box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);}
</style>
