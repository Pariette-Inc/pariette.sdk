export { Pariette } from './pariette'
export { ParietteClient } from './client'

// ── Core Types ──────────────────────────────────────────────────────────────
export * from './types'
export * from './types/order'

// ── Modules (classes) ───────────────────────────────────────────────────────
export { AuthModule } from './modules/auth'
export { CanvasModule } from './modules/canvas'
export { ProductModule } from './modules/products'

// Cart & Checkout
export { CartModule } from './modules/basket'
export type {
  Basket,
  BasketItem,
  AddToCartRequest,
  CouponValidationResult,
} from './modules/basket'

// Coupons
export { CouponModule } from './modules/coupons'
export type {
  Coupon,
  CouponType,
  CouponCreateRequest,
  CouponUpdateRequest,
} from './modules/coupons'

// Orders & E-Commerce
export {
  SellerOrderModule,
  CustomerOrderModule,
  CarrierModule,
  PaymentGatewayModule,
  /** @deprecated Kullan: SellerOrderModule */
  OrderModule,
} from './modules/orders'

// Platform
export { EnvironmentModule } from './modules/environments'
export { SubscriptionModule } from './modules/subscriptions'
export { StockModule, /** @deprecated */ InventoryModule } from './modules/inventory'

// Storage
export { StorageModule } from './modules/storage'
export type {
  StorageImage,
  StorageFile,
  Gallery,
  GalleryImage,
  UploadImagesOptions,
} from './modules/storage'

// Navigation
export { NavigationModule } from './modules/navigation'
export type {
  Navigation,
  NavigationLink,
  CreateNavigationRequest,
  CreateNavigationLinkRequest,
} from './modules/navigation'

// Attributes & Lookups
export { AttributeModule } from './modules/attributes'
export type {
  Attribute,
  AttributeItem,
  Lookup,
  LookupItem,
} from './modules/attributes'

// Users & Addresses
export { UserModule } from './modules/users'
export type {
  UserAddress,
  CreateAddressRequest,
  UpdateAddressRequest,
} from './modules/users'

// Notifications & Tickets
export { NotificationModule } from './modules/notifications'
export type {
  SendEmailRequest,
  SendSmsRequest,
  SendPushRequest,
  TicketRequest,
} from './modules/notifications'

// Collections & Categories
export { CollectionModule } from './modules/collections'
export type {
  CollectionItem,
  CollectionItemContent,
  CollectionParams,
  ProductCollectionParams,
} from './modules/collections'
