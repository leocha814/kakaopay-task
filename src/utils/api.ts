import axios, { AxiosRequestConfig } from 'axios';

import { keysToSnakeCase } from '@/utils/utils';

const baseURL = location.origin;
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

api.interceptors.request.use((config) => {
  if (config.data) {
    config.data = keysToSnakeCase(config.data);
  }
  if (config.params) {
    config.params = keysToSnakeCase(config.params);
  }
  return config;
});

export default api;
