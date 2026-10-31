export function initNavigation() {
  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#site-nav');

  if (!menuButton || !navigation) return;

  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Abrir menú' : 'Cerrar menú');
    navigation.classList.toggle('open', !isOpen);
  });

  navigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Abrir menú');
      navigation.classList.remove('open');
    });
  });
}
