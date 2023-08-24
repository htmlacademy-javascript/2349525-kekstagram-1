const body = document.querySelector('body');

export function showModal(element) {
  body.classList.add('modal-open');
  element.classList.remove('hidden');
}

export function hideModal(element) {
  body.classList.remove('modal-open');
  element.classList.add('hidden');
}
