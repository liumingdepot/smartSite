<template>
	<view class="health">
		<view class="header">
			<image class="img" src="/static/image/back1.png" @tap="back"></image>
			<view style="padding-right: 50rpx;">健康填报</view>
		</view>
		<view class="info">
			<view class="title">
				<view class="icon"></view>
				<view class="name">{{healJsonData.name}}</view>
				<view>{{healJsonData.userid}}</view>
			</view>
			<view class="item">
				<view>性别</view>
				<view>{{healJsonData.sex}}</view>
			</view>
			<view class="item">
				<view>年龄</view>
				<view>{{healJsonData.age}}</view>
			</view>
			<view class="item">
				<view>身份证号</view>
				<view>{{healJsonData.idcard}}</view>
			</view>
			<view class="item">
				<view>联系电话</view>
				<view>{{healJsonData.cellphone}}</view>
			</view>
			<view class="item">
				<view>紧急联系人</view>
				<view>
					<text style="margin-right: 50rpx;">{{healJsonData.urgentlinkman}}</text>
					{{healJsonData.urgentlinkmanphone}}
				</view>
			</view>
		</view>
		
		<!-- 更新时间 -->
		<view class="update">更新时间  2020-29-29</view>
		
		<view class="box">
			<view class="title">
				<view class="icon"></view>
				<view class="name">健康信息</view>
			</view>
			<view class="item">
				<view>血型</view>
				<view>{{healJsonData.bloodtype}}</view>
			</view>
			<view class="item">
				<view>药物过敏史</view>
				<view class="right">{{healJsonData.allergy}}</view>
			</view>
			<view class="item">
				<view>特殊病</view>
				<view class="right">{{healJsonData.disease}}</view>
			</view>
			<view class="_item">
				<view class="title">手术</view>
				<view class="__item" v-for="item in healJsonData.operationJson" :key="item.operation">
					<view class="dian"></view>
					<view>{{item.operation}}</view>
					<view>{{item.operationtime}}</view>
				</view>
			</view>
		</view>
		
		<view class="btn" @tap="modify">查看/修改</view>
	</view>
</template>

<script>
	export default {
		props:['healJson'],
		data() {
			return {
				healJsonData:''
			};
		},
		created() {
			this.healJsonData = this.healJson
		},
		methods:{
			modify(){
				this.$emit('changeShow',2)
			},
			back() {
				uni.navigateBack()
			},
		}
	}
</script>

<style>
	page {
		background-color: #f0f4fb;
	}
</style>

<style scoped lang="scss">
	.health {
		width: 750rpx;

		.header {
			position: fixed;
			height: 196rpx;
			padding: 0 38rpx;
			width: 100%;
			padding-top: $height;
			display: grid;
			grid-template-columns: 50rpx auto;
			text-align: center;
			align-items: center;
			font-size: 34rpx;
			background-color: #387ce0;
			color: #ffffff;

			.img {
				width: 34rpx;
				height: 34rpx;
			}
		}
		
		.info {
			box-sizing: content-box;
			padding-top: 160rpx;
			.title{
				box-sizing: content-box;
				padding-top: $height;
			}
		}
		.info,
		.box{
			background-color: #fff;
			.title {
				display: flex;
				align-items: center;
				height: 94rpx;
				font-size: 30rpx;
				border-bottom: 2rpx solid #e5e5e5;

				.icon {
					width: 12rpx;
					height: 36rpx;
					background-color: #387ce0;
					margin-left: 30rpx;
					margin-right: 30rpx;
				}

				.name {
					font-weight: bolder;
					margin-right: 50rpx;
					font-size: 36rpx;
				}
			}
			._item{
				margin: 0 24rpx;
				.__item{
					height:94rpx;
					display: grid;
					grid-template-columns: 46rpx 376rpx auto;
					align-items: center;
					margin-left: 100rpx;
					.dian{
						margin-right: 20rpx;
						width: 14rpx;
						height: 14rpx;
						background-color: #96b4e0;
						border-radius: 50%;
					}
				}
			}
			.item {
				height: 94rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin: 0 24rpx;
				border-bottom: 2rpx solid #e5e5e5;
				color: #919eb3;
				&:nth-last-child(1){
					border-bottom: none;
				}
				.right{
					width: 500rpx;
					text-align: right;
					overflow:hidden; //超出的文本隐藏
					text-overflow:ellipsis; //溢出用省略号显示
					white-space:nowrap; //溢出不换行
				}
				view:first-child{
					color: #333;
				}
			}
		}
	
		.update{
			margin: 33rpx auto;
			width: 360rpx;
			height: 54rpx;
			text-align: center;
			line-height: 54rpx;
			color: #708ab1;
			background-color: #d8e3f3;
			border-radius: 27rpx;
		}
		.btn {
			margin: 100rpx 50rpx;
			border-radius: 10rpx;
			width: 650rpx;
			line-height: 100rpx;
			background-color: #568fe4;
			text-align: center;
			color: #fff;
		}
	}
</style>
