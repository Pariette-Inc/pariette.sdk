import { BaseModule } from './base'
import { ApiResponse, PaginatedResponse } from '../types/common'

export interface CollectionItem {
  id: number
  slug: string
  title: string
  description?: string
  image_web?: string
  image_mobile?: string
  contents?: CollectionItemContent[]
  attributes?: Record<string, any>[]
}

export interface CollectionItemContent {
  locale: string
  title?: string
  description?: string
  content?: string
  keywords?: string
  meta_title?: string
  meta_description?: string
}

export interface CollectionParams {
  from?: string
  type?: string
  status?: number
  paginate?: number
  page?: number
  orderBy?: string
  sort?: 'asc' | 'desc'
  order_type?: 'random'
  start?: string
  end?: string
  limit?: number
}

export interface ProductCollectionParams {
  paginate?: number
  page?: number
  orderBy?: string
  sort?: 'asc' | 'desc'
  order_type?: 'random'
  categorySpot?: number
}

export class CollectionModule extends BaseModule {
  /**
   * Kategori/canvas bilgisini getir
   * Sayfa tipi category, productCategory veya collection ise
   * once bu metod ile canvas bilgisi alinir, sonra id ile icerikler cekilir
   */
  async getCategory(slug: string, type: 'category' | 'productCategory' = 'category'): Promise<ApiResponse<CollectionItem>> {
    return this.client.get(`/api/public/canvas/${slug}`, { type })
  }

  /**
   * Canvas collection icerikleri (haberler, makaleler vs.)
   * canvas id ile o kategoriye ait icerikler cekilir
   *
   * Ornek:
   *   const category = await pariette.collections.getCategory('haberler')
   *   const items = await pariette.collections.getItems(category.data.id, { type: 'news', status: 1, paginate: 10 })
   */
  async getItems(canvasId: number, params?: CollectionParams): Promise<PaginatedResponse<CollectionItem>> {
    return this.client.get(`/api/public/collection/${canvasId}`, {
      from: 'canvas',
      ...params,
    })
  }

  /**
   * Urun collection icerikleri (urun kategorisi)
   * product-category tipi canvas id ile o kategoriye ait urunler cekilir
   *
   * Ornek:
   *   const category = await pariette.collections.getCategory('bebek-arabalari', 'productCategory')
   *   const products = await pariette.collections.getProducts(category.data.id, { paginate: 20 })
   */
  async getProducts(canvasId: number, params?: ProductCollectionParams): Promise<PaginatedResponse<CollectionItem>> {
    return this.client.get(`/api/public/product-collection/${canvasId}`, params)
  }

  /**
   * One cikan / spot urunleri getir
   * categorySpot=1 ile isaratlenmis urunler
   */
  async getFeaturedProducts(canvasId: number, params?: Omit<ProductCollectionParams, 'categorySpot'>): Promise<PaginatedResponse<CollectionItem>> {
    return this.client.get(`/api/public/product-collection/${canvasId}`, {
      categorySpot: 1,
      orderBy: 'id',
      sort: 'desc',
      ...params,
    })
  }

  /**
   * Tum kategorileri listele (canvas tipi: category)
   */
  async listCategories(params?: { limit?: number; orderBy?: string; sort?: 'asc' | 'desc' }): Promise<ApiResponse<CollectionItem[]>> {
    return this.client.get('/api/public/canvas', {
      type: 'category',
      ...params,
    })
  }

  /**
   * Tum urun kategorilerini listele (canvas tipi: productCategory)
   */
  async listProductCategories(params?: { limit?: number; orderBy?: string; sort?: 'asc' | 'desc'; navigation?: number }): Promise<ApiResponse<CollectionItem[]>> {
    return this.client.get('/api/public/canvas', {
      type: 'productCategory',
      ...params,
    })
  }

  /**
   * Canvas iliskilerini getir (public)
   */
  async getCanvasRelations(slug: string): Promise<ApiResponse> {
    return this.client.get(`/api/public/categories/${slug}`)
  }

  /**
   * Urun kategorisi iliskilerini getir (public)
   */
  async getProductCategories(slug: string): Promise<ApiResponse> {
    return this.client.get(`/api/public/product-categories/${slug}`)
  }
}
