import { BaseModule } from './base'
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  User,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  TwoFactorSetupResponse,
  TwoFactorVerifyRequest,
  ProfileUpdateRequest,
} from '../types/auth'
import { ApiResponse } from '../types/common'

export class AuthModule extends BaseModule {
  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await this.client.post<LoginResponse>('/api/auth/console', data)
    if (response.access_token) {
      this.client.setAuthToken(response.access_token)
    }
    return response
  }

  async register(data: RegisterRequest): Promise<ApiResponse<User>> {
    return this.client.post('/api/auth/register', data)
  }

  async me(): Promise<User> {
    return this.client.get<User>('/api/auth/me')
  }

  async logout(): Promise<ApiResponse> {
    const response = await this.client.post<ApiResponse>('/api/auth/logout')
    this.client.setAuthToken(null)
    return response
  }

  async refresh(): Promise<LoginResponse> {
    const response = await this.client.get<LoginResponse>('/api/auth/refresh')
    if (response.access_token) {
      this.client.setAuthToken(response.access_token)
    }
    return response
  }

  async forgotPassword(data: ForgotPasswordRequest): Promise<ApiResponse> {
    return this.client.post('/api/auth/forgot-password', data)
  }

  async resetPassword(data: ResetPasswordRequest): Promise<ApiResponse> {
    return this.client.post('/api/auth/reset-password', data)
  }

  async activateAccount(token: string): Promise<ApiResponse> {
    return this.client.put(`/api/auth/account-activation/${token}`)
  }

  async getInvitation(token: string): Promise<ApiResponse> {
    return this.client.get(`/api/auth/invitation/${token}`)
  }

  async completeInvitation(data: { token: string; name: string; password: string; password_confirmation: string }): Promise<ApiResponse> {
    return this.client.post('/api/auth/complete-invitation', data)
  }

  async updateProfile(data: ProfileUpdateRequest): Promise<ApiResponse<User>> {
    return this.client.post('/api/auth/profile/update', data)
  }

  async updateEmail(data: { email: string; password: string }): Promise<ApiResponse> {
    return this.client.post('/api/auth/email/update', data)
  }

  async updatePassword(data: { current_password: string; password: string; password_confirmation: string }): Promise<ApiResponse> {
    return this.client.post('/api/auth/password/update', data)
  }

  async twoFactorSetup(): Promise<TwoFactorSetupResponse> {
    return this.client.post('/api/auth/2fa/setup')
  }

  async twoFactorConfirm(data: TwoFactorVerifyRequest): Promise<ApiResponse> {
    return this.client.post('/api/auth/2fa/confirm', data)
  }

  async twoFactorVerify(data: TwoFactorVerifyRequest): Promise<LoginResponse> {
    const response = await this.client.post<LoginResponse>('/api/auth/2fa/verify', data)
    if (response.access_token) {
      this.client.setAuthToken(response.access_token)
    }
    return response
  }

  async twoFactorDisable(data: { password: string }): Promise<ApiResponse> {
    return this.client.post('/api/auth/2fa/disable', data)
  }

  async myEnvironments(): Promise<ApiResponse> {
    return this.client.get('/api/my-environments')
  }
}
