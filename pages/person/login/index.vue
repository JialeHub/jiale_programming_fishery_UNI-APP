<template>
	<view class="login" style="padding: 20rpx;">
		<view>
			<view style="font-size: 42rpx;margin-top: 30rpx;" v-if='model===0'>用户登录</view>
			<view style="font-size: 42rpx;margin-top: 30rpx;" v-if='model===1'>用户注册</view>
		</view>
		<view style="display: flex;justify-content: center;margin-top: 120rpx;margin-bottom: 40rpx;">
			<u-icon name="/static/svg/userLogin.svg" size="200rpx"></u-icon>
		</view>
		<transition name="fade" mode="out-in">
			<view v-if="model===0">
				<!-- 登录 -->
				<u-form :model="form" ref="uForm" style="padding: 20rpx;" :error-type="['toast']">
					<u-form-item label="" left-icon="account-fill" prop='username'>
						<u-input v-model="form.username" confirm-type='next' type='text' :placeholder="'请输入账号'" :trim="true" />
					</u-form-item>
					<u-form-item label="" left-icon="lock-fill" prop="password">
						<u-input v-model="form.password" @confirm='login' :placeholder="'请输入密码'" :trim="true" type="password" />
					</u-form-item>
				</u-form>
				<view style="margin-top: 30rpx;">
					<u-button :disable="btnLoading" @tap='changeModel(1)' type="primary" :ripple="true" :plain="true">还没账号？去注册</u-button>
					<u-button :disable="btnLoading" :ripple="true" style="margin-top: 40rpx;" type="primary" @tap='login'>登录</u-button>
				</view>
			</view>
			<view v-if="model===1">
				<!-- 注册 -->
				<u-form :model="form2" ref="uForm2" style="padding: 20rpx;" :error-type="['toast']">
					<u-form-item label="" left-icon="account-fill" prop='username'>
						<u-input v-model="form2.username" confirm-type='next' type='text' :placeholder="'请输入账号'" :trim="true" />
					</u-form-item>
					<u-form-item label="" left-icon="lock-fill" prop="password">
						<u-input v-model="form2.password" :placeholder="'请输入密码'" :trim="true" type="password" />
					</u-form-item>
					<u-form-item label="" left-icon="lock-fill" prop="password2">
						<u-input v-model="form2.password2" @confirm='register' :placeholder="'请再次输入密码'" :trim="true" type="password" />
					</u-form-item>
				</u-form>
				<view style="margin-top: 30rpx;">
					<u-button :disable="btnLoading" @tap='changeModel(0)' type="primary" :ripple="true" :plain="true">已有账号？去登录</u-button>
					<u-button :disable="btnLoading" :ripple="true" style="margin-top: 40rpx;" type="primary" @tap='register'>注册</u-button>
				</view>
			</view>
		</transition>
		<u-modal v-model="modalShow" :show-confirm-button="showConfirm" :show-cancel-button="showCancel" width="500rpx"
		 :title="modalTitle" @cancel="modalShow=false">
			<view style="height: 50rpx;width: 10rpx;"></view>
		</u-modal>
	</view>
</template>

<script>
	import {
		encrypt
	} from '@/utils/encrypt.js';
	export default {
		data() {
			return {
				model: 0, //0为登录 1注册 2找回密码
				form: {
					username: '',
					password: '',
					rememberMe: true,
					rememberPass: false,
				},
				form2: {
					username: '',
					password: '',
					password2: '',
				},
				modalShow: false,
				btnLoading: false,
				showConfirm: true,
				showCancel: false,
				modalTitle: '',
				rules: {
					username: [{
						required: true,
						message: '请输入账号',
						trigger: 'blur,change'
					}],
					password: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur,change'
					}],
					password2: [{
						required: true,
						message: '请再次输入密码',
						trigger: 'blur,change'
					},
					{
						validator: (rule, value, callback) => {
							return value==this.form2.password;
						},
						message: '两次密码不一致，请重新输入',
						trigger: ['change','blur'],
					}],
				}
			}
		},
		methods: {
			async init() {
				this.$store.dispatch('exitLogin');
			},
			login() {
				this.$refs.uForm.validate(valid => {
					if (!valid) return
					let data = { ...this.form
					};
					data.password = encrypt(data.password)
					delete data.rememberPass
					delete data.expireLogin
					// this.btnLoading = true
					uni.showLoading();
					this.$api.loginApi(data).then(async res => {
						// this.btnLoading = false
						uni.hideLoading();
						if (res.status === 200) {
							await this.$store.dispatch('setLogin', {
								username: data.username,
								password: data.rememberPass ? data.password : '',
								rememberMe: data.rememberMe,
								rememberPass: data.rememberPass,
								expireLogin: false,
							});
							await this.$store.dispatch('setToken', res['token'])
						} else if (!this.$isEmpty(res['msg'])) {
							this.modalTitle = res['msg']
							this.modalShow = true
						} else {
							this.modalTitle = '发生未知错误'
							this.modalShow = true
						}
					}).catch((err) => {
						console.log(err)
						uni.hideLoading();
						this.modalTitle = '发生未知错误'
						this.modalShow = true
					})
				});
			},
			register() {
				this.$refs.uForm2.validate(valid => {
					if (!valid) return
					let data = { ...this.form2};
					data.password = encrypt(data.password)
					delete data.password2;
					// this.btnLoading = true
					uni.showLoading();
					this.$api.registerApi(data).then(res=>{
						uni.hideLoading();
						if (res.status === 201) {
							this.changeModel(0);
							this.form.username = data.username;
							this.modalTitle = '注册成功'
							this.modalShow = true
						} else if (!this.$isEmpty(res['msg'])) {
							this.modalTitle = res['msg']
							this.modalShow = true
						} else {
							this.modalTitle = '发生未知错误'
							this.modalShow = true
						}
					}).catch(err=>{
						console.log(err)
						uni.hideLoading();
						this.modalTitle = '发生未知错误'
						this.modalShow = true
					})
				});
			},
			changeModel(v) {
				if (v === 0) {
					this.model = v
					this.$nextTick(()=>{
						this.$refs.uForm.setRules(this.rules);
					})
				} else if (v === 1) {
					this.model = v
					this.$nextTick(()=>{
						this.$refs.uForm2.setRules(this.rules);
					})
				}
			}
		},
		mounted() {
			Object.assign(this.form, { ...this.$store.getters.login})
			this.changeModel(0)
			this.init();
		}
	}
</script>

<style lang="scss">
	.fade-enter-active, .fade-leave-active {
	  transition: opacity .1s;
	}
	
	.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
	{
	  opacity: 0;
	}
</style>
