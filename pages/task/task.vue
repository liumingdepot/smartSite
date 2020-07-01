<template>
	<view class="task">
		<view class="create" @tap="navTo">
			<image class="add" src="/static/image/add.png" mode=""></image>
			<view>创建任务</view>
		</view>
		<view class="nav">
			<view class="item1" :class="{item:index == 1}" @tap="changeNav(1)">我的创建</view>
			<view class="item2" :class="{item:index == 2}" @tap="changeNav(2)">我的任务</view>
		</view>
		<view class="main">
			<view class="item" v-for="(item,i) in task" :key="i">
				<image class="avatar" :src="item.img"></image>
				<view class="right">
					<view class="name">{{item.creatname}}</view>
					<view class="title">{{item.taskcontent}}</view>
					<view class="img" v-for="(img,i) in item.imgs" :key="i">
						<image :src="img" style="width: 100%;height: 100%;"></image>
					</view>
					<view class="date">{{item.tasktime}}</view>
					<view class="bottom" v-if="index == 1">
						<view>已发送至</view>
						<view class="name2">{{item.acceptname}}</view>
						<image class="avatar" :src="item.img"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {taskAppList} from './server.js'
	export default {
		data() {
			return {
				index:1,
				task:[
					{title:'工地照明灯不停闪烁，麻烦过来看下',img:'/static/image/a1.png',imgs:[,,,,,]},
					{title:'工地照明灯不停闪烁，麻烦过来看下,工地照明灯不停闪烁，麻烦过来看下',img:'/static/image/a2.png',imgs:[,]},
					{title:'工地照明灯不停闪烁，麻烦过来看下',img:'/static/image/a3.png',imgs:[,,,]},
					{title:'工地照明灯不停闪烁，麻烦过来看下',img:'/static/image/a4.png',imgs:[,,,]},
					{title:'工地照明灯不停闪烁，麻烦过来看下',img:'/static/image/a5.png',imgs:[,,,,]}
				],
				taskList:[],
			};
		},
		onShow() {
			this.initData()
		},
		methods: {
			async initData() {
				const taskList = await taskAppList()
				for(let item of taskList.mycreattask){
					item.imgs = item.taskimg.split(',')
				}
				for(let item of taskList.mytask){
					item.imgs = item.taskimg.split(',')
				}
				this.taskList = taskList
				this.task = this.taskList.mycreattask
			},
			changeNav(index){
				this.index = index
				if(index == 1){
					this.task = this.taskList.mycreattask
				}else{
					this.task = this.taskList.mytask
					console.log(this.task);
				}
			},
			navTo(){
				uni.navigateTo({
					url:'/pages/task-add/task-add'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.task{
	.create{
		margin: 24rpx;
		border: 2rpx solid #6b9ee9;
		color: #6b9ee9;
		background-color: #e9f1fc;
		border-radius: 8rpx;
		height: 150rpx;
		font-weight: bold;
		display: flex;
		align-items: center;
		font-size: 30rpx;
		
		.add{
			padding: 0 30rpx 0 250rpx;
			width: 50rpx;
			height: 50rpx;
		}
	}
	.nav{
		line-height: 100rpx;
		display: flex;
		border-bottom: 1rpx solid #e5e5e5;
		.item1{
			padding: 0 92rpx 0 46rpx;
		}
		.item{
			font-weight: bold;
			color: #6b9ee9;
		}
	}
	.main{
		.item{
			box-sizing: border-box;
			padding:32rpx;
			display: flex;
			justify-content: space-between;
			border-bottom: 1rpx solid #e5e5e5;
			.avatar{
				width: 52rpx;
				height: 52rpx;
			}
			.right{
				width:600rpx;
				.name{
					line-height: 52rpx;
					color: #387ce0;
				}
				.title{
					line-height: 52rpx;
				}
				.img{
					display: inline-block;
					margin: 30rpx 10rpx 0 0;
					width: 180rpx;
					height: 160rpx;
					background-color: #f0f4fb;
				}
				.date{
					padding: 20rpx 0;
					color:#c6c6c6;
				}
				.name2{
					margin: 0 20rpx 0 20rpx;
					color: #387ce0;
				}
				.bottom{
					width: 100%;
					display: flex;
					justify-content:flex-end;
					align-items: center;
					line-height: 52rpx;
					text-align: center;
				}
			}
		}
	}
}
</style>
