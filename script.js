(() => {
  const root = document.documentElement;
  const themeBtn = document.getElementById('themeToggle');
  const menuBtn  = document.getElementById('menuToggle');
  const mobile   = document.getElementById('mobilePanel');
  const PREF_KEY = 'fuelai-theme'; // 'light' | 'dark' | 'auto'

  const updateBtn = (pref) => {
    if (!themeBtn) return;
    const label = pref === 'auto' ? 'Auto' : (pref[0].toUpperCase() + pref.slice(1));
    themeBtn.textContent = label;
    themeBtn.setAttribute('aria-label', `Theme: ${label}. Click to change`);
    themeBtn.title = `Theme: ${label}`;
  };

  const applyTheme = (pref) => {
    if (pref === 'light' || pref === 'dark') root.setAttribute('data-theme', pref);
    else root.removeAttribute('data-theme'); // follow system
    updateBtn(pref);
  };

  const getPref = () => localStorage.getItem(PREF_KEY) || 'auto';
  const setPref = (pref) => { localStorage.setItem(PREF_KEY, pref); applyTheme(pref); };

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const cur = getPref();
      const next = cur === 'light' ? 'dark' : (cur === 'dark' ? 'auto' : 'light');
      setPref(next);
    });
  }
  applyTheme(getPref());

  // year in footer
  const y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();

  // active link underline
  const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('.nav-links a, .footer-nav a').forEach(a => {
    const href = (a.getAttribute('href') || '').toLowerCase();
    if (!href || href.startsWith('#') || href.startsWith('http')) return;
    const file = href.replace('./','').replace('/','');
    if ((path === '' && file === 'index.html') || path === file) a.classList.add('underline');
  });

  // mobile menu
  if (menuBtn && mobile) menuBtn.addEventListener('click', () => mobile.classList.toggle('open'));
})();
