import { ParietteClient } from './client'
import { ParietteConfig } from './types/common'
import { AuthModule } from './modules/auth'
import { CanvasModule } from './modules/canvas'
import { ProductModule } from './modules/products'
import {
  SellerOrderModule,
  CustomerOrderModule,
  CarrierModule,
  PaymentGatewayModule,
  OrderModule,
} from './modules/orders'
import { EnvironmentModule } from './modules/environments'
import { SubscriptionModule } from './modules/subscriptions'
import { StockModule, InventoryModule } from './modules/inventory'
import { StorageModule } from './modules/storage'
import { CartModule } from './modules/basket'
import { CouponModule } from './modules/coupons'
import { NavigationModule } from './modules/navigation'
import { AttributeModule } from './modules/attributes'
import { UserModule } from './modules/users'
import { NotificationModule } from './modules/notifications'
import { CollectionModule } from './modules/collections'

export class Pariette {
  private client: ParietteClient

  readonly auth: AuthModule
  readonly canvas: CanvasModule
  readonly products: ProductModule

  // ── E-Ticaret ────────────────────────────────────────────────────────────
  /** Sepet ve checkout işlemleri (müşteri tarafı) */
  readonly cart: CartModule
  /** Satıcı sipariş yönetimi (console) */
  readonly orders: SellerOrderModule
  /** Müşteri sipariş geçmişi */
  readonly myOrders: CustomerOrderModule
  /** Kargo firması yönetimi */
  readonly carriers: CarrierModule
  /** Ödeme yöntemi yönetimi */
  readonly paymentGateways: PaymentGatewayModule
  /** Kupon yönetimi ve doğrulama */
  readonly coupons: CouponModule

  // ── Platform ─────────────────────────────────────────────────────────────
  readonly environments: EnvironmentModule
  readonly subscriptions: SubscriptionModule
  /** Basit stok yönetimi (products.stock kolonu) */
  readonly stock: StockModule
  readonly storage: StorageModule
  readonly navigation: NavigationModule
  readonly attributes: AttributeModule
  readonly users: UserModule
  readonly notifications: NotificationModule
  readonly collections: CollectionModule

  /** @deprecated Geriye dönük uyumluluk — orders kullan */
  readonly inventory: InventoryModule

  constructor(config: ParietteConfig) {
    this.client = new ParietteClient(config)

    this.auth          = new AuthModule(this.client)
    this.canvas        = new CanvasModule(this.client)
    this.products      = new ProductModule(this.client)
    this.cart          = new CartModule(this.client)
    this.orders        = new SellerOrderModule(this.client)
    this.myOrders      = new CustomerOrderModule(this.client)
    this.carriers      = new CarrierModule(this.client)
    this.paymentGateways = new PaymentGatewayModule(this.client)
    this.coupons       = new CouponModule(this.client)
    this.environments  = new EnvironmentModule(this.client)
    this.subscriptions = new SubscriptionModule(this.client)
    this.stock         = new StockModule(this.client)
    this.storage       = new StorageModule(this.client)
    this.navigation    = new NavigationModule(this.client)
    this.attributes    = new AttributeModule(this.client)
    this.users         = new UserModule(this.client)
    this.notifications = new NotificationModule(this.client)
    this.collections   = new CollectionModule(this.client)
    this.inventory     = new InventoryModule(this.client)
  }

  /** JWT auth token set/clear */
  setAuthToken(token: string | null): void {
    this.client.setAuthToken(token)
  }

  getAuthToken(): string | null {
    return this.client.getAuthToken()
  }

  /**
   * ConsoleToken — environment'a özel panel işlemleri için.
   * `orders`, `carriers`, `paymentGateways`, `coupons` gibi console modülleri için zorunludur.
   *
   * @example
   *   pariette.setConsoleToken(environment.token)
   *   await pariette.orders.list()
   */
  setConsoleToken(token: string | null): void {
    this.client.setConsoleToken(token)
  }

  /**
   * X-Guest-Id — misafir müşteri sepet işlemleri için session ID.
   *
   * @example
   *   pariette.setGuestId(sessionStorage.getItem('pariette_guest_id'))
   *   await pariette.cart.get()
   */
  setGuestId(guestId: string | null): void {
    this.client.setGuestId(guestId)
  }

  /** API istek dili (tr | en | de | fr) */
  setLocale(locale: string): void {
    this.client.setLocale(locale)
  }
}
