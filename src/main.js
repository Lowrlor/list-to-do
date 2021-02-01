import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Axios from 'axios'

Axios.defaults.baseURL = process.env.VUE_APP_BASE_URL
Vue.prototype.$http = Axios
Vue.prototype.$Err = function (err) {
  return Object.assign({}, err)
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
