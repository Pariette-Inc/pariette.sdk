import { BaseModule } from './base'
import { ApiResponse } from '../types/common'

export interface UserAddress {
  id: number
  user_id: number
  title: string
  name: string
  phone?: string
  address_line_1: string
  address_line_2?: string
  city: string
  state?: string
  postal_code: string
  country: string
  is_default: boolean
  created_at: string
  updated_at: string
}

export interface CreateAddressRequest {
  title: string
  name: string
  phone?: string
  address_line_1: string
  address_line_2?: string
  city: string
  state?: string
  postal_code: string
  country: string
  is_default?: boolean
}

export interface UpdateAddressRequest extends Partial<CreateAddressRequest> {}

export class UserModule extends BaseModule {
  // --- Addresses ---

  readonly addresses = {
    /** Adres listesi */
    list: (): Promise<ApiResponse<UserAddress[]>> => {
      return this.client.get('/api/user/addresses')
    },

    /** Adres olustur */
    create: (data: CreateAddressRequest): Promise<ApiResponse<UserAddress>> => {
      return this.client.post('/api/user/addresses', data)
    },

    /** Adres guncelle */
    update: (id: number, data: UpdateAddressRequest): Promise<ApiResponse> => {
      return this.client.put(`/api/user/addresses/${id}`, data)
    },

    /** Adres sil */
    delete: (id: number): Promise<ApiResponse> => {
      return this.client.delete(`/api/user/addresses/${id}`)
    },
  }

  /** Kullanicinin ortamlari */
  async myEnvironments(): Promise<ApiResponse> {
    return this.client.get('/api/my-environments')
  }
}
