import Vue from "vue";
import Vuex from "vuex";
import defaultSettings from '@/settings'
import {
	isEmpty,
	objectEvaluate
} from '@/utils/common.js'

Vue.use(Vuex);

const {
	appLoading,
	menuTitle,
	version,
	themes,
	contentLayout,
	themeMenu,
	miniMenu,
	themesToolbar,
	themeSetting,
	fixToolbar,
	logoMenu,
} = defaultSettings;

const type = {
	SET_USER: "SET_USER",
	SET_TOKEN: "SET_TOKEN",
	SET_LOGIN: "SET_LOGIN",
	CHANGE_SETTING: 'CHANGE_SETTING',
	RESTORE_SETTING: 'RESTORE_SETTING',
	EXIT_LOGIN: "EXIT_LOGIN"
};

const state = {
	user: {},
	token: "",
	login: {
		username: '',
		password: '',
		rememberMe: true,
		rememberPass: true,
		expireLogin: false,
	},
	setting: {
		appLoading,
		menuTitle,
		version,
		themes,
		contentLayout,
		themeMenu,
		miniMenu,
		themesToolbar,
		themeSetting,
		fixToolbar,
		logoMenu
	},
};

//获取例子：this.$store.getters.token
const getters = {
	user: state => state.user,
	token: state => state.token,
	login: state => state.login,
	setting: state => state.setting,
};

const mutations = {
	[type.SET_USER](state, user) {
		if (!isEmpty(user)) {
			state.user = user;
			uni.setStorage({
				key: 'user',
				data: user
			});
		} else {
			//清除所有用户信息
			state.token = "";
			state.user = {};
			uni.removeStorage({
				key: 'token'
			});
			uni.removeStorage({
				key: 'user'
			});
		}
	},
	[type.SET_TOKEN](state, token) {
		if (!isEmpty(token)) {
			state.token = token;
			uni.setStorage({
				key: 'token',
				data: token
			});
		} else {
			//清除所有用户信息
			state.token = "";
			state.user = {};
			uni.removeStorage({
				key: 'token'
			});
			uni.removeStorage({
				key: 'user'
			});
		}
	},
	[type.SET_LOGIN](state, login) {
		// 登陆表选项
		if (!isEmpty(login)) {
			state.login = login;
			uni.setStorage({
				key: 'login',
				data: login
			});
		} else {
			uni.removeStorage({
				key: 'login'
			});
		}
	},
	[type.EXIT_LOGIN](state) {
		//清除所有用户信息
		state.token = "";
		state.user = {};
		uni.removeStorage({
			key: 'token'
		});
		uni.removeStorage({
			key: 'user'
		});
	},
	[type.CHANGE_SETTING](state, {
		key,
		value
	}) {
		if (Object.prototype.hasOwnProperty.call(state, key)) {
			state.setting[key] = value
			uni.setStorage({
				key: 'setting',
				data: setting
			});
		}
	},
	[type.RESTORE_SETTING](state,mode) {
		if	(mode===1){//从缓存中拉取
			objectEvaluate(state, uni.getStorageSync('setting'))
		}else{
			objectEvaluate(state, defaultSettings)
		}
	},
};

//设置例子：this.$store.dispatch('setToken',value).then(response => {}).catch(error => {})
const actions = {
	setUser: ({
		commit
	}, user) => {
		commit(type.SET_USER, user);
	},
	setToken: ({
		commit
	}, token) => {
		commit(type.SET_TOKEN, token);
	},
	setLogin: ({
		commit
	}) => {
		commit(type.SET_LOGIN);
	},
	exitLogin: ({
		commit
	}) => {
		commit(type.EXIT_LOGIN);
	},
	changeSetting: ({
		commit
	}, setting) => {
		commit(type.CHANGE_SETTING, setting)
	},
	restoreSetting: ({
		commit
	},mode) => {
		commit(type.RESTORE_SETTING,mode)
	}
};

export default new Vuex.Store({
	state,
	getters,
	mutations,
	actions
});
