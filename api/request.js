import Vue from 'vue'
import store from '@/store/'
import {
	isEmpty,
	addBaseURL
} from '@/utils/common.js'

//#ifndef H5
// export const baseURL = 'http://192.168.2.166:9004'
export const baseURL = 'https://luojiale.com:9802'
// export const baseURL = 'http://129.211.93.182:9001'
// export const baseURL = 'http://192.168.43.106:802'
//#endif

//#ifdef H5
// export const baseURL = 'http://192.168.2.166:9004' //注意这里需要反向代理
export const baseURL = '/prodApi' //注意这里需要反向代理
// export const baseURL = 'http://129.211.93.182:9001' //注意这里需要反向代理
// export const baseURL = 'http://192.168.43.106:802' //注意这里需要反向代理
//#endif

Vue.prototype.$baseURL = baseURL
let tipShow = false


export const requestG = (url, params, needToken = true) => {
	return new Promise((resolve, reject) => {
		uni.request({
			method: 'GET',
			url: baseURL + addBaseURL(url),
			data: params,
			header: needToken ? {
				'Authorization': store.getters.token,
				'X-Requested-With':'XMLHttpRequest',
				'Accept':'application/json',
			} : {
				'X-Requested-With':'XMLHttpRequest',
				'Accept':'application/json',
			},
			success: res => {
				if (!isEmpty(res.data) && res.data.status === 401) {
					exitLogin();
					reject(res.data)
				} else {
					resolve(isEmpty(res.data) ? res : res.data)
				}
			},
			fail: res => reject(isEmpty(res.data) ? res : res.data)
		});
	})
};

export const requestF = (url, params,mode='filePath', needToken = true) => {
	return new Promise((resolve, reject) => {
		uni.uploadFile({
			url: baseURL + addBaseURL(url),
			name: 'file',
			[mode==='file'?'file':'filePath']: params,
			header: needToken ? {
				'Authorization': store.getters.token,
				'X-Requested-With':'XMLHttpRequest',
				'Accept':'application/json',
			} : {
				'X-Requested-With':'XMLHttpRequest',
				'Accept':'application/json',
			},
			success: res => {
				if (!isEmpty(res.data) && res.data.status === 401) {
					exitLogin();
					reject(res.data)
				} else {
					resolve(isEmpty(res.data) ? res : res.data)
				}
			},
			fail: res => reject(isEmpty(res.data) ? res : res.data)
		});
	})
};

export const requestK = (url, params, needToken = true) => {
	return new Promise((resolve, reject) => {
		uni.request({
			method: 'POST',
			url: baseURL + addBaseURL(url),
			data: params,
			header: needToken ? {
				'Authorization': store.getters.token,
				'X-Requested-With':'XMLHttpRequest',
				'Content-Type': 'application/x-www-form-urlencoded',
				'Accept':'application/json',
			} : {
				'X-Requested-With':'XMLHttpRequest',
				'Content-Type': 'application/x-www-form-urlencoded',
				'Accept':'application/json',
			},
			success: res => {
				if (!isEmpty(res.data) && res.data.status === 401) {
					exitLogin();
					reject(res.data)
				} else {
					resolve(isEmpty(res.data) ? res : res.data)
				}
			},
			fail: res => reject(isEmpty(res.data) ? res : res.data)
		});
	})
};

export const requestJ = (url, params, needToken = true) => {
	return new Promise((resolve, reject) => {
		uni.request({
			method: 'POST',
			url: baseURL + addBaseURL(url),
			data: params,
			header: needToken ? {
				'Authorization': store.getters.token,
				'X-Requested-With':'XMLHttpRequest',
				'Accept':'application/json',
			} : {
				'X-Requested-With':'XMLHttpRequest',
				'Accept':'application/json',
			},
			success: res => {
				if (!isEmpty(res.data) && res.data.status === 401) {
					exitLogin();
					reject(res.data)
				} else {
					resolve(isEmpty(res.data) ? res : res.data)
				}
			},
			fail: res => reject(isEmpty(res.data) ? res : res.data)
		});
	})
};

export const requestD = (url, params, needToken = true) => {
	return new Promise((resolve, reject) => {
		uni.request({
			method: 'DELETE',
			url: baseURL + addBaseURL(url),
			data: params,
			header: needToken ? {
				'Authorization': store.getters.token,
				'X-Requested-With':'XMLHttpRequest',
				'Content-Type': 'application/x-www-form-urlencoded',
				'Accept':'application/json',
			} : {
				'X-Requested-With':'XMLHttpRequest',
				'Content-Type': 'application/x-www-form-urlencoded',
				'Accept':'application/json',
			},
			success: res => {
				if (!isEmpty(res.data) && res.data.status === 401) {
					exitLogin();
					reject(res.data)
				} else {
					resolve(isEmpty(res.data) ? res : res.data)
				}
			},
			fail: res => reject(isEmpty(res.data) ? res : res.data)
		});
	})
};

export const requestP = (url, params, needToken = true) => {
	return new Promise((resolve, reject) => {
		uni.request({
			method: 'PUT',
			url: baseURL + addBaseURL(url),
			data: params,
			header: needToken ? {
				'Authorization': store.getters.token,
				'X-Requested-With':'XMLHttpRequest',
				'Content-Type': 'application/x-www-form-urlencoded',
				'Accept':'application/json',
			} : {
				'X-Requested-With':'XMLHttpRequest',
				'Content-Type': 'application/x-www-form-urlencoded',
				'Accept':'application/json',
			},
			success: res => {
				if (!isEmpty(res.data) && res.data.status === 401) {
					exitLogin();
					reject(res.data)
				} else {
					resolve(isEmpty(res.data) ? res : res.data)
				}
			},
			fail: res => reject(isEmpty(res.data) ? res : res.data)
		});
	})
};
