import { BaseModule } from './base'
import { ApiResponse } from '../types/common'

export interface SendEmailRequest {
  to: string | string[]
  subject: string
  body_html?: string
  body_text?: string
  template?: string
  data?: Record<string, any>
}

export interface SendSmsRequest {
  to: string | string[]
  message: string
}

export interface SendPushRequest {
  title: string
  body: string
  data?: Record<string, any>
  user_ids?: number[]
}

export interface TicketRequest {
  subject: string
  message: string
  name?: string
  email?: string
  phone?: string
  priority?: string
  category?: string
}

export class NotificationModule extends BaseModule {
  /** Email gonder */
  async sendEmail(data: SendEmailRequest): Promise<ApiResponse> {
    return this.client.post('/api/notification/send-email', data)
  }

  /** SMS gonder */
  async sendSms(data: SendSmsRequest): Promise<ApiResponse> {
    return this.client.post('/api/notification/send-sms', data)
  }

  /** Push bildirim gonder */
  async sendPush(data: SendPushRequest): Promise<ApiResponse> {
    return this.client.post('/api/notification/send-push', data)
  }

  /** Discord bildirim gonder */
  async sendDiscord(data: { message: string; webhook_url?: string }): Promise<ApiResponse> {
    return this.client.post('/api/notification/SendDiscord', data)
  }

  /** Slack bildirim gonder */
  async sendSlack(data: { message: string; channel?: string }): Promise<ApiResponse> {
    return this.client.post('/api/notification/SendSlack', data)
  }

  // --- Tickets ---

  readonly tickets = {
    /** Ticket listesi */
    list: (): Promise<ApiResponse> => {
      return this.client.get('/api/tickets')
    },

    /** Ticket olustur (public) */
    create: (data: TicketRequest): Promise<ApiResponse> => {
      return this.client.post('/api/public/ticket-submit', data)
    },

    /** Ticket icerik ekle */
    addContent: (data: { ticket_id: number; message: string }): Promise<ApiResponse> => {
      return this.client.post('/api/public/ticket-content', data)
    },
  }
}
