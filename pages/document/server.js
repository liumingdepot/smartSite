import {post} from '@/common/axios.js'

//文档管理查询
export const fileAppList =  async () =>{
	return await post({
		url:'fileManage/fileApp_list',
		data:{
			token:uni.getStorageSync('token'),
			userid:uni.getStorageSync('userid')
		}
	})
}

//文档状态修改
export const fileAppUpdate =  async (id,filestatus) =>{
	return await post({
		url:'fileManage/fileApp_update',
		data:{
			token:uni.getStorageSync('token'),
			userid:uni.getStorageSync('userid'),
			id,
			filestatus
		}
	})
}


