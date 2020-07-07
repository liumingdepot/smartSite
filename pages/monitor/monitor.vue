<template>
	<view class="monitors">
		<view class="item"  v-for="(item,index) in monitorsVideo" :key="index">
			<view class="title">{{item.title}}</view>
			<view class="box">
				<view class="list" v-for="(val,i) in item.list" :key="i" @tap="navTo">
					<view class="img"></view>
					<view style="padding-left: 20rpx;">摄像头{{i}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				monitorsVideo:[
					{title:'A区',list:[,,]},
					{title:'B区',list:[,,,,]},
					{title:'C区',list:[,,,,,]},
					{title:'D区',list:[,,,,,]}
				]
			};
		},
		methods:{
			navTo(){
				uni.navigateTo({
					url:'/pages/video/video'
				})
			}
		}
	}
</script>
<style>
	page{
		background-color: #f0f4fb;
	}
</style>
<style lang="scss" scoped>
.monitors{
	.item{
		.title{
			color:#387ce0;
			line-height: 106rpx;
			padding-left: 45rpx;
		}
		.box{
			padding: 0 10rpx;
			display: grid;
			grid-template-columns: 1fr 1fr;
			grid-gap: 10rpx;
			.list{
				background-color: #ffffff;
				line-height: 65rpx;
				border-radius: 0 0 8rpx 8rpx;
				.img{
					background-color: #387ce0;
					height: 202rpx;
				}
				
			}
		}
	}
}
</style>
