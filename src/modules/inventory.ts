import { BaseModule } from './base'
import {
  WarehouseInventory,
  StockAdjustment,
  BulkStockAdjustment,
  StockMovement,
  StockTransfer,
  CreateStockTransferRequest,
  StockSummary,
  LowStockItem,
} from '../types/inventory'
import { ApiResponse, ListParams, PaginatedResponse } from '../types/common'

export class InventoryModule extends BaseModule {
  /** Stok listesi */
  async list(token: string, params?: ListParams): Promise<PaginatedResponse<WarehouseInventory>> {
    return this.client.get(`/api/shopping/${token}/inventory`, params)
  }

  /** Tek stok detayi */
  async get(token: string, warehouseId: number, productId: number): Promise<WarehouseInventory> {
    return this.client.get(`/api/shopping/${token}/inventory/${warehouseId}/${productId}`)
  }

  /** Stok ayarla */
  async adjust(token: string, warehouseId: number, productId: number, data: StockAdjustment): Promise<ApiResponse> {
    return this.client.post(`/api/shopping/${token}/inventory/${warehouseId}/${productId}/adjust`, data)
  }

  /** Toplu stok ayarla */
  async bulkAdjust(token: string, data: BulkStockAdjustment): Promise<ApiResponse> {
    return this.client.post(`/api/shopping/${token}/inventory/bulk-adjust`, data)
  }

  /** Dusuk stok uyarilari */
  async lowStock(token: string): Promise<ApiResponse<LowStockItem[]>> {
    return this.client.get(`/api/shopping/${token}/inventory/low-stock`)
  }

  /** Stok ozeti */
  async summary(token: string, warehouseId: number): Promise<StockSummary> {
    return this.client.get(`/api/shopping/${token}/inventory/summary/${warehouseId}`)
  }

  /** Stok hareketleri */
  async movements(token: string, productId: number): Promise<ApiResponse<StockMovement[]>> {
    return this.client.get(`/api/shopping/${token}/inventory/movements/${productId}`)
  }

  // --- Stock Transfers ---

  readonly transfers = {
    /** Transfer listesi */
    list: (token: string, params?: ListParams): Promise<PaginatedResponse<StockTransfer>> => {
      return this.client.get(`/api/shopping/${token}/stock-transfers`, params)
    },

    /** Transfer olustur */
    create: (token: string, data: CreateStockTransferRequest): Promise<ApiResponse> => {
      return this.client.post(`/api/shopping/${token}/stock-transfers`, data)
    },

    /** Toplu transfer */
    bulkCreate: (token: string, data: CreateStockTransferRequest[]): Promise<ApiResponse> => {
      return this.client.post(`/api/shopping/${token}/stock-transfers/bulk-create`, { transfers: data })
    },

    /** Transfer durumunu guncelle */
    updateStatus: (token: string, id: number, data: { status: string }): Promise<ApiResponse> => {
      return this.client.patch(`/api/shopping/${token}/stock-transfers/${id}/status`, data)
    },

    /** Transfer onayla */
    approve: (token: string, id: number): Promise<ApiResponse> => {
      return this.client.post(`/api/shopping/${token}/stock-transfers/${id}/approve`)
    },

    /** Transfer reddet */
    reject: (token: string, id: number): Promise<ApiResponse> => {
      return this.client.post(`/api/shopping/${token}/stock-transfers/${id}/reject`)
    },

    /** Transfer tamamla */
    complete: (token: string, id: number): Promise<ApiResponse> => {
      return this.client.post(`/api/shopping/${token}/stock-transfers/${id}/complete`)
    },
  }

  // --- Reports ---

  readonly reports = {
    /** Stok raporu */
    inventory: (): Promise<ApiResponse> => {
      return this.client.get('/api/shopping/reports/inventory')
    },

    /** Dusuk stok alarmlari raporu */
    lowStockAlerts: (): Promise<ApiResponse> => {
      return this.client.get('/api/shopping/reports/low-stock-alerts')
    },

    /** Transfer raporu */
    transfers: (): Promise<ApiResponse> => {
      return this.client.get('/api/shopping/reports/transfers')
    },
  }
}
