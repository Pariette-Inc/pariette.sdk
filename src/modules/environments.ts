import { BaseModule } from './base'
import {
  Environment,
  EnvironmentStatistics,
} from '../types/environment'
import { ApiResponse, ListParams, PaginatedResponse } from '../types/common'

export class EnvironmentModule extends BaseModule {
  /** Ortam listesi */
  async list(params?: ListParams): Promise<PaginatedResponse<Environment>> {
    return this.client.get('/api/environment', params)
  }

  /** Public ortam bilgisi */
  async get(token: string): Promise<Environment> {
    return this.client.get(`/api/public/environment/${token}`)
  }

  /** Ortam istatistikleri */
  async statistics(token: string): Promise<EnvironmentStatistics> {
    return this.client.get(`/api/environment/${token}/statistics`)
  }

  /** Navigasyon getir (public) */
  async getNavigation(slug: string): Promise<ApiResponse> {
    return this.client.get(`/api/public/navigation/${slug}`)
  }

  /** Mail template getir */
  async getMailTemplate(token: string): Promise<ApiResponse> {
    return this.client.get(`/api/environment/${token}/mail-template`)
  }

  /** Izin verilen domain'ler */
  async allowedDomains(): Promise<ApiResponse> {
    return this.client.get('/api/allowed-domains')
  }

  // --- Shopping (Multi-tenant Commerce) ---

  readonly shopping = {
    /** Iliskiler */
    relationships: (envId: number): Promise<ApiResponse> => {
      return this.client.get(`/api/shopping/environments/${envId}/relationships`)
    },

    /** Markalar */
    brands: (): Promise<ApiResponse> => {
      return this.client.get('/api/shopping/brands')
    },

    /** Depolar */
    warehouses: (): Promise<ApiResponse> => {
      return this.client.get('/api/shopping/warehouses')
    },

    /** Magazalar */
    shops: (): Promise<ApiResponse> => {
      return this.client.get('/api/shopping/shops')
    },

    /** Dashboard istatistikleri */
    dashboardStats: (): Promise<ApiResponse> => {
      return this.client.get('/api/shopping/dashboard/stats')
    },
  }
}
