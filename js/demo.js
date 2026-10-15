// Vectis Soft tanıtım sitesi — interaktif demolar. Bağımlılık yok. Tüm veriler kurgusaldır; hareket azaltma tercihi ve görünmeyen bölümlerde duraklatma uygulanır.
(() => {
  const $ = (s, k = document) => k.querySelector(s);
  const $$ = (s, k = document) => [...k.querySelectorAll(s)];
  const az = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const S = window.SITE || {};
  const el = (t, a = {}, ...c) => { const e = document.createElement(t); for (const [k, v] of Object.entries(a)) k === "class" ? e.className = v : k === "html" ? e.innerHTML = v : k.startsWith("on") ? e.addEventListener(k.slice(2), v) : e.setAttribute(k, v); c.flat().forEach(x => e.append(x)); return e; };
  const hex = async (m) => [...new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(m)))].map(b => b.toString(16).padStart(2, "0")).join("");
  // Bir bölüm ekranda değilken zamanlayıcılar çalışmaz (düşük güçlü cihazlar için)
  const gorunur = new Map();
  const izle = (e) => { new IntersectionObserver(([k]) => gorunur.set(e, k.isIntersecting), { threshold: .05 }).observe(e); gorunur.set(e, false); };
  const sayac = (e, ms, f) => setInterval(() => { if (gorunur.get(e) && !document.hidden) f(); }, ms);
  const grup = (kap, secenekler, ilk, degisti, ortak = "") => {
    let sec = ilk;
    const ciz = () => $$("button", kap).forEach(b => b.setAttribute("aria-pressed", b.dataset.k === sec));
    secenekler.forEach(([k, ad, renk]) => kap.append(el("button", { class: "cipb", type: "button", "data-k": k, "aria-pressed": "false", onclick: () => { sec = k; ciz(); degisti(k); } }, renk ? el("i", { class: "nokta", style: `background:${renk}` }) : "", ad)));
    ciz(); return { al: () => sec, koy: (k) => { sec = k; ciz(); } };
  };

  // ================= canlı uygulama =================
  const TEMALAR = {
    slate: ["Enterprise Slate", "#0f1217", "#181c24", "#e6e9ef", "#262b36", "#0b0e13", "#0e639c", "6px", "5px", "'Segoe UI',system-ui,sans-serif"],
    radar: ["Radar", "#031208", "#08200f", "#b6ffc9", "#14452a", "#020a05", "#3ddc84", "0px", "0px", "'Cascadia Mono',Consolas,monospace"],
    kiraz: ["Kiraz Çiçeği", "#fff0f3", "#ffffff", "#4a1020", "#f8d2da", "#7f1d32", "#be123c", "16px", "12px", "Palatino,Georgia,serif"],
    kagit: ["Kâğıt ve Mürekkep", "#f4eee2", "#fbf7ee", "#2b2118", "#e0d5bf", "#3a2c1e", "#8a4b1e", "3px", "2px", "Georgia,'Times New Roman',serif"],
    mavi: ["Mavi Saat", "#0b1530", "#12204a", "#e0e8ff", "#233468", "#070e22", "#6e8bff", "8px", "8px", "'Segoe UI',system-ui,sans-serif"],
    bakir: ["Bakır Atölye", "#1b130e", "#261b14", "#f0e1d2", "#4a3426", "#120c08", "#c8743a", "4px", "3px", "'Franklin Gothic Medium','Segoe UI',sans-serif"],
    nane: ["Nane Şekeri", "#ecf9f3", "#ffffff", "#12362a", "#cbebdd", "#14523f", "#047857", "14px", "12px", "Candara,'Segoe UI',sans-serif"],
    oled: ["OLED Mavi", "#000000", "#0a0a12", "#dde6ff", "#1a1a2e", "#000000", "#4f7cff", "12px", "10px", "'Segoe UI',system-ui,sans-serif"],
    volkan: ["Volkan", "#140808", "#201010", "#f7e3de", "#432220", "#0c0404", "#e5483a", "4px", "3px", "'Franklin Gothic Medium','Segoe UI',sans-serif"],
    kum: ["Kum Fırtınası", "#f7efe0", "#fffbf2", "#4a3520", "#e8d7b8", "#5a3e22", "#c2542d", "6px", "5px", "Constantia,Georgia,serif"],
    gri: ["Gri Kağıt", "#f2f2f2", "#ffffff", "#202020", "#dadada", "#2b2b2b", "#be123c", "2px", "2px", "'Segoe UI',system-ui,sans-serif"],
    siber: ["Siber Mor", "#0d0716", "#160e24", "#ebddff", "#30204f", "#08040f", "#a855f7", "10px", "8px", "Bahnschrift,'Segoe UI',sans-serif"]
  };
  const DUZEN = [["kenar", "Kenar çubuğu"], ["genis", "Geniş kenar"], ["ust", "Üst gezinti"], ["serit", "Simge şeridi"], ["sag", "Sağ panel"], ["sagserit", "Sağ şerit"], ["dock", "Alt dock"]];
  const TEMA_DUZEN = { slate: "kenar", radar: "serit", kiraz: "genis", kagit: "ust", mavi: "genis", bakir: "sagserit", nane: "sagserit", oled: "dock", volkan: "kenar", kum: "genis", gri: "ust", siber: "dock" };
  const TEMA_PANEL = { kenar: "izgara", genis: "ters", ust: "akis", serit: "sutun", sag: "ters", sagserit: "akis", dock: "sutun" };
  const L = {
    tr: { panel: "Kontrol paneli", stat: "İstatistik", yeni: "Yeni olay", arsiv: "Olay arşivi", denetim: "Güvenlik ve denetim", gun: "Günaydın", alt: "gündüz vardiyası", bugun: "Bugün", ay: "Bu ay", imza: "İmza bekleyen", delil: "Dijital delil", son: "Son olaylar", bek: "İmza bekleyenler", dag: "Olay türü dağılımı", btn: "+ Yeni olay tutanağı", tara: "İmzalı nüsha tara", arsivT: "Olay arşivi", f1: "Konu", f2: "Olay yeri", f3: "Tarih", kaydet: "Kaydet ve arşivle", ok: "Islak imzalı nüsha arşivde", d: "Düzenlendi", y: "Yeni olay tutanağı" },
    en: { panel: "Dashboard", stat: "Statistics", yeni: "New incident", arsiv: "Incident archive", denetim: "Security & audit", gun: "Good morning", alt: "day shift", bugun: "Today", ay: "This month", imza: "Awaiting signature", delil: "Digital evidence", son: "Recent incidents", bek: "Awaiting signature", dag: "Incident types", btn: "+ New incident report", tara: "Scan signed copy", arsivT: "Incident archive", f1: "Subject", f2: "Location", f3: "Date", kaydet: "Save and archive", ok: "Signed copy archived", d: "Edited", y: "New incident report" },
    de: { panel: "Übersicht", stat: "Statistik", yeni: "Neues Ereignis", arsiv: "Ereignisarchiv", denetim: "Sicherheit & Audit", gun: "Guten Morgen", alt: "Tagschicht", bugun: "Heute", ay: "Dieser Monat", imza: "Unterschrift offen", delil: "Digitale Beweise", son: "Letzte Ereignisse", bek: "Unterschrift offen", dag: "Ereignisarten", btn: "+ Neues Ereignisprotokoll", tara: "Unterschriebene Kopie scannen", arsivT: "Ereignisarchiv", f1: "Betreff", f2: "Ort", f3: "Datum", kaydet: "Speichern und archivieren", ok: "Unterschriebene Kopie archiviert", d: "Bearbeitet", y: "Neues Ereignisprotokoll" },
    fr: { panel: "Tableau de bord", stat: "Statistiques", yeni: "Nouvel incident", arsiv: "Archive des incidents", denetim: "Sécurité et audit", gun: "Bonjour", alt: "équipe de jour", bugun: "Aujourd'hui", ay: "Ce mois-ci", imza: "Signature en attente", delil: "Preuves numériques", son: "Derniers incidents", bek: "Signature en attente", dag: "Types d'incidents", btn: "+ Nouveau procès-verbal", tara: "Numériser l'exemplaire signé", arsivT: "Archive des incidents", f1: "Objet", f2: "Lieu", f3: "Date", kaydet: "Enregistrer et archiver", ok: "Exemplaire signé archivé", d: "Modifié", y: "Nouveau procès-verbal" },
    es: { panel: "Panel", stat: "Estadísticas", yeni: "Nuevo incidente", arsiv: "Archivo de incidentes", denetim: "Seguridad y auditoría", gun: "Buenos días", alt: "turno de día", bugun: "Hoy", ay: "Este mes", imza: "Firma pendiente", delil: "Pruebas digitales", son: "Últimos incidentes", bek: "Firma pendiente", dag: "Tipos de incidente", btn: "+ Nueva acta de incidente", tara: "Escanear copia firmada", arsivT: "Archivo de incidentes", f1: "Asunto", f2: "Lugar", f3: "Fecha", kaydet: "Guardar y archivar", ok: "Copia firmada archivada", d: "Editado", y: "Nueva acta de incidente" },
    ru: { panel: "Панель", stat: "Статистика", yeni: "Новое происшествие", arsiv: "Архив происшествий", denetim: "Безопасность и аудит", gun: "Доброе утро", alt: "дневная смена", bugun: "Сегодня", ay: "В этом месяце", imza: "Ждут подписи", delil: "Цифровые доказательства", son: "Последние происшествия", bek: "Ждут подписи", dag: "Виды происшествий", btn: "+ Новый протокол", tara: "Сканировать подписанный экземпляр", arsivT: "Архив происшествий", f1: "Тема", f2: "Место", f3: "Дата", kaydet: "Сохранить и архивировать", ok: "Подписанный экземпляр в архиве", d: "Изменён", y: "Новый протокол" }
  };
  const OLAYLAR = [["TUT-2026-0001", "12.10", "Yetkisiz giriş girişimi", "B Blok otopark", "ok"], ["TUT-2026-0002", "11.10", "Araç çarpması ve maddi hasar", "Kapalı otopark", "d"], ["TUT-2026-0003", "10.10", "Şüpheli kişi dolaşması", "A Blok çevresi", "m"], ["TUT-2026-0004", "08.10", "Asansörde mahsur kalma", "C Blok asansör", "ok"], ["TUT-2026-0005", "07.10", "Hırsızlık şüphesi — bisiklet", "Bisiklet park alanı", "s"]];
  const mapp = $("#mapp");
  if (mapp) {
    const st = { tema: "slate", duzen: "kenar", panel: "izgara", dil: "tr", dugme: "", kart: "", yog: "", sayfa: "panel" };
    const kabuk = $("#mkabuk"), menu = $("#mmenu"), ic = $("#micerik");
    const MENU = [["panel", "⌂", "panel"], ["stat", "▥", "stat"], ["yeni", "＋", "yeni"], ["arsiv", "▤", "arsiv"], ["denetim", "🔒", "denetim"]];
    let sayilar = { b: 0, a: 8, i: 10, d: 5 };
    const uygula = () => {
      const t = TEMALAR[st.tema]; const stl = mapp.style;
      [["--d-bg", t[1]], ["--d-panel", t[2]], ["--d-ink", t[3]], ["--d-line", t[4]], ["--d-menu", t[5]], ["--d-acc", t[6]], ["--d-font", t[9]]].forEach(([k, v]) => stl.setProperty(k, v));
      const koyu = parseInt(t[1].slice(1, 3), 16) < 128; stl.setProperty("--d-ink2", koyu ? "color-mix(in srgb, " + t[3] + " 62%, " + t[1] + ")" : "color-mix(in srgb, " + t[3] + " 60%, " + t[1] + ")");
      const rb = { hap: "999px", keskin: "0px", yumusak: "10px" }[st.dugme] ?? t[8], rk = st.kart === "keskinkart" ? "0px" : t[7];
      stl.setProperty("--d-rb", rb); stl.setProperty("--d-rk", rk);
      stl.setProperty("--d-pad", { ferah: "22px", siki: "10px" }[st.yog] ?? "16px");
      stl.setProperty("--d-kenar", st.kart === "duz" ? "0px" : st.kart === "cizgili" ? "2px" : "1px");
      stl.setProperty("--d-golge", st.kart === "golgeli" ? "0 10px 26px rgba(0,0,0,.45)" : "none");
      kabuk.dataset.duzen = st.duzen; ciz();
    };
    const ciz = () => {
      const m = L[st.dil];
      menu.replaceChildren(el("div", { class: "mapp-marka" }, el("b", {}, "V"), el("span", {}, "Vectis Soft")),
        ...MENU.map(([k, g, ad]) => el("button", { class: "mapp-oge", type: "button", "aria-current": st.sayfa === k ? "page" : "false", onclick: () => { st.sayfa = k; ciz(); } }, el("span", { class: "g" }, g), el("span", { class: "y" }, m[ad]))));
      const stat = [[m.bugun, sayilar.b, "", ""], [m.ay, sayilar.a, "", ""], [m.imza, sayilar.i, "uyari", ""], [m.delil, sayilar.d, "", ""]];
      const kartlar = el("div", { class: "mapp-stats" }, ...stat.map(([a, n, c]) => el("div", { class: "mkart " + c }, el("small", {}, a), el("strong", { "data-n": n }, String(n)), el("span", {}, "■■■□"))));
      const liste = el("div", { class: "mkart mapp-liste" }, el("h5", {}, m.son), ...OLAYLAR.map(([no, t, k, y, d]) => el("div", { class: "mrow" }, el("b", {}, no.slice(-9)), el("div", {}, k, el("br"), el("em", {}, t + ".2026 · " + y)), el("span", { class: "metiket " + (d === "ok" ? "" : d === "d" ? "m" : "s") }, d === "ok" ? m.ok : d === "d" ? m.d : "İmzada"))));
      const yan = el("div", { class: "mapp-yan" },
        el("div", { class: "mkart" }, el("h5", {}, m.bek), ...OLAYLAR.slice(0, 4).map(([no, t, k]) => el("div", { class: "mrow", style: "grid-template-columns:auto 1fr" }, el("b", {}, no.slice(-4)), el("span", {}, k)))),
        el("div", { class: "mkart" }, el("h5", {}, m.dag), ...[["Teknik Arıza", 2], ["Yetkisiz Giriş", 1], ["Maddi Hasar", 1]].map(([a, n]) => el("div", {}, el("div", { class: "mbarad" }, el("span", {}, a), el("span", {}, n)), el("div", { class: "mbar" }, el("i", { "data-w": n * 48 + "%" }))))));
      let sayfa;
      if (st.sayfa === "yeni") sayfa = el("div", { class: "mapp-sayfa acik" }, el("div", { class: "mapp-ust" }, el("div", {}, el("h4", {}, m.y), el("p", {}, "TUT-2026-0011"))),
        el("div", { class: "form" }, el("label", {}, m.f1, el("input", { value: "Yetkisiz giriş girişimi" })), el("label", {}, m.f2, el("input", { value: "B Blok otopark" })), el("label", {}, m.f3, el("input", { value: "15.10.2026" })), el("div", {}, el("button", { class: "mapp-btn", type: "button", onclick: () => { st.sayfa = "arsiv"; ciz(); } }, m.kaydet))));
      else if (st.sayfa === "arsiv" || st.sayfa === "denetim") sayfa = el("div", { class: "mapp-sayfa acik" }, el("div", { class: "mapp-ust" }, el("div", {}, el("h4", {}, m[st.sayfa === "arsiv" ? "arsivT" : "denetim"]))), el("div", { class: "mkart" }, ...OLAYLAR.map(([no, t, k, y, d]) => el("div", { class: "mrow" }, el("b", {}, no), el("div", {}, k, el("br"), el("em", {}, y)), el("span", { class: "metiket" }, "SHA-256 ✓")))));
      else sayfa = el("div", { class: "mapp-sayfa acik" }, el("div", { class: "mapp-ust" }, el("div", {}, el("h4", {}, st.sayfa === "stat" ? m.stat : m.gun), el("p", {}, "15.10.2026 · " + m.alt)), el("div", {}, el("button", { class: "mapp-btn ik", type: "button" }, m.tara), el("button", { class: "mapp-btn", type: "button", onclick: () => { st.sayfa = "yeni"; ciz(); } }, m.btn))),
        el("div", { class: "mapp-govde " + st.panel }, kartlar, liste, yan));
      ic.replaceChildren(sayfa);
      requestAnimationFrame(() => $$("[data-w]", ic).forEach(b => b.style.width = b.dataset.w));
      if (!az) $$("[data-n]", ic).forEach(e => { const h = +e.dataset.n, t0 = performance.now(); const f = (t) => { const p = Math.min(1, (t - t0) / 700); e.textContent = Math.round(h * (1 - (1 - p) ** 3)); if (p < 1) requestAnimationFrame(f); }; requestAnimationFrame(f); });
    };
    const gT = grup($("#dTema"), Object.entries(TEMALAR).map(([k, v]) => [k, v[0], v[6]]), "slate", k => { st.tema = k; st.duzen = TEMA_DUZEN[k]; st.panel = TEMA_PANEL[st.duzen]; gD.koy(st.duzen); gP.koy(st.panel); uygula(); });
    const gD = grup($("#dDuzen"), DUZEN, "kenar", k => { st.duzen = k; uygula(); });
    const gP = grup($("#dPanel"), [["izgara", "Izgara"], ["sutun", "Sayaç sütunu"], ["akis", "Akış"], ["ters", "Ters"]], "izgara", k => { st.panel = k; ciz(); });
    grup($("#dDil"), [["tr", "Türkçe"], ["en", "English"], ["de", "Deutsch"], ["fr", "Français"], ["es", "Español"], ["ru", "Русский"]], "tr", k => { st.dil = k; ciz(); });
    grup($("#dDugme"), [["", "Temaya göre"], ["hap", "Hap"], ["yumusak", "Yumuşak"], ["keskin", "Keskin"]], "", k => { st.dugme = k; uygula(); });
    grup($("#dKart"), [["", "Temaya göre"], ["duz", "Çizgisiz"], ["cizgili", "Kalın çizgi"], ["golgeli", "Gölgeli"], ["keskinkart", "Köşesiz"]], "", k => { st.kart = k; uygula(); });
    grup($("#dYog"), [["", "Normal"], ["ferah", "Ferah"], ["siki", "Sıkı"]], "", k => { st.yog = k; uygula(); });
    uygula(); izle(mapp);
    sayac(mapp, 3500, () => { if (st.sayfa !== "panel") return; sayilar.b = Math.random() < .35 ? sayilar.b + 1 : sayilar.b; sayilar.i = Math.max(0, sayilar.i + (Math.random() < .5 ? 1 : -1)); const n = $$("[data-n]", ic); if (n[0]) { n[0].textContent = sayilar.b; n[2].textContent = sayilar.i; } });
  }

  // ================= belge düzenleyici =================
  const BD = {
    tr: { baslik: "Olay Tutanağı", kurum: "Vectis Güvenlik Hizmetleri Ltd. Şti.", belge: "BELGE NO", tanzim: "TANZİM TARİH / SAAT", bilgi: "Olay bilgileri", personel: "Tutanağı düzenleyenler", taraf: "İlgili kişiler", anlatim: "Olayın oluş şekli", kamera: "Kamera kayıtları", kapanis: "Kapanış cümlesi", imza: "İmzalar", tarih: "Tarih", saat: "Saat", konu: "Konu", yer: "Olay Yeri", ad: "AD SOYAD", gorev: "GÖREV", metin: "Olay günü saat 02:15 sıralarında B Blok otopark giriş bariyerinde, kimliği belirsiz bir kişinin bariyer kolunun altından geçerek siteye girdiği tespit edilmiştir.", kmetin: "Olaya ilişkin 1 adet kamera kaydı, orijinal ad ve formatıyla değiştirilmeden arşive alınmıştır.", kapmetin: "İşbu tutanak, olayın kayıt altına alınması amacıyla düzenlenmiş olup imza altına alınmıştır.", delil: "Dijital delil bütünlük özeti", sayfa: "Sayfa", ozel: "Yeni bölüm", ozelm: "Metni buraya yazın." },
    en: { baslik: "Incident Report", kurum: "Vectis Security Services Ltd.", belge: "DOCUMENT NO", tanzim: "ISSUED DATE / TIME", bilgi: "Incident details", personel: "Report prepared by", taraf: "Persons concerned", anlatim: "How the incident occurred", kamera: "Camera recordings", kapanis: "Closing statement", imza: "Signatures", tarih: "Date", saat: "Time", konu: "Subject", yer: "Location", ad: "FULL NAME", gorev: "POSITION", metin: "At about 02:15 on the day of the incident, an unidentified person was seen passing under the barrier arm at the B Block car park entrance and entering the site.", kmetin: "1 camera recording related to the incident was added to the archive unaltered, with its original name and format.", kapmetin: "This report was prepared to put the incident on record and has been signed.", delil: "Digital evidence integrity summary", sayfa: "Page", ozel: "New section", ozelm: "Type your text here." },
    de: { baslik: "Ereignisprotokoll", kurum: "Vectis Sicherheitsdienste GmbH", belge: "DOKUMENTNR.", tanzim: "AUSGESTELLT AM / UM", bilgi: "Ereignisdaten", personel: "Verfasser des Protokolls", taraf: "Beteiligte Personen", anlatim: "Hergang des Ereignisses", kamera: "Kameraaufzeichnungen", kapanis: "Schlussformel", imza: "Unterschriften", tarih: "Datum", saat: "Uhrzeit", konu: "Betreff", yer: "Ereignisort", ad: "NAME", gorev: "FUNKTION", metin: "Gegen 02:15 Uhr wurde am Einfahrtsschranken der Tiefgarage Block B festgestellt, dass eine unbekannte Person unter der Schranke hindurch auf das Gelände gelangte.", kmetin: "1 Kameraaufzeichnung zum Ereignis wurde unverändert mit Originalnamen und -format ins Archiv übernommen.", kapmetin: "Dieses Protokoll wurde zur Dokumentation des Ereignisses erstellt und unterzeichnet.", delil: "Integritätsübersicht der digitalen Beweismittel", sayfa: "Seite", ozel: "Neuer Abschnitt", ozelm: "Text hier eingeben." },
    fr: { baslik: "Procès-verbal d'incident", kurum: "Vectis Services de Sécurité SARL", belge: "N° DE DOCUMENT", tanzim: "DATE / HEURE D'ÉTABLISSEMENT", bilgi: "Informations sur l'incident", personel: "Rédacteurs du procès-verbal", taraf: "Personnes concernées", anlatim: "Déroulement des faits", kamera: "Enregistrements des caméras", kapanis: "Formule de clôture", imza: "Signatures", tarih: "Date", saat: "Heure", konu: "Objet", yer: "Lieu de l'incident", ad: "NOM ET PRÉNOM", gorev: "FONCTION", metin: "Vers 02h15, une personne non identifiée a été vue passant sous la barrière d'entrée du parking du bloc B et pénétrant sur le site.", kmetin: "1 enregistrement de caméra relatif à l'incident a été versé à l'archive sans modification.", kapmetin: "Le présent procès-verbal a été établi pour consigner l'incident et a été signé.", delil: "Récapitulatif d'intégrité des preuves numériques", sayfa: "Page", ozel: "Nouvelle section", ozelm: "Saisissez le texte ici." },
    es: { baslik: "Acta de incidente", kurum: "Vectis Servicios de Seguridad S.L.", belge: "N.º DE DOCUMENTO", tanzim: "FECHA / HORA DE EMISIÓN", bilgi: "Datos del incidente", personel: "Redactores del acta", taraf: "Personas implicadas", anlatim: "Forma en que ocurrió el incidente", kamera: "Grabaciones de cámaras", kapanis: "Cláusula de cierre", imza: "Firmas", tarih: "Fecha", saat: "Hora", konu: "Asunto", yer: "Lugar del incidente", ad: "NOMBRE Y APELLIDOS", gorev: "CARGO", metin: "Hacia las 02:15 se observó a una persona no identificada pasando bajo la barrera de entrada del aparcamiento del bloque B y accediendo al recinto.", kmetin: "1 grabación de cámara relativa al incidente se incorporó al archivo sin alteración.", kapmetin: "La presente acta se redactó para dejar constancia del incidente y ha sido firmada.", delil: "Resumen de integridad de pruebas digitales", sayfa: "Página", ozel: "Nueva sección", ozelm: "Escriba el texto aquí." },
    ru: { baslik: "Протокол происшествия", kurum: "ООО «Вектис Охранные услуги»", belge: "№ ДОКУМЕНТА", tanzim: "ДАТА / ВРЕМЯ СОСТАВЛЕНИЯ", bilgi: "Сведения о происшествии", personel: "Составители протокола", taraf: "Заинтересованные лица", anlatim: "Обстоятельства происшествия", kamera: "Записи камер", kapanis: "Заключительная фраза", imza: "Подписи", tarih: "Дата", saat: "Время", konu: "Тема", yer: "Место происшествия", ad: "ФИО", gorev: "ДОЛЖНОСТЬ", metin: "Около 02:15 неустановленное лицо прошло под шлагбаумом на въезде на парковку блока B и проникло на территорию.", kmetin: "Запись камеры по происшествию помещена в архив без изменений.", kapmetin: "Настоящий протокол составлен для фиксации происшествия и подписан.", delil: "Сводка целостности цифровых доказательств", sayfa: "Стр.", ozel: "Новый раздел", ozelm: "Введите текст здесь." }
  };
  const a4 = $("#a4");
  if (a4) {
    let dil = "tr", sec = null, sayac2 = 0;
    const bloklar = [["bilgi"], ["personel"], ["taraf"], ["anlatim"], ["kamera"], ["kapanis"], ["imza"]].map(([id]) => ({ id, gizli: false, boyut: 1, baslik: null }));
    const govde = (b, d) => ({
      bilgi: `<table><tr><td><b>${d.tarih}</b></td><td>15.10.2026</td></tr><tr><td><b>${d.saat}</b></td><td>02:15</td></tr><tr><td><b>${d.konu}</b></td><td>Yetkisiz giriş girişimi</td></tr><tr><td><b>${d.yer}</b></td><td>B Blok otopark giriş bariyeri</td></tr></table>`,
      personel: `<table><tr><th>${d.ad}</th><th>${d.gorev}</th></tr><tr><td>Ahmet Yılmaz</td><td>CCTV</td></tr></table>`,
      taraf: `<table><tr><th>${d.ad}</th><th>${d.gorev}</th></tr><tr><td>Mustafa Aksu</td><td>—</td></tr></table>`,
      anlatim: `<p>${d.metin}</p>`, kamera: `<p>${d.kmetin}</p><div class="a4-delil"><b>${d.delil}</b><br><code>BARIYER-02_20261012.mp4 · SHA-256 9f3a…c41e</code></div>`,
      kapanis: `<p>${d.kapmetin}</p>`, imza: `<div class="a4-imza"><div>Ahmet Yılmaz<small>CCTV</small></div><div>Mehmet Kaya<small>Vardiya Amiri</small></div><div>Mustafa Aksu<small>—</small></div></div>`
    })[b.id];
    const ciz = () => {
      const d = BD[dil];
      $("#bListe").replaceChildren(...bloklar.map((b, i) => {
        const satir = el("div", { class: "blok-sat" + (b.gizli ? " gizli" : ""), "data-i": i },
          el("span", { class: "tut", title: "Sürükleyin", "aria-hidden": "true" }, "⋮⋮"),
          el("span", { style: "overflow:hidden;text-overflow:ellipsis;white-space:nowrap" }, b.baslik ?? d[b.id] ?? b.baslikOzel ?? d.ozel),
          el("button", { class: "ik-d", type: "button", "aria-label": "Yukarı", onclick: () => tasi(i, i - 1) }, "▲"),
          el("button", { class: "ik-d", type: "button", "aria-label": "Aşağı", onclick: () => tasi(i, i + 1) }, "▼"),
          el("span", {}, el("button", { class: "ik-d", type: "button", "aria-label": "Küçült", onclick: () => { b.boyut = Math.max(.8, b.boyut - .1); ciz(); } }, "A−"), el("button", { class: "ik-d", type: "button", "aria-label": "Büyüt", onclick: () => { b.boyut = Math.min(1.5, b.boyut + .1); ciz(); } }, "A+"), el("button", { class: "ik-d", type: "button", "aria-label": b.gizli ? "Göster" : "Gizle", onclick: () => { b.gizli = !b.gizli; ciz(); } }, b.gizli ? "◌" : "◉"), b.ozel ? el("button", { class: "ik-d", type: "button", "aria-label": "Sil", onclick: () => { bloklar.splice(i, 1); ciz(); } }, "✕") : ""));
        satir.addEventListener("click", e => { if (!e.target.closest("button")) { sec = b; ciz(); } });
        surukle(satir.querySelector(".tut"), satir, i);
        return satir;
      }), el("button", { class: "belge-ekle", type: "button", onclick: () => { const b = { id: "ozel" + (++sayac2), ozel: true, gizli: false, boyut: 1, baslik: null, baslikOzel: BD[dil].ozel, metin: BD[dil].ozelm }; bloklar.splice(bloklar.length - 1, 0, b); sec = b; ciz(); } }, "+ Başlık ve metin ekle"));
      a4.replaceChildren(
        el("div", { class: "a4-ust" }, el("div", {}, el("h6", {}, d.kurum), el("small", {}, "CCTV · " + d.baslik.toUpperCase())), el("div", { class: "a4-no" }, el("i"), el("div", {}, el("span", {}, d.belge), el("b", {}, "TUT-2026-0001")), el("div", {}, el("span", {}, d.tanzim), el("b", {}, "15.10.2026 09:40")))),
        ...bloklar.filter(b => !b.gizli).map(b => {
          const baslik = el("h7", { contenteditable: "true", spellcheck: "false", "aria-label": "Başlık" }, b.baslik ?? (b.ozel ? b.baslikOzel : d[b.id]).toUpperCase());
          baslik.addEventListener("input", () => { b.baslik = baslik.textContent; $$(".blok-sat span:nth-child(2)", $("#bListe"))[bloklar.indexOf(b)].textContent = b.baslik; });
          const kutu = el("section", { class: "a4-blok" + (sec === b ? " sec" : ""), style: `font-size:${(13 * b.boyut).toFixed(1)}px`, onclick: () => { sec = b; $$(".a4-blok", a4).forEach(x => x.classList.remove("sec")); kutu.classList.add("sec"); } });
          if (b.id !== "imza" && b.id !== "kapanis") kutu.append(baslik);
          if (b.id === "imza") kutu.append(el("h7", {}, d.imza.toUpperCase()));
          kutu.insertAdjacentHTML("beforeend", b.ozel ? `<p contenteditable="true" spellcheck="false">${b.metin}</p>` : govde(b, d));
          kutu.append(el("i", { class: "a4-boyut", title: "Boyut" }));
          return kutu;
        }), el("div", { class: "a4-alt" }, el("span", {}, d.kurum.split(" ").slice(0, 3).join(" ") + " · " + d.belge + ": TUT-2026-0001"), el("span", {}, d.sayfa + " 1 / 1")));
    };
    const tasi = (a, b) => { if (b < 0 || b >= bloklar.length) return; const [x] = bloklar.splice(a, 1); bloklar.splice(b, 0, x); ciz(); };
    const surukle = (tut, satir, i) => {
      tut.addEventListener("pointerdown", e => {
        e.preventDefault(); tut.setPointerCapture(e.pointerId); satir.classList.add("surukle");
        const liste = $("#bListe"); let mevcut = i;
        const hareket = ev => { const sat = $$(".blok-sat", liste); const hedef = sat.findIndex(s => { const r = s.getBoundingClientRect(); return ev.clientY > r.top && ev.clientY < r.bottom; }); if (hedef >= 0 && hedef !== mevcut) { const [x] = bloklar.splice(mevcut, 1); bloklar.splice(hedef, 0, x); mevcut = hedef; const kayit = sat[hedef]; liste.insertBefore(satir, hedef > sat.indexOf(satir) ? kayit.nextSibling : kayit); } };
        const bitir = () => { tut.removeEventListener("pointermove", hareket); tut.removeEventListener("pointerup", bitir); tut.removeEventListener("pointercancel", bitir); ciz(); };
        tut.addEventListener("pointermove", hareket); tut.addEventListener("pointerup", bitir); tut.addEventListener("pointercancel", bitir);
      });
    };
    grup($("#bDil"), [["tr", "Türkçe"], ["en", "English"], ["de", "Deutsch"], ["fr", "Français"], ["es", "Español"], ["ru", "Русский"]], "tr", k => { dil = k; bloklar.forEach(b => { if (!b.ozel) b.baslik = null; else { b.baslikOzel = BD[k].ozel; b.metin = BD[k].ozelm; } }); ciz(); });
    ciz();
  }

  // ================= SHA-256 =================
  const shaS = $("#shaSahne");
  if (shaS) {
    const dosyalar = [{ ad: "BARIYER-02_20261012.mp4", icerik: "video-baytlari-bariyer-02" }, { ad: "TUT-2026-0001_imzali.pdf", icerik: "imzali-nusha-baytlari" }, { ad: "dilekce-ek.pdf", icerik: "ek-belge-baytlari" }];
    const durum = $("#shaDurum");
    const kur = async () => { for (const d of dosyalar) { d.orijinal = d.icerik0 ?? d.icerik; d.icerik0 = d.orijinal; d.kayit = await hex(d.orijinal); d.simdi = d.kayit; d.satir = null; } };
    const ciz = () => shaS.replaceChildren(...dosyalar.map(d => { const bozuk = d.simdi !== d.kayit; d.satir = el("div", { class: "sha-sat" + (bozuk ? " bozuk" : "") }, el("b", {}, d.ad), el("span", { class: "durum" }, bozuk ? "DEĞİŞMİŞ" : "✓ SAĞLAM"), el("code", {}, "kayıtlı : " + d.kayit, el("br"), "şimdiki : " + d.simdi)); return d.satir; }));
    const tara = async () => { let b = 0; for (const d of dosyalar) { d.simdi = await hex(d.icerik); if (d.simdi !== d.kayit) b++; } ciz(); if (!az) $$(".sha-sat", shaS).forEach((s, i) => setTimeout(() => s.classList.add("tarama"), i * 220)); durum.textContent = b ? `Tarama tamamlandı: ${b} dosya değişmiş. Denetim günlüğüne yazıldı, kullanıcı uyarıldı.` : "Tarama tamamlandı: tüm dosyalar kayıtla birebir aynı."; };
    $("#shaDegis").addEventListener("click", () => { const d = dosyalar[Math.floor(Math.random() * dosyalar.length)]; d.icerik += "!"; durum.textContent = `“${d.ad}” dosyasında bir bayt değişti. Tarama çalışınca fark edilecek…`; });
    $("#shaTara").addEventListener("click", tara);
    $("#shaSifirla").addEventListener("click", async () => { dosyalar.forEach(d => d.icerik = d.icerik0); await tara(); durum.textContent = "Sıfırlandı."; });
    kur().then(() => { ciz(); }); izle(shaS);
    sayac(shaS, 9000, () => { if (dosyalar.some(d => d.icerik !== d.icerik0)) tara(); });
  }

  // ================= yetkiler =================
  const yL = $("#yListe");
  if (yL) {
    const IZIN = [["rapor", "Tutanak oluştur"], ["kendi", "Kendi tutanağını düzenle"], ["tum", "Tüm tutanakları düzenle"], ["sil", "Tutanak sil"], ["pdf", "PDF al / yazdır"], ["kam", "Kamera izleme"], ["ayar", "Ayarları yönet"], ["kul", "Kullanıcıları yönet"], ["arsiv", "Arşivi görüntüle"], ["ek", "Delil / belge ekle"], ["ist", "İstatistik gör"], ["den", "Denetim günlüğü"], ["yedek", "Yedek yönet"], ["ozel", "Kişiselleştir"], ["paylas", "Dosya paylaş"], ["kyonet", "Kamera / cihaz yönet"], ["lis", "Lisansı yönet"]];
    const ROL = { "Süper Admin": IZIN.map(i => i[0]), "Birim Amiri": ["rapor", "kendi", "tum", "sil", "pdf", "kam", "arsiv", "ek", "ist", "den", "ozel", "paylas", "kyonet"], "Operatör": ["rapor", "kendi", "pdf", "kam", "arsiv", "ek", "ist", "paylas"], "Denetçi": ["pdf", "arsiv", "ist", "den"] };
    const MENU = [["Yeni tutanak", "rapor"], ["Olay arşivi", "arsiv"], ["İstatistik ve raporlar", "ist"], ["Güvenlik ve denetim", "den"], ["Kişiselleştirme", "ozel"], ["PDF / yazdır", "pdf"], ["Dosya paylaş", "paylas"], ["Yedek al", "yedek"], ["Kamera izleme", "kam"], ["Ayarlar", "ayar"], ["Kullanıcılar", "kul"]];
    let acik = new Set(ROL["Operatör"]), rol = "Operatör";
    const ciz = () => {
      yL.replaceChildren(...IZIN.map(([k, ad]) => el("button", { class: "anahtar", type: "button", role: "switch", "aria-checked": acik.has(k), onclick: () => { acik.has(k) ? acik.delete(k) : acik.add(k); ciz(); } }, ad)));
      $("#yMenu").replaceChildren(...MENU.map(([ad, k]) => el("div", { class: "ym " + (acik.has(k) ? "acik" : "kapali") }, ad)));
      const fark = [...acik].filter(x => !ROL[rol].includes(x)).length + ROL[rol].filter(x => !acik.has(x)).length;
      $("#yBaslik").textContent = `${rol} · kullanıcının gördüğü uygulama`; $("#yOzet").innerHTML = `<b>${acik.size}/17</b> yetki açık` + (fark ? ` · rol varsayılanından <b>${fark}</b> fark` : " · rol varsayılanı");
    };
    grup($("#yRol"), Object.keys(ROL).map(r => [r, r]), "Operatör", k => { rol = k; acik = new Set(ROL[k]); ciz(); });
    ciz();
  }

  // ================= kayıt cihazı =================
  const cs = $("#cihazSahne");
  if (cs) {
    const cihazlar = [{ ad: "NVR-A Otopark", ip: "10.20.1.10", marka: "Hikvision", kanal: 16, disk: 62 }, { ad: "NVR-B Bloklar", ip: "10.20.2.10", marka: "Dahua", kanal: 16, disk: 88 }];
    cihazlar.forEach(c => { c.k = Array.from({ length: c.kanal }, () => true); c.alarm = false; });
    const gunluk = el("div", { class: "gunluk", "aria-live": "off" });
    const log = (m, t = "") => { const z = new Date().toLocaleTimeString("tr-TR"); gunluk.prepend(el("div", { class: t }, `${z}  ${m}`)); while (gunluk.children.length > 8) gunluk.lastChild.remove(); };
    const ciz = () => {
      cs.replaceChildren(...cihazlar.map((c, ci) => el("div", { class: "cihaz" + (c.k.includes(false) || c.alarm || c.disk > 85 ? " sorun" : "") },
        el("h4", {}, c.ad, el("span", { class: "rozet-kc" }, "KAYIT CİHAZI")), el("small", {}, `${c.marka} · ${c.ip}`),
        el("div", { class: "cihaz-sat" }, el("span", {}, "Kanallar"), el("b", {}, `${c.k.filter(Boolean).length}/${c.kanal} çevrimiçi`)),
        el("div", { class: "kanallar" }, ...c.k.map((o, i) => el("button", { class: "kan" + (o ? "" : " off"), type: "button", title: `Kanal ${i + 1}`, "aria-label": `Kanal ${i + 1}: ${o ? "çevrimiçi" : "çevrimdışı"}`, onclick: () => { c.k[i] = !c.k[i]; log(`${c.ad} / Kanal ${i + 1} ${c.k[i] ? "geri geldi" : "çevrimdışı"}`, c.k[i] ? "i" : "k"); ciz(); } }, i + 1))),
        el("div", { class: "cihaz-sat" }, el("span", {}, "Disk"), el("b", {}, `%${c.disk}`)), el("div", { class: "disk" + (c.disk > 85 ? " dolu" : "") }, el("i", { style: `width:${c.disk}%` })),
        el("div", { class: "cihaz-sat", style: "margin-top:8px" }, el("span", {}, "Kayıt"), el("b", {}, c.disk > 95 ? "durdu (disk dolu)" : "sürüyor"), el("span", { class: "alarm-r" + (c.alarm ? " var" : "") }, c.alarm ? "Alarm: hareket algılama" : "Alarm yok")))), gunluk);
    };
    ciz(); log("Canlı sorgu başladı · 2 kayıt cihazı", "i"); izle(cs);
    sayac(cs, 3200, () => { const c = cihazlar[Math.floor(Math.random() * 2)]; const r = Math.random();
      if (r < .45) { const i = Math.floor(Math.random() * c.kanal); c.k[i] = !c.k[i]; log(`${c.ad} / Kanal ${i + 1} ${c.k[i] ? "geri geldi" : "çevrimdışı"}`, c.k[i] ? "i" : "k"); }
      else if (r < .7) { c.disk = Math.min(97, Math.max(40, c.disk + (Math.random() < .6 ? 3 : -2))); if (c.disk > 85) log(`${c.ad} disk doluluk uyarısı: %${c.disk}`, "k"); }
      else { c.alarm = !c.alarm; log(`${c.ad} alarm ${c.alarm ? "başladı" : "bitti"}`, c.alarm ? "k" : "i"); } ciz(); });
  }

  // ================= paylaşım paketi =================
  const pS = $("#pSecenek");
  if (pS) {
    const sec = { parola: true, gizle: true, suret: false };
    const AD = [["parola", "Parola ile şifrele (AES-256-GCM)"], ["gizle", "Kişi adlarını gizle"], ["suret", "Suret (kopya) olarak işaretle"]];
    const ciz = () => pS.replaceChildren(...AD.map(([k, ad]) => el("button", { class: "anahtar", type: "button", role: "switch", "aria-checked": sec[k], onclick: () => { sec[k] = !sec[k]; ciz(); } }, ad)));
    ciz();
    const gun = $("#pGun"), gun2 = $("#pGun2"), bar = $("#pBar"), tp = $("#pTpak"), ac = $("#pAc"), boz = $("#pBoz");
    const yaz = (kap, m, t = "") => { kap.append(el("div", { class: t }, m)); };
    let paket = null;
    const bekle = ms => new Promise(r => setTimeout(r, az ? 0 : ms));
    $("#pOlustur").addEventListener("click", async () => {
      gun.replaceChildren(); tp.classList.remove("var"); bar.style.width = "0"; ac.disabled = boz.disabled = true; gun2.replaceChildren(el("div", {}, "Paket hazırlanıyor…"));
      const adimlar = ["Seçilen kayıt ve 3 dosya toplanıyor…", "Orijinal dosyalar kopyalanıyor (değiştirilmiyor)…", "SHA-256 değerleri hesaplanıyor…", sec.gizle ? "Kişi adları gizleniyor (ör. A*** Y*****)…" : "Kişi adları olduğu gibi bırakıldı", sec.suret ? "SURET (KOPYA) işareti ekleniyor…" : "Asıl nüsha olarak işaretleniyor", "Oluşturma ve düzenleme geçmişi ekleniyor…", sec.parola ? "AES-256-GCM ile parçalı şifreleme…" : "Şifreleme kapalı", "Manifest mühürleniyor…"];
      for (let i = 0; i < adimlar.length; i++) { yaz(gun, adimlar[i], "i"); bar.style.width = Math.round((i + 1) / adimlar.length * 100) + "%"; await bekle(420); }
      const kimlik = await hex(JSON.stringify(sec) + Date.now()); paket = { kimlik, sec: { ...sec }, bozuk: false };
      tp.innerHTML = `<b>Olay_TUT-2026-0001${sec.suret ? "_SURET" : ""}.tutpak</b> · 12,4 MB<br>Paket kimliği: <code>${kimlik.slice(0, 24)}…</code>`; tp.classList.add("var");
      yaz(gun, "✓ Paket hazır. Şimdi sağdaki bilgisayarda açın.", "i"); ac.disabled = boz.disabled = false; gun2.replaceChildren(el("div", {}, "Paket alındı. Açmaya hazır."));
    });
    boz.addEventListener("click", () => { if (paket) { paket.bozuk = true; gun2.append(el("div", { class: "k" }, "! Yolda dosyalardan biri (BARIYER-02_20261012.mp4) değiştirildi.")); } });
    ac.addEventListener("click", async () => {
      if (!paket) return; gun2.replaceChildren();
      if (paket.sec.parola) { yaz(gun2, "Parola istendi → doğru parola girildi", "i"); await bekle(350); }
      yaz(gun2, "Manifest okunuyor, paket kimliği doğrulanıyor…"); await bekle(400);
      for (const d of ["BARIYER-02_20261012.mp4", "TUT-2026-0001_imzali.pdf", "dilekce-ek.pdf"]) { await bekle(380); const k = paket.bozuk && d.startsWith("BARIYER"); yaz(gun2, `${k ? "✗" : "✓"} ${d} — SHA-256 ${k ? "UYUŞMUYOR (DEĞİŞMİŞ)" : "uyuşuyor"}`, k ? "k" : "i"); }
      await bekle(300); yaz(gun2, paket.bozuk ? "SONUÇ: Paket değiştirilmiş; güvenilmemeli." : "SONUÇ: Paket özgün. Oluşturma tarihi ve düzenleme geçmişi görüntülenebilir." + (paket.sec.suret ? " (Suret olarak işaretli)" : ""), paket.bozuk ? "k" : "i");
    });
  }

  // ================= kurulum sihirbazı + paketler =================
  const adimK = $("#adimlar");
  if (adimK) {
    const P = S.paketler || [];
    const mb = b => (b / 1048576).toFixed(1).replace(".", ",") + " MB";
    const ADIM = [
      ["İndirin", "Tutanak_Kurulum ve/veya Kamera_Kurulum paketini indirin.", () => `<p><b>Kurulum paketi indiriliyor…</b></p><div class="kp-bar" id="kpB"><i></i></div><p>${P[0] ? P[0].dosya + " · " + mb(P[0].boyut) : "Tutanak_Kurulum.exe"}</p>`, "İleri"],
      ["SHA-256 değerini doğrulayın", "PowerShell’de Get-FileHash ile sonucu bu sayfadaki değerle karşılaştırın.", () => `<p><b>Doğrulama</b></p><code>Get-FileHash .\\${P[0] ? P[0].dosya : "Tutanak_Kurulum.exe"} -Algorithm SHA256</code><p>Çıktı, sitedeki değerle <b>aynı</b> olmalıdır:</p><code>${P[0] ? P[0].sha256 : "…"}</code>`, "İleri"],
      ["Kurulum sihirbazını çalıştırın", "Klasör, masaüstü simgesi ve Windows ile başlatma seçeneklerini belirleyin.", () => `<p><b>Kurulum türü</b></p><p>☑ Masaüstü simgesi oluştur<br>☐ Windows ile birlikte başlat<br>☑ Başlat menüsüne ekle</p><div class="kp-bar dolu"><i></i></div><p>Dosyalar kopyalanıyor… Kurulum tamam.</p>`, "Bitir"],
      ["Lisansı etkinleştirin", "Cihaz kodunuzu paylaşın, etkinleştirme kodunu girin. Deneme lisansı için kodu bizden isteyin.", () => `<p><b>Lisans</b></p><code>Cihaz kodu: 7F3A-91C2-0B4E-D5A8</code><code>Etkinleştirme kodu: TA-••••-••••-••••</code><p>✓ Lisans etkin. Arşiv klasörünü seçin ve parola belirleyin.</p>`, "Başla"]
    ];
    let si = 0, oto;
    const goster = () => {
      $$(".adim", adimK).forEach((b, i) => { b.setAttribute("aria-current", i === si ? "step" : "false"); b.classList.toggle("bitti", i < si); });
      $("#kpBaslik").textContent = `Kurulum sihirbazı — ${ADIM[si][0]}`; $("#kpIcerik").innerHTML = ADIM[si][2](); $("#kpDugme").textContent = ADIM[si][3];
      if (si === 0) requestAnimationFrame(() => requestAnimationFrame(() => { const b = $("#kpB"); if (b) b.classList.add("dolu"); }));
    };
    ADIM.forEach((a, i) => adimK.append(el("button", { class: "adim", type: "button", role: "listitem", onclick: () => { si = i; clearInterval(oto); goster(); } }, el("div", {}, el("b", {}, a[0]), el("span", {}, a[1])))));
    goster(); const kk = $(".kurulum"); izle(kk);
    oto = sayac(kk, 4800, () => { si = (si + 1) % ADIM.length; goster(); });
    $("#kpDugme").addEventListener("click", () => { si = (si + 1) % ADIM.length; clearInterval(oto); goster(); });

    const pk = $("#paketler");
    pk.replaceChildren(...P.map(p => {
      const url = S.indirmeUrl ? S.indirmeUrl.replace(/\/?$/, "/") + p.dosya : "";
      const ind = url ? el("a", { class: "dugme", href: url, download: "" }, "İndir") : el("a", { class: "dugme", href: "#", "aria-disabled": "true" }, "Çok yakında");
      const kop = el("button", { class: "kopyala", type: "button", onclick: async e => { try { await navigator.clipboard.writeText(p.sha256); e.target.textContent = "Kopyalandı ✓"; setTimeout(() => e.target.textContent = "SHA-256’yı kopyala", 1800); } catch { } } }, "SHA-256’yı kopyala");
      return el("div", { class: "paket" }, el("h3", {}, el("span", { class: "uyg-simge " + (p.ad === "Tutanak" ? "t" : "k"), style: "width:40px;height:40px;font-size:18px" }, p.ad[0]), p.ad + " " + (S.surum || "")), el("p", { style: "color:var(--soluk)" }, p.ozet), el("small", {}, `${p.dosya} · ${mb(p.boyut)} · Windows 10/11 64 bit`), el("code", {}, "SHA-256: " + p.sha256), el("div", { style: "display:flex;gap:16px;align-items:center;flex-wrap:wrap" }, ind, kop));
    }));
  }

  // ================= galeri + lightbox =================
  const GAL = [["t-panel", "Tutanak · Kontrol paneli (Enterprise Slate)"], ["t-tema-radar", "Radar teması · sayaç sütunu panel düzeni"], ["t-tema-kiraz", "Kiraz Çiçeği teması · geniş menü"], ["t-yeni-olay", "Kâğıt ve Mürekkep teması · üst gezinti"], ["t-arsiv", "Kutup Gecesi teması · simge şeridi"], ["t-istatistik", "Mavi Saat teması · ters panel düzeni"], ["t-denetim", "Çelik Kule teması · güvenlik ve denetim"], ["t-kisisellestirme", "Canlı A4 önizleme ve kişiselleştirme"], ["k-panel", "Kamera · Kontrol paneli"], ["k-izleme", "Kamera · Kayıt cihazı izleme"], ["k-tutanaklar", "Kamera · Çevrimdışı tutanaklar"], ["k-istatistik", "Kamera · Arıza istatistikleri"]];
  const gal = $("#galeri"), kutu = $("#kutu");
  if (gal) {
    let gi = 0;
    gal.replaceChildren(...GAL.map(([ad, yaz], i) => el("button", { type: "button", "aria-label": yaz + " — büyüt", onclick: () => ac(i) }, el("img", { src: `img/${ad}.webp`, alt: yaz, loading: "lazy", width: 1600, height: 874 }), el("span", {}, yaz))));
    const ac = i => { gi = (i + GAL.length) % GAL.length; $("#kResim").src = `img/${GAL[gi][0]}.webp`; $("#kResim").alt = GAL[gi][1]; $("#kYazi").textContent = GAL[gi][1] + `  (${gi + 1}/${GAL.length})`; kutu.classList.add("acik"); document.body.style.overflow = "hidden"; };
    const kapat = () => { kutu.classList.remove("acik"); document.body.style.overflow = ""; };
    $("#kKapat").addEventListener("click", kapat); $("#kResim").addEventListener("click", kapat); $("#kOnc").addEventListener("click", () => ac(gi - 1)); $("#kSon").addEventListener("click", () => ac(gi + 1));
    kutu.addEventListener("click", e => { if (e.target === kutu) kapat(); });
    addEventListener("keydown", e => { if (!kutu.classList.contains("acik")) return; if (e.key === "Escape") kapat(); if (e.key === "ArrowLeft") ac(gi - 1); if (e.key === "ArrowRight") ac(gi + 1); });
    const sr = $("#temaSerit");
    const adlar = Object.values(TEMALAR).map(t => [t[0], t[6]]).concat([["Okyanus Sabahı", "#0e7490"], ["Antik Kütüphane", "#9c5b1a"], ["Çelik Kule", "#5aa9e6"], ["Kutup Gecesi", "#2dd4bf"], ["Zeytin Bahçesi", "#6b8e23"], ["Beton", "#c2410c"], ["Pudra Pembe", "#d6457a"], ["Gece Vardiyası", "#c2750e"], ["Yüksek Kontrast", "#ffd700"], ["Granit", "#3f5a73"]]);
    sr.replaceChildren(...[...adlar, ...adlar].map(([a, r]) => el("span", { class: "cipb", "aria-hidden": "true" }, el("i", { class: "nokta", style: `background:${r}` }), a)));
  }

  // ================= kahraman: ekran döngüsü, kaydırma çubuğu, imleç ışığı =================
  const hs = $("#heroSekme");
  if (hs) {
    const imgs = $$("img", hs), yaz = ["Kontrol paneli", "Radar teması · sayaç sütunu", "Kiraz Çiçeği teması", "Canlı A4 önizleme", "Kamera · kayıt cihazı izleme"];
    let i = 0; const hy = $("#heroYaz"); izle(hs);
    if (!az) setInterval(() => { if (!gorunur.get(hs) || document.hidden) return; imgs[i].classList.remove("on"); i = (i + 1) % imgs.length; imgs[i].classList.add("on"); hy.textContent = yaz[i]; }, 3600);
  }
  const ilr = $("#ilerleme"); const kay = () => { const h = document.documentElement.scrollHeight - innerHeight; ilr.style.transform = `scaleX(${h > 0 ? scrollY / h : 0})`; };
  addEventListener("scroll", kay, { passive: true }); kay();
  const imlec = $("#imlec");
  if (imlec && !az && matchMedia("(hover: hover)").matches) {
    let x = 0, y = 0, k = false; addEventListener("pointermove", e => { x = e.clientX; y = e.clientY; document.body.classList.add("imlec-acik"); if (!k) { k = true; requestAnimationFrame(() => { imlec.style.transform = `translate(${x}px,${y}px)`; k = false; }); } }, { passive: true });
    document.addEventListener("pointerleave", () => document.body.classList.remove("imlec-acik"));
  }
})();
