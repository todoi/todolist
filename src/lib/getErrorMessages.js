const errorMessage =  {
  125: '电子邮箱地址无效',
  202: '用户名被占用',
  210: '用户名和密码不匹配',
  211: '找不到该用户',
  217: '无效的用户名',
  218: '无效的密码，不允许空白密码',
  219: '登录失败次数超过限制，请稍候再试',
  701: 'Username is already taken',
  702: 'Username may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen',
  704: 'Username cannot be blank',
  704: 'Username is too long (maximum is 16 characters)',
  801: 'Email is already taken',
  802: 'Email is invalid',
  803: 'Email cannot be blank',
  901: 'Password is too short (minimum is 7 characters)',
  902: 'Password needs at least one lowercase letter and needs at least one number',
  903: 'Password cannot be blank',
  904: 'Password needs at least one number',
  905: 'Password needs at least one lowercase letter',
  unknown: '请求失败,请稍后重试'
}

export default function ({ code }) {
  return errorMessage[code] || errorMessage.unknown
}
