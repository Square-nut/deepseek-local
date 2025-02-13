const parseKey = (key) => {
	try {
		const reg = /\w+\.\w+\d*/i

		// 定义一个正则表达式，用来匹配以http或https开头的字符串
		const regexHttp = /^(http|https):\/\//
		// 检查字符串是否以http或https开头
		if (regexHttp.test(key)) {
			return {
				isDomain: true
			}
		}	
		if (!reg.test(key)) {
			new Error('key格式不正确，请使用 aaaa.ccc')
		}
		const keyArr = key.split('.')
		return {
			name: keyArr.pop() || '',
			path: keyArr.join('/') || '',
		}
	} catch (e) {
		throw new Error(e)
	}
}
export default (key) => {
	try {
		const { name, path, isDomain } = parseKey(key)
		const module = require('../api/' + path)
		if (isDomain) api.url = key
		return {
			key,
			api: module[name],
			module,
			config: module['$CONFIG'] || {},
			isDomain
		}
	} catch (e) {
		throw new Error(e)
	}
}
