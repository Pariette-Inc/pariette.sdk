export interface Product {
  id: number
  title: string
  slug: string
  description?: string
  type?: string
  status: number
  price?: number
  compare_price?: number
  cost_price?: number
  currency?: string
  sku?: string
  barcode?: string
  quantity?: number
  track_inventory?: boolean
  weight?: number
  featured_image?: string
  environment_id: number
  user_id: number
  vendor_id?: number
  brand_id?: number
  created_at: string
  updated_at: string
  variants?: ProductVariant[]
  prices?: ProductPrice[]
  media?: ProductMedia[]
  attributes?: ProductAttribute[]
  localizations?: ProductLocalization[]
}

export interface ProductVariant {
  id: number
  product_id: number
  title: string
  sku?: string
  barcode?: string
  price?: number
  compare_price?: number
  quantity?: number
  weight?: number
  option1?: string
  option2?: string
  option3?: string
  image?: string
  status: number
}

export interface ProductPrice {
  id: number
  product_id: number
  currency: string
  price: number
  compare_price?: number
  cost_price?: number
}

export interface ProductMedia {
  id: number
  product_id: number
  url: string
  type: string
  alt?: string
  order: number
}

export interface ProductAttribute {
  id: number
  product_id: number
  key: string
  value: string
}

export interface ProductLocalization {
  id: number
  product_id: number
  locale: string
  title?: string
  description?: string
  meta_title?: string
  meta_description?: string
}

export interface CreateProductRequest {
  title: string
  type?: string
  status?: number
  description?: string
  price?: number
  compare_price?: number
  cost_price?: number
  currency?: string
  sku?: string
  barcode?: string
  quantity?: number
  track_inventory?: boolean
  weight?: number
  featured_image?: string
  vendor_id?: number
  brand_id?: number
}

export interface UpdateProductRequest extends Partial<CreateProductRequest> {}

export interface ProductSearchParams {
  page?: number
  per_page?: number
  search?: string
  type?: string
  status?: number
  sort?: string
  order?: 'asc' | 'desc'
  brand_id?: number
  vendor_id?: number
  min_price?: number
  max_price?: number
}
