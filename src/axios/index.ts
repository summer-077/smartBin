// src/axios/index.ts
import axios from 'axios';
import { ElMessage } from 'element-plus';

// 设置超时时间
axios.defaults.timeout = 10000;

if (process.env.NODE_ENV === "development") {
  // 开发环境
  axios.defaults.baseURL = "dev"; // 使用代理路径
} else {
  // 生产环境
  axios.defaults.baseURL = "/";
  if (typeof window !== 'undefined') {
    window.console.log = function () {};
  }
}

// 添加请求拦截器
axios.interceptors.request.use(
  (config: axios.AxiosRequestConfig) => {
    // 在发送请求之前做些什么
    return config;
  },
  (error: any) => {
    // 对请求错误做些什么
    ElMessage.error("请求失败！请检查网络，或者联系技术人员！");
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  (response: axios.AxiosResponse) => {
    // 对响应数据做点什么
    return response;
  },
  (error: any) => {
    // 对响应错误做些什么
    ElMessage.error("响应失败！请检查网络，或者联系技术人员！");
    return Promise.reject(error);
  }
);

export default axios;