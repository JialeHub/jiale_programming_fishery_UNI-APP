import {requestD,requestG,requestK,requestP,requestF} from './request.js'

const uploadApi = (data,mode) => requestF('/file/upload' , data, mode) //上传文件
const getPublishApi = data => requestG('/publish/list' , data) //获取动态列表
const delPublishApi = data => requestD('/publish/del',data) //删除动态
const postPublishApi = data => requestK('/publish/add' , data) //发布
const collectMeApi = data => requestG('/publish/collectMe', data) //获取自己的分数

const updateCheckAPI = data => requestG('/apk' , data) //检查更新

const forgetApi = data => requestK('/user/forget', data) //忘记密码
const registerApi = data => requestK('/user/register', data) //注册
const loginApi = data => requestK('/user/login', data) //登录
const logoutApi = data => requestD('/user/logout', data) //退出登录
const getUserInfoApi = data => requestG('/user/info', data) //拉取用户信息
const updateUserInfoApi = data => requestP('/user/updateInfo',data) //修改用户信息
const initMenuApi = data => requestG('/user/initMenu', data) //后台刷新权限


export default {
	uploadApi,
	getPublishApi,
	postPublishApi,
	loginApi,
	logoutApi,
	getUserInfoApi,
	initMenuApi,
	registerApi,
	updateUserInfoApi,
	delPublishApi,
	collectMeApi,
	updateCheckAPI
}