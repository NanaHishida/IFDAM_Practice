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

  // メニュー操作（Page.jsから流用）
  const menuToggle = document.getElementById('menuToggle');
  const menuPanel = document.getElementById('menuPanel');

  function toggleMenu() {
    const isOpen = menuPanel.classList.toggle('show');
    menuToggle.classList.toggle('open', isOpen);
    menuPanel.setAttribute('aria-hidden', String(!isOpen));
  }

  menuToggle.addEventListener('click', toggleMenu);
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
      alert('アカウント情報変更画面へ遷移します。');
      // 実際には変更画面へ
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
