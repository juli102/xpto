const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sViagem = document.querySelector('#m-Viagem')
const sdata = document.querySelector('#m-data')
const svalor = document.querySelector('#m-valor')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sViagem.value = itens[index].Viagem
    sdata.value = itens[index].data
    svalor.value = itens[index].valor
    id = index
  } else {
    sViagem.value = ''
    sdata.value = ''
    svalor.value = ''
  }
  
}

function editItem(index) {

  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.Viagem}</td>
    <td>${item.data}</td>
    <td>R$ ${item.valor}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  
  if (sViagem.value == '' || sdata.value == '' || svalor.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].Viagem = sViagem.value
    itens[id].data = sdata.value
    itens[id].valor = svalor.value
  } else {
    itens.push({'Viagem': sViagem.value, 'data': sdata.value, 'valor': svalor.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })
}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()