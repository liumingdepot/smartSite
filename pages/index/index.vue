<template>
	<view class="index">
		<view class="header">
			<view class="title">{{project.proname}}</view>
			<view class="box">
				<view class="duration">项目工期</view>
				<view class="date">{{project.protime}}</view>
				<view class="time">{{project.curday}}/{{project.totalday}}</view>
			</view>
			<progress class="progress" :percent="20" stroke-width="10" backgroundColor="#5f95e4" activeColor="#4ddda3" />
		</view>
		<view class="environmental">
			<swiper :indicator-dots="true" class="swiper" indicator-active-color="#5f95e4">
				<swiper-item>
					<view class="swiper-item">
						<wiew class="top">
							<view class="left">
								<image src="/static/image/b1.png" mode=""></image>
								<view>今日环境指数</view>
							</view>
							<view class="right">{{todayDate.time}}</view>
						</wiew>
						<view class="data1">
							<view class="item">
								<view>{{todayDate['噪音']||0}}</view>
								<view class="name">噪音</view>
							</view>
							<view class="item">
								<view>{{todayDate['PM25']||0}}</view>
								<view class="name">PM2.5</view>
							</view>
							<view class="item">
								<view>{{todayDate['PM10']||0}}</view>
								<view class="name">PM10</view>
							</view>
						</view>
						<view class="data2">
							<view class="item">
								<view class="name">NOx</view>
								<view>{{todayDate['NOx']||0}}</view>
							</view>
							<view class="item">
								<view class="name">VOCs</view>
								<view>{{todayDate['VOCs']||0}}</view>
							</view>
							<view class="item">
								<view class="name">NOx</view>
								<view>{{todayDate['NOx']||0}}</view>
							</view>
						</view>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">
						<wiew class="top">
							<view class="left">
								<image src="/static/image/b3.png" mode=""></image>
								<view>实时经常人数</view>
							</view>
							<view class="right">1小时前</view>
						</wiew>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="navBar">
			<view class="item" v-for="(item,index) in nav" :key="index" @tap="navTo(item.path)">
				<image :src="item.img"></image>
				<view>{{item.title}}</view>
			</view>
		</view>
		<view class="monitor">
			<wiew class="top">
				<view class="left">
					<image src="/static/image/b2.png" mode=""></image>
					<text>实时监控</text>
				</view>
				<view class="right" @tap="navTo('/pages/monitor/monitor')">更多</view>
			</wiew>
			<view scroll-x="true" class="scroll">
				<view class="img" v-for="(item,index) in monitors" :key="index" @tap="navTo('/pages/video/video')"></view>
			</view>
		</view>
		<view class="task">
			<view class="top">我的任务（{{task.length}}）</view>
			<view class="main">
				<view class="item" v-for="(item,index) in task" :key="index">
					<image class="avatar" src="/static/avatar.jpg"></image>
					<view class="right">
						<view class="name">{{item.creatname}}</view>
						<view class="title">{{item.taskcontent}}</view>
						<view class="img" v-for="(img,i) in item.imgs" :key="i" @tap="previewImage(item.imgs,i)">
							<image :src="img" style="width: 100%;height: 100%;"></image>
						</view>
						<view class="date">{{item.tasktime}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		taskAppList,
		todayDate,
		project
	} from './server.js'
	export default {
		data() {
			return {
				nav: [{
						title: '任务管理',
						img: '/static/image/a1.png',
						path: '/pages/task/task'
					},
					{
						title: '报警管理',
						img: '/static/image/a2.png',
						path: '/pages/alarm/alarm'
					},
					{
						title: '文档管理',
						img: '/static/image/a3.png',
						path: '/pages/document/document'
					},
					{
						title: '健康填报',
						img: '/static/image/a4.png',
						path: '/pages/health/health'
					},
					{
						title: '通讯录',
						img: '/static/image/a5.png',
						path: '/pages/address/address'
					}
				],
				monitors: [{
					url: 'rtmp://192.168.2.98:1935/live/robot'
				}, {
					url: 'rtmp://192.168.2.98:1935/live/robot'
				}],
				task: [],
				todayDate: {},
				project: {}
			}
		},
		onLoad() {
			this.initData()
		},
		methods: {
			async initData() {
				const data = await taskAppList()
				for (let item of data.mytask) {
					item.imgs = item.taskimg.split(',')
				}
				this.task = data.mytask
				this.todayDate = await todayDate()
				console.log(todayDate['PM2.5']);
				this.project = await project()
			},
			previewImage(imgs, index) {
				let newImg = imgs.splice(index, imgs.length - index)
				let urls = [...newImg, ...imgs]
				// 预览图片
				uni.previewImage({
					urls: urls,
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			},
			navTo(url) {
				uni.navigateTo({
					url
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.index {
		.header {
			padding-top: $height;
			width: 100%;
			height: 322rpx;
			font-size: 36rpx;
			background-color: #387ce0;
			color: #ffffff;

			.title {
				line-height: 108rpx;
				text-align: center;
			}

			.box {
				margin-top: 48rpx;
				display: grid;
				grid-template-columns: 180rpx 360rpx auto;
				align-items: center;
				font-size: 33rpx;

				.duration {
					padding-left: 35rpx;
					font-weight: bold;
				}

				.date {
					font-size: 26rpx;
					color: #91b7ee;
				}
			}

			.progress {
				width: 704rpx;
				margin-left: 23rpx;
				margin-top: 28rpx;
			}
		}

		.environmental {
			// padding-top: $height;
			width: 100%;

			.swiper {
				height: 400rpx;

				.swiper-item {
					.top {
						margin: 0 30rpx;
						height: 86rpx;
						display: flex;
						align-items: center;
						justify-content: space-between;
						border-bottom: 1rpx solid #e5e5e5;

						.left {
							color: #387ce0;
							display: flex;
							align-items: center;

							image {
								width: 40rpx;
								height: 40rpx;
								margin-right: 10rpx;
							}
						}

						.right {
							color: #999;
						}
					}

					.data1 {
						height: 200rpx;
						color: #387ce0;
						display: flex;
						align-items: center;
						justify-content: space-around;

						.item {
							text-align: center;
							font-size: 52rpx;

							.name {
								margin-top: 20rpx;
								padding: 4rpx 10rpx;
								font-size: 28rpx;
								color: #fff;
								background-color: #a5b8e2;
							}
						}
					}

					.data2 {
						color: #387ce0;
						display: flex;
						align-items: center;
						justify-content: space-around;

						.item {
							display: flex;
							align-items: center;

							.name {
								padding: 4rpx 10rpx;
								margin-right: 20rpx;
								font-size: 28rpx;
								color: #fff;
								background-color: #a5b8e2;
							}
						}
					}

					.a {
						height: 312rpx;
						padding: 68rpx 20rpx;
					}
				}
			}
		}

		.navBar {
			height: 234rpx;
			padding: 40rpx 46rpx;
			background-color: #f0f4fb;
			display: flex;
			justify-content: space-between;
			text-align: center;

			image {
				width: 82rpx;
				height: 82rpx;
				margin-bottom: 34rpx;
			}
		}

		.monitor {
			border-bottom: 18rpx solid #f0f4fb;

			.top {
				margin: 0 30rpx;
				height: 86rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.left {
					color: #387ce0;
					display: flex;
					align-items: center;

					image {
						width: 40rpx;
						height: 40rpx;
						margin-right: 10rpx;
					}
				}

				.right {
					color: #999;
				}
			}

			.scroll {
				display: grid;
				grid-template-columns: 1fr 1fr;
				grid-gap: 20rpx;
				padding: 10rpx 20rpx 28rpx 20rpx;

				.img {
					height: 196rpx;
					border-radius: 8rpx;
					background-color: #f0f4fb;
				}
			}
		}

		.task {
			.top {
				width: 100%;
				box-sizing: border-box;
				height: 86rpx;
				line-height: 86rpx;
				padding-left: 32rpx;
				border-bottom: 1rpx solid #e5e5e5;
			}

			.main {
				.item {
					box-sizing: border-box;
					padding: 32rpx;
					display: flex;
					justify-content: space-between;
					border-bottom: 1rpx solid #e5e5e5;

					.avatar {
						width: 52rpx;
						height: 52rpx;
					}

					.right {
						width: 600rpx;

						.name {
							line-height: 52rpx;
							color: #387ce0;
						}

						.title {
							line-height: 52rpx;
						}

						.img {
							display: inline-block;
							margin: 30rpx 10rpx 0 0;
							width: 180rpx;
							height: 160rpx;
							background-color: #f0f4fb;
						}
					}

					.date {
						padding-top: 20rpx;
						color: #c6c6c6;
					}
				}
			}
		}
	}
</style>
