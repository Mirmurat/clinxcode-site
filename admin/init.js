// v2: güvenli init + küçük debug
(function () {
  try {
    console.log('[admin] init.js loaded');
    if (typeof CMS === 'undefined') throw new Error('CMS global not found');
    CMS.init();
    console.log('[admin] CMS.init() called');
  } catch (e) {
    console.error('[admin] init error', e);
    document.body.insertAdjacentHTML('beforeend',
      '<pre style="white-space:pre-wrap;background:#fee2e2;border:1px solid #fecaca;padding:12px;border-radius:8px">' +
      (e.stack || e) + '</pre>');
  }
})();
