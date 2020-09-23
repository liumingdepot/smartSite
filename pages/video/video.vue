<template>
	<view id="video"><web-view class="web" v-if="url" :src="url"></web-view></view>
</template>

<script>
export default {
	data() {
		return {
			url: ''
		};
	},
	onUnload() {
		// #ifdef APP-PLUS
		plus.screen.lockOrientation('portrait-primary');
		uni.showLoading();
		setTimeout(() => {
			uni.hideLoading();
		}, 1200);
		// #endif
	},
	onLoad(obj) {
		uni.showLoading();
		// #ifdef APP-PLUS
		setTimeout(() => {
			const { deviceSerial, channelNo, name, accessToken } = obj;
			const url = 'https://open.ys7.com/ezopen/h5/iframe_se?url=ezopen://open.ys7.com/' + deviceSerial + '/';
			const par = channelNo + '.hd.live&autoplay=1&audio=1&accessToken=' + accessToken;
			this.url = url + par;
			uni.hideLoading();
			plus.screen.lockOrientation('landscape-primary');
		}, 1200);
		// #endif
	}
};
</script>

<style>
#video {
	transform: rotate(30deg);
}
</style>
