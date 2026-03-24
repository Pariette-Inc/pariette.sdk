import { BaseModule } from './base'
import { ApiResponse } from '../types/common'

export interface Attribute {
  id: number
  name: string
  type: string
  environment_id: number
  created_at: string
  updated_at: string
  items?: AttributeItem[]
}

export interface AttributeItem {
  id: number
  attribute_id: number
  value: string
  label?: string
  order?: number
}

export interface Lookup {
  id: number
  name: string
  environment_id: number
  created_at: string
  updated_at: string
  items?: LookupItem[]
}

export interface LookupItem {
  id: number
  lookup_id: number
  value: string
  label?: string
  order?: number
}

export class AttributeModule extends BaseModule {
  // --- Attributes ---

  /** Attribute listesi */
  async list(): Promise<ApiResponse<Attribute[]>> {
    return this.client.get('/api/attributes')
  }

  /** Attribute detayi */
  async get(id: number): Promise<Attribute> {
    return this.client.get(`/api/attribute/${id}`)
  }

  /** Attribute olustur */
  async create(data: { name: string; type: string }): Promise<ApiResponse<Attribute>> {
    return this.client.post('/api/attribute', data)
  }

  /** Attribute guncelle */
  async update(id: number, data: Partial<Attribute>): Promise<ApiResponse> {
    return this.client.put(`/api/attribute/${id}`, data)
  }

  /** Attribute sil */
  async delete(id: number): Promise<ApiResponse> {
    return this.client.delete(`/api/attribute/${id}`)
  }

  /** Tipe gore attribute getir */
  async getByType(type: string): Promise<ApiResponse<Attribute[]>> {
    return this.client.get(`/api/attribute-by-type/${type}`)
  }

  // --- Attribute Items ---

  readonly items = {
    /** Item listesi */
    list: (attributeId: number): Promise<ApiResponse<AttributeItem[]>> => {
      return this.client.get(`/api/attribute/${attributeId}/items`)
    },

    /** Item olustur */
    create: (data: { attribute_id: number; value: string; label?: string }): Promise<ApiResponse<AttributeItem>> => {
      return this.client.post('/api/attribute-item', data)
    },

    /** Item guncelle */
    update: (id: number, data: Partial<AttributeItem>): Promise<ApiResponse> => {
      return this.client.put(`/api/attribute-item/${id}`, data)
    },

    /** Item sil */
    delete: (id: number): Promise<ApiResponse> => {
      return this.client.delete(`/api/attribute-item/${id}`)
    },

    /** Toplu item olustur */
    bulkCreate: (items: { attribute_id: number; value: string; label?: string }[]): Promise<ApiResponse> => {
      return this.client.post('/api/attribute-items/bulk', { items })
    },

    /** Toplu item guncelle */
    bulkUpdate: (items: { id: number; value?: string; label?: string }[]): Promise<ApiResponse> => {
      return this.client.put('/api/attribute-items/bulk', { items })
    },

    /** Toplu item sil */
    bulkDelete: (ids: number[]): Promise<ApiResponse> => {
      return this.client.delete('/api/attribute-items/bulk', { ids })
    },
  }

  // --- Lookups ---

  readonly lookups = {
    /** Lookup listesi */
    list: (): Promise<ApiResponse<Lookup[]>> => {
      return this.client.get('/api/lookups')
    },

    /** Lookup detayi */
    get: (id: number): Promise<Lookup> => {
      return this.client.get(`/api/lookup/${id}`)
    },

    /** Lookup olustur */
    create: (data: { name: string }): Promise<ApiResponse<Lookup>> => {
      return this.client.post('/api/lookup', data)
    },

    /** Lookup guncelle */
    update: (id: number, data: Partial<Lookup>): Promise<ApiResponse> => {
      return this.client.put(`/api/lookup/${id}`, data)
    },

    /** Lookup sil */
    delete: (id: number): Promise<ApiResponse> => {
      return this.client.delete(`/api/lookup/${id}`)
    },

    /** Lookup item listesi */
    items: (lookupId: number): Promise<ApiResponse<LookupItem[]>> => {
      return this.client.get(`/api/lookup/${lookupId}/items`)
    },

    /** Lookup item olustur */
    createItem: (data: { lookup_id: number; value: string; label?: string }): Promise<ApiResponse<LookupItem>> => {
      return this.client.post('/api/lookup-item', data)
    },

    /** Lookup item guncelle */
    updateItem: (id: number, data: Partial<LookupItem>): Promise<ApiResponse> => {
      return this.client.put(`/api/lookup-item/${id}`, data)
    },

    /** Lookup item sil */
    deleteItem: (id: number): Promise<ApiResponse> => {
      return this.client.delete(`/api/lookup-item/${id}`)
    },

    /** Toplu lookup item olustur */
    bulkCreateItems: (items: { lookup_id: number; value: string; label?: string }[]): Promise<ApiResponse> => {
      return this.client.post('/api/lookup-item/bulk', { items })
    },
  }
}
