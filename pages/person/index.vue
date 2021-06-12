<template>
	<view style="display: flex;flex-direction: column;">
		<login v-if='!isLogin' style='flex: 1 1 auto;' />
		<person v-if='isLogin' ref='personRef' style='flex: 1 1 auto;' />
	</view>
</template>

<script>
	import login from "./login/index.vue"
	import person from "./person/index.vue"
	export default {
		data() {
			return {

			}
		},
		onLoad() {
			
		},
		methods: {

		},
		onShow() {
			this.$nextTick(()=>{
				if (this.isLogin) {
					this.$refs.personRef.collectMe()
				}
			})
		},
		computed: {
			isLogin() {
				return !this.$isEmpty(this.$store.getters.token)
			}
		},
		components: {
			login,
			person
		}
	}
</script>

<style lang="scss">
	page {
		background-color: rgba(244, 246, 248, 1);
	}
</style>
