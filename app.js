// /app.js — strikte CSP: nur externes Script von 'self'
const hero = await j('/content/hero.json', {headline:'Alles, was Sie brauchen, um mit KI zu skalieren.', subline:'Fertige AI‑Agenten… schnell, sicher und messbar.'});
$('#heroTitle').textContent = hero.headline; $('#heroSub').textContent = hero.subline;

// KPIs
const erg = await j('/content/ergebnisse.json', {kpis:[{value:'+15%',label:'mehr Buchungen'},{value:'−15%',label:'No‑Show'},{value:'<5 Min',label:'Go‑Live je Agent'},{value:'EU',label:'GDPR/KVKK‑konform'}]});
fillKPIs(erg.kpis);

// Branchen
const br = await j('/content/branchen.json', {list:[]});
fillCards('#branchenWrap', br.list, (b)=>`<strong>${b.name}</strong><div class="note">${b.desc||''}</div>`);

// Agenten
const ag = await j('/content/agents.json', {list:[]});
fillCards('#agentenWrap', ag.list, (a)=>`<strong>${a.name}</strong><div class="note">${a.benefit||''}</div>`);

// Pakete & Umfang (ohne Preise)
const pk = await j('/content/pakete.json', {features:[]});
fillCards('#paketWrap', pk.features, (f)=>`<strong>${f.title}</strong><ul style="margin:10px 0 0 16px">${(f.points||[]).map(x=>`<li>${x}</li>`).join('')}</ul>`);

// Preise
const pr = await j('/content/preise.json', {});
if(Object.keys(pr).length){ fillPreise(pr) }

// Sicherheit
const si = await j('/content/sicherheit.json', {items:[]});
fillCards('#secWrap', si.items, (s)=>`<strong>${s.title}</strong><div class="note">${s.desc||''}</div>`);

// FAQ
const fq = await j('/content/faq.json', {list:[]});
fillFAQ(fq.list);

// Kontakt
const ko = await j('/content/kontakt.json', {email:'hello@clinxcode.com', phone:'+43 660 0000000', address:'Wien, Österreich', calendly:'#'});
const box = $('#kontaktBox');
box.innerHTML = `
<div style="display:grid;gap:6px">
<div><strong>E‑Mail:</strong> <a href="mailto:${ko.email}">${ko.email}</a></div>
<div><strong>Telefon:</strong> <a href="tel:${ko.phone}">${ko.phone}</a></div>
<div><strong>Adresse:</strong> ${ko.address}</div>
<div class="row" style="margin-top:8px">
<a class="btn acc" href="${ko.calendly}" id="calendlyBtn" rel="noopener">Beratungstermin buchen</a>
</div>
</div>`;
// Top CTAs
const cal = ko.calendly || '#kontakt';
$('#calendlyTop').href = cal; $('#calendlyHero').href = cal;
}

document.addEventListener('DOMContentLoaded', boot);
})();
