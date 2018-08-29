import leancloud from './leancloud'
let { AV, getAVUser } = leancloud
export default {
  // 使用 Canvas 写成 用户名首字母的图片
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
  //  间隔500ms, 检查一次 input
  throttle (inputObject, callback, delay) { 
    if (inputObject.timer) {
      window.clearTimeout(inputObject.timer)
    }
    inputObject.timer = window.setTimeout(() => {
      callback()
    }, delay)
  },
  // 检验用户名是否存在语法错误
  validateUsername (content) { 
    let errorCode = 0
    if(content.length > 16) {
      errorCode = 704
    } else if (!(/^[a-zA-Z0-9_]{0,16}$/.test(content))) {
      errorCode = 702
    }
    return errorCode
  },
  // 检验邮箱是否存在语法错误
  validateEmail (content) { 
    let errorCode = 0
    if(!(/^[\w]+[\w-.]*@[\w-]+(\.[\w-]+)+$/.test(content))) errorCode = 802
    return errorCode
  },
  // 检验 密码
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
  // 检验 输入的内容是否已经 存在
  async validateExist (inputName, content) {
    // results 长度大于1, 说明这个已经被注册了
    let errorCode = 0, results = [] 
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
  // 如果已经登录 直接到 todoPage 页面
  goTodoPage () {
    let currentUser = getAVUser()
    if (currentUser.id) {
      window.location.href = '/todopage'
    }
  },
  // 如果没有登录 那么 转到homepage 
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
  // 取得今天的 0 点和 24点 的 timeStamp 
  // min 代表 0点
  // max 代表 24 点
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
  // 取得这个 周一 点和 周日 的 timeStamp 
  getWeekDuration (timeStamp) {
    let time = new Date(timeStamp)
    let { min:dayMin, max: dayMax } = this.getTodayDuration(timeStamp)
    let day = time.getDay()
    let arr = [7, 1, 2, 3, 4, 5, 6]
    let min, max
    min = dayMin - (arr[day] - 1) * 24 * 60 * 60 * 1000
    max = dayMax + (7 - arr[day]) * 24 * 60 * 60 * 1000
    return {min, max}
  },
  // 返回一个首字母大写的字符串
  toCapitalize (string) {
    let str = string.slice(0, 1).toUpperCase() + string.slice(1)
    return str
  },
  // 侧边栏 按每个任务的 listId 不同分类
  // 输出示例 [{listId: 'work', tasks: [task0, task1]}, {listId: 'life', tasks: [task0, task1]}]
  sortFilterTasks (filterTasks) {
    let listId = '', arr = [], index = 0
    filterTasks.forEach(task => {
      if(task.belongTo.id != listId) {
        listId = task.belongTo.id
        arr[index] = {listId, tasks: [task]}
        index ++
      } else {
        arr[index-1].tasks.push(task)
      }
    })
    return arr
  },
  // 返回文件的扩展名
  getFileExtension (filename) { 
    return (/.+[.]/.test(filename)) ? /[^.]+$/.exec(filename)[0] : ''
  },
}
