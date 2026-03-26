import { BaseModule } from './base'
import {
  Order,
  OrderStats,
  OrderTimeline,
  UpdateOrderStatusRequest,
  UpdateShippingRequest,
  RefundRequest,
  Carrier,
  PaymentGateway,
} from '../types/order'
import { ApiResponse, ListParams, PaginatedResponse } from '../types/common'

/**
 * SellerOrderModule — Satıcı (environment) sipariş yönetimi
 *
 * Tüm metodlar ConsoleToken / EnvToken gerektirir.
 */
export class SellerOrderModule extends BaseModule {
  /** Sipariş listesi */
  async list(params?: ListParams & { status?: string; search?: string; date_from?: string; date_to?: string }): Promise<PaginatedResponse<Order>> {
    return this.client.get('/api/console/orders', params)
  }

  /** Sipariş istatistikleri */
  async stats(): Promise<ApiResponse<OrderStats>> {
    return this.client.get('/api/console/orders/stats')
  }

  /** Sipariş detayı */
  async get(id: number): Promise<ApiResponse<Order>> {
    return this.client.get(`/api/console/orders/${id}`)
  }

  /** Durum güncelle */
  async updateStatus(id: number, data: UpdateOrderStatusRequest): Promise<ApiResponse<Order>> {
    return this.client.put(`/api/console/orders/${id}/status`, data)
  }

  /** Kargo bilgisi gir (shipped durumuna geçer) */
  async updateShipping(id: number, data: UpdateShippingRequest): Promise<ApiResponse<Order>> {
    return this.client.put(`/api/console/orders/${id}/shipping`, data)
  }

  /** Müşteriye mesaj gönder */
  async sendMessage(id: number, message: string): Promise<ApiResponse> {
    return this.client.post(`/api/console/orders/${id}/message`, { message })
  }

  /** İade başlat */
  async refund(id: number, data: RefundRequest): Promise<ApiResponse> {
    return this.client.post(`/api/console/orders/${id}/refund`, data)
  }
}

/**
 * CustomerOrderModule — Müşteri sipariş geçmişi
 */
export class CustomerOrderModule extends BaseModule {
  /** Kendi siparişleri */
  async list(params?: ListParams & { status?: string }): Promise<PaginatedResponse<Order>> {
    return this.client.get('/api/my-orders', params)
  }

  /** Sipariş detayı */
  async get(id: number): Promise<ApiResponse<Order>> {
    return this.client.get(`/api/my-orders/${id}`)
  }

  /** Sipariş iptal talebi */
  async cancel(id: number, reason?: string): Promise<ApiResponse<Order>> {
    return this.client.post(`/api/my-orders/${id}/cancel`, { reason })
  }

  /** Satıcıya mesaj gönder */
  async sendMessage(id: number, message: string): Promise<ApiResponse> {
    return this.client.post(`/api/my-orders/${id}/message`, { message })
  }
}

/**
 * CarrierModule — Kargo firması yönetimi (satıcı)
 */
export class CarrierModule extends BaseModule {
  /** Kargo firmaları listesi (console) */
  async list(): Promise<ApiResponse<Carrier[]>> {
    return this.client.get('/api/console/carriers')
  }

  /** Public kargo listesi (checkout için) */
  async publicList(): Promise<ApiResponse<Pick<Carrier, 'id' | 'name' | 'pricing_type' | 'base_price' | 'free_shipping_threshold'>[]>> {
    return this.client.get('/api/shopping/carriers')
  }

  /** Kargo firması ekle */
  async create(data: Partial<Carrier>): Promise<ApiResponse<Carrier>> {
    return this.client.post('/api/console/carriers', data)
  }

  /** Güncelle */
  async update(id: number, data: Partial<Carrier>): Promise<ApiResponse<Carrier>> {
    return this.client.put(`/api/console/carriers/${id}`, data)
  }

  /** Sil */
  async delete(id: number): Promise<ApiResponse> {
    return this.client.delete(`/api/console/carriers/${id}`)
  }
}

/**
 * PaymentGatewayModule — Ödeme yöntemi yönetimi (satıcı)
 */
export class PaymentGatewayModule extends BaseModule {
  /** Desteklenen provider listesi */
  async providers(): Promise<ApiResponse<{ provider: string; label: string }[]>> {
    return this.client.get('/api/console/payment-gateways/providers')
  }

  /** Aktif ödeme yöntemleri */
  async list(): Promise<ApiResponse<PaymentGateway[]>> {
    return this.client.get('/api/console/payment-gateways')
  }

  /** Yeni ödeme yöntemi ekle / etkinleştir */
  async create(data: Partial<PaymentGateway>): Promise<ApiResponse<PaymentGateway>> {
    return this.client.post('/api/console/payment-gateways', data)
  }

  /** Güncelle */
  async update(id: number, data: Partial<PaymentGateway>): Promise<ApiResponse<PaymentGateway>> {
    return this.client.put(`/api/console/payment-gateways/${id}`, data)
  }

  /** Sil */
  async delete(id: number): Promise<ApiResponse> {
    return this.client.delete(`/api/console/payment-gateways/${id}`)
  }
}

/**
 * @deprecated Kullanılmıyor. Yeni sistemde SellerOrderModule kullan.
 */
export class OrderModule extends SellerOrderModule {}
