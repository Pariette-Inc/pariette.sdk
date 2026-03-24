export interface ParietteConfig {
  mode: 'production' | 'test'
  token: string
  locale?: string
  timeout?: number
}

export const API_URLS = {
  production: 'https://live.pariette.com',
  test: 'https://dev.pariette.com',
} as const

export interface ApiResponse<T = any> {
  status: boolean
  statusText?: string
  message?: string
  data?: T
  errors?: Record<string, string[]>
}

export interface PaginatedResponse<T = any> {
  status: boolean
  data: T[]
  current_page: number
  last_page: number
  per_page: number
  total: number
}

export interface ListParams {
  page?: number
  per_page?: number
  search?: string
  sort?: string
  order?: 'asc' | 'desc'
  [key: string]: any
}

export class ParietteError extends Error {
  constructor(
    message: string,
    public code: number,
    public errors?: Record<string, string[]>
  ) {
    super(message)
    this.name = 'ParietteError'
  }
}
