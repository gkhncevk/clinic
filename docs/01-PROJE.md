# 01 - Proje

## Platform ne yapıyor

Sağlık turizminde bir yönlendirme pazar yeri. Üç taraf var.

**Marka elçileri (ambassadors).** Birleşik Krallık'ta yaşayan, çevresi geniş
kişiler. Influencer, topluluk yöneticisi, kuaför, spor salonu işletmecisi.
Türkiye'deki klinikleri tanıtır, hasta adayı yönlendirir, doğrulanan
yönlendirme başına komisyon kazanır.

**Klinikler (clinics).** Türkiye'nin çeşitli illerinden diş, saç ekimi ve
estetik klinikleri. Platforma kayıt olur, belgelerini doğrulatır, profil
açar, elçilere yönelik kampanya yayınlar, gelen hasta adaylarını
değerlendirir.

**Yöneticiler (admins).** Platform ekibi. Bu görevin kapsamı dışında.

Kabaca: Fiverr mantığının sağlık turizmine uyarlanmış hali. Ama tek fark
şurada: burada para ve sağlık bir arada, bu yüzden **güven her şeyden
önemli**.

## Neden güven merkezde

Hedef kullanıcı Birleşik Krallık'ta yaşıyor ve tanımadığı bir ülkedeki bir
kliniğe gitmeye karar verecek. Binlerce sterlinlik bir tedaviden ve kendi
sağlığından bahsediyoruz.

Bu yüzden arayüz abartısız, net ve ciddi olmalı. Pazarlama coşkusu burada
ters teper. "Türkiye'nin 1 numarası!" yazan bir site güven kaybettirir,
"Belgeleri kontrol edilmiş klinik" yazan kazandırır.

Aynı şekilde sayfada gösterdiğiniz her sayı gerçek bir şeye karşılık
gelmeli. Uydurma istatistik, sahte rozet, anlamsız yıldız puanı olmamalı.

## Akış

```
Elçi kayıt olur ve onaylanır
  -> Klinik seçer, kendine özel takip linki üretir
    -> Linki kendi kanallarında paylaşır
      -> Linke tıklayan kişi form doldurur, hasta adayı olur
        -> Klinik hasta adayını değerlendirir
          -> Nitelikli bulursa elçi sabit ücret kazanır
            -> Kişi gelip tedavi olursa elçi komisyon kazanır
              -> 30 gün bekleme süresinden sonra ödeme yapılır
```

## Terimler

Arayüzde kullanacağınız kelimeler. Bunları değiştirmeyin.

| Terim | Anlamı |
|---|---|
| **Ambassador** | Marka elçisi. Yönlendirmeyi yapan kişi |
| **Clinic** | Klinik |
| **Lead** | Hasta adayı. Yönlendirilen kişi |
| **Referral** | Yönlendirme kaydı. Elçi, hasta adayı ve klinik arasındaki bağ |
| **Campaign** | Kliniğin elçilere yönelik yayınladığı kampanya |
| **Qualified lead fee** | Klinik hasta adayını gerçek aday olarak onaylayınca doğan sabit ücret |
| **Treatment commission** | Tedavi tamamlanınca doğan yüzde komisyon |
| **Hold period** | Tedavi sonrası 30 günlük bekleme. Bu sürede kazanç ödemeye çıkamaz |
| **Tier** | Elçi seviyesi: standard, silver, gold. Komisyona çarpan uygular |
| **Verification level** | Kliniğin doğrulama seviyesi |

## Yönlendirme durumları

Elçi panelinde bu 10 durumu göstereceksiniz. Her birinin anlamı farklı ve
kullanıcıya doğru hissi vermeli.

| Durum | Anlamı | Ton |
|---|---|---|
| `new` | Klinik henüz incelemedi | nötr |
| `contacted` | Klinik iletişime geçti | bilgi |
| `qualified` | Onaylandı, sabit ücret kazanıldı | olumlu |
| `disqualified` | Klinik uygun bulmadı | olumsuz |
| `booked` | Randevu alındı | bilgi |
| `treated` | Tedavi tamamlandı, bekleme süresi başladı | olumlu |
| `settled` | Ödemeye hazır | olumlu, en güçlü |
| `cancelled` | Tedavi gerçekleşmedi | olumsuz, yumuşak |
| `disputed` | İnceleme altında | uyarı |
| `expired` | Süresi doldu | soluk |

Bu 10 durumu renk ve biçimle ayırmak, bu görevin sessiz zorluklarından
biri. Hepsine ayrı renk verirseniz ekran karnaval olur, hepsini griye
çevirirseniz bilgi kaybolur.

## Doğrulama seviyeleri

| Seviye | Anlamı |
|---|---|
| `documents_verified` | Belgeleri kontrol edildi |
| `site_visited` | Belgeleri kontrol edildi ve klinik yerinde ziyaret edildi |

İkincisi daha güçlü bir güven sinyali, arayüzde bu fark görünmeli.

## Para

Tüm tutarlar **pens cinsinden tam sayı** olarak geliyor. `120000` değeri
1.200,00 GBP demek.

Ekranda gösterirken doğru biçimlendirin. Binlik ayracı, para birimi
sembolü, gereksiz kuruş göstermemek gibi detaylar önemli.

Sayı hizalaması da önemli: tablolarda ve kartlarda rakamlar hizalı olmalı.
`font-variant-numeric: tabular-nums` işinizi görür.

## Kapsam dışı olduğunu bilin

Gerçek üründe var ama bu görevde yok: hasta adayı formu, klinik paneli,
admin paneli, mesajlaşma, ödeme entegrasyonu, değerlendirme ve puanlama.

Platformda **yıldız puanı ve kullanıcı yorumu yok.** Sahte yorum riski
yüksek olduğu için ürün kararı olarak çıkarıldı. Güven sinyali olarak
bunun yerine doğrulama seviyesi, tamamlanan yönlendirme sayısı ve ortalama
yanıt süresi kullanılıyor. Kart tasarımında bunu aklınızda tutun.
