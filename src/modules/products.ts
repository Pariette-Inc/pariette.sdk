import { BaseModule } from './base'
import {
  Product,
  CreateProductRequest,
  UpdateProductRequest,
  ProductSearchParams,
  ProductVariant,
  ProductPrice,
  ProductMedia,
  ProductLocalization,
} from '../types/product'
import { ApiResponse, PaginatedResponse } from '../types/common'

export class ProductModule extends BaseModule {
  /** Urun listesi (admin) */
  async list(params?: ProductSearchParams): Promise<PaginatedResponse<Product>> {
    return this.client.get('/api/products', params)
  }

  /** Public urun listesi */
  async listPublic(params?: ProductSearchParams): Promise<PaginatedResponse<Product>> {
    return this.client.get('/api/public/products', params)
  }

  /** Public urun detayi (slug ile) */
  async get(slug: string): Promise<Product> {
    return this.client.get(`/api/public/product/${slug}`)
  }

  /** Admin urun detayi (slug ile) */
  async getAdmin(slug: string): Promise<Product> {
    return this.client.get(`/api/product/${slug}`)
  }

  /** Yeni urun olustur */
  async create(data: CreateProductRequest): Promise<ApiResponse<Product>> {
    return this.client.post('/api/product', data)
  }

  /** Urun guncelle */
  async update(id: number, data: UpdateProductRequest): Promise<ApiResponse<Product>> {
    return this.client.put(`/api/product/${id}`, data)
  }

  /** Urun sil */
  async delete(id: number): Promise<ApiResponse> {
    return this.client.delete(`/api/product/${id}`)
  }

  /** Toplu urun olustur */
  async bulkCreate(products: CreateProductRequest[]): Promise<ApiResponse> {
    return this.client.post('/api/products/bulk', { products })
  }

  /** Toplu urun guncelle */
  async bulkUpdate(token: string, products: { id: number; [key: string]: any }[]): Promise<ApiResponse> {
    return this.client.post(`/api/shopping/${token}/products/bulk-update`, { products })
  }

  /** Toplu urun sil */
  async bulkDelete(token: string, ids: number[]): Promise<ApiResponse> {
    return this.client.post(`/api/shopping/${token}/products/bulk-delete`, { ids })
  }

  /** Urun ara */
  async search(token: string, query: string): Promise<ApiResponse<Product[]>> {
    return this.client.get(`/api/shopping/${token}/products/search/${query}`)
  }

  // --- Variants ---

  /** Varyant ekle/guncelle */
  async setVariants(productId: number, variants: Partial<ProductVariant>[]): Promise<ApiResponse> {
    return this.client.post(`/api/product/${productId}/variants`, { variants })
  }

  /** Varyantlari listele */
  async getVariants(token: string, productId: number): Promise<ApiResponse<ProductVariant[]>> {
    return this.client.get(`/api/shopping/${token}/products/${productId}/variants`)
  }

  /** Varyant olustur */
  async createVariant(token: string, productId: number, data: Partial<ProductVariant>): Promise<ApiResponse> {
    return this.client.post(`/api/shopping/${token}/products/${productId}/variants`, data)
  }

  // --- Prices ---

  /** Fiyatlari set et */
  async setPrices(productId: number, prices: Partial<ProductPrice>[]): Promise<ApiResponse> {
    return this.client.post(`/api/product/${productId}/prices`, { prices })
  }

  // --- Media ---

  /** Medya set et */
  async setMedia(productId: number, media: Partial<ProductMedia>[]): Promise<ApiResponse> {
    return this.client.post(`/api/product/${productId}/media`, { media })
  }

  // --- Localizations ---

  /** Cevirileri set et */
  async setLocalizations(productId: number, localizations: Partial<ProductLocalization>[]): Promise<ApiResponse> {
    return this.client.post(`/api/product/${productId}/localizations`, { localizations })
  }

  // --- Attributes ---

  /** Urun attribute set et */
  async setAttributes(data: { product_id: number; key: string; value: string }): Promise<ApiResponse> {
    return this.client.post('/api/product-attributes', data)
  }

  // --- Relations ---

  /** Urun iliskisi olustur */
  async createRelation(data: { product_id: number; related_id: number; type?: string }): Promise<ApiResponse> {
    return this.client.post('/api/product-relations', data)
  }

  /** Urun iliskisini sil */
  async deleteRelation(id: number): Promise<ApiResponse> {
    return this.client.delete(`/api/product-relations/${id}`)
  }

  /** Urun iliskileri getir */
  async getRelations(id: number): Promise<ApiResponse> {
    return this.client.get(`/api/product-relations/${id}`)
  }

  // --- Collections ---

  /** Urun koleksiyonu olustur */
  async createCollection(data: { product_id: number; collection_id: number }): Promise<ApiResponse> {
    return this.client.post('/api/product-collections', data)
  }

  /** Urun koleksiyonunu sil */
  async deleteCollection(id: number): Promise<ApiResponse> {
    return this.client.delete(`/api/product-collections/${id}`)
  }

  /** Koleksiyon urunlerini getir */
  async getCollectionProducts(id: number): Promise<ApiResponse> {
    return this.client.get(`/api/public/product-collection/${id}`)
  }

  // --- Gallery ---

  /** Urun galeri resmi ekle */
  async addGallery(data: { product_id: number; image_id: number; order?: number }): Promise<ApiResponse> {
    return this.client.post('/api/product-gallery', data)
  }

  /** Urun galeri resmi sil */
  async deleteGallery(data: { product_id: number; image_id: number }): Promise<ApiResponse> {
    return this.client.post('/api/product-gallery/delete', data)
  }

  // --- Vendors & Brands ---

  /** Urun vendor'lari */
  async getVendors(): Promise<ApiResponse> {
    return this.client.get('/api/product-vendors')
  }

  /** Urun markalari */
  async getBrands(): Promise<ApiResponse> {
    return this.client.get('/api/product-brands')
  }

  // --- Campaigns ---

  /** Kampanya listesi */
  async listCampaigns(): Promise<ApiResponse> {
    return this.client.get('/api/shopping/campaigns')
  }

  /** Kampanya olustur */
  async createCampaign(data: Record<string, any>): Promise<ApiResponse> {
    return this.client.post('/api/shopping/campaigns', data)
  }

  /** Kampanya guncelle */
  async updateCampaign(id: number, data: Record<string, any>): Promise<ApiResponse> {
    return this.client.put(`/api/shopping/campaigns/${id}`, data)
  }

  /** Kampanya sil */
  async deleteCampaign(id: number): Promise<ApiResponse> {
    return this.client.delete(`/api/shopping/campaigns/${id}`)
  }

  // --- Versions ---

  /** Versiyon gecmisi */
  async getVersionHistory(productId: number): Promise<ApiResponse> {
    return this.client.get(`/api/product/${productId}/versions`)
  }

  /** Versiyona geri don */
  async revertVersion(versionId: number): Promise<ApiResponse> {
    return this.client.post(`/api/product/revert/${versionId}`)
  }
}
