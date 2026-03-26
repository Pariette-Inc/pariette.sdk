import { BaseModule } from './base'
import { ApiResponse, PaginatedResponse } from '../types/common'
import { CheckoutOptions, CheckoutRequest, Order, OrderAddress } from '../types/order'

export interface Basket {
  id: number
  environment_id: number
  user_id?: number
  session_id?: string
  status: 'active' | 'completed' | 'abandoned'
  currency: string
  subtotal: number
  discount_amount: number
  tax_amount: number
  shipping_amount: number
  total_amount: number
  total_items: number
  coupon_code?: string
  items: BasketItem[]
  breakdown?: {
    subtotal: number
    discount_amount: number
    tax_amount: number
    shipping_amount: number
    total_amount: number
    currency: string
  }
  last_activity?: string
  created_at: string
  updated_at: string
}

export interface BasketItem {
  id: number
  basket_id: number
  product_id: number
  quantity: number
  unit_price: number
  total_price: number
  plan?: string
  target_env?: string
  product_snapshot?: Record<string, any>
  status: string
}

export interface AddToCartRequest {
  product_id: number
  quantity: number
  plan?: string
  target_env?: string
}

export class CartModule extends BaseModule {
  /** Aktif sepeti getir */
  async get(): Promise<ApiResponse<Basket>> {
    return this.client.get('/api/shopping/cart')
  }

  /** Sepete ürün ekle */
  async add(data: AddToCartRequest): Promise<ApiResponse<Basket>> {
    return this.client.post('/api/shopping/cart', data)
  }

  /** Ürün miktarını güncelle */
  async updateItem(itemId: number, quantity: number): Promise<ApiResponse<Basket>> {
    return this.client.put(`/api/shopping/cart/${itemId}`, { quantity })
  }

  /** Ürünü sepetten çıkar */
  async removeItem(itemId: number): Promise<ApiResponse<Basket>> {
    return this.client.delete(`/api/shopping/cart/${itemId}`)
  }

  /** Sepeti tamamen temizle */
  async clear(): Promise<ApiResponse> {
    return this.client.delete('/api/shopping/cart/clear')
  }

  /** Checkout seçenekleri (ödeme yöntemleri + kargo firmaları) */
  async checkoutOptions(): Promise<ApiResponse<CheckoutOptions>> {
    return this.client.get('/api/shopping/checkout/options')
  }

  /** Siparişi tamamla */
  async checkout(data: CheckoutRequest): Promise<ApiResponse<Order>> {
    return this.client.post('/api/shopping/checkout', data)
  }

  /**
   * Sepete kupon uygula ve indirim önizlemesini döndür.
   * @param code   Kupon kodu (büyük/küçük harf duyarsız)
   * @param basketId  Hedef sepet ID
   */
  async applyCoupon(code: string, basketId: number): Promise<ApiResponse<CouponValidationResult>> {
    return this.client.post('/api/shopping/checkout/coupon', { code, basket_id: basketId })
  }
}

/** applyCoupon() dönüş verisi */
export interface CouponValidationResult {
  coupon: {
    id: number
    code: string
    title: string | null
    type: 'percentage' | 'fixed' | 'free_shipping'
    value: number
  }
  discount_amount: number
  free_shipping: boolean
  new_total: number
}
