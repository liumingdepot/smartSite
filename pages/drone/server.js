import {post} from '@/common/axios.js'

//获取无人机数据
export const getUdpData =  async (stime= '',etime='') =>{
	const res = await post({
		url:'visualzation/getUdpData',
		data:{
			stime,
			etime
		}
	})
    return res.data
}


