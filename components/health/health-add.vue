<template>
	<view class="helth">
		<view class="header">
			<image class="img" src="/static/image/back.png" @tap="navback"></image>
			<view style="padding-right: 50rpx;">问卷调查</view>
		</view>

		<!-- 血型 -->
		<view class="box">
			<view class="title">1&nbsp;选择您的血型</view>
			<view class="main">
				<view v-for="(item,index) in bloodArr" :key="index" class="item" @tap="changeBlood(item)">
					<image :src="item == blood ? '/static/login/on.png':'/static/login/off.png'"></image>
					<view :style="{color: item == blood?'#387ce0':'#919eb3'}">{{item}}</view>
				</view>
			</view>
		</view>

		<!-- 药物过敏史 -->
		<view class="box1">
			<view class="title">2&nbsp;药物过敏史</view>
			<view class="top">
				<view v-for="(item,index) in allergyshowArr" :key="index" class="item" @tap="changeAllergyshow(item)">
					<image :src="item == allergyshow ? '/static/login/on.png':'/static/login/off.png'"></image>
					<view :style="{color: item == allergyshow?'#387ce0':'#919eb3'}">{{item}}</view>
				</view>
			</view>
			<view class="text" v-if="allergyshow == '有'">请选择过敏源名称（多选）</view>
			<view class="main" v-if="allergyshow == '有'">
				<block v-for="(item,index) in allergyArr" :key="index">
					<view :class="allergy.includes(item)?'active':'item'" @tap="changeAllergyArr(item)">{{item}}</view>
				</block>
			</view>
		</view>

		<!-- 既往是否得过以下疾病 -->
		<view class="box1 box2">
			<view class="title">3&nbsp;既往是否得过以下疾病</view>
			<view class="top">
				<view v-for="(item,index) in diseaseshowArr" :key="index" class="item" @tap="changeDisease(item)">
					<image :src="item == diseaseshow ? '/static/login/on.png':'/static/login/off.png'"></image>
					<view :style="{color: item == diseaseshow?'#387ce0':'#919eb3'}">{{item}}</view>
				</view>
			</view>
			<view class="text" v-if="diseaseshow == '有'">请选择疾病名称（多选）</view>
			<view class="main" v-if="diseaseshow == '有'">
				<block v-for="(item,index) in diseaseArr" :key="index">
					<view :class="disease.includes(item)?'active':'item'" @tap="changeDiseaseArr(item)">{{item}}</view>
				</block>
			</view>
		</view>

		<!-- 既往是否有过手术经历 -->
		<view class="box3">
			<view class="title">3&nbsp;既往是否有过手术经历</view>
			<view class="top">
				<view v-for="(item,index) in surgeryshowArr" :key="index" class="item" @tap="changeSurgery(item)">
					<image :src="item == surgeryshow ? '/static/login/on.png':'/static/login/off.png'"></image>
					<view :style="{color: item == surgeryshow?'#387ce0':'#919eb3'}">{{item}}</view>
				</view>
			</view>
			<view class="main" v-if="surgeryshow == '有'">
				<view class="item" v-for="(item,index) in surgery" :key="index">
					<view class="surgery">手术名称：<input type="text" v-model="item.operation" /></view>
					<view class="surgery" @click="showChange(index)">时间：{{item.operationtime||'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'}}</view>
				</view>
				<view class="item" @tap="addSurgery">
					<image src="/static/image/add.png" mode=""></image>
					<view style="color:#387ce0">继续添加</view>
				</view>
			</view>
		</view>
	
		<u-calendar v-model="show" mode="date" @change="changeDate"></u-calendar>
		<view class="btn" @tap="appSave">保存</view>
	</view>
</template>

<script>
	export default {
		props:['healJson'],
		data() {
			return {
				show:false,
				index:0,
				//血型
				blood: 'A型',
				bloodArr: ['A型', 'B型', 'AB型', 'O型', '不详'],

				//过敏史
				allergyshow: '无',
				allergyshowArr: ['无', '有'],
				allergy: [],
				allergyArr: ['链霉素', '青霉素', '磺胺', '其他'],

				//疾病
				diseaseshow: '无',
				diseaseshowArr: ['无', '有'],
				disease: [],
				diseaseArr: ['高血压', '糖尿病', '冠心病', '恶性肿瘤', '慢性阻塞性肺疾病', '严重性精神障碍', '脑卒中', '结核病', '肝炎', '其他'],

				//手术
				surgeryshow: '无',
				surgeryshowArr: ['无', '有'],
				surgery: []
			};
		},
		created(){
			this.blood = this.healJson.bloodtype;
			this.allergyshow = this.healJson.isallergy;
			this.allergy = this.healJson.allergy.split(',');
			this.diseaseshow = this.healJson.isdisease;
			this.disease = this.healJson.disease.split(',');
			this.surgeryshow = this.healJson.isoperation;
			this.surgery = this.healJson.operationJson;
		},
		methods: {
			showChange(index){
				this.index = index
				this.show = true
			},
			changeDate(e){
				this.$set(this.surgery,this.index,{
					...this.surgery[this.index],
					operationtime:e.result
				})
			},
			
			//血型
			changeBlood(blood) {
				this.blood = blood
			},

			//过敏史
			changeAllergyshow(allergyshow) {
				this.allergyshow = allergyshow
				if (allergyshow = '无') {
					this.allergy = []
				}
			},
			changeAllergyArr(item) {
				if (this.allergy.indexOf(item) == -1) {
					this.allergy.push(item)
				} else {
					this.allergy.splice(this.allergy.indexOf(item), 1)
				}
			},

			//疾病
			changeDisease(diseaseshow) {
				this.diseaseshow = diseaseshow
				if (diseaseshow = '无') {
					this.disease = []
				}
			},
			changeDiseaseArr(item) {
				if (this.disease.indexOf(item) == -1) {
					this.disease.push(item)
				} else {
					this.disease.splice(this.disease.indexOf(item), 1)
				}
			},

			//手术
			changeSurgery(surgeryshow) {
				this.surgeryshow = surgeryshow
			},
			addSurgery() {
				this.surgery.push({
					operation: '',
					operationtime: ''
				})
			},

			navback() {
				uni.navigateBack()
			},
			appSave() {
				const healJson = {
					//血型
					bloodtype: this.blood,
					isallergy:this.allergyshow,
					allergy: this.allergy.join(),
					isdisease: this.diseaseshow,
					disease: this.disease.join(),
					isoperation:this.surgeryshow,
					operationJson: this.surgery,
				}
				this.$emit('appSave',healJson)
			}
		}
	}
</script>

<style scoped lang="scss">
	.helth {
		background-color: #fff;
		padding-bottom: 100rpx;
		.header {
			z-index: 999;
			position: fixed;
			box-sizing: content-box;
			padding: 0 38rpx;
			width: 674rpx;
			height: 120rpx;
			padding-top: $height;
			display: grid;
			grid-template-columns: 50rpx auto;
			text-align: center;
			align-items: center;
			font-size: 34rpx;
			background-color: #ffffff;
			border-bottom: 2rpx solid #e5e5e5;

			.img {
				width: 34rpx;
				height: 34rpx;
			}
		}

		.box {
			padding-top: 220rpx;
			font-size: 32rpx;
			border-bottom: 2rpx solid #e5e5e5;
			padding-bottom: 40rpx;

			.title {
				font-weight: bold;
				margin-left: 38rpx;
				margin-bottom: 30rpx;
			}

			.main {
				display: grid;
				grid-template-columns: 1fr 1fr 1fr;
				grid-template-rows: 100rpx 100rpx;
				align-items: center;

				.item {
					display: flex;
					align-items: center;
					justify-content: center;

					image {
						width: 40rpx;
						height: 40rpx;
						margin-right: 20rpx;
					}
				}
			}
		}

		.box1 {
			padding: 40rpx 0;
			border-bottom: 2rpx solid #e5e5e5;
			font-size: 32rpx;

			.title {
				font-weight: bold;
				margin-left: 38rpx;
				margin-bottom: 30rpx;
			}

			.top {
				display: grid;
				grid-template-columns: 230rpx 400rpx;
				grid-template-rows: 100rpx;
				align-items: center;

				.item {
					display: flex;
					align-items: center;
					justify-content: center;

					image {
						width: 40rpx;
						height: 40rpx;
						margin-right: 20rpx;
					}
				}
			}

			.text {
				padding-top: 30rpx;
				padding-left: 60rpx;
				color: #387ce0;
			}

			.main {
				display: flex;
				flex-wrap: wrap;
				padding-left: 54rpx;
				height: 110rpx;
				align-items: center;

				.active {
					background-color: #387ce0;
					color: #fff;
					padding: 10rpx 14rpx;
					margin-right: 40rpx;
					border-radius: 4rpx;
				}

				.item {
					margin-right: 40rpx;
					padding: 10rpx 14rpx;
					border-radius: 4rpx;
				}
			}
		}

		.box2 {
			.main {
				padding: 30rpx 0 30rpx 50rpx;
				height: 200rpx;
			}
		}

		.box3 {
			padding: 40rpx 0;
			border-bottom: 2rpx solid #e5e5e5;
			font-size: 32rpx;

			.title {
				font-weight: bold;
				margin-left: 38rpx;
				margin-bottom: 30rpx;
			}

			.top {
				display: grid;
				grid-template-columns: 230rpx 400rpx;
				grid-template-rows: 100rpx;
				align-items: center;

				.item {
					display: flex;
					align-items: center;
					justify-content: center;

					image {
						width: 40rpx;
						height: 40rpx;
						margin-right: 20rpx;
					}
				}
			}

			.main {
				.item {
					padding-left: 20rpx;
					display: flex;
					align-items: center;
					width: 654rpx;
					height: 80rpx;
					line-height: 80rpx;
					margin-left: 50rpx;
					border: 2rpx solid #e5e5e5;

					.surgery {
						display: flex;
						align-items: center;

						input {
							width: 180rpx;
						}
					}

					image {
						width: 40rpx;
						height: 40rpx;
					}
				}
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
	}
</style>
