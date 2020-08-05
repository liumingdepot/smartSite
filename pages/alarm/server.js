import {post} from '@/common/axios.js'

//文档管理查询
export const alarm =  async () =>{
	const res = await post({
		url:'report/alarm',
		data:{
			token:uni.getStorageSync('token'),
			userid:uni.getStorageSync('userid')
		}
	})
	return res.alarm
}



