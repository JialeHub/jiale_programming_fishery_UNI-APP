<template>
	<view class="person">
		<view style="display: flex;height: 220rpx;width: 750rpx;align-items: center;background-color: #fff;"  @tap='goPage("nickname")'>
			<view @click.stop="goPage('avatar')">
				<u-avatar :src="$isEmpty(userInfo['avatar'])?'/static/icon/user.png':$baseURL+$addBaseURL(userInfo['avatar']) " mode="square"
				 size="110" style="margin-left: 50rpx;"></u-avatar>
			</view>
			<view style="display: flex;flex-direction: column;justify-content: space-between;height: 110rpx;margin-left: 30rpx;">
				<text style="font-size: 36rpx;font-weight: 500;">{{userInfo['nickname']}}</text>
				<text style="font-size: 28rpx;color:#999999;">{{userInfo['username']}}</text>
			</view>
		</view>
		
		<u-grid :col="4" >
			<u-grid-item>
				<view style="font-weight: bold;">{{score.day['sum']}}</view>
				<text class="grid-text">日总分</text>
			</u-grid-item>
			<u-grid-item>
				<view style="font-weight: bold;">{{score.week['sum']}}</view>
				<text class="grid-text">周总分</text>
			</u-grid-item>
			<u-grid-item>
				<view style="font-weight: bold;">{{score.month['sum']}}</view>
				<text class="grid-text">月总分</text>
			</u-grid-item>
			<u-grid-item>
				<view style="font-weight: bold;">{{score.year['sum']}}</view>
				<text class="grid-text">年总分</text>
			</u-grid-item>
			<u-grid-item>
				<view style="font-weight: bold;">{{score.all['sum']}}</view>
				<text class="grid-text">总分</text>
			</u-grid-item>
			<u-grid-item>
				<view style="font-weight: bold;">{{count}}</view>
				<text class="grid-text">总发布数</text>
			</u-grid-item>
			<u-grid-item>
				<view style="font-weight: bold;">{{scoreNull}}</view>
				<text class="grid-text">未评数</text>
			</u-grid-item>
			<u-grid-item>
				<view style="font-weight: bold;">{{count-scoreNull}}</view>
				<text class="grid-text">已评数</text>
			</u-grid-item>
		</u-grid>
		
		<view class="msg" style="margin-top: 40rpx;">
			<u-cell-group>
				<u-cell-item @tap="goPage('phone')" icon="phone" title="手机号码" :value="userInfo['phone']"></u-cell-item>
				<!-- <u-cell-item @tap='goEmail' icon="email" title="电子邮箱" :value="userInfo['email']"></u-cell-item> -->
				<u-cell-item @tap="goPage('realname')" title="真实姓名" :value="userInfo['realname']"></u-cell-item>
				<u-cell-item @tap="goPage('fishingBoats')" title="渔船船号" :value="userInfo['fishingBoats']"></u-cell-item>
				<u-cell-item @tap="goPage('operatingType')" title="作业方式" :value="selector[userInfo['operatingType']]"></u-cell-item>
				<u-cell-item @tap="goPage('machinePower')" title="主机功率(千瓦)" :value="userInfo['machinePower']"></u-cell-item>
				<u-cell-item @tap="goPage('emergencyCall')" title="岸上紧急联系人及电话" :value="userInfo['emergencyCall']"></u-cell-item>
				<!-- <u-cell-item @tap='goGender' title="性别" :value="genderText"></u-cell-item> -->
				<!-- <u-cell-item @tap='goBirthday' title="生日" :value="$isEmpty(userInfo['birthday'])?'':$formatDate(userInfo['birthday'])"></u-cell-item> -->
				<!-- <u-cell-item @tap='goProfile' title="简介" :value="userInfo['profile']"></u-cell-item> -->
				<u-cell-item @tap="goPage('password')" title="修改密码" ></u-cell-item>
				<u-cell-item @tap="goPage('instructions')" title="使用说明" :value="userInfo['instructions']"></u-cell-item>
			</u-cell-group>
			<u-cell-group style='margin-top: 20rpx;'> 
				<u-cell-item title="退出登录" @tap='logout'></u-cell-item>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
	import {getUserInfo} from '@/utils/auth.js'
	export default {
		data() {
			return {
				score:{
					all: {min: 0, max: 0, sum: 0, avg: 0},
					day: {min: 0, max: 0, sum: 0, avg: 0},
					month: {min: 0, max: 0, sum: 0, avg: 0},
					week: {min: 0, max: 0, sum: 0, avg: 0},
					year: {min: 0, max: 0, sum: 0, avg: 0},
				},
				selector: ['单拖','双拖','拖虾','围网','罩网','刺网','钓具','笼壶','张网','杂渔具','潜捕','拖贝'],
				count:0,
				scoreNull:0,
			}
		},
		onLoad() {
			
		},
		async mounted() {
			await getUserInfo();
			this.collectMe();
		},
		methods: {
			async collectMe(){
				let res = await this.$api.collectMeApi().then(res=>res).catch(err=>err);
				if	(res.status===200){
					this.score=res.score
					this.count=res.count
					this.scoreNull=res.scoreNull
				}
			},
			goPage(page){
				uni.navigateTo({
					url:`/pages/person/person/${page}/index`,
					animationType: "slide-in-right",
					animationDuration: 100
				})
			},
			logout(){
				uni.showModal({
					title: '提示',
				    content: '确认退出登录吗?',
					confirmText:'确认',
					cancelText:'取消',
				    success: async res=> {
				        if (res.confirm) {
							uni.showLoading();
							await this.$api.logoutApi();
				            await this.$store.dispatch('exitLogin');
							uni.hideLoading();
				        } else if (res.cancel) {
				            console.log('取消退出登录');
				        }
				    }
				});
			},
		},
		computed: {
			userInfo() {
				return this.$store.getters.user
			},
			genderText(){
				if	(this.userInfo['gender']===0){
					return '保密';
				}else if(this.userInfo['gender']===1){
					return '男';
				}else if(this.userInfo['gender']===2){
					return '女';
				}
			}
		}
	}
</script>

<style>

</style>
