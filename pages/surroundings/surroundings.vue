<template>
	<view class="drone">
		<view class="header"><image style="width: 250rpx;" src="/static/wupo.png" mode=""></image></view>
		<view class="box">
			<view class="title">
				<view class="wpj">雾泡机管理</view>
				<u-switch size="36" inactive-color="#d6d6d6" @change="changeSwitch" v-model="value1" :loading="loading" v-if="!cutover"></u-switch>
				<view v-if="cutover">{{ value1 ? '开启' : '关闭' }}</view>
			</view>
			<view class="body2" v-if="cutover">
				<view class="body2Box">
					<view>雾泡机启动阈值</view>
					<view style="color: #387CE0;">
						{{ value2 * 3 }}
						<text style="font-size: 20rpx;">{{ '  ' + 'mg/m³' }}</text>
					</view>
				</view>
				<u-slider v-model="value2" @end="changeSlider" height="14"></u-slider>
			</view>
			<view class="body" @tap="changeCutover">
				<image src="/static/icon/switer.png" mode=""></image>
				<view>{{ cutover ? '切换手动' : '切换自动' }}</view>
			</view>
		</view>
		<!-- <view class="header"><image src="/static/image/qqq.png" mode=""></image></view> -->
		<view class="charts">
			<view class="title2"><view class="wpj">雾泡机数据</view></view>
			<view class="body3" @tap="show = true">
				<image style="width: 40rpx;height: 40rpx;" src="/static/icon/date.png" mode=""></image>
				<view>{{ str }}</view>
				<image style="margin-left: 10rpx;width: 36rpx;height: 36rpx;transform: rotate(-90deg);" src="/static/icon/back.png" mode=""></image>
			</view>
			<view class="grid">
				<view v-for="(item, index) in list" :key="item.name" class="box">
					<view class="value">{{ item.value }}</view>
					<view class="name" :style="{ color: item.color }">
						<text :style="{ 'background-color': item.color }" class="shu"></text>
						<text>{{ item.name.toUpperCase() == 'VOCS' ? 'VOCs' : item.name.toUpperCase() }}</text>
					</view>
				</view>
			</view>
			<v-charts chartType="line" v-if="opts" :opts="opts" canvasId="charts" :cWidth="cWidth" :cHeight="cHeight" />
		</view>
		<u-calendar v-model="show" mode="range" @change="changeDate"></u-calendar>
	</view>
</template>

<script>
import vCharts from '@/components/u-charts/component.vue';
import { getUdpData, getWpjStatus, manualpw, autopw } from './server.js';
export default {
	components: {
		vCharts
	},
	data() {
		return {
			cWidth: 0,
			cHeight: 0,
			opts: null,
			list: [],
			cutover: false,
			value1: 0,
			value2: 0,
			loading: false,
			show: false,
			str: ''
		};
	},
	onLoad() {
		const info = uni.getSystemInfoSync();
		this.cWidth = info.screenWidth - 40;
		this.cHeight = info.screenWidth - 40;
		this.getDrone();
		this.getWpjStatus();
	},
	methods: {
		async getWpjStatus() {
			const data = await getWpjStatus();
			this.value1 = data.sw == 'on' ? 1 : 0;
			this.value2 = data.value / 3;
		},
		async getDrone(stime = '', etime = '') {
			const res = await getUdpData(stime, etime);
			res.stime = res.stime.split('-').slice(1).join('-')
			res.etime = res.etime.split('-').slice(1).join('-')
			if (res.stime == res.etime) {
				this.str = res.stime;
			} else {
				this.str = res.stime + ' 至 ' + res.etime;
			}
			const arr = res.data;
			const series = [
				{ name: 'TSP', data: [], color: '#03c7e5' },
				{ name: 'PM10', data: [], color: '#b946f0' },
				{ name: 'PM2.5', data: [], color: '#4291fd' },
				{ name: '湿度', data: [], color: '#82ff45' },
				{ name: '气压', data: [], color: '#ff45a1' },
				{ name: '噪声', data: [], color: '#03c7e5' }
			];
			const categories = [];
			for (let i = 1; i < arr.length - 1; i += 20) {
				categories.push(arr[i].systime);
				if (arr[i]['TSP']) {
					series[0].data.push(arr[i]['TSP']);
				} else {
					series[0].data.push(0);
				}
				if (arr[i]['PM10']) {
					series[1].data.push(arr[i]['PM10']);
				} else {
					series[1].data.push(0);
				}
				if (arr[i]['PM2.5']) {
					series[2].data.push(arr[i]['PM2.5']);
				} else {
					series[2].data.push(0);
				}
				if (arr[i]['湿度']) {
					series[3].data.push(arr[i]['湿度']);
				} else {
					series[3].data.push(0);
				}
				if (arr[i]['气压']) {
					series[4].data.push(arr[i]['气压']);
				} else {
					series[4].data.push(0);
				}
				if (arr[i]['噪声']) {
					series[5].data.push(arr[i]['噪声']);
				} else {
					series[5].data.push(0);
				}
			}
			this.list = [
				{ name: 'TSP', value: series[0].data[0] ? series[0].data[0] : 0, color: '#03c7e5' },
				{ name: 'PM10', value: series[1].data[0] ? series[1].data[0] : 0, color: '#b946f0' },
				{ name: 'PM2.5', value: series[2].data[0] ? series[2].data[0] : 0, color: '#4291fd' },
				{ name: '湿度', value: series[3].data[0] ? series[3].data[0] : 0, color: '#82ff45' },
				{ name: '气压', value: series[4].data[0] ? series[4].data[0] : 0, color: '#ff45a1' },
				{ name: '噪声', value: series[5].data[0] ? series[5].data[0] : 0, color: '#03c7e5' }
			];
			this.opts = {
				categories,
				series,
				min: 0,
				max: 120
			};
		},
		changeCutover() {
			this.cutover = !this.cutover;
		},
		async changeSlider() {
			uni.showLoading({
				title: '修改中！！'
			});
			const num = this.value2 * 3;
			const res = await autopw(num);
			if (res.cmd1 == 'success' && res.cmd2 == 'success') {
				this.getWpjStatus();
				uni.showToast({
					title: '修改成功！',
					icon: 'none'
				});
				uni.hideLoading();
			} else {
				uni.showToast({
					title: '修改失败,请重试！',
					icon: 'none'
				});
				uni.hideLoading();
			}
		},
		async changeSwitch(value) {
			this.loading = true;
			const res = await manualpw(+value);
			if (res.cmd1 == 'success' && res.cmd2 == 'success') {
				this.getWpjStatus();
				this.loading = false;
				uni.showToast({
					title: '修改成功！',
					icon: 'none'
				});
			} else {
				uni.showToast({
					title: '修改失败,请重试！',
					icon: 'none'
				});
			}
		},
		changeDate(value) {
			this.opts = null;
			this.getDrone(value.startDate, value.endDate);
		}
	}
};
</script>
<style>
page {
	background: #e5e5e5;
}
</style>
<style scoped lang="scss">
.drone {
	width: 750rpx;
	.header {
		width: 100%;
		height: 374rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border-top: 2rpx solid #e4ecf8;
		border-bottom: 2rpx solid #e4ecf8;
		background: #fff;
		image {
			width: 750rpx;
			height: 285rpx;
		}
	}

	.charts {
		margin: 20rpx 26rpx;
		background-color: #fff;
		border-radius: 12rpx;
		.body3 {
			margin: 0 24rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			border-top: 2rpx solid #e5e5e5;
			height: 126rpx;
			image {
				width: 44rpx;
				height: 44rpx;
				margin-right: 20rpx;
			}
		}
		.title2 {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 24rpx;
			height: 80rpx;
			.wpj {
				display: flex;
				align-items: center;
				&::before {
					content: '';
					display: block;
					width: 8rpx;
					height: 28rpx;
					background: #4484e1;
					border-radius: 4rpx;
					margin-right: 10rpx;
				}
			}
		}
	}
	.box {
		margin: 20rpx 26rpx;
		background-color: #fff;
		border-radius: 12rpx;
		.title {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 24rpx;
			height: 80rpx;
			.wpj {
				display: flex;
				align-items: center;
				&::before {
					content: '';
					display: block;
					width: 8rpx;
					height: 28rpx;
					background: #4484e1;
					border-radius: 4rpx;
					margin-right: 10rpx;
				}
			}
		}
		.body {
			margin: 0 24rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			border-top: 2rpx solid #e5e5e5;
			height: 126rpx;
			image {
				width: 44rpx;
				height: 44rpx;
				margin-right: 20rpx;
			}
		}
		.body2 {
			margin: 0 24rpx;
			border-top: 2rpx solid #e5e5e5;

			.body2Box {
				display: flex;
				align-items: center;
				justify-content: space-between;
				height: 100rpx;
			}
		}
	}
	.grid {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-template-rows: 165rpx 165rpx;
		text-align: center;
		.box {
			.value {
				font-size: 34rpx;
				line-height: 90rpx;
			}
			.name {
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 26rpx;
				.shu {
					width: 10rpx;
					height: 20rpx;
					border-radius: 5rpx;
					margin-right: 6rpx;
				}
			}
		}
	}
}
</style>
