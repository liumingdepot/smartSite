import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		userInfo:{}
	},
	getters: {

	},
	mutations: {
		setUserInfo(state,newValue){
			state.userInfo = newValue
		}
	},
	actions: {

	}
})

export default store
