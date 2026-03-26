import { BaseModule } from './base'
import { ApiResponse } from '../types/common'

/**
 * StockModule — Basit stok yönetimi
 *
 * Eski warehouse/depo tabanlı sistem kaldırıldı.
 * Yeni sistem: products tablosundaki `stock` kolonu.
 * Bu modül temel stok sorgulama ve güncelleme için kullanılır.
 */
export class StockModule extends BaseModule {
  /**
   * Ürünün mevcut stok adedini sorgula.
   */
  async getProductStock(productId: number): Promise<ApiResponse<{ product_id: number; stock: number | null }>> {
    return this.client.get(`/api/product/${productId}/stock`)
  }

  /**
   * Stok adedini manuel güncelle (satıcı paneli).
   */
  async updateProductStock(productId: number, stock: number): Promise<ApiResponse> {
    return this.client.put(`/api/product/${productId}`, { stock })
  }
}

/**
 * @deprecated InventoryModule kaldırıldı. StockModule kullan.
 */
export class InventoryModule extends StockModule {}
