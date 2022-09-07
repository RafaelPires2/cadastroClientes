const btnCadastro = document.querySelector('#cadastrarCliente')
const modal = document.querySelector('#modal')
const btnCloseModal = document.querySelector('#modalClose')

btnCadastro.addEventListener('click', () => {
    modal.classList.toggle('active')
})

btnCloseModal.addEventListener('click', () => {
    modal.classList.toggle('active')
})

