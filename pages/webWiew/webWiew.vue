<template>
	<view><web-view v-if="url" :src="url"></web-view></view>
</template>

<script>
export default {
	data() {
		return {
			url: ''
		};
	},
	onLoad(obj) {
		this.url = obj.url;
	}
};
</script>

<style></style>
