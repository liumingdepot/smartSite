<template>
	<view>
		<health-none v-if="show == 1" @changeShow="changeShow" />
		<health-add v-if="show == 2" :healJson="healJson" @changeShow="changeShow" @appSave="appSave"/>
		<health v-if="show == 3" :healJson="healJson" @changeShow="changeShow" />
	</view>
</template>

<script>
	import healthAdd from '@/components/health/health-add.vue'
	import healthNone from '@/components/health/health-none.vue'
	import health from '@/components/health/health.vue'
	import {getHealth,updateHeal} from './server.js'
	export default {
		components:{
			healthAdd,
			healthNone,
			health
		},
		data() {
			return {
				show:0,
				healJson:{}
			};
		},
		onLoad() {
			this.initData()
		},
		methods:{
			async initData(){
				this.healJson = await getHealth()
				if(this.healJson.healthid){
					this.show = 3
				}else{
					this.show = 1
				}
			},
			appSave(healJson){
				const ob = {
					token:uni.getStorageSync('token'),
					userid:uni.getStorageSync('userid'),
					workid:uni.getStorageSync('userid'),
					healJson
				}
				if(this.healJson.healthid){
					ob.healJson.healthid = this.healJson.healthid
				}
				updateHeal(ob).then(res=>{
					console.log(res)
					if(res.code == 1){
						this.initData()
					}
				})
			},
			changeShow(show){
				this.show = show
			}
		}
	}
</script>


<style lang="scss">

</style>
