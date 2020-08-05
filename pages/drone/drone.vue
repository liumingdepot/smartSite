<template>
	<view class="drone">
		<view class="header"><image src="/static/image/ww.png" mode=""></image></view>
		<view class="grid">
			<view v-for="(item, index) in opts" :key="item.name" class="box">
				<view class="value">{{ item.value }}</view>
				<view class="name" :style="{color:item.color}">
					<text :style="{'background-color': item.color}" class="shu"></text>
					<text>{{ item.name }}</text>
				</view>
			</view>
		</view>
		<v-charts chartType="line" v-if="opts1" :opts="opts1" canvasId="charts1" :cWidth="cWidth" :cHeight="cHeight" />
		<v-charts chartType="line" v-if="opts2" :opts="opts2" canvasId="charts2" :cWidth="cWidth" :cHeight="cHeight" />
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
			opts2: null
		};
	},
	onLoad() {
		const info = uni.getSystemInfoSync()
		this.cWidth = info.screenWidth
		this.cHeight = info.screenWidth*2/3
		this.getDrone();
	},
	methods: {
		async getDrone() {
			const arr = await getUdpData();
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
		image {
			width: 374rpx;
			height: 285rpx;
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
			.name{
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 26rpx;
				.shu{
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
