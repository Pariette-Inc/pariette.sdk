import { BaseModule } from './base'
import {
  Canvas,
  CreateCanvasRequest,
  UpdateCanvasRequest,
  CanvasRelationRequest,
  CanvasGalleryRequest,
} from '../types/canvas'
import { ApiResponse, ListParams, PaginatedResponse } from '../types/common'

export class CanvasModule extends BaseModule {
  /** Tum canvas'lari listele (admin) */
  async list(params?: ListParams): Promise<PaginatedResponse<Canvas>> {
    return this.client.get('/api/canvas', params)
  }

  /** Public canvas listesi */
  async listPublic(params?: ListParams): Promise<PaginatedResponse<Canvas>> {
    return this.client.get('/api/public/canvas', params)
  }

  /** Tek canvas getir (admin, slug ile) */
  async get(slug: string): Promise<Canvas> {
    return this.client.get(`/api/canvas/${slug}`)
  }

  /** Public canvas getir (slug ile) */
  async getPublic(slug: string): Promise<Canvas> {
    return this.client.get(`/api/public/canvas/${slug}`)
  }

  /** Yeni canvas olustur */
  async create(data: CreateCanvasRequest): Promise<ApiResponse<Canvas>> {
    return this.client.post('/api/new-canvas', data)
  }

  /** Canvas guncelle */
  async update(slug: string, data: UpdateCanvasRequest): Promise<ApiResponse<Canvas>> {
    return this.client.put(`/api/canvas/${slug}`, data)
  }

  /** Canvas sil */
  async delete(id: number): Promise<ApiResponse> {
    return this.client.delete(`/api/canvas/${id}`)
  }

  /** Canvas content sil */
  async deleteContent(contentId: number): Promise<ApiResponse> {
    return this.client.delete(`/api/canvas-content/${contentId}`)
  }

  /** Canvas attribute set et */
  async setAttributes(data: { canvas_id: number; key: string; value: string }): Promise<ApiResponse> {
    return this.client.post('/api/canvas-attributes', data)
  }

  /** Canvas galeri resmi ekle */
  async addGallery(data: CanvasGalleryRequest): Promise<ApiResponse> {
    return this.client.post('/api/canvas-gallery', data)
  }

  /** Canvas galeri resmi sil */
  async deleteGallery(data: { canvas_id: number; image_id: number }): Promise<ApiResponse> {
    return this.client.post('/api/canvas-gallery/delete', data)
  }

  /** Canvas galeri sirasini guncelle */
  async updateGalleryOrder(id: number, data: { order: number }): Promise<ApiResponse> {
    return this.client.put(`/api/canvas-gallery/${id}`, data)
  }

  /** Canvas iliskileri getir (admin) */
  async getRelations(id: number): Promise<ApiResponse> {
    return this.client.get(`/api/canvas-relations/${id}`)
  }

  /** Canvas iliskisi olustur */
  async createRelation(data: CanvasRelationRequest): Promise<ApiResponse> {
    return this.client.post('/api/canvas-relations', data)
  }

  /** Canvas iliskisini sil */
  async deleteRelation(id: number): Promise<ApiResponse> {
    return this.client.delete(`/api/canvas-relations/${id}`)
  }

  /** Public koleksiyon icerigi */
  async getCollection(id: number): Promise<ApiResponse> {
    return this.client.get(`/api/public/collection/${id}`)
  }

  /** Public kategoriler */
  async getCategories(slug: string): Promise<ApiResponse> {
    return this.client.get(`/api/public/categories/${slug}`)
  }

  /** Canvas metrikleri */
  async getMetrics(id: number): Promise<ApiResponse> {
    return this.client.get(`/api/canvas-metrics/${id}`)
  }

  /** Canvas metrik detaylari */
  async getMetricDetails(id: number): Promise<ApiResponse> {
    return this.client.get(`/api/canvas-metric-details/${id}`)
  }
}
