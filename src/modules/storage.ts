import { BaseModule } from './base'
import { ApiResponse, ListParams, PaginatedResponse } from '../types/common'

export interface StorageImage {
  id: number
  url: string
  file_name?: string
  optimized_path?: string
  path?: string
  alt?: string
  width?: number
  height?: number
  size?: number
  mime_type?: string
  created_at: string
}

export interface StorageFile {
  id: number
  url: string
  name: string
  size: number
  mime_type: string
  created_at: string
}

export interface Gallery {
  id: number
  title: string
  slug?: string
  environment_id: number
  images?: GalleryImage[]
  created_at: string
  updated_at: string
}

export interface GalleryImage {
  id: number
  gallery_id: number
  image_id: number
  order: number
  image?: StorageImage
}

export interface UploadImagesOptions {
  /** WebP formatina donustur */
  convert?: 'webp'
  /** Resim kalitesi (0-100, varsayilan: 100) */
  quality?: number
  /** TinyPNG ile ek optimizasyon */
  compress?: 'tinypng'
  /** Otomatik canvas'a bagla */
  canvas_id?: number
  /** Otomatik urune bagla */
  product_id?: number
}

export class StorageModule extends BaseModule {
  /** Tek resim yukle */
  async uploadImage(file: any, onProgress?: (p: number) => void): Promise<ApiResponse<StorageImage>> {
    return this.client.upload('/api/storage-image', file, 'file', undefined, onProgress)
  }

  /**
   * Toplu resim yukle (max 10 dosya, her biri max 5MB)
   *
   * Ornek:
   *   const result = await pariette.storage.uploadImages(files, {
   *     convert: 'webp',
   *     canvas_id: 123
   *   })
   */
  async uploadImages(
    files: any[],
    options?: UploadImagesOptions,
    onProgress?: (p: number) => void
  ): Promise<ApiResponse<StorageImage[]>> {
    const extraFields: Record<string, any> = {}
    if (options?.convert) extraFields.convert = options.convert
    if (options?.quality !== undefined) extraFields.quality = options.quality
    if (options?.compress) extraFields.compress = options.compress
    if (options?.canvas_id) extraFields.canvas_id = options.canvas_id
    if (options?.product_id) extraFields.product_id = options.product_id

    return this.client.uploadMultiple(
      '/api/storage-images',
      files,
      'files[]',
      Object.keys(extraFields).length > 0 ? extraFields : undefined,
      onProgress
    )
  }

  /** Dosya yukle */
  async uploadFile(file: any, onProgress?: (p: number) => void): Promise<ApiResponse<StorageFile>> {
    return this.client.upload('/api/storage-file', file, 'file', undefined, onProgress)
  }

  /** Dosya listesi */
  async listFiles(params?: ListParams): Promise<PaginatedResponse<StorageFile>> {
    return this.client.get('/api/files', params)
  }

  /** Dosya sil */
  async deleteFile(id: number): Promise<ApiResponse> {
    return this.client.delete(`/api/file/${id}`)
  }

  /** Ortam resimleri */
  async myImages(params?: ListParams): Promise<PaginatedResponse<StorageImage>> {
    return this.client.get('/api/my-images', params)
  }

  /** Resim sil (force) */
  async forceDeleteImage(id: number): Promise<ApiResponse> {
    return this.client.delete(`/api/my-images/${id}/force`)
  }

  // --- Galleries ---

  readonly galleries = {
    /** Galeri listesi */
    list: (params?: ListParams): Promise<PaginatedResponse<Gallery>> => {
      return this.client.get('/api/galleries', params)
    },

    /** Galeri detayi */
    get: (id: number): Promise<Gallery> => {
      return this.client.get(`/api/gallery/${id}`)
    },

    /** Public galeri (slug ile) */
    getPublic: (slug: string): Promise<Gallery> => {
      return this.client.get(`/api/public/gallery/${slug}`)
    },

    /** Galeri olustur */
    create: (data: { title: string; slug?: string }): Promise<ApiResponse<Gallery>> => {
      return this.client.post('/api/gallery', data)
    },

    /** Galeri guncelle */
    update: (id: number, data: Partial<Gallery>): Promise<ApiResponse> => {
      return this.client.put(`/api/gallery/${id}`, data)
    },

    /** Galeri sil */
    delete: (id: number): Promise<ApiResponse> => {
      return this.client.delete(`/api/gallery/${id}`)
    },

    /** Galeriye resim ekle */
    addImage: (data: { gallery_id: number; image_id: number; order?: number }): Promise<ApiResponse> => {
      return this.client.post('/api/gallery-images', data)
    },

    /** Galeri resmini guncelle */
    updateImage: (id: number, data: { order?: number }): Promise<ApiResponse> => {
      return this.client.put(`/api/gallery-image/${id}`, data)
    },

    /** Galeri resmini sil */
    deleteImage: (id: number): Promise<ApiResponse> => {
      return this.client.delete(`/api/gallery-image/${id}`)
    },

    /** Ortam galerileri */
    myGalleries: (): Promise<ApiResponse<Gallery[]>> => {
      return this.client.get('/api/my-galleries')
    },
  }

  // --- Attachments ---

  readonly attachments = {
    /** Ek listesi */
    list: (params?: ListParams): Promise<ApiResponse> => {
      return this.client.get('/api/attachments', params)
    },

    /** Ek olustur */
    create: (file: any, extraFields?: Record<string, any>, onProgress?: (p: number) => void): Promise<ApiResponse> => {
      return this.client.upload('/api/attachments', file, 'file', extraFields, onProgress)
    },

    /** Ek guncelle */
    update: (id: number, data: Record<string, any>): Promise<ApiResponse> => {
      return this.client.put(`/api/attachments/${id}`, data)
    },

    /** Ek sil */
    delete: (id: number): Promise<ApiResponse> => {
      return this.client.delete(`/api/attachments/${id}`)
    },
  }
}
