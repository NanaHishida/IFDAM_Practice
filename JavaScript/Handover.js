document.addEventListener('DOMContentLoaded', () => {
  const logoutButton = document.getElementById('logoutButton');
  const backButtons = document.querySelectorAll('#backButton, #backButton2');
  const handoverCompleteButton = document.getElementById('handoverCompleteButton');

  // ログアウトボタン
  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      if (confirm('ログアウトしますか？')) {
        document.cookie = 'login=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        window.location.href = 'Login.html';
      }
    });
  }

  // 戻るボタン
  backButtons.forEach((button) => {
    button.addEventListener('click', () => {
      window.history.back();
    });
  });

  // 引き渡し済ボタン
  if (handoverCompleteButton) {
    handoverCompleteButton.addEventListener('click', () => {
      if (confirm('この商品を引き渡しましたか？')) {
        alert('商品を引き渡しました。');
        // ここでサーバーに引き渡し完了を送信し、注文ステータスを「完了」に更新
        window.history.back();
      }
    });
  }
});
