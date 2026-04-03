import { BaseModule } from './base'
import {
  Canvas,
  CreateCanvasRequest,
  UpdateCanvasRequest,
  CreateCategoryRequest,
  AddCanvasToCategoryRequest,
  CanvasRelationRequest,
  CanvasGalleryRequest,
} from '../types/canvas'
import { ApiResponse, ListParams, PaginatedResponse } from '../types/common'

export class CanvasModule extends BaseModule {
  // ── Listeleme ─────────────────────────────────────────────────────────────

  /** Tüm canvas'ları listele (admin) */
  async list(params?: ListParams): Promise<PaginatedResponse<Canvas>> {
    return this.client.get('/api/canvas', params)
  }

  /** Public canvas listesi */
  async listPublic(params?: ListParams): Promise<PaginatedResponse<Canvas>> {
    return this.client.get('/api/public/canvas', params)
  }

  // ── Tek canvas getirme ────────────────────────────────────────────────────

  /** Tek canvas getir — admin (slug ile) */
  async get(slug: string): Promise<Canvas> {
    return this.client.get(`/api/canvas/${slug}`)
  }

  /** Public canvas getir (slug ile) */
  async getPublic(slug: string, params?: Record<string, any>): Promise<Canvas> {
    return this.client.get(`/api/public/canvas/${slug}`, params)
  }

  // ── Canvas oluşturma ──────────────────────────────────────────────────────

  /**
   * Yeni canvas oluştur ve içeriğini (content) aynı anda kaydet.
   *
   * `title` → canvas.title ve canvas.slug olarak kullanılır.
   * `type`  → canvas tipi (örn: 'blog', 'page', 'content').
   *
   * İçerik alanları (sub_title, content, keywords vb.) ilk locale'e
   * otomatik bağlanır; farklı dil versiyonu için update() kullanın.
   *
   * @example
   *   await pariette.canvas.createCanvas({
   *     title: 'Yeni Makale',
   *     type: 'blog',
   *     content: '<p>Makale içeriği</p>',
   *     meta_title: 'Yeni Makale | Blog',
   *     locale: 'tr',
   *   })
   */
  async createCanvas(data: CreateCanvasRequest): Promise<ApiResponse<Canvas>> {
    return this.client.post('/api/new-canvas', data)
  }

  // ── Canvas güncelleme / silme ─────────────────────────────────────────────

  /** Canvas güncelle */
  async update(slug: string, data: UpdateCanvasRequest): Promise<ApiResponse<Canvas>> {
    return this.client.put(`/api/canvas/${slug}`, data)
  }

  /** Canvas sil */
  async delete(id: number): Promise<ApiResponse> {
    return this.client.delete(`/api/canvas/${id}`)
  }

  /** Canvas content kaydını sil */
  async deleteContent(contentId: number): Promise<ApiResponse> {
    return this.client.delete(`/api/canvas-content/${contentId}`)
  }

  // ── Kategori yönetimi ─────────────────────────────────────────────────────

  /**
   * Yeni kategori oluştur.
   *
   * Kategori, type='category' olan özel bir canvas'tır.
   * Canvas'ları bu kategoriye bağlamak için addCanvasToCategory() kullanın.
   *
   * @example
   *   const cat = await pariette.canvas.createCategory({
   *     title: 'Haberler',
   *     locale: 'tr',
   *   })
   */
  async createCategory(data: CreateCategoryRequest): Promise<ApiResponse<Canvas>> {
    return this.client.post('/api/new-canvas', { ...data, type: 'category' })
  }

  /**
   * Kategori canvas'ını getir — admin (slug ile).
   *
   * @example
   *   const cat = await pariette.canvas.getCategory('haberler')
   */
  async getCategory(slug: string): Promise<Canvas> {
    return this.client.get(`/api/canvas/${slug}`)
  }

  /**
   * Public kategori içeriğini getir.
   * Kategoriye bağlı canvas'ları (children) döndürür.
   *
   * @example
   *   const items = await pariette.canvas.getCategoryPublic('haberler')
   */
  async getCategoryPublic(slug: string, params?: ListParams): Promise<ApiResponse> {
    return this.client.get(`/api/public/categories/${slug}`, params)
  }

  /**
   * Bir canvas'ı kategoriye ekle.
   *
   * canvas_relations tablosunda `canvas (kategori) → collection (içerik)` ilişkisi kurar.
   *
   * @param categoryId  - Hedef kategori canvas'ının ID'si
   * @param canvasId    - Kategoriye eklenecek canvas'ın ID'si
   *
   * @example
   *   await pariette.canvas.addCanvasToCategory(categoryId, articleId)
   */
  async addCanvasToCategory(categoryId: number, canvasId: number): Promise<ApiResponse> {
    return this.client.post('/api/canvas-relations', {
      canvas: categoryId,
      collection: canvasId,
    } satisfies AddCanvasToCategoryRequest)
  }

  // ── Galeri ────────────────────────────────────────────────────────────────

  /** Canvas galeri resmi ekle */
  async addGallery(data: CanvasGalleryRequest): Promise<ApiResponse> {
    return this.client.post('/api/canvas-gallery', data)
  }

  /** Canvas galeri resmi sil */
  async deleteGallery(data: { canvas_id: number; image_id: number }): Promise<ApiResponse> {
    return this.client.post('/api/canvas-gallery/delete', data)
  }

  /** Canvas galeri sırasını güncelle */
  async updateGalleryOrder(id: number, data: { order: number }): Promise<ApiResponse> {
    return this.client.put(`/api/canvas-gallery/${id}`, data)
  }

  // ── Attribute ─────────────────────────────────────────────────────────────

  /** Canvas attribute set et */
  async setAttributes(data: { canvas_id: number; key: string; value: string }): Promise<ApiResponse> {
    return this.client.post('/api/canvas-attributes', data)
  }

  // ── İlişkiler (Relations) ─────────────────────────────────────────────────

  /** Canvas ilişkilerini getir — admin */
  async getRelations(id: number): Promise<ApiResponse> {
    return this.client.get(`/api/canvas-relations/${id}`)
  }

  /** Canvas ilişkisi oluştur */
  async createRelation(data: CanvasRelationRequest): Promise<ApiResponse> {
    return this.client.post('/api/canvas-relations', data)
  }

  /** Canvas ilişkisini sil */
  async deleteRelation(id: number): Promise<ApiResponse> {
    return this.client.delete(`/api/canvas-relations/${id}`)
  }

  // ── Koleksiyon & Metrikler ────────────────────────────────────────────────

  /** Public koleksiyon içeriği */
  async getCollection(id: number): Promise<ApiResponse> {
    return this.client.get(`/api/public/collection/${id}`)
  }

  /**
   * @deprecated getCategoryPublic() kullanın.
   * Public kategoriler (slug ile)
   */
  async getCategories(slug: string): Promise<ApiResponse> {
    return this.getCategoryPublic(slug)
  }

  /** Canvas metrikleri */
  async getMetrics(id: number): Promise<ApiResponse> {
    return this.client.get(`/api/canvas-metrics/${id}`)
  }

  /** Canvas metrik detayları */
  async getMetricDetails(id: number): Promise<ApiResponse> {
    return this.client.get(`/api/canvas-metric-details/${id}`)
  }
}
