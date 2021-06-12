<template>
	<view style="display: flex;flex-direction: column;">
		<!-- 自定义导航栏 -->
		<u-navbar title="个人中心" title-color='black'>
			<view slot="right" style="margin-right: 10rpx;">
				<u-button type="success" style="height: 66rpx;width: 116rpx;letter-spacing: 2rpx;" @tap="save">保存</u-button>
			</view>
		</u-navbar>

		<u-form ref="uForm" :model="form" :error-type="['toast']" style='border-top: rgba(240,240,240,1) 2rpx solid;flex: 1 1 auto;background-color: #FFF;padding:0 16rpx;'>
			<u-form-item label="生日" prop='birthday'>
				<u-input v-model="form.birthday" type='text' disable @tap='birthdaySelect=true' :disabled='true'/>
				<u-picker mode="time" :default-time='form.birthday' :params="timeParams" v-model="birthdaySelect" @confirm='confirmTime'></u-picker>
			</u-form-item>
		</u-form>

		<u-modal v-model="modalShow" :show-confirm-button="showConfirm" :show-cancel-button="showCancel" width="500rpx"
		 :title="modalTitle" @cancel="modalShow=false">
			<view style="height: 50rpx;width: 10rpx;"></view>
		</u-modal>
	</view>
</template>

<script>
	import {
		getUserInfo
	} from '@/utils/auth.js'
	export default {
		data() {
			return {
				form: {
					birthday: '',
				},
				timeParams: {
					year: true,
					month: true,
					day: true,
				},
				birthdaySelect: false,
				modalShow: false,
				btnLoading: false,
				showConfirm: true,
				showCancel: false,
				modalTitle: '',
				btnLoading: false,
				rules: {
					birthday: [{
						required: true,
						message: '请输入内容',
						trigger: 'blur,change'
					}]
				}
			}
		},
		onLoad() {

		},
		methods: {
			confirmTime(v){
				console.log(v)
				this.form.birthday=v.year+'-'+v.month+'-'+v.day
			},
			save() {
				this.$refs.uForm.validate(async valid => {
					if (!valid) return
					let data = {
						birthday: this.form.birthday
					};
					uni.showLoading();
					await this.$api.updateUserInfoApi(data).then(async res => {
						uni.hideLoading();
						if (res.status === 200) {
							uni.switchTab({
								url: '/pages/person/index'
							});
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
					getUserInfo();
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
			} else if (!this.$isEmpty(this.$store.getters.user)) {
				this.form.birthday = this.$formatDate(this.$store.getters.user.birthday) 
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
