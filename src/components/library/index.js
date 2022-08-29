const importFn = require.context('./', false, /\.vue$/)

import Message from './Message'
import Confirm from './Confirm'

export default {
  install(app) {
    importFn.keys().forEach((key) => {
      const component = importFn(key).default
      app.component(component.name, component)
    })
    defineDirective(app)

    app.config.globalProperties.$message = Message
    app.config.globalProperties.$confirm = Confirm
  }
}

import defaultImg from '@/assets/images/200.png'
const defineDirective = (app) => {
  app.directive('lazyload', {
    mounted(el, binding) {
      const observer = new IntersectionObserver(
        ([{ isIntersecting }]) => {
          if (isIntersecting) {
            observer.unobserve(el)
            el.onerror = () => {
              el.src = defaultImg
            }
            el.src = binding.value
          }
        },
        {
          threshold: 0.01
        }
      )
      observer.observe(el)
    }
  })
}
