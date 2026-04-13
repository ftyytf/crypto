/* ============================================
   CryptoFlow by Muravsky — Auth (Login / Register)
   Modal tabs, validation, localStorage
   ============================================ */

(function(){
  'use strict';

  const USERS_KEY = 'nx_users';

  function getUsers(){
    try { return JSON.parse(localStorage.getItem(USERS_KEY)) || []; }
    catch(e){ return []; }
  }

  function saveUsers(arr){
    localStorage.setItem(USERS_KEY, JSON.stringify(arr));
  }

  function hashPass(s){
    let h = 0;
    for(let i = 0; i < s.length; i++){
      h = ((h << 5) - h) + s.charCodeAt(i);
      h |= 0;
    }
    return 'h_' + Math.abs(h).toString(36);
  }

  function validateEmail(e){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  }

  function validatePass(p){
    return p.length >= 6;
  }

  document.addEventListener('DOMContentLoaded', () => {

    /* ---------- AUTH TABS ---------- */
    document.querySelectorAll('.auth-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const modal = tab.closest('.modal');
        if(!modal) return;
        modal.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const target = tab.getAttribute('data-tab');
        modal.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
        const form = modal.querySelector('#' + target);
        if(form) form.classList.add('active');
      });
    });

    /* ---------- LOGIN ---------- */
    const loginForm = document.getElementById('loginForm');
    if(loginForm){
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const fd = new FormData(loginForm);
        const email = (fd.get('email') || '').trim().toLowerCase();
        const pass = fd.get('password') || '';

        if(!validateEmail(email)){
          showFieldError(loginForm, 'email', 'Введите корректный email');
          return;
        }
        clearFieldError(loginForm, 'email');

        if(!validatePass(pass)){
          showFieldError(loginForm, 'password', 'Минимум 6 символов');
          return;
        }
        clearFieldError(loginForm, 'password');

        const users = getUsers();
        const user = users.find(u => u.email === email);
        if(!user || user.pass !== hashPass(pass)){
          window.NX.toast('Неверный email или пароль', 'error');
          return;
        }

        window.NX.setUser({email: user.email, name: user.name, joined: user.joined});
        window.NX.closeModal('authModal');
        window.NX.toast('Добро пожаловать, ' + user.name + '!', 'success');
        loginForm.reset();
      });
    }

    /* ---------- REGISTER ---------- */
    const regForm = document.getElementById('registerForm');
    if(regForm){
      regForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const fd = new FormData(regForm);
        const name = (fd.get('name') || '').trim();
        const email = (fd.get('email') || '').trim().toLowerCase();
        const pass = fd.get('password') || '';
        const agree = fd.get('agree');

        if(name.length < 2){
          showFieldError(regForm, 'name', 'Введите имя');
          return;
        }
        clearFieldError(regForm, 'name');

        if(!validateEmail(email)){
          showFieldError(regForm, 'email', 'Введите корректный email');
          return;
        }
        clearFieldError(regForm, 'email');

        if(!validatePass(pass)){
          showFieldError(regForm, 'password', 'Минимум 6 символов');
          return;
        }
        clearFieldError(regForm, 'password');

        if(!agree){
          window.NX.toast('Примите условия использования', 'error');
          return;
        }

        const users = getUsers();
        if(users.find(u => u.email === email)){
          window.NX.toast('Этот email уже зарегистрирован', 'error');
          return;
        }

        const newUser = {
          email: email,
          name: name,
          pass: hashPass(pass),
          joined: Date.now(),
          balance: {
            BTC: 0.05,
            ETH: 0.8,
            USDT: 1200,
            USD: 500
          }
        };
        users.push(newUser);
        saveUsers(users);

        window.NX.setUser({email: newUser.email, name: newUser.name, joined: newUser.joined});
        window.NX.closeModal('authModal');
        window.NX.toast('Аккаунт создан! Добро пожаловать!', 'success');
        regForm.reset();
      });
    }

    /* ---------- LOGOUT BUTTONS ---------- */
    document.querySelectorAll('[data-action="logout"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        window.NX.logout();
      });
    });
  });

  /* ---------- FIELD ERRORS ---------- */
  function showFieldError(form, fieldName, msg){
    const input = form.querySelector('[name="'+fieldName+'"]');
    if(!input) return;
    input.classList.add('error');
    let err = input.parentElement.querySelector('.field-error');
    if(!err){
      err = document.createElement('div');
      err.className = 'field-error';
      err.style.cssText = 'color:var(--er);font-size:12px;margin-top:4px;';
      input.parentElement.appendChild(err);
    }
    err.textContent = msg;
  }

  function clearFieldError(form, fieldName){
    const input = form.querySelector('[name="'+fieldName+'"]');
    if(!input) return;
    input.classList.remove('error');
    const err = input.parentElement.querySelector('.field-error');
    if(err) err.remove();
  }

})();


