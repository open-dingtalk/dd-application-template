// request.js
import { getMockData } from '../mock'

const mock = true

const request = async ({url, type, params}) => {
  const baseUrl = ''

  if (mock) {
    if (url.indexOf('?') !== -1) {
      url = url.split('?')[0];  // 先去掉query，使用随机mock的数据
    }
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const data = getMockData(url, params)
        resolve(data)
      }, 100)
    })
  }

  return new Promise((resolve, reject) => {
    //设置默认数据传数格式
    let methonType = "application/json"
    const method = type || 'GET'
    //判断请求方式
    if (method === 'PUT') {
      const p = Object.keys(params).map(function(key) {
        return encodeURIComponent(key) + "=" + encodeURIComponent(params[key])
      }).join("&")
      url += '?' + p
      params = {}
    }
    if (method == "POST") {
      methonType = "application/json"
    }
    //验证基础库
    if (dd.httpRequest) {
      //开始正式请求
      dd.httpRequest({
        url: baseUrl + url,
        method: method,
        headers: {
          'content-type': methonType,
        },
        data: JSON.stringify(params),
        timeout: 10000,
        //成功回调
        success: (res) => {
          if(res.status === 200){
            resolve(res.data)
          } else {
            dd.showToast({
              type: 'fail',
              content: res.data.message,
              duration: 5000,
              success: () => {
              },
            })
            reject('请求异常')
          }
        },
        //错误回调
        fail(error) {
          dd.showToast({
            type: 'fail',
            content: error.errorMessage,
            duration: 5000,
            success: () => {
            },
          })
          reject(error)
        },
      })
    } else {
      // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样提示
      dd.alert({
        title: '提示',
        content: '当前钉钉版本过低，无法使用此功能，请升级最新版本钉钉'
      })
    }
    })
}

export default request
