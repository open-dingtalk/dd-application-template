import React from '@alipay/bigfish/react';
import axios from 'axios';

const api = axios.create({
  timeout: 60000,
});

api.interceptors.response.use(
  response => {
    const respData = response.data;
    if (respData.code === 401) {
      const i = respData.data.url.indexOf('BACK_URL=');
      window.location.href = `${respData.data.url.slice(0, i)}BACK_URL=${encodeURIComponent(
        window.location.href,
      )}`;
    } else {
      return respData;
    }
  },
  error => Promise.reject(error),
);

api.success = function (resp) {
  if (!resp) {
    // debugger;
  }
  if (!resp.code) {
    return Promise.reject(resp);
  }
  if (resp.code === 200) {
    // 200xx表示请求成功
    return resp;
  }
  api.errorMessage(resp);
  return Promise.reject(resp);
};

api.errorMessage = function (resp) {
  if (resp) {
    Message.error(content);
  }
};

export default api;
