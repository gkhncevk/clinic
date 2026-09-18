# 02 - Tasarım Yönü

Bu dosya yönü verir, sizin yerinize tasarım yapmaz. Sınırları netleştirip
içini size bırakıyoruz.

---

## Hedef izlenim

Sayfayı ilk gören biri **"bu yeni nesil, iyi düşünülmüş bir sistem"**
hissetmeli. Bunu şu üç kelime ile tarif edebiliriz:

**Sakin.** Bağırmıyor. Az renk, çok boşluk, net tipografi.
**Kurumsal.** Ciddi ve güvenilir. Sağlık ve para konuşuyoruz.
**Modern lüks.** Pahalı bir ürün hissi, ama gösterişsiz. Rafine, minimal,
tam hizalanmış. Süs yok, kalite var.

Kaçınmanız gereken iki uç var. Bir yanda soğuk, jenerik, "bootstrap 2016"
kurumsal görünüm. Diğer yanda gradyanlı, parlak, hareketli startup
estetiği. İkisi de bu ürüne yakışmaz.

---

## Renk

### Yön
Ana renk ailesi **mavi**. Kurumsal, güven veren, doygunluğu kontrollü bir
mavi. Turkuaza, mora veya bebek mavisine kaçmayın. Neon olmasın.

Yanına **tek** bir vurgu rengi koyabilirsiniz ve onu çok kıt kullanın.
Ekranda aynı anda birden fazla vurgu öğesi olmasın.

Nötrler soğuk gri olsun, saf gri değil. Yani gri tonlarında hafif mavi
bulunsun. Bu, paletin tek parça hissetmesini sağlar.

### Referans palet

Bunu **aynen kullanmak zorunda değilsiniz.** Mavi ailede kalmak ve
kontrast değerlerini ölçüp yazmak şartıyla kendi paletinizi kurabilirsiniz.
Aşağıdaki değerler ölçülmüş ve doğrulanmıştır, en azından başlangıç noktası
olarak kullanın.

**Açık tema**

| Rol | Hex | Kontrast |
|---|---|---|
| Zemin | `#FFFFFF` | - |
| Yüzey (kart, panel) | `#F7F9FC` | - |
| Ana metin | `#0C1722` | 18.08 beyaz üstünde, AAA |
| İkincil metin | `#55677D` | 5.80 beyaz üstünde, AA |
| Birincil (buton, bağlantı) | `#1557B0` | 6.95 beyaz üstünde, AA |
| Birincil hover | `#10458C` | 9.33, AAA |
| Başarı | `#10703F` | 6.16, AA |
| Uyarı | `#8A5A06` | 5.92, AA |
| Hata | `#B02620` | 6.68, AA |

**Koyu tema**

| Rol | Hex | Kontrast |
|---|---|---|
| Zemin | `#0E1520` | - |
| Yüzey 1 | `#151E2C` | - |
| Yüzey 2 (yükseltilmiş) | `#1C2738` | - |
| Ana metin | `#E8EEF6` | 15.69 zemin üstünde, AAA |
| İkincil metin | `#9AACC2` | 7.90, AAA |
| Birincil | `#6BA5F5` | 7.26, AAA |
| Başarı | `#4ED08A` | 8.54, AAA |
| Uyarı | `#E3B341` | 8.61, AAA |
| Hata | `#F87171` | 6.05, AA |

### Koyu tema kuralları

Bu konuda net olalım.

**Siyah kullanmayın.** Zemin `#000000` olmayacak, `#0A0A0A` gibi nötr
karanlık da olmayacak. Zemin **koyu lacivert-arduvaz** olacak: içinde mavi
bulunan, gözü yormayan bir karanlık. Referans paletteki `#0E1520` bunun
örneği, saf siyahla arasında sadece 1.15 fark var ama his tamamen başka.

**Metin saf beyaz olmayacak.** `#FFFFFF` koyu zeminde göz yorar ve ucuz
durur. `#E8EEF6` gibi hafif soğuk kırık beyaz kullanın.

**Derinliği gölgeyle değil yüzey basamağıyla kurun.** Koyu temada gölge
görünmez. Bunun yerine yükselen her katman bir tık daha açık olsun: zemin,
kart, açılır menü. Referans palette üç basamak var, aralarındaki fark
kasten hafif tutulmuş.

**Kenarlıklar yumuşak olsun.** `rgba(255,255,255,0.06)` ile
`rgba(255,255,255,0.12)` arası. Sert beyaz çizgi çekmeyin.

**Renkleri ters çevirmeyin.** Koyu tema, açık temanın negatifi değildir.
Aynı mavi koyu zeminde çok koyu kalır, açılması gerekir. Doygunluk da
genelde biraz düşürülür. Bu ayrı bir tasarım kararıdır ve README'de ne
değiştirdiğinizi anlatmanızı istiyoruz.

**Tema geçişi ani olmasın** ama uzun da sürmesin. Ve geçiş sırasında sayfa
beyaz parlamasın.

Tema tercihi hatırlansın. Sistem tercihi de başlangıç değeri olarak
okunsun.

---

## Tipografi

Yazı tipini siz seçin. Tek şart: **okunur olsun ve ücretsiz erişilebilir
olsun** (Google Fonts veya benzeri, `next/font` ile yerel sunulsun).

Öneri olarak: gövde ve arayüz için nötr, iyi çizilmiş bir sans (Inter,
Geist, General Sans gibi). İsterseniz halka açık sayfadaki büyük
başlıklarda ölçülü bir serif kullanabilirsiniz, bu "modern lüks" hissini
güçlendirir. Ama panelde serif kullanmayın, orada yoğunluk ve okunurluk
öncelikli.

Kurallar:

- Gövde metni **16px altına inmesin.** 14px sadece meta bilgi ve tablo içi.
- Tanımlı bir ölçek kurun, 6 ile 9 adım arası yeterli. Ara değer
  uydurmayın.
- Satır yüksekliği başlıklarda sıkı (1.1 ile 1.25), gövdede rahat
  (1.5 ile 1.65).
- Metin satır uzunluğu 65 ile 75 karakter arasında kalsın.
- **Rakamlar hizalı olsun.** Para ve sayı gösteren her yerde
  `font-variant-numeric: tabular-nums`. Panelde bu fark çok belli olur.
- Harf aralığını büyük başlıklarda hafif daraltın, küçük büyük harfli
  etiketlerde açın.

---

## Boşluk, hizalama, düzen

**Tertip bu görevin en görünür kriteri.** Kart içi öğeler birbirine
hizalanmalı, kartlar aynı yükseklikte durmalı, kolonlar tam oturmalı.
Yarım piksel kaymalar, hizasız kalan bir rozet, farklı yükseklikteki iki
kart, hepsi görünür ve hepsi not düşürür.

- Taban birim 4px. İzin verilen değerler: 4, 8, 12, 16, 20, 24, 32, 40, 48,
  64, 80.
- Ara değer uydurmayın. `padding: 13px` yok.
- Izgarada kartlar eşit yükseklikte olsun. İçerik uzunluğu değişse bile
  kart kırılmasın.
- İçerik kabı en fazla 1280px ile 1440px arası, kenarlarda en az 20px
  boşluk, mobilde 16px.
- Aynı bilgi tipi her yerde aynı hizada olsun. Fiyat hep aynı yerde, rozet
  hep aynı köşede.

### Köşe yarıçapı ve derinlik

Yarıçap ölçeği tanımlayın, 3 ile 4 adım yeterli. Mobilde kartlarda daha
geniş yarıçap kullanmak (16px ile 20px) uygulama hissini güçlendirir.

Gölge en fazla iki seviye olsun. Fazlası ucuz gösterir. Açık temada kart
ayrımında gölge yerine ince kenarlık tercih etmek daha temiz sonuç verir.

---

## Mobil: uygulama hissi

Mobil bu görevde ikinci sınıf vatandaş değil. Elçilerin çoğu telefondan
girecek.

Hedef: sayfa mobilde **küçültülmüş masaüstü sitesi gibi değil, yerel bir
uygulama gibi** hissettirsin.

Bunu sağlayan şeyler:

| Konu | Beklenen |
|---|---|
| **Filtreler** | Masaüstündeki yan panel mobilde alt sayfa (bottom sheet) olarak açılsın. Sürüklenerek kapanabilsin. Modal penceresi veya ayrı sayfa değil |
| **Kartlar** | Geniş köşe yarıçapı, kenarlardan içeri boşluklu, tek kolon, rahat dokunma alanı |
| **Dokunma hedefleri** | En az 44x44px |
| **Dokunma geri bildirimi** | Basınca kartın hafif küçülmesi veya yüzeyin değişmesi. Masaüstündeki hover mobilde işe yaramaz |
| **Başlık** | Kaydırınca küçülen veya yapışkan kalan başlık |
| **Yatay kaydırma** | Sayfa gövdesinde asla. Sadece kasıtlı yatay listelerde (kampanya kartları gibi) ve o zaman kenardan taşarak, kaydırılabilir olduğu belli olsun |
| **Alt boşluk** | Telefonun alt güvenli alanı hesaba katılsın (`env(safe-area-inset-bottom)`) |
| **Tablolar** | Mobilde tablo kullanmayın, kart listesine dönüştürün |

Panelde mobilde alt gezinme çubuğu (bottom tab bar) kullanmak isterseniz
serbest, uygulama hissini güçlendirir.

---

## Hareket

Animasyon serbest ama **işlevsel olmalı.** Bir öğenin nereden geldiğini
veya nereye gittiğini göstermeli. Dekoratif hareket istemiyoruz.

Tanımlı süreler kullanın, rastgele değil. Öneri:

| Amaç | Süre | Eğri |
|---|---|---|
| Hover, renk geçişi | 120 ile 160 ms | `ease-out` |
| Açılır menü, popover | 180 ms | `cubic-bezier(.16,1,.3,1)` |
| Alt sayfa (bottom sheet) | 280 ile 320 ms | yay hissi veren eğri |
| Görünüm değişimi, liste güncellemesi | 200 ile 250 ms | `ease-out` |
| Tema geçişi | 200 ms | `ease-in-out` |

İyi fikirler:
- Liste ilk yüklenirken kartların çok hafif kademeli girişi (öğe başına 20
  ile 40 ms, toplam 300 ms'i geçmesin)
- İskeletten içeriğe yumuşak geçiş
- Filtre etiketi eklenip çıkarken yumuşak düzen geçişi
- Izgara ve liste görünümü arasında geçişte düzen animasyonu
- Sayı değerlerinin kısa sayaç animasyonu (panelde, bir kez, abartısız)

Kaçının:
- Parallax
- Kaydırmayı ele geçiren efektler
- Zıplayan, esneyen abartılı yaylar
- 400 ms üstü geçişler
- Sayfa yüklenirken her şeyin sırayla uçarak gelmesi

**`prefers-reduced-motion: reduce` desteklensin.** Bu bir seçenek değil,
zorunluluk. Açıkken tüm anlamlı hareket kapansın.

---

## Token katmanı

Renk, tipografi ölçeği, boşluk ölçeği, yarıçaplar ve hareket süreleri CSS
değişkeni veya Tailwind teması olarak tanımlansın.

Bileşenlerde `text-[17px]`, `#3a7bd5`, `p-[13px]` gibi tek seferlik
değerler görmek istemiyoruz. **Önce sistemi kurun, sonra o sistemi
kullanın.**

README'de token'larınızı listeleyin ve kontrast oranlarını ölçüp yazın.

---

## shadcn/ui hakkında

shadcn bileşenlerini kullanın ama **varsayılan görünümde bırakmayın.**
Varsayılan shadcn görünümü bir başlangıç noktasıdır, bitmiş bir tasarım
değildir. Onu olduğu gibi teslim etmek, tasarım yapmamak demektir.

En az şunları kendinize göre ayarlayın: renk değişkenleri, yarıçap ölçeği,
buton yükseklikleri ve ağırlıkları, girdi alanı yüksekliği, odak halkası
biçimi, kart kenarlık ve gölge dili.

---

## Erişilebilirlik

Zorunluluk, ekstra değil.

- Metin kontrastı WCAG AA (normal metin 4.5:1, büyük metin 3:1). İki temada
  da ölçün ve README'ye yazın.
- Odak halkası görünür **ve tasarlanmış** olsun. `outline: none` yasak.
- Klavye ile her yere ulaşılabilsin, sekme sırası mantıklı olsun.
- Alt sayfa ve açılır menülerde odak içeride hapsedilsin, kapanınca geri
  dönsün.
- İkon butonlarında `aria-label`.
- Anlam sadece renkle taşınmasın. Durum rozetlerinde metin de olsun.
- Filtre sonucu değişince ekran okuyucuya duyurulsun (`aria-live`).
