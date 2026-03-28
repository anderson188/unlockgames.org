/**
 * Full-site i18n: localStorage + ?lang=, same URLs. Locales: en (default), es, fr, de.
 * Loads i18n/{locale}.json (URL resolved from current page so paths stay correct).
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'unlockgames_locale';
  /** 仅四种：英语（默认）+ 西 / 法 / 德 */
  var SUPPORTED = {
    en: { flag: '🇬🇧', label: 'EN', native: 'English', htmlLang: 'en' },
    es: { flag: '🇪🇸', label: 'ES', native: 'Español', htmlLang: 'es' },
    fr: { flag: '🇫🇷', label: 'FR', native: 'Français', htmlLang: 'fr' },
    de: { flag: '🇩🇪', label: 'DE', native: 'Deutsch', htmlLang: 'de' }
  };
  var LOCALE_ORDER = ['en', 'es', 'fr', 'de'];

  function normalizeLocale(code) {
    if (!code) return 'en';
    return SUPPORTED[code] ? code : 'en';
  }

  function basePrefix() {
    var p = window.location.pathname || '/';
    return p.indexOf('/blogs/') !== -1 ? '../' : '';
  }

  /** 解析 i18n JSON 的绝对 URL，避免相对路径在部分环境下解析错误 */
  function i18nJsonUrl(filename) {
    try {
      var href = window.location.href;
      var base =
        (window.location.pathname || '').indexOf('/blogs/') !== -1
          ? new URL('../', href).href
          : new URL('.', href).href;
      return new URL('i18n/' + filename, base).href;
    } catch (e) {
      return basePrefix() + 'i18n/' + filename;
    }
  }

  function getLocale() {
    try {
      var q = new URLSearchParams(window.location.search).get('lang');
      if (q) {
        var n = normalizeLocale(q);
        localStorage.setItem(STORAGE_KEY, n);
        return n;
      }
    } catch (e) {}
    return normalizeLocale(localStorage.getItem(STORAGE_KEY));
  }

  function setLocale(code) {
    if (!SUPPORTED[code]) return;
    localStorage.setItem(STORAGE_KEY, code);
    try {
      var u = new URL(window.location.href);
      u.searchParams.set('lang', code);
      window.location.href = u.toString();
    } catch (e) {
      window.location.reload();
    }
  }

  function esc(s) {
    if (!s) return '';
    var d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }

  function applyDataI18n(ui) {
    if (!ui) return;
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (!key || ui[key] == null) return;
      var v = ui[key];
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        if (el.type === 'submit' || el.type === 'button') el.value = v;
        else el.placeholder = v;
      } else if (el.hasAttribute('data-i18n-html')) {
        el.innerHTML = v;
      } else {
        el.textContent = v;
      }
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-aria');
      if (key && ui[key]) el.setAttribute('aria-label', ui[key]);
    });
    document.querySelectorAll('[data-i18n-title]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-title');
      if (key && ui[key]) el.setAttribute('title', ui[key]);
    });
  }

  function applyMeta(pack) {
    if (!pack || !pack.meta) return;
    var m = pack.meta;
    if (m.title) document.title = m.title;
    var md = document.querySelector('meta[name="description"]');
    if (md && m.description) md.setAttribute('content', m.description);
    var og = document.querySelector('meta[property="og:title"]');
    if (og && m.ogTitle) og.setAttribute('content', m.ogTitle);
    var ogd = document.querySelector('meta[property="og:description"]');
    if (ogd && m.ogDescription) ogd.setAttribute('content', m.ogDescription);
  }

  function isHomePage() {
    var path = (window.location.pathname || '/').replace(/\/$/, '') || '/';
    return path === '' || path === '/' || path.endsWith('/index.html') || /\/index\.html$/i.test(path);
  }

  function applyHomeCards(homeCards) {
    if (!homeCards) return;
    document.querySelectorAll('a[href^="blogs/"]').forEach(function (a) {
      var href = a.getAttribute('href');
      if (!href || href.indexOf('category-') !== -1) return;
      var card = homeCards[href];
      if (!card) return;
      if (card.title) a.textContent = card.title;
      var item = a.closest('.article-item');
      if (item && card.excerpt) {
        var ex = item.querySelector('.article-item-excerpt');
        if (ex) ex.textContent = card.excerpt;
      }
    });
  }

  function getArticleSlug() {
    var link = document.querySelector('link[rel="canonical"]');
    if (link && link.href) {
      var m = link.href.match(/\/blogs\/([^/?#]+\.html)$/i);
      if (m) return m[1];
    }
    var p = window.location.pathname || '';
    var m2 = p.match(/\/blogs\/([^/]+\.html)$/i);
    return m2 ? m2[1] : null;
  }

  function applyArticle(pack) {
    var slug = getArticleSlug();
    if (!slug || !pack || !pack.articles || !pack.articles[slug]) return;
    var art = pack.articles[slug];
    var root = document.querySelector('main.article-content article') || document.querySelector('article');
    if (!root) return;
    if (art.title) {
      var t = root.querySelector('h1');
      if (t) t.textContent = art.title;
    }
    if (art.description) {
      var md = document.querySelector('meta[name="description"]');
      if (md) md.setAttribute('content', art.description);
      if (art.title) document.title = art.title + ' - unLockGames';
    }
    if (art.bodyHtml) {
      var comments = root.querySelector('section.article-comments, #comments');
      var commentsHtml = comments ? comments.outerHTML : '';
      var disclosure = '';
      root.querySelectorAll('p').forEach(function (p) {
        if (p.querySelector('em') && /Disclosure/i.test(p.textContent)) disclosure = p.outerHTML;
      });
      root.innerHTML = art.bodyHtml + commentsHtml + disclosure;
    }
  }

  function renderBlogNavFooter(ui) {
    if (!ui || !ui.navHome) return;
    var navUl = document.querySelector('nav.blog-nav .container ul');
    if (navUl && !navUl.dataset.i18nRendered) {
      navUl.dataset.i18nRendered = '1';
      var prefix = basePrefix();
      var rows = [
        [prefix + 'index.html', ui.navHome],
        [prefix + 'index.html#electronics', ui.navElectronics],
        [prefix + 'index.html#fashion', ui.navFashion],
        [prefix + 'index.html#sport-fashion', ui.navSportFashion],
        [prefix + 'index.html#shopping', ui.navShopping],
        [prefix + 'index.html#travel', ui.navTravel]
      ];
      navUl.innerHTML = rows
        .map(function (r) {
          return '<li><a href="' + r[0] + '">' + esc(r[1]) + '</a></li>';
        })
        .join('');
    }
    var fl = document.querySelector('footer.blog-footer .footer-links');
    if (fl && !fl.dataset.i18nRendered) {
      fl.dataset.i18nRendered = '1';
      var px = basePrefix();
      var links = [
        [px + 'index.html', ui.footerHome],
        [px + 'index.html#electronics', ui.footerElectronics],
        [px + 'index.html#fashion', ui.footerFashion],
        [px + 'index.html#sport-fashion', ui.footerSportFashion],
        [px + 'index.html#shopping', ui.footerShopping],
        [px + 'index.html#travel', ui.footerTravel],
        [px + 'about.html', ui.footerAbout],
        [px + 'privacy.html', ui.footerPrivacy]
      ];
      fl.innerHTML = links
        .map(function (r) {
          return '<a href="' + r[0] + '">' + esc(r[1]) + '</a>';
        })
        .join('');
    }
    var fb = document.querySelectorAll('footer.blog-footer .footer-bottom');
    if (fb.length && ui.footerDisclosure) {
      fb[0].innerHTML = ui.footerDisclosure;
    }
    if (fb.length > 1 && ui.footerDisclosureBottom) {
      fb[1].textContent = ui.footerDisclosureBottom;
    }
  }

  function applyPageMeta(pack) {
    var p = window.location.pathname || '';
    if (isHomePage() && pack.meta) {
      applyMeta(pack);
    } else if (/search\.html$/i.test(p) && pack.metaSearch) {
      applyMeta({ meta: pack.metaSearch });
    }
  }

  function injectLangSwitcher() {
    if (document.getElementById('headerLangBtn')) return;
    var header = document.querySelector('header.blog-header .container');
    var bar = document.querySelector('nav.category-bar .container');
    var host = header || bar;
    if (!host) return;
    var cluster = document.createElement('div');
    cluster.className = 'header-brand-cluster';
    cluster.style.cssText = 'display:flex;align-items:center;gap:0.75rem;flex-wrap:wrap;';
    cluster.innerHTML =
      '<div class="header-lang-wrap">' +
      '<button type="button" class="header-lang-btn" id="headerLangBtn" aria-expanded="false" aria-haspopup="true" aria-controls="headerLangPanel">' +
      '<span class="header-lang-flag" aria-hidden="true">🇬🇧</span><span class="header-lang-label">EN</span><span class="header-lang-chevron" aria-hidden="true">▼</span>' +
      '</button>' +
      '<ul class="header-lang-panel" id="headerLangPanel" hidden></ul>' +
      '</div>';
    if (header) {
      host.insertBefore(cluster, host.firstChild);
    } else {
      var logo = bar.querySelector('.logo');
      if (logo) bar.insertBefore(cluster, logo);
      else bar.insertBefore(cluster, bar.firstChild);
    }
  }

  function fillLangPanel() {
    var panel = document.getElementById('headerLangPanel');
    if (!panel) return;
    var loc = getLocale();
    panel.innerHTML = LOCALE_ORDER.map(function (code) {
        var L = SUPPORTED[code];
        var cur = code === loc ? 'is-current' : '';
        return (
          '<li><a href="#" class="' +
          cur +
          '" data-set-locale="' +
          code +
          '"><span class="lang-flag" aria-hidden="true">' +
          L.flag +
          '</span> ' +
          L.native +
          '</a></li>'
        );
      })
      .join('');
  }

  function bindLangPanel() {
    injectLangSwitcher();
    var btn = document.getElementById('headerLangBtn');
    var panel = document.getElementById('headerLangPanel');
    if (!btn || !panel) return;

    fillLangPanel();

    function closePanel() {
      panel.setAttribute('hidden', '');
      btn.setAttribute('aria-expanded', 'false');
      btn.classList.remove('is-open');
    }
    function openPanel() {
      panel.removeAttribute('hidden');
      btn.setAttribute('aria-expanded', 'true');
      btn.classList.add('is-open');
    }

    var loc = getLocale();
    var L = SUPPORTED[loc] || SUPPORTED.en;
    btn.querySelector('.header-lang-flag').textContent = L.flag;
    btn.querySelector('.header-lang-label').textContent = L.label;

    if (!window.__unlockgamesI18nUiBound) {
      window.__unlockgamesI18nUiBound = true;
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (panel.hasAttribute('hidden')) openPanel();
        else closePanel();
      });
      panel.addEventListener('click', function (e) {
        e.stopPropagation();
      });
      panel.addEventListener('click', function (e) {
        var a = e.target.closest('[data-set-locale]');
        if (!a) return;
        e.preventDefault();
        var code = a.getAttribute('data-set-locale');
        closePanel();
        if (code && code !== getLocale()) setLocale(code);
      });
      document.addEventListener('click', closePanel);
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closePanel();
      });
    }
  }

  function showArticleNotice(ui) {
    var loc = getLocale();
    if (loc === 'en' || !ui || !ui.articleBodyEnglishNote) return;
    var slug = getArticleSlug();
    if (!slug) return;
    var main = document.querySelector('main.article-content');
    if (!main || document.getElementById('i18nArticleNotice')) return;
    var note = document.createElement('p');
    note.id = 'i18nArticleNotice';
    note.className = 'i18n-article-notice';
    note.style.cssText =
      'font-size:0.9rem;color:#94a3b8;margin:0 0 1rem;padding:0.65rem 0.85rem;background:#1e293b;border-radius:8px;border:1px solid #334155;';
    note.textContent = ui.articleBodyEnglishNote;
    var first = main.firstElementChild;
    if (first) main.insertBefore(note, first);
    else main.appendChild(note);
  }

  function run() {
    var loc = getLocale();
    document.documentElement.lang = (SUPPORTED[loc] && SUPPORTED[loc].htmlLang) || 'en';

    try {
      var clean = new URL(window.location.href);
      if (clean.searchParams.has('lang')) {
        clean.searchParams.delete('lang');
        window.history.replaceState({}, '', clean.pathname + clean.search + clean.hash);
      }
    } catch (e) {}

    bindLangPanel();

    if (loc === 'en') {
      renderBlogNavFooter({});
      return;
    }

    var mainUrl = i18nJsonUrl(loc + '.json');

    function applyPack(pack) {
      applyDataI18n(pack.ui);
      applyPageMeta(pack);
      if (isHomePage()) applyHomeCards(pack.homeCards);
      renderBlogNavFooter(pack.ui || {});
      applyArticle(pack);
      if (!pack.articles || !pack.articles[getArticleSlug() || '']) showArticleNotice(pack.ui || {});
    }

    fetch(mainUrl, { cache: 'no-store' })
      .then(function (r) {
        if (!r.ok) throw new Error(mainUrl);
        return r.json();
      })
      .then(function (pack) {
        applyPack(pack);
      })
      .catch(function () {
        bindLangPanel();
      });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
  else run();
})();
