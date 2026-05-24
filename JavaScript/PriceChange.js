document.addEventListener('DOMContentLoaded', () => {
  const rows = Array.from(document.querySelectorAll('#priceItems tr'));
  const applyBtn = document.getElementById('applyPrices');

  function gatherChanges(){
    const changes = [];
    rows.forEach(r => {
      const newPriceInput = r.querySelector('.new-price');
      const newVal = newPriceInput.value.trim();
      if(newVal !== ''){
        const id = r.dataset.itemId;
        const name = r.querySelector('.name').textContent.trim();
        const current = parseInt(r.querySelector('.current-price').textContent.replace(/,/g,''),10) || 0;
        const newPrice = parseInt(newVal,10);
        changes.push({id, name, current, newPrice, row: r});
      }
    });
    return changes;
  }

  applyBtn.addEventListener('click', () => {
    const changes = gatherChanges();
    if(changes.length === 0){
      alert('変更する価格がありません。変更後価格を入力してください。');
      return;
    }

    // バリデーション: 価格が正の整数か
    const invalid = changes.find(c => !Number.isInteger(c.newPrice) || c.newPrice < 0);
    if(invalid){
      alert(`変更を確定できません。値段が不正です: ${invalid.name}`);
      return;
    }

    // ダミー送信ロジック — 実環境ではAPI呼び出しに置き換える
    console.log('Price change payload', changes.map(c => ({id: c.id, price: c.newPrice})));
    if(!confirm(`${changes.length} 件の価格を変更して確定します。よろしいですか？`)) return;

    // DOM に反映
    changes.forEach(c => {
      c.row.querySelector('.current-price').textContent = c.newPrice.toLocaleString();
      c.row.querySelector('.new-price').value = '';
    });

    alert('価格を更新しました（ダミー）。');
  });
});
