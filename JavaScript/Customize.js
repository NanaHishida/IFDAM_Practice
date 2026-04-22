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

  // レアチーズケーキの場合はクリームなしを選択し、他のクリームを無効化
  if (name === 'レアチーズケーキ' || name === 'ザッハトルテケーキ') {
    // クリームなしを選択
    const creamNone = document.getElementById('cream-none');
    creamNone.classList.add('selected');
    cart.toppings = cart.toppings.filter(t => !isCream(t.name));
    cart.toppings.push({ name: 'クリームなし', price: 0 });

    // 他のクリームを無効化
    const creamIds = ['cream-whip', 'cream-choco', 'cream-cheese', 'cream-caramel', 'cream-marron', 'cream-custard', 'cream-berry'];
    creamIds.forEach(id => {
      document.getElementById(id).classList.add('disabled');
    });
  } else {
      // 他のベースケーキの場合、クリームの無効化を解除
      const creamIds = ['cream-whip', 'cream-choco', 'cream-cheese', 'cream-caramel', 'cream-marron', 'cream-custard', 'cream-berry', 'cream-none'];
      creamIds.forEach(id => {
        document.getElementById(id).classList.remove('disabled');
      });
    }

  updatePrice();
  updatePreview();
}

function toggleTopping(element, name, price) {
  // disabledのカードは選択できない
  if (element.classList.contains('disabled')) {
    return;
  }

  element.classList.toggle('selected');
  
  if (element.classList.contains('selected')) {
    cart.toppings.push({ name, price, count: 1 });
  } else {
    cart.toppings = cart.toppings.filter(t => t.name !== name);
  }

  // クリーム関連のロジック
  if (isCream(name)) {
    if (name === 'クリームなし') {
      // クリームなしを選択したら、他のクリームを解除
      const creamIds = ['cream-whip', 'cream-choco', 'cream-cheese', 'cream-caramel', 'cream-marron', 'cream-custard', 'cream-berry'];
      creamIds.forEach(id => {
        const card = document.getElementById(id);
        card.classList.remove('selected');
        cart.toppings = cart.toppings.filter(t => t.name !== card.querySelector('.topping-name').textContent);
      });
    } else {
      // 他のクリームを選択したら、クリームなしを解除
      const creamNone = document.getElementById('cream-none');
      creamNone.classList.remove('selected');
      cart.toppings = cart.toppings.filter(t => t.name !== 'クリームなし');
    }
  }
  
  updatePrice();
  updatePreview();
}

// クリームかどうかを判定する関数
function isCream(name) {
  const creams = ['ホイップクリーム', 'チョコレートホイップクリーム', 'チーズホイップクリーム', 'キャラメルホイップクリーム', 'マロンホイップクリーム', 'カスタードクリーム', 'ベリームース', 'クリームなし'];
  return creams.includes(name);
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
                  cart.toppings.reduce((sum, t) => sum + t.price * (t.count || 1), 0) + 
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
  cart.toppings.forEach(t => {
    if (t.count > 1) {
      selectedItems.push(`${t.name} x${t.count}`);
    } else {
      selectedItems.push(t.name);
    }
  });
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
  const items = [cart.base, ...cart.toppings.map(t => t.count > 1 ? `${t.name} x${t.count}` : t.name)];
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

function increaseTopping(name, price) {
  const existing = cart.toppings.find(t => t.name === name);
  if (existing) {
    existing.count++;
  } else {
    cart.toppings.push({ name, price, count: 1 });
  }
  updateToppingDisplay(name);
  updatePrice();
  updatePreview();
}

function decreaseTopping(name) {
  const existing = cart.toppings.find(t => t.name === name);
  if (existing && existing.count > 0) {
    existing.count--;
    if (existing.count === 0) {
      cart.toppings = cart.toppings.filter(t => t.name !== name);
    }
  }
  updateToppingDisplay(name);
  updatePrice();
  updatePreview();
}

function updateToppingDisplay(name) {
  const count = cart.toppings.find(t => t.name === name)?.count || 0;
  const id = `count-${name}`;
  document.getElementById(id).textContent = count;
  // カードのselectedクラスを更新
  const card = document.querySelector(`.topping-card:has(#${id})`);
  if (count > 0) {
    card.classList.add('selected');
  } else {
    card.classList.remove('selected');
  }
}