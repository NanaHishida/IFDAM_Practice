window.addEventListener('DOMContentLoaded', () => {
  const pickupDateLabel = document.getElementById('completePickupDate');
  const completedDate = localStorage.getItem('completedPickupDate');
  if (pickupDateLabel) {
    pickupDateLabel.textContent = completedDate || '○月○日';
  }

  const accountInfo = document.getElementById('accountInfo');
  if (accountInfo) {
    accountInfo.textContent = 'アカウント名';
  }

  const receiptLink = document.getElementById('receiptLink');
  if (receiptLink) {
    receiptLink.addEventListener('click', (event) => {
      event.preventDefault();
      alert('受取票をダウンロードします。');
    });
  }
});
