# Pariette SDK - CLAUDE.md

> TypeScript SDK — Node.js + Browser
> npm: @pariette/sdk

## Dokümantasyon Kuralı (ZORUNLU)

Bu projede yapılan **her geliştirme** (yeni metod, parametre değişikliği, yeni modül, davranış değişikliği) aşağıdaki dosyalarda da güncellenmelidir:

1. **`pariette.sdk/README.md`** — SDK'nın resmi dokümantasyonu. Kullanıcılar bunu okuyarak entegrasyon yapar.
2. **`pariette.us/src/app/Documents/page.tsx`** — pariette.com canlı sitesindeki dokümantasyon sayfası. İçindeki `sdkDocs_tr`, `sdkDocs_en`, `sdkDocs_de` string'leri güncellenmeli.

### Akış
```
SDK'da geliştirme yap
  → README.md güncelle
  → pariette.us Documents/page.tsx güncelle (3 dil)
  → npm version patch/minor && npm publish
  → git commit & push
```

### Dikkat
- README'ye yazılmayan özellik yoktur — kullanıcı README'den öğrenir.
- Documents sayfasında 3 dil var: TR, EN, DE — üçü de güncellenmelidir.
- Kod örnekleri her dilde aynıdır, sadece açıklama metinleri çevrilir.

## Build & Publish

```bash
npm run build        # tsup ile ESM + CJS + DTS
npm version patch    # versiyon artır
npm publish          # npm'e yayınla
```

## API URL'leri (Sabit)
- Production: `https://live.pariette.com`
- Test: `https://dev.pariette.com`
- Değiştirilemez, SDK içinde hardcoded.

## Yapılmaması Gerekenler
- consoleToken SDK'da OLMAYACAK (sadece pariette.com)
- Environment create/update SDK'da OLMAYACAK (sadece pariette.com)
- Team yönetimi SDK'da OLMAYACAK (deprecated)
- apiUrl kullanıcı tarafından değiştirilemez
