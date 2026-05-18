document.addEventListener('DOMContentLoaded', () => {
  const accountEditForm = document.getElementById('accountEditForm');
  const logoutLink = document.getElementById('logoutLink');
  const currentEmail = document.getElementById('editEmail').value;
  if (localStorage.getItem('name')) {
    document.getElementById('editName').value = localStorage.getItem('name');
  } else {
    document.getElementById('editName').value = '名前を設定してください';
  };
  const currentName = document.getElementById('editName').value;

  if (accountEditForm) {
    accountEditForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const password = document.getElementById('editPassword').value;
      const passwordConfirm = document.getElementById('editPasswordConfirm').value;

      if (password !== passwordConfirm) {
        alert('パスワードと確認用パスワードが一致しません。');
        return;
      }

      const newEmail = document.getElementById('editEmail').value;
      const newName = document.getElementById('editName').value;

      // localStorageに保存
      localStorage.setItem('name', newName);
      localStorage.setItem('email', newEmail);

      alert('会員情報を変更しました。');

      if (currentEmail === newEmail) {
        window.location.href = 'Account.html';
      } else {
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
