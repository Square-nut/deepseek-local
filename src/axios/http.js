import { Interceptors } from "./interceptors";
import axios from "axios";
import loader from "./loader";
import Qs from "qs";
class HttpService {
  constructor(options = {}) {
    this.axios = axios.create();
    this.options = options;
    // 添加拦截器
    new Interceptors(this.axios);
  }
  /**
   *
   * @param url
   * @param params
   * @returns
   */
  request(url, params,headers) {
    // 得到解析数据
    const { api, config } = loader(url);

    let apiConfig = api(params)

    // 合并策略  全局配置-->模块配置-->单独配置
    let options = Object.assign({}, this.options, config, apiConfig);

    const isGet =
      typeof options.method === "undefined" ||
      "post,put,patch".indexOf(options.method.toLowerCase()) === -1;
    // 加时间戳防止缓存
    if (isGet) {
      let _cache = options.cache === false ? { _t: +new Date() } : {};
      options.params = { ..._cache, ...options.params };
    }
    ///保存传递的header
    options.headers = Object.assign({}, options.headers,headers);
    if (options.data && options.emulateJSON) {
      // 模拟表单提交
      options.headers = Object.assign({}, options.headers, {
        "Content-Type": "application/x-www-form-urlencoded"
      });
      options.data = Qs.stringify(options.data);
    }
    const _axios = this.axios;
    return new Promise((resolve, reject) => {
      _axios
        .request(options)
        .then(response => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  /**
   * 请求
   * @param result     结果
   * @param resolve
   */
  handleResult (result, resolve) {
    resolve(result)
  }

}

HttpService.install = function(Vue) {
  Vue.prototype.$api = Vue.api = function() {
    const Instance = this.$root.$options.axios;
    return Instance.request.apply(Instance, arguments);
  };
  Vue.prototype.$axios = Vue.axios = this.axios;
};
export default HttpService;
