document.addEventListener('DOMContentLoaded', () => {
  // Toggle accepting orders on main admin page
  const toggleOrders = document.getElementById('toggleOrders');
  if(toggleOrders){
    let stopped = false;
    toggleOrders.addEventListener('click', () => {
      stopped = !stopped;
      toggleOrders.textContent = stopped ? '受注を再開する' : '受注を停止する';
      toggleOrders.classList.toggle('btn-outline-danger');
      toggleOrders.classList.toggle('btn-outline-success');
      alert(`受注を${stopped ? '停止' : '再開'}しました（ダミー）。`);
    });
  }

  // Account management actions
  document.querySelectorAll('.delete-account').forEach(btn => {
    btn.addEventListener('click', (e) => {
      if(!confirm('このアカウントを削除しますか？')) return;
      const article = e.target.closest('article');
      article.remove();
    });
  });

  // Customize management actions
  document.querySelectorAll('.delete-customize').forEach(btn => {
    btn.addEventListener('click', (e) => {
      if(!confirm('このカスタマイズを削除しますか？')) return;
      e.target.closest('article').remove();
    });
  });

  document.querySelectorAll('.stop-order').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const b = e.target;
      const stopped = b.dataset.stopped === '1';
      if(!stopped){
        if(confirm('このカスタマイズの受注を停止しますか？')){
          b.textContent = '受注を再開する';
          b.dataset.stopped = '1';
        }
      } else {
        if(confirm('このカスタマイズの受注を再開しますか？')){
          b.textContent = '受注を停止する';
          b.dataset.stopped = '0';
        }
      }
    });
  });

});
