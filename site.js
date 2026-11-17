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

const quoteForm = document.querySelector('#quote-form');
quoteForm?.addEventListener('submit', event => {
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

const collections = document.querySelector('.collection-menu');
const collectionToggle = collections.querySelector('button');
const collectionLinks = collections.querySelector('.collection-links');

function showCollections(open) {
  collectionToggle.setAttribute('aria-expanded', String(open));
  collectionLinks.hidden = !open;
}

collectionToggle.addEventListener('click', event => {
  const clickedWhileHovering = event.detail > 0 && matchMedia('(hover: hover) and (pointer: fine)').matches;
  showCollections(clickedWhileHovering || collectionLinks.hidden);
});
collections.addEventListener('pointerenter', event => {
  if (event.pointerType === 'mouse') showCollections(true);
});
collections.addEventListener('pointerleave', event => {
  if (event.pointerType === 'mouse' && !collectionLinks.contains(document.activeElement)) showCollections(false);
});
collections.addEventListener('focusout', event => {
  if (!collections.contains(event.relatedTarget)) showCollections(false);
});
collections.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !collectionLinks.hidden) {
    event.stopPropagation();
    showCollections(false);
    collectionToggle.focus();
  }
});
document.addEventListener('click', event => {
  if (!collections.contains(event.target)) showCollections(false);
});

const collectionName = {
  'living-room': 'Living Room',
  'dining-room': 'Dining Room',
  bedroom: 'Bedroom',
  rugs: 'Rugs',
}[new URLSearchParams(location.search).get('collection')];

if (collectionName && quoteForm) {
  quoteForm.elements.details.placeholder = 'Tell us which ' + collectionName.toLowerCase() + ' pieces or styles you need, quantities, and your target delivery date.';
}

