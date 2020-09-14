<template>
	<view class="document">
		<view class="create" @tap="navTo">
			<image class="add" src="/static/image/add.png" mode=""></image>
			<view>发布文档</view>
		</view>
		<l-file ref="lFile"></l-file>
		<!-- 我的收藏 -->
		<view class="item">
			<view class="itemChr" @tap="onClickItem(1)">
				<image class="img1" src="/static/image/collect.png" mode=""></image>
				<view class="name">我的收藏（{{ collectList.length }}）</view>
				<image class="img2" :class="{ img3: show1 }" src="../../static/image/back.png" mode=""></image>
			</view>
			<uni-swipe-action v-if="show1">
				<uni-swipe-action-item
					v-for="(item, index) in collectList"
					:key="index"
					:auto-close="false"
					:show="item.show"
					:options="collectOptions"
					@click="collectClick($event, index, item)"
					@change="collectChange($event, index)"
				>
					<view class="cont" @click="collectOnClick(item.show, index)">
						<image src="/static/image/word.png" mode=""></image>
						<view class="box">
							<view class="text">{{ item.filename }}</view>
							<view class="color">{{ item.filetime }} {{ item.filesize }}</view>
						</view>
					</view>
				</uni-swipe-action-item>
			</uni-swipe-action>
		</view>
		<!-- 分享给我 -->
		<view class="item">
			<view class="itemChr" @tap="onClickItem(2)">
				<image class="img1" src="/static/image/shar.png" mode=""></image>
				<view class="name">分享给我（{{ shareList.length }}）</view>
				<image class="img2" :class="show2 ? 'img3' : ''" src="/static/image/back.png" mode=""></image>
			</view>
			<uni-swipe-action v-if="show2">
				<uni-swipe-action-item
					v-for="(item, index) in shareList"
					:key="index"
					:auto-close="false"
					:show="item.show"
					:options="shareOptions"
					@click="shareClick($event, index, item)"
					@change="shareChange($event, index)"
				>
					<view class="cont" @click="shareOnClick(item.show, index)">
						<image src="/static/image/word.png" mode=""></image>
						<view class="box">
							<view class="text">{{ item.filename }}</view>
							<view class="color">{{ item.filetime }} {{ item.filesize }}</view>
						</view>
						<image class="keep" v-if="item.filestatus" src="/static/image/collect.png" mode=""></image>
					</view>
				</uni-swipe-action-item>
			</uni-swipe-action>
		</view>
		<!-- 我创建的 -->
		<view class="item">
			<view class="itemChr" @tap="onClickItem(3)">
				<image class="img1" src="/static/image/shar.png" mode=""></image>
				<view class="name">我创建的（{{ mycreate.length }}）</view>
				<image class="img2" :class="show3 ? 'img3' : ''" src="/static/image/back.png" mode=""></image>
			</view>
			<uni-swipe-action v-if="show3">
				<uni-swipe-action-item
					v-for="(item, index) in mycreate"
					:key="index"
					:auto-close="false"
					:show="item.show"
					:options="shareOptions"
					@click="mycreateClick($event, index, item)"
					@change="mycreateChange($event, index)"
				>
					<view class="cont" @click="mycreateOnClick(item.show, index)">
						<image src="/static/image/word.png" mode=""></image>
						<view class="box">
							<view class="text">{{ item.filename }}</view>
							<view class="color">{{ item.filetime }} {{ item.filesize }}</view>
						</view>
						<image class="keep" v-if="item.filestatus" src="/static/image/collect.png" mode=""></image>
					</view>
				</uni-swipe-action-item>
			</uni-swipe-action>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
import lFile from '@/components/l-file/l-file.vue';
import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue';
import uniSwipeActionItem from '@/components/uni-swipe-action-item/uni-swipe-action-item.vue';
import { fileAppList, fileAppUpdate } from './server.js';
export default {
	components: {
		uniSwipeAction,
		uniSwipeActionItem,
		lFile
	},
	data() {
		return {
			show1: false,
			show2: false,
			show3: true,
			collectList: [],
			shareList: [],
			mycreate: [],
			progress: 0,
			shareOptions: [
				{
					text: '收藏',
					style: {
						backgroundColor: '#007aff'
					}
				},
				{
					text: '查看',
					style: {
						backgroundColor: '#007aff'
					}
				}
			],
			collectOptions: [
				{
					text: '取消收藏',
					style: {
						backgroundColor: '#007aff'
					}
				},
				{
					text: '查看',
					style: {
						backgroundColor: '#007aff'
					}
				}
			]
		};
	},
	onShow() {
		this.initData();
	},
	methods: {
		async initData() {
			const data = await fileAppList();
			this.shareList = data.share.map(val => {
				val.show = false;
				return val;
			});
			this.collectList = data.store.map(val => {
				val.show = false;
				return val;
			});
			this.mycreate = data.mycreate.map(val => {
				val.show = false;
				return val;
			});
		},
		/**
		 * 收藏事件开始
		 */
		collectClick(event, index, item) {
			if (event.index == 0) {
				//取消收藏
				fileAppUpdate(item.id, '0').then(res => {
					if (res.code == 1) {
						this.$refs.uToast.show({
							title: '取消成功',
							type: 'warning'
						});
						this.initData();
					}
				});
			}
			if (event.index == 1) {
				this.vDownloadFile(item);
			}
		},
		collectOnClick(show, index) {
			for (let i = 0; i < this.collectList.length; i++) {
				if (i == index) {
					this.$set(this.collectList, i, { ...this.collectList[i], show: !show });
				} else {
					this.$set(this.collectList, i, { ...this.collectList[i], show: false });
				}
			}
		},
		collectChange(open, index) {
			if (open) {
				for (let i = 0; i < this.collectList.length; i++) {
					if (i == index) {
						this.$set(this.collectList, i, { ...this.collectList[i], show: true });
					} else {
						this.$set(this.collectList, i, { ...this.collectList[i], show: false });
					}
				}
			}
		},

		/**
		 * 分享事件
		 */
		shareClick(event, index, item) {
			if (event.index == 0) {
				if (item.filestatus == 1) {
					this.$refs.uToast.show({
						title: '请勿重复收藏',
						type: 'warning'
					});
				} else {
					fileAppUpdate(item.id, '1').then(res => {
						if (res.code == 1) {
							this.$refs.uToast.show({
								title: '收藏成功',
								type: 'success'
							});
							this.initData();
						}
					});
				}
			}
			if (event.index == 1) {
				this.vDownloadFile(item);
			}
		},
		shareOnClick(show, index) {
			for (let i = 0; i < this.shareList.length; i++) {
				if (i == index) {
					this.$set(this.shareList, i, { ...this.shareList[i], show: !show });
				} else {
					this.$set(this.shareList, i, { ...this.shareList[i], show: false });
				}
			}
		},
		shareChange(open, index) {
			if (open) {
				for (let i = 0; i < this.shareList.length; i++) {
					if (i == index) {
						this.$set(this.shareList, i, { ...this.shareList[i], show: true });
					} else {
						this.$set(this.shareList, i, { ...this.shareList[i], show: false });
					}
				}
			}
		},

		/**
		 * 我的创建
		 */
		mycreateClick(event, index, item) {
			if (event.index == 0) {
				if (item.filestatus == 1) {
					this.$refs.uToast.show({
						title: '请勿重复收藏',
						type: 'warning'
					});
				} else {
					fileAppUpdate(item.id, '1').then(res => {
						if (res.code == 1) {
							this.$refs.uToast.show({
								title: '收藏成功',
								type: 'success'
							});
							this.initData();
						}
					});
				}
			}
			if (event.index == 1) {
				this.vDownloadFile(item);
			}
		},
		mycreateOnClick(show, index) {
			for (let i = 0; i < this.mycreate.length; i++) {
				if (i == index) {
					this.$set(this.mycreate, i, { ...this.mycreate[i], show: !show });
				} else {
					this.$set(this.mycreate, i, { ...this.mycreate[i], show: false });
				}
			}
		},
		mycreateChange(open, index) {
			if (open) {
				for (let i = 0; i < this.mycreate.length; i++) {
					if (i == index) {
						this.$set(this.mycreate, i, { ...this.mycreate[i], show: true });
					} else {
						this.$set(this.mycreate, i, { ...this.mycreate[i], show: false });
					}
				}
			}
		},

		vDownloadFile(item) {
			uni.navigateTo({
				url:'/pages/webWiew/webWiew?url=' + item.url
			})
		},
		onClickItem(index) {
			if (index == 1) {
				this.show1 = this.show1 ? false : true;
				this.show2 = false;
				this.show3 = false;
				for (let i = 0; i < this.collectList.length; i++) {
					this.$set(this.collectList, i, { ...this.collectList[i], show: false });
				}
			}
			if (index == 2) {
				this.show2 = this.show2 ? false : true;
				this.show1 = false;
				this.show3 = false;
				for (let i = 0; i < this.shareList.length; i++) {
					this.$set(this.shareList, i, { ...this.shareList[i], show: false });
				}
			}
			if (index == 3) {
				this.show3 = this.show3 ? false : true;
				this.show1 = false;
				this.show2 = false;
				for (let i = 0; i < this.mycreate.length; i++) {
					this.$set(this.mycreate, i, { ...this.mycreate[i], show: false });
				}
			}
		},
		navTo() {
			uni.navigateTo({
				url: '/pages/document-add/document-add'
			});
		}
	}
};
</script>

<style lang="scss">
.document {
	.create {
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

		.add {
			padding: 0 30rpx 0 250rpx;
			width: 50rpx;
			height: 50rpx;
		}
	}

	.itemChr {
		margin-bottom: 2rpx;
		background-color: #eeeeee;
		height: 110rpx;
		display: flex;
		align-items: center;
		padding: 0 50rpx;

		image {
			width: 40rpx;
			height: 40rpx;
		}

		.img1 {
			margin-right: 30rpx;
		}

		.img2 {
			transform: rotate(90deg);
		}

		.img3 {
			transform: rotate(-90deg);
		}

		.name {
			width: 500rpx;
		}
	}

	.cont {
		padding: 0 34rpx;
		width: 100%;
		height: 190rpx;
		display: grid;
		align-items: center;
		grid-template-columns: 100rpx auto 100rpx;
		border-bottom: 2rpx solid #e5e5e5;

		image {
			width: 76rpx;
			height: 76rpx;
			margin-right: 40rpx;
		}
		.keep {
			width: 40rpx;
			height: 40rpx;
		}
		.box {
			.text {
				font-weight: bolder;
				margin-bottom: 40rpx;
			}

			.color {
				color: #999;
			}
		}
	}
}
</style>
