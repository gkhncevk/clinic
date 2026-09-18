# 04 - Veri

İki JSON dosyası. Projeye olduğu gibi dahil edin, **alan adlarını
değiştirmeyin.**

Veriyi istemci tarafında filtreleyip sıralayabilirsiniz, backend
beklenmiyor. Ama yükleme durumunu görebilmemiz için yapay bir gecikme
koymanız iyi olur (300 ile 600 ms).

---

## clinics.json

24 kayıt.

```ts
type Clinic = {
  id: string
  slug: string
  displayName: string
  city: string                  // 12 farklı şehir
  district: string
  category: "dental" | "hair" | "aesthetic"
  services: string[]            // 2 ile 4 arası hizmet adı
  priceFrom: number             // pens cinsinden tam sayı
  priceTo: number
  currency: "GBP"
  verificationLevel: "documents_verified" | "site_visited"
  languages: string[]           // ISO 639-1: en, tr, ar, de, ru, nl, fr
  foundedYear: number
  staffCount: number
  completedReferrals: number    // platform üzerinden tamamlanan yönlendirme
  avgResponseHours: number      // ortalama yanıt süresi, saat
  isSponsored: boolean          // 2 kayıtta true
  isFeatured: boolean           // 3 kayıtta true, editör seçimi
  logoUrl: string               // dosya YOK
  coverUrl: string              // dosya YOK
  shortDescription: string      // boş, isterseniz siz doldurun
  createdAt: string             // "2026-09-14"
}
```

Dağılım: her kategoriden 8 klinik, 12 şehre yayılmış.

`isFeatured` alanını kullanmak zorunda değilsiniz. Kullanırsanız
sponsorluktan farklı bir şey olduğu belli olsun: sponsorlu ücretli, öne
çıkan editör seçimi.

---

## ambassador.json

Tek bir nesne, altı bölüm.

```ts
type AmbassadorData = {
  profile: {
    id: string
    fullName: string
    avatarUrl: string           // dosya YOK
    city: string
    country: string             // "GB"
    referralCode: string        // 8 karakter, kopyalanabilir olmalı
    tier: "standard" | "silver" | "gold"
    tierProgress: { current: number; nextTier: string; required: number }
    memberSince: string
    primaryCategory: string
    profileCompletion: number   // 0-100
  }

  summary: {
    readyToPay: Money
    pendingEarnings: Money
    paidToDate: Money
    referralsThisMonth: number
    referralsLastMonth: number
    conversionRate: number      // 0.41 = yüzde 41
    conversionRateLast90d: number
    nextPayoutDate: string
    minimumPayout: Money
  }

  referrals: Array<{
    id: string
    publicRef: string
    leadName: string            // "James W." gibi kısaltılmış
    clinicName: string
    category: string
    status: ReferralStatus      // 10 durumdan biri
    createdAt: string
    leadFee: Money              // nitelikli değilse amount 0
    treatmentCommission: Money  // tedavi olmadıysa amount 0
    holdEndsAt: string | null   // sadece status "treated" ise dolu
    channel: string
  }>

  links: Array<{
    id: string
    slug: string
    label: string
    clinicName: string
    channel: string
    clickCount: number
    referralCount: number
    conversionRate: number
    isActive: boolean
    createdAt: string
  }>

  campaigns: Array<{
    id: string
    title: string
    clinicName: string
    category: string
    city: string
    qualifiedLeadFee: Money
    commissionBps: number       // 600 = yüzde 6
    daysLeft: number
    slotsLeft: number | null    // null = sınırsız
    hasApplied: boolean
  }>

  clickSeries: Array<{ date: string; clicks: number }>  // 30 gün
}

type Money = { amount: number; currency: "GBP" }  // amount pens cinsinden
type ReferralStatus =
  | "new" | "contacted" | "qualified" | "disqualified" | "booked"
  | "treated" | "settled" | "cancelled" | "disputed" | "expired"
```

---

## Para biçimlendirme

Tüm tutarlar **pens cinsinden tam sayı.**

```
48600   -> £486.00   (veya £486, kuruş sıfırsa gizleyebilirsiniz)
127400  -> £1,274.00
412500  -> £4,125.00
```

`Intl.NumberFormat` kullanın, elle biçimlendirmeyin.

Ondalık sayıya çevirip saklamayın. Gösterim anında bölün.

## Baz puan (bps)

`commissionBps: 600` yüzde 6 demek. Formül: `bps / 100 = yüzde`.

Ekranda yüzde olarak gösterin.

## Eksik görseller

`logoUrl`, `coverUrl` ve `avatarUrl` alanlarındaki dosyalar **mevcut
değil.** Bu bilerek böyle.

Nasıl çözeceğiniz size kalmış ve değerlendirilecek. Gri kutu bırakmak en
zayıf çözümdür. Sistemli bir yaklaşım bekliyoruz: baş harflerden üretilen
rozet, kategoriye veya isme göre deterministik renk, geometrik desen, ne
mantıklıysa.

Deterministik olması önemli: aynı klinik her yüklemede aynı görünsün.

## Yapay gecikme

İskelet durumunu görebilmemiz için veriyi yüklerken 300 ile 600 ms gecikme
koyun. Bunu bir ayar ile kapatılabilir yapmanız iyi olur.
