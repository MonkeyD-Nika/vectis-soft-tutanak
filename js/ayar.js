// Sitenin TEK ayar dosyası. Yayına almadan önce yalnızca burayı doldurun; boş bırakılan alanlar sayfada gösterilmez.
window.SITE = {
  // İletişim (boşsa ilgili düğme/satır gizlenir)
  eposta: "",            // örn. "bilgi@vectissoft.com.tr"
  whatsapp: "",          // örn. "905xxxxxxxxx" (ülke kodlu, + ve boşluk olmadan)
  indirmeUrl: "https://github.com/MonkeyD-Nika/vectis-soft-tutanak/releases/download/v2.7.0/",        // kurulum paketlerinin bulunduğu klasörün adresi (sonunda / ile); boşsa "Çok yakında" gösterilir

  // Lansman fiyatları (TL, aylık). TASLAK: yayından önce sahibi onaylamalıdır.
  fiyat: {
    tutanak: 190,
    kamera: 250,
    pro: 350
  },
  yillikHediyeAy: 2,     // yıllık ödemede kaç ay hediye
  fiyatNotu: "Lansman dönemi fiyatlarıdır; ilk müşterilere fiyat kilitlenir.", // örn. "+ KDV" bilgisini de buraya ekleyin
  denemeGun: 30,

  // Kurulum paketleri (sürüm 2.7.0). Paketi yeniden derlerseniz boyut ve SHA-256 değerlerini docs/yayin/karar-ve-yayin-rehberi.md'den güncelleyin.
  surum: "2.7.0",
  paketler: [
    { ad: "Tutanak", dosya: "Tutanak_Kurulum_2.7.0.exe", boyut: 78720797, sha256: "cb7e9a361059e526ccf725d98eb544d7a97a8a2b3b23f0e36f82a402caafbff3", ozet: "Olay ve durum tespit tutanağı, delil arşivi" },
    { ad: "Kamera", dosya: "Kamera_Kurulum_2.7.0.exe", boyut: 77804470, sha256: "61cf9f3081cd6f274558c675a389f11f1d6087639aa9eff968a312412c9fecfa", ozet: "Kamera ve kayıt cihazı izleme, çevrimdışı kamera tutanağı" }
  ]
};
