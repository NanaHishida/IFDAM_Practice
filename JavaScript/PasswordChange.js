document.addEventListener('DOMContentLoaded', () => {
  const passwordChangeForm = document.getElementById('passwordChangeForm');
  const menuToggle = document.getElementById('menuToggle');
  const menuPanel = document.getElementById('menuPanel');
  const menuClose = document.getElementById('menuClose');
  const logoutLink = document.getElementById('logoutLink');

  function toggleMenu() {
    if (!menuPanel || !menuToggle) return;
    const isOpen = menuPanel.classList.toggle('show');
    menuToggle.classList.toggle('open', isOpen);
    menuPanel.setAttribute('aria-hidden', String(!isOpen));
  }

  if (menuToggle) menuToggle.addEventListener('click', toggleMenu);
  if (menuClose) menuClose.addEventListener('click', toggleMenu);
  if (menuPanel) {
    menuPanel.addEventListener('click', (event) => {
      if (event.target === menuPanel) toggleMenu();
    });
  }

  if (logoutLink) {
    logoutLink.addEventListener('click', (event) => {
      event.preventDefault();
      if (confirm('ログアウトしますか？')) {
        document.cookie = 'login=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        localStorage.clear();
        window.location.href = 'Login.html';
      }
    });
  }

  if (passwordChangeForm) {
    passwordChangeForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const verificationCode = document.getElementById('verificationCode').value.trim();
      const newPassword = document.getElementById('newPassword').value;
      const confirmPassword = document.getElementById('confirmPassword').value;
      const expectedCode = '123456';

      if (!verificationCode) {
        alert('認証番号を入力してください。');
        return;
      }

      if (verificationCode !== expectedCode) {
        alert('認証番号が正しくありません。メールに届いた番号を確認してください。');
        return;
      }

      if (!newPassword || !confirmPassword) {
        alert('新しいパスワードと確認用パスワードを入力してください。');
        return;
      }

      if (newPassword !== confirmPassword) {
        alert('パスワードが一致しません。');
        return;
      }

      localStorage.setItem('password', newPassword);
      alert('パスワードが変更されました。');
      window.location.href = 'Account.html';
    });
  }
});