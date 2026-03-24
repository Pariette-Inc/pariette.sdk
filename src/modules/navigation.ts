import { BaseModule } from './base'
import { ApiResponse } from '../types/common'

export interface Navigation {
  id: number
  title: string
  slug: string
  environment_id: number
  status: number
  created_at: string
  updated_at: string
  links?: NavigationLink[]
}

export interface NavigationLink {
  id: number
  navigation_id: number
  title: string
  url?: string
  target?: string
  icon?: string
  parent_id?: number
  order: number
  status: number
  children?: NavigationLink[]
}

export interface CreateNavigationRequest {
  title: string
  slug?: string
  status?: number
}

export interface CreateNavigationLinkRequest {
  navigation_id: number
  title: string
  url?: string
  target?: string
  icon?: string
  parent_id?: number
  order?: number
  status?: number
}

export class NavigationModule extends BaseModule {
  /** Navigasyon listesi */
  async list(): Promise<ApiResponse<Navigation[]>> {
    return this.client.get('/api/navigations')
  }

  /** Navigasyon olustur */
  async create(data: CreateNavigationRequest): Promise<ApiResponse<Navigation>> {
    return this.client.post('/api/navigations', data)
  }

  /** Navigasyon guncelle */
  async update(id: number, data: Partial<CreateNavigationRequest>): Promise<ApiResponse> {
    return this.client.put(`/api/navigations/${id}`, data)
  }

  /** Navigasyon sil */
  async delete(id: number): Promise<ApiResponse> {
    return this.client.delete(`/api/navigations/${id}`)
  }

  // --- Links ---

  readonly links = {
    /** Link listesi */
    list: (navigationId: number): Promise<ApiResponse<NavigationLink[]>> => {
      return this.client.get(`/api/navigation-links/${navigationId}`)
    },

    /** Link olustur */
    create: (data: CreateNavigationLinkRequest): Promise<ApiResponse<NavigationLink>> => {
      return this.client.post('/api/navigation-links', data)
    },

    /** Link guncelle */
    update: (id: number, data: Partial<CreateNavigationLinkRequest>): Promise<ApiResponse> => {
      return this.client.put(`/api/navigation-links/${id}`, data)
    },

    /** Link sil */
    delete: (id: number): Promise<ApiResponse> => {
      return this.client.delete(`/api/navigation-links/${id}`)
    },

    /** Linkleri yeniden sirala */
    reorder: (links: { id: number; order: number; parent_id?: number }[]): Promise<ApiResponse> => {
      return this.client.put('/api/navigation-links/reorder', { links })
    },
  }

  // --- Public ---

  /** Banner listesi */
  async getBanners(): Promise<ApiResponse> {
    return this.client.get('/api/public/banners')
  }
}
