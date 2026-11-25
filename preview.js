(function () {
  'use strict';

  var LIVE_URL = 'https://school-mis-portal-qvx6x4775pxcx65r-8443.app.github.dev/';

  document.body.classList.add('preview-mode');

  var banner = document.getElementById('previewBanner');
  var close = document.getElementById('previewClose');
  if (banner && close) {
    close.addEventListener('click', function () {
      banner.hidden = true;
    });
  }

  var authMain = document.querySelector('.auth-main');
  var authHelp = document.querySelector('.auth-help');
  if (authMain && authHelp && !document.querySelector('.preview-note')) {
    var note = document.createElement('p');
    note.className = 'preview-note';
    note.innerHTML =
      '<b>หน้านี้เป็นตัวอย่างการออกแบบ</b> — ไม่มีการตรวจสอบรหัสผ่าน ' +
      'หากต้องการเข้าสู่ระบบจริง กรุณาเปิด' +
      '<a class="preview-link" href="' + LIVE_URL + '" target="_blank" rel="noopener">พอร์ทัลสาธารณะ</a>';
    authMain.insertBefore(note, authHelp);
  }

  document.addEventListener('submit', function (event) {
    if (!event.target || event.target.id !== 'loginForm') return;

    event.preventDefault();
    event.stopImmediatePropagation();

    var error = document.getElementById('err');
    if (error) {
      error.innerHTML =
        'หน้านี้เป็นตัวอย่างการออกแบบ — กรุณาเข้าสู่ระบบที่' +
        '<a class="preview-link" href="' + LIVE_URL + '" target="_blank" rel="noopener">พอร์ทัลสาธารณะ</a>';
    }

    var password = document.getElementById('password');
    if (password) password.value = '';

    var button = document.getElementById('loginBtn');
    if (button) {
      button.disabled = false;
      button.removeAttribute('aria-busy');
      var label = button.querySelector('span');
      if (label) label.textContent = 'เข้าสู่ระบบ';
    }
  }, true);
})();
