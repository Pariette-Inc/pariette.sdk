# @pariette/sdk

Pariette platformu icin resmi Node.js / Browser SDK. CMS, E-Commerce ve SaaS entegrasyonu icin tek paket.

## Kurulum

```bash
npm install @pariette/sdk
```

## Hizli Baslangic

```typescript
import { Pariette } from '@pariette/sdk'

const pariette = new Pariette({
  apiUrl: 'https://api.pariette.com',
  token: 'YOUR_ENVIRONMENT_TOKEN',
  locale: 'tr'
})
```

## Kimlik Dogrulama (Auth)

```typescript
// Giris yap - token otomatik set edilir
const { access_token, user } = await pariette.auth.login({
  email: 'user@example.com',
  password: 'password123'
})

// Mevcut kullanici bilgisi
const me = await pariette.auth.me()

// Token'i manuel set et (ornegin localStorage'dan)
pariette.setAuthToken('your-jwt-token')

// Cikis yap
await pariette.auth.logout()
```

## Canvas (CMS)

```typescript
// Tum sayfalari listele
const pages = await pariette.canvas.list({ page: 1, per_page: 10 })

// Tek sayfa getir
const page = await pariette.canvas.getPublic('about-us')

// Yeni sayfa olustur
await pariette.canvas.create({
  title: 'Blog Yazisi',
  type: 'blog',
  status: 1,
  contents: [{
    locale: 'tr',
    title: 'Blog Yazisi',
    body: '<p>Icerik buraya...</p>'
  }]
})

// Sayfa guncelle
await pariette.canvas.update('about-us', {
  title: 'Hakkimizda - Guncellendi'
})

// Sayfa sil
await pariette.canvas.delete(123)
```

## Urunler (Products)

```typescript
// Urun listesi (filtreli)
const products = await pariette.products.list({
  page: 1,
  search: 'bebek arabasi',
  min_price: 100,
  max_price: 5000
})

// Urun detayi
const product = await pariette.products.get('bebek-arabasi-deluxe')

// Urun olustur
await pariette.products.create({
  title: 'Bebek Arabasi Deluxe',
  price: 2999.90,
  currency: 'TRY',
  sku: 'BA-DLX-001',
  status: 1
})

// Varyant ekle
await pariette.products.setVariants(productId, [
  { title: 'Kirmizi', sku: 'BA-DLX-RED', price: 2999.90 },
  { title: 'Mavi', sku: 'BA-DLX-BLU', price: 2999.90 }
])

// Fiyat set et (coklu para birimi)
await pariette.products.setPrices(productId, [
  { currency: 'TRY', price: 2999.90 },
  { currency: 'EUR', price: 89.90 }
])

// Toplu urun olustur
await pariette.products.bulkCreate([product1, product2, product3])
```

## Siparisler (Orders)

```typescript
// Siparis listesi
const orders = await pariette.orders.list({ page: 1, status: 'pending' })

// Siparis detayi
const order = await pariette.orders.get(orderId)

// Durum guncelle
await pariette.orders.updateStatus(orderId, {
  status: 'shipped',
  note: 'Kargo gonderildi'
})

// Kargo olustur
await pariette.orders.createShipment(orderId, {
  carrier: 'Yurtici Kargo',
  tracking_number: 'YK123456789'
})

// Iade
await pariette.orders.refund(orderId, {
  amount: 500,
  reason: 'Musteri iade talebi'
})

// Zaman cizelgesi
const timeline = await pariette.orders.timeline(orderId)
```

## Sepet (Basket)

```typescript
// Sepete urun ekle
await pariette.basket.addOrCreateItem({
  product_id: 123,
  quantity: 2
})

// Sepet detayi
const cart = await pariette.basket.get(basketId)

// Miktar guncelle
await pariette.basket.updateItem(basketId, itemId, { quantity: 3 })

// Odeme yap
await pariette.basket.checkout(basketId, {
  billing_address: { ... },
  payment_method: 'credit_card',
  payment_data: { ... }
})
```

## Ortam Yonetimi (Environment)

```typescript
// Ortam bilgisi
const env = await pariette.environments.get('TOKEN')

// Tasarim guncelle
await pariette.environments.updateDesign('TOKEN', {
  primary_color: '#FF6B35',
  logo: 'https://cdn.example.com/logo.png'
})

// Takim yonetimi
const members = await pariette.environments.team.list('TOKEN')
await pariette.environments.team.invite('TOKEN', {
  email: 'yeni@kisi.com',
  role: 'editor'
})
```

## Abonelik & Faturalama

```typescript
// Fiyat hesapla
const pricing = await pariette.subscriptions.calculatePricing({
  product_id: 'pro-plan',
  plan: 'monthly',
  billing_profile_id: 1
})

// Abone ol
await pariette.subscriptions.subscribe({
  product_id: 'pro-plan',
  plan: 'monthly',
  billing_profile_id: 1,
  card: {
    number: '4111111111111111',
    exp_month: '12',
    exp_year: '2027',
    cvc: '123',
    holder_name: 'Ahmet Yilmaz'
  }
})

// Fatura profili olustur
await pariette.subscriptions.billingProfiles.create({
  type: 'corporate',
  name: 'Bebiletto A.S.',
  tax_id: '1234567890',
  tax_office: 'Kadikoy',
  address: 'Ornek Mah. Test Cad. No:1',
  city: 'Istanbul',
  postal_code: '34000',
  country: 'TR'
})
```

## Stok Yonetimi (Inventory)

```typescript
// Stok listesi
const stock = await pariette.inventory.list('TOKEN')

// Stok ayarla
await pariette.inventory.adjust('TOKEN', warehouseId, productId, {
  quantity: 50,
  type: 'set',
  reason: 'Sayim sonucu'
})

// Dusuk stok uyarilari
const lowStock = await pariette.inventory.lowStock('TOKEN')

// Stok transferi olustur
await pariette.inventory.transfers.create('TOKEN', {
  from_warehouse_id: 1,
  to_warehouse_id: 2,
  items: [{ product_id: 123, quantity: 10 }]
})
```

## Dosya Yonetimi (Storage)

```typescript
// Resim yukle
const image = await pariette.storage.uploadImage(file, (progress) => {
  console.log(`Yukleniyor: ${progress}%`)
})

// Galeri olustur
await pariette.storage.galleries.create({ title: 'Urun Resimleri' })
await pariette.storage.galleries.addImage({
  gallery_id: 1,
  image_id: image.data.id
})
```

## Navigasyon

```typescript
// Menu listesi
const menus = await pariette.navigation.list()

// Menu olustur
await pariette.navigation.create({ title: 'Ana Menu' })

// Link ekle
await pariette.navigation.links.create({
  navigation_id: 1,
  title: 'Anasayfa',
  url: '/',
  order: 1
})

// Linkleri yeniden sirala
await pariette.navigation.links.reorder([
  { id: 1, order: 0 },
  { id: 2, order: 1 },
  { id: 3, order: 2 }
])
```

## Hata Yonetimi

```typescript
import { ParietteError } from '@pariette/sdk'

try {
  await pariette.products.create({ title: '' })
} catch (error) {
  if (error instanceof ParietteError) {
    console.log(error.code)     // 422
    console.log(error.message)  // "Validation failed"
    console.log(error.errors)   // { title: ["Title is required"] }
  }
}
```

## Konfigürasyon

```typescript
const pariette = new Pariette({
  apiUrl: 'https://api.pariette.com',  // API base URL (zorunlu)
  token: 'ENV_TOKEN',                   // Environment token (zorunlu)
  locale: 'tr',                         // Dil (opsiyonel, varsayilan: yok)
  consoleToken: 'CONSOLE_TOKEN',        // Console token (opsiyonel)
  timeout: 30000                        // Timeout ms (opsiyonel, varsayilan: 30000)
})

// Runtime'da degistir
pariette.setLocale('en')
pariette.setConsoleToken('NEW_TOKEN')
pariette.setAuthToken('jwt-token')
```

## Moduller

| Modul | Erisim | Aciklama |
|-------|--------|----------|
| Auth | `pariette.auth` | Kimlik dogrulama, kayit, 2FA |
| Canvas | `pariette.canvas` | CMS sayfa yonetimi |
| Products | `pariette.products` | Urun CRUD, varyant, fiyat |
| Orders | `pariette.orders` | Siparis yonetimi, kargo, iade |
| Environments | `pariette.environments` | Ortam ayarlari, takim |
| Subscriptions | `pariette.subscriptions` | Abonelik, faturalama |
| Inventory | `pariette.inventory` | Stok yonetimi, transfer |
| Storage | `pariette.storage` | Dosya/resim yukleme, galeri |
| Basket | `pariette.basket` | Sepet islemleri |
| Navigation | `pariette.navigation` | Menu yonetimi |
| Attributes | `pariette.attributes` | Ozellik & lookup yonetimi |
| Users | `pariette.users` | Adres yonetimi |
| Notifications | `pariette.notifications` | Email, SMS, push bildirim |

## Lisans

MIT
