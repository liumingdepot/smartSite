<template>
	<view class="address">
		<view class="header">
			<image src="/static/image/back1.png" @tap="back"></image>
			<view class="input"><input type="text" v-model="value" placeholder="请输入联系人姓名" placeholder-style="color:#387ce0" @input="changeInput" /></view>
		</view>
		<view class="main">
			<view class="top"></view>
			<view class="item" v-for="item in address" :key="item.cellphone" @tap="cellphone(item.cellphone)">
				<image class="image1" src="/static/avatar.jpg" mode=""></image>
				<view>{{ item.username }}</view>
				<view>{{ item.cellphone }}</view>
				<image class="image2" src="/static/image/phone.png" mode=""></image>
			</view>
		</view>
		<aui-loading :show="auiLoading.show" :type="auiLoading.type" :direction="auiLoading.row" :msg="auiLoading.msg" :mask="auiLoading.mask"></aui-loading>
	</view>
</template>

<script>
import { getAddressBook } from './server.js';
import auiLoading from '@/components/aui-loading/aui-loading.vue';
export default {
	components: {
		auiLoading
	},
	data() {
		return {
			address: [],
			addressArr: [],
			value: '',
			auiLoading: {
				show: true,
				type: 4,
				direction: 'col',
				msg: '加载中',
				mask: false
			}
		};
	},
	async onLoad() {
		uni.showLoading({
			title:'加载中'
		})
		this.getlist()
	},
	methods: {
		async getlist(){
			const addressArr = await getAddressBook();
			if(addressArr.length == 0){
				this.getlist()
			}else{
				this.addressArr = addressArr;
				this.address = addressArr;
				uni.hideLoading()
			}
		},
		cellphone(phoneNumber) {
			uni.makePhoneCall({
				phoneNumber
			});
		},
		back() {
			uni.navigateBack();
		},
		changeInput(e) {
			const value = e.target.value;
			this.address = this.addressArr.filter(val => val.username.includes(value));
		}
	}
};
</script>

<style lang="scss" scoped>
.address {
	width: 100%;
	.header {
		position: fixed;
		z-index: 1;
		padding-top: $height;
		box-sizing: content-box;
		height: 154rpx;
		width: 100%;
		background-color: #387ce0;
		display: grid;
		grid-template-columns: 96rpx 600rpx;
		align-items: center;
		font-size: 32rpx;
		color: #387ce0;
		text-align: center;
		image {
			width: 50rpx;
			height: 50rpx;
			padding-left: 30rpx;
		}
		.input {
			background-color: #fff;
			height: 75rpx;
			border-radius: 37rpx;
			input {
				padding: 0 50rpx;
				height: 100%;
				text-align: left;
			}
		}
	}
	.main {
		box-sizing: content-box;
		padding-top: 154rpx;
		.top {
			height: 22rpx;
			background-color: #f0f0f0;
			padding-top: $height;
		}
		.item {
			padding: 0 30rpx;
			display: grid;
			grid-template-columns: 100rpx 300rpx 220rpx 80rpx;
			height: 120rpx;
			align-items: center;
			border-bottom: 2rpx solid #e5e5e5;
			.image1 {
				width: 80rpx;
				height: 80rpx;
			}
			.image2 {
				width: 50rpx;
				height: 50rpx;
			}
		}
	}
}
</style>
