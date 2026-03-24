export interface Environment {
  id: number
  token: string
  name: string
  type: string
  status: number
  domain?: string
  logo?: string
  favicon?: string
  takedown_at?: string
  release_at?: string
  main?: number
  created_at: string
  updated_at: string
}

export interface EnvironmentDesign {
  primary_color?: string
  secondary_color?: string
  font_family?: string
  logo?: string
  favicon?: string
  custom_css?: string
}

export interface EnvironmentLegal {
  terms?: string
  privacy?: string
  cookies?: string
  refund?: string
}

export interface EnvironmentMeta {
  title?: string
  description?: string
  keywords?: string
  og_image?: string
  google_analytics?: string
  facebook_pixel?: string
}

export interface EnvironmentNotify {
  email_enabled?: boolean
  sms_enabled?: boolean
  push_enabled?: boolean
  smtp_host?: string
  smtp_port?: number
  smtp_username?: string
  smtp_password?: string
  smtp_encryption?: string
}

export interface CreateEnvironmentRequest {
  name: string
  type?: string
  domain?: string
}

export interface TeamMember {
  id: number
  user_id: number
  environment_id: number
  role: string
  name: string
  email: string
  created_at: string
}

export interface InviteTeamMemberRequest {
  email: string
  role: string
  name?: string
}

export interface EnvironmentStatistics {
  total_orders: number
  total_revenue: number
  total_products: number
  total_customers: number
  total_canvas: number
}
