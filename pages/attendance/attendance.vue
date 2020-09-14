<template>
	<view class="attendance">
		<block v-for="(item, index) in dataList" :key="index" class="item">
			<view class="item" @tap="changeItem(item,index)">
				<image style="width: 30rpx;height: 30rpx;" src="/static/icon/jia.png" mode=""></image>
				<image src="/static/icon/renshu.png" mode=""></image>
				<view>{{ item.groupName }}</view>
				<view class="text">
					<view style="color:#387ce0;font-weight: normal;">{{ item.curNum }}</view>
					/
					<view style="color:#666;font-weight: normal;">{{ item.totalNum }}</view>
				</view>
				<view :style="{ width: item.width }" class="line"></view>
				<view class="line2"></view>
			</view>
			<view class="box" v-for="(val, i) in item.list" :key="i" v-if="item.show">
				<view style="font-weight: bold;">{{ val.personName }}</view>
				<view style="text-align: left;">进场{{ val.checkInTime||'--' }}</view>
				<view style="text-align: left;">离场{{ val.checkOutTime||'--' }}</view>
				<view class="text">
					<view v-if="val.checkOutTime" class="cc">离场</view>
					<view v-else-if="val.checkInTime" class="ww">进场</view>
					<view v-else class="hh">离场</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
import { getGroup } from './server.js';
export default {
	data() {
		return {
			dataList: []
		};
	},
	async onLoad() {
		const info = uni.getSystemInfoSync();
		const dataList = await getGroup();
		this.dataList = dataList.map(val => {
			val.width = (val.curNum / val.totalNum) * info.screenWidth + 'px';
			val.show = false
			return val;
		});
	},
	methods:{
		changeItem(item,index){
			if(item.show){
				item.show = false
			}else{
				for(let val of this.dataList){
					if(val.groupName == item.groupName){
						val.show = true
					}else{
						val.show = false
					}
				}
			}
		}
	}
};
</script>

<style lang="scss">
.attendance {
	width: 750rpx;
	.item {
		display: grid;
		line-height: 118rpx;
		width: 100%;
		padding: 0 14rpx;
		box-sizing: border-box;
		align-items: center;
		grid-template-columns: 54rpx 54rpx 480rpx auto;
		font-size: 34rpx;
		font-weight: bold;
		position: relative;
		image {
			width: 42rpx;
			height: 42rpx;
		}
		.text {
			display: flex;
			align-items: center;
			font-size: 30rpx;
		}
		.line {
			position: absolute;
			bottom: 0;
			height: 2rpx;
			background-color: #387ce0;
			z-index: 99;
		}
		.line2 {
			width: 100%;
			position: absolute;
			bottom: 0;
			height: 2rpx;
			background-color: #e5e5e5;
			z-index: 0;
		}
	}
	.box {
		height: 90rpx;
		display: grid;
		align-items: center;
		text-align: center;
		grid-template-columns: 208rpx 1fr 1fr 1fr;
		.text{
			.ww {
				width: 108rpx;
				height: 46rpx;
				line-height: 46rpx;
				text-align: center;
				border-radius: 23rpx;
				background-color: #dae7fa;
				color: #74a4e9;
			}
			.cc {
				width: 108rpx;
				height: 46rpx;
				line-height: 46rpx;
				text-align: center;
				border-radius: 23rpx;
				background-color: #e6e6e6;
				color: #333;
			}
			.hh{
				width: 108rpx;
				height: 46rpx;
				line-height: 46rpx;
				text-align: center;
				border-radius: 23rpx;
				background-color: #e6e6e6;
			}
		}
	}
}
</style>
