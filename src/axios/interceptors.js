import Vue from 'vue'

export class Interceptors {
  constructor(instance) {
    this.instance = instance
    // 初始化拦截器
    this.initInterceptors();
  }
  getInterceptors() {
    return this.instance;
  }
  initInterceptors() {
	  let that=this;
    // 请求拦截器
    this.instance.interceptors.request.use(
    	function (config) {
				console.log(config)
				if(config.baseURL.includes('localhost:3001')) config.headers['Authorization'] = 'Bearer ' + sessionStorage.getItem('chatSessionId')
				
				return config
			},
		function (error) {
				// 对请求错误做些什么
				return Promise.reject(error)
			}
		)
	  // 添加响应拦截器
	  this.instance.interceptors.response.use(
			function (response) {
				return response.data;
			},
			function (error) {
				// 对响应
				if(error&&error.response){
					that.errorHandle(error);
				}
				return Promise.reject(error)
			}
		)
	}
	/**
	 * http握手错误
	 * @param error  响应回调,根据不同响应进行不同操作
	 */
	errorHandle(error) {
		return Promise.reject(error.response.data);
	}
}
