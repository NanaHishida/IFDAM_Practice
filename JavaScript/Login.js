const loginTab = document.getElementById('loginTab');
const signupTab = document.getElementById('signupTab');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

function switchToLogin() {
  loginTab.classList.add('active');
  signupTab.classList.remove('active');
  loginForm.classList.add('active');
  signupForm.classList.remove('active');
}

function switchToSignup() {
  loginTab.classList.remove('active');
  signupTab.classList.add('active');
  loginForm.classList.remove('active');
  signupForm.classList.add('active');
}

loginTab.addEventListener('click', (e) => {
  e.preventDefault();
  switchToLogin();
});

signupTab.addEventListener('click', (e) => {
  e.preventDefault();
  switchToSignup();
});

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value.trim();

  if (!email || !password) {
    alert('メールアドレスとパスワードを入力してください。');
    return;
  }

  if (!email.includes('@')) {
    alert('有効なメールアドレスを入力してください。');
    return;
  }

  if (password.length < 6) {
    alert('パスワードは6文字以上である必要があります。');
    return;
  }

  // データベースでの処理
  // データベースと照合するか if not, return
  // データベース上のログイン情報を持ってくる
  // const name = データベース上の名前;
  // const OrderHistory = データベース上の注文履歴;

  alert(`ログインしました。\nメールアドレス: ${email}`);
  document.cookie = 'login="y"; max-age=36000';
  history.back();
});

signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('signupEmail').value.trim();
  const password = document.getElementById('signupPassword').value.trim();
  const passwordConfirm = document.getElementById('signupPasswordConfirm').value.trim();
  const agreeTerms = document.getElementById('agreeTerms').checked;

  if (!email || !password || !passwordConfirm) {
    alert('すべてのフィールドを入力してください。');
    return;
  }

  if (!email.includes('@')) {
    alert('有効なメールアドレスを入力してください。');
    return;
  }

  if (password.length < 6) {
    alert('パスワードは6文字以上である必要があります。');
    return;
  }

  if (password !== passwordConfirm) {
    alert('パスワードが一致しません。');
    return;
  }

  if (!agreeTerms) {
    alert('利用規約に同意してください。');
    return;
  }

  alert(`アカウントを作成しました。\nメールアドレス: ${email}\n\nログイン画面に戻ります。`);
  switchToLogin();
  document.getElementById('loginEmail').value = email;
  document.getElementById('loginPassword').value = '';
  document.getElementById('signupEmail').value = '';
  document.getElementById('signupPassword').value = '';
  document.getElementById('signupPasswordConfirm').value = '';
  document.getElementById('agreeTerms').checked = false;
});
