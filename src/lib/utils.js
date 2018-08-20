import AV from './leancloud'
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
  getAVUser (user) {
    let {id, attributes: { username, email }} = user || AV.User.current() || { attributes: {} }
    return {id, username, email}
  },
  goTodoPage () {
    let currentUser = this.getAVUser()
    if (currentUser.id) {
      window.location.href = '/todopage'
    }
  },
  goHomePage () {
    let currentUser = this.getAVUser()
    if (!currentUser.id) {
      window.location.href = '/'
    }
  },
  logOut () {
    AV.User.logOut()
    window.location.href = '/'
  },
}
