(function(){
  console.log('[admin] init.js loaded');
  document.body.insertAdjacentHTML('beforeend','<div style="padding:12px;background:#e0f2fe;border:1px solid #7dd3fc;border-radius:8px;margin:16px 0;font:14px/1.4 system-ui">init.js OK</div>');

  function loadScript(src, ok, fail){
    var s=document.createElement('script'); s.src=src; s.defer=true;
    s.onload=ok; s.onerror=fail; document.head.appendChild(s);
  }

  function boot(){
    try {
      if (typeof CMS === 'undefined') throw new Error('CMS global not found');
      CMS.init();
      console.log('[admin] CMS.init() called');
      document.body.insertAdjacentHTML('beforeend','<div style="padding:12px;background:#dcfce7;border:1px solid #86efac;border-radius:8px;margin:16px 0">CMS INIT OK</div>');
    } catch(e){
      console.error('[admin] boot error', e);
      document.body.insertAdjacentHTML('beforeend','<pre style="white-space:pre-wrap;background:#fee2e2;border:1px solid #fecaca;padding:12px;border-radius:8px">'+e.stack+'</pre>');
    }
  }

  // 1) unpkg latest, 2) jsDelivr latest
  loadScript('https://unpkg.com/decap-cms@latest/dist/decap-cms.js', boot, function(){
    console.warn('[admin] unpkg failed, trying jsDelivr…');
    loadScript('https://cdn.jsdelivr.net/npm/decap-cms@latest/dist/decap-cms.js', boot, function(){
      document.body.insertAdjacentHTML('beforeend','<div style="padding:12px;background:#fee2e2;border:1px solid #fecaca;border-radius:8px">decap-cms yüklenemedi (unpkg/jsDelivr)</div>');
    });
  });
})();
