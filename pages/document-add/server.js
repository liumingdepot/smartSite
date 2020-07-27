import {
	post
} from '@/common/axios.js'

//获取文档和文件关联字段
export const fileAppFileid = async () => {
	const res = await post({
		url: 'fileManage/fileApp_fileid',
		data: {
			token: uni.getStorageSync('token'),
			userid: uni.getStorageSync('userid')
		}
	})
	return res.fileid
}

//文档管理新增
export const fileAppAdd = async (data) => {
	return await post({
		url: 'fileManage/fileApp_add',
		data: {
			token: uni.getStorageSync('token'),
			userid: uni.getStorageSync('userid'),
			creatusername: uni.getStorageSync('name'),
			...data
		}
	})
}
