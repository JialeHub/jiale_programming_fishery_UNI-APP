<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			if (this.$isEmpty(this.$store.getters.token)) {
				this.exitLogin()	
			} else {	
				// 检测登录状态
				this.$api.getUserInfoApi().then((res) => {
					if (!this.$isEmpty(res.resultParam)) {
						this.$store.dispatch('setUser', res.resultParam.currentUser.user)
					} else if (res.status == 401) {
						this.exitLogin()
					}
				}).catch((err) => {
					console.log(err)
				})
			}
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			exitLogin() {
				(async () => {
					await this.$api.logoutApi()
					await this.$store.dispatch("exitLogin").then((res) => {})
				})()
			}
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	
</style>
