// 選択中を空に
let cart = {
  base: null,
  basePrice: 0,
  toppings: [],
  decoration: null,
  decorationPrice: 0,
};

const storage = localStorage;

// ベースを選ぶ処理
function selectBase(element, name, price) {
  // 前の選択を削除
  document.querySelectorAll('.topping-grid')[0].querySelectorAll('.topping-card').forEach(card => {
    card.classList.remove('selected');
  });
  
  //ベースをカートに追加
  element.classList.add('selected');
  cart.base = name;
  cart.basePrice = price;

  // レアチーズケーキ、ザッハトルテの場合はクリームなしを選択し、他のクリームを無効化
  if (name === 'レアチーズケーキ' || name === 'ザッハトルテケーキ') {
    // 他のクリームの選択を解除
    document.querySelectorAll('.topping-grid')[1].querySelectorAll('.topping-card').forEach(card => {
    card.classList.remove('selected');
  });

    // クリームなしを選択
    const creamNone = document.getElementById('cream-none');
    creamNone.classList.add('selected');
    cart.toppings = cart.toppings.filter(t => !isCream(t.name));
    cart.toppings.push({ name: 'クリームなし', price: 0 });

    // 他のクリームを無効化
    const creamIds = ['cream-whip', 'cream-choco', 'cream-cheese', 'cream-caramel', 'cream-marron', 'cream-custard', 'cream-berry', 'cream-none'];
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

// クリームを選択する処理
function toggleTopping(element, name, price) {
  // disabledのカードは選択できない
  if (element.classList.contains('disabled')) {
    return;
  }

  // selectedを付けたり外したり
  element.classList.toggle('selected');
  
  // selectedの有無に基づいてカートに入れたりカートから消したり
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

// オプションを選ぶ処理
function selectDecoration(element, name, price) {
  // オプションの選択を解除する処理
  if (element.classList.contains('selected')) {
    element.classList.remove('selected');
    cart.decoration = null;
    cart.decorationPrice = 0;
    updatePrice();
    updatePreview();
    return;
  }

  // 前の選択を削除
  document.querySelectorAll('.topping-grid')[3].querySelectorAll('.topping-card').forEach(card => {
    card.classList.remove('selected');
  });
  
  // 選んだものにselectedをつける
  element.classList.add('selected');
  cart.decoration = name;
  cart.decorationPrice = price;
  updatePrice();
  updatePreview();
}

// 金額を更新する処理
function updatePrice() {
  const subtotal = cart.basePrice + 
                  cart.toppings.reduce((sum, t) => sum + t.price * (t.count || 1), 0) + 
                  cart.decorationPrice;
  const taxAmount = Math.floor(subtotal * 0.1);
  const total = subtotal + taxAmount;

  // 金額を表示する処理
  document.getElementById('subtotal').textContent = '¥' + subtotal.toLocaleString();
  document.getElementById('tax').textContent = '¥' + taxAmount.toLocaleString();
  document.getElementById('total').textContent = '¥' + total.toLocaleString();
}

// プレビューを更新する処理
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

  // カスタマイズリストを表示する処理
  if (selectedItems.length > 0) {
    selectedItemsList.innerHTML = selectedItems.map(item => 
      `<div class="selected-item">${item}</div>`
    ).join('');
    selectedItemsDiv.style.display = 'block';
  } else {
    selectedItemsDiv.style.display = 'none';
  }
}

// お会計に進む処理
function goToCheckout() {
  // ベースが選択されているか見張る処理
  if (!cart.base) {
    alert('ベースケーキを選択してください');
    return;
  }

  // くまちゃんセットを選択している場合、クリームが必要
  if (cart.decoration === 'くまちゃんセット') {
    const creamItems = cart.toppings.filter(t => isCream(t.name));
    const hasNoCream = creamItems.length === 0;
    const hasCreamNone = creamItems.some(t => t.name === 'クリームなし');

    if (hasNoCream || hasCreamNone) {
      alert('くまちゃんセットをご注文の場合、クリームを1つ以上選択してください。クリームなしではお会計に進めません。');
      return;
    }
  }

  // メモと選択したアイテムを引き継ぐ処理
  const memo = document.getElementById('memo').value;
  const items = [cart.base, ...cart.toppings.map(t => t.count > 1 ? `${t.name} x${t.count}` : t.name)];
  if (cart.decoration) items.push(cart.decoration);

  // 選択内容を確認する処理
  alert(
    'お会計へ進みます\n\n' +
    '選択内容:\n' +
    items.join('\n') +
    '\n\n' +
    (memo ? `メモ: ${memo}\n\n` : '') +
    '合計: ' + document.getElementById('total').textContent
  );

  // localStorageに選択情報を保存
  const checkoutData = {
    base: cart.base,
    basePrice: cart.basePrice,
    toppings: cart.toppings,
    decoration: cart.decoration,
    decorationPrice: cart.decorationPrice,
    memo: memo,
    subtotal: parseInt(document.getElementById('subtotal').textContent.replace(/[¥,]/g, '')),
    tax: parseInt(document.getElementById('tax').textContent.replace(/[¥,]/g, '')),
    total: parseInt(document.getElementById('total').textContent.replace(/[¥,]/g, ''))
  };
  
  storage.setItem('checkoutData', JSON.stringify(checkoutData));

  // (今後ログインかお会計に飛ぶ処理になる)
  // if (longin) {
  //  location.href = 'Checkout.html';
  // } else {
  //  location.href = 'login.html'
  // }
  // 
  // お会計画面に飛ぶ処理
  location.href = 'Checkout.html';
}

// localStorageからチェックアウト情報を復元
function restoreCheckoutData() {
  const checkoutData = JSON.parse(storage.getItem('checkoutData'));
  
  if (!checkoutData) {
    return; // データがない場合は何もしない
  }

  // cart オブジェクトを復元
  cart.base = checkoutData.base;
  cart.basePrice = checkoutData.basePrice;
  cart.toppings = checkoutData.toppings;
  cart.decoration = checkoutData.decoration;
  cart.decorationPrice = checkoutData.decorationPrice;

  // ベースの選択状態を復元
  if (cart.base) {
    const baseCards = document.querySelectorAll('.topping-grid')[0].querySelectorAll('.topping-card');
    baseCards.forEach(card => {
      const baseName = card.querySelector('.topping-name').textContent;
      if (baseName === cart.base) {
        card.classList.add('selected');
      }
    });
  }

  // トッピング（クリーム）の選択状態を復元
  if (cart.toppings && cart.toppings.length > 0) {
    const creamCards = document.querySelectorAll('.topping-grid')[1].querySelectorAll('.topping-card');
    creamCards.forEach(card => {
      const toppingName = card.querySelector('.topping-name').textContent;
      if (cart.toppings.some(t => t.name === toppingName)) {
        card.classList.add('selected');
      }
    });
  }

  // レアチーズケーキまたはザッハトルテの場合、クリームを無効化
  if (cart.base === 'レアチーズケーキ' || cart.base === 'ザッハトルテケーキ') {
    const creamIds = ['cream-whip', 'cream-choco', 'cream-cheese', 'cream-caramel', 'cream-marron', 'cream-custard', 'cream-berry', 'cream-none'];
    creamIds.forEach(id => {
      document.getElementById(id).classList.add('disabled');
    });
  }

  // トッピング（数量付き）の選択状態と数量を復元
  if (cart.toppings && cart.toppings.length > 0) {
    const toppingCards = document.querySelectorAll('.topping-grid')[2].querySelectorAll('.topping-card');
    toppingCards.forEach(card => {
      const toppingName = card.querySelector('.topping-name').textContent;
      const foundTopping = cart.toppings.find(t => t.name === toppingName);
      if (foundTopping && foundTopping.count > 0) {
        card.classList.add('selected');
        const countElement = document.getElementById(`count-${toppingName}`);
        if (countElement) {
          countElement.textContent = foundTopping.count;
        }
      }
    });
  }

  // デコレーションの選択状態を復元
  if (cart.decoration) {
    const decorationCards = document.querySelectorAll('.topping-grid')[3].querySelectorAll('.topping-card');
    decorationCards.forEach(card => {
      const decorationName = card.querySelector('.topping-name').textContent;
      if (decorationName === cart.decoration) {
        card.classList.add('selected');
      }
    });
  }

  // メモを復元
  const memoElement = document.getElementById('memo');
  if (memoElement && checkoutData.memo) {
    memoElement.value = checkoutData.memo;
  }

  // UI更新
  updatePrice();
  updatePreview();
}

// 戻るボタンの処理
document.getElementById('back').addEventListener('click', () => {
  history.back();
});


// ページ読込時に完成日を設定
function setCompletionDate() {
  const theDay = new Date();
  theDay.setDate(theDay.getDate() + 3);
  const month = theDay.getMonth() + 1;
  const date = theDay.getDate();
  document.getElementById('completionDate').textContent = `${month}月${date}日`;
}

// ページ読み込み完了時にデータ復元と日付設定を実行
window.addEventListener('DOMContentLoaded', () => {
  restoreCheckoutData();
  setCompletionDate();
});

window.addEventListener('load', setCompletionDate);

// トッピングの選択数を増やす処理
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

// トッピングの選択数を減らす処理
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

// 選択中の数を元にカードのselectedクラスを変更する処理
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