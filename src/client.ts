import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { ParietteConfig, ApiResponse, ParietteError } from './types/common'

export class ParietteClient {
  private http: AxiosInstance
  private authToken: string | null = null

  constructor(private config: ParietteConfig) {
    this.http = axios.create({
      baseURL: config.apiUrl.replace(/\/+$/, ''),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ParietteToken: config.token,
        ...(config.locale ? { Locale: config.locale } : {}),
        ...(config.consoleToken ? { ConsoleToken: config.consoleToken } : {}),
      },
      timeout: config.timeout || 30000,
    })

    this.http.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response) {
          const data = error.response.data
          throw new ParietteError(
            data?.message || error.message,
            error.response.status,
            data?.errors
          )
        }
        throw new ParietteError(error.message, 0)
      }
    )
  }

  setAuthToken(token: string | null): void {
    this.authToken = token
    if (token) {
      this.http.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
      delete this.http.defaults.headers.common['Authorization']
    }
  }

  getAuthToken(): string | null {
    return this.authToken
  }

  setLocale(locale: string): void {
    this.http.defaults.headers.common['Locale'] = locale
  }

  setConsoleToken(token: string): void {
    this.http.defaults.headers.common['ConsoleToken'] = token
  }

  async get<T = any>(url: string, params?: Record<string, any>): Promise<T> {
    const response = await this.http.get<T>(url, { params })
    return response.data
  }

  async post<T = any>(url: string, data?: any): Promise<T> {
    const response = await this.http.post<T>(url, data)
    return response.data
  }

  async put<T = any>(url: string, data?: any): Promise<T> {
    const response = await this.http.put<T>(url, data)
    return response.data
  }

  async patch<T = any>(url: string, data?: any): Promise<T> {
    const response = await this.http.patch<T>(url, data)
    return response.data
  }

  async delete<T = any>(url: string, params?: Record<string, any>): Promise<T> {
    const response = await this.http.delete<T>(url, { params })
    return response.data
  }

  async upload<T = any>(
    url: string,
    file: any,
    fieldName = 'file',
    extraFields?: Record<string, any>,
    onProgress?: (progress: number) => void
  ): Promise<T> {
    const formData = new FormData()
    formData.append(fieldName, file)

    if (extraFields) {
      Object.entries(extraFields).forEach(([key, value]) => {
        formData.append(key, String(value))
      })
    }

    const config: AxiosRequestConfig = {
      headers: { 'Content-Type': 'multipart/form-data' },
      ...(onProgress
        ? {
            onUploadProgress: (e) => {
              if (e.total) onProgress(Math.round((e.loaded * 100) / e.total))
            },
          }
        : {}),
    }

    const response = await this.http.post<T>(url, formData, config)
    return response.data
  }

  async uploadMultiple<T = any>(
    url: string,
    files: any[],
    fieldName = 'files[]',
    extraFields?: Record<string, any>,
    onProgress?: (progress: number) => void
  ): Promise<T> {
    const formData = new FormData()
    files.forEach((file) => formData.append(fieldName, file))

    if (extraFields) {
      Object.entries(extraFields).forEach(([key, value]) => {
        formData.append(key, String(value))
      })
    }

    const config: AxiosRequestConfig = {
      headers: { 'Content-Type': 'multipart/form-data' },
      ...(onProgress
        ? {
            onUploadProgress: (e) => {
              if (e.total) onProgress(Math.round((e.loaded * 100) / e.total))
            },
          }
        : {}),
    }

    const response = await this.http.post<T>(url, formData, config)
    return response.data
  }
}
