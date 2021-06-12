<template>
	<view class="home">
		<view >
			<view v-for="item in formData" :key='item.id' style="display: flex;border-bottom: solid rgba(240,240,240,1) 1rpx;padding: 16rpx 0;width: 100%;">
				<view>
					<u-avatar :src="$isEmpty(item['createUser']['avatar'])?'/static/icon/user.png':$baseURL+$addBaseURL(item['createUser']['avatar']) "
					 mode="square" size="80" style="margin-left: 20rpx;"></u-avatar>
				</view>
				<view style="margin-left: 20rpx;padding-right: 28rpx;width: 100%;">
					<view class="nickname" style="color: #576B95;font-size: 34rpx;">{{item['createUser']['nickname']}}</view>
					<view class="title" style="color: #333333;font-size: 32rpx;">{{item['title']}}</view>
					<view class="content" style="color: #333333;font-size: 32rpx;">{{item['content']}}</view>
					<view v-if="!$isEmpty(item['file'])" style="margin-top: 8rpx;">
						<view v-if="item['file'].length===1">
							<view v-for="(item2,index2) in item['file']" :key='item2.id' @tap="showImgList(item['file'],index2)">
								<u-image width="550rpx" height="500" v-if="!$isEmpty(item2['path'])" :src="$baseURL+$addBaseURL(item2['path'])"
								 :fade="true" :lazy-load="true" duration="100"></u-image>
							</view>
						</view>
						<u-grid :col="2" :border='false' v-if="item['file'].length===2">
							<u-grid-item v-for="(item2,index2) in item['file']" :key='item2.id' :custom-style='gridItemCustomStyle' @tap="showImgList(item['file'],index2)">
								<u-image width="300rpx" height="290rpx" v-if="!$isEmpty(item2['path'])" :src="$baseURL+$addBaseURL(item2['path'])"
								 :fade="true" :lazy-load="true" duration="100"></u-image>
							</u-grid-item>
						</u-grid>
						<u-grid :col="3" :border='false' v-if="item['file'].length>=3">
							<u-grid-item v-for="(item2,index2) in item['file']" :key='item2.id' :custom-style='gridItemCustomStyle' @tap="showImgList(item['file'],index2)">
								<u-image width="200rpx" height="180rpx" v-if="!$isEmpty(item2['path'])" :src="$baseURL+$addBaseURL(item2['path'])"
								 :fade="true" :lazy-load="true" duration="100"></u-image>
							</u-grid-item>
						</u-grid>
					</view>
					<view class="location" style="font-size: 28rpx;color: #999999;margin-top: 10rpx;display: flex;align-items: center;justify-content: space-between;">
						<view v-if="false">经纬度：{{item['location']}}</view>
						<view><u-rate :count="4" :current="item['score']" :disabled="true" :size='28' ></u-rate></view>
						<view class="time" style="color: #999999;font-size: 26rpx;margin-top: 2rpx;">{{$getDateDiff(item['createTime'])}}</view>
					</view>
					<view style="">
						<!-- <view><u-rate :count="4" :current="item['score']" :disabled="true" :size='28' ></u-rate></view> -->
						<view v-if="!$isEmpty(item['evaluate'])" style="color: #666666;">评价：{{item['evaluate']}}</view>
					</view>
					<view class="location" style="font-size: 28rpx;display: flex;align-items: center;justify-content: flex-end;">
						<view style="color:rgb(200,60,60);" @tap="deleteItem(item['id'])" v-if="item.createUser.id===$store.getters.user.id">删除</view>
					</view>
				</view>
			</view>
		</view>
		<view class="loadingMsg tipMsg" v-if="isLoading">正在加载...</view>
		<view class="noneMsg tipMsg" v-if="formData.length==0&&!isLoading">暂无内容,下拉可刷新内容</view>
		<view class="doneMsg tipMsg" v-if="formData.length>0&&formData.length===total&&!isLoading">已经到底啦</view>
		<u-popup v-model="popupShow" mode="center">
			<u-swiper @tap="popupShow=false" :list="showList" style="width: 750rpx;" height="750" img-mode='aspectFit'
			 bg-color="black" :autoplay='false' border-radius="0" :current="showImgCurrent" :title="true"></u-swiper>
		</u-popup>
		
		<!-- 弹窗 -->
		<u-modal v-model="modalShow" :show-confirm-button="true" @confirm="downloadUpdate" :show-cancel-button="true" width="600rpx" :confirm-text="confirmText" :cancel-text="cancelText" :title="modalTitle" @cancel="modalShow=false" >
			<view style="min-height: 50rpx;padding: 20rpx;white-space: pre-line" v-html="modalText"></view>
		</u-modal>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {updateCheckAPI} from '@/api/index.js'
	export default {
		data() {
			return {
				appid:'__UNI__1127D4B',
				version: '0.0.0',
				modalShow: false,
				modalTitle: '',
				confirmText: '',
				cancelText: '',
				modalText: '',
				updateInfo: {},
				
				showImgCurrent: 0,
				isLoading: true,
				current: 1,
				size: 8,
				total: 0,
				formData: [],
				showList: [],
				popupShow: false,
				gridItemCustomStyle: {
					padding: '2rpx 0'
				}
			}
		},
		onLoad() {
			this.resetPage()
			//#ifndef H5
				this.version = plus.runtime.version
				this.appid = plus.runtime.appid
				this.updateCheck()//检查更新
			//#endif
		},
		mounted() {
			
		},
		onPullDownRefresh() {
			this.resetPage()
		},
		onReachBottom() {
			this.current++
			this.getPublish()
		},
		onShow() {
			// if (this.formData.length===0 && !this.isLoading) this.getPublish()
			this.resetPage()
		},
		methods: {
			downloadUpdate(url=''){
				plus.runtime.openURL(this.updateInfo['url']);
			},
			updateCheck(){
				let data = {
					appid:this.appid,
					version: this.version
				}
				this.$api.updateCheckAPI(data).then(res=>{
					if(res.code){
						this.modalTitle = '发现新版本 ('+res['latest']+')'
						this.confirmText = '立即更新'
						this.cancelText = '下次再说'
						this.modalText = res['note'] 
						this.updateInfo= res
						this.modalShow = true
					}
				}).catch(err=>{
					console.log(err)
				})
			},
			async deleteItem(id) {
				uni.showModal({
					title: '提示',
					content: '确认删除该消息吗?',
					confirmText: '确认',
					cancelText: '取消',
					success: async res => {
						if (res.confirm) {
							uni.showLoading();
							let res = await this.$api.delPublishApi({id}).then(res => res).catch(err => err)
							uni.hideLoading()
							if (res.status === 200) {
								this.$refs.uToast.show({
									title: res['msg'],
									// type: 'success', 
								})
							}
							this.resetPage()
						}
					}
				});
			},
			resetPage() {
				this.current = 1
				this.formData = []
				this.getPublish()
			},
			showImgList(fileList, index) {
				this.showList = [];
				let tmp = [];
				this.showImgCurrent = index;
				fileList.forEach(item => {
					let msg = ''
					// try{
					// 	msg = '经纬度：' + item['info']['imgInfo']['GPSLongitudeD'].toFixed(10) + ',' + item['info']['imgInfo']['GPSLatitudeD'].toFixed(10)
					// }catch(e){}
					tmp.push({
						image: this.$baseURL + this.$addBaseURL(item.path),
						title: msg
					})
				})
				this.showList = tmp;
				this.popupShow = true;
			},
			async getPublish() {
				// 到底
				if (this.formData.length > 0 && this.formData.length == this.total && !this.isLoading) {
					return
				};
				let data = {
					page: this.current,
					limit: this.size,
				}
				this.isLoading = true
				let res = await this.$api.getPublishApi(data).then(res => res).catch(err => err)
				this.isLoading = false
				uni.stopPullDownRefresh()
				if (res.status === 200) {
					this.formData.push(...res.list)
					this.total = res.count;
				}
			}
		}
	}
</script>

<style lang="scss">
	.home {
		.u-grid-item-box {
			padding-top: 0 !important;
		}
	}

	.tipMsg {
		font-size: 30rpx;
		text-align: center;
		padding: 30rpx 0;
		color: #999;
	}
</style>
