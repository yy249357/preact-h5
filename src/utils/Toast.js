import { h, Component } from 'preact'

import '../style/toast.scss'

const Toast = (text, timeout = 3000, options) => {
  try {
    document.body.removeChild(document.querySelector('div.toast'))
  } catch (e) {}

  let toast = document.createElement('div')
  toast.classList.add('toast')
  let content = document.createTextNode(text)
  toast.appendChild(content)
  toast.style.animationDuration = timeout / 1000 + 's'

  for (let prop in options) {
    toast.style[prop] = options[prop]
  }

  toast.style['z-index'] = 9999999
  document.body.appendChild(toast)
  setTimeout(function() {
    try {
      document.body.removeChild(toast)
    } catch (e) {}
  }, timeout)
}

export default Toast
