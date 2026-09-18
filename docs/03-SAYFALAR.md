# 03 - Sayfalar

İki sayfa yapacaksınız. Tanımlar ne gösterileceğini söyler, nasıl
görüneceğini değil. Görsel kararlar size ait.

---

# Sayfa 1: Klinik listeleme (`/clinics`)

Halka açık sayfa. Ziyaretçi burada tedavi arayacağı kliniği buluyor.

Veri: `clinics.json`, 24 kayıt.

## Sayfa yapısı

```
Başlık alanı
  Sayfa başlığı, kısa açıklama, arama kutusu
Filtre çubuğu / paneli
  Masaüstü: sol yan panel veya üst çubuk (siz seçin)
  Mobil: alt sayfa (bottom sheet)
Sonuç başlığı
  "X clinics found", aktif filtre etiketleri, sıralama seçici,
  ızgara/liste görünüm anahtarı
Sponsorlu alan
  2 kart, açıkça işaretli, organikten ayrılmış
Sonuç listesi
  Izgara veya liste, sayfa başına 9
Sayfalama
```

## Klinik kartı

Veride 17 alan var. **Hepsini karta koymayın.** Neyi göstereceğinize ve
neyi eleyeceğinize siz karar vereceksiniz, bu değerlendirilen bir karar.

Kullanılabilir alanlar: klinik adı, şehir, ilçe, kategori, hizmetler, fiyat
aralığı, doğrulama seviyesi, konuşulan diller, kuruluş yılı, personel
sayısı, tamamlanan yönlendirme sayısı, ortalama yanıt süresi.

Unutmayın: platformda **yıldız puanı ve yorum yok.** Güven sinyali olarak
doğrulama seviyesi, tamamlanan yönlendirme sayısı ve yanıt süresi var.
Bunları kartta nasıl değerlendireceğiniz önemli.

**Görseller mevcut değil.** `logoUrl` ve `coverUrl` alanlarındaki dosyalar
yok. Bunu nasıl çözeceğiniz size kalmış: baş harf rozeti, kategoriye göre
renk sistemi, desen, ne mantıklıysa. Gri kutu bırakmak en zayıf çözüm.
Sistemli ve tutarlı bir çözüm bekliyoruz.

Kart iki düzende çalışacak:
- **Izgara:** masaüstünde 3 kolon, tablette 2, mobilde 1
- **Liste:** tek kolonda yatay düzen, daha fazla bilgi görünebilir

İkisi **tek bileşen** olacak, kopyala yapıştır iki ayrı bileşen değil.

## Filtre sistemi

Bu sayfanın en önemli parçası. Beş filtre:

| Filtre | Tip | Veri |
|---|---|---|
| Şehir | çoklu seçim | 12 farklı şehir |
| Tedavi kategorisi | çoklu seçim | dental, hair, aesthetic |
| Doğrulama seviyesi | çoklu seçim | documents_verified, site_visited |
| Konuşulan dil | çoklu seçim | en, tr, ar, de, ru, nl, fr |
| Fiyat aralığı | aralık | verideki en düşük ve en yüksek arası |

Beklenenler:

- **Filtre durumu URL'de.** Sayfa yenilenince ve link paylaşılınca aynı
  sonuç gelmeli. Geri tuşu doğru çalışmalı.
- **Aktif filtreler görünür.** Sonuç başlığında etiket olarak listelensin,
  tek tek ve toplu kaldırılabilsin.
- **Her seçeneğin yanında sayı.** "İzmir (4)" gibi. Sonuç vermeyecek
  seçenek devre dışı görünsün veya gizlensin.
- **Anında uygulansın.** "Uygula" butonu olmasın. Mobilde alt sayfada
  "Show X results" butonu olabilir, bu daha iyi bir mobil örüntüdür.
- **Çok seçenekli filtrelerde** (şehir) arama veya daralt/genişlet
  düşünün. 12 şehri alt alta dizmek zayıf çözüm.

Filtre paneli mobilde alt sayfa olarak açılacak. Detay
`docs/02-TASARIM-YONU.md` içinde.

## Sıralama

Önerilen (varsayılan), en yeni, fiyat artan, fiyat azalan.

**"Önerilen" mantığını siz kuracaksınız.** Doğrulama seviyesi, tamamlanan
yönlendirme, yanıt süresi gibi alanlardan bir skor üretin. README'de
açıklayın.

Kural: **sponsorluk bu skoru etkilemez.** Sponsorlu kayıtlar ayrı bir
blokta, listenin üstünde durur.

## Sponsorlu alan

`isSponsored: true` olan iki kayıt listenin üstünde gösterilecek.

Tasarım problemi şu: sponsorlu kayıt **ayırt edilebilir olmalı** ama
organik sonuçları bastırmamalı ve kullanıcının güvenini zedelememeli.

- "Sponsored" etiketi zorunlu ve görünür olsun
- Organik sonuçlardan net ayrılsın
- Ama daha büyük, daha parlak, daha dikkat çekici olmasın

Bu dengeyi nasıl kurduğunuzu README'de anlatın. Değerlendirmede ayrı bir
başlık.

## Durumlar

| Durum | Beklenen |
|---|---|
| Yükleniyor | İskelet, gerçek kart ölçülerinde. Spinner değil |
| Boş sonuç | Açıklayıcı başlık, yol gösteren bir cümle, filtreleri temizleme eylemi |
| Arama sonucu yok | Boş durumdan farklı olabilir, "X" için sonuç bulunamadı |
| Tek sonuç | Izgara tek kartla bozulmasın |

## Sayfalama

Sayfa başına 9 kayıt. Klasik sayfa numarası, sonsuz kaydırma değil.
Filtreleme sonrası 1. sayfaya dönsün. Sayfa numarası da URL'de tutulsun.

---

# Sayfa 2: Marka elçisi paneli (`/ambassador`)

Giriş yapmış elçinin kendi ekranı. Kimlik doğrulama yok, doğrudan bu
sayfaya girilecek.

Veri: `ambassador.json`.

**Bu sayfa birinci sayfadan farklı tipte bir ekran.** Orası pazarlama yüzü,
burası çalışma aracı. Veri yoğunluğu daha yüksek, boşluk daha sıkı,
dekorasyon daha az. Ama aynı tasarım sistemine ait olduğu belli olmalı.

Bu dengeyi kurmak bu görevin en zor kısmı ve en çok şey anlatan kısmı.

## Sayfa yapısı

```
Üst alan
  Selamlama, elçi adı, referans kodu (kopyalanabilir),
  seviye (tier) rozeti
Özet kartları (4 adet)
  Ödemeye hazır kazanç
  Bekleyen kazanç
  Bu ay yönlendirme
  Dönüşüm oranı
Seviye ilerleme
  Mevcut seviye, sonraki seviyeye kalan
Tıklama grafiği
  Son 30 gün
Yönlendirmelerim
  Tablo, filtreli, durum rozetli
Aktif linklerim
  Kart veya liste
Kampanyalar
  Kart listesi
```

Sıralama önerisidir, düzeni siz kurabilirsiniz. Sekme kullanmak isterseniz
serbest.

## Özet kartları

Dört kart. Her birinde ana değer, etiket ve bir alt bilgi:

| Kart | Ana değer | Alt bilgi |
|---|---|---|
| Ready to pay | `summary.readyToPay` | Sonraki ödeme tarihi |
| Pending earnings | `summary.pendingEarnings` | Bekleme süresi açıklaması |
| Referrals this month | `summary.referralsThisMonth` | Geçen aya göre değişim |
| Conversion rate | `summary.conversionRate` | Son 90 güne göre değişim |

Değişim göstergelerinde yön belli olsun (artış, azalış) ve renk tek başına
anlam taşımasın.

Para değerleri pens cinsinden geliyor, GBP olarak biçimlendirin.

**Bu dört kart sayfanın ilk izlenimidir.** Elçi paneli açtığında ilk buraya
bakar. Hiyerarşi burada kurulur.

## Seviye (tier) ilerleme

`profile.tier` mevcut seviye, `profile.tierProgress` ilerleme.
Örnek veri: silver seviyesinde, 10 tedaviden 7'si tamamlanmış, sonraki
seviye gold.

İlerlemeyi görsel olarak gösterin. Oyunlaştırma abartısına kaçmadan,
motive edici ama ciddi bir dille.

## Tıklama grafiği

`clickSeries`, 30 günlük günlük tıklama sayısı.

Basit bir çizgi veya alan grafiği yeterli. Kütüphane serbest (Recharts,
visx, veya kendi SVG'niz).

Kurallar: eksenler okunur olsun, üzerine gelince değer görünsün, koyu temada
da düzgün çalışsın, mobilde kırılmasın. Abartılı 3B efekt, gradyan dolgu
şovu istemiyoruz.

## Yönlendirme tablosu

`referrals`, 28 kayıt. Alanlar: hasta adayı adı (kısaltılmış), klinik,
kategori, durum, tarih, lead ücreti, tedavi komisyonu, kanal.

Beklenenler:

- **10 farklı durum rozeti.** Listesi ve tonları
  `docs/01-PROJE.md` içinde. Bu görevin sessiz zorluğu: hepsine ayrı canlı
  renk verirseniz ekran karnaval olur, hepsini griye çevirirseniz bilgi
  kaybolur. Bir sistem kurun.
- Duruma göre filtreleme
- Tutarlar hizalı (`tabular-nums`)
- `treated` durumundakilerde bekleme süresi bitiş tarihi görünsün
- Kazanç sıfır olan satırlarda boşluk nasıl gösterilecek, karar verin
- **Mobilde tablo değil kart listesi.** Yatay kaydırmalı tablo kabul
  edilmez

## Aktif linkler

`links`, 6 kayıt. Her birinde: etiket, klinik, kanal, tıklama sayısı,
yönlendirme sayısı, dönüşüm oranı, aktiflik durumu.

Kısa linki kopyalama eylemi olsun ve kopyalandığı geri bildirilsin. Pasif
link görsel olarak ayrılsın.

## Kampanyalar

`campaigns`, 5 kayıt. Her birinde: başlık, klinik, kategori, şehir,
nitelikli lead ücreti, komisyon oranı (baz puan, 600 = yüzde 6), kalan gün,
kalan kontenjan, başvurulmuş mu.

Komisyon bilgisi kartın en görünür öğesi olsun. Elçi buraya bakar.

Başvurulmuş kampanyalar işaretlensin.

Mobilde yatay kaydırmalı liste yapabilirsiniz, uygulama hissini
güçlendirir.

---

## İki sayfa arasındaki ilişki

Aralarında geçiş olsun, basit bir üst gezinme yeterli. Tam bir uygulama
kabuğu kurmanız beklenmiyor ama iki sayfa kopuk durmasın.

README'de şunu anlatın: bu iki sayfayı nasıl farklılaştırdınız ve aynı
sisteme ait olduklarını nasıl korudunuz.
