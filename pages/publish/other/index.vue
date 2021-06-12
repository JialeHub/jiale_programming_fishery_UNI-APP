<template>
	<view class="content" style="padding: 20rpx;">
		<!-- 登录 -->
		<u-form :model="form" ref="uForm" style="" :error-type="['toast']" label-width='220'>
			<view class="wrap">
				<view @click.capture.stop="sizeSelectOpen">
					<u-upload ref="uUpload" :size-type="sizeType" :source-type="sourceType" :action="action" :auto-upload="true" :file-list="fileList" :deletable="false"></u-upload>
				</view>
				<u-select v-model="sizeSelect" mode="single-column" title="请选择上传质量" :list="selector" @confirm='confirmSelect'></u-select>
				<u-select v-model="sourceSelect" mode="single-column" title="请选择上传方式" :list="selector2" @confirm='confirmSelect2'></u-select>
			</view>
			<u-form-item label="标题" prop='title'>
				<u-input v-model="form.title" confirm-type='next' :placeholder="'标题'" :trim="true" />
			</u-form-item>
			<u-form-item label="作业天数" prop='workDays' required>
				<u-input v-model="form.workDays" confirm-type='next' type='number' :placeholder="'作业天数（输入数字即可）'" :trim="true" />
			</u-form-item>
			<u-form-item label="船号" prop="fishingBoats" required>
				<u-input v-model="form.fishingBoats" confirm-type='next' :placeholder="'请输入船号'" :trim="true" />
			</u-form-item>
			<u-form-item label="作业类型" prop="operatingType" required>
				<u-radio-group v-model="form.operatingType">
					<u-radio v-for="(item, index) in selectorType" :key="index" :name="index" style="width: 33%;margin-bottom: 10rpx;">
						{{item}}
					</u-radio>
				</u-radio-group>
			</u-form-item>
			<u-form-item label="主机功率(千瓦)" prop="machinePower" required>
				<u-input v-model="form.machinePower" confirm-type='next' :placeholder="'请输入主机功率'" :trim="true" type="number"/>
			</u-form-item>
			<u-form-item label="坐标" prop="location" v-show="true">
				<u-input v-model="form.location" confirm-type='next' type='text' :placeholder="'点击获取位置信息'" :trim="true" :disabled='true'
				 @tap="getLocation" />
			</u-form-item>
			<u-form-item label="位置" prop="location" v-show="true">
				<u-input v-model="form.locationResMsg" confirm-type='next' type='text' :placeholder="'点击获取位置信息'" :trim="true"
				 :disabled='true' @tap="getLocation" />
			</u-form-item>
			<u-form-item label="是否公开" prop="status">
				<u-switch v-model="form.status"></u-switch>
			</u-form-item>
		</u-form>
		<view style="margin-top: 30rpx;">
			<u-button :disable="btnLoading" :ripple="true" style="margin-top: 40rpx;" type="primary" @tap='reset' v-if="isLogin"
			 plain>清空图片</u-button>
			<u-button :disable="btnLoading" :ripple="true" style="margin-top: 40rpx;" type="primary" @tap='submit' v-if="isLogin">发布</u-button>
			<u-button :disable="btnLoading" :ripple="true" style="margin-top: 40rpx;" type="primary" @tap='goLogin' v-else>登录后发布</u-button>
		</view>
		<u-modal v-model="modalShow" :show-confirm-button="showConfirm" :show-cancel-button="showCancel" width="500rpx"
		 :title="modalTitle" @cancel="modalShow=false">
			<view style="height: 50rpx;width: 10rpx;"></view>
		</u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				locationHandle: null,
				sizeSelect: false,
				sourceSelect: false,
				action: '',
				selectorType: ['单拖','双拖','拖虾','围网','罩网','刺网','钓具','笼壶','张网','杂渔具','潜捕','拖贝'],
				selector: [{value:0,label:'省流'} ,{value:1,label:'原图'}],
				selector2: [{value:0,label:'拍摄'} ,{value:1,label:'从手机相册选择'}],
				confirmSelectFirstValue: null,
				confirmSelectFirstValue2: null,
				// selector: ['低质量', '中质量', '高质量', '原图'],
				sizeType: ['original', 'compressed'],
				sourceType: ['album', 'camera'],
				showUploadList: false,
				fileList: [],
				form: {
					workDays: '',
					fishingBoats: '',
					operatingType: NaN,
					machinePower: '',
					location: '',
					locationRes: '',
					locationResMsg: '',
					fileIds: '',
					status: true,
					title:'',
					type: 1,
				},
				modalTitle: '',
				modalShow: false,
				btnLoading: false,
				showConfirm: true,
				showCancel: false,
				rules: {
					workDays: [{
						required: true,
						message: '请输入作业天数',
						trigger: 'blur,change'
					}],
					location: [{
						required: false,
						message: '请授权定位',
						trigger: 'blur,change'
					}],
					operatingType: [{
						required: true,
						type: 'number',
						message: '请选择作业类型',
						trigger: 'blur,change'
					}],
					fishingBoats: [{
						required: true,
						message: '请输入船号',
						trigger: 'blur,change'
					}],
					machinePower: [{
						required: true,
						message: '请输入主机功率(千瓦)',
						trigger: 'blur,change'
					}],
				}
			}
		},
		computed: {
			isLogin() {
				return !this.$isEmpty(this.$store.getters.token)
			}
		},
		onReady() {
			// 得到整个组件对象，内部图片列表变量为"lists"
			this.fileList = this.$refs.uUpload.lists;
		},
		mounted() {
			this.getLocation()
			this.$refs.uForm.setRules(this.rules);
			this.action = this.$baseURL + this.$addBaseURL('/file/upload')
		},
		created() {
			// 监听从裁剪页发布的事件，获得裁剪结果
			uni.$on('uAvatarCropper', async path => {
				this.avatar = path;
				// 可以在此上传到服务端
				uni.showLoading()
				let res = await this.$api.uploadApi(path).then(res => res).catch(err => err)
				res = JSON.parse(res)
				if (res.status === 200) {
					this.fileList.push({
						url: this.$baseURL + this.$addBaseURL(res.res[0]['path']),
						id: res.res[0]['id']
					})
				} else {
					this.modalTitle = '上传失败'
					this.modalShow = true
				}
				uni.hideLoading()
			})
		},
		methods: {
			reset() {
				this.fileList = this.$refs.uUpload.lists = [];
				let workDays = this.form.workDays
				let fishingBoats = this.form.fishingBoats
				let machinePower = this.form.machinePower
				let operatingType = this.form.operatingType
				this.form = {
					workDays: '',
					fishingBoats: '',
					operatingType: NaN,
					machinePower: '',
					location: '',
					locationRes: '',
					locationResMsg: '',
					fileIds: '',
					status: true,
					title:'',
					type: 1,
				}
				this.form.workDays = workDays
				this.form.fishingBoats=fishingBoats
				this.form.machinePower=machinePower
				this.form.operatingType=operatingType
				this.confirmSelectFirstValue = null
				this.confirmSelectFirstValue2 = null
				this.getLocation()
			},
			sizeSelectOpen(){
				if(this.$isEmpty(this.confirmSelectFirstValue) ){
					this.sizeSelect=true
				}else{
					this.confirmSelect(this.confirmSelectFirstValue)
				}
			},
			sourceSelectOpen(){
				if(this.$isEmpty(this.confirmSelectFirstValue2) ){
					this.sourceSelect=true
				}else{
					this.confirmSelect2(this.confirmSelectFirstValue2)
				}
			},
			confirmSelect(v) {
				// if (v[0] === 0) {
				// 	this.chooseAvatar(200)
				// } else if (v[0] === 1) {
				// 	this.chooseAvatar(400)
				// } else if (v[0] === 2) {
				// 	this.$refs.uUpload.sizeType = ['original', 'compressed']
				// 	this.sizeType = ['original', 'compressed']
				// 	this.$refs.uUpload.selectFile()
				// } else if (v[0] === 3) {
				// 	this.$refs.uUpload.sizeType = ['original']
				// 	this.sizeType = ['original']
				// 	this.$refs.uUpload.selectFile()
				// }
				console.log(v)
				this.confirmSelectFirstValue = v
				if (v[0]['value'] === 0) {
					this.$refs.uUpload.sizeType = ['original', 'compressed']
					this.sizeType = ['original', 'compressed']
					this.sourceSelectOpen()
					
				} else if (v[0]['value'] === 1) {
					this.$refs.uUpload.sizeType = ['original']
					this.sizeType = ['original']
					this.sourceSelectOpen()
				}
			},
			confirmSelect2(v){
				console.log(v)
				this.confirmSelectFirstValue2 = v
				if (v[0]['value'] === 0) {
					this.$refs.uUpload.sourceType = ['camera']
					this.sourceType = ['camera']
					this.$refs.uUpload.selectFile()
				} else if (v[0]['value'] === 1) {
					this.$refs.uUpload.sourceType = ['album']
					this.sourceType = ['album']
					this.$refs.uUpload.selectFile()
				}
			},
			chooseAvatar(destWidth) {
				// 此为uView的跳转方法，详见"文档-JS"部分，也可以用uni的uni.navigateTo
				this.$u.route({
					// 关于此路径，请见下方"注意事项"
					url: '/uview-ui/components/u-avatar-cropper/u-avatar-cropper',
					// 内部已设置以下默认参数值，可不传这些参数
					params: {
						// 输出图片宽度，高等于宽，单位px
						destWidth: destWidth,
						// 裁剪框宽度，高等于宽，单位px
						rectWidth: 300,
						// 输出的图片类型，如果'png'类型发现裁剪的图片太大，改成"jpg"即可
						fileType: 'jpg',
					}
				})
			},
			getLocation() {
				if(!this.$isEmpty(this.locationHandle)) clearInterval(this.locationHandle);
				this.getLocationFun()
				this.locationHandle=setInterval(this.getLocationFun,60000)
			},
			getLocationFun(){
				uni.getLocation({
					type: 'wgs84',
					geocode: true,
					success: (res) => {
						this.form.locationRes = JSON.stringify(res['address'])
						this.form.locationResMsg =
							(res['address']['country'] ? res['address']['country'] : '') +
							(res['address']['province'] ? res['address']['province'] : '') +
							(res['address']['city'] ? res['address']['city'] : '') +
							(res['address']['district'] ? res['address']['district'] : '') +
							(res['address']['street'] ? res['address']['street'] : '') +
							(res['address']['streetNum'] ? res['address']['streetNum'] : '') +
							(res['address']['poiName'] ? res['address']['poiName'] : '')
						this.form.location = res.longitude.toFixed(4) + ',' + res.latitude.toFixed(4)
					}
				});
			},
			goLogin() {
				uni.switchTab({
					url: '/pages/person/index'
				});
			},
			submit() {
				this.$refs.uForm.validate(async valid =>{
					if	(valid) {
						uni.showLoading()
						this.form.fileIds = '';
						/* let files = [];
						// 通过filter，筛选出上传进度为100的文件(因为某些上传失败的文件，进度值不为100，这个是可选的操作)
						await this.$refs.uUpload.upload();
						files = this.$refs.uUpload.lists.filter(val => {
							return val.progress == 100;
						}); */
						this.fileList.forEach((item, index) => {
							if (index !== 0) this.form.fileIds += ',';
							this.form.fileIds += this.$isEmpty(item['id']) ? item['response']['res'][0]['id'] : item['id']
						})
						let data = { ...this.form}
						data.status = data.status? 1 : 2
						let res = await this.$api.postPublishApi(data).then(res => res).catch(err => err)
						if (res.status === 200) {
							uni.showToast({
								title: '提交成功'
							})
							setTimeout(() => {
								uni.switchTab({
									url: '/pages/home/index'
								});
							}, 1000)
						} else if (!this.$isEmpty(res['msg'])) {
							this.modalTitle = res['msg']
							this.modalShow = true
						} else {
							this.modalTitle = '发生未知错误'
							this.modalShow = true
						}
						uni.hideLoading()
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #FFFFFF;
	}
	


	.wrap {
		padding: 24rpx;
	}

	.slot-btn {
		width: 341rpx;
		height: 140rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: rgb(244, 245, 246);
		border-radius: 10rpx;
	}

	.slot-btn__hover {
		background-color: rgb(235, 236, 238);
	}

	.pre-box {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
	}

	.pre-item {
		flex: 0 0 48.5%;
		border-radius: 10rpx;
		height: 140rpx;
		overflow: hidden;
		position: relative;
		margin-bottom: 20rpx;
	}

	.pre-item-image {
		width: 100%;
		height: 140rpx;
	}
</style>
