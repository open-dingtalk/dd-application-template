import fetch from 'dva/fetch';
import { getMockData } from './mock';

const mock = true;

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  if (mock) {
    if (url.indexOf('?') !== -1) {
      url = url.split('?')[0];  // 先去掉query，使用随机mock的数据
    }
    console.log(url);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const data = getMockData(url);
        resolve(data);
      }, 100);
    })
  }

  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => ({ data }))
    .catch(err => ({ err }));
}
