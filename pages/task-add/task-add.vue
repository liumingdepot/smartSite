<template>
	<view class="task">
		<view class="header">
			<image class="img" src="/static/image/back.png" @tap="back"></image>
			<view class="title">新任务</view>
			<view class="release" @tap="submit">发布</view>
		</view>
		<textarea v-model="taskcontent" auto-height placeholder="请输入发布的内容" class="textarea"></textarea>
		<view class="getImg">
			<view class="text">
				<view>最多发送三张照片</view>
				<view>{{imgs.length}}/3</view>
			</view>
			<view class="images">
				<view class="item" v-for="(item,index) in imgs" :key="index">
					<image class="img" :src="item"></image>
				</view>
				<view class="item bg" v-if="imgs.length<3" @tap="getImage">
					<image class="icon" src="/static/image/add.png"></image>
				</view>
			</view>
		</view>
		<view class="contact" @tap="addContactPerson">
			<image class="contact-img" src="/static/image/contact.png"></image>
			<view>添加发送人</view>
		</view>
		<view class="box">
			<view v-for="(item,index) in senduserValue" :key="index" class="item">{{item.split(',')[1]}}</view>
		</view>
		<uni-popup ref="popup" type="center" :maskClick="false">
			<view class="popup">
				<checkbox-group @change="checkboxChange">
					<label class="item" v-for="item in senduser" :key="item.userid">
						<checkbox :value="item.userid + ',' + item.username" :checked="senduserValue.includes(item.userid + ',' + item.username)"/>{{item.username}}-{{item.userrole}}
					</label>
				</checkbox-group>
				<view style="display: flex;justify-content: flex-end;">
					<view class="release" @tap="clonepopup">确认</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {
		taskAppAdd,
		taskAppFileid
	} from './server.js'
	import {
		apiUrl
	} from '@/common/config.js'
	export default {
		data() {
			return {
				fileid: '',
				taskcontent: '',
				imgs: [],
				taskimg: [],
				senduser: this.$store.state.senduser,
				senduserValue: [],
				acceptuserid: [],
				acceptusername: []
			};
		},
		async onLoad() {
			this.fileid = await taskAppFileid()
		},
		methods: {
			getImage() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
					success: res => {
						let imgs = [...this.imgs, res.tempFilePaths[0]]
						imgs.length = imgs.length > 3 ? 3 : imgs.length
						this.imgs = imgs
						uni.uploadFile({
							url: apiUrl + 'taskManage/taskupload', //仅为示例，非真实的接口地址
							filePath: res.tempFilePaths[0],
							name: 'file',
							formData: {
								token: uni.getStorageSync('token'),
								userid: uni.getStorageSync('userid'),
								fileid: this.fileid
							},
							success: resp => {
								const data = JSON.parse(resp.data)
								this.taskimg.push(data.taskimg)
							}
						});
					}
				});
			},
			addContactPerson() {
				this.$refs.popup.open()
			},
			checkboxChange(e) {
				this.senduserValue = e.target.value
			},
			clonepopup() {
				const acceptuserid = []
				const acceptusername = []
				for (let item of this.senduserValue) {
					acceptuserid.push(item.split(',')[0])
					acceptusername.push(item.split(',')[1])
				}
				this.acceptuserid = acceptuserid
				this.acceptusername = acceptusername
				this.$refs.popup.close()
			},
			submit() {
				if(!this.taskcontent || this.imgs.length == 0 || this.senduserValue.length == 0){
					uni.showToast({
						title:'请填写完整',
						icon:"none"
					})
					return
				}
				taskAppAdd({
					taskcontent: this.taskcontent,
					fileid: this.fileid,
					taskimg: this.taskimg.join(','),
					acceptuserid: this.acceptuserid.join(','),
					acceptusername: this.acceptusername.join(','),
				}).then(res => {
					if (res.code == 1) {
						uni.showToast({
							title: '添加成功'
						})
					}
					this.back()
				})
			},
			back() {
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.task {
		.header {
			height: 92rpx;
			padding: 32rpx;
			margin-top: $height;
			display: flex;
			align-items: center;
			justify-content: space-between;
			text-align: center;

			.img {
				width: 40rpx;
				height: 40rpx;
			}

			.title {}

			.release {
				/* #ifdef MP-WEIXIN */
				margin-top: 1000px;
				/* #endif */
				width: 126rpx;
				height: 60rpx;
				background-color: #f7f7f7;
				line-height: 60rpx;
			}
		}

		.textarea {
			width: 690rpx;
			padding: 30rpx;
			min-height: 320rpx;
		}

		.getImg {

			.text {
				line-height: 74rpx;
				color: #666;
				padding: 0 30rpx;
				display: flex;
				justify-content: space-between;
			}

			.images {
				display: flex;

				.bg {
					background-color: #e9f1fc;
					display: flex;
					align-items: center;
					justify-content: center;
				}

				.item {
					width: 210rpx;
					height: 210rpx;
					margin-left: 30rpx;

					.icon {
						width: 56rpx;
						height: 56rpx;
					}

					.img {
						width: 100%;
						height: 100%;
					}
				}
			}
		}

		.contact {
			margin-top: 40rpx;
			height: 118rpx;
			border-top: 2rpx solid #e5e5e5;
			border-bottom: 2rpx solid #e5e5e5;
			display: flex;
			align-items: center;
			justify-content: center;

			.contact-img {
				width: 40rpx;
				height: 40rpx;
				margin-right: 10rpx;
			}
		}
		.box{
			.item{
				display: flex;
				align-items: center;
				justify-content: center;
				height: 80rpx;
				border-bottom: 2rpx solid #e5e5e5;
			}
		}

		.popup {
			width: 400rpx;
			height: auto;
			padding: 50rpx;
			background-color: #ffffff;

			.item {
				display: block;
				margin: 20rpx 0;
			}

			.release {
				text-align: center;
				width: 126rpx;
				height: 60rpx;
				background-color: #f7f7f7;
				line-height: 60rpx;
			}
		}
	}
</style>
