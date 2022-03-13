import axios, { AxiosError, AxiosResponse } from 'axios'
import memoize from 'p-memoize'

const successInterceptor = (response: AxiosResponse) => response.data

const errorInterceptor = (error: AxiosError) => {
  if (error.response) {
    console.error('Status:', error.response.status)
    console.error('Data:', error.response.data)
    console.error('Headers:', error.response.headers)
  } else {
    console.error('Error Message:', error.message)
  }
  return Promise.reject(error.response || error.message)
}

export const restClient = (host?: string) => {
  const axiosInstance = axios.create({
    headers: { Accept: 'application/json' },
    baseURL: host
  })
  axiosInstance.interceptors.response.use(successInterceptor, errorInterceptor)
  return axiosInstance
}

export const getRestClient = memoize(async (host?: string) => restClient(host))
