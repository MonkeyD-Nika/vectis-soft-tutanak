// Tanıtım sitesi etkileşimleri. Bağımlılık yok; hareket tercihi ("azaltılmış hareket") saygı görür.
(() => {
  const S = window.SITE || {};
  const azHareket = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (s, k = document) => k.querySelector(s);
  const $$ = (s, k = document) => [...k.querySelectorAll(s)];
  const tl = (n) => new Intl.NumberFormat("tr-TR").format(n);

  // Üst çubuk: kaydırınca zemin, mobil menü
  const ust = $("#ust"), menu = $("#menu"), menuAc = $("#menuAc");
  const kay = () => ust.classList.toggle("kay", scrollY > 12);
  addEventListener("scroll", kay, { passive: true }); kay();
  menuAc.addEventListener("click", () => {
    const acik = menu.classList.toggle("acik");
    menuAc.setAttribute("aria-expanded", acik);
  });
  $$("a", menu).forEach(a => a.addEventListener("click", () => { menu.classList.remove("acik"); menuAc.setAttribute("aria-expanded", false); }));

  // Başlık kelime animasyonu gecikmeleri
  $$(".kelimeler > span").forEach((el, i) => { el.style.animationDelay = (150 + i * 90) + "ms"; });

  // Kaydırınca açılış
  const gozcu = new IntersectionObserver((kayitlar) => {
    kayitlar.forEach(k => { if (k.isIntersecting) { k.target.classList.add("goru"); gozcu.unobserve(k.target); } });
  }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
  $$("[data-ac]").forEach((el, i) => {
    el.style.setProperty("--gec", (i % 4) * 90 + "ms");
    azHareket ? el.classList.add("goru") : gozcu.observe(el);
  });

  // Kahraman penceresi: kaydırdıkça düzleşir, fareyle hafif eğilir
  const pencere = $("#pencere"), sahne = $("#sahne");
  if (pencere && !azHareket) {
    let mx = 0, my = 0;
    const ciz = () => {
      const r = sahne.getBoundingClientRect();
      const ilerleme = Math.min(1, Math.max(0, 1 - r.top / innerHeight * 1.1));
      const egim = 8 * (1 - ilerleme), olcek = .96 + .04 * ilerleme;
      pencere.style.transform = `rotateX(${egim}deg) rotateY(${mx * 2.2}deg) rotateZ(${my * -.4}deg) scale(${olcek})`;
    };
    addEventListener("scroll", () => requestAnimationFrame(ciz), { passive: true });
    sahne.addEventListener("pointermove", e => {
      const r = sahne.getBoundingClientRect();
      mx = (e.clientX - r.left) / r.width - .5; my = (e.clientY - r.top) / r.height - .5; ciz();
    });
    sahne.addEventListener("pointerleave", () => { mx = my = 0; ciz(); });
    ciz();
  }

  // Video: poster üstündeki oynat düğmesi; sessiz kalmaması için kullanıcı eylemiyle başlar
  const video = $("#tanitim"), oynat = $("#oynat");
  if (video && oynat) {
    const baslat = () => { video.preload = "auto"; video.play().catch(() => {}); };
    oynat.addEventListener("click", baslat);
    video.addEventListener("play", () => $(".video-kutu").classList.add("oynuyor"));
    video.addEventListener("pause", () => { if (video.currentTime === 0) $(".video-kutu").classList.remove("oynuyor"); });
  }

  // Fiyat kartları (ayar.js'ten)
  const f = S.fiyat || {}, hediye = S.yillikHediyeAy ?? 2, gun = S.denemeGun ?? 30;
  const PLANLAR = [
    { id: "tutanak", ad: "Tutanak", ozet: "Olay ve durum tespit tutanağı, delil arşivi.", oz: ["Resmî A4 tutanak PDF’i, canlı önizleme", "Delil dosyaları orijinal, SHA-256 otomatik", "İmzalı nüsha ve ek belge, uygulama içi önizleme", "Roller, denetim günlüğü, şifreli arşiv"] },
    { id: "kamera", ad: "Kamera", ozet: "Kamera durum izleme ve çevrimdışı kamera tutanağı.", oz: ["Kayıt cihazı ve kamera durum izleme", "Excel dökümünden kamera tutanağı", "Arıza ve kesinti istatistikleri", "IP gizleme, şifreli arşiv"] },
    { id: "pro", ad: "Pro", ozet: "Tutanak ve Kamera, tek lisansta.", oz: ["Tutanak ve Kamera’nın tüm özellikleri", "İki uygulama aynı arşiv düzeninde", "Ağ klasöründe çok kullanıcı", "Öncelikli geri bildirim"], onerilen: true }
  ];
  const kutu = $("#fiyatlar");
  if (kutu) {
    kutu.innerHTML = PLANLAR.filter(p => f[p.id] != null).map(p => {
      const ay = f[p.id], yil = ay * (12 - hediye);
      return `<article class="plan${p.onerilen ? " onerilen" : ""}" data-ac>${p.onerilen ? '<span class="etiket">En çok tercih edilen</span>' : ""}
        <h3>${p.ad}</h3><p class="ozet">${p.ozet}</p>
        <div class="tutar">${tl(ay)} ₺<small>/ ay</small></div>
        <p class="yillik">Yıllık ödemede ${tl(yil)} ₺ (${hediye} ay hediye)</p>
        <ul class="tik">${p.oz.map(x => `<li>${x}</li>`).join("")}</ul></article>`;
    }).join("");
    $$("#fiyatlar [data-ac]").forEach(el => azHareket ? el.classList.add("goru") : gozcu.observe(el));
  }
  if (S.fiyatNotu) $("#fiyatNot").textContent = S.fiyatNotu;
  $$("[data-deneme-gun]").forEach(e => e.textContent = gun);

  // Deneme / iletişim düğmeleri: yalnızca ayar.js'te bilgi varsa gösterilir
  const dd = $("#denemeDugme");
  if (!dd) return;
  const dugme = (metin, href, ikinci) => { const a = document.createElement("a"); a.className = "dugme" + (ikinci ? " dugme-ikinci" : ""); a.textContent = metin; a.href = href; return a; };
  if (S.indirmeUrl) dd.append(dugme("Kurulum paketine git", "#indir"));
  else { const a = dugme("Çok yakında", "#"); a.setAttribute("aria-disabled", "true"); dd.append(a); }
  if (S.eposta) dd.append(dugme("E-posta ile ulaşın", "mailto:" + S.eposta + "?subject=" + encodeURIComponent("Tutanak ve Delil Arşiv Sistemi — deneme talebi"), true));
  if (S.whatsapp) dd.append(dugme("WhatsApp", "https://wa.me/" + S.whatsapp, true));
  const il = $("#iletisim");
  if (S.eposta) il.insertAdjacentHTML("beforeend", `<a href="mailto:${S.eposta}">${S.eposta}</a>`);
  if (S.whatsapp) il.insertAdjacentHTML("beforeend", `<a href="https://wa.me/${S.whatsapp}">WhatsApp ile yazın</a>`);
  $$("[data-dene]").forEach(a => { if (S.indirmeUrl) { a.href = S.indirmeUrl; } });

  // Sayaçlar
  $$("[data-say]").forEach(el => {
    const hedef = +el.dataset.say; if (azHareket) return;
    new IntersectionObserver(([k], g) => {
      if (!k.isIntersecting) return; g.disconnect();
      const t0 = performance.now(), sure = 1100;
      const adim = (t) => { const p = Math.min(1, (t - t0) / sure); el.textContent = Math.round(hedef * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(adim); };
      requestAnimationFrame(adim);
    }, { threshold: .6 }).observe(el);
  });
})();
