import {post} from '@/common/axios.js'

export const login =  async data =>{
	const res = await post({
		url:'zhgdApp/login',
		data
	})
	return res
}