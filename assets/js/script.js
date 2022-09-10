class Pessoa {
    constructor(nome, sobrenome, dataNascimento, email, contato, telefone, cargo){

        this._nome = nome
        this._sobrenome = sobrenome
        this._dataNascimento = dataNascimento
        this._email = email
        this._contato = contato
        this._telefone = telefone
        this._cargo = cargo
    }

    get nome() {return this._nome}
    get sobrenome() {return this._sobrenome}
    get dataNascimento() {return this._dataNascimento}
    get email() {return this._email}
    get contato() {return this._contato}
    get telefone() {return this._telefone}
    get cargo() {return this._cargo}

    set nome(valor) {this._nome = valor}
    set sobrenome(valor) {this._sobrenome = valor}
    set dataNascimento(valor) {this._dataNascimento = valor}
    set email(valor) {this._email = valor}
    set contato(valor) {this._contato = valor}
    set telefone(valor) {this._telefone = valor}
    set cargo(valor) {this._cargo = valor}
}


const arrPessoas = []

function cadastro(dados){
    const {nome, sobrenome, dataNascimento, email, contato, telefone, cargo} = dados
    
    const pessoa = new Pessoa(nome.value, sobrenome.value, dataNascimento.value, email.value, contato.value, telefone.value, cargo.value)

    return pessoa
}

const totalAlunos = document.querySelector("#total-alunos")

function criaBoxCadastro(array) {
    totalAlunos.innerText = array.length
    array.forEach((elem) => {
        const divBox = document.createElement("div")
        divBox.classList.add("boxCadastro")
    
        const pNome = document.createElement("p")
        pNome.classList.add("nomeCadastro")
        pNome.innerText = `${elem.nome} ${elem.sobrenome}`
    
        const aEmail = document.createElement("a")
        aEmail.classList.add("emailCadastro")
        aEmail.innerText = elem.email
    
        const spanCargo = document.createElement("span")
        spanCargo.classList.add("cargoCadastro")
        spanCargo.innerText = elem.cargo
    
        divBox.append(pNome, aEmail, spanCargo)
        listaDeAlunos.appendChild(divBox)


    })
}

const form = document.querySelector("form")
const listaDeAlunos = document.querySelector('#lista-de-alunos')
let contador = 0

form.addEventListener("submit", (event) => {
    event.preventDefault()
    const pessoa = cadastro(event.target)
    let negaCadastro = false
    arrPessoas.forEach((elem) => {
        if(pessoa.email.includes(elem.email) || validaIdade(arrPessoas) < 18){
            negaCadastro = true
        }
    })
    if(!negaCadastro){
        arrPessoas.push(pessoa)
        listaDeAlunos.innerHTML = ''
        contador++
        criaBoxCadastro(arrPessoas)
    }
    else{
        alert("O email ou idade não são validos! Confira novamente os dados.")
    }
})

function validaIdade(data){
    let recebeSplit = data[arrPessoas.length - 1].dataNascimento.split("-")
    let anos = 2022-recebeSplit[0]
    let meses = recebeSplit[1]*30
    let dias = recebeSplit[2]
    let result = (anos*365)-(meses)-dias

    return (result/365).toFixed()
}

const btPesquisa = document.querySelector("#btn")
const cargoOption = document.querySelector("#cargoOption")

btPesquisa.addEventListener("click", () => {
    listaDeAlunos.innerHTML = ''

    if(cargoOption.value == "Todos"){
        criaBoxCadastro(arrPessoas)
    }
    else{
        let recebeFiltro = arrPessoas.filter((elem) => {
            return elem.cargo == cargoOption.value
        })
        criaBoxCadastro(recebeFiltro)
    }
})