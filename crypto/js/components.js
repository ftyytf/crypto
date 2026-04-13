/* ================================================================
   COMPONENTS.JS v3 — Header, Footer, Auth Modal + Auth State
   ================================================================ */
(function() {
  'use strict';

  const AUTH_KEY = 'nx_user';
  function getUser() { try { return JSON.parse(localStorage.getItem(AUTH_KEY)); } catch(e) { return null; } }
  function setUser(d) { localStorage.setItem(AUTH_KEY, JSON.stringify(d)); }
  function clearUser() { localStorage.removeItem(AUTH_KEY); }
  function isLoggedIn() { return !!getUser(); }
  window.CryptoAuth = { getUser, setUser, clearUser, isLoggedIn };

  const currentPage = location.pathname.split('/').pop().replace('.html','') || 'index';
  function navA(p) { return currentPage === p ? 'nav-link active' : 'nav-link'; }
  function mobA(p) { return currentPage === p ? 'mobile-nav-link active' : 'mobile-nav-link'; }

  function buildHeaderActions() {
    const u = getUser();
    if (u) {
      const ch = u.name ? u.name.charAt(0).toUpperCase() : '?';
      return '<a href="dashboard.html" class="btn btn-ghost btn-sm"><span class="user-avatar-sm">' + ch + '</span> ' + (u.name || u.email) + '</a> <button class="btn btn-outline btn-sm" id="logout-btn">Выйти</button>';
    }
    return '<a href="dashboard.html" class="btn btn-ghost btn-sm">Кабинет</a><button class="btn btn-primary btn-sm" id="open-auth-btn">Войти</button>';
  }

  function buildMobileAuth() {
    const u = getUser();
    if (u) {
      const ch = u.name ? u.name.charAt(0).toUpperCase() : '?';
      return '<div class="mobile-nav-user"><div class="mobile-user-info"><span class="user-avatar-sm">' + ch + '</span><span>' + (u.name || u.email) + '</span></div><a href="dashboard.html" class="mobile-nav-link">Личный кабинет</a><a href="settings.html" class="mobile-nav-link">Настройки</a><button class="btn btn-outline btn-block" id="logout-btn-mobile">Выйти</button></div>';
    }
    return '<a href="dashboard.html" class="' + mobA('dashboard') + '">Личный кабинет</a><a href="settings.html" class="' + mobA('settings') + '">Настройки</a><button class="btn btn-primary btn-block" id="open-auth-mobile">Войти</button>';
  }

  const headerHTML = '<header class="header" id="site-header"><div class="container header-inner"><a href="index.html" class="logo"><span class="logo-icon">&#9672;</span><span class="logo-text">CryptoFlow by Muravsky</span></a><nav class="nav" id="main-nav"><a href="index.html" class="' + navA('index') + '">Главная</a><a href="exchange.html" class="' + navA('exchange') + '">Обмен</a><a href="rates.html" class="' + navA('rates') + '">Курсы</a><a href="markets.html" class="' + navA('markets') + '">Рынки</a><a href="about.html" class="' + navA('about') + '">О нас</a><a href="faq.html" class="' + navA('faq') + '">FAQ</a><a href="contacts.html" class="' + navA('contacts') + '">Контакты</a></nav><div class="header-actions"><button class="theme-toggle" id="theme-toggle" aria-label="Тема"><span class="theme-icon">☀️</span></button>' + buildHeaderActions() + '</div><button class="burger" id="burger-btn" aria-label="Меню"><span></span><span></span><span></span></button></div></header><div class="mobile-overlay" id="mobile-overlay"></div><nav class="mobile-nav" id="mobile-nav"><a href="index.html" class="' + mobA('index') + '">Главная</a><a href="exchange.html" class="' + mobA('exchange') + '">Обмен</a><a href="rates.html" class="' + mobA('rates') + '">Курсы</a><a href="markets.html" class="' + mobA('markets') + '">Рынки</a><a href="about.html" class="' + mobA('about') + '">О нас</a><a href="faq.html" class="' + mobA('faq') + '">FAQ</a><a href="contacts.html" class="' + mobA('contacts') + '">Контакты</a><div class="mobile-nav-divider"></div>' + buildMobileAuth() + '</nav>';

  /* FOOTER */
  const footerHTML = '<footer class="footer"><div class="container"><div class="footer-grid"><div class="footer-brand"><a href="index.html" class="logo"><span class="logo-icon">&#9672;</span><span class="logo-text">CryptoFlow by Muravsky</span></a><p class="footer-desc">Надёжная платформа для обмена криптовалют. Лучшие курсы, мгновенные сделки, безопасность на первом месте.</p><div class="footer-socials"><a href="https://t.me/CryptoFlow by Muravsky" class="footer-social" title="Telegram" target="_blank"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg></a><a href="#" class="footer-social" title="Twitter" target="_blank"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a></div></div><div class="footer-col"><h4 class="footer-heading">Платформа</h4><a href="exchange.html" class="footer-link">Обмен валют</a><a href="rates.html" class="footer-link">Курсы криптовалют</a><a href="markets.html" class="footer-link">Рынки</a><a href="dashboard.html" class="footer-link">Личный кабинет</a></div><div class="footer-col"><h4 class="footer-heading">Информация</h4><a href="about.html" class="footer-link">О компании</a><a href="faq.html" class="footer-link">Частые вопросы</a><a href="legal.html" class="footer-link">Правовые документы</a><a href="contacts.html" class="footer-link">Контакты</a></div><div class="footer-col"><h4 class="footer-heading">Контакты</h4><a href="mailto:support@CryptoFlow by Muravsky.io" class="footer-link">📧 support@CryptoFlow by Muravsky.io</a><a href="https://t.me/CryptoFlow by Muravsky" class="footer-link" target="_blank">💬 Telegram</a><a href="tel:+78001234567" class="footer-link">📞 8 (800) 123-45-67</a><span class="footer-link footer-status-online">🟢 Поддержка 24/7</span></div></div><div class="footer-bottom"><p>&copy; 2024 CryptoFlow by Muravsky. Все права защищены.</p><div class="footer-bottom-links"><a href="legal.html">Политика конфиденциальности</a><a href="legal.html">Условия использования</a><a href="legal.html">AML/KYC</a></div></div></div></footer>';

  /* AUTH MODAL */
  const authModalHTML = '<div class="modal-overlay" id="auth-modal"><div class="modal glass-card"><button class="modal-close" id="auth-modal-close" aria-label="Закрыть">&times;</button><div class="modal-header"><div class="modal-logo">&#9672;</div><h2 class="modal-title">CryptoFlow by Muravsky</h2></div><div class="auth-tabs"><button class="auth-tab active" data-tab="login">Вход</button><button class="auth-tab" data-tab="register">Регистрация</button></div><form class="auth-form active" id="form-login" novalidate><div class="form-group"><label class="form-label">Email</label><input type="email" class="form-input" placeholder="you@example.com" required></div><div class="form-group"><label class="form-label">Пароль</label><input type="password" class="form-input" placeholder="Минимум 6 символов" required minlength="6"></div><div class="form-row-between"><label class="form-checkbox-sm"><input type="checkbox"> Запомнить</label><a href="#" class="form-link-sm">Забыли пароль?</a></div><button type="submit" class="btn btn-primary btn-block btn-lg">Войти <span class="btn-arrow">&rarr;</span></button><p class="auth-switch">Нет аккаунта? <a href="#" data-switch="register">Создать</a></p></form><form class="auth-form" id="form-register" novalidate><div class="form-group"><label class="form-label">Имя</label><input type="text" class="form-input" placeholder="Ваше имя" required></div><div class="form-group"><label class="form-label">Email</label><input type="email" class="form-input" placeholder="you@example.com" required></div><div class="form-group"><label class="form-label">Пароль</label><input type="password" class="form-input" id="reg-password" placeholder="Минимум 8 символов" required minlength="8"></div><div class="form-group"><label class="form-label">Подтвердите</label><input type="password" class="form-input" id="reg-confirm" placeholder="Повторите пароль" required></div><label class="form-checkbox-sm"><input type="checkbox" required> Согласен с <a href="legal.html" target="_blank">условиями</a></label><button type="submit" class="btn btn-primary btn-block btn-lg">Создать аккаунт <span class="btn-arrow">&rarr;</span></button><p class="auth-switch">Есть аккаунт? <a href="#" data-switch="login">Войти</a></p></form></div></div>';

  const extraHTML = '<button class="back-to-top" id="back-to-top" aria-label="Наверх">&uarr;</button><div class="toast-container" id="toast-container"></div>';

  /* INJECT */
  var old;
  old = document.querySelector('header.header'); if(old) old.remove();
  old = document.querySelector('footer.footer'); if(old) old.remove();
  old = document.getElementById('auth-modal'); if(old) old.remove();
  old = document.getElementById('mobile-overlay'); if(old) old.remove();
  old = document.getElementById('mobile-nav'); if(old) old.remove();
  old = document.getElementById('back-to-top'); if(old) old.remove();
  old = document.getElementById('toast-container'); if(old) old.remove();

  document.body.insertAdjacentHTML('afterbegin', headerHTML);
  document.body.insertAdjacentHTML('beforeend', footerHTML);
  document.body.insertAdjacentHTML('beforeend', authModalHTML);
  document.body.insertAdjacentHTML('beforeend', extraHTML);

  /* ============================================================
     AUTH MODAL LOGIC
     ============================================================ */
  function initAuthModal() {
    var modal = document.getElementById('auth-modal');
    if (!modal) return;

    var formLogin = document.getElementById('form-login');
    var formRegister = document.getElementById('form-register');
    var tabs = modal.querySelectorAll('.auth-tab');

    function openModal() {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
    function closeModal() {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
    function switchTab(name) {
      tabs.forEach(function(t) { t.classList.toggle('active', t.dataset.tab === name); });
      if (formLogin) formLogin.classList.toggle('active', name === 'login');
      if (formRegister) formRegister.classList.toggle('active', name === 'register');
    }

    var openBtn = document.getElementById('open-auth-btn');
    var openMob = document.getElementById('open-auth-mobile');
    if (openBtn) openBtn.addEventListener('click', openModal);
    if (openMob) openMob.addEventListener('click', function() {
      document.getElementById('mobile-nav').classList.remove('active');
      document.getElementById('mobile-overlay').classList.remove('active');
      document.body.style.overflow = '';
      openModal();
    });

    document.getElementById('auth-modal-close').addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', function(e) { if (e.key === 'Escape' && modal.classList.contains('active')) closeModal(); });

    tabs.forEach(function(tab) { tab.addEventListener('click', function() { switchTab(tab.dataset.tab); }); });
    modal.querySelectorAll('[data-switch]').forEach(function(link) {
      link.addEventListener('click', function(e) { e.preventDefault(); switchTab(link.dataset.switch); });
    });

    /* LOGIN */
    if (formLogin) formLogin.addEventListener('submit', function(e) {
      e.preventDefault();
      var email = formLogin.querySelector('[type="email"]').value;
      var pass = formLogin.querySelector('[type="password"]').value;
      if (!email || email.indexOf('@') === -1) { showToast('Введите корректный email', 'warning'); return; }
      if (pass.length < 6) { showToast('Пароль минимум 6 символов', 'warning'); return; }
      setUser({ name: email.split('@')[0], email: email, joined: new Date().toISOString() });
      showToast('Добро пожаловать в CryptoFlow by Muravsky!', 'success');
      setTimeout(function() { closeModal(); location.reload(); }, 1000);
    });

    /* REGISTER */
    if (formRegister) formRegister.addEventListener('submit', function(e) {
      e.preventDefault();
      var inputs = formRegister.querySelectorAll('.form-input');
      var name = inputs[0] ? inputs[0].value : '';
      var email = inputs[1] ? inputs[1].value : '';
      var pass = document.getElementById('reg-password') ? document.getElementById('reg-password').value : '';
      var confirm = document.getElementById('reg-confirm') ? document.getElementById('reg-confirm').value : '';
      if (!name || name.length < 2) { showToast('Введите имя', 'warning'); return; }
      if (!email || email.indexOf('@') === -1) { showToast('Введите корректный email', 'warning'); return; }
      if (pass.length < 8) { showToast('Пароль минимум 8 символов', 'warning'); return; }
      if (pass !== confirm) { showToast('Пароли не совпадают', 'error'); return; }
      setUser({ name: name, email: email, joined: new Date().toISOString() });
      showToast('Аккаунт создан! Добро пожаловать!', 'success');
      setTimeout(function() { closeModal(); location.reload(); }, 1000);
    });
  }

  /* LOGOUT */
  function initLogout() {
    document.addEventListener('click', function(e) {
      if (e.target.id === 'logout-btn' || e.target.id === 'logout-btn-mobile') {
        clearUser();
        showToast('Вы вышли из аккаунта', 'info');
        setTimeout(function() { location.reload(); }, 800);
      }
    });
  }

  /* BURGER */
  function initBurger() {
    var burger = document.getElementById('burger-btn');
    var nav = document.getElementById('mobile-nav');
    var overlay = document.getElementById('mobile-overlay');
    if (!burger || !nav) return;
    function toggle() {
      var isOpen = nav.classList.toggle('active');
      if (overlay) overlay.classList.toggle('active', isOpen);
      burger.classList.toggle('active', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    }
    function close() {
      nav.classList.remove('active');
      if (overlay) overlay.classList.remove('active');
      burger.classList.remove('active');
      document.body.style.overflow = '';
    }
    burger.addEventListener('click', toggle);
    if (overlay) overlay.addEventListener('click', close);
    nav.querySelectorAll('.mobile-nav-link').forEach(function(l) { l.addEventListener('click', close); });
  }

  /* HEADER SCROLL */
  function initHeaderScroll() {
    var header = document.getElementById('site-header');
    if (!header) return;
    var ticking = false;
    window.addEventListener('scroll', function() {
      if (!ticking) { requestAnimationFrame(function() { header.classList.toggle('scrolled', window.scrollY > 50); ticking = false; }); ticking = true; }
    }, { passive: true });
  }

  /* BACK TO TOP */
  function initBackToTop() {
    var btn = document.getElementById('back-to-top');
    if (!btn) return;
    window.addEventListener('scroll', function() { btn.classList.toggle('visible', window.scrollY > 500); }, { passive: true });
    btn.addEventListener('click', function() { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  }

  /* TOAST */
  window.showToast = function(message, type, duration) {
    type = type || 'info';
    duration = duration || 3500;
    var container = document.getElementById('toast-container');
    if (!container) return;
    var icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };
    var toast = document.createElement('div');
    toast.className = 'toast toast-' + type;
    toast.innerHTML = '<span class="toast-icon">' + (icons[type] || icons.info) + '</span><span class="toast-msg">' + message + '</span><button class="toast-close">&times;</button>';
    container.appendChild(toast);
    requestAnimationFrame(function() { toast.classList.add('show'); });
    toast.querySelector('.toast-close').addEventListener('click', function() { rmToast(toast); });
    setTimeout(function() { rmToast(toast); }, duration);
  };
  function rmToast(t) { t.classList.remove('show'); t.classList.add('hide'); setTimeout(function() { t.remove(); }, 400); }

  /* THEME */
  function initTheme() {
    var btn = document.getElementById('theme-toggle');
    if (!btn) return;
    var saved = localStorage.getItem('nx-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', saved);
    updIcon(saved);
    btn.addEventListener('click', function() {
      var cur = document.documentElement.getAttribute('data-theme');
      var next = cur === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('nx-theme', next);
      updIcon(next);
    });
  }
  function updIcon(th) { var i = document.querySelector('#theme-toggle .theme-icon'); if (i) i.textContent = th === 'dark' ? '☀️' : '🌙'; }

  /* DASHBOARD ACCESS CHECK */
  function initDashboardGuard() {
    if (currentPage !== 'dashboard' && currentPage !== 'settings') return;
    if (isLoggedIn()) {
      console.log('[CryptoFlow by Muravsky] User authenticated:', getUser().name);
      return; /* User logged in — show dashboard normally */
    }
    /* NOT logged in — wait for DOM then replace */
    function showGuard() {
      var main = document.querySelector('main') || document.querySelector('.page-content') || document.querySelector('.dashboard-content') || document.querySelector('.settings-content') || document.body;
      var guard = document.createElement('div');
      guard.id = 'auth-guard';
      guard.style.cssText = 'display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:60vh;text-align:center;padding:2rem;position:fixed;top:0;left:0;right:0;bottom:0;z-index:999;background:var(--bg1,#0a0e1a)';
      guard.innerHTML = '<h2 style="font-size:1.6rem;font-weight:800;color:var(--text-bright,#f1f5f9);margin-bottom:1rem">Необходимо войти в аккаунт</h2><p style="color:var(--text3,#64748b);margin-bottom:1.5rem">Для доступа к личному кабинету авторизуйтесь</p><button class="btn btn-primary btn-lg" id="guard-auth-btn">Войти</button>';
      document.body.appendChild(guard);
      document.getElementById('guard-auth-btn').addEventListener('click', function() {
        var modal = document.getElementById('auth-modal');
        if (modal) { modal.classList.add('active'); document.body.style.overflow = 'hidden'; }
      });
    }
    showGuard();
  }

  /* INIT ALL */
  function initAll() {
    initAuthModal();
    initLogout();
    initBurger();
    initHeaderScroll();
    initBackToTop();
    initTheme();
    initDashboardGuard();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }

})();




