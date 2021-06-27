import { Modal } from './modal.js';

const modal = Modal();

const modalTitle = document.querySelector('.modal h2');
const modalDescription = document.querySelector('.modal p');
const modalButton = document.querySelector('.modal button');


function handleClick(event, check = true) {
  event.preventDefault();
  const text = check ? 'Marcar como lida' : 'Excluir';
  const action = check ? 'check' : 'delete';
  const roomId = document.querySelector('#room-id').dataset.id;
  const questionId = event.target.dataset.id;

  const form = document.querySelector('.modal form');

  form.setAttribute("action", `/question/${roomId}/${questionId}/${action}`);

  modalTitle.innerHTML = text;
  modalDescription.innerHTML = `Tem certeza de:  ${text}  esta pergunta?`;
  modalButton.innerHTML = `Sim, ${text.toLowerCase()}`
  check ? modalButton.classList.remove("red") : modalButton.classList.add("red")

  modal.open();
}

// Pegar todos os botões com a class check
const checkButtons = document.querySelectorAll('.actions a.check');
checkButtons.forEach(button => {

  button.addEventListener("click", handleClick);   // adiciona a escuta
});



const deleteButtons = document.querySelectorAll('.actions a.trash');
/* QUndo o Botão delete for clicado abre a modal*/
deleteButtons.forEach(button => {

  button.addEventListener("click", (event) => handleClick(event, false));   // adiciona a escuta
});