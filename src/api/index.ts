import { apiConfig } from "@/config";
import router from "@/router";
import axios from "axios";
import { ElMessage } from "element-plus";

const request = axios.create({
  baseURL: apiConfig.baseURL,
  timeout: 5000,
});

// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
request.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
  },
  function (error) {
    if (error.message.startsWith("timeout")) {
      return Promise.reject("请求超时");
    }
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("usertype");
      ElMessage({
        showClose: true,
        message: error as string,
        type: "error",
      });
      // 引导用户返回到登录页面
      router.push("/login");
    }
    if (error.response.status === 500) {
      return Promise.reject("服务器内部错误");
    }
    return Promise.reject(error);
  }
);

export const DoRequest = (requestInfo: any) => {
  request(requestInfo);
};

export default request;
