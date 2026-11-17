const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');

function closeMenu() {
  menu.setAttribute('aria-expanded', 'false');
}

menu.addEventListener('click', () => {
  const isOpen = menu.getAttribute('aria-expanded') === 'true';
  menu.setAttribute('aria-expanded', String(!isOpen));
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menu.focus();
  }
});

document.querySelector('#quote-form').addEventListener('submit', event => {
  event.preventDefault();
  const fields = new FormData(event.currentTarget);
  const subject = 'Furniture quote request';
  const body = [
    'Name: ' + fields.get('name'),
    'Email: ' + fields.get('email'),
    'Order type: ' + fields.get('type'),
    'Delivery location: ' + fields.get('location'),
    '',
    'Furniture and quantities:',
    fields.get('details'),
  ].join('\r\n');
  window.location.href = 'mailto:arianahomeoman@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
});
