export function Modal() {

  const cancelButton = document.querySelector('.button.cancel');
  const modalWrapper = document.querySelector('.modal-wrapper');

  cancelButton.addEventListener("click", close);

  function open() {
    /// funcionalidade de adicionar a class active a moadal-wraper
     modalWrapper.classList.add("active");
  };

  function close() { 
    /// funcionalidade de remover a class active a moadal-wraper
    modalWrapper.classList.remove("active");
  };

  return {
    open,
    close
  }

}