export interface Order {
  id: number
  order_number: string
  status: string
  user_id: number
  environment_id: number
  subtotal: number
  tax: number
  shipping_cost: number
  discount: number
  total: number
  currency: string
  payment_status?: string
  payment_method?: string
  shipping_method?: string
  tracking_number?: string
  notes?: string
  billing_address?: OrderAddress
  shipping_address?: OrderAddress
  created_at: string
  updated_at: string
  items?: OrderItem[]
  timeline?: OrderTimeline[]
}

export interface OrderItem {
  id: number
  order_id: number
  product_id: number
  variant_id?: number
  title: string
  sku?: string
  quantity: number
  unit_price: number
  total: number
  image?: string
  options?: Record<string, string>
}

export interface OrderAddress {
  name: string
  phone?: string
  address_line_1: string
  address_line_2?: string
  city: string
  state?: string
  postal_code: string
  country: string
}

export interface OrderTimeline {
  id: number
  order_id: number
  type: string
  title: string
  description?: string
  user_id?: number
  created_at: string
}

export interface OrderShipment {
  id: number
  order_id: number
  carrier: string
  tracking_number: string
  status: string
  shipped_at?: string
  delivered_at?: string
}

export interface UpdateOrderStatusRequest {
  status: string
  note?: string
}

export interface CreateShipmentRequest {
  carrier: string
  tracking_number: string
  items?: number[]
}

export interface RefundRequest {
  amount?: number
  reason?: string
  items?: { item_id: number; quantity: number }[]
}

export interface OrderExportParams {
  format?: 'csv' | 'xlsx'
  status?: string
  date_from?: string
  date_to?: string
}
