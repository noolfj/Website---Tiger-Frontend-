import pets from '../data/pets.js';
const modal = document.querySelector('.modal');
const modalBody = document.querySelector('.modal__body');
const modalContent = document.querySelector('#modal-content');
const modalButtonClose = document.querySelector('.modal__button-close');

let currentCard;

function renderModal(petId) {
  const {
    name,
    type,
    breed,
    description,
    age,
    inoculations,
    diseases,
    parasites,
  } = pets.find(({ id }) => id === Number(petId));

  const html = `<img class="modal__img" width="500" height="500" src="assets/images/tigers/${name.toLowerCase()}.jpg" alt="${name}">
      <div class="modal__info">
        <h3 class="modal__title">${name}</h3>
        <p class="modal__description">${description}</p>
        <ul class="modal__list">
        </ul>
      </div>`;

  modalBody.insertAdjacentHTML('afterbegin', html);
}

function openByEnter(e) {
  if (e.key === 'Enter' && e.target.matches('.pet-card')) {
    showModal(e);
  }
}
function openByClick(e) {
  if (e.target.closest('.pet-card')) {
    showModal(e);
  }
}

function showModal(e) {
  const petCard = e.target.closest('.pet-card');
  const id = petCard.dataset.petId;
  renderModal(id);
  modal.classList.add('overlay_show');
  document.body.classList.add('body_lock');
  modalBody.tabIndex = 0;
  currentCard = petCard;

  setTimeout(() => {
    modalBody.focus();
  }, 100);

  modal.addEventListener('click', closeModalByOverlay);
  modalButtonClose.addEventListener('click', closeModal);
}

function closeModal() {
  modal.classList.remove('overlay_show');
  document.body.classList.remove('body_lock');

  const img = modalBody.querySelector('.modal__img');
  const info = modalBody.querySelector('.modal__info');
  img.remove();
  info.remove();
  currentCard.focus();
  modalBody.tabIndex = -1;

  modal.removeEventListener('click', closeModalByOverlay);
  modalButtonClose.removeEventListener('click', closeModal);
}

function closeModalByOverlay(e) {
  if (e.target.matches('.modal.overlay_show')) {
    closeModal();
  }
}

if (modalContent) {
  modalContent.addEventListener('click', openByClick);
  modalContent.addEventListener('keydown', openByEnter);
}
