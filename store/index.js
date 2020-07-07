import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		token: uni.getStorageSync('token'),
		userid: uni.getStorageSync('userid'),
		username: uni.getStorageSync('username'),
		senduser: uni.getStorageSync('senduser')
	},
	getters: {

	},
	mutations: {
		clearData(state) {
			state.token = '';
			state.userid = '';
			state.username = '';
			state.senduser = []
		}
	},
	actions: {

	}
})

export default store
