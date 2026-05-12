/* ========================================
   DevRoadmaps — Internationalisation (i18n)
   ======================================== */

const I18n = (() => {
  const SUPPORTED = ['en', 'bn'];
  const STORAGE_KEY = 'devroadmaps-lang';

  let currentLocale = 'en';
  let translations = {};

  function t(key) {
    return translations[key] !== undefined ? translations[key] : key;
  }

  function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      el.textContent = t(el.dataset.i18n);
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      el.placeholder = t(el.dataset.i18nPlaceholder);
    });
    // Keep inner HTML for elements that mix text with child nodes (e.g. badge + count)
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      el.innerHTML = t(el.dataset.i18nHtml);
    });

    // Sync all language selector dropdowns on the page
    document.querySelectorAll('.lang-select').forEach(sel => {
      sel.value = currentLocale;
    });

    document.documentElement.lang = currentLocale;
  }

  async function loadLocale(lang) {
    if (!SUPPORTED.includes(lang)) lang = 'en';
    try {
      const base = document.querySelector('base')?.href || '';
      const resp = await fetch(`${base}locales/${lang}.json`);
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      translations = await resp.json();
      currentLocale = lang;
      localStorage.setItem(STORAGE_KEY, lang);
      applyTranslations();
    } catch (err) {
      console.warn(`[i18n] Failed to load locale "${lang}":`, err);
    }
  }

  async function init() {
    const saved = localStorage.getItem(STORAGE_KEY);
    const browserLang = (navigator.language || 'en').split('-')[0];
    const lang = saved || (SUPPORTED.includes(browserLang) ? browserLang : 'en');
    await loadLocale(lang);
  }

  function buildSelector() {
    const wrap = document.createElement('div');
    wrap.className = 'lang-selector';
    wrap.setAttribute('aria-label', 'Select language');

    const sel = document.createElement('select');
    sel.className = 'lang-select';
    sel.setAttribute('aria-label', 'Select language');

    const options = [
      { value: 'en', label: 'English' },
      { value: 'bn', label: 'বাংলা' },
    ];
    options.forEach(({ value, label }) => {
      const opt = document.createElement('option');
      opt.value = value;
      opt.textContent = label;
      sel.appendChild(opt);
    });

    sel.value = currentLocale;
    sel.addEventListener('change', () => loadLocale(sel.value));
    wrap.appendChild(sel);
    return wrap;
  }

  return { init, loadLocale, t, buildSelector };
})();
