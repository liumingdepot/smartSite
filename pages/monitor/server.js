import {post} from '@/common/axios.js'

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



