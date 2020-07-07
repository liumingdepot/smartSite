import {post} from '@/common/axios.js'

export const taskAppList =  async () =>{
	const res = await post({
		url:'taskManage/taskApp_list',
		data:{
			token:uni.getStorageSync('token'),
			userid:uni.getStorageSync('userid')
		}
	})
	return res
}

export const taskAppUpdate =  async data =>{
	const res = await post({
		url:'taskManage/taskApp_update',
		data:{
			token:uni.getStorageSync('token'),
			userid:uni.getStorageSync('userid'),
			...data
		}
	})
	return res
}
