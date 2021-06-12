import Vue from 'vue'
import uView from 'uview-ui';
import store from './store'

import api from './api/'
import {addBaseURL,isEmpty,formatDate,formatDateTime,formatDateTime2,getDateDiff} from './utils/common.js'
import App from './App'

Vue.prototype.$addBaseURL = addBaseURL
Vue.prototype.$isEmpty = isEmpty
Vue.prototype.$store = store
Vue.prototype.$api = api
Vue.prototype.$formatDate = formatDate
Vue.prototype.$getDateDiff = getDateDiff
Vue.prototype.$formatDateTime2 = formatDateTime2

Vue.config.productionTip = false
Vue.use(uView);

// 拉取缓存
store.dispatch('setUser',uni.getStorageSync('user'))
store.dispatch('setToken',uni.getStorageSync('token'))
store.dispatch('restoreSetting',1)

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
