import axios from 'axios'

export function request(config) {
  // 创建axios实例
  const instance = axios.create({
    // baseUrl: 'http://123.207.32.32:8000',
    // baseUrl: 'http://www.qcc.com',
    timeout: 5000
  })

  // axios的拦截器
  // 请求拦截
  instance.interceptors.request.use(config => {
    return config
  }), err => {
    // console.log(err)
  }

  instance.interceptors.response.use(res => {
    return res.data()
  }, err => {
    // console.log(err)
  })

  // 发送真正网络请求
  return instance(config)
}
