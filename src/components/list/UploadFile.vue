<template>
<div>
  <input type="file" mutiple style="display:none;" ref="select" @change="uploadWithSDK">
  <ul class="files-list" id="files-list">
    <li class="section-item section-item-file image" v-for="(item, index) in fileList">
      <div class="section-icon"></div>
      <div class="section-content section-content-file" tabindex="0" >
        <div class="file-preview">
          <div class="file-extension">{{ item.fileExtension }}</div>
        </div>
        <div class="file-info">
          <a class="file-name" :title="item.fileName" :href="item.fileSrc" target="_blank">{{ item.fileName }}</a>
          <div class="file-progress">
            <div class="bar"></div>
          </div>
          <div class="file-meta" :title="formatDate(item.uploadDate)">
            <span class="creator left">
              <div class="avatar tiny" :title="item.creatorName">
                <img :src="item.creatorAvatar">
              </div>
            </span>
            <span class="ago">{{ formatDate(item.uploadDate )}}</span>
            <!-- <span class="waiting"> ·
              <text rel="upload_file_not_synced_yet">未同步</text>
            </span> -->
          </div>
        </div>
        <a class="file-delete" data-key-title="button_delete" title="删除" @click="deleteFile(item, index)">
          <svg class="delete" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="delete"> <path d="M10.72,9.9975 L13.86,6.8575 C14.04,6.6575 14.04,6.3375 13.86,6.1375 C13.66,5.9575 13.34,5.9575 13.14,6.1375 L10,9.2775 L6.86,6.1375 C6.66,5.9575 6.34,5.9575 6.14,6.1375 C5.96,6.3375 5.96,6.6575 6.14,6.8575 L9.28,9.9975 L6.14,13.1375 C5.96,13.3375 5.96,13.6575 6.14,13.8575 C6.24,13.9575 6.38,13.9975 6.5,13.9975 C6.62,13.9975 6.76,13.9575 6.86,13.8575 L10,10.7175 L13.14,13.8575 C13.24,13.9575 13.38,13.9975 13.5,13.9975 C13.62,13.9975 13.76,13.9575 13.86,13.8575 C14.04,13.6575 14.04,13.3375 13.86,13.1375 L10.72,9.9975 Z" id="4"></path> </g> </g>
          </svg>
        </a>
      </div>
    </li>
  </ul>
  <ul class="files-list">
    <li class="section-item section-item-file image" v-for="(item, index) in uploadingList">
      <div class="section-icon"></div>
      <div class="section-content section-content-file" tabindex="0">
        <div class="file-preview">
          <div class="file-extension">{{ item.fileExtension }}</div>
        </div>
        <div class="file-info">
          <a class="file-name" :title="item.fileName">{{ item.fileName }}</a>
          <div class="file-progress active">
            <div class="bar" :style="'width: ' + item.progress + '%'"></div>
          </div>
        </div>
        <div class="control-container">
          <button class="btn btn-default control-upload" @click="toggleButton(item)">{{ item.btnText }}</button>
        </div>
        <a class="file-delete" data-key-title="button_delete" title="删除" @click="deleteUploadingFile(item, index)">
          <svg class="delete" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="delete"> <path d="M10.72,9.9975 L13.86,6.8575 C14.04,6.6575 14.04,6.3375 13.86,6.1375 C13.66,5.9575 13.34,5.9575 13.14,6.1375 L10,9.2775 L6.86,6.1375 C6.66,5.9575 6.34,5.9575 6.14,6.1375 C5.96,6.3375 5.96,6.6575 6.14,6.8575 L9.28,9.9975 L6.14,13.1375 C5.96,13.3375 5.96,13.6575 6.14,13.8575 C6.24,13.9575 6.38,13.9975 6.5,13.9975 C6.62,13.9975 6.76,13.9575 6.86,13.8575 L10,10.7175 L13.14,13.8575 C13.24,13.9575 13.38,13.9975 13.5,13.9975 C13.62,13.9975 13.76,13.9575 13.86,13.8575 C14.04,13.6575 14.04,13.3375 13.86,13.1375 L10.72,9.9975 Z" id="4"></path> </g> </g>
          </svg>
        </a>
      </div>
    </li>
  </ul>
</div>
</template>

<script>
let qiniu = require('qiniu-js')
export default {
    name: 'Uploadfile',
    props: ['fileList'],
    data(){
      return {
        uploadingList: []
      }
    },
    methods: {
      formatDate(timeStamp){
        // 输入一个 完成的任务对象
        // 输出新的时间 和 旧的时间之间的间隔
        let newDate = new Date().getTime()
        let delta = Math.ceil((newDate - timeStamp)/1000)
        let days, hours, minutes, result //, seconds
        days = Math.floor(delta / (60*60*24))
        hours = Math.floor(delta / (60*60)) % 24
        minutes = Math.floor(delta / 60) % 60
        // seconds = delta % 60
        result = '几秒钟'
        if(minutes) result = `${minutes} 分钟`
        if(hours) result = `${hours} 小时`
        if(days) result = `${days} 天`
        return `${result} 之前`
      },
      createFileMeta(){ 
      // 创建一个文件元数据对象
        return {
          fileExtension: '', 
          fileName: '', 
          uploadDate: null, 
          fileSrc: '', 
          creatorName: '', 
          creatorAvatar: '',
          progress: 0,
          btnText: '开始上传',
        }
      },
      getFileExtension(filename){
        return (/.+[.]/.test(filename)) ? /[^.]+$/.exec(filename)[0] : ''
      },
      uploadWithSDK(event){
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
          fileExtension: this.getFileExtension(key),
          fileName: key,
          creatorName: 'todoi',
          creatorAvatar: '//via.placeholder.com/50x50',
          observable: undefined,
          subscription: undefined,
        })
        this.uploadingList.push(newFileMeta)

        // let subscription;
        // 调用sdk上传接口获得相应的observable，控制上传和暂停
        newFileMeta.observable = qiniu.upload(file, key, token, putExtra, config);
      },
      toggleButton(item){
        // 设置next,error,complete对应的操作，分别处理相应的进度信息，错误信息，以及完成后的操作
        let self = this
        let error = function(err) {
          item.start = true;
          item.btnText = '继续上传'
          // console.log(err);
          alert("上传出错")
        };

        let complete = function(res) {
          // console.log(res)
          item.uploadDate = new Date().getTime()
          item.fileSrc = '//p9vumvpee.bkt.clouddn.com/' + item.fileName
          self.fileList.push(item)
          self.uploadingList.splice(self.uploadingList.indexOf(item), 1)
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
      deleteFile(item, index){
        this.fileList.splice(index, 1)
      },
      deleteUploadingFile(item, index){
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
  region: qiniu.region.z0 //解决Error: incorrect region please use up-z2.qiniu.com的错误
};
let putExtra = {
  fname: "",
  params: {},
  mimeType: null
};

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

    .file-info .file-meta{color: #737272; white-space: nowrap; overflow:hidden; text-overflow: ellipsis;}
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


