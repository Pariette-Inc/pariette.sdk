import { BaseModule } from './base'
import {
  Order,
  OrderItem,
  OrderTimeline,
  UpdateOrderStatusRequest,
  CreateShipmentRequest,
  RefundRequest,
  OrderExportParams,
} from '../types/order'
import { ApiResponse, ListParams, PaginatedResponse } from '../types/common'

export class OrderModule extends BaseModule {
  /** Siparis listesi */
  async list(params?: ListParams): Promise<PaginatedResponse<Order>> {
    return this.client.get('/api/orders', params)
  }

  /** Siparis detayi */
  async get(id: number): Promise<Order> {
    return this.client.get(`/api/orders/${id}`)
  }

  /** Siparis istatistikleri */
  async getStats(): Promise<ApiResponse> {
    return this.client.get('/api/orders/stats')
  }

  /** Siparis durumunu guncelle */
  async updateStatus(id: number, data: UpdateOrderStatusRequest): Promise<ApiResponse> {
    return this.client.patch(`/api/orders/${id}/status`, data)
  }

  /** Siparis guncelle */
  async update(id: number, data: Partial<Order>): Promise<ApiResponse> {
    return this.client.put(`/api/orders/${id}`, data)
  }

  /** Siparis sil */
  async delete(id: number): Promise<ApiResponse> {
    return this.client.delete(`/api/orders/${id}`)
  }

  // --- Items ---

  /** Siparis kalemi ekle */
  async addItem(orderId: number, data: Partial<OrderItem>): Promise<ApiResponse> {
    return this.client.post(`/api/orders/${orderId}/items`, data)
  }

  /** Siparis kalemi guncelle */
  async updateItem(orderId: number, itemId: number, data: Partial<OrderItem>): Promise<ApiResponse> {
    return this.client.put(`/api/orders/${orderId}/items/${itemId}`, data)
  }

  /** Siparis kalemi sil */
  async removeItem(orderId: number, itemId: number): Promise<ApiResponse> {
    return this.client.delete(`/api/orders/${orderId}/items/${itemId}`)
  }

  /** Siparis kalemi stok durumunu guncelle */
  async updateItemStockStatus(orderId: number, itemId: number, data: { status: string }): Promise<ApiResponse> {
    return this.client.patch(`/api/orders/${orderId}/items/${itemId}/stock-status`, data)
  }

  // --- Shipping ---

  /** Kargo bilgisi guncelle */
  async updateShipping(orderId: number, data: Record<string, any>): Promise<ApiResponse> {
    return this.client.post(`/api/orders/${orderId}/shipping`, data)
  }

  /** Gonderim olustur */
  async createShipment(orderId: number, data: CreateShipmentRequest): Promise<ApiResponse> {
    return this.client.post(`/api/orders/${orderId}/shipments`, data)
  }

  /** Depo ata */
  async assignWarehouse(orderId: number, data: { warehouse_id: number }): Promise<ApiResponse> {
    return this.client.post(`/api/orders/${orderId}/assign-warehouse`, data)
  }

  /** Kargo firmalari */
  async getCarriers(): Promise<ApiResponse> {
    return this.client.get('/api/orders/carriers')
  }

  // --- Refund ---

  /** Iade islemi */
  async refund(orderId: number, data: RefundRequest): Promise<ApiResponse> {
    return this.client.post(`/api/orders/${orderId}/refund`, data)
  }

  // --- Timeline ---

  /** Siparis zaman cizelgesi */
  async timeline(orderId: number): Promise<ApiResponse<OrderTimeline[]>> {
    return this.client.get(`/api/orders/${orderId}/timeline`)
  }

  /** Siparis mesaji gonder */
  async sendMessage(orderId: number, data: { message: string }): Promise<ApiResponse> {
    return this.client.post(`/api/orders/${orderId}/message`, data)
  }

  // --- Documents ---

  /** Fatura yukle */
  async uploadInvoice(orderId: number, file: any): Promise<ApiResponse> {
    return this.client.upload(`/api/orders/${orderId}/invoice`, file)
  }

  /** Fatura indir */
  async getInvoice(orderId: number): Promise<ApiResponse> {
    return this.client.get(`/api/orders/${orderId}/invoice`)
  }

  /** Makbuz indir */
  async getReceipt(orderId: number): Promise<ApiResponse> {
    return this.client.get(`/api/orders/${orderId}/receipt`)
  }

  // --- Filtering ---

  /** Magazaya gore siparisler */
  async byShop(shopId: number, params?: ListParams): Promise<PaginatedResponse<Order>> {
    return this.client.get(`/api/orders/by-shop/${shopId}`, params)
  }

  /** Markaya gore siparisler */
  async byBrand(brandId: number, params?: ListParams): Promise<PaginatedResponse<Order>> {
    return this.client.get(`/api/orders/by-brand/${brandId}`, params)
  }

  /** Depoya gore siparisler */
  async byWarehouse(warehouseId: number, params?: ListParams): Promise<PaginatedResponse<Order>> {
    return this.client.get(`/api/orders/by-warehouse/${warehouseId}`, params)
  }

  // --- Export & Reports ---

  /** Siparis disa aktar */
  async export(params?: OrderExportParams): Promise<ApiResponse> {
    return this.client.get('/api/orders/export', params)
  }

  /** Satis raporu */
  async salesReport(params?: Record<string, any>): Promise<ApiResponse> {
    return this.client.get('/api/shopping/reports/sales', params)
  }
}
