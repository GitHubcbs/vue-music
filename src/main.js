import 'babel-polyfill'
import store from './store'
import fastclick from 'fastclick'
import Vue from 'vue'
import App from './App'
import router from './router'
import VueTouch from 'vue-touch'
import VueLazyLoad from 'vue-lazyload'
import {Alert} from 'element-ui'
import {Swiper} from '@nutui/nutui'
import axios from 'axios'
import 'common/stylus/index.styl'

//躲避es6语法检查
/* eslint-disable no-unused-cars */
Vue.config.productionTip = false
Vue.use(VueLazyLoad,{
  loading:require('common/image/default.png')
})
Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };
Vue.use(Alert)
Swiper.install(Vue)
Vue.prototype.$ajax = axios
fastclick.attach(document.body)
VueTouch.config.swipe={
  threshold:100
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  store})
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

