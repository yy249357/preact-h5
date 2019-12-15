const URL = window.location.href
const intentString = `voiceassist://aiweb?url=${encodeURIComponent(URL)}&flag=872448000&noBack=false&statusBarColor=C64525&navigationBarColor=5a4fd2`
const LINKS = {
  DOWNLOAD_URL: {
    ANDROID: 'https://xiaoai.mi.com/download/voiceassistant/share',
    IOS: 'https://itunes.apple.com/cn/app/id1436959122',
    XIAOMI: 'https://xiaoai.mi.com/download/voiceassistant/share'
  },
  SCHEME_URL: {
    ANDROID: 'xiaomi://xiaoai/main',
    IOS: 'xiaoailite://share',
    // XIAOMI : 'intent://mainpage?from=share#Intent;scheme=voiceassist;end',
    XIAOMI: intentString
  }
}

export function getEnv() {
  const UA = window.navigator.userAgent
  // 避免匹配到微信或者小米浏览器
  const UA2 = UA.replace(/MicroMessenger/g, '').replace(/XiaoMi\/MiuiBrowser/g, '')
  console.log('TCL: getEnv -> UA', UA)
  let isXiaomi = false,
    isAndroid = false,
    isIOS = false

  if (/(HM|Redmi|Mi)/gi.test(UA2) || /2013022|2014011|2014501|tiare|TBD|raphael|monet|POCO F1\/POCO PHONE F1/.test(UA2)) {
    isXiaomi = true
  } else if (UA2.match(/iPhone|iPad|iPod/i)) {
    isIOS = true
  } else {
    isAndroid = true
  }

  const isQQ = /(iPad|iPhone|iPod).*? (IPad)?QQ\/([\d\.]+)/.test(UA) || /\bV1_AND_SQI?_([\d\.]+)(.*? QQ\/([\d\.]+))?/.test(UA)

  const browser = {
    isAndroid,
    isIOS,
    isXiaomi,

    isQQ,
    isSafari: /iPhone|iPad|iPod\/([\w.]+).*(safari).*/i.test(UA),
    isWb: UA.match(/weibo/i) ? true : false,
    isWx: UA.match(/micromessenger/i) ? true : false
    // isAndroidChrome: (UA.match(/Chrome\/([\d.]+)/) || UA.match(/CriOS\/([\d.]+)/)) && isAndroid && !isQQ,
  }
  window['browserInfo'] = browser
  return browser
}

export function openAppByHref(deviceType, from = 'local') {
  console.log(`${LINKS.SCHEME_URL[deviceType]}`)
  window.location.href = `${LINKS.SCHEME_URL[deviceType]}&from=${from}`
}

export function openAppByHrefDown(deviceType, from = 'local') {
  setTimeout(() => {
    window.location.href = LINKS.DOWNLOAD_URL[deviceType]
  }, 2000)
}
