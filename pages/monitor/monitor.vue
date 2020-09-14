<template>
	<view class="monitors">
		<view class="item">
			<view class="list" v-for="(item, index) in monitorsVideo" :key="index" @tap="navTo(item)">
				<view class="img"><image :src="item.img" style="width: 100%;height: 100%;" alt=""></image></view>
				<view style="padding-left: 20rpx;">{{ item.name }}</view>
			</view>
		</view>
	</view>
</template>

<script>
import { getAccessToken, getList,getVideoImg } from './server.js';
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
				url: `/pages/video/video?deviceSerial=${val.deviceSerial}&channelNo=${val.channelNo}&name=${val.name}&accessToken=${val.accessToken}`
			});
		},
		async initData() {
			uni.showLoading({
				title:'加载中',
			})
			const accessToken = await getAccessToken();
			const monitorsVideo = await getList(accessToken);
			const videoImg = await getVideoImg()
			for(let item of monitorsVideo){
				for(let val of videoImg){
					if(val.tdh == item.channelNo){
						this.monitorsVideo.push({
							...item,
							name:val.tdmc,
							img:val.imgurl,
							accessToken:accessToken
						})
					}
				}
			}
			uni.hideLoading()
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
