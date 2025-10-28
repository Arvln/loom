import axiosInstance from 'axios'
import * as message from './message'

const axios = axiosInstance.create({
  baseURL: '/api',
  withCredentials: true,
})

const queryMethods = ['get', 'head', 'options']
axios.interceptors.request.use(async (config) => {
  const method = config.method ?? 'get'

  if (config.showMessage === undefined) {
    config.showMessage = !queryMethods.includes(method)
  }
  if (config.successToast === undefined) {
    config.successToast = (response) => message.success(response?.data?.msg)
  }
  if (config.errorToast === undefined) {
    config.errorToast = (error) => message.error(error?.response?.data?.msg)
  }

  return config
})

axios.interceptors.response.use(
  (response) => {
    if (response.config.showMessage) {
      response?.config?.successToast?.(response)
    }

    return response
  },
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 419 && !originalRequest._retry) {
      originalRequest._retry = true

      await axios.get('/sanctum/csrf-cookie')
      return axios(originalRequest)
    }

    if (originalRequest.showMessage) {
      error?.response?.config?.errorToast?.(error)
    }

    return Promise.reject(error)
  }
)

export { axiosInstance, axios }
