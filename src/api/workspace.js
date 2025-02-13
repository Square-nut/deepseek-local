const llmKey = 'BWYG477-3P7M8FS-G4WDJPS-P2XN1HR'

const slug = 'deepseek'

export const $CONFIG = {
	baseURL: `http://localhost:3001/api/v1/workspace/${slug}/`,
};

// 审核
export const chat = (param) => {
	return {
		url: 'chat',
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
