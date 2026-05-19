document.addEventListener('DOMContentLoaded', () => {
  const logoutButton = document.getElementById('logoutButton');
  const detailButtons = document.querySelectorAll('.btn-outline-primary');
  const handoverButtons = document.querySelectorAll('.btn-primary');
  const editButtons = document.querySelectorAll('.btn-secondary');

  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      if (confirm('ログアウトしますか？')) {
        document.cookie = 'login=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        window.location.href = 'Login.html';
      }
    });
  }

  detailButtons.forEach((button) => {
    button.addEventListener('click', () => {
      alert('注文の詳細を表示します。');
    });
  });

  handoverButtons.forEach((button) => {
    button.addEventListener('click', () => {
      alert('商品を引き渡しました。');
    });
  });

  editButtons.forEach((button) => {
    button.addEventListener('click', () => {
      alert('この注文を編集します。');
    });
  });
});
