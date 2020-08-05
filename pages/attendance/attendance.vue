<template>
	<view class="attendance">
		<view class="header">
			<view>姓名</view>
			<view>签到</view>
			<view>考勤情况</view>
		</view>
		<view class="box">
			<view class="list" v-for="(item, index) in dataList" :key="index">
				<view class="name">{{ item.personName }}</view>
				<view class="Sign">
					<view style="padding-bottom: 20rpx;" class="item">
						<view style="padding-right: 20rpx;">签到</view>
						<view :style="{ color: item.checkInStatus == '正常签入' ? '#333' : '#f30' }">{{ item.checkInTime }}</view>
					</view>
					<view class="item">
						<view style="padding-right: 20rpx;">签退</view>
						<view :style="{ color: item.checkOutStatus == '正常签出' ? '#333' : '#f30' }">{{ item.checkOutTime }}</view>
					</view>
				</view>
				<view class="tag">
					<view class="failure" v-if="item.result == '异常'">{{ item.result }}</view>
					<view class="success" v-else>{{ item.result }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { getAttendance } from './server.js';
export default {
	data() {
		return {
			dataList: []
		};
	},
	async onLoad() {
		const dataList = await getAttendance();
		this.dataList = dataList.map(val => {
			val.checkInTime = val.checkInTime ? val.checkInTime.split(' ')[1] : '-';
			val.checkOutTime = val.checkOutTime ? val.checkOutTime.split(' ')[1] : '-';
			return val;
		});
	}
};
</script>

<style lang="scss">
.attendance {
	width: 750rpx;
	.header {
		width: 100%;
		height: 100rpx;
		z-index: 99;
		position: fixed;
		background-color: #fff;
		top: 0;
		left: 0;
		display: grid;
		align-items: center;
		text-align: center;
		grid-template-columns: 1fr 1fr 1fr;
		border-bottom: 2rpx solid #e4ecf8;
	}
	.box {
		margin-top: 100rpx;
		.list {
			width: 100%;
			height: 174rpx;
			display: grid;
			align-items: center;
			text-align: center;
			grid-template-columns: 1fr 1fr 1fr;
			border-bottom: 2rpx solid #e4ecf8;
			.name {
				font-size: 36rpx;
				font-weight: bolder;
			}
			.Sign {
				color: #a5a5a5;
				.item{
					display: flex;
				}
			}
			.tag {
				display: flex;
				align-items: center;
				justify-content: center;
				.failure {
					width: 148rpx;
					height: 44rpx;
					line-height: 44rpx;
					border-radius: 22rpx;
					color: #ff3300;
					background-color: #ffd6cc;
				}
				.success {
					width: 148rpx;
					height: 44rpx;
					line-height: 44rpx;
					border-radius: 22rpx;
					color: #50a516;
					background-color: #edf9e7;
				}
			}
		}
	}
}
</style>
