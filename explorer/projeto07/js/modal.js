export const Modal = {
  wrapper: document.querySelector('.modal-wrapper'),
  message: document.querySelector('.modal .title span'),
  btnClose: document.querySelector('.modal .title button'),
  displayResultMessage(result) {
    Modal.message.innerHTML = `Seu IMC é de ${result}`;
    Modal.open();
  },
  open() {
    Modal.wrapper.classList.add('open');
  },
  close() {
    Modal.wrapper.classList.remove('open');
  }
}

Modal.btnClose.onclick = () => Modal.close();

window.addEventListener('keydown', handleKeydown)

function handleKeydown(event) {
  if (event.key === 'Escape') {
    Modal.close();
  }
}