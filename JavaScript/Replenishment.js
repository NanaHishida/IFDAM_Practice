document.addEventListener('DOMContentLoaded', () => {
  const rows = Array.from(document.querySelectorAll('#items tr'));
  const grandTotalEl = document.getElementById('grandTotal');

  function recalcRow(row){
    const setsInput = row.querySelector('.order-sets');
    const perSet = parseInt(row.querySelector('.per-set').textContent || '0', 10);
    const unitPrice = parseInt(row.querySelector('.unit-price').textContent || '0', 10);
    const sets = Math.max(0, parseInt(setsInput.value || '0', 10));
    const totalCount = sets * perSet;
    row.querySelector('.total-count').textContent = totalCount;
    row.querySelector('.amount').textContent = (totalCount * unitPrice).toLocaleString();
  }

  function recalcAll(){
    let grand = 0;
    rows.forEach(r => {
      recalcRow(r);
      const amtText = r.querySelector('.amount').textContent.replace(/,/g,'') || '0';
      grand += parseInt(amtText, 10);
    });
    grandTotalEl.textContent = grand.toLocaleString();
  }

  rows.forEach(r => {
    const input = r.querySelector('.order-sets');
    input.addEventListener('input', () => {
      recalcRow(r);
      recalcAll();
    });
  });

  // 初期計算
  recalcAll();

  document.getElementById('sendOrders').addEventListener('click', () => {
    const orders = [];
    rows.forEach(r =>{
      const sets = parseInt(r.querySelector('.order-sets').value || '0', 10);
      if(sets > 0){
        orders.push({
          id: r.dataset.itemId,
          name: r.querySelector('.name').textContent.trim(),
          sets: sets,
          perSet: parseInt(r.querySelector('.per-set').textContent || '0',10),
          unitPrice: parseInt(r.querySelector('.unit-price').textContent || '0',10)
        });
      }
    });

    if(orders.length === 0){
      alert('注文するアイテムがありません。注文セット数を入力してください。');
      return;
    }

    // ここで実際の送信処理(API)に置き換えてください。とりあえずコンソール出力と確認ダイアログ。
    console.log('送信データ', orders);
    const confirmMsg = `以下の${orders.length}件を送信します。よろしいですか？`;
    if(confirm(confirmMsg)){
      alert('送信しました（ダミー）。');
    }
  });
});
