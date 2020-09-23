<template>
	<view class="index">
		<view class="header">
			<view class="title">{{ project.proname }}</view>
			<view class="box">
				<view class="duration">项目工期</view>
				<view class="date">{{ project.protime }}</view>
				<view class="time">{{ project.curday || 0 }}/{{ project.totalday || 0 }}天</view>
			</view>
			<progress class="progress" :percent="parseInt(project.curday/project.totalday * 100)" stroke-width="10" backgroundColor="#5f95e4" activeColor="#4ddda3" />
		</view>
		<!-- 头部轮播 -->
		<view class="environmental">
			<swiper :indicator-dots="true" class="swiper" indicator-active-color="#5f95e4">
				<!-- 今日环境指数 -->
				<swiper-item>
					<view class="swiper-item">
						<wiew class="top">
							<view class="left">
								<image src="/static/icon/a1.png" mode=""></image>
								<view>地面扬尘监测</view>
							</view>
							<view class="right" @tap="navTo('/pages/surroundings/surroundings')">历史数据</view>
						</wiew>
						<view class="grid">
							<view v-for="(item, index) in todayDate" :key="item.name" class="box">
								<view class="value">{{ item.itemavgvalue }}</view>
								<view class="name" :style="{ color: item.color }">
									<text :style="{ 'background-color': item.color }" class="shu"></text>
									<text>{{ item.itemname.toUpperCase() }}</text>
								</view>
							</view>
						</view>
					</view>
				</swiper-item>
				<!-- 无人机检测数据 -->
				<swiper-item>
					<view class="swiper-item">
						<wiew class="top">
							<view class="left">
								<image src="/static/icon/a2.png" mode=""></image>
								<view>无人机监测</view>
							</view>
							<view class="right" @tap="navTo('/pages/drone/drone')">历史数据</view>
						</wiew>
						<view class="grid">
							<view v-for="(item, index) in getUdpData" :key="item.name" class="box">
								<view class="value">{{ item.itemavgvalue }}</view>
								<view class="name" :style="{ color: item.color }">
									<text :style="{ 'background-color': item.color }" class="shu"></text>
									<text>{{ item.itemname.toUpperCase() == 'VOCS' ? 'VOCs' : item.itemname.toUpperCase() }}</text>
								</view>
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
							<view style="width: 1rpx;height: 200rpx;background-color: #e5e5e5;"></view>
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
			</swiper>
		</view>
		<!-- 导航 -->
		<view class="navBar">
			<view class="item" v-for="(item, index) in nav" :key="index" @tap="navTo(item.path)">
				<image :src="item.img"></image>
				<view>{{ item.title }}</view>
			</view>
		</view>
		<!-- banner -->
		<view class="boxBanner">
			<view style="display: flex;align-items: center;justify-content: center;">
				<image style="width: 257rpx;height: 64rpx;" v-if="showBanner == 2" src="/static/icon2/a1.png" @tap="channelNo(1)" mode=""></image>
				<image style="width: 257rpx;height: 64rpx;" v-if="showBanner == 1" src="/static/icon2/a2.png" mode=""></image>
				<image style="width: 257rpx;height: 64rpx;" v-if="showBanner == 1" src="/static/icon2/b1.png" @tap="channelNo(2)" mode=""></image>
				<image style="width: 257rpx;height: 64rpx;" v-if="showBanner == 2" src="/static/icon2/b2.png" mode=""></image>
			</view>
			<swiper class="swiper-banner" autoplay v-show="showBanner == 1">
				<swiper-item v-for="(item, index) in imglist" :key="index">
					<view class="banner-item"><image mode="aspectFill" :src="item.imgurl" @tap="tapImg(item.imgurl)"></image></view>
				</swiper-item>
			</swiper>
			<swiper class="swiper-banner" autoplay v-show="showBanner == 2">
				<swiper-item v-for="(item, index) in videolist" :key="index">
					<view class="banner-item"><image mode="aspectFill" :src="item.imgurl" @tap="tapImg(item.videourl)"></image></view>
				</swiper-item>
			</swiper>
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
				<view class="img" @tap="navToVideo(1)">
					<image src="/static/image/aa1.png" style="width: 100%;height: 100%;" alt=""></image>
				</view>
				<view class="img" @tap="navToVideo(2)">
					<image src="/static/image/aa2.png" style="width: 100%;height: 100%;" alt=""></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { getImgAndVideo, todayDate, project, getAccessToken, getList, getVideoImg, attendance, getUdpData } from './server.js';
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
			getUdpData: {},
			monitors: [],
			todayDate: {},
			project: {},
			loading: true,
			attendance: {},
			videolist: [],
			imglist: [],
			showBanner: 1,
			videoSrc: '',
			accessToken:''
		};
	},
	onLoad() {
		this.initData();
	},
	methods: {
		initData() {
			//工地风采
			getImgAndVideo().then(({ imglist, videolist }) => {
				this.imglist = imglist;
				this.videolist = videolist;
			});
			//1
			todayDate().then(data => {
				this.todayDate = data;
			});
			//2
			getUdpData().then(data => {
				this.getUdpData = data;
			});
			//3
			project().then(data => {
				this.project = data;
			});
			attendance().then(attendance => {
				this.attendance = attendance;
			});
			getAccessToken().then(accessToken=>{
				this.accessToken = accessToken
			})
		},
		reply(item) {
			uni.navigateTo({
				url: '/pages/task-reply/task-reply?taskid=' + item.md.taskid
			});
		},
		navToVideo(index) {
			const channelNo = index == 1 ? 1 : 2
			const name = index == 1 ? '办公区大门' : '污水池'
			const deviceSerial = 'E51738772'
			uni.navigateTo({
				url: `/pages/video/video?deviceSerial=${deviceSerial}&channelNo=${channelNo}&name=${name}&accessToken=${this.accessToken}`
			});
		},
		previewImage(imgs, index) {
			let newImg = imgs.splice(index, imgs.length - index);
			let urls = [...newImg, ...imgs];
			// 预览图片
			uni.previewImage({
				urls: urls
			});
		},
		tapImg(url) {
			if (this.showBanner == 1) {
				uni.previewImage({
					urls: [url]
				});
			} else {
				uni.navigateTo({
					url: '/pages/video2/video2?src=' + encodeURIComponent(url)
				});
			}
		},
		navTo(url) {
			uni.navigateTo({
				url
			});
		},
		channelNo(index) {
			this.showBanner = index;
		}
	}
};
</script>

<style scoped lang="scss">
.index {
	.header {
		position: fixed;
		z-index: 999;
		/* #ifdef APP-PLUS */
		padding-top: $height;
		/* #endif */
		/* #ifdef MP-WEIXIN */
		padding-top: 50rpx;
		/* #endif */
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
			margin-top: 38rpx;
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
							width: 35rpx;
							height: 35rpx;
							margin-right: 10rpx;
						}
					}

					.right {
						color: #387ce0;
					}
				}

				.grid {
					width: 100%;
					display: grid;
					grid-template-columns: 1fr 1fr 1fr;
					grid-template-rows: 160rpx 160rpx;
					text-align: center;
					.box {
						.value {
							font-size: 34rpx;
							line-height: 90rpx;
						}
						.name {
							display: flex;
							justify-content: center;
							align-items: center;
							font-size: 26rpx;
							.shu {
								width: 10rpx;
								height: 20rpx;
								border-radius: 5rpx;
								margin-right: 6rpx;
							}
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
	.boxBanner {
		background-color: #f0f4fb;
		padding-bottom: 24rpx;
		.swiper-banner {
			width: 712rpx;
			height: 320rpx;
			margin: 0 auto;
			border-radius: 10rpx;
			border: 3rpx solid #e5e5e5;

			.banner-item {
				width: 712rpx;
				height: 320rpx;
				image {
					width: 100%;
					height: 100%;
					border-radius: 10rpx;
				}
			}
		}
	}

	.navBar {
		height: 234rpx;
		padding: 40rpx 46rpx;
		display: flex;
		justify-content: space-between;
		text-align: center;
		background-color: #f0f4fb;

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
}
</style>
