<template>
	<view class="index">
		<view class="header">
			<view class="title">{{ project.proname }}</view>
			<view class="box">
				<view class="duration">项目工期</view>
				<view class="date">{{ project.protime }}</view>
				<view class="time">{{ project.curday }}/{{ project.totalday }}</view>
			</view>
			<progress class="progress" :percent="20" stroke-width="10" backgroundColor="#5f95e4" activeColor="#4ddda3" />
		</view>
		<!-- 头部轮播 -->
		<view class="environmental">
			<swiper :indicator-dots="true" class="swiper" indicator-active-color="#5f95e4">
				<!-- 今日环境指数 -->
				<swiper-item>
					<view class="swiper-item">
						<wiew class="top">
							<view class="left">
								<image src="/static/image/b1.png" mode=""></image>
								<view>今日环境指数</view>
							</view>
							<view class="right">{{ todayDate.time }}</view>
						</wiew>
						<view class="data1">
							<view class="item" v-for="(item, index) in todayDate.todayDate1" :key="index">
								<view>{{ item.itemavgvalue }}</view>
								<view class="name">{{ item.itemname }}</view>
							</view>
						</view>
						<view class="data2">
							<view class="item" v-for="(item, index) in todayDate.todayDate2" :key="index">
								<view>{{ item.itemavgvalue }}</view>
								<view class="name">{{ item.itemname }}</view>
							</view>
						</view>
					</view>
				</swiper-item>
				<!-- 实时进场人数 -->
				<swiper-item>
					<view class="swiper-item">
						<wiew class="top">
							<view class="left">
								<image src="/static/image/b3.png" mode=""></image>
								<view>实时进场人数</view>
							</view>
							<view class="right" @tap="navTo('/pages/attendance/attendance')">查看详情</view>
						</wiew>
						<view style="padding: 0 110rpx;display: flex;align-items: center;justify-content: space-between;height: 300rpx;">
							<view>
								<view style="color: #387ce0;margin-bottom: 30rpx;text-align: center;">
									<text style="font-size: 50rpx;">{{ attendance.total }}</text>
									<text style="font-size: 30rpx;">&nbsp;&nbsp;&nbsp;&nbsp;人</text>
								</view>
								<view style="padding: 8rpx 12rpx;color: #fff;background-color: #a5b8e2;">工程总人数</view>
							</view>
							<view style="width: 4rpx;height: 200rpx;background-color: #e5e5e5;"></view>
							<view>
								<view style="color: #26bf82;margin-bottom: 30rpx;text-align: center;">
									<text style="font-size: 50rpx;">{{ attendance.enter }}</text>
									<text style="font-size: 30rpx;">&nbsp;&nbsp;&nbsp;&nbsp;人</text>
								</view>
								<view style="padding: 8rpx 12rpx;color: #fff;background-color: #a5b8e2;">进场人数</view>
							</view>
						</view>
					</view>
				</swiper-item>
				<!-- 无人机检测数据 -->
				<swiper-item>
					<view class="swiper-item">
						<wiew class="top">
							<view class="left">
								<image src="/static/image/b3.png" mode=""></image>
								<view>无人机检测数据</view>
							</view>
							<view class="right" @tap="navTo('/pages/drone/drone')">查看详情</view>
						</wiew>
						<view class="data1">
							<view class="item" v-for="(item, index) in getUdpData.getUdpData1" :key="index">
								<view>{{ item.itemavgvalue }}</view>
								<view class="name">{{ item.itemname }}</view>
							</view>
						</view>
						<view class="data2">
							<view class="item" v-for="(item, index) in getUdpData.getUdpData2" :key="index">
								<view>{{ item.itemavgvalue }}</view>
								<view class="name">{{ item.itemname }}</view>
							</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<!-- banner -->
		<swiper class="swiper-banner" autoplay>
			<swiper-item>
				<view class="banner-item"><image src="/static/banner.png" mode=""></image></view>
			</swiper-item>
			<swiper-item>
				<view class="banner-item"><image src="/static/banner.png" mode=""></image></view>
			</swiper-item>
			<swiper-item>
				<view class="banner-item"><image src="/static/banner.png" mode=""></image></view>
			</swiper-item>
		</swiper>
		<!-- 导航 -->
		<view class="navBar">
			<view class="item" v-for="(item, index) in nav" :key="index" @tap="navTo(item.path)">
				<image :src="item.img"></image>
				<view>{{ item.title }}</view>
			</view>
		</view>
		<!-- 实时监控 -->
		<view class="monitor">
			<wiew class="top">
				<view class="left">
					<image src="/static/image/b2.png" mode=""></image>
					<text>实时监控</text>
				</view>
				<view class="right" @tap="navTo('/pages/monitor/monitor')">更多</view>
			</wiew>
			<view class="scroll">
				<view class="img" v-for="(item, index) in monitors" :key="index" @tap="navToVideo(item)">
					<image :src="item.img" style="width: 100%;height: 100%;" alt=""></image>
				</view>
			</view>
		</view>
		<!-- 我的任务 -->
		<view class="task" v-if="task.length > 0">
			<view class="top">我的任务（{{ task.length }}）</view>
			<view class="main">
				<view class="item" v-for="(item, index) in task" :key="index">
					<image class="avatar" src="/static/avatar.jpg"></image>
					<view class="right">
						<view class="name">{{ item.creatname }}</view>
						<view class="title">{{ item.taskcontent }}</view>
						<view class="img" v-for="(img, i) in item.imgs" :key="i" @tap="previewImage(item.imgs, i)">
							<image :src="img" style="width: 100%;height: 100%;"></image>
						</view>
						<view class="date">{{ item.tasktime }}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { taskAppList, todayDate, project, getAccessToken, getList, getVideoImg, attendance,getUdpData } from './server.js';
export default {
	data() {
		return {
			nav: [
				{
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
			getUdpData:{},
			monitors: [],
			task: [],
			todayDate: {},
			project: {},
			loading: true,
			attendance: {}
		};
	},
	onLoad() {
		this.initData();
	},
	methods: {
		async initData() {
			uni.showLoading({
				title: '加载中',
				icon: 'none'
			});
			const data = await taskAppList();
			for (let item of data.mytask) {
				item.imgs = item.taskimg.split(',');
			}
			this.task = data.mytask;
			this.todayDate = await todayDate();

			this.getUdpData = await getUdpData();

			this.project = await project();
			this.loading = false;

			const accessToken = await getAccessToken();
			const monitorsVideo = await getList(accessToken);
			const videoImg = await getVideoImg();
			for (let item of monitorsVideo) {
				for (let val of videoImg) {
					if (val.tdh == item.channelNo) {
						this.monitors.push({
							...item,
							name: val.tdmc,
							img: val.imgurl
						});
					}
				}
			}
			this.monitors.length = 2;
			uni.hideLoading();

			this.attendance = await attendance();
		},
		navToVideo(val) {
			uni.navigateTo({
				url: `/pages/video/video?url=${val.liveAddress}&name=${val.name}`
			});
		},
		previewImage(imgs, index) {
			let newImg = imgs.splice(index, imgs.length - index);
			let urls = [...newImg, ...imgs];
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
			});
		}
	}
};
</script>

<style scoped lang="scss">
.index {
	.header {
		position: fixed;
		z-index: 999;
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
		padding-top: 322rpx;
		width: 100%;

		.swiper {
			height: 450rpx;

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
						color: #387ce0;
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
						text-align: center;
						.name {
							padding: 4rpx 10rpx;
							margin-top: 10rpx;
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
	.swiper-banner {
		background-color: #f0f4fb;
		width: 100%;
		.banner-item {
			padding: 28rpx 14rpx 0 14rpx;
			height: 260rpx;
			image {
				width: 100%;
				height: 100%;
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
				width: 330rpx;
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
