const privacyPolicy = () => {
  let privacyPolicy = document.getElementById('privacyPolicy')
  let icon = privacyPolicy && privacyPolicy.querySelector('i')
  icon &&
    icon.addEventListener('click', () => {
      if (icon.classList.contains('checked')) {
        icon.classList.remove('checked')
      } else {
        icon.classList.add('checked')
      }
    })
}

export default privacyPolicy
