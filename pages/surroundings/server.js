import {post,get} from '@/common/axios.js'


export const getUdpData =  async (stime = '',etime = '') =>{
	const res = await post({
		url:'visualzation/getToDayDataList',
		data:{
			stime,
			etime
		}
	})
    return res.data
}


export const getWpjStatus =  async () =>{
	const res = await post({
		url:'visualzation/getWpjStatus',
	})
    return res.data
}

export const manualpw = (sw) =>{
	return get({
		url:'wupaoji/manualpw',
		data: {
			sw,
			username: 'HXcjFK',
			password: 'F2171D2B-BE43-4377-A873-8E1544A0AF1C'
		}
	})
}


export const autopw = (value) =>{
	return get({
		url:'wupaoji/autopw',
		data: {
			value,
			username: 'HXcjFK',
			password: 'F2171D2B-BE43-4377-A873-8E1544A0AF1C'
		}
	})
}
