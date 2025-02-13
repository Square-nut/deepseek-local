export const $CONFIG = {
  baseURL: `http://localhost:3001/api/v1/auth/`,
};

// 审核
export const auth = (param) => {
  return {
    url: '',
    method: 'post',
    data: param,
  };
};