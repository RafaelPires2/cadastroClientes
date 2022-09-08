const openModal = () =>  document.querySelector('#modal')
    .classList.add('active')


const closeModal = () => {
    clearFields()
    document.querySelector('#modal').classList.remove('active')
}



//cliente temporario para testes no console

// const tempClient = {
//     nome: 'Jorge',
//     email: 'jorge@gmail.com',
//     celular: '11999887755',
//     cidade: 'Poá'
// }

//functions que tranformam o objeto em JSON e String
// Functions criadas para facilitar o uso em outros locais
const getLocalStorage = () => JSON.parse(localStorage.getItem('db_client')) ?? []
const setLocalStorage = (dbClient) => localStorage.setItem('db_client', JSON.stringify(dbClient))



//CRUD - CREATE
const createClient = (client) => {
    const dbClient = getLocalStorage()
    dbClient.push(client)
    setLocalStorage(dbClient)
}

//CRUD - READ
const readClient = () => getLocalStorage()

//CRUD - UPDATE
const updateClient = (index, client) => {
    const dbClient = readClient()
    dbClient[index] = client
    setLocalStorage(dbClient)
}
//CRUD - DELETE
const deleteClient = (index) =>{
    const dbClient = readClient()
    dbClient.splice(index, 1)
    setLocalStorage(dbClient)
}

//interação com usuario
const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => field.value = "")
}


const saveClient = () => {
    if (isValidFields()){
       const client = {
            nome: document.querySelector('#nome').value,
            email: document.querySelector('#email').value,
            celular: document.querySelector('#celular').value,
            cidade: document.querySelector('#cidade').value
       }
       const index = document.querySelector('#nome').dataset.index
        if(index == 'new') {
            createClient(client)
            updateTable()
            closeModal()
        } else{
            updateClient(index, client)
            updateTable()
            closeModal()
        }
       
    }
}


const createRow = (client, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
        <td>${client.nome}</td>
        <td>${client.email}</td>
        <td>${client.celular}</td>
        <td>${client.cidade}</td>
        <td>
            <button type="button" class="button green" id="edit-${index}">Editar</button>
            <button type="button" class="button red " id="delete-${index}">Excluir</button>
        </td>
    `
    document.querySelector('#tableClient>tbody').appendChild(newRow)
}


const clearTable = () => {
    const rows = document.querySelectorAll('#tableClient>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () => {
    const dbClient = readClient()
    clearTable()
    dbClient.forEach(createRow)
}
updateTable()

//EDIT CLIENT
const fillFields = (client) => {
    document.querySelector('#nome').value = client.nome
    document.querySelector('#email').value = client.email
    document.querySelector('#celular').value = client.celular
    document.querySelector('#cidade').value = client.cidade
    document.querySelector('#nome').dataset.index = client.index

}
const editClient = (index) => {
    const client = readClient()[index]
    client.index = index
    fillFields(client)
    openModal()
    
}
const editDelete = (event) => {
    if (event.target.type == 'button') {

        const [action, index] = event.target.id.split('-')
        
        if (action == 'edit'){
           editClient(index)
        } else {
            const client = readClient()[index]
            const response = confirm(`Deseja realmente excluir o cliente ${client.nome}`)
            if(response) {
                deleteClient(index)
                updateTable()
            }
        }
    }
}






const isValidFields =() => {
    return document.querySelector('#modalForm').reportValidity()
}



//Eventos
document.querySelector('#salvar')
    .addEventListener('click', saveClient)

document.querySelector('#cadastrarCliente')
    .addEventListener('click', openModal)
    
document.querySelector('#modalClose')
    .addEventListener('click', closeModal)

document.querySelector('#tableClient>tbody')
    .addEventListener('click', editDelete)


   // https://www.youtube.com/watch?v=_HEIqE_qqbQ&t=340s&ab_channel=FernandoLeonid
