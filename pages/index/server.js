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
	return await post({
		url:'todayDate/env',
		data:{
			token:uni.getStorageSync('token'),
			userid:uni.getStorageSync('userid')
		}
	})
}
