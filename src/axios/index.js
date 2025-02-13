import Vue from 'vue'
import Http from './http'

Vue.use(Http)

const api = new Http({
	debug: false,
	baseURL: 'http://localhost:8888',
	timeout: 0,
	cache: false,
	emulateJSON: false,
	showLoading: false,
})


export default api
