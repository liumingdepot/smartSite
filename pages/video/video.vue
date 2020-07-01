<template>
	<view>
		<video class="video" :src="url" autoplay :controls="false" :show-fullscreen-btn="true"></video>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: 'rtmp://192.168.2.98:1935/live/robot'
			};
		}
	}
</script>

<style lang="scss" scoped>
	.video {
		width: 100vw;
		height: 100vh;
	}
</style>
