import Service from './axios.js'
import Toast, { T } from 'react-toast-mobile'
// const siteUrl = 'http://i-staging.ai.mi.com/growth'
// const siteUrl = 'https://preview.i.ai.mi.com/growth/'
// const siteUrl = 'http://10.38.167.89:12999'
const siteUrl = '/growth'

export default {
  // 获取红包
  getRedpaper: () => {
    return Service({
      url: `${siteUrl}/api/red-package/sso/reward`,
      method: 'get'
    })
  },

  // 提现
  getCash: params => {
    return Service({
      url: `${siteUrl}/api/red-package/sso/cash-out`,
      method: 'get'
    })
  },

  // 设置收货地址
  setAddress: params => {
    return Service({
      url: `${siteUrl}/api/red-package/sso/address`,
      method: 'post',
      data: params
    })
  },

  // 查看红包历史
  getRedpaperList: params => {
    return Service({
      url: `${siteUrl}/api/red-package/sso/history-list`,
      method: 'get'
    })
  }
}
