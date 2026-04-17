let cart = {
  base: null,
  basePrice: 0,
  toppings: [],
  decoration: null,
  decorationPrice: 0,
};

function selectBase(element, name, price) {
  // 前の選択を削除
  document.querySelectorAll('.topping-grid')[0].querySelectorAll('.topping-card').forEach(card => {
    card.classList.remove('selected');
  });
  
  element.classList.add('selected');
  cart.base = name;
  cart.basePrice = price;
  updatePrice();
  updatePreview();
}

function toggleTopping(element, name, price) {
  element.classList.toggle('selected');
  
  if (element.classList.contains('selected')) {
    cart.toppings.push({ name, price });
  } else {
    cart.toppings = cart.toppings.filter(t => t.name !== name);
  }
  
  updatePrice();
  updatePreview();
}

function selectDecoration(element, name, price) {
  // 前の選択を削除
  document.querySelectorAll('.topping-grid')[2].querySelectorAll('.topping-card').forEach(card => {
    card.classList.remove('selected');
  });
  
  element.classList.add('selected');
  cart.decoration = name;
  cart.decorationPrice = price;
  updatePrice();
  updatePreview();
}

function updatePrice() {
  const subtotal = cart.basePrice + 
                  cart.toppings.reduce((sum, t) => sum + t.price, 0) + 
                  cart.decorationPrice;
  const taxAmount = Math.floor(subtotal * 0.1);
  const total = subtotal + taxAmount;

  document.getElementById('subtotal').textContent = '¥' + subtotal.toLocaleString();
  document.getElementById('tax').textContent = '¥' + taxAmount.toLocaleString();
  document.getElementById('total').textContent = '¥' + total.toLocaleString();
}

function updatePreview() {
  const selectedItems = [];
  if (cart.base) selectedItems.push(cart.base);
  cart.toppings.forEach(t => selectedItems.push(t.name));
  if (cart.decoration) selectedItems.push(cart.decoration);

  const selectedItemsDiv = document.getElementById('selectedItems');
  const selectedItemsList = document.getElementById('selectedItemsList');

  if (selectedItems.length > 0) {
    selectedItemsList.innerHTML = selectedItems.map(item => 
      `<div class="selected-item">${item}</div>`
    ).join('');
    selectedItemsDiv.style.display = 'block';
  } else {
    selectedItemsDiv.style.display = 'none';
  }
}

function goToCheckout() {
  if (!cart.base) {
    alert('ベースケーキを選択してください');
    return;
  }

  const memo = document.getElementById('memo').value;
  const items = [cart.base, ...cart.toppings.map(t => t.name)];
  if (cart.decoration) items.push(cart.decoration);

  alert(
    'お会計へ進みます\n\n' +
    '選択内容:\n' +
    items.join('\n') +
    '\n\n' +
    (memo ? `メモ: ${memo}\n\n` : '') +
    '合計: ' + document.getElementById('total').textContent
  );
}

// ページ読込時に完成日を設定
function setCompletionDate() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const month = tomorrow.getMonth() + 1;
  const date = tomorrow.getDate();
  document.getElementById('completionDate').textContent = `${month}月${date}日`;
}

window.addEventListener('load', setCompletionDate);