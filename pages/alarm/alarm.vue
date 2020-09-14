<template>
	<view class="table">
		<view class="header">
			<!-- 标题 -->
			<view class="top">
				<image src="/static/icon/back.png" class="img" @tap="back"></image>
				<view>报警管理</view>
				<view></view>
			</view>
			<!-- 表头 -->
			<view class="tatle-header">
				<view>报警类型</view>
				<view>开始时间</view>
				<view>事件类型</view>
				<view>设备</view>
			</view>
		</view>
		<view class="main">
			<view v-for="(item,index) in alarmArr" :key="index" class="table-item">
				<view class="item">
					<view class="_item">{{item.channelType}}</view>
					<view class="_item">{{item.alarmTime}}</view>
					<view class="_item">{{item.deviceName}}</view>
					<view class="_item">{{item.channelName}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { alarm } from './server.js';
export default {
	data() {
		return {
			alarmArr:[],
		};
	},
	created() {
		this.getAlarm();
	},
	methods: {
		async getAlarm() {
			const alarmArr = await alarm();
			this.alarmArr = alarmArr
		},
		back(){
			uni.navigateBack()
		},
	}
};
</script>


<style>
	page {
		background-color: #ffffff;
	}
</style>
<style lang="scss" scoped>
	.table {
		background-color: #ffffff;

		.header {
			width: 100%;
			position: fixed;
			top: 0;
			left: 0;
			padding-top: $height;
			background-color: #ffffff;

			.top {
				font-size: 32rpx;
				padding: 0 32rpx;
				height: 90rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.img {
					width: 30rpx;
					height: 30rpx;
				}
			}

			.tatle-header {
				margin-top: 2rpx;
				font-size: 24rpx;
				border-top: 1rpx solid #e1e1e1;
				border-bottom: 1rpx solid #e1e1e1;
				line-height: 68rpx;
				display: grid;
				text-align: center;
				grid-template-columns: 1fr 200rpx 1fr 1fr;
			}
		}

		.main {
			font-size: 24rpx;
			padding-top: 160rpx;

			&::before {
				display: block;
				content: '';
				height: $height;
			}

			.table-item {
				display: flex;
				align-items: center;
				border-bottom: 1rpx solid #e1e1e1;

				.item {
					width: 100%;
					line-height: 68rpx;
					display: grid;
					text-align: center;
					grid-template-columns: 1fr 200rpx 1fr 1fr;
					color: #488df2;
				
					._item {
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
				}
			}
		}
	}
</style>


