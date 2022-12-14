import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

// instance 생성
const http = axios.create({
  baseURL: 'http://localhost:9000'
});

http.interceptors.request.use((config: AxiosRequestConfig) => {
  // Access Token이 있으면 header에 담기
  if (localStorage.getItem('ACCESS_TOKEN')) {
    config["headers"] = {
      Authorization: `${localStorage.getItem('ACCESS_TOKEN')}`,
    };
  }
  // TODO [Store] loading start update
  return config;
});

http.interceptors.response.use(
  (response: AxiosResponse) => {
    // TODO [Store] loading stop update
    return Promise.resolve(response.data);
  }, 
  (error: AxiosError) => {
    // TODO [Store] loading stop update
    return Promise.reject(error?.response?.data);
  }
);

export default http;