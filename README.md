# @pariette/sdk

**Pariette Platform** için resmi TypeScript/JavaScript SDK. Multi-tenant headless CMS, e-ticaret ve SaaS entegrasyonunu tek pakette sunar.

[![npm version](https://img.shields.io/npm/v/@pariette/sdk.svg)](https://www.npmjs.com/package/@pariette/sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

---

## Kurulum

```bash
npm install @pariette/sdk
# veya
pnpm add @pariette/sdk
# veya
yarn add @pariette/sdk
```

---

## Hızlı Başlangıç

```typescript
import { Pariette } from '@pariette/sdk'

const pariette = new Pariette({
  mode: 'production',      // 'production' | 'test'
  token: 'ENV_TOKEN',      // Environment (ParietteToken) token
  locale: 'tr',            // Opsiyonel: 'tr' | 'en' | 'de' | 'fr'
})
```

> API URL'leri sabittir:
> - **Production:** `https://live.pariette.com`
> - **Test:** `https://dev.pariette.com`

---

## Kimlik Doğrulama

```typescript
// Giriş — JWT token otomatik set edilir
const { access_token, user } = await pariette.auth.login({
  email: 'user@example.com',
  password: 'password123',
})

// Token'i manuel set et (örneğin cookie/localStorage'dan restore)
pariette.setAuthToken(access_token)

// Console (panel) işlemleri için environment token gerekir
pariette.setConsoleToken(environment.token)

// Misafir sepet işlemleri için guest session ID
pariette.setGuestId(sessionStorage.getItem('guest_id'))

// Dil değiştir
pariette.setLocale('en')

// Mevcut kullanıcı
const me = await pariette.auth.me()

// Çıkış
await pariette.auth.logout()
```

### 2FA

```typescript
// Kurulum (QR kodu döner)
const setup = await pariette.auth.twoFactorSetup()
// Onay
await pariette.auth.twoFactorConfirm({ code: '123456' })
// Giriş (temp_token akışı)
const result = await pariette.auth.twoFactorVerify({ code: '123456', temp_token: '...' })
```

---

## Canvas (Headless CMS)

```typescript
// Sayfa listesi
const pages = await pariette.canvas.list({ page: 1, per_page: 10 })

// Public sayfa (slug ile)
const about = await pariette.canvas.getPublic('about-us')

// Tip filtresi ile
const blogs = await pariette.canvas.listPublic({ type: 'blog', status: 1 })

// Oluştur / güncelle / sil
await pariette.canvas.create({ title: 'Blog', type: 'blog', status: 1 })
await pariette.canvas.update('blog', { title: 'Blog Güncel' })
await pariette.canvas.delete(123)

// Galeri & metrikler
await pariette.canvas.addGallery({ canvas_id: 123, image_id: 456 })
const metrics = await pariette.canvas.getMetrics(123)
```

---

## Ürünler (Products)

```typescript
// Public liste / detay
const products = await pariette.products.listPublic({ page: 1, per_page: 20 })
const product  = await pariette.products.get('kirmizi-ayakkabi')

// Oluştur (boyut + stok alanları dahil)
await pariette.products.create({
  title: 'Kırmızı Ayakkabı',
  price: 299.90,
  stock: 50,
  weight: 0.8,   // kg
  width: 30,     // cm — desi: (30×15×20)/3000 = 3 desi
  height: 15,
  depth: 20,
})

// Varyant / fiyat / medya / lokalizasyon
await pariette.products.setVariants(productId, [
  { title: 'S', sku: 'SKU-S', price: 299.90 },
  { title: 'M', sku: 'SKU-M', price: 299.90 },
])

// Stok
const stock = await pariette.stock.getProductStock(productId)
await pariette.stock.updateProductStock(productId, 100)
```

---

## Sepet & Checkout (E-Ticaret)

```typescript
// Misafir desteği: setGuestId ile session ID set et
pariette.setGuestId('uuid-session')

// Sepet CRUD
const basket = await pariette.cart.get()
await pariette.cart.add({ product_id: 1, quantity: 2 })
await pariette.cart.updateItem(itemId, 3)
await pariette.cart.removeItem(itemId)
await pariette.cart.clear()

// Kupon önizleme
const preview = await pariette.cart.applyCoupon('YAZA10', basket.data.id)
// preview.data.discount_amount, .free_shipping, .new_total

// Checkout seçenekleri (kargo + ödeme yöntemleri)
const options = await pariette.cart.checkoutOptions()

// Siparişi tamamla
const order = await pariette.cart.checkout({
  basket_id: basket.data.id,
  payment_method: 'stripe',
  carrier_id: 1,
  coupon_code: 'YAZA10',
  shipping_address: {
    name: 'Ahmet', country: 'TR', city: 'İstanbul',
    address_detail: 'Örnek Mah. No:1',
  },
})
```

---

## Siparişler (Orders)

### Satıcı Paneli

```typescript
pariette.setConsoleToken(env.token)  // zorunlu

const orders = await pariette.orders.list({ status: 'pending' })
const stats  = await pariette.orders.stats()

// Durum güncelle
await pariette.orders.updateStatus(orderId, { status: 'confirmed', note: 'Onaylandı' })

// Kargo bilgisi
await pariette.orders.updateShipping(orderId, {
  carrier_id: 1,
  tracking_number: 'TK123456789',
})

// Mesaj
await pariette.orders.sendMessage(orderId, 'Siparişiniz kargoya verildi.')

// Kısmi iade (ürün bazlı) → sipariş `partially_refunded` olur
await pariette.orders.refund(orderId, {
  items: [{ product_id: 42, quantity: 1, amount: 150 }],
  reason: 'Müşteri talebi',
  restock_item: true,
})

// Tam iade
await pariette.orders.refund(orderId, { amount: 299.90, reason: 'Hasarlı ürün' })
```

### Müşteri

```typescript
const myOrders = await pariette.myOrders.list()
await pariette.myOrders.cancel(orderId, 'Yanlış beden seçtim')
await pariette.myOrders.sendMessage(orderId, 'Ne zaman gelir?')
```

---

## Kuponlar (Coupons)

```typescript
// Liste / Oluştur / Güncelle / Sil (panel)
const coupons = await pariette.coupons.list()

await pariette.coupons.create({
  code: 'YAZA20',
  type: 'percentage',   // 'percentage' | 'fixed' | 'free_shipping'
  value: 20,
  usage_limit: 100,
  expires_at: '2026-08-31T23:59:59',
})

await pariette.coupons.update(couponId, { is_active: false })
await pariette.coupons.delete(couponId)
```

---

## Kargo Firmaları (Carriers)

```typescript
const carriers       = await pariette.carriers.list()        // panel
const publicCarriers = await pariette.carriers.publicList()  // checkout için

await pariette.carriers.create({
  name: 'Yurtiçi Kargo',
  pricing_type: 'per_desi',  // 'fixed' | 'per_desi' | 'per_kg'
  base_price: 25,
  per_unit_price: 2.5,
  free_shipping_threshold: 500,
})
```

---

## Ödeme Yöntemleri (Payment Gateways)

```typescript
const providers = await pariette.paymentGateways.providers()
const gateways  = await pariette.paymentGateways.list()

await pariette.paymentGateways.create({
  provider: 'stripe',
  label: 'Kredi Kartı',
  is_active: true,
  is_default: true,
})
```

---

## Abonelikler (Subscriptions)

```typescript
// Fiyat hesapla (KDV dahil)
const pricing = await pariette.subscriptions.calculatePricing({
  plan_id: 2,
  plan: 'annual',  // 'annual' | 'monthly'
  country: 'TR',
})

// Abone ol
await pariette.subscriptions.subscribe({
  plan_id: 2,
  plan: 'annual',
  payment_method: 'stripe',
})

// Fatura profilleri
await pariette.subscriptions.billingProfiles.create({
  name: 'Ahmet Yılmaz',
  company_name: 'Şirket A.Ş.',
  tax_number: '1234567890',
  country: 'TR',
})
```

---

## Medya & Depolama (Storage)

```typescript
// Tek resim
const image = await pariette.storage.uploadImage(file)

// Toplu yükle (WebP + sıkıştırma)
const images = await pariette.storage.uploadImages(files, {
  convert: 'webp',
  quality: 85,
  compress: 'tinypng',
  canvas_id: 123,   // Otomatik bağla
})

// Galeriler
await pariette.storage.galleries.create({ title: 'Yaz Koleksiyonu' })
await pariette.storage.galleries.addImage({ gallery_id: 1, image_id: 456 })
```

---

## Kullanıcı Adresleri

```typescript
const addresses = await pariette.users.addresses.list()

await pariette.users.addresses.create({
  title: 'Ev', name: 'Ahmet Yılmaz',
  address_line_1: 'Örnek Mah. No:1',
  city: 'İstanbul', postal_code: '34000', country: 'TR',
  is_default: true,
})
```

---

## Koleksiyonlar (Collections)

```typescript
// Kategori → içerikler
const cat  = await pariette.collections.getCategory('haberler')
const news = await pariette.collections.getItems(cat.data.id, { type: 'news', paginate: 10 })

// Ürün kategorisi → ürünler
const pcat     = await pariette.collections.getCategory('bebek-arabalari', 'productCategory')
const products = await pariette.collections.getProducts(pcat.data.id, { paginate: 20 })
const featured = await pariette.collections.getFeaturedProducts(pcat.data.id)

// Tüm kategoriler
const allCats = await pariette.collections.listCategories()
const allPCats = await pariette.collections.listProductCategories()
```

---

## Navigasyon

```typescript
const navs = await pariette.navigation.list()
await pariette.navigation.links.create({ navigation_id: 1, title: 'Ana Sayfa', url: '/', order: 0 })
await pariette.navigation.links.reorder([
  { id: 1, order: 0 },
  { id: 2, order: 1, parent_id: 1 },
])
```

---

## Bildirimler (Notifications)

```typescript
await pariette.notifications.sendEmail({ to: 'x@x.com', subject: 'Test', body_html: '<p>Merhaba</p>' })
await pariette.notifications.sendSms({ to: '+905001234567', message: 'Kargoya verildi.' })
await pariette.notifications.sendPush({ title: 'Yeni sipariş', body: '3 bekliyor', user_ids: [42] })

// Destek talebi (public)
await pariette.notifications.tickets.create({
  subject: 'Sorun', message: 'Sipariş gelmedi.', name: 'Ahmet', email: 'ahmet@x.com',
})
```

---

## Hata Yönetimi

```typescript
import { ParietteError } from '@pariette/sdk'

try {
  await pariette.auth.login({ email: 'x@x.com', password: 'wrong' })
} catch (err) {
  if (err instanceof ParietteError) {
    console.log(err.code)    // HTTP status (ör: 401, 422)
    console.log(err.message) // API mesajı
    console.log(err.errors)  // Validation: { field: string[] }
  }
}
```

---

## TypeScript Tip Referansı

| Tip | Açıklama |
|-----|----------|
| `Product` | Ürün (`stock`, `width`, `height`, `depth` dahil) |
| `Order` | Sipariş (`partially_refunded` status dahil) |
| `OrderStatus` | `pending \| confirmed \| processing \| shipped \| delivered \| cancelled \| refunded \| partially_refunded` |
| `RefundRequest` | İade (ürün bazlı `items[]` veya tutar bazlı `amount`) |
| `RefundItem` | Kısmi iade kalemi |
| `Basket` / `BasketItem` | Sepet modeli |
| `Carrier` | Kargo (`fixed \| per_desi \| per_kg`) |
| `PaymentGateway` | Ödeme yöntemi |
| `Coupon` / `CouponType` | Kupon modeli |
| `CouponValidationResult` | `applyCoupon()` dönüş tipi |
| `CheckoutRequest` / `CheckoutOptions` | Checkout |
| `Canvas` | CMS sayfa modeli |
| `StorageImage` / `StorageFile` | Medya |
| `Navigation` / `NavigationLink` | Navigasyon |
| `UserAddress` | Kullanıcı adresi |
| `CollectionItem` | Koleksiyon/kategori öğesi |
| `ParietteError` | Hata sınıfı (`code`, `message`, `errors`) |
| `ParietteConfig` | SDK yapılandırması |

---

## Lisans

MIT © [Pariette Inc.](https://pariette.com)
