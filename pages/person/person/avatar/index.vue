<template>
	<view style="display: flex;flex-direction: column;">
		<!-- 自定义导航栏 -->
		<u-navbar title="编辑头像" title-color='black' back-text="返回" @custom-back="goBack">
			<view slot="right" style="margin-right: 10rpx;">
				<u-button type="success"  @tap="save" style="height: 66rpx;width: 116rpx;letter-spacing: 2rpx;">保存</u-button>
			</view>
		</u-navbar>

		<view class="u-avatar-wrap">
			<image class="u-avatar-demo" :src="avatar" mode="aspectFill"></image>
		</view>
		<u-button @tap="chooseAvatar">更换头像</u-button>

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
				avatar: '',
				modalShow: false,
				btnLoading: false,
				showConfirm: true,
				showCancel: false,
				modalTitle: '',
				form: {
					avatar: ''
				}
			}
		},
		onLoad() {

		},
		created() {
			if (!this.isLogin) {
				uni.switchTab({
					url: '/pages/person/index'
				});
			} else if (!this.$isEmpty(this.$store.getters.user)) {
				Object.assign(this.form, this.$store.getters.user)
				this.avatar = this.$isEmpty(this.userInfo['avatar']) ? '/static/icon/user.png' : this.$baseURL+this.$addBaseURL(this.userInfo[
					'avatar'])
			}
			// 监听从裁剪页发布的事件，获得裁剪结果
			uni.$on('uAvatarCropper', async path => {
				this.avatar = path;
				// 可以在此上传到服务端
				uni.showLoading()
				let res = await this.$api.uploadApi(path).then(res => res).catch(err => err)
				res = JSON.parse(res)
				if (res.status === 200) {
					this.form.avatar = res.res[0]['path']
				} else {
					this.modalTitle = '上传失败'
					this.modalShow = true
				}
				uni.hideLoading()
			})
		},
		methods: {
			goBack(){
				console.log('-1')
			},
			chooseAvatar() {
				// 此为uView的跳转方法，详见"文档-JS"部分，也可以用uni的uni.navigateTo
				this.$u.route({
					// 关于此路径，请见下方"注意事项"
					url: '/uview-ui/components/u-avatar-cropper/u-avatar-cropper',
					// 内部已设置以下默认参数值，可不传这些参数
					params: {
						// 输出图片宽度，高等于宽，单位px
						destWidth: 300,
						// 裁剪框宽度，高等于宽，单位px
						rectWidth: 200,
						// 输出的图片类型，如果'png'类型发现裁剪的图片太大，改成"jpg"即可
						fileType: 'jpg',
					}
				})
			},
			async save() {
				let data = {
					avatar: this.form.avatar
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
			}
		},
		computed: {
			isLogin() {
				return !this.$isEmpty(this.$store.getters.token)
			},
			userInfo() {
				return this.$store.getters.user
			},
		},
		components: {

		},
		mounted() {

		}
	}
</script>

<style lang="scss">
	page {
		background-color: rgba(244, 246, 248, 1);
	}

	.u-avatar-wrap {
		margin-top: 80rpx;
		overflow: hidden;
		margin-bottom: 80rpx;
		text-align: center;
	}

	.u-avatar-demo {
		width: 150rpx;
		height: 150rpx;
		border-radius: 100rpx;
	}
</style>
