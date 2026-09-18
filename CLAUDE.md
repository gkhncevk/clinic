# CLAUDE.md

ynsocial deneme görevi. Bu dosya projenin kurallarıdır, her oturumda oku.

## Proje

Sağlık turizmi yönlendirme pazar yerinin iki sayfası. Mock veri ile, sadece
arayüz. Backend yok.

1. `/clinics` : halka açık klinik listeleme, filtreli
2. `/ambassador` : marka elçisi paneli, veri yoğun

Tam tanım `docs/` klasöründe. Sırayla oku: `01-PROJE.md`,
`02-TASARIM-YONU.md`, `03-SAYFALAR.md`, `04-VERI.md`.

## Teknoloji (değiştirilemez)

- Next.js 15 veya 16, App Router
- TypeScript, `strict: true`
- React, Tailwind CSS, shadcn/ui

Yeni paket eklemeden önce sor ve gerekçesini söyle.

## Pazarlıksız kurallar

**1. Token katmanı.** Renk, tipografi, boşluk, yarıçap ve hareket süreleri
CSS değişkeni veya Tailwind teması olarak tanımlı. Bileşenlerde tek
seferlik değer yasak: `text-[17px]`, `#3a7bd5`, `p-[13px]` gibi şeyler
yazılmayacak. Önce sistem, sonra kullanım.

**2. Boşluk ölçeği.** Taban 4px. İzin verilen değerler: 4, 8, 12, 16, 20,
24, 32, 40, 48, 64, 80. Ara değer uydurma.

**3. Koyu tema saf siyah değil.** Zemin koyu lacivert-arduvaz. Metin saf
beyaz değil, kırık beyaz. Derinlik gölgeyle değil yüzey basamağıyla
kurulur. Koyu tema açık temanın negatifi değildir, ayrı tasarlanır.

**4. Gövde metni 16px altına inmez.** 14px sadece meta bilgi ve tablo içi.

**5. Para pens cinsinden tam sayı gelir.** Gösterimde `Intl.NumberFormat`
ile GBP'ye çevrilir. Ondalık sayıya çevirip saklama.

**6. Rakamlar hizalı.** Para ve sayı gösteren her yerde `tabular-nums`.

**7. Odak halkası görünür.** `outline: none` yasak. Odak halkası
tasarlanmış olacak.

**8. `use client` yaprak bileşende.** Sayfanın tamamını istemci bileşeni
yapma.

**9. `any` yasak.** Bilinmeyen için `unknown` kullan ve daralt.

**10. Mobilde tablo yok.** Kart listesine dönüştür. Yatay kaydırmalı tablo
kabul edilmez.

**11. `prefers-reduced-motion` desteklenir.** Açıkken anlamlı hareket
kapanır.

**12. Kart bileşeni tek.** Izgara ve liste düzeni aynı bileşenle çözülür,
iki ayrı bileşen yazılmaz.

## Yapma listesi

- Varsayılan shadcn görünümünü olduğu gibi bırakma. Token'lara bağla ve
  özelleştir.
- Her öğeye gölge koyma. İki gölge seviyesi yeterli, gerisi kenarlık.
- Boş durumu ve yükleme durumunu atlama. Bunlar tasarımın parçası.
- İskeleti gerçek içerikten farklı ölçüde yapma, sayfa zıplamasın.
- 400 ms üstü geçiş yazma. Parallax ve kaydırma ele geçiren efekt yok.
- Uydurma veri ekleme. Yıldız puanı, yorum sayısı, sahte istatistik yok.
  Platformda değerlendirme sistemi yok.
- Alan adlarını değiştirme. JSON'daki adlar `docs/04-VERI.md` içindeki
  gibidir.

## Çalışma düzeni

1. Göreve başlamadan önce ilgili doküman dosyasını oku.
2. Kod yazmadan önce ne yapacağını söyle.
3. Dokümanlarla çelişen bir şey görürsen uydurma, sor.
4. Her adım sonunda `pnpm typecheck` ve `pnpm lint` temiz geçmeli.
