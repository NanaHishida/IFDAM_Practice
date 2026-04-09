const menuToggle = document.getElementById('menuToggle');
const menuPanel = document.getElementById('menuPanel');
const menuClose = document.getElementById('menuClose');

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