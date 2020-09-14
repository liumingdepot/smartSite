import {post} from '@/common/axios.js'

export const taskAppHfadd =  async data =>{
	const res = await post({
		url:'taskManage/taskApp_hfadd',
		data:{
			token:uni.getStorageSync('token'),
			userid:uni.getStorageSync('userid'),
			creatusername:uni.getStorageSync('name'),
			...data
		}
	})
	return res
}

export const taskAppFileid =  async data =>{
	const res = await post({
		url:'taskManage/taskApp_fileid',
		data:{
			token:uni.getStorageSync('token'),
			userid:uni.getStorageSync('userid')
		}
	})
	return res.fileid
}
