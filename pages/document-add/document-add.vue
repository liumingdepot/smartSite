<template>
	<view class="document">
		<view class="header">
			<image class="img" src="/static/image/back.png" @tap="back"></image>
			<view class="title">新文件</view>
			<view></view>
		</view>
		
		<view class="input">
			<input v-model="filename" :disabled="show" placeholder="请输入文件名称"/>
			<view class="_btn" v-if="filename" @tap="onUpload(show)">上传</view>
		</view>
		<view class="btn" @tap="submit">提交</view>
		
		
		<view class="contact" @tap="addContactPerson">
			<image class="contact-img" src="/static/image/contact.png"></image>
			<view>添加发送人</view>
		</view>
		<view class="box">
			<view v-for="(item,index) in senduserValue" :key="index" class="item">{{item.split(',')[1]}}</view>
		</view>
		<uni-popup ref="popup" type="center" :maskClick="false">
			<view class="popup">
				<checkbox-group @change="checkboxChange">
					<label class="item" v-for="item in senduser" :key="item.userid">
						<checkbox :value="item.userid + ',' + item.username" :checked="senduserValue.includes(item.userid + ',' + item.username)"/>{{item.username}}-{{item.userrole}}
					</label>
				</checkbox-group>
				<view style="display: flex;justify-content: flex-end;">
					<view class="release" @tap="clonepopup">确认</view>
				</view>
			</view>
		</uni-popup>
		
		<l-file ref="lFile" @up-success="onSuccess"></l-file>
	</view>
</template>

<script>
	import {
		fileAppAdd,
		fileAppFileid
	} from './server.js'
	import {
		apiUrl
	} from '@/common/config.js'
	import lFile from '@/components/l-file/l-file.vue'
	export default {
		components:{lFile},
		data() {
			return {
				show:false,
				fileid:'',
				filename:'',
				senduser: this.$store.state.senduser,
				senduserValue:[],
				acceptuserid:[],
				acceptusername:[]
			};
		},
		async onLoad() {
			this.fileid = await fileAppFileid()
		},
		methods: {
			/* 上传 */
			onUpload(show) { 
				if(show){
					return
				}
				let token = uni.getStorageSync('token');
				let userid = uni.getStorageSync('userid');
				let uploadFileUrl = apiUrl + `fileManage/fileupload?token=${token}&userid=${userid}&fileid=${this.fileid}`;
				this.$refs.lFile.upload({
					// #ifdef APP-PLUS
					// nvue页面使用时请查阅nvue获取当前webview的api，当前示例为vue窗口
					currentWebview: this.$mp.page.$getAppWebview(),
					// #endif
					//调试时ios有跨域，需要后端开启跨域并且接口地址不要使用http://localhost/
					url: uploadFileUrl,
					//默认file,上传文件的key
					name: "file",
				});
			},
			onSuccess(res) {
				console.log(res);
				if(res.data.code == 1){
					this.show = true
					uni.showToast({
						title:'上传成功',
						icon: 'none'
					})
				}
			},
			back(){
				uni.navigateBack()
			},
			addContactPerson() {
				this.$refs.popup.open()
			},
			checkboxChange(e) {
				console.log(e);
				this.senduserValue = e.target.value
			},
			clonepopup() {
				const acceptuserid = []
				const acceptusername = []
				for (let item of this.senduserValue) {
					acceptuserid.push(item.split(',')[0])
					acceptusername.push(item.split(',')[1])
				}
				this.acceptuserid = acceptuserid
				this.acceptusername = acceptusername
				this.$refs.popup.close()
			},
			submit() {
				if(!this.filename){
					uni.showToast({
						title:'请填写完整',
						icon:"none"
					})
					return
				}
				fileAppAdd({
					acceptuserid: this.acceptuserid.join(','),
					acceptusername: this.acceptusername.join(','),
					fileid:this.fileid,
					filename:this.filename
				}).then(res => {
					if (res.code == 1) {
						uni.showToast({
							title: '添加成功'
						})
						this.back()
					}else{
						uni.showToast({
							title: '添加失败',
							icon:'none'
						})
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.document {
		.header {
			height: 92rpx;
			padding: 32rpx;
			margin-top: $height;
			display: flex;
			align-items: center;
			justify-content: space-between;
			text-align: center;

			.img {
				width: 40rpx;
				height: 40rpx;
			}

			.title {}

			.release {
				width: 126rpx;
				height: 60rpx;
				background-color: #f7f7f7;
				line-height: 60rpx;
			}
		}
		.input{
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 30rpx;
			height: 100rpx;
			border-bottom: 2rpx solid #e5e5e5;
			input{
				height: 100rpx;
			}
			.btn {
				width: 150rpx;
				border-radius: 10rpx;
				line-height: 60rpx;
				background-color: #568fe4;
				text-align: center;
				color: #fff;
			}
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
		.contact {
			margin-top: 40rpx;
			height: 118rpx;
			border-top: 2rpx solid #e5e5e5;
			border-bottom: 2rpx solid #e5e5e5;
			display: flex;
			align-items: center;
			justify-content: center;
		
			.contact-img {
				width: 40rpx;
				height: 40rpx;
				margin-right: 10rpx;
			}
		}
		.box{
			.item{
				display: flex;
				align-items: center;
				justify-content: center;
				height: 80rpx;
				border-bottom: 2rpx solid #e5e5e5;
			}
		}
		
		.popup {
			width: 400rpx;
			height: auto;
			padding: 50rpx;
			background-color: #ffffff;
		
			.item {
				display: block;
				margin: 20rpx 0;
			}
		
			.release {
				text-align: center;
				width: 126rpx;
				height: 60rpx;
				background-color: #f7f7f7;
				line-height: 60rpx;
			}
		}
	}
</style>
