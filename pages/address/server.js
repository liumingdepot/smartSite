import {post} from '@/common/axios.js'

//健康档案查询
export const getAddressBook =  async () =>{
	const res = await post({
		url:'zhgdApp/getAddressBook',
		data:{
			token:uni.getStorageSync('token'),
			userid:uni.getStorageSync('userid')
		}
	})
    return res.txl
}



