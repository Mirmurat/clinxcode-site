const $ = (sel)=>document.querySelector(sel);
const el = (tag, cls)=>{const x=document.createElement(tag); if(cls) x.className=cls; return x;};

async function loadJSON(path){ const r= await fetch(path); return r.json(); }

(async ()=>{
  try{
    const hero = await loadJSON('content/hero.json');
    const erg = await loadJSON('content/ergebnisse.json');
    const branchen = await loadJSON('content/branchen.json');
    const agents = await loadJSON('content/agents.json');
    const pakete = await loadJSON('content/pakete.json');
    const preise = await loadJSON('content/preise.json');
    const sicherheit = await loadJSON('content/sicherheit.json');
    const faq = await loadJSON('content/faq.json');
    const kontakt = await loadJSON('content/kontakt.json');

    // hero
    $('#hero-headline').textContent = hero.headline;
    $('#hero-sub').textContent = hero.subline;
    const s2 = $('#hero-cta-secondary');
    s2.textContent = hero.cta_secondary;
    s2.href = hero.cta_secondary_link;

    // ergebnisse
    $('#erg-intro').textContent = erg.intro;
    const eg = $('#erg-grid');
    erg.bullets.forEach(b=>{
      const c=el('div','card col-4 ibox');
      const i=el('div','icon'); i.textContent='✅';
      const w=el('div'); const s=el('strong'); s.textContent=b.title;
      const p=el('p'); p.className='sub'; p.textContent=b.text;
      w.appendChild(s); w.appendChild(p); c.appendChild(i); c.appendChild(w); eg.appendChild(c);
    });
    $('#erg-note').textContent = erg.note || '';

    // branchen
    const bg = $('#branchen-grid');
    branchen.categories.forEach(k=>{
      const c=el('div','card col-4 ibox');
      const i=el('div','icon'); i.textContent='🏷️';
      const w=el('div'); const s=el('strong'); s.textContent=k.name;
      const p=el('p'); p.className='sub'; p.textContent=k.text;
      w.appendChild(s); w.appendChild(p); c.appendChild(i); c.appendChild(w); bg.appendChild(c);
    });

    // agents
    const ag = $('#agents-grid');
    agents.items.forEach(a=>{
      const c=el('div','card col-6'); const t=el('h3'); t.textContent = a.name;
      const ul=el('ul','list'); [a.desc, 'Ergebnis: '+a.impact].forEach(txt=>{ const li=el('li'); li.textContent=txt; ul.appendChild(li); });
      c.appendChild(t); c.appendChild(ul); ag.appendChild(c);
    });

    // pakete
    const pg = $('#pakete-grid');
    pakete.items.forEach(p=>{
      const c=el('div','card col-4');
      if(p.badge){ const b=el('div'); b.textContent=p.badge; b.style.cssText='background:#fef9c3;border:1px solid #fde68a;color:#713f12;padding:6px 10px;border-radius:999px;position:absolute;top:14px;right:14px'; c.appendChild(b); }
      const t=el('h3'); t.textContent=p.title;
      const ul=el('ul','list'); p.features.forEach(f=>{ const li=el('li'); li.textContent=f; ul.appendChild(li); });
      c.appendChild(t); c.appendChild(ul); pg.appendChild(c);
    });

    // preise
    const prg = $('#preise-grid');
    preise.plans.forEach(pl=>{
      const c=el('div','card col-4');
      if(pl.badge){ const b=el('div'); b.textContent=pl.badge; b.style.cssText='background:#fef9c3;border:1px solid #fde68a;color:#713f12;padding:6px 10px;border-radius:999px;position:absolute;top:14px;right:14px'; c.appendChild(b); }
      const t=el('h3'); t.textContent=pl.title;
      const price=el('div','price'); price.textContent=pl.price;
      const incl=el('div','incl'); incl.textContent=pl.sms+' SMS inkl.';
      const cta=el('div','cta');
      const a1=el('a','btn primary'); a1.href=pl.start_url; a1.target='_blank'; a1.rel='noopener'; a1.textContent='Jetzt starten';
      const a2=el('a','btn'); a2.href=pl.setup_url; a2.target='_blank'; a2.rel='noopener'; a2.textContent='Setup buchen';
      cta.appendChild(a1); cta.appendChild(a2);
      c.appendChild(t); c.appendChild(price); c.appendChild(incl); c.appendChild(cta); prg.appendChild(c);
    });
    $('#preise-note').textContent = preise.note;

    // sicherheit
    const sg = $('#sich-grid');
    sicherheit.chips.forEach(ch=>{
      const c=el('div','card col-4 ibox'); const i=el('div','icon'); i.textContent='🛡️';
      const w=el('div'); const s=el('strong'); s.textContent=ch.title;
      const p=el('p'); p.className='sub'; p.textContent=ch.text;
      w.appendChild(s); w.appendChild(p); c.appendChild(i); c.appendChild(w); sg.appendChild(c);
    });

    // kontakt + yıl
    $('#k-address').textContent = kontakt.address;
    $('#k-email').textContent = kontakt.email; $('#k-email').href = 'mailto:'+kontakt.email;
    $('#k-phone').textContent = kontakt.phone; $('#k-phone').href = 'tel:'+kontakt.phone.replace(/\s+/g,'');
    const kc = $('#k-calendly'); if (kc) kc.href = kontakt.calendly;
    document.getElementById('y').textContent = new Date().getFullYear();
  }catch(e){
    console.error(e);
  }
})();
