// 审核
export const generate = (param) => {
	return {
		url: '/api/generate',
		method: 'post',
		data: param,
	};
};
// 审核
export const tags = (param) => {
	return {
		url: '/api/tags',
		param: param,
	};
};
