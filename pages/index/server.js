import {
	post,
	get
} from '@/common/axios.js'

const color = ['#03c7e5', '#b946f0', '#4291fd', '#82ff45', '#ff45a1', '#03c7e5', '#b946f0']

//任务
export const taskAppList = async () => {
	return await post({
		url: 'taskManage/taskApp_list',
		data: {
			token: uni.getStorageSync('token'),
			userid: uni.getStorageSync('userid')
		}
	})
}
//项目工期
export const project = async () => {
	return await post({
		url: 'todayDate/project',
		data: {
			token: uni.getStorageSync('token'),
			userid: uni.getStorageSync('userid')
		}
	})
}

//监测数据查询
export const todayDate = async () => {
	const res = await post({
		url: 'visualzation/getToDayData',
	})
	return res.data.map((val, index) => {
		val.color = color[index]
		return val
	})
}

export const getUdpData = async () => {
	const res = await post({
		url: 'visualzation/getUdpData',
	})
	const data = res.data[0]
	return [
		{
			itemavgvalue: data['pm1'],
			itemname: 'pm1',
			color: color[0]
		},
		{
			itemavgvalue: data['pm10'],
			itemname: 'pm10',
			color: color[1]
		},
		{
			itemavgvalue: data['pm2.5'],
			itemname: 'pm2.5',
			color: color[2]
		},
		{
			itemavgvalue: data['no2'],
			itemname: 'no2',
			color: color[3]
		},
		{
			itemavgvalue: data['vocs'],
			itemname: 'vocs',
			color: color[4]
		}
	]
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
		data: {
			accessToken,
			pageStart: 0,
			pageSize: 50
		},
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})
	return res.data.data.sort((a, b) => {
		return a.channelNo - b.channelNo
	})
}

export const getVideoImg = async () => {
	const res = await post({
		url: 'videoConfig/videoImg_list',
		data: {
			token: uni.getStorageSync('token'),
			userid: uni.getStorageSync('userid')
		}
	})
	return res.video
}

export const attendance = async () => {
	return await post({
		url: 'report/attendance',
		data: {
			token: uni.getStorageSync('token'),
			userid: uni.getStorageSync('userid')
		}
	})
}

export const getImgAndVideo = async () => {
	return await get({
		url: 'imgVideo/getImgAndVideo'
	})
}
