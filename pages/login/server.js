import {post} from '@/common/axios.js'

export const taskAppList =  async () =>{
	const res = await post({
		url:'taskManage/taskApp_list',
		data:{
			id:160
		}
	})
	return res
}