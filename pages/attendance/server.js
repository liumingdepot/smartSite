import {post} from '@/common/axios.js'

//考勤
export const getAttendance =  async () =>{
	const res = await post({
		url:'visualzation/getAttendance',
	})
	return res.data
}




