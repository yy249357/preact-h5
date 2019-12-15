import Axios from 'axios'
import { config } from 'preact-render-spy'
import Toast, { T } from 'react-toast-mobile'

const axios = Axios.create()
const goToMiuiLoginPage = () => {
  xiaoai.startActivity('intent:#Intent;action=com.xiaomi.account.action.XIAOMI_ACCOUNT_LOGIN;launchFlags=0x4000000;package=com.xiaomi.account;end')
}

const AUTH_TOKEN_STR =
  'DO-TOKEN-V1 app_id:326813440150602752,scope_data:eyJkIjoiZjU1NTk4YjNlMWZkOTVlYmY1NTcwNjVjZmJiMGY3NzIifQ,access_token:V3_8wKVeXZ-pKpfBrgQ6Ajy9qkXSxTaf0-YWq1_cGmEsqQ9ritufMe6gw8oQLSOscv-SfQhCyU04fpegBTq8-PDy4_qRyFTXFagrxnT1OZdjDT0ozvQltclX3lSkH_Q1wO2W2xOqnStdMD-eOEz-5Kyk_V5ZMR9DasLyvXuHGcTXf0Ke9qdNCR3khrH6Xp47_x3'
const AUTH_TOKEN = window.xiaoai && xiaoai.getDeviceToken && xiaoai.getDeviceToken()
axios.defaults.headers.common['authorization'] = AUTH_TOKEN || AUTH_TOKEN_STR
if (window.xiaoai) {
  console.log('getDeviceToken:', xiaoai.getDeviceToken())
}

axios.defaults.timeout = 15000 //超时时间

axios.interceptors.request.use(
  config => {
    if (config.method == 'get') {
      console.log('TCL: device_id', window.deviceId)
      config.params = {
        device_id: window.deviceId || 'f55598b3e1fd95ebf557065cfbb0f772',
        user_id: window.userId || '2249350817',
        ...config.params
      }
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  res => {
    let data = res.data
    res.data = data.data
    return res
  },
  error => {
    console.log('TCL: error', error)
    if (error.code == 'ECONNABORTED' && error.message.indexOf('timeout') != -1) {
      T.notify('页面超时，请刷新试试')
      return false
    }
    if (error.response.status === 401) {
      T.notify('请用小米账号登陆')
      if (window.xiaoai) {
        goToMiuiLoginPage()
      } else {
        let loginUrl = error.response.data.loginUrl
        console.log(loginUrl)
      }
      return Promise.reject(error)
    }
    return Promise.reject(error)
  }
)

export default axios
