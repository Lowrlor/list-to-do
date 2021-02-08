import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Axios from 'axios'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faUserSecret,
  faPen,
  faTrashAlt,
  faChevronUp,
  faChevronDown,
  faCalendarAlt,
  faPlus
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Axios.defaults.baseURL = process.env.VUE_APP_BASE_URL
Vue.prototype.$http = Axios
Vue.prototype.$Err = function (err) {
  return Object.assign({}, err)
}
Vue.component('font-awesome-icon', FontAwesomeIcon)

library.add(
  faUserSecret,
  faPen,
  faTrashAlt,
  faChevronUp,
  faChevronDown,
  faCalendarAlt,
  faPlus
)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
