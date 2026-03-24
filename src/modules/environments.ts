import { BaseModule } from './base'
import {
  Environment,
  EnvironmentDesign,
  EnvironmentLegal,
  EnvironmentMeta,
  EnvironmentNotify,
  CreateEnvironmentRequest,
  TeamMember,
  InviteTeamMemberRequest,
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

  /** Yeni ortam olustur */
  async create(data: CreateEnvironmentRequest): Promise<ApiResponse<Environment>> {
    return this.client.post('/api/new-environment', data)
  }

  /** Genel ayarlari guncelle */
  async updateGeneral(token: string, data: Partial<Environment>): Promise<ApiResponse> {
    return this.client.put(`/api/environment/${token}`, data)
  }

  /** Tasarim ayarlari guncelle */
  async updateDesign(token: string, data: EnvironmentDesign): Promise<ApiResponse> {
    return this.client.put(`/api/environment/${token}/design`, data)
  }

  /** Yasal ayarlari guncelle */
  async updateLegal(token: string, data: EnvironmentLegal): Promise<ApiResponse> {
    return this.client.put(`/api/environment/${token}/legal`, data)
  }

  /** Bildirim ayarlari guncelle */
  async updateNotify(token: string, data: EnvironmentNotify): Promise<ApiResponse> {
    return this.client.put(`/api/environment/${token}/notify`, data)
  }

  /** Meta/SEO ayarlari guncelle */
  async updateMeta(token: string, data: EnvironmentMeta): Promise<ApiResponse> {
    return this.client.put(`/api/environment/${token}/meta`, data)
  }

  /** Mail template getir */
  async getMailTemplate(token: string): Promise<ApiResponse> {
    return this.client.get(`/api/environment/${token}/mail-template`)
  }

  /** Ortam istatistikleri */
  async statistics(token: string): Promise<EnvironmentStatistics> {
    return this.client.get(`/api/environment/${token}/statistics`)
  }

  /** Navigasyon getir (public) */
  async getNavigation(slug: string): Promise<ApiResponse> {
    return this.client.get(`/api/public/navigation/${slug}`)
  }

  /** Izin verilen domain'ler */
  async allowedDomains(): Promise<ApiResponse> {
    return this.client.get('/api/allowed-domains')
  }

  // --- Team ---

  readonly team = {
    /** Takim uyeleri listesi */
    list: (token: string): Promise<ApiResponse<TeamMember[]>> => {
      return this.client.get(`/api/environment/${token}/users`)
    },

    /** Takim uyesi davet et */
    invite: (token: string, data: InviteTeamMemberRequest): Promise<ApiResponse> => {
      return this.client.post(`/api/environment/${token}/users`, data)
    },

    /** Takim uyesi guncelle */
    update: (token: string, userId: number, data: Partial<TeamMember>): Promise<ApiResponse> => {
      return this.client.put(`/api/environment/${token}/users/${userId}`, data)
    },

    /** Takim uyesini kaldir */
    remove: (token: string, userId: number): Promise<ApiResponse> => {
      return this.client.delete(`/api/environment/${token}/users/${userId}`)
    },

    /** Daveti iptal et */
    cancelInvitation: (token: string, invitationId: number): Promise<ApiResponse> => {
      return this.client.delete(`/api/environment/${token}/invitations/${invitationId}`)
    },

    /** Roller listesi */
    roles: (token: string): Promise<ApiResponse> => {
      return this.client.get(`/api/environment/${token}/roles`)
    },
  }

  // --- Shopping (Multi-tenant Commerce) ---

  readonly shopping = {
    /** Iliskiler */
    relationships: (envId: number): Promise<ApiResponse> => {
      return this.client.get(`/api/shopping/environments/${envId}/relationships`)
    },

    createRelationship: (envId: number, data: Record<string, any>): Promise<ApiResponse> => {
      return this.client.post(`/api/shopping/environments/${envId}/relationships`, data)
    },

    deleteRelationship: (envId: number, relId: number): Promise<ApiResponse> => {
      return this.client.delete(`/api/shopping/environments/${envId}/relationships/${relId}`)
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
