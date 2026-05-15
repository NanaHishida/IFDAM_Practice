document.addEventListener('DOMContentLoaded', () => {
  const accountEditForm = document.getElementById('accountEditForm');
  const logoutLink = document.getElementById('logoutLink');
  const currentEmail = document.getElementById('editEmail').value;

  if (accountEditForm) {
    accountEditForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const password = document.getElementById('editPassword').value;
      const passwordConfirm = document.getElementById('editPasswordConfirm').value;

      if (password !== passwordConfirm) {
        alert('パスワードと確認用パスワードが一致しません。');
        return;
      }

      const newEmail = document.getElementById('editEmail').textContent;

      alert('会員情報を変更しました。');

      if (currentEmail === newEmail) {
        window.location.href = 'Account.html';
      } else {
        document.getElementById('editEmail').value = newEmail;
        window.location.href = 'Verification.html';
      }
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
});
