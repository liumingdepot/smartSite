import {post} from '@/common/axios.js'

//获取无人机数据
export const getUdpData =  async () =>{
	const res = await post({
		url:'visualzation/getUdpData',
	})
    return res.data
}


