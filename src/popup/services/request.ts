/*
 * @FilePath: \dev\src\services\request.js
 * @Version: 2.0
 * @LastEditors: lhl
 * @LastEditTime: 2022-04-24 10:34:57
 * @Description:
 */

import axios from "axios";
import config from "./config.ts";
import qs from "qs";

const Axios = axios.create(config);

// POST 传参序列化
Axios.interceptors.request.use(
  (config) => {
    console.log("lfsz", localStorage.stamp);

    if (localStorage.stamp) {
      config.headers.Stamp = localStorage.stamp;
    }
    if (config.headers["Content-Type"] == "multipart/form-data") {
      return config;
    }
    if (config.method === "post") config.data = qs.stringify(config.data);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 返回结果处理
Axios.interceptors.response.use(
  (response) => {
    switch (response.status) {
      case 200: {
        if (response?.data?.code < 0) {
          return { ...response, data: null };
        } else {
          return {
            ...response,
            data: response?.data?.data ?? {},
            msg: response?.data?.msg,
          };
        }
      }
      default: {
        return { ...response, data: null };
      }
    }
  },
  (error) => {
    switch (error?.response?.status) {
      case 401: {
        chrome.storage.sync.remove(["token", "stamp"]);
        return { data: null };
      }
      default: {
        return { data: null };
      }
    }
  }
);

export default Axios;
