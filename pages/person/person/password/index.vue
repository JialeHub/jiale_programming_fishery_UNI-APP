<template>
	<view style="display: flex;flex-direction: column;">
		<!-- 自定义导航栏 -->
		<u-navbar title="个人中心" title-color='black'>
			<view slot="right" style="margin-right: 10rpx;">
				<u-button type="success" style="height: 66rpx;width: 116rpx;letter-spacing: 2rpx;" @tap="save">保存</u-button>
			</view>
		</u-navbar>

		<u-form ref="uForm"  :model="form" :error-type="['toast']" label-width='130' style='border-top: rgba(240,240,240,1) 2rpx solid;flex: 1 1 auto;background-color: #FFF;padding:0 16rpx;'>
			<u-form-item label="旧密码"  prop="passwordOld">
				<u-input v-model="form.passwordOld" :placeholder="'请输入旧密码'" :trim="true" type="password" />
			</u-form-item>
			<u-form-item label="新密码"  prop="password">
				<u-input v-model="form.password" :placeholder="'请输入密码'" :trim="true" type="password" />
			</u-form-item>
			<u-form-item label="确认密码"  prop="password2">
				<u-input v-model="form.password2" :placeholder="'请再次输入密码'" :trim="true" type="password" />
			</u-form-item>
		</u-form>
		
		<u-modal v-model="modalShow" :show-confirm-button="showConfirm" :show-cancel-button="showCancel" width="500rpx"
		 :title="modalTitle" @cancel="modalShow=false">
			<view style="height: 50rpx;width: 10rpx;"></view>
		</u-modal>
	</view>
</template>

<script>
	import {getUserInfo} from '@/utils/auth.js'
	import {encrypt} from '@/utils/encrypt.js';
	export default {
		data() {
			return {
				form:{
					passwordOld: '',
					password: '',
					password2: '',
				},
				modalShow: false,
				btnLoading: false,
				showConfirm: true,
				showCancel: false,
				modalTitle: '',
				btnLoading: false,
				rules: {
					passwordOld: [{
						required: true,
						message: '请输入旧密码',
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
							return value==this.form.password;
						},
						message: '两次密码不一致，请重新输入',
						trigger: ['change','blur'],
					}],
				}
			}
		},
		onLoad() {

		},
		methods: {
			save() {
				this.$refs.uForm.validate(async valid => {
					if (!valid) return
					let data = {
						passwordOld:encrypt(this.form.passwordOld),
						password:encrypt(this.form.password)
						};
					uni.showLoading();
					await this.$api.updateUserInfoApi(data).then(async res => {
						uni.hideLoading();
						if (res.status === 200) {
							uni.showToast({
								title: "修改成功",
								icon: 'success'
							})
							setTimeout(async ()=>{
								uni.showLoading();
								await this.$api.logoutApi();
								await this.$store.dispatch('exitLogin');
								uni.switchTab({
									url: '/pages/person/index'
								});
								uni.hideLoading();
							},1500)
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
			}
		},
		computed: {
			isLogin() {
				return !this.$isEmpty(this.$store.getters.token)
			}
		},
		components: {

		},
		created() {
			if (!this.isLogin) {
				uni.switchTab({
					url: '/pages/person/index'
				});
			}else if(!this.$isEmpty(this.$store.getters.user)){
				Object.assign(this.form,this.$store.getters.user)
			}
		},
		mounted() {
			this.$refs.uForm.setRules(this.rules);
		}
	}
</script>

<style>
	page {
		background-color: rgba(244, 246, 248, 1);
	}
</style>
