document.addEventListener('DOMContentLoaded', () => {
  // タブ切り替え
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTab = button.getAttribute('data-tab');

      // アクティブなタブボタンを更新
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // タブコンテンツを表示
      tabContents.forEach(content => {
        content.classList.remove('active');
        if (content.id === targetTab + 'Tab') {
          content.classList.add('active');
        }
      });
    });
  });

  const editPassword = document.getElementById('editPassword');
  editPassword.addEventListener('click', () => {
    window.location.href = 'PasswordChange.html';
  });

  // ストレージ
  const storage = localStorage;
  if (storage.getItem('name')) {
    const name = storage.getItem('name');
    document.getElementById('userName').textContent = name;
  } else {
    document.getElementById('userName').textContent = '名前が登録されていません。アカウント情報の変更から名前を登録してください。';
  }
  if (storage.getItem('email')) {
    const email = storage.getItem('email');
    document.getElementById('userEmail').textContent = email;
  }

  // メニュー操作（Page.jsから流用）
  const menuToggle = document.getElementById('menuToggle');
  const menuClose = document.getElementById('menuClose');
  const menuPanel = document.getElementById('menuPanel');

  function toggleMenu() {
    const isOpen = menuPanel.classList.toggle('show');
    menuToggle.classList.toggle('open', isOpen);
    menuPanel.setAttribute('aria-hidden', String(!isOpen));
  }

  menuToggle.addEventListener('click', toggleMenu);
  menuClose.addEventListener('click', () => {
    menuToggle.focus();
    toggleMenu();
  });
  menuPanel.addEventListener('click', (event) => {
    if (event.target === menuPanel) toggleMenu();
  });

  // ログアウト
  const logoutLink = document.getElementById('logoutLink');
  if (logoutLink) {
    logoutLink.addEventListener('click', () => {
      if (confirm('ログアウトしますか？')) {
        // ログアウト処理（例: cookie削除、localStorageクリア）
        document.cookie = 'login=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        localStorage.clear();
        window.location.href = 'Login.html';
      }
    });
  }

  // アカウント情報変更
  const editAccountBtn = document.getElementById('editAccountBtn');
  if (editAccountBtn) {
    editAccountBtn.addEventListener('click', () => {
      window.location.href = 'AccountEdit.html';
    });
  }

  // ダウンロードリンク
  const downloadLinks = document.querySelectorAll('.download-link');
  downloadLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      alert('受け取り票をダウンロードします。');
    });
  });
});
