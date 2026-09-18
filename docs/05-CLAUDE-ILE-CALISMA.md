# 05 - Claude ile Çalışma

Yapay zeka kullanımı serbest, biz de kullanıyoruz. Bu dosya, sonucun
ortalama çıkmaması için birkaç öneri veriyor.

## Temel gerçek

Yapay zekaya "klinik listeleme sayfası yap" derseniz, çalışan ama sıradan
bir sayfa alırsınız. Varsayılan çıktı her zaman ortalamadır: jenerik mavi,
her yerde aynı gölge, dengesiz boşluklar, düşünülmemiş boş durumlar.

Değerlendirirken bunu görürüz. Aradaki fark, sizin verdiğiniz yönde ve
yaptığınız düzeltmelerde ortaya çıkar.

## Kurulum

Repo köküne `CLAUDE.md` dosyasını koyun (bu pakette var) ve `docs/`
klasörünü de projeye dahil edin. Claude Code her oturumda `CLAUDE.md`
dosyasını okur.

## Çalışma sırası

Tek seferde her şeyi isteme. Şu sırayla ilerleyin, her adımı gözden
geçirip düzelterek:

1. **Proje iskeleti.** Next.js kurulumu, TypeScript, Tailwind, shadcn.
2. **Token katmanı.** Renk, tipografi, boşluk, yarıçap, hareket. İkisi de
   tema. Bu adımı kendiniz kararlaştırın, yapay zekaya seçtirmeyin.
   Sistemin karakteri burada belirlenir.
3. **Tek bir bileşen: klinik kartı.** Sadece bu. Doğru olana kadar
   üzerinde çalışın. Kart doğruysa sayfanın yarısı doğrudur.
4. **Izgara ve boş durumlar.**
5. **Filtre sistemi.**
6. **Mobil davranış ve alt sayfa.**
7. **Elçi paneli.**
8. **Cila:** hareket, odak halkaları, hizalama düzeltmeleri.

## İyi sonuç veren istekler

Belirsiz istek yerine ölçülebilir istek verin.

Zayıf:
> Kartı daha güzel yap

Güçlü:
> Kartta üç bilgi seviyesi olsun: klinik adı birincil, şehir ve kategori
> ikincil, fiyat ve güven sinyalleri üçüncül. İkincil metin `muted` rengi
> kullansın. Kart içi dikey boşluklar 4px ölçeğine uysun. Rozet sağ üstte
> sabit konumda dursun, içerik uzunluğundan etkilenmesin.

Zayıf:
> Koyu tema ekle

Güçlü:
> Koyu tema ekle. Zemin `#0E1520`, yüzey `#151E2C`, yükseltilmiş yüzey
> `#1C2738`. Metin `#E8EEF6`, ikincil `#9AACC2`. Saf siyah ve saf beyaz
> kullanma. Derinliği gölge ile değil yüzey açıklığı ile kur. Kenarlıklar
> `rgba(255,255,255,0.08)`. Birincil mavi koyu temada `#6BA5F5` olsun,
> açık temadaki tonu olduğu gibi taşıma.

Fark, ikincisinde kararı sizin vermiş olmanız.

## Kontrol listesi

Yapay zekanın ürettiği her ekranda şunları kendiniz kontrol edin, çünkü en
sık burada hata yapar:

- [ ] Kartlar aynı yükseklikte mi, içerik uzunluğu değişince bozuluyor mu
- [ ] Boşluklar ölçeğe uyuyor mu, yoksa rastgele değerler mi girmiş
- [ ] Odak halkası var mı, `outline: none` yazmış mı
- [ ] Boş durum gerçekten tasarlanmış mı, yoksa "No results" yazıp geçmiş mi
- [ ] İskelet gerçek içerik ölçüsünde mi, yoksa sayfa zıplıyor mu
- [ ] Koyu temada kontrast düşmüş mü
- [ ] 375px'te yatay kaydırma var mı
- [ ] Dokunma hedefleri 44px'i geçiyor mu
- [ ] Rakamlar hizalı mı (`tabular-nums`)
- [ ] `use client` sayfanın tepesine mi konmuş
- [ ] `any` tipi var mı
- [ ] Token yerine tek seferlik değer kullanmış mı

Son üç madde için `grep` yeterli. Biz de aynı aramaları yapacağız.

## Kaçınılacak tuzaklar

**Token'ları yazıp kullanmamak.** Yapay zeka `globals.css` içine güzel bir
token seti yazar, sonra bileşenlerde `bg-blue-600` kullanır. İkisi
birbirini tutmaz. Kontrol edin.

**Her şeye gölge koymak.** Varsayılan eğilim budur. İki gölge seviyesi
yeterli, gerisi kenarlık.

**Koyu temayı `dark:` sınıflarıyla makine gibi eklemek.** Sonuç teknik
olarak çalışır ama tasarlanmış hissettirmez.

**Aşırı animasyon.** İstenmeden her şeye geçiş efekti eklenir. Silin.

**Boş durumu unutmak.** Neredeyse her zaman atlanır.

## Başlangıç promtu

İlk oturum için kullanabileceğiniz bir metin:

```
Bu projenin tanımı docs/ klasöründe. Kod yazmadan önce şu dosyaları oku:
CLAUDE.md, docs/01-PROJE.md, docs/02-TASARIM-YONU.md, docs/03-SAYFALAR.md,
docs/04-VERI.md.

Bu oturumda sadece şunu yapacağız: proje kurulumu ve tasarım token
katmanı. Sayfa yapmayacağız, bileşen yazmayacağız.

Önce bana token planını sun ve onayımı bekle: renk paleti (açık ve koyu
tema, hex değerleriyle), tipografi ölçeği, boşluk ölçeği, yarıçaplar,
hareket süreleri. Her renk çifti için kontrast oranını da hesapla ve yaz.

docs/02-TASARIM-YONU.md içindeki referans paleti başlangıç noktası olarak
al ama körü körüne kopyalama, gerekçeli öneriler getir.

Onay verdikten sonra bunları Tailwind teması ve CSS değişkeni olarak kur,
shadcn bileşenlerini bu token'lara bağla.

Kural: bileşenlerde tek seferlik değer kullanma. Her renk, boyut ve boşluk
token'dan gelecek.
```

## Dürüstlük

README'de hangi araçları nasıl kullandığınızı kısaca yazın. Bu bir eksi
değil. Bizim için önemli olan çalışma biçiminizi anlamak.

Yapay zekanın yazdığı bir şeyi anlamadan teslim etmeyin. Teslim sonrası
kısa bir görüşme yapacağız ve kararlarınızı soracağız.
