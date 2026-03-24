import { BaseModule } from './base'
import {
  Subscription,
  BillingProfile,
  CreateBillingProfileRequest,
  UpdateBillingProfileRequest,
  SubscribeRequest,
  CalculatePricingRequest,
  PricingResponse,
} from '../types/subscription'
import { ApiResponse } from '../types/common'

export class SubscriptionModule extends BaseModule {
  /** Abonelik listesi */
  async list(): Promise<ApiResponse<Subscription[]>> {
    return this.client.get('/api/user/subscriptions')
  }

  /** Abone ol */
  async subscribe(data: SubscribeRequest): Promise<ApiResponse> {
    return this.client.post('/api/user/subscribe', data)
  }

  /** Fiyat hesapla (KDV + taksit) */
  async calculatePricing(data: CalculatePricingRequest): Promise<PricingResponse> {
    return this.client.post('/api/user/calculate-pricing', data)
  }

  // --- Billing Profiles ---

  readonly billingProfiles = {
    /** Fatura profilleri listesi */
    list: (): Promise<ApiResponse<BillingProfile[]>> => {
      return this.client.get('/api/user/billing-profiles')
    },

    /** Fatura profili olustur */
    create: (data: CreateBillingProfileRequest): Promise<ApiResponse<BillingProfile>> => {
      return this.client.post('/api/user/billing-profiles', data)
    },

    /** Fatura profili guncelle */
    update: (id: number, data: UpdateBillingProfileRequest): Promise<ApiResponse<BillingProfile>> => {
      return this.client.put(`/api/user/billing-profiles/${id}`, data)
    },
  }
}
