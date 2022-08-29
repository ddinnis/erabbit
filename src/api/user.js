import request from './index'

export const userAccountLogin = ({ account, password }) => {
  return request('/login', 'post', { account, password })
}

export const userMobileLoginMsg = (mobile) => {
  return request('/login/code', 'get', { mobile })
}

// 短信验证码默认为 123456
export const userMobileLogin = ({ mobile, code }) => {
  return request('/login/code', 'post', { mobile, code })
}

export const userQQLogin = (unionId, source = 6) => {
  return request('/login/social', 'post', { unionId, source })
}

// 获取QQ绑定的时候短信验证码

export const userQQBindCode = (mobile) => {
  return request('/login/social/code', 'get', { mobile })
}

// QQ登录-绑定帐号

export const userQQBindLogin = ({ unionId, mobile, code }) => {
  return request('/login/social/bind', 'post', { unionId, mobile, code })
}

// 校验帐号是否存在

export const userCheckAccount = (account) => {
  return request('/register/check', 'get', { account })
}

export const userQQPatchCode = (mobile) => {
  return request('/register/code', 'get', { mobile })
}

/**
 * QQ登录-完善信息
 * @param {String} unionId - QQ唯一标识，openId
 * @param {String} mobile - 手机号
 * @param {String} code - 验证码
 * @param {String} account - 帐号
 * @param {String} password - 密码
 * @returns
 */
export const userQQPatchLogin = ({
  unionId,
  mobile,
  code,
  account,
  password
}) => {
  return request(`/login/social/${unionId}/complement`, 'post', {
    unionId,
    mobile,
    code,
    account,
    password
  })
}
