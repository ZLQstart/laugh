import axios from 'axios'
import vue from 'vue'
import { METHODS } from 'http';

//大多数的web服务器只能识别form的post的请求
axios.defaults.headers.post['Content-type'] = 'application/x-www-form-urlencoded'

//请求拦截器
axios.interceptors.request.use(function (config) {
  return config
}, function (err) {
  return Promise.reject(err)
})

//响应拦截器
axios.interceptors.response.use(function (response) {
  return response
}, function (err) {
  return Promise.reject(err)
})


// // 封装axios的post请求
// export function fetch (url, params) {
//   return new Promise((resolve, reject) => {
//     axios.post(url, params)
//       .then(response => {
//         resolve(response.data)
//       })
//       .catch((error) => {
//         reject(error)
//       })
//   })
// }

//封装axios的get请求
export function fetch(url, params) {
  return new Promise((resolve, reject) => {
    console.log(params)
    axios({
        url: url,
        method: 'POST',
        data: params,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(response => {
        resolve(response.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export default {
  getData(url, params) {
    return fetch(url, params)
  }
}
