import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios';

const defaultHeaders = {
  Accept: 'application/json, text/plain, */*; charset=utf-8',
  'Content-Type': 'application/json; charset=utf-8',
  Pragma: 'no-cache',
  'Cache-Control': 'no-cache',
};

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000',
  headers: defaultHeaders,
});

const methods = ['get', 'post', 'put', 'delete'] as const;

type HttpMethods = (typeof methods)[number];

type HttpFunction = (url: string, data?: unknown, config?: AxiosRequestConfig) => Promise<AxiosResponse>;

const http: { [key in HttpMethods]: HttpFunction } = {} as { [key in HttpMethods]: HttpFunction };
methods.forEach((method) => {
  http[method] = (url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
    return instance[method](url, data, config);
  };
});

const formMethods = ['post', 'put'] as const;

type FormHttpMethods = (typeof formMethods)[number];

type FormHttpFunction = (url: string, formData: FormData, config?: AxiosRequestConfig) => Promise<AxiosResponse>;

const formHttp: { [key in FormHttpMethods]: FormHttpFunction } = {} as { [key in FormHttpMethods]: FormHttpFunction };
formMethods.forEach((method) => {
  formHttp[method] = (url: string, formData: FormData, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
    return instance[method](url, formData, {
      ...config,
      headers: {
        ...defaultHeaders,
        ...config?.headers,
        'Content-Type': 'multipart/form-data',
      },
    });
  };
});

export default {
  ...http,
  ...formHttp,
};

export const addRequestInterceptor = instance.interceptors.request.use.bind(instance.interceptors.request);

export const addResponseInterceptor = instance.interceptors.response.use.bind(instance.interceptors.response);
