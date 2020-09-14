import {post} from '@/common/axios.js'

//考勤
export const getGroup =  async () =>{
	const res = await post({
		url:'zhgdApp/getGroup',
		data: {
			token: uni.getStorageSync('token'),
			userid: uni.getStorageSync('userid')
		}
	})
	return res.data
}




