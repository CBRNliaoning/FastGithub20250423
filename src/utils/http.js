import axios from 'axios';

// 创建axios实例
const httpInstance = axios.create({
  baseURL: 'https://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 500000
});

// axios请求拦截器
httpInstance.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  return config;
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// axios响应拦截器
httpInstance.interceptors.response.use(response => {
  // 对响应数据做点什么
  return response.data;
}, error => {
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default httpInstance;
