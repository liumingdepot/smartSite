import {
	apiUrl
} from './config.js'

export const axios = ({
	url,
	data,
	method,
	header
}) => {
	const dataValue = { ...data}
	for (let key in dataValue) {
		//如果参数为空 不传此参数
		if (dataValue[key] === undefined || dataValue[key] === null) {
			delete dataValue[key]
		}
	}
	return uni.request({
		url,
		data: dataValue,
		method,
		header
	});
}

export const get = async ({
	allurl,
	url,
	data,
	parames
}) => {
	const header = parames ? {
		"Content-Type": "application/x-www-form-urlencoded"
	} : {};
	const dataValue = data ? data : parames
	const [err, res] = await axios({
		method: 'get',
		url: url ? apiUrl + url : allurl,
		data:dataValue,
		header
	})
	if (err) {
		uni.showToast({
			title: '服务器错误',
			icon:'none'
		})
		return
	}else{
		if(res.data.code == -1 && res.data.msg == 'token error'){
			uni.reLaunch({
			    url: '/pages/login/login.vue'
			});
		}
		return res.data
	}
}

export const post = async ({
	allurl,
	url,
	data,
	parames
}) => {
	const header = parames ? {
		"Content-Type": "application/x-www-form-urlencoded"
	} : {};
	const dataValue = data ? data : parames
	const [err, res] = await axios({
		method: 'post',
		url: url ? apiUrl + url : allurl,
		data: dataValue,
		header
	})
	if (err) {
		uni.showToast({
			title: '服务器错误',
			icon:'none'
		})
		return
	}else{
		console.log(res.data.code == -1 && res.data.msg == 'token error');
		if(res.data.code == -1 && res.data.msg == 'token error'){
			uni.navigateBack({
			    delta: 9
			});
			uni.showToast({
				title: '账户已在别处登陆，请重新登录',
				icon:'none'
			})
		}
		return res.data
	}
}
