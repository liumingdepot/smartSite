<template>
	<view>
		<!-- 主体表单 -->
		<view class="main1">
			<view class="item">
				<input v-model="userName" class="main-input" placeholder="请输入账号" />
			</view>
			<view class="item">
				<input v-model="password" class="main-input" type="password" placeholder="请输入密码" />
			</view>
		</view>
		<view class="btn_login" @click="startLogin">登录</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userName:'',
				password:''
			};
		},
		methods:{
			startLogin(){
				console.log(this.password,this.userName);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.type {
		display: flex;
		margin-left: 16px;
		border-bottom: 1px solid #eeeeee;
		width: 100%;
	}

	.title_des {
		font-weight: bold;
		color: #0055b8;
		font-size: 22px;
		margin-bottom: 32px;
	}

	.login_icon_wx {
		color: #999999;
		border: none;
	}

	.weixinLogin {
		color: #999999;
		text-align: center;
		font-size: 12px;
		margin-top: 60px;
		left: auto;
		right: auto;
	}

	.footer_des {
		color: #666666;
		text-align: center;
		font-size: 14px;
		margin-top: 40px;
	}

	.getCode {
		font-size: 14px;
		margin-left: 40px;
		color: #0055b8;
	}

	.item {
		line-height: 40px;
		display: flex;
	}

	.login_image {
		margin-top: 8px;
		width: 20px;
		height: 25px;
	}

	.main-input {
		font-size: 14px;
		margin-left: 16px;
		border-bottom: 1px solid #eeeeee;
		height: 40px;
		line-height: 40px;
	}

	.main-input-code {
		width: 70%;
		font-size: 14px;
		height: 40px;
		line-height: 40px;
	}

	.btn_login {
		color: #ffffff;
		font-size: 16px;
		width: 260px;
		height: 40px;
		background: #0055b8;
		border-radius: 8px;
		line-height: 40px;
		text-align: center;
		margin-left: auto;
		margin-right: auto;
		margin-top: 45px;
	}

	.main-input {
		flex: 1;
		text-align: left;
		font-size: 28 upx;
		padding-right: 10 upx;
		margin-left: 20 upx;
	}
</style>
