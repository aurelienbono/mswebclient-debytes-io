import axios from 'axios'

const BASE_URL = 'http://127.0.0.1:8000/'

let token: string | null = null

interface RequestOptions {
  headers?: Record<string, string>
  params?: Record<string, any>
}

export const apiService = {

  setToken: (newToken: string) => {
    token = newToken
  },

  get: async (endpoint: string, options?: RequestOptions) => {
    try {
      const headers = { ...(options?.headers || {}) }
      if (token) headers['Authorization'] = `Bearer ${token}`

      const response = await axios.get(`${BASE_URL}${endpoint}`, {
        headers,
        params: options?.params
      })
      return { success: true, data: response.data }
    } catch (error: any) {
      return { success: false, error: error.response?.data || error.message }
    }
  },

  post: async (endpoint: string, payload: any, options?: RequestOptions) => {
    try {
      const headers = { 'Content-Type': 'application/json', ...(options?.headers || {}) }
      if (token) headers['Authorization'] = `Bearer ${token}`

      const response = await axios.post(`${BASE_URL}${endpoint}`, payload, {
        headers,
        params: options?.params
      })
      return { success: true, data: response.data }
    } catch (error: any) {
      return { success: false, error: error.response?.data || error.message }
    }
  },

  put: async (endpoint: string, payload: any, options?: RequestOptions) => {
    try {
      const headers = { 'Content-Type': 'application/json', ...(options?.headers || {}) }
      if (token) headers['Authorization'] = `Bearer ${token}`

      const response = await axios.put(`${BASE_URL}${endpoint}`, payload, { headers })
      return { success: true, data: response.data }
    } catch (error: any) {
      return { success: false, error: error.response?.data || error.message }
    }
  },

  delete: async (endpoint: string, options?: RequestOptions) => {
    try {
      const headers = { ...(options?.headers || {}) }
      if (token) headers['Authorization'] = `Bearer ${token}`

      const response = await axios.delete(`${BASE_URL}${endpoint}`, { headers })
      return { success: true, data: response.data }
    } catch (error: any) {
      return { success: false, error: error.response?.data || error.message }
    }
  }
}
