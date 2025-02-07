const parseKey = (key) => {
	try {
		const reg = /\w+\.\w+\d*/i
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
		const { name, path } = parseKey(key)
		const module = require('../api/' + path)

		return {
			key,
			api: module[name],
			module,
			config: module['$config'] || {},
		}
	} catch (e) {
		throw new Error(e)
	}
}
