document.addEventListener('DOMContentLoaded', () => {
  const logoutButton = document.getElementById('logoutButton');

  //注文の内容をデータベースから取得
  //表示する場所をドキュメントから取得
  //innerHTMLする

  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      if (confirm('ログアウトしますか？')) {
        document.cookie = 'login=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        window.location.href = 'Login.html';
      }
    });
  }

  document.getElementById('back').addEventListener('click', () => {
    history.back();
  })
});
