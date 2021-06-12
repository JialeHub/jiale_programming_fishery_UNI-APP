<template>
	<view style="display: flex;flex-direction: column;">
		<!-- 自定义导航栏 -->
		<u-navbar title="个人中心" title-color='black'>
			<view slot="right" style="margin-right: 10rpx;">
				<u-button type="success" style="height: 66rpx;width: 116rpx;letter-spacing: 2rpx;" @tap="save">保存</u-button>
			</view>
		</u-navbar>

		<u-form ref="uForm" :model="form" :error-type="['toast']" style='border-top: rgba(240,240,240,1) 2rpx solid;flex: 1 1 auto;background-color: #FFF;padding:0 16rpx;'>
			<u-form-item label="性别" prop='gender'>
				<u-radio-group v-model="form.gender">
					<u-radio :name="0">保密</u-radio>
					<u-radio :name="1">男</u-radio>
					<u-radio :name="2">女</u-radio>
				</u-radio-group>
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
					gender: '',
				},
				modalShow: false,
				btnLoading: false,
				showConfirm: true,
				showCancel: false,
				modalTitle: '',
				btnLoading: false,
			}
		},
		onLoad() {

		},
		methods: {
			save() {
				this.$refs.uForm.validate(async valid => {
					if (!valid) return
					let data = {
						gender: this.form.gender
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
				Object.assign(this.form, this.$store.getters.user)
			}
		},
		mounted() {
			
		}
	}
</script>

<style>
	page {
		background-color: rgba(244, 246, 248, 1);
	}
</style>
