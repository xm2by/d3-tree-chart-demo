import axios from 'axios'

export const baseURL = process.env.NODE_ENV === 'development' ? '' : ''

export const instance = axios.create({
  baseURL,
  timeout: 36000,
})

instance.interceptors.response.use((res) => {
  return res.data
}, (err) => {
  throw err.response.data
})

export const {get, post} = {
  get(url, config) {
    return instance.get(url, config)
  },
  post(url, data, config) {
    return instance.post(url, data, config)
  },
}