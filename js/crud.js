const tempClient = {
    nome: 'Jorge',
    email: 'jorge@gmail.com',
    celular: '11999887755',
    cidade: 'Poá'
}

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
const updateCliente = (index, client) => {
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
