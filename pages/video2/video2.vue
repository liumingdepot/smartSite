<template>
	<view>
		<video :src="src" controls autoplay></video>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src:''
			}
		},
		onLoad(obj) {
			this.src = decodeURIComponent(obj.src)
		}
	}
</script>

<style>
video{
	width: 100vw;
	height: 100vh;
}
</style>
