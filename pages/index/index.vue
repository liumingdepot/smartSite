<template>
	<view class="index">
		<view class="header">
			<view class="title">智慧工地-天马项目</view>
			<view class="box">
				<view class="duration">项目工期</view>
				<view class="date">2020/6/10 - 2020/10/23</view>
				<view class="time">15/128天</view>
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
							<view class="right">1小时前</view>
						</wiew>
						<view class="">

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
				<view class="left" @tap="navTo('/pages/monitor/monitor')">
					<image src="/static/image/b2.png" mode=""></image>
					<text>实时监控</text>
				</view>
				<view class="right"><text style="color: #333;">17</text>/22</view>
			</wiew>
			<scroll-view scroll-x="true" class="scroll">
				<view class="img" v-for="(item,index) in monitors" :key="index" @tap="navTo('/pages/video/video')">
					<video class="video" :src="item.url" autoplay></video>
				</view>
			</scroll-view>
		</view>
		<view class="task">
			<view class="top">我的任务（5）</view>
			<view class="main">
				<view class="item" v-for="(item,index) in task" :key="index">
					<image class="avatar" :src="item.img"></image>
					<view class="right">
						<view class="name">工地主任：张默默</view>
						<view class="title">{{item.title}}</view>
						<view class="img" v-for="(val,i) in item.imgs" :key="i"></view>
						<view class="date">2020/09/20 12:00</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {taskAppList} from './server.js'
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
					},
					{
						url: 'rtmp://192.168.2.98:1935/live/robot'
					},
					{
						url: 'rtmp://192.168.2.98:1935/live/robot'
					},
					{
						url: 'rtmp://192.168.2.98:1935/live/robot'
					},
					{
						url: 'rtmp://192.168.2.98:1935/live/robot'
					},
					{
						url: 'rtmp://192.168.2.98:1935/live/robot'
					},
					{
						url: 'rtmp://192.168.2.98:1935/live/robot'
					},
					{
						url: 'rtmp://192.168.2.98:1935/live/robot'
					},
				],
				task: [{
						title: '工地照明灯不停闪烁，麻烦过来看下',
						img: '/static/image/a1.png',
						imgs: [, , , , , ]
					},
					{
						title: '工地照明灯不停闪烁，麻烦过来看下,工地照明灯不停闪烁，麻烦过来看下',
						img: '/static/image/a2.png',
						imgs: [, ]
					},
					{
						title: '工地照明灯不停闪烁，麻烦过来看下',
						img: '/static/image/a3.png',
						imgs: [, , , ]
					},
					{
						title: '工地照明灯不停闪烁，麻烦过来看下',
						img: '/static/image/a4.png',
						imgs: [, , , ]
					},
					{
						title: '工地照明灯不停闪烁，麻烦过来看下',
						img: '/static/image/a5.png',
						imgs: [, , , , ]
					}
				]
			}
		},
		onLoad() {
			/**
			 * 判断是否登录
			 */
			const userInfo = uni.getStorageSync('userInfo');
			if(userInfo){
				this.initData()
				this.$store.commit('setUserInfo',userInfo)
			}else{
				this.navTo('/pages/login/login')
			}
		},
		methods: {
			async initData() {
				const a = await taskAppList()
				console.log(a);
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
			height: 272rpx;
			font-size: 36rpx;
			background-color: #387ce0;
			color: #ffffff;

			.title {
				line-height: 108rpx;
				text-align: center;
			}

			.box {
				margin-top: 48rpx;
				display: flex;
				font-size: 33rpx;
				align-items: flex-end;

				.duration {
					padding: 0 24rpx 0 35rpx;
					font-weight: bold;
				}

				.date {
					font-size: 26rpx;
					color: #91b7ee;
				}

				.time {
					margin-left: 80rpx;
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

					.a {
						height: 312rpx;
						padding: 68rpx 20rpx;
					}
				}
			}
		}

		.navBar {
			height: 154rpx;
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
				margin: 10rpx 0 28rpx 0;
				white-space: nowrap;

				.img {
					display: inline-block;
					margin-left: 20rpx;
					width: 320rpx;
					height: 196rpx;
					border-radius: 8rpx;
					background-color: #f0f4fb;

					.video {
						width: 320rpx;
						height: 196rpx;
					}
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
