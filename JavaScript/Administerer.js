document.addEventListener('DOMContentLoaded', () => {
  // Toggle accepting orders on main admin page
  const toggleOrders = document.getElementById('toggleOrders');
  if (toggleOrders) {
    let stopped = false;
    toggleOrders.addEventListener('click', () => {
      stopped = !stopped;
      toggleOrders.textContent = stopped ? '受注を再開する' : '受注を停止する';
      toggleOrders.classList.toggle('btn-outline-danger');
      toggleOrders.classList.toggle('btn-outline-success');
      confirm(`本当に受注を${stopped ? '停止' : '再開'}しますか？`);
      alert(`受注を${stopped ? '停止' : '再開'}しました（ダミー）。`);
    });
  }

  const customizeModal = document.getElementById('customizeAddModal');
  const addCustomize = document.getElementById('addCustomize');
  const closeCustomizeModal = document.getElementById('closeCustomizeModal');
  const cancelCustomizeModal = document.getElementById('cancelCustomizeModal');
  const submitCustomizeModal = document.getElementById('submitCustomizeModal');
  const customizeList = document.querySelector('.customize-list');
  const customizeName = document.getElementById('customizeName');
  const customizePrice = document.getElementById('customizePrice');
  const customizePhoto = document.getElementById('customizePhoto');
  const customizePreview = document.getElementById('customizePreview');
  const accountModal = document.getElementById('accountAddModal');
  const addAccount = document.getElementById('addAccount');
  const closeAccountModal = document.getElementById('closeAccountModal');
  const cancelAccountModal = document.getElementById('cancelAccountModal');
  const submitAccountModal = document.getElementById('submitAccountModal');
  const accountLastName = document.getElementById('accountLastName');
  const accountFirstName = document.getElementById('accountFirstName');
  const accountPassword = document.getElementById('accountPassword');
  const accountRole = document.getElementById('accountRole');
  const accountList = document.querySelector('.account-list .list');

  function addCustomizeEventListeners(article) {
    const deleteButton = article.querySelector('.delete-customize');
    const stopButton = article.querySelector('.stop-order');

    deleteButton?.addEventListener('click', (e) => {
      if (!confirm('このカスタマイズを削除しますか？')) return;
      e.target.closest('article').remove();
    });

    stopButton?.addEventListener('click', (e) => {
      const b = e.target;
      const stopped = b.dataset.stopped === '1';
      if (!stopped) {
        if (confirm('このカスタマイズの受注を停止しますか？')) {
          b.textContent = '受注を再開する';
          b.dataset.stopped = '1';
        }
      } else {
        if (confirm('このカスタマイズの受注を再開しますか？')) {
          b.textContent = '受注を停止する';
          b.dataset.stopped = '0';
        }
      }
    });
  }

  document.querySelectorAll('.delete-customize').forEach(btn => {
    addCustomizeEventListeners(btn.closest('article'));
  });

  document.querySelectorAll('.stop-order').forEach(btn => {
    addCustomizeEventListeners(btn.closest('article'));
  });

  function openModal() {
    customizeModal.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    customizeModal.classList.remove('show');
    document.body.style.overflow = '';
    customizeName.value = '';
    customizePrice.value = '';
    customizePhoto.value = '';
    customizePreview.value = 'base';
  }

  if (addCustomize) {
    addCustomize.addEventListener('click', openModal);
  }

  if (addAccount) {
    addAccount.addEventListener('click', () => {
      if (accountModal) {
        accountModal.classList.add('show');
        document.body.style.overflow = 'hidden';
      }
    });
  }

  closeCustomizeModal?.addEventListener('click', closeModal);
  cancelCustomizeModal?.addEventListener('click', closeModal);
  customizeModal?.addEventListener('click', (e) => {
    if (e.target === customizeModal) closeModal();
  });

  closeAccountModal?.addEventListener('click', () => {
    if (accountModal) closeAccountModalFunc();
  });
  cancelAccountModal?.addEventListener('click', () => {
    if (accountModal) closeAccountModalFunc();
  });
  accountModal?.addEventListener('click', (e) => {
    if (e.target === accountModal) closeAccountModalFunc();
  });

  submitAccountModal?.addEventListener('click', () => {
    const lastName = accountLastName.value.trim();
    const firstName = accountFirstName.value.trim();
    const password = accountPassword.value;
    const role = accountRole.value;

    if (!lastName) {
      alert('苗字を入力してください。');
      return;
    }
    if (!firstName) {
      alert('名前を入力してください。');
      return;
    }
    if (!password) {
      alert('パスワードを入力してください。');
      return;
    }

    const fullName = `${lastName} ${firstName}`;
    const article = document.createElement('article');
    article.className = 'customize-item d-flex align-items-center justify-content-between mt-2';
    article.innerHTML = `
      <div class="d-flex align-items-center gap-3">
        <div class="avatar">👤</div>
        <div>
          <p class="mb-0 fw-bold">${fullName}</p>
          <p class="mb-0 text-muted">${role}</p>
        </div>
      </div>
      <div>
        <button class="btn btn-outline-danger btn-sm delete-account">アカウントを削除する</button>
      </div>
    `;
    accountList.appendChild(article);
    article.querySelector('.delete-account')?.addEventListener('click', (e) => {
      if (!confirm('このアカウントを削除しますか？')) return;
      e.target.closest('article').remove();
    });
    closeAccountModalFunc();
  });

  function closeAccountModalFunc() {
    if (!accountModal) return;
    accountModal.classList.remove('show');
    document.body.style.overflow = '';
    accountLastName.value = '';
    accountFirstName.value = '';
    accountPassword.value = '';
    accountRole.value = '社長';
  }

  submitCustomizeModal?.addEventListener('click', () => {
    const name = customizeName.value.trim();
    const price = parseInt(customizePrice.value, 10);
    const previewAttr = customizePreview.value;
    const previewLabelMap = {
      base: 'ベース',
      cream: 'クリーム',
      topping: 'トッピング',
      decoration: 'デコレーション'
    };
    const previewLabel = previewLabelMap[previewAttr] || '不明';
    const photoName = customizePhoto.files[0]?.name || '';

    if (!name) {
      alert('名前を入力してください。');
      return;
    }
    if (Number.isNaN(price)) {
      alert('値段を正しく入力してください。');
      return;
    }

    const article = document.createElement('article');
    article.className = 'customize-item d-flex align-items-center justify-content-between mt-2';
    article.innerHTML = `
      <div>
        <p class="mb-0 fw-bold">${name}</p>
        <p class="mb-0 text-muted">価格: ¥${price.toLocaleString()}${photoName ? ' • 写真: ' + photoName : ''}${previewLabel ? ' • プレビュー属性: ' + previewLabel : ''}</p>
      </div>
      <div class="d-flex gap-2">
        <button class="btn btn-outline-danger btn-sm stop-order">受注を停止する</button>
        <button class="btn btn-outline-danger btn-sm delete-customize">削除する</button>
      </div>
    `;

    customizeList.appendChild(article);
    addCustomizeEventListeners(article);
    closeModal();
  });
});
