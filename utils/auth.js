import api from '@/api/'
import store from '@/store'

export async function getUserInfo() {
	uni.showLoading();
	await api.getUserInfoApi().then(async res => {
		if (res.status === 200) {
			await store.dispatch('setUser', res.info)
		} else {
			//获取失败，退出登录
			await api.logoutApi();
			store.dispatch('exitLogin');
		}
	}).catch(async err => {
		await api.logoutApi();
		await store.dispatch('exitLogin');
		console.log(err)
	})
	await api.initMenuApi({return:0}).catch(err=>err);
	uni.hideLoading();
}
