<template>
  <div 
    class="section section-files" 
    tabindex="0" 
    :class="{hasFiles: fileList}"
    >
    <div class="audio-recorder hidden">
      <div class="audio-recorder-container">
        <audio></audio>

        <a class="start-recording-audio" tabindex="0" title="开始/暂停录音">
          <span class="icon-file record-audio"></span>
        </a>

        <a class="play-recorded-audio disabled" tabindex="0" title="播放">
          <span class="icon-file play-audio"></span>
        </a>

        <span class="duration">00:00</span>

        <a class="clear-recorded-audio" tabindex="0" title="清除录音">
          <span class="icon-file clear-audio"></span>
        </a>

        <a class="upload-recorded-audio disabled" tabindex="0" title="上传录音">
          <span class="icon-file upload-audio"></span>
        </a>
      </div>
    </div>

    <div class="section-item files-add" @click="triggerUpload">
      <div class="section-icon add-file" tabindex="0">
        <svg class="clip" width="20" height="20">
          <use xlink:href="#icon-clip"></use>
        </svg>
      </div>

      <div class="section-content">
        <div class="section-title files-add-label">
          <span>添加一个文件</span>
        </div>
      </div>

      <!-- 录音功能暂不实现 -->
      <div class="section-attachments">
        <span class="add-sound" tabindex="0" title="添加录音">
          <svg class="speech" width="20px" height="20px">
            <use xlink:href="#icon-speech"></use>
          </svg>
        </span>
      </div>

    </div>
    <!-- <ul class="files-list"></ul> -->

    <div>
      <input 
        mutiple 
        type="file" 
        style="display:none;" 
        ref="select" 
        @change="uploadWithSDK">

      <FileList 
        :items="fileList"
        :isUploadList="false"
        @triggerDelete="deleteFile"
        />

      <FileList 
        :items="uploadingList"
        :isUploadList="true"
        @triggerDelete="deleteUploadingFile"
        @triggerControl="toggleButton"
        />
    </div>
  </div>
</template>

<script>
import utils from '../../lib/utils'
import FileList from './FileList'

let qiniu = require('qiniu-js')

export default {
  name: 'Uploadfile',
  components: {FileList},
  props: ['taskItem'],
  data(){
    return {
      uploadingList: []
    }
  },
  computed: {
    username () {
      return this.$store.state.user.username
    },
    fileList () {
      return this.$store.state.allFileMeta[this.taskItem.id]
    }
  },
  methods: {
    // 创建一个文件元数据对象
    createFileMeta () { 
      return {
        fileExtension: '', 
        fileName: '', 
        owner: this.username,
        uploadAt: 0, 
        fileSrc: '', 
        progress: 0,
        btnText: '开始上传',
      }
    },

    triggerUpload(){
      this.$refs.select.click()
    },

    uploadWithSDK (event) {
      let file = event.target.files[0]
      if (!file) return
      // let observable
      let key = file.name;
      // 添加上传dom面板
      let newFileMeta = this.createFileMeta()
      putExtra.params["x:name"] = key.split(".")[0];
      Object.assign(newFileMeta, {
        file: file,
        start: true,
        fileExtension: utils.getFileExtension(key),
        fileName: key,
        observable: undefined,
        subscription: undefined,
      })
      this.uploadingList.push(newFileMeta)

      // let subscription;
      // 调用sdk上传接口获得相应的observable，控制上传和暂停
      newFileMeta.observable = qiniu.upload(file, key, token, putExtra, config);
    },

    saveAFileMeta (item) {
      let { fileExtension, fileName, uploadAt, fileSrc, owner } = item
      let fileMeta = { fileExtension, fileName, uploadAt, fileSrc, owner }
      return this.$store.dispatch('createFileMeta', {task: this.taskItem, fileMeta})
    },

    // 设置next,error,complete对应的操作，分别处理相应的进度信息，错误信息，以及完成后的操作
    toggleButton ({item, index}) {
      let self = this
      let error = function(err) {
        item.start = true;
        item.btnText = '继续上传'
        // console.log(err);
        alert("上传出错")
      };

      let complete = function(res) {
        // console.log(res)
        item.uploadAt = new Date().getTime()
        item.fileSrc = '//pe7des760.bkt.clouddn.com/' + item.fileName
        item.btnText = '上传完成'
        self.uploadingList.splice(self.uploadingList.indexOf(item), 1)
        self.saveAFileMeta(item).then(val => {
        })
      };

      let next = function(response) {
        let total = response.total;
        item.progress = total.percent
      };

      let subObject = {
        next: next,
        error: error,
        complete: complete
      };
      if(item.start){
        item.btnText = '暂停上传'
        item.start = false;
        item.subscription = item.observable.subscribe(subObject);
      }else{
        item.start = true;
        item.btnText = '继续上传'
        item.subscription.unsubscribe();
      }
    },
    deleteFile ({item, index}) {
      this.$store.dispatch('deleteFileMeta', {fileMeta: item, index})
    },
    deleteUploadingFile ({item, index}) {
      if(item.subscription){
        item.subscription.unsubscribe()
      }
      this.uploadingList.splice(index, 1)
    },
  }
}

let token = "_t6xDtI2jd251MuNQPHSeY9vrfeUV_kK0su_OGW3:18laG5mPYATQXFwrIbiaYSs6LyI=:eyJyZXR1cm5Cb2R5Ijoie1wia2V5XCI6XCIkKGtleSlcIixcImhhc2hcIjpcIiQoZXRhZylcIixcImZzaXplXCI6JChmc2l6ZSksXCJidWNrZXRcIjpcIiQoYnVja2V0KVwiLFwibmFtZVwiOlwiJCh4Om5hbWUpXCJ9Iiwic2NvcGUiOiJ0b2RvbGlzdCIsImRlYWRsaW5lIjoxNTU5ODg2OTYyfQ=="
let domain = "http://p9vumvpee.bkt.clouddn.com"
let config = {
  useCdnDomain: true,
  disableStatisticsReport: false,
  retryCount: 6,
  region: qiniu.region.z2 //解决Error: incorrect region please use up-z2.qiniu.com的错误
};
let putExtra = {
  fname: "",
  params: {},
  mimeType: null
};

</script>

<style scoped>
.section{outline: none; position: relative; padding: 8px 0; text-align: left;}
.section-item{position: relative; outline: none; padding-left: 10px; padding-right: 10px; display: flex; align-items: center;}
.section:before{content: ''; position: absolute; bottom: 0; left: 50px; right: 0; border-bottom: 1px solid #ebebebeb;}
.section-item .section-icon, .section-item .section-attachments{align-self: flex-start; flex-shrink: 0; height: 32px; min-width: 32px; fill:#a3a3a2;}
.section-item .section-icon svg{margin: 6px;}
.section-item .section-content{flex: auto; margin: 0 8px; overflow: hidden;}
.section-item .section-title{font-size: 16px; line-height: 20px; color: #9fa2a6; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.section-item .section-edit .assign{font-size: 16px;}
.section-item .section-delete{visibility: hidden; align-self: flex-start; flex-shrink: 0; height: 32px; min-width: 32px; fill: #a3a3a2; margin-left: auto;}
.section-item:hover .section-delete{visibility: visible;}
.section-item .section-delete svg{margin: 6px; fill: #737372;}
.section-item.date .section-title{color: #328ad6;}
.section-item.date.overdue .section-title{color: #b3312d;}
.section-item.date.overdue .reminder, .section-item.date.overdue .date{fill: #b3312d;}
.section-item.date .reminder, .section-item.date .date{fill: #328ad6;}
.section-item .section-description{font-size: 12px;}
.section-files.hasFiles .section-icon svg{fill: #63b4be;}

.section-attachments{text-align: center;}
.section-attachments svg{margin: 6px;}
.section-attachments span{display: inline-block; width: 32px; height: 32px;}

.audio-recorder-container{border-radius: 3px; border: 1px solid #c9c9c9; margin:11px 0 10px;  background: #fff; text-align: center;}
.audio-recorder-container a, .audio-recorder-container .duration{vertical-align: middle;}
.audio-recorder-container span{display: inline-block;}
.icon-file{background-image: url('../../assets/images/files.png');}
.icon-file.record-audio{width: 18px; height: 18px; background-position: -129px -162px;}
.audio-recorder-container a{display: inline-block; width: 48px; padding: 10px 0; margin: 0 2px; font-size: 0; font-weight: bold; text-align: center;}
.audio-recorder-container .start-recording-audio{color: #f00;}
.audio-recorder-container .play-recorded-audio{color: #008000;}
.icon-file.play-audio{width: 18px; height: 18px; background-position: -75px -162px;}
a.disabled .play-audio{width: 18px; height: 18px; background-position: -111px -162px;}
.audio-recorder-container .duration{width: 84px; font-size: 16px; font-weight: bold; color: #737372;}
.audio-recorder-container .icon-file.clear-audio{width: 19px; height: 19px; background-position: 0 -162px;}
.cion-file.upload-audio{width: 19px; height: 19px; background-position: -19px -162px;}
a.disabled .upload-audio{width: 19px; height: 19px; background-position: -162px -137px;}

</style>


