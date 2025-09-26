console.log('[admin] init.js loaded (self-host)');
document.body.insertAdjacentHTML('beforeend','<div style="padding:12px;background:#e0f2fe;border:1px solid #7dd3fc;border-radius:8px;margin:16px 0">init.js OK</div>');
try{
  if (typeof CMS === 'undefined') throw new Error('CMS global not found');
  CMS.init();
  document.body.insertAdjacentHTML('beforeend','<div style="padding:12px;background:#dcfce7;border:1px solid #86efac;border-radius:8px;margin:16px 0">CMS INIT OK</div>');
}catch(e){
  console.error(e);
  document.body.insertAdjacentHTML('beforeend','<pre style="white-space:pre-wrap;background:#fee2e2;border:1px solid #fecaca;padding:12px;border-radius:8px">'+(e.stack||e)+'</pre>');
}
