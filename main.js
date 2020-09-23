import Vue from 'vue'
import App from './App'
import store from './store'
import uView from "uview-ui"
import uniPopup from '@/components/uni-popup/uni-popup.vue'
import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
import auiLoading from '@/components/aui-loading/aui-loading.vue';
Vue.component('uniPopup', uniPopup)
Vue.component('uniPopupMessage', uniPopupMessage)
Vue.component('uniPopupDialog', uniPopupDialog)
Vue.component('auiLoading', auiLoading)
Vue.prototype.$store = store 

Vue.use(uView);
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
