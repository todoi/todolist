import leancloud from './leancloud'
let { AV, getAVUser } = leancloud
export default {
  getAvatarSrc(username){
    let letter = username.trim().slice(0,1).toUpperCase()
    let canvas = document.createElement('canvas')
    let context = canvas.getContext('2d')
    let dataSrc

    canvas.width = 50
    canvas.height = 50
    context.fillStyle= '#addb80' //背景色
    context.fillRect(0, 0, 50, 50)

    context.font = '25px sans-serif'
    context.fillStyle = '#fff' //文字颜色
    context.textAlign = 'center' // 水平居中
    context.textBaseline = 'middle' // 垂直居中
    context.fillText(letter, 25, 25)

    dataSrc = canvas.toDataURL()
    return dataSrc
  },
  throttle (inputObject, callback, delay) { // input 错误检查时, 间隔500ms, 检查一次
    if (inputObject.timer) {
      window.clearTimeout(inputObject.timer)
    }
    inputObject.timer = window.setTimeout(() => {
      callback()
    }, delay)
  },
  validateUsername (content) { //判断是否存在语法错误
    let errorCode = 0
    if(content.length > 16) {
      errorCode = 704
    } else if (!(/^[a-zA-Z0-9_]{0,16}$/.test(content))) {
      errorCode = 702
    }
    return errorCode
  },
  validateEmail (content) { //判断是否存在语法错误
    let errorCode = 0
    if(!(/^[\w]+[\w-.]*@[\w-]+(\.[\w-]+)+$/.test(content))) errorCode = 802
    return errorCode
  },
  validatePassword (content) { //判断是否存在语法错误
    let errorCode = 0
    if (content.length < 7) {
      errorCode = 901
    } else if (!(/^(?![A-Z_\W]+$).{7,}$/).test(content)) {
      errorCode = 902
    } else if (!(/^(?![a-zA-Z\W]+$).{7,}$/.test(content))) {
      errorCode = 904
    } else if (!(/^(?![\dA-Z_\W]+$).{7,}$/).test(content)) {
      errorCode = 905
    }
    return errorCode
  },
  async validateExist (inputName, content) {
    let errorCode = 0, results = [] // 如果结果长度大于1, 说明这个已经被注册了
    let query = new AV.Query('UsernameAndEmail');
    query.equalTo(inputName, content);
    try {
      results = await query.find()
    }
    catch (error) {
      console.log(error)
    }
    if (results.length) {
      if (inputName === 'username'){
        errorCode = 701
      } else if (inputName === 'email') {
        errorCode = 801
      }
    }
    return errorCode
  },
  goTodoPage () {
    let currentUser = getAVUser()
    if (currentUser.id) {
      window.location.href = '/todopage'
    }
  },
  goHomePage () {
    let currentUser = getAVUser()
    if (!currentUser.id) {
      window.location.href = '/'
    }
  },
  createId (arg) {
    return window.btoa(window.encodeURI(arg))
      .replace(/[=, ?, !]/g, '') + new Date().getTime()
  },
  // 输入一个 完成的任务对象
  // 输出新的时间 和 旧的时间之间的间隔
  showDuration (timeStamp) {
    let newDate = new Date().getTime()
    let delta = Math.ceil((newDate - timeStamp)/1000)
    let days, hours, minutes, result //, seconds
    days = Math.floor(delta / (60*60*24))
    hours = Math.floor(delta / (60*60)) % 24
    minutes = Math.floor(delta / 60) % 60
    // seconds = delta % 60
    result = '几秒钟'
    if(minutes) result = `${minutes}分钟`
    if(hours) result = `${hours}小时`
    if(days) result = `${days}天`
    return result
  },
  getTodayDuration (timeStamp) {
    let time = new Date(timeStamp),
      hours = time.getHours(),
      minutes = time.getMinutes(),
      seconds = time.getSeconds (),
      milliseconds = time.getMilliseconds(),
      min, max
    min = timeStamp - hours * 60 * 60 * 1000 - minutes *60 * 1000 - seconds * 1000 - milliseconds
    max = min + 24 * 60 * 60 * 1000
    return { min, max }
  },
  getWeekDuration (timeStamp) {
    let time = new Date(timeStamp)
    let { min:dayMin, max: dayMax } = this.getTodayDuration(timeStamp)
    let day = time.getDay()
    let arr = [7, 1, 2, 3, 4, 5, 6]
    let min, max
    min = dayMin - (arr[day] - 1) * 24 * 60 * 60 * 1000
    max = dayMax + (7 - arr[day]) * 24 * 60 * 60 * 1000
    return {min, max}
  }
}
