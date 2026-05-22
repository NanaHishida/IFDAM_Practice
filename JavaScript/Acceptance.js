document.addEventListener('DOMContentLoaded', () => {
  const logoutButton = document.getElementById('logoutButton');
  const detailButtons = document.querySelectorAll('.btn-outline-primary');
  const handoverButtons = document.querySelectorAll('.btn-primary');
  const editButtons = document.querySelectorAll('.btn-secondary');
  const statusSelects = document.querySelectorAll('select.order-status');

  //ドキュメントの注文を並べる場所を取得
  //データをデータベースから入手
  //innerHTMLする

  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      if (confirm('ログアウトしますか？')) {
        document.cookie = 'login=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        window.location.href = 'Login.html';
      }
    });
  }

  // 注文ステータスドロップダウンの変更イベント
  statusSelects.forEach((select) => {
    // 初期状態でクラスを設定
    const initialValue = select.value;
    select.classList.add(`order-status--${initialValue}`);
    
    select.addEventListener('change', (e) => {
      const value = e.target.value;
      const statusTexts = {
        'waiting': '商品引き渡し待ち',
        'in-progress': '準備中',
        'completed': '完了'
      };
      
      // 前のクラスをすべて削除
      select.classList.remove('order-status--waiting', 'order-status--in-progress', 'order-status--completed');
      
      // 新しいクラスを追加
      select.classList.add(`order-status--${value}`);
      
      console.log(`注文ステータスが「${statusTexts[value]}」に変更されました`);
      // ここでサーバーに送信する処理を追加できます
    });
  });

  detailButtons.forEach((button) => {
    button.addEventListener('click', () => {
      alert('注文の詳細を表示します。');
    });
  });

  handoverButtons.forEach((button) => {
    button.addEventListener('click', () => {
      window.location.href = 'Handover.html';
    });
  });

  editButtons.forEach((button) => {
    button.addEventListener('click', () => {
      alert('この注文を編集します。');
    });
  });
});
