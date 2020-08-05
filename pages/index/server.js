import {post} from '@/common/axios.js'

//任务
export const taskAppList =  async () =>{
	return await post({
		url:'taskManage/taskApp_list',
		data:{
			token:uni.getStorageSync('token'),
			userid:uni.getStorageSync('userid')
		}
	})
}
//项目工期
export const project =  async () =>{
	return await post({
		url:'todayDate/project',
		data:{
			token:uni.getStorageSync('token'),
			userid:uni.getStorageSync('userid')
		}
	})
}

//监测数据查询
export const todayDate =  async () =>{
	const res = await post({
		url:'visualzation/getToDayData',
	})
	const JcDqdjcArr = res.data
	return {
		todayDate1:[JcDqdjcArr[0],JcDqdjcArr[1],JcDqdjcArr[2]],
		todayDate2:[JcDqdjcArr[3],JcDqdjcArr[4],JcDqdjcArr[5]]
	}
}

export const getUdpData =  async () =>{
	const res = await post({
		url:'visualzation/getUdpData',
	})
	const data = res.data[0]
	return {
		getUdpData1:[
			{itemavgvalue:data['pm1'],itemname:'pm1'},
			{itemavgvalue:data['pm10'],itemname:'pm10'},
			{itemavgvalue:data['pm2.5'],itemname:'pm2.5'}
		],
		getUdpData2:[
			{itemavgvalue:data['no2'],itemname:'no2'},
			{itemavgvalue:data['vocs'],itemname:'vocs'}
		]
	}
}



export const getAccessToken = async () => {
	const [err, res] = await uni.request({
		url: 'https://open.ys7.com/api/lapp/token/get',
		method: 'POST',
		data: {
			appKey: '9090fc50a1114f51b51f909ae4ca4eb6',
			appSecret: 'a21e0a851be69756ea2d7c792155fe59'
		},
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	});
	return res.data.data.accessToken
}

export const getList = async accessToken => {
	const [err, res] = await uni.request({
		url: 'https://open.ys7.com/api/lapp/live/video/list',
		method: 'POST',
		data:{
			accessToken,
			pageStart:0,
			pageSize:50
		},
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})
	return res.data.data.sort((a, b) => {
		return a.channelNo - b.channelNo
	})
}

export const getVideoImg = async ()=>{
	const res = await post({
		url:'videoConfig/videoImg_list',
		data:{
			token:uni.getStorageSync('token'),
			userid:uni.getStorageSync('userid')
		}
	})
	return res.video
}

export const attendance =  async () =>{
	return await post({
		url:'report/attendance',
		data:{
			token:uni.getStorageSync('token'),
			userid:uni.getStorageSync('userid')
		}
	})
}
