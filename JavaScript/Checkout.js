function formatCurrency(value) {
  return '¥' + Number(value || 0).toLocaleString();
}

function getCheckoutData() {
  try {
    return JSON.parse(localStorage.getItem('checkoutData')) || null;
  } catch (error) {
    return null;
  }
}

function renderOrderDetails(checkoutData) {
  const orderDetailsDiv = document.getElementById('orderDetails');
  const memoPreview = document.getElementById('memoPreview');
  const previewImage = document.getElementById('previewImage');

  if (!orderDetailsDiv || !memoPreview || !previewImage) return;

  if (!checkoutData) {
    orderDetailsDiv.innerHTML = '<div class="order-loading">注文内容が読み込まれていません。Customize画面から再度お試しください。</div>';
    memoPreview.value = '';
    previewImage.textContent = 'プレビューがありません';
    return;
  }

  let html = '';
  html += '<div class="order-item"><span>ベース</span><strong>' + checkoutData.base + '</strong></div>';

  if (checkoutData.toppings && checkoutData.toppings.length > 0) {
    checkoutData.toppings.forEach(topping => {
      const count = topping.count || 1;
      const totalPrice = topping.price * count;
      html += '<div class="order-item"><span>' + topping.name + ' x' + count + '</span><strong>' + formatCurrency(totalPrice) + '</strong></div>';
    });
  }

  if (checkoutData.decoration) {
    html += '<div class="order-item"><span>デコレーション</span><strong>' + checkoutData.decoration + '</strong></div>';
  }

  if (checkoutData.memo) {
    html += '<div class="order-item"><span>メモ</span><strong>' + checkoutData.memo + '</strong></div>';
  }

  html += '<div class="order-summary-block">';
  html += '<div><span>小計</span><strong>' + formatCurrency(checkoutData.subtotal) + '</strong></div>';
  html += '<div><span>消費税</span><strong>' + formatCurrency(checkoutData.tax) + '</strong></div>';
  html += '<div class="order-total"><span>合計</span><strong>' + formatCurrency(checkoutData.total) + '</strong></div>';
  html += '</div>';

  orderDetailsDiv.innerHTML = html;
  memoPreview.value = checkoutData.memo || '';
  previewImage.textContent = checkoutData.base || 'ケーキ';
}

function populatePickupSelectors() {
  const monthSelect = document.getElementById('pickupMonth');
  const daySelect = document.getElementById('pickupDay');
  if (!monthSelect || !daySelect) return;

  monthSelect.innerHTML = '<option value="">月</option>';
  daySelect.innerHTML = '<option value="">日</option>';

  for (let m = 1; m <= 12; m += 1) {
    const option = document.createElement('option');
    option.value = m;
    option.textContent = m + '月';
    monthSelect.appendChild(option);
  }

  for (let d = 1; d <= 31; d += 1) {
    const option = document.createElement('option');
    option.value = d;
    option.textContent = d + '日';
    daySelect.appendChild(option);
  }
}

function updatePaymentDetails() {
  const paymentDetails = document.getElementById('paymentDetails');
  if (!paymentDetails) return;

  const selectedMethod = document.querySelector('input[name="paymentMethod"]:checked');
  if (!selectedMethod) return;

  if (selectedMethod.value === 'card') {
    paymentDetails.innerHTML = '<div class="payment-row"><label>カード番号</label><div class="payment-row quarter"><input type="text" id="cardNumber1" maxlength="4" placeholder="0000" inputmode="numeric"><input type="text" id="cardNumber2" maxlength="4" placeholder="0000" inputmode="numeric"><input type="text" id="cardNumber3" maxlength="4" placeholder="0000" inputmode="numeric"><input type="text" id="cardNumber4" maxlength="4" placeholder="0000" inputmode="numeric"></div></div><div class="payment-row"><label>有効期限</label><div class="payment-row half"><select id="cardExpiryMonth"></select><select id="cardExpiryYear"></select></div></div><div class="payment-row"><label>セキュリティコード</label><input type="text" id="cardCvc" maxlength="4" placeholder="123" inputmode="numeric"></div>';
    populateExpiryOptions();
  } else if (selectedMethod.value === 'emoney') {
    paymentDetails.innerHTML = '<div class="payment-row"><label>電子マネーID</label><input type="text" id="emoneyId" placeholder="例: suica1234"></div>';
  } else {
    paymentDetails.innerHTML = '<div class="payment-row"><p>お引き渡し時に現金でお支払いください。</p></div>';
  }
}

function populateExpiryOptions() {
  const monthSelect = document.getElementById('cardExpiryMonth');
  const yearSelect = document.getElementById('cardExpiryYear');
  if (!monthSelect || !yearSelect) return;

  monthSelect.innerHTML = '<option value="">MM</option>';
  yearSelect.innerHTML = '<option value="">YY</option>';

  for (let i = 1; i <= 12; i += 1) {
    const option = document.createElement('option');
    option.value = i.toString().padStart(2, '0');
    option.textContent = i.toString().padStart(2, '0');
    monthSelect.appendChild(option);
  }

  const currentYear = new Date().getFullYear();
  for (let i = 0; i < 10; i += 1) {
    const year = currentYear + i;
    const option = document.createElement('option');
    option.value = year.toString().slice(-2);
    option.textContent = year.toString().slice(-2);
    yearSelect.appendChild(option);
  }
}

function setEarliestCompletionDate() {
  const earliestDate = document.getElementById('earliestDate');
  if (!earliestDate) return;
  const date = new Date();
  date.setDate(date.getDate() + 3);
  earliestDate.textContent = `${date.getMonth() + 1}月${date.getDate()}日`;
}

function confirmPickupDate() {
  const monthSelect = document.getElementById('pickupMonth');
  const daySelect = document.getElementById('pickupDay');
  const pickedDate = document.getElementById('pickedDate');
  if (!monthSelect || !daySelect || !pickedDate) return;

  const month = monthSelect.value;
  const day = daySelect.value;
  if (!month || !day) {
    alert('お引き渡し希望日の月と日を選択してください。');
    return;
  }

  pickedDate.textContent = month + '月' + day + '日';
}

function validateOrder() {
  const checkoutData = getCheckoutData();
  if (!checkoutData) {
    return '注文情報が読み込まれていません。';
  }

  const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked');
  if (!paymentMethod) {
    return '決済方法を選択してください。';
  }

  const month = document.getElementById('pickupMonth').value;
  const day = document.getElementById('pickupDay').value;
  if (!month || !day) {
    return 'お引き渡し希望日を確定してください。';
  }

  if (paymentMethod.value === 'card') {
    const cardNumber1 = document.getElementById('cardNumber1').value.trim();
    const cardNumber2 = document.getElementById('cardNumber2').value.trim();
    const cardNumber3 = document.getElementById('cardNumber3').value.trim();
    const cardNumber4 = document.getElementById('cardNumber4').value.trim();
    const expiryMonth = document.getElementById('cardExpiryMonth').value;
    const expiryYear = document.getElementById('cardExpiryYear').value;
    const cvc = document.getElementById('cardCvc').value.trim();

    if ([cardNumber1, cardNumber2, cardNumber3, cardNumber4].some(segment => segment.length !== 4)) {
      return 'カード番号を正しく入力してください。';
    }
    if (!expiryMonth || !expiryYear) {
      return 'カードの有効期限を選択してください。';
    }
    if (cvc.length < 3 || cvc.length > 4) {
      return 'セキュリティコードを正しく入力してください。';
    }
  }

  if (paymentMethod.value === 'emoney') {
    const emoneyId = document.getElementById('emoneyId').value.trim();
    if (!emoneyId) {
      return '電子マネーIDを入力してください。';
    }
  }

  return null;
}

function placeOrder() {
  const error = validateOrder();
  if (error) {
    alert(error);
    return;
  }

  const month = document.getElementById('pickupMonth').value;
  const day = document.getElementById('pickupDay').value;
  const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
  const paymentLabel = paymentMethod === 'card' ? 'カード' : paymentMethod === 'emoney' ? '電子マネー' : '現金';

  localStorage.setItem('completedPickupDate', `${month}月${day}日`);
  localStorage.removeItem('checkoutData');
  window.location.href = 'Complete.html';
}

window.addEventListener('DOMContentLoaded', () => {
  const checkoutData = getCheckoutData();
  renderOrderDetails(checkoutData);
  populatePickupSelectors();
  setEarliestCompletionDate();
  updatePaymentDetails();

  const backButton = document.getElementById('back');
  if (backButton) {
    backButton.addEventListener('click', () => {
      history.back();
    });
  }

  const confirmPickup = document.getElementById('confirmPickup');
  if (confirmPickup) {
    confirmPickup.addEventListener('click', confirmPickupDate);
  }

  const placeOrderButton = document.getElementById('placeOrder');
  if (placeOrderButton) {
    placeOrderButton.addEventListener('click', placeOrder);
  }

  document.querySelectorAll('input[name="paymentMethod"]').forEach(input => {
    input.addEventListener('change', updatePaymentDetails);
  });
});
