document.addEventListener('DOMContentLoaded', () => {
  const goToAccountBtn = document.getElementById('goToAccountBtn');

  if (goToAccountBtn) {
    goToAccountBtn.addEventListener('click', () => {
      window.location.href = 'Account.html';
    });
  }
});
