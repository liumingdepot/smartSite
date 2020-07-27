<template>
	<view>
		<video class="video":src="url" autoplay :controls="true" :show-fullscreen-btn="true"></video>
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
			console.log(obj)
			uni.setNavigationBarTitle({
			    title: obj.title
			});
			this.url = obj.url
		}
	}
</script>

<style lang="scss" scoped>
	.video {
		width: 100vw;
		height: 100vh;
	}
</style>
