export interface Canvas {
  id: number
  title: string
  slug: string
  description?: string
  type?: string
  status: number
  environment_id: number
  user_id: number
  featured_image?: string
  template?: string
  created_at: string
  updated_at: string
  contents?: CanvasContent[]
  attributes?: CanvasAttribute[]
  galleries?: CanvasGallery[]
}

export interface CanvasContent {
  id: number
  canvas_id: number
  locale: string
  title?: string
  body?: string
  excerpt?: string
  meta_title?: string
  meta_description?: string
  created_at: string
  updated_at: string
}

export interface CanvasAttribute {
  id: number
  canvas_id: number
  key: string
  value: string
}

export interface CanvasGallery {
  id: number
  canvas_id: number
  image_id: number
  order: number
  image?: {
    id: number
    url: string
    alt?: string
  }
}

export interface CreateCanvasRequest {
  title: string
  type?: string
  status?: number
  description?: string
  featured_image?: string
  template?: string
  contents?: Omit<CanvasContent, 'id' | 'canvas_id' | 'created_at' | 'updated_at'>[]
}

export interface UpdateCanvasRequest {
  title?: string
  type?: string
  status?: number
  description?: string
  featured_image?: string
  template?: string
  contents?: Omit<CanvasContent, 'id' | 'canvas_id' | 'created_at' | 'updated_at'>[]
}

export interface CanvasRelationRequest {
  canvas_id: number
  related_id: number
  type?: string
}

export interface CanvasGalleryRequest {
  canvas_id: number
  image_id: number
  order?: number
}
