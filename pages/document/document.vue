<template>
	<view class="document">
		<view class="create" @tap="navTo">
			<image class="add" src="/static/image/add.png" mode=""></image>
			<view>发布文档</view>
		</view>
		<view class="item">
			<view class="itemChr" @tap="onClickItem(1)">
				<image class="img1" src="/static/image/a1.png" mode=""></image>
				<view class="name">我的收藏（{{collectList.length}}）</view>
				<!-- <image class="img2" :class="show1?'img3':''" src="../../static/image/back.png" mode=""></image> -->
				<image class="img2" :class="{img3:show1}" src="../../static/image/back.png" mode=""></image>
			</view>
			<uni-swipe-action v-if="show1">
				<uni-swipe-action-item v-for="(item,index) in collectList" :key="index" :auto-close="false" :show="item.show" 
				:options="collectOptions" @click="collectClick($event,index,item)" @change="collectChange($event,index)">
					<view class='cont' @click="collectOnClick(item.show,index)">
						<image  :src="'/static/image/a'+(index%5+1)+'.png'" mode=""></image>
						<view class="box">
							<view class="text">工地员工手册</view>
							<view class="color">2020/05/08  16.5KB</view>
						</view>
					</view>
				</uni-swipe-action-item>
			</uni-swipe-action>
		</view>
		<view class="item">
			<view class="itemChr" @tap="onClickItem(2)">
				<image class="img1" src="/static/image/a1.png" mode=""></image>
				<view class="name">分享给我（{{shareList.length}}）</view>
				<image class="img2" :class="show2?'img3':''" src="/static/image/back.png" mode=""></image>
			</view>
			<uni-swipe-action v-if="show2">
				<uni-swipe-action-item v-for="(item,index) in shareList" :key="index" :auto-close="false" :show="item.show" 
				:options="shareOptions" @click="shareClick($event,index,item)" @change="shareChange($event,index)">
					<view class='cont' @click="shareOnClick(item.show,index)">
						<image  :src="'/static/image/a'+ (index%5+1) +'.png'" mode=""></image>
						<view class="box">
							<view class="text">工地员工手册</view>
							<view class="color">2020/05/08  16.5KB</view>
						</view>
					</view>
				</uni-swipe-action-item>
			</uni-swipe-action>
		</view>
	</view>
</template>

<script>
	import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue'
	import uniSwipeActionItem from '@/components/uni-swipe-action-item/uni-swipe-action-item.vue'
	export default {
		components: {
			uniSwipeAction,
			uniSwipeActionItem
		},
		data() {
			return {
				show1:false,
				show2:true,
				collectList:[
					{show:false},
					{show:false}
				],
				shareList: [
					{show:false},
					{show:false},
					{show:false},
					{show:false},
					{show:false},
				],
				shareOptions: [{
					text: '收藏',
					style: {
						backgroundColor: '#007aff',
					}
				}, {
					text: '查看',
					style: {
						backgroundColor: '#007aff'
					}
				}],
				collectOptions: [{
					text: '取消收藏',
					style: {
						backgroundColor: '#007aff',
					}
				}, {
					text: '查看',
					style: {
						backgroundColor: '#007aff'
					}
				}]
			}
		},
		methods: {
			/**
			 * 收藏事件开始
			 */
			collectClick(event,index,item) {
				console.log(event,index,item);
				if(event.index == 0){
					//取消收藏
					this.shareList.push(item)
					this.collectList.splice(index,1)
					console.log(this.shareList,this.collectList);
				}
				if(event.index == 1){
					//查看
					console.log('查看');
				}
			},
			collectOnClick(show,index){
				for(let i = 0;i < this.collectList.length; i++){
					if(i == index){
						this.$set(this.collectList,i,{...this.collectList[i],show:!show})
					}else{
						this.$set(this.collectList,i,{...this.collectList[i],show:false})
					}
				}
			},
			collectChange(open,index) {
				if(open){
					for(let i = 0;i < this.collectList.length; i++){
						if(i == index){
							this.$set(this.collectList,i,{...this.collectList[i],show:true})
						}else{
							this.$set(this.collectList,i,{...this.collectList[i],show:false})
						}
					}
				}
			},
			
			
			
			/**
			 * 分享事件
			 */
			shareClick(event,index,item) {
				if(event.index == 0){
					//取消收藏
					this.collectList.push(item)
					this.shareList.splice(index,1)
				}
				if(event.index == 1){
					//查看
					console.log('查看');
				}
			},
			shareOnClick(show,index){
				for(let i = 0;i < this.shareList.length; i++){
					if(i == index){
						this.$set(this.shareList,i,{...this.shareList[i],show:!show})
					}else{
						this.$set(this.shareList,i,{...this.shareList[i],show:false})
					}
				}
			},
			shareChange(open,index) {
				if(open){
					for(let i = 0;i < this.shareList.length; i++){
						if(i == index){
							this.$set(this.shareList,i,{...this.shareList[i],show:true})
						}else{
							this.$set(this.shareList,i,{...this.shareList[i],show:false})
						}
					}
				}
			},

			
			onClickItem(index){
				if(index == 1){
					this.show1 = this.show1 ? false : true
					this.show2 = false
					for(let i = 0;i < this.collectList.length; i++){
						this.$set(this.collectList,i,{...this.collectList[i],show:false})
					}
				}
				if(index == 2){
					this.show2 = this.show2 ? false : true
					this.show1 = false
					for(let i = 0;i < this.shareList.length; i++){
						this.$set(this.shareList,i,{...this.shareList[i],show:false})
					}
				}
			},
			navTo(){
				uni.navigateTo({
					url:'/pages/document-add/document-add'
				})
			}
		}
	}
</script>

<style lang="scss">
	.document{
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
		.itemChr{
			margin-bottom: 2rpx;
			background-color: #eeeeee;
			height: 110rpx;
			display: flex;
			align-items: center;
			padding: 0 50rpx;
			image{
				width: 40rpx;
				height: 40rpx;
			}
			.img1{
				margin-right: 30rpx;
			}
			.img2{
				transform: rotate(90deg);
			}
			.img3{
				transform: rotate(-90deg);
			}
			.name{
				width: 500rpx;
			}
		}
		.cont {
			padding: 0 34rpx;
			width: 700rpx;
			height: 190rpx;
			display: flex;
			border-bottom: 2rpx solid #e5e5e5;
			image{
				width: 76rpx;
				height: 76rpx;
				margin-right: 40rpx;
				margin-top: 40rpx;
			}
			.box {
				margin-top: 40rpx;
				.text{
					font-weight: bolder;
					margin-bottom: 40rpx;
				}
				.color{
					color: #999;
				}
			}
		}
	}
	
</style>
