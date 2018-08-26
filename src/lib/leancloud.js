import AV from 'leancloud-storage'

const appId = 'C5ARew2cYBVtyWVuTE6qvB3d-gzGzoHsz';
const appKey = 'o4cIMdW77Jou2pmkQGQRHOn5';
AV.init({
  appId,
  appKey
});

function createAcl () {
  var acl = new AV.ACL();
  acl.setReadAccess(AV.User.current(), true);
  acl.setWriteAccess(AV.User.current(), true);
  return acl
}

export default {
  AV,
  getAVUser (user) {
    let {id, attributes: { username, email }} = user || AV.User.current() || { attributes: {} }
    return {id, username, email}
  },
  logOut () {
    AV.User.logOut()
    window.location.href = '/'
  },
  // 新建一个 ACL 实例
  async createObject (className, payload) {
    let TodoFolder = AV.Object.extend(className)
    let todoFolder = new TodoFolder()
    let result
    for (let key in payload) {
      if (payload.hasOwnProperty(key)) {
        todoFolder.set(key, payload[key])
      }
    }
  var acl = new AV.ACL();
    try {
      // 将 ACL 实例赋予 todoFolder 对象
      // todoFolder.setACL(createAcl())
      result = await todoFolder.save()
    }
    catch (error) {
      console.log(error)
      alert('请求失败,请稍后重试')
    }
    return result
  },
}
