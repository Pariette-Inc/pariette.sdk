import { ParietteClient } from './client'
import { ParietteConfig } from './types/common'
import { AuthModule } from './modules/auth'
import { CanvasModule } from './modules/canvas'
import { ProductModule } from './modules/products'
import { OrderModule } from './modules/orders'
import { EnvironmentModule } from './modules/environments'
import { SubscriptionModule } from './modules/subscriptions'
import { InventoryModule } from './modules/inventory'
import { StorageModule } from './modules/storage'
import { BasketModule } from './modules/basket'
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
  readonly orders: OrderModule
  readonly environments: EnvironmentModule
  readonly subscriptions: SubscriptionModule
  readonly inventory: InventoryModule
  readonly storage: StorageModule
  readonly basket: BasketModule
  readonly navigation: NavigationModule
  readonly attributes: AttributeModule
  readonly users: UserModule
  readonly notifications: NotificationModule
  readonly collections: CollectionModule

  constructor(config: ParietteConfig) {
    this.client = new ParietteClient(config)

    this.auth = new AuthModule(this.client)
    this.canvas = new CanvasModule(this.client)
    this.products = new ProductModule(this.client)
    this.orders = new OrderModule(this.client)
    this.environments = new EnvironmentModule(this.client)
    this.subscriptions = new SubscriptionModule(this.client)
    this.inventory = new InventoryModule(this.client)
    this.storage = new StorageModule(this.client)
    this.basket = new BasketModule(this.client)
    this.navigation = new NavigationModule(this.client)
    this.attributes = new AttributeModule(this.client)
    this.users = new UserModule(this.client)
    this.notifications = new NotificationModule(this.client)
    this.collections = new CollectionModule(this.client)
  }

  /** JWT token'i manuel olarak set et */
  setAuthToken(token: string | null): void {
    this.client.setAuthToken(token)
  }

  /** Mevcut JWT token'i al */
  getAuthToken(): string | null {
    return this.client.getAuthToken()
  }

  /** Dil degistir */
  setLocale(locale: string): void {
    this.client.setLocale(locale)
  }
}
