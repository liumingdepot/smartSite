import {post} from '@/common/axios.js'

//健康档案查询
export const getHealth =  async () =>{
	const res = await post({
		url:'health/getHealth',
		data:{
			token:uni.getStorageSync('token'),
			userid:uni.getStorageSync('userid')
		}
	})
    return res.healJson
}

//健康档案新增、修改
export const updateHeal =  async data =>{
	return await post({
		url:'health/updateHeal',
		data
	})
}


