document.addEventListener('DOMContentLoaded', () => {
  const logoutButton = document.getElementById('logoutButton');
  const statusSelects = document.querySelectorAll('select.order-status');

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
      select.classList.remove('order-status--newlyAccepted', 'order-status--waiting', 'order-status--in-progress', 'order-status--completed');
      
      // 新しいクラスを追加
      select.classList.add(`order-status--${value}`);
      
      console.log(`注文ステータスが「${statusTexts[value]}」に変更されました`);
      // ここでサーバーに送信する処理を追加できます
    });
  });
});
