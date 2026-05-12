const menuToggle = document.getElementById('menuToggle');
const menuPanel = document.getElementById('menuPanel');
const menuClose = document.getElementById('menuClose');

const LoginButton = document.getElementById('login');
const loginyn = document.cookie.indexOf('login') !== -1;

if (loginyn) {
  LoginButton.innerHTML = '<a href="Account.html">アカウント</a>';
} else {
  LoginButton.innerHTML = '<a href="Login.html">ログインする</a>';
}

function toggleMenu() {
  const isOpen = menuPanel.classList.toggle('show');
  menuToggle.classList.toggle('open', isOpen);
  menuPanel.setAttribute('aria-hidden', String(!isOpen));
}

menuToggle.addEventListener('click', toggleMenu);
menuClose.addEventListener('click', toggleMenu);
menuPanel.addEventListener('click', (event) => {
  if (event.target === menuPanel) toggleMenu();
});