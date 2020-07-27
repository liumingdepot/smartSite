<template>
	<view class="none">
		<view class="header">
			<image class="img" src="/static/image/back1.png" @tap="back"></image>
			<view style="padding-right: 50rpx;">健康填报</view>
		</view>
		<view class="title">
			<view class="item">您还没有填报健康信息</view>
			<view class="item">赶快填写吧！</view>
		</view>
		<view class="img">
			<image src="/static/image/null.png" mode=""></image>
		</view>
		<view class="btn" @tap="btn">开始填报</view>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			back() {
				uni.navigateBack()
			},
			btn(){
				this.$emit('changeShow',2)
			}
		}
	}
</script>

<style scoped lang="scss">
.none{
	min-height: 100vh;
	background-color: #F0F4FB;
	width: 750rpx;
	.header{
		position: fixed;
		width: 100%;
		height: 120rpx;
		padding-top: $height;
		box-sizing: content-box;
		display: grid;
		grid-template-columns: 50rpx auto;
		text-align: center;
		align-items: center;
		font-size: 34rpx;
		background-color: #387ce0;
		color: #ffffff;
		.img{
			padding-left: 38rpx;
			width: 34rpx;
			height: 34rpx;
		}
	}
	.title{
		padding-top: 220rpx;
		.item{
			padding-top: $height;
			color: #708ab1;
			font-size: 40rpx;
			text-align: center;
		}
	}
	.img{
		padding: 50rpx 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.btn{
		color: #6f9fe7;
		text-align: center;
		line-height: 110rpx;
		width: 640rpx;
		margin: 0 auto;
		border: 4rpx solid #6f9fe7;
		border-radius: 55rpx;
		background-color: #dce8f8;
	}
}
</style>
