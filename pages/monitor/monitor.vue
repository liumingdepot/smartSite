<template>
	<view class="monitors">
		<view class="item">
			<view class="list" v-for="(item, index) in monitorsVideo" :key="index" @tap="navTo(item)">
				<view class="img">
					<image src="/static/image/w.jpg" style="width: 100%;height: 100%;" alt=""></image>
					</view>
				<view style="padding-left: 20rpx;">{{ item.deviceSerial }}-{{ item.channelNo }}</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			monitorsVideo: []
		};
	},
	onLoad() {
		this.initData();
	},
	methods: {
		navTo(val) {
			uni.navigateTo({
				url: `/pages/video/video?url=${val.rtmp}&title=${val.deviceSerial}-${val.channelNo}`
			});
		},
		initData(){
			uni.request({
				url: 'https://open.ys7.com/api/lapp/token/get',
				method: 'POST',
				data: {
					appKey:'9090fc50a1114f51b51f909ae4ca4eb6',
					appSecret:'c51ff8e1676a523487bfbf42eb798c87'
				},
				header: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				success: res => {
					this.getMonitorsVideo(res.data.data.accessToken)
				}
			});
		},
		getMonitorsVideo(accessToken) {
			uni.request({
				url: 'https://open.ys7.com/api/lapp/live/video/list',
				method: 'POST',
				data: {
					accessToken,
					pageStart: 0,
					pageSize: 50
				},
				header: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				success: res => {
					this.monitorsVideo = res.data.data;
					console.log(this.monitorsVideo)
				}
			});
		}
	}
};
</script>
<style>
page {
	background-color: #f0f4fb;
}
</style>
<style lang="scss" scoped>
.monitors {
	margin-top: 50rpx;
	.item {
		padding: 0 10rpx;
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: 10rpx;
		.list {
			background-color: #ffffff;
			line-height: 65rpx;
			border-radius: 0 0 8rpx 8rpx;
			.img {
				background-color: #387ce0;
				height: 202rpx;
			}
		}
	}
}
</style>
