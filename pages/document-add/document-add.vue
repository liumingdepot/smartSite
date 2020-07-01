<template>
	<view class="document">
		<view class="header">
			<image class="img" src="/static/image/back.png" @tap="back"></image>
			<view class="title">新任务</view>
			<view class="release">发布</view>
		</view>
		<textarea v-model="textarea" auto-height placeholder="请输入发布的内容" class="textarea"></textarea>
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
		<view class="contact">
			<image class="contact-img" src="/static/image/contact.png" mode=""></image>
			<view>添加发送人</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				textarea: '',
				imgs: []
			};
		},
		methods: {
			getImage() {
				uni.chooseImage({
					count: 3, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
					success: res => {
						let imgs = [...this.imgs, ...res.tempFilePaths]
						imgs.length = imgs.length > 3 ? 3 : imgs.length
						this.imgs = imgs
					}
				});
			},
			back(){
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.document {
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
	}
</style>
