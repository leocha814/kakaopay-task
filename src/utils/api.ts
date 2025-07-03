import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';

const baseURL = 'http://localhost:3001';
const MAX_TIMEOUT = 60000;

const initialConfig: AxiosRequestConfig = Object.freeze({
  baseURL,
  timeout: MAX_TIMEOUT,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
const createApiInstance = () => {
  return axios.create({
    ...initialConfig,
  });
};

export const api = createApiInstance();

api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  return config;
});

export default api;
