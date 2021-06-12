<template>
	<div id="publish">
		<div class="center">
			<u-button type="primary" :ripple="true" class="btn goFormBtn"  @tap="goPage('self')" :disabled="!isLogin">本船渔获</u-button>
			<u-button type="primary" :ripple="true" class="btn goFormBtn"  @tap="goPage('other')" :disabled="!isLogin">其他渔船渔获</u-button>
			<u-button type="primary" :ripple="true" class="btn" @tap='goLogin' v-if="!isLogin">登录后发布</u-button>
		</div>
	</div>
</template>

<script>
	export default {
		computed: {
			isLogin() {
				return !this.$isEmpty(this.$store.getters.token)
			}
		},
		methods:{
			goPage(page){
				uni.navigateTo({
					url:`/pages/publish/${page}/index`,
					animationType: "slide-in-right",
					animationDuration: 100
				})
			},
			goLogin() {
				uni.switchTab({
					url: '/pages/person/index'
				});
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #FFFFFF;
		height: 100%;
	}
	#publish{
		display: flex;
		flex-direction: column;
		justify-content: center;
		height: 100%;
		.center{
			.btn{
				width: 66%;
				margin: 80rpx auto;
				height: 100rpx;
				font-size: 36rpx;
			}
			.goFormBtn{
				height: 180rpx;
				font-size: 40rpx;
				letter-spacing: 2rpx;
			}
		}
	}
</style>
