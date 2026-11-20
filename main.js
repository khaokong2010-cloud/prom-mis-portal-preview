(function () {
  'use strict';

  var $ = function (id) { return document.getElementById(id); };
  var state = {
    user: null,
    services: null,
    lastFocus: null,
    lockUntil: 0,
    lockReason: '',
    lockTimer: null,
    busy: false,
  };

  var items = [
    {
      id: 'search',
      t: 'ค้นหาโครงการ',
      d: 'ค้นหาและตรวจสอบรายละเอียดโครงการที่ต้องการ',
      icon: '<svg viewBox="0 0 48 48" aria-hidden="true"><rect x="8.5" y="10" width="29" height="25" rx="4" fill="#f7faff" stroke="#1d5cae" stroke-width="2.4"/><path d="M15 17h12M15 23h7" stroke="#9cbde6" stroke-width="2.2" stroke-linecap="round"/><circle cx="30.5" cy="29" r="8.5" fill="#fff" fill-opacity=".94" stroke="#ee6fa7" stroke-width="3"/><path d="m36.8 35.3 5 5" stroke="#ee6fa7" stroke-width="3.4" stroke-linecap="round"/><path d="M27.5 29h6" stroke="#ee6fa7" stroke-width="2" opacity=".6"/></svg>',
    },
    {
      id: 'evaluation',
      t: 'ประเมินโครงการ',
      d: 'ประเมินผลโครงการด้วยแบบฟอร์ม พบ.แผน-4',
      icon: '<svg viewBox="0 0 48 48" aria-hidden="true"><rect x="12" y="9" width="24" height="32" rx="4" fill="#f7faff" stroke="#1d5cae" stroke-width="2.4"/><rect x="18" y="6.5" width="12" height="7" rx="2" fill="#ee6fa7" stroke="#c23f76" stroke-width="1.8"/><path d="m17.5 22.5 3 3 5-6" fill="none" stroke="#1d5cae" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/><path d="m17.5 31.5 3 3 5-6" fill="none" stroke="#ee6fa7" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M29 23h1.5M29 32h1.5" stroke="#9cbde6" stroke-width="2.4" stroke-linecap="round"/></svg>',
    },
    {
      id: 'record',
      t: 'บันทึกข้อมูล',
      d: 'บันทึกและจัดเก็บข้อมูลโครงการอย่างเป็นระบบ',
      icon: '<svg viewBox="0 0 48 48" aria-hidden="true"><ellipse cx="24" cy="13.5" rx="12.5" ry="5" fill="#e7f1fe" stroke="#1d5cae" stroke-width="2.4"/><path d="M11.5 13.5v19c0 2.76 5.6 5 12.5 5s12.5-2.24 12.5-5v-19" fill="none" stroke="#1d5cae" stroke-width="2.4"/><path d="M11.5 22c0 2.76 5.6 5 12.5 5s12.5-2.24 12.5-5M11.5 30.5c0 2.76 5.6 5 12.5 5s12.5-2.24 12.5-5" fill="none" stroke="#ee6fa7" stroke-width="2.4" stroke-linecap="round"/><circle cx="30" cy="17.5" r="2" fill="#f3b33d"/></svg>',
    },
    {
      id: 'edit',
      t: 'แก้ไขข้อมูล',
      d: 'ปรับปรุงและแก้ไขข้อมูลโครงการให้เป็นปัจจุบัน',
      icon: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M12 8.5h17.5L36 15v24.5H12z" fill="#f7faff" stroke="#1d5cae" stroke-width="2.4" stroke-linejoin="round"/><path d="M29.5 8.5V15H36" fill="none" stroke="#9cbde6" stroke-width="2.2" stroke-linejoin="round"/><path d="M17 22h10M17 28h8" stroke="#9cbde6" stroke-width="2.2" stroke-linecap="round"/><path d="m34 15 5 5-14.5 14.5-6.8 1.8 1.8-6.8z" fill="#ee6fa7" stroke="#c23f76" stroke-width="2" stroke-linejoin="round"/><path d="m31.5 17.5 5 5" stroke="#fff" stroke-width="2" opacity=".75"/></svg>',
    },
    {
      id: 'report',
      t: 'รายงานโครงการ',
      d: 'ดูสรุปผลและรายงานความคืบหน้าของโครงการ',
      icon: '<svg viewBox="0 0 48 48" aria-hidden="true"><rect x="9" y="9" width="30" height="30" rx="5" fill="#f7faff" stroke="#1d5cae" stroke-width="2.4"/><path d="M17 31v-7M24 31V17M31 31v-4" stroke="#ee6fa7" stroke-width="4" stroke-linecap="round"/><path d="M15 34h18" stroke="#9cbde6" stroke-width="2" stroke-linecap="round"/><circle cx="31" cy="20" r="2" fill="#f3b33d"/></svg>',
    },
    {
      id: 'export',
      t: 'ส่งออกข้อมูล',
      d: 'ดาวน์โหลดและส่งออกข้อมูลเพื่อนำไปใช้งานต่อ',
      icon: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 28V9" stroke="#ee6fa7" stroke-width="3.2" stroke-linecap="round"/><path d="m16 17 8-8 8 8" fill="none" stroke="#ee6fa7" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 28v8a3 3 0 0 0 3 3h22a3 3 0 0 0 3-3v-8" fill="none" stroke="#1d5cae" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M17 28h14" stroke="#9cbde6" stroke-width="2" stroke-linecap="round"/></svg>',
    },
  ];

  var arrow = '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 10h11M11 5l5 5-5 5"/></svg>';

  function card(item) {
    return '<button class="m" type="button" data-service="' + item.id + '">'
      + '<span class="m-top"><span class="m-ico" aria-hidden="true">' + item.icon + '</span><span class="m-arr" aria-hidden="true">' + arrow + '</span></span>'
      + '<span class="m-title">' + item.t + '</span><span class="m-desc">' + item.d + '</span>'
      + '<span class="m-status admin"><span class="ms-dot" aria-hidden="true"></span>สำหรับผู้ดูแลระบบ</span>'
      + '</button>';
  }

  $('mgrid').innerHTML = items.map(card).join('');
  $('mgrid2').innerHTML = items.map(card).join('');

  function toast(message) {
    var old = document.querySelector('.toast');
    if (old) old.remove();
    var element = document.createElement('div');
    element.className = 'toast';
    element.setAttribute('role', 'status');
    element.textContent = message;
    document.body.appendChild(element);
    setTimeout(function () {
      element.classList.add('is-out');
      setTimeout(function () { element.remove(); }, 220);
    }, 2200);
  }

  function api(url, options) {
    options = options || {};
    var method = options.method || 'GET';
    var headers = { Accept: 'application/json' };
    if (method !== 'GET' && method !== 'HEAD') {
      headers['X-Requested-With'] = 'XMLHttpRequest';
      if (options.body !== undefined) headers['Content-Type'] = 'application/json';
    }
    var controller = null;
    var timer = null;
    if (typeof AbortController === 'function') {
      controller = new AbortController();
      timer = setTimeout(function () { controller.abort(); }, 15000);
    }
    return fetch(url, {
      method: method,
      headers: headers,
      body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
      credentials: 'same-origin',
      cache: 'no-store',
      redirect: 'error',
      signal: controller ? controller.signal : undefined,
    }).then(function (response) {
      return response.json().catch(function () { return {}; }).then(function (data) {
        return { response: response, data: data };
      });
    }).then(function (result) {
      if (timer) clearTimeout(timer);
      return result;
    }, function (error) {
      if (timer) clearTimeout(timer);
      throw error;
    });
  }

  function remainingText(ms) {
    var seconds = Math.max(0, Math.ceil(ms / 1000));
    var minutes = Math.floor(seconds / 60);
    var rest = seconds % 60;
    return minutes + ':' + (rest < 10 ? '0' : '') + rest;
  }

  function stopLockTimer() {
    if (state.lockTimer) {
      clearInterval(state.lockTimer);
      state.lockTimer = null;
    }
  }

  function startLockTimer() {
    if (state.lockTimer) return;
    state.lockTimer = setInterval(function () {
      if (state.lockUntil <= Date.now()) {
        state.lockUntil = 0;
        state.lockReason = '';
        stopLockTimer();
        syncLockUI();
        $('err').textContent = '';
        return;
      }
      syncLockUI();
    }, 1000);
  }

  function syncLockUI() {
    var locked = state.lockUntil > Date.now();
    $('loginForm').classList.toggle('is-locked', locked);
    $('username').disabled = locked;
    $('password').disabled = locked;
    $('loginBtn').disabled = locked || state.busy;
    $('lockNote').classList.toggle('is-locked', locked);
    if (locked) {
      var prefix = state.lockReason === 'rate'
        ? 'พยายามเข้าสู่ระบบบ่อยเกินไป จะปลดล็อกในอีก '
        : 'ระบบล็อกชั่วคราว จะปลดล็อกในอีก ';
      $('lockText').textContent = prefix + remainingText(state.lockUntil - Date.now()) + ' นาที';
      startLockTimer();
    } else {
      $('lockText').textContent = 'กรอกผิด 5 ครั้ง ระบบจะล็อก 5 นาที';
      stopLockTimer();
    }
  }

  function setBusy(busy) {
    state.busy = busy;
    var label = $('loginBtn').querySelector('span');
    if (label) label.textContent = busy ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ';
    $('loginBtn').setAttribute('aria-busy', busy ? 'true' : 'false');
    syncLockUI();
  }

  function applyLock(seconds, reason) {
    var ms = Math.max(0, Number(seconds) || 0) * 1000;
    if (ms <= 0) return;
    state.lockUntil = Math.max(state.lockUntil, Date.now() + ms);
    state.lockReason = reason || 'attempts';
    $('err').textContent = state.lockReason === 'rate'
      ? 'พยายามเข้าสู่ระบบบ่อยเกินไป กรุณารอสักครู่'
      : 'กรอกผิด 5 ครั้ง ระบบล็อกการเข้าสู่ระบบ 5 นาที';
    $('password').value = '';
    syncLockUI();
  }

  function show(page) {
    var evaluation = page === 'eval';
    $('portal').classList.toggle('hidden', evaluation);
    $('evalPage').classList.toggle('hidden', !evaluation);
    $('nav').classList.remove('hidden');
    document.body.classList.remove('light');
    window.scrollTo(0, 0);
  }

  function render() {
    document.body.classList.toggle('logged', Boolean(state.user));
    $('who').textContent = state.user ? 'ผู้ดูแล: ' + state.user : '';
    $('authBtn').textContent = state.user ? 'ออกจากระบบ' : 'สำหรับผู้ดูแล';
    $('authBtn').setAttribute('aria-label', state.user ? 'ออกจากระบบ' : 'เข้าสู่ระบบสำหรับผู้ดูแล');
    var label = $('heroAuthLabel');
    if (label) label.textContent = state.user ? 'จัดการบริการ' : 'สำหรับผู้ดูแล';
  }

  function openLogin(message) {
    state.lastFocus = document.activeElement;
    $('err').textContent = message || '';
    $('username').value = '';
    $('password').value = '';
    $('password').type = 'password';
    $('pwToggle').classList.remove('is-on');
    $('pwToggle').setAttribute('aria-pressed', 'false');
    $('pwToggle').setAttribute('aria-label', 'แสดงรหัสผ่าน');
    $('ov').classList.remove('hidden');
    document.body.classList.add('modal-open');
    syncLockUI();
    api('/api/auth-status').then(function (result) {
      if (result.response.ok && result.data && result.data.locked) {
        applyLock(result.data.retryAfter, 'attempts');
      }
    }).catch(function () {});
    setTimeout(function () {
      ($('username').disabled ? $('cancel') : $('username')).focus();
    }, 60);
  }

  function closeLogin() {
    stopLockTimer();
    $('ov').classList.add('hidden');
    document.body.classList.remove('modal-open');
    var focusTarget = state.lastFocus;
    state.lastFocus = null;
    if (focusTarget && focusTarget !== document.body && typeof focusTarget.focus === 'function' && !focusTarget.closest('.hidden')) {
      focusTarget.focus();
    } else {
      $('authBtn').focus();
    }
  }

  function loadServices() {
    return api('/api/services').then(function (result) {
      if (result.response.ok && result.data && result.data.services) {
        state.services = {};
        result.data.services.forEach(function (service) {
          state.services[service.id] = Boolean(service.available);
        });
      } else if (result.response.status === 401) {
        state.user = null;
        state.services = null;
        render();
      }
    }).catch(function () {});
  }

  function refreshSession() {
    var previousUser = state.user;
    return api('/api/session').then(function (result) {
      if (result.response.ok && result.data && result.data.authenticated) {
        state.user = result.data.user;
        render();
        if (!state.services || previousUser !== state.user) loadServices();
      } else {
        state.user = null;
        state.services = null;
        render();
        if (previousUser) toast('เซสชันหมดอายุ กรุณาเข้าสู่ระบบใหม่');
      }
    }).catch(function () {});
  }

  function attemptLogin() {
    if (state.busy) return;
    if (state.lockUntil > Date.now()) {
      syncLockUI();
      return;
    }
    var username = $('username').value.trim();
    var password = $('password').value;
    if (!username || !password) {
      $('err').textContent = 'กรุณากรอกชื่อผู้ใช้งานและรหัสผ่าน';
      (!username ? $('username') : $('password')).focus();
      return;
    }

    setBusy(true);
    $('err').textContent = '';
    api('/api/login', {
      method: 'POST',
      body: { username: username, password: password },
    }).then(function (result) {
      var data = result.data || {};
      if (result.response.ok && data.ok) {
        state.user = data.user || username;
        state.lockUntil = 0;
        state.lockReason = '';
        stopLockTimer();
        $('err').textContent = '';
        $('password').value = '';
        setBusy(false);
        closeLogin();
        render();
        loadServices();
        toast('เข้าสู่ระบบสำเร็จ');
        setTimeout(function () {
          var services = $('services');
          if (services) services.scrollIntoView({ block: 'start' });
        }, 350);
        return;
      }

      setBusy(false);
      if (result.response.status === 423) {
        applyLock(data.retryAfter || 300, 'attempts');
        return;
      }
      if (result.response.status === 429) {
        applyLock(data.retryAfter || 30, 'rate');
        return;
      }
      if (result.response.status === 401) {
        var remaining = Number(data.remaining);
        $('err').textContent = 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง'
          + (remaining > 0 ? ' เหลืออีก ' + remaining + ' ครั้ง' : '');
        $('password').value = '';
        $('password').focus();
        return;
      }
      if (result.response.status === 403) {
        $('err').textContent = 'คำขอไม่ถูกต้อง กรุณารีเฟรชหน้าเว็บแล้วลองใหม่';
        return;
      }
      $('err').textContent = 'เข้าสู่ระบบไม่สำเร็จ กรุณาลองใหม่';
    }).catch(function () {
      setBusy(false);
      $('err').textContent = 'เชื่อมต่อเซิร์ฟเวอร์ไม่ได้ กรุณาลองใหม่';
    });
  }

  function signOut() {
    if (state.busy) return;
    setBusy(true);
    api('/api/logout', { method: 'POST' }).then(function (result) {
      setBusy(false);
      if (result.response.ok || result.response.status === 401) {
        state.user = null;
        state.services = null;
        state.lockUntil = 0;
        state.lockReason = '';
        stopLockTimer();
        render();
        show('portal');
        toast('ออกจากระบบแล้ว');
      } else {
        toast('ออกจากระบบไม่สำเร็จ กรุณาลองใหม่');
      }
    }).catch(function () {
      setBusy(false);
      toast('เชื่อมต่อเซิร์ฟเวอร์ไม่ได้');
    });
  }

  function openService(serviceId) {
    var link = document.createElement('a');
    link.href = '/api/services/' + encodeURIComponent(serviceId);
    link.target = '_blank';
    link.rel = 'noopener';
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  function handleCardClick(event) {
    var button = event.target.closest('.m');
    if (!button) return;
    var serviceId = button.getAttribute('data-service');
    var item = null;
    for (var i = 0; i < items.length; i += 1) {
      if (items[i].id === serviceId) {
        item = items[i];
        break;
      }
    }
    if (!item) return;
    if (!state.user) {
      openLogin('บริการนี้สำหรับผู้ดูแลระบบ กรุณาเข้าสู่ระบบ');
      return;
    }
    if (state.services && state.services[serviceId] === false) {
      toast('ระบบ "' + item.t + '" อยู่ระหว่างการพัฒนา');
      return;
    }
    openService(serviceId);
  }

  $('authBtn').addEventListener('click', function () {
    if (state.user) signOut();
    else openLogin();
  });

  $('heroAuth').addEventListener('click', function () {
    if (state.user) {
      var services = $('services');
      if (services) services.scrollIntoView({ block: 'start' });
      return;
    }
    openLogin();
  });

  $('brandHome').addEventListener('click', function (event) {
    event.preventDefault();
    show('portal');
  });

  $('navServices').addEventListener('click', function (event) {
    event.preventDefault();
    var go = function () {
      var services = $('services');
      if (services) services.scrollIntoView({ block: 'start' });
    };
    if ($('portal').classList.contains('hidden')) {
      show('portal');
      setTimeout(go, 80);
    } else {
      go();
    }
  });

  $('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
    attemptLogin();
  });

  $('pwToggle').addEventListener('click', function () {
    var password = $('password');
    var showPassword = password.type === 'password';
    password.type = showPassword ? 'text' : 'password';
    this.classList.toggle('is-on', showPassword);
    this.setAttribute('aria-pressed', showPassword ? 'true' : 'false');
    this.setAttribute('aria-label', showPassword ? 'ซ่อนรหัสผ่าน' : 'แสดงรหัสผ่าน');
    password.focus();
  });

  $('cancel').addEventListener('click', closeLogin);

  $('ov').addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      closeLogin();
      return;
    }
    if (event.key !== 'Tab') return;
    var focusable = [].slice.call($('ov').querySelectorAll('a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])')).filter(function (element) {
      return element.offsetParent !== null;
    });
    if (!focusable.length) return;
    var first = focusable[0];
    var last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  $('ov').addEventListener('click', function (event) {
    if (event.target === $('ov')) closeLogin();
  });

  $('backBtn').addEventListener('click', function () {
    show('portal');
  });

  $('mgrid').addEventListener('click', handleCardClick);
  $('mgrid2').addEventListener('click', handleCardClick);

  document.addEventListener('visibilitychange', function () {
    if (!document.hidden) refreshSession();
  });

  if (location.hash === '#eval') show('eval');
  render();

  var params = new URLSearchParams(location.search);
  var expired = params.get('expired') === '1';
  refreshSession().then(function () {
    if (expired && !state.user) openLogin('เซสชันหมดอายุ กรุณาเข้าสู่ระบบใหม่');
    if (expired) history.replaceState(null, '', location.pathname + location.hash);
  });
})();
