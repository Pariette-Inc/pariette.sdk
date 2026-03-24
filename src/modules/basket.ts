import { BaseModule } from './base'
import { ApiResponse, ListParams, PaginatedResponse } from '../types/common'

export interface Basket {
  id: number
  user_id?: number
  guest_id?: string
  environment_id: number
  status: string
  currency?: string
  subtotal: number
  tax: number
  total: number
  items: BasketItem[]
  created_at: string
  updated_at: string
}

export interface BasketItem {
  id: number
  basket_id: number
  product_id: number
  variant_id?: number
  quantity: number
  unit_price: number
  total: number
  title?: string
  image?: string
}

export interface AddBasketItemRequest {
  product_id: number
  variant_id?: number
  quantity: number
}

export interface CheckoutRequest {
  billing_address: Record<string, any>
  shipping_address?: Record<string, any>
  payment_method: string
  payment_data?: Record<string, any>
  notes?: string
}

export class BasketModule extends BaseModule {
  /** Sepet listesi */
  async list(params?: ListParams): Promise<PaginatedResponse<Basket>> {
    return this.client.get('/api/shopping/baskets', params)
  }

  /** Sepet detayi */
  async get(id: number): Promise<Basket> {
    return this.client.get(`/api/shopping/baskets/${id}`)
  }

  /** Sepet olustur */
  async create(data?: Record<string, any>): Promise<ApiResponse<Basket>> {
    return this.client.post('/api/shopping/baskets', data)
  }

  /** Sepet sil */
  async delete(id: number): Promise<ApiResponse> {
    return this.client.delete(`/api/shopping/baskets/${id}`)
  }

  /** Sepete urun ekle */
  async addItem(basketId: number, data: AddBasketItemRequest): Promise<ApiResponse> {
    return this.client.post(`/api/shopping/baskets/${basketId}/items`, data)
  }

  /** Urun ekle veya mevcut sepete ekle */
  async addOrCreateItem(data: AddBasketItemRequest & { shop_env_id?: number; brand_env_id?: number }): Promise<ApiResponse> {
    return this.client.post('/api/shopping/baskets/add-or-create-item', data)
  }

  /** Sepet kalemi guncelle */
  async updateItem(basketId: number, itemId: number, data: { quantity: number }): Promise<ApiResponse> {
    return this.client.put(`/api/shopping/baskets/${basketId}/items/${itemId}`, data)
  }

  /** Sepet kalemini sil */
  async removeItem(basketId: number, itemId: number): Promise<ApiResponse> {
    return this.client.delete(`/api/shopping/baskets/${basketId}/items/${itemId}`)
  }

  /** Sepeti temizle */
  async clear(basketId: number): Promise<ApiResponse> {
    return this.client.delete(`/api/shopping/baskets/${basketId}/clear`)
  }

  /** Sepet ozeti */
  async summary(basketId: number): Promise<ApiResponse> {
    return this.client.get(`/api/shopping/baskets/${basketId}/summary`)
  }

  /** Odeme yap */
  async checkout(basketId: number, data: CheckoutRequest): Promise<ApiResponse> {
    return this.client.post(`/api/shopping/baskets/${basketId}/checkout`, data)
  }

  /** Magazaya gore sepetler */
  async byShop(shopId: number): Promise<ApiResponse> {
    return this.client.get(`/api/shopping/baskets/by-shop/${shopId}`)
  }

  /** Markaya gore sepetler */
  async byBrand(brandId: number): Promise<ApiResponse> {
    return this.client.get(`/api/shopping/baskets/by-brand/${brandId}`)
  }
}
