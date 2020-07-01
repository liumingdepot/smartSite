import {post} from '@/common/axios.js'

export const taskAppAdd =  async data =>{
	const res = await post({
		url:'taskManage/taskApp_add',
		data
	})
	return res
}