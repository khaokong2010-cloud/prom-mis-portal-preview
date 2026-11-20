(function () {
  'use strict';

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
    note.innerHTML = '<b>โหมดตัวอย่างบน GitHub Pages</b> — หน้านี้แสดงเฉพาะการออกแบบ ไม่มีการส่งข้อมูลหรือตรวจสอบรหัสผ่าน';
    authMain.insertBefore(note, authHelp);
  }

  document.addEventListener('submit', function (event) {
    if (!event.target || event.target.id !== 'loginForm') return;

    event.preventDefault();
    event.stopImmediatePropagation();

    var error = document.getElementById('err');
    if (error) {
      error.textContent = 'หน้านี้เป็นตัวอย่างการออกแบบบน GitHub Pages — การเข้าสู่ระบบใช้งานได้เฉพาะเวอร์ชันเซิร์ฟเวอร์ความปลอดภัยในเครื่อง';
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
