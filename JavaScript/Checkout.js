// ページ読み込み時にlocalStorageから注文情報を取得して表示
window.addEventListener('DOMContentLoaded', () => {
  const checkoutData = JSON.parse(localStorage.getItem('checkoutData'));
  
  if (checkoutData) {
    // 注文内容を表示
    const orderDetailsDiv = document.getElementById('orderDetails');
    if (orderDetailsDiv) {
      let html = '<h2>注文内容</h2>';
      html += '<div class="order-item"><strong>ベース:</strong> ' + checkoutData.base + ' (¥' + checkoutData.basePrice.toLocaleString() + ')</div>';
      
      if (checkoutData.toppings && checkoutData.toppings.length > 0) {
        html += '<div><strong>トッピング:</strong></div>';
        checkoutData.toppings.forEach(topping => {
          const count = topping.count || 1;
          html += '<div class="order-item">' + topping.name + ' x' + count + ' (¥' + (topping.price * count).toLocaleString() + ')</div>';
        });
      }
      
      if (checkoutData.decoration) {
        html += '<div class="order-item"><strong>デコレーション:</strong> ' + checkoutData.decoration + ' (¥' + checkoutData.decorationPrice.toLocaleString() + ')</div>';
      }
      
      if (checkoutData.memo) {
        html += '<div class="order-item"><strong>メモ:</strong> ' + checkoutData.memo + '</div>';
      }
      
      html += '<div class="order-summary">';
      html += '<div>小計: ¥' + checkoutData.subtotal.toLocaleString() + '</div>';
      html += '<div>税金: ¥' + checkoutData.tax.toLocaleString() + '</div>';
      html += '<div class="order-total"><strong>合計: ¥' + checkoutData.total.toLocaleString() + '</strong></div>';
      html += '</div>';
      
      orderDetailsDiv.innerHTML = html;
    }
  }
});

document.getElementById('back').addEventListener('click', () => {
  history.back();
});