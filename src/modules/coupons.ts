import { BaseModule } from './base'
import { ApiResponse, PaginatedResponse } from '../types/common'

export type CouponType = 'percentage' | 'fixed' | 'free_shipping'

export interface Coupon {
  id: number
  environment_id: number
  code: string
  title: string | null
  type: CouponType
  value: number
  min_order_amount: number | null
  max_discount_amount: number | null
  usage_limit: number | null
  usage_limit_per_user: number | null
  used_count: number
  starts_at: string | null
  expires_at: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface CouponCreateRequest {
  code: string
  title?: string
  type: CouponType
  value?: number
  min_order_amount?: number
  max_discount_amount?: number
  usage_limit?: number
  usage_limit_per_user?: number
  starts_at?: string
  expires_at?: string
  is_active?: boolean
}

export type CouponUpdateRequest = Partial<CouponCreateRequest>

/**
 * CouponModule — Kupon yönetimi (panel & müşteri tarafı)
 *
 * Panel endpoint'leri (requires seller auth):
 *   GET    /api/console/coupons
 *   POST   /api/console/coupons
 *   PUT    /api/console/coupons/:id
 *   DELETE /api/console/coupons/:id
 */
export class CouponModule extends BaseModule {
  /** Kupon listesi (panel) */
  async list(): Promise<ApiResponse<Coupon[]>> {
    return this.client.get('/api/console/coupons')
  }

  /** Kupon oluştur (panel) */
  async create(data: CouponCreateRequest): Promise<ApiResponse<Coupon>> {
    return this.client.post('/api/console/coupons', data)
  }

  /** Kupon güncelle (panel) */
  async update(id: number, data: CouponUpdateRequest): Promise<ApiResponse<Coupon>> {
    return this.client.put(`/api/console/coupons/${id}`, data)
  }

  /** Kupon sil (panel — sadece kullanılmamış kuponlar silinebilir) */
  async delete(id: number): Promise<ApiResponse<void>> {
    return this.client.delete(`/api/console/coupons/${id}`)
  }
}
