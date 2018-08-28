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
  createObject (className, attributes) {
    let TodoFolder = AV.Object.extend(className)
    let todoFolder = new TodoFolder(), promise
    for (let key in attributes) {
      if (attributes.hasOwnProperty(key)) {
        todoFolder.set(key, attributes[key])
      }
    }
    try {
      // 将 ACL 实例赋予 todoFolder 对象
      // todoFolder.setACL(createAcl())
      promise = todoFolder.save()
    } catch (error) {
      console.log(error)
      alert('请求失败,请稍后重试')
    }
    return promise
  },
  deleteAll (className, ids) {
    let objects, promise
    if (ids instanceof Array && ids.length === 0) {
      return Promise.resolve('传过来的 ObjectIds 数组是空的')
    }
    objects = ids.map(id => AV.Object.createWithoutData(className, id))
    try {
      promise = AV.Object.destroyAll(objects)
    } catch (error) {
      console.log(error)
      alert('请求失败,请稍后重试')
    }
    return promise
  },
  deleteObject (className, id) {
    let object, promise
    object = AV.Object.createWithoutData(className, id);
    try {
      promise = object.destroy()
    } catch (error) {
      console.log(error)
      alert('请求失败,请稍后重试')
    }
    return promise
  },
  updateObject (className, id, attributes) {
    var obj = AV.Object.createWithoutData(className, id)
    for (let key in attributes) {
      if (attributes.hasOwnProperty(key)) {
        obj.set(key, attributes[key])
      }
    }
    return obj.save()
  }
}
