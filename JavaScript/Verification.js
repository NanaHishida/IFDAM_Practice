document.addEventListener('DOMContentLoaded', () => {
  const verificationForm = document.getElementById('verificationForm');

  if (verificationForm) {
    verificationForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const code = document.getElementById('verificationCode').value;

      if (code.trim() === '') {
        alert('番号を入力してください。');
        return;
      }

      // 認証処理（例: サーバーに送信）
      alert('認証が完了しました。');
      window.location.href = 'VerificationDone.html'; // 認証後に完了画面へ
    });
  }
});