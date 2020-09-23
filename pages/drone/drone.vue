<template>
	<view class="drone">
		<view class="header"><image src="/static/image/ww.png" mode=""></image></view>
		<view class="charts">
			<view class="title2"><view class="wpj">雾泡机数据</view></view>
			<view class="body3" @tap="show = true">
				<image style="width: 40rpx;height: 40rpx;" src="/static/icon/date.png" mode=""></image>
				<view>{{str}}</view>
				<image style="margin-left: 10rpx;width: 36rpx;height: 36rpx;transform: rotate(-90deg);" src="/static/icon/back.png" mode=""></image>
			</view>
			<view class="grid">
				<view v-for="(item, index) in opts" :key="item.name" class="box">
					<view class="value">{{ item.value }}</view>
					<view class="name" :style="{ color: item.color }">
						<text :style="{ 'background-color': item.color }" class="shu"></text>
						<text>{{ item.name.toUpperCase() == 'VOCS' ? 'VOCs' : item.name.toUpperCase() }}</text>
					</view>
				</view>
			</view>
			<v-charts chartType="line" v-if="opts1" :opts="opts1" canvasId="charts1" :cWidth="cWidth" :cHeight="cHeight" />
			<v-charts chartType="line" v-if="opts2" :opts="opts2" canvasId="charts2" :cWidth="cWidth" :cHeight="cHeight" />
		</view>
		<u-calendar v-model="show" mode="range" @change="changeDate"></u-calendar>
	</view>
</template>

<script>
import vCharts from '@/components/u-charts/component.vue';
import { getUdpData } from './server.js';
export default {
	components: {
		vCharts
	},
	data() {
		return {
			data: {},
			data2: {},
			cWidth: 0,
			cHeight: 0,
			opts: [],
			opts1: null,
			opts2: null,
			show: false,
			str:''
		};
	},
	onLoad() {
		const info = uni.getSystemInfoSync();
		this.cWidth = info.screenWidth - 40;
		this.cHeight = (info.screenWidth * 2) / 3;
		this.getDrone();
	},
	methods: {
		changeDate(value){
			this.opts1 = null
			this.opts2 = null
			this.getDrone(value.startDate,value.endDate)
		},
		async getDrone(stime= '',etime='') {
			const res = await getUdpData(stime,etime);
			res.stime = res.stime.split('-').slice(1).join('-')
			res.etime = res.etime.split('-').slice(1).join('-')
			if (res.stime == res.etime) {
				this.str = res.stime;
			} else {
				this.str = res.stime + ' 至 ' + res.etime;
			}
			const arr = res.data;
			
			const series1 = [{ name: 'pm1', data: [], color: '#03c7e5' }, { name: 'pm10', data: [], color: '#b946f0' }, { name: 'pm25', data: [], color: '#4291fd' }];
			const series2 = [{ name: 'no2', data: [], color: '#82ff45' }, { name: 'vocs', data: [], color: '#ff45a1' }];
			const categories = [];
			for (let i = 1; i < arr.length; i += 100) {
				categories.push(arr[i].createTime.split(' ')[1]);
				series1[0].data.push(arr[i]['pm1']);
				series1[1].data.push(arr[i]['pm10']);
				series1[2].data.push(arr[i]['pm2.5']);
				series2[0].data.push(arr[i]['no2']);
				series2[1].data.push(arr[i]['vocs']);
			}
			this.opts = [
				{ name: 'pm1', value: series1[0].data[0], color: series1[0].color },
				{ name: 'pm10', value: series1[1].data[0], color: series1[1].color },
				{ name: 'pm25', value: series1[2].data[0], color: series1[2].color },
				{ name: 'no2', value: series2[0].data[0], color: series2[0].color },
				{ name: 'vocs', value: series2[1].data[0], color: series2[1].color }
			];
			this.opts1 = {
				categories,
				series: series1,
				min: 8,
				max: 20
			};
			this.opts2 = {
				categories,
				series: series2,
				min: 0,
				max: 0.2
			};
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
		background-color: #fff;
		image {
			width: 374rpx;
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
	
	.grid {
		width: 100%;
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
