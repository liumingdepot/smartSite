<template>
	<view>
		<web-view v-if="url" :src="url"></web-view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			url: ''
		};
	},
	onLoad(obj) {
		const { deviceSerial, channelNo, name,accessToken } = obj;
		this.url = `/hybrid/html/video/index.html?deviceSerial=${deviceSerial}&channelNo=${channelNo}&name=${name}&accessToken=${accessToken}`
	}
};
</script>

<style lang="scss" scoped>
.video {
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;
	.item {
		width: 100vw;
	}
}
</style>
