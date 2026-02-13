const $ = (sel) => document.querySelector(sel);
const el = (tag, cls) => { const x = document.createElement(tag); if (cls) x.className = cls; return x; };
const J  = async (p) => (await fetch(p)).json();

/* === STRIPE LINKS (SENİN VERDİKLERİN) ========================= */
const STRIPE = {
  // SaaS aylık
  BASIC_MONTHLY:   "https://buy.stripe.com/bJecN6cnl9cHbF7cxWdEs01",
  PRO_MONTHLY:     "https://buy.stripe.com/14AeVe1IHcoT8sVbtSdEs02",
  PROPLUS_MONTHLY: "https://buy.stripe.com/dRm14ogDBbkP10teG4dEs03",
  // Setup (tek seferlik)
  SETUP_BASIC:     "https://buy.stripe.com/bJefZi3QPcoT9wZ69ydEs04",
  SETUP_PRO:       "https://buy.stripe.com/bJeaEY7311Kf38BgOcdEs05",
  SETUP_PROPLUS:   "https://buy.stripe.com/28E9AU3QPdsXaB3btSdEs06",
};
// Genel CTA’lar BASIC’e gitsin
const GENERIC_LINK = STRIPE.BASIC_MONTHLY;

/* Plan adını normalleştir → basic | pro | proplus */
const norm = (s="") => s.toLowerCase().replace(/\s+/g,"").replace(/\+/g,"plus");
const mapStart = (k) => ({
  basic:   STRIPE.BASIC_MONTHLY,
  starter: STRIPE.BASIC_MONTHLY,
  pro:     STRIPE.PRO_MONTHLY,
  proplus: STRIPE.PROPLUS_MONTHLY,
  business:STRIPE.PROPLUS_MONTHLY, // eski adla uyum
}[k]);

const mapSetup = (k) => ({
  basic:   STRIPE.SETUP_BASIC,
  starter: STRIPE.SETUP_BASIC,
  pro:     STRIPE.SETUP_PRO,
  proplus: STRIPE.SETUP_PROPLUS,
  business:STRIPE.SETUP_PROPLUS,
}[k]);

(async () => {
  try {
    const hero       = await J('/content/hero.json');
    const erg        = await J('/content/ergebnisse.json');
    const branchen   = await J('/content/branchen.json');
    const agents     = await J('/content/agents.json');
    const pakete     = await J('/content/pakete.json');
    const preise     = await J('/content/preise.json');
    const sicherheit = await J('/content/sicherheit.json');
    const faq        = await J('/content/faq.json');
    const kontakt    = await J('/content/kontakt.json');

    /* ---------- hero ---------- */
    $('#hero-headline').textContent = hero.headline || '';
    $('#hero-sub').textContent = hero.subline || '';
    const s2 = $('#hero-cta-secondary');
    s2.textContent = hero.cta_secondary || 'Beratungstermin buchen';
    s2.href = hero.cta_secondary_link || 'https://calendly.com/clinxcode';
    // birincil CTA sayfada fiyatlara insin (güvenli varsayılan)
    const s1 = $('#hero-cta-primary');
    if (s1) s1.href = hero.cta_primary_link || '#preise';

    /* ---------- ergebnisse ---------- */
    $('#erg-intro').textContent = erg.intro || '';
    const eg = $('#erg-grid'); eg.innerHTML='';
    (erg.bullets || []).forEach(b=>{
      const c=el('div','card col-4 ibox');
      const i=el('div','icon'); i.textContent='✓';
      const w=el('div'); const s=el('strong'); s.textContent=b.title||'';
      const p=el('p'); p.className='sub'; p.textContent=b.text||'';
      w.appendChild(s); w.appendChild(p); c.appendChild(i); c.appendChild(w); eg.appendChild(c);
    });
    $('#erg-note').textContent = erg.note || '';

    /* ---------- branchen ---------- */
    const bg = $('#branchen-grid'); bg.innerHTML='';
    (branchen.categories || []).forEach(k=>{
      const c=el('div','card col-4 ibox');
      const i=el('div','icon'); i.textContent='▣';
      const w=el('div'); const s=el('strong'); s.textContent=k.name||'';
      const p=el('p'); p.className='sub'; p.textContent=k.text||'';
      // sektör kartlarına güvenli CTA (GENERIC_LINK)
      const btnWrap = el('div','cta'); 
      const a=el('a','btn primary'); a.href = k.cta_url || GENERIC_LINK; a.target='_blank'; a.rel='noopener'; a.textContent='Jetzt starten';
      btnWrap.appendChild(a);
      w.appendChild(s); w.appendChild(p); w.appendChild(btnWrap);
      c.appendChild(i); c.appendChild(w); bg.appendChild(c);
    });

    /* ---------- agents ---------- */
    const ag = $('#agents-grid'); ag.innerHTML='';
    (agents.items || []).forEach(a=>{
      const c=el('div','card col-6'); const t=el('h3'); t.textContent = a.name||'';
      const ul=el('ul','list');
      [a.desc, (a.impact?('Ergebnis: '+a.impact):null)].filter(Boolean).forEach(txt=>{
        const li=el('li'); li.textContent=txt; ul.appendChild(li);
      });
      const cta = el('div','cta');
      const a1=el('a','btn primary'); a1.href=a.cta_url||GENERIC_LINK; a1.target='_blank'; a1.rel='noopener'; a1.textContent='14 Tage kostenlos testen';
      const a2=el('a','btn'); a2.href=a.demo_url||'https://calendly.com/clinxcode'; a2.target='_blank'; a2.rel='noopener'; a2.textContent='Demo';
      c.appendChild(t); c.appendChild(ul); cta.appendChild(a1); cta.appendChild(a2); c.appendChild(cta);
      ag.appendChild(c);
    });

    /* ---------- pakete ---------- */
    const pg = $('#pakete-grid'); pg.innerHTML='';
    (pakete.items || []).forEach(p=>{
      const c=el('div','card col-4');
      if(p.badge){ const b=el('div'); b.textContent=p.badge; b.style.cssText='background:#fef9c3;border:1px solid #fde68a;color:#713f12;padding:6px 10px;border-radius:999px;position:absolute;top:14px;right:14px'; c.appendChild(b); }
      const t=el('h3'); t.textContent=p.title||'';
      const ul=el('ul','list');
      (p.features||[]).forEach(f=>{ const li=el('li'); li.textContent=f; ul.appendChild(li); });
      c.appendChild(t); c.appendChild(ul); pg.appendChild(c);
    });

    /* ---------- preise ---------- */
    const prg = $('#preise-grid'); prg.innerHTML='';
    (preise.plans || []).forEach(pl=>{
      // plan anahtarını bul (title, key veya slug üzerinden)
      const key = norm(pl.key || pl.slug || pl.title || "");
      const startUrl = pl.start_url || mapStart(key) || GENERIC_LINK;
      const setupUrl = pl.setup_url || mapSetup(key) || STRIPE.SETUP_BASIC;

      const c=el('div','card col-4');
      if(pl.badge){ const b=el('div'); b.textContent=pl.badge; b.style.cssText='background:#fef9c3;border:1px solid #fde68a;color:#713f12;padding:6px 10px;border-radius:999px;position:absolute;top:14px;right:14px'; c.appendChild(b); }
      const t=el('h3'); t.textContent=pl.title||'';
      const price=el('div','price'); price.textContent=pl.price||'';
      const incl=el('div','incl'); incl.textContent=(pl.sms!=null?pl.sms+' SMS inkl.':'');
      const cta=el('div','cta');
      const a1=el('a','btn primary'); a1.href=startUrl; a1.target='_blank'; a1.rel='noopener'; a1.textContent='Jetzt starten';
      const a2=el('a','btn'); a2.href=setupUrl; a2.target='_blank'; a2.rel='noopener'; a2.textContent='Setup buchen';
      cta.appendChild(a1); cta.appendChild(a2);
      c.appendChild(t); c.appendChild(price); c.appendChild(incl); c.appendChild(cta); prg.appendChild(c);
    });
    $('#preise-note').textContent = preise.note || 'Einrichtung (optional, einmalig) • Zusatznachricht: 0,002–0,01€/Stk';

    /* ---------- sicherheit ---------- */
    const sg = $('#sich-grid'); sg.innerHTML='';
    (sicherheit.chips || []).forEach(ch=>{
      const c=el('div','card col-4 ibox');
      const i=el('div','icon'); i.textContent='🛡';
      const w=el('div'); const s=el('strong'); s.textContent=ch.title||'';
      const p=el('p'); p.className='sub'; p.textContent=ch.text||'';
      w.appendChild(s); w.appendChild(p); c.appendChild(i); c.appendChild(w); sg.appendChild(c);
    });

    /* ---------- kontakt + yıl ---------- */
    $('#k-address').textContent = kontakt.address||'';
    $('#k-email').textContent = kontakt.email||''; $('#k-email').href = 'mailto:'+(kontakt.email||'');
    $('#k-phone').textContent = kontakt.phone||''; $('#k-phone').href = 'tel:'+((kontakt.phone||'').replace(/\s+/g,''));
    const kc = $('#k-calendly'); if (kc && kontakt.calendly) kc.href = kontakt.calendly;
    document.getElementById('y').textContent = new Date().getFullYear();

  } catch(e) {
    console.error(e);
  }
})();
