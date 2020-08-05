<template>
	<view class="video"><view id="vidoe"></view></view>
</template>

<script>
import www from './ezuikit.js';
export default {
	data() {
		return {
			url: ''
		};
	},
	onLoad(obj) {
		const { deviceSerial, channelNo, name } = obj;
		this.initVideo(deviceSerial, channelNo);
		uni.setNavigationBarTitle({
			title: name
		});
	},
	methods: {
		initVideo(deviceSerial, channelNo) {
			const info  = uni.getSystemInfoSync()
			//开始初始化监控地址
			this.playr = new EZUIKit.EZUIKitPlayer({
				id: 'vidoe',
				url: `ezopen://open.ys7.com/${deviceSerial}/${channelNo}.hd.live`,
				autoplay: true,
				accessToken: 'at.dhl5063v60wq44ibbvdlegzn7tnmbv08-5j2i2uqgfu-0x4imur-5qy82oich',
				decoderPath: '',
				width: info.windowWidth,
				height: (info.windowWidth / 1920) * 1080 + 48 * 2,
				template: 'security', // simple - 极简版;standard-标准版;security - 安防版(预览回放);voice-语音版；
				autoplay: true
			});
		}
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
