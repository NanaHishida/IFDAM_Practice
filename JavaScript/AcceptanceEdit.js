document.addEventListener('DOMContentLoaded', () => {
  const logoutButton = document.getElementById('logoutButton');
  const quantityButtons = document.querySelectorAll('.quantity-btn');
  const removeButtons = document.querySelectorAll('.remove-btn');
  const cancelButton = document.querySelector('.edit-actions .btn.btn-secondary');
  const cancelOrderButton = document.querySelector('.edit-actions .btn.btn-outline-danger');
  const form = document.getElementById('acceptanceEditForm');

  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      if (confirm('ログアウトしますか？')) {
        document.cookie = 'login=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        window.location.href = 'Login.html';
      }
    });
  }

  quantityButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const action = button.dataset.action;
      const field = button.closest('.customize-item').querySelector('.quantity-input');
      const currentValue = Number(field.value);
      const nextValue = action === 'increase' ? currentValue + 1 : Math.max(0, currentValue - 1);
      field.value = nextValue;
    });
  });

  removeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const item = button.closest('.customize-item');
      if (confirm('このカスタマイズを削除しますか？')) {
        item.remove();
      }
    });
  });

  if (cancelButton) {
    cancelButton.addEventListener('click', () => {
      if (confirm('編集をキャンセルして受注管理画面に戻りますか？')) {
        window.location.href = 'Acceptance.html';
      }
    });
  }

  if (cancelOrderButton) {
    cancelOrderButton.addEventListener('click', () => {
      if (confirm('注文をキャンセルしますか？')) {
        alert('注文をキャンセルしました。受注管理画面に戻ります。');
        window.location.href = 'Acceptance.html';
      }
    });
  }

  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      alert('受注内容を更新しました。');
      window.location.href = 'Acceptance.html';
    });
  }
});
