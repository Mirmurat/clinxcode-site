window.onerror = function(msg, src, ln, col, err){
  console.error('CMS error:', err || msg);
};
CMS.init();
