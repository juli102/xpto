let modalKey = 0


let quantpasss = 1

let cart = [] 

const seleciona = (elemento) => document.querySelector(elemento)
const selecionaTodos = (elemento) => document.querySelectorAll(elemento)

const formatoReal = (valor) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

const formatoMonetario = (valor) => {
    if(valor) {
        return valor.toFixed(2)
    }
}

const abrirModal = () => {
    seleciona('.passWindowArea').style.opacity = 0 
    seleciona('.passWindowArea').style.display = 'flex'
    setTimeout(() => seleciona('.passWindowArea').style.opacity = 1, 150)
}

const fecharModal = () => {
    seleciona('.passWindowArea').style.opacity = 0 
    setTimeout(() => seleciona('.passWindowArea').style.display = 'none', 500)
}

const botoesFechar = () => {
   
    selecionaTodos('.passInfo--cancelButton, .passInfo--cancelMobileButton').forEach( (item) => item.addEventListener('click', fecharModal) )
}

const preencheDadosDaspasss = (passItem, item, index) => {
    
	passItem.setAttribute('data-key', index)
    passItem.querySelector('.pass-item--img img').src = item.img
    passItem.querySelector('.pass-item--price').innerHTML = formatoReal(item.price[2])
    passItem.querySelector('.pass-item--name').innerHTML = item.name
    passItem.querySelector('.pass-item--desc').innerHTML = item.description
}

const preencheDadosModal = (item) => {
    seleciona('.passBig img').src = item.img
    seleciona('.passInfo h1').innerHTML = item.name
    seleciona('.passInfo--desc').innerHTML = item.description
    seleciona('.passInfo--actualPrice').innerHTML = formatoReal(item.price[2])
}

const pegarKey = (e) => {
   
    let key = e.target.closest('.pass-item').getAttribute('data-key')
    console.log('pass clicada ' + key)
    console.log(passJson[key])

    
    quantpasss = 1

 
    modalKey = key

    return key
}

const preencherTamanhos = (key) => {

    seleciona('.passInfo--size.selected').classList.remove('selected')

 
    selecionaTodos('.passInfo--size').forEach((size, sizeIndex) => {
    
        (sizeIndex == 2) ? size.classList.add('selected') : ''
        size.querySelector('span').innerHTML = passJson[key].sizes[sizeIndex]
    })
}

const escolherTamanhoPreco = (key) => {
    
    selecionaTodos('.passInfo--size').forEach((size, sizeIndex) => {
        size.addEventListener('click', (e) => {

            seleciona('.passInfo--size.selected').classList.remove('selected')
           
            size.classList.add('selected')

            seleciona('.passInfo--actualPrice').innerHTML = formatoReal(passJson[key].price[sizeIndex])
        })
    })
}

const mudarQuantidade = () => {
   
    seleciona('.passInfo--qtmais').addEventListener('click', () => {
        quantpasss++
        seleciona('.passInfo--qt').innerHTML = quantpasss
    })

    seleciona('.passInfo--qtmenos').addEventListener('click', () => {
        if(quantpasss > 1) {
            quantpasss--
            seleciona('.passInfo--qt').innerHTML = quantpasss	
        }
    })
}

const adicionarNoCarrinho = () => {
    seleciona('.passInfo--addButton').addEventListener('click', () => {
        console.log('Adicionar no carrinho')

    	console.log("pass " + modalKey)
    	
	    let size = seleciona('.passInfo--size.selected').getAttribute('data-key')
	    console.log("Tamanho " + size)
	  
    	console.log("Quant. " + quantpasss)
        
        let price = seleciona('.passInfo--actualPrice').innerHTML.replace('R$&nbsp;', '')
    
	    let identificador = passJson[modalKey].id+'t'+size

        let key = cart.findIndex( (item) => item.identificador == identificador )
        console.log(key)

        if(key > -1) {
      
            cart[key].qt += quantpasss
        } else {
           
            let pass = {
                identificador,
                id: passJson[modalKey].id,
                size, 
                qt: quantpasss,
                price: parseFloat(price) 
            }
            cart.push(pass)
            console.log(pass)
            console.log('Sub total R$ ' + (pass.qt * pass.price).toFixed(2))
        }

        fecharModal()
        abrirCarrinho()
        atualizarCarrinho()
    })
}

const abrirCarrinho = () => {
    console.log('Qtd de itens no carrinho ' + cart.length)
    if(cart.length > 0) {
        
	    seleciona('aside').classList.add('show')
        seleciona('header').style.display = 'flex' 
    }

    
    seleciona('.menu-openner').addEventListener('click', () => {
        if(cart.length > 0) {
            seleciona('aside').classList.add('show')
            seleciona('aside').style.left = '0'
        }
    })
}

const fecharCarrinho = () => {
    
    seleciona('.menu-closer').addEventListener('click', () => {
        seleciona('aside').style.left = '100vw' 
        seleciona('header').style.display = 'flex'
    })
}

const atualizarCarrinho = () => {
   
	seleciona('.menu-openner span').innerHTML = cart.length
	
	if(cart.length > 0) {

		seleciona('aside').classList.add('show')


		seleciona('.cart').innerHTML = ''

        
		let subtotal = 0
		let desconto = 0
		let total    = 0

        
		for(let i in cart) {
		
			let passItem = passJson.find( (item) => item.id == cart[i].id )
			console.log(passItem)

        	subtotal += cart[i].price * cart[i].qt
            
			let cartItem = seleciona('.models .cart--item').cloneNode(true)
			seleciona('.cart').append(cartItem)

			let passSizeName = cart[i].size

			let passName = `${passItem.name} (${passSizeName})`

		
			cartItem.querySelector('img').src = passItem.img
			cartItem.querySelector('.cart--item-nome').innerHTML = passName
			cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt

		
			cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
				console.log('Clicou no botão mais')
				
				cart[i].qt++
				
				atualizarCarrinho()
			})

			cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
				console.log('Clicou no botão menos')
				if(cart[i].qt > 1) {
					 
					cart[i].qt--
				} else {
					 
					cart.splice(i, 1)
				}

                (cart.length < 1) ? seleciona('header').style.display = 'flex' : ''

			 
				atualizarCarrinho()
			})

			seleciona('.cart').append(cartItem)

		} 
		 
		desconto = subtotal * 0
		total = subtotal - desconto

		 
		seleciona('.subtotal span:last-child').innerHTML = formatoReal(subtotal)
		seleciona('.desconto span:last-child').innerHTML = formatoReal(desconto)
		seleciona('.total span:last-child').innerHTML    = formatoReal(total)

	} else {
		 
		seleciona('aside').classList.remove('show')
		seleciona('aside').style.left = '100vw'
	}
}

const finalizarCompra = () => {
    seleciona('.cart--finalizar').addEventListener('click', () => {
        console.log('Finalizar compra')
        seleciona('aside').classList.remove('show')
        seleciona('aside').style.left = '100vw'
        seleciona('header').style.display = 'flex'
    })
}

 
passJson.map((item, index ) => {
   
    let passItem = document.querySelector('.models .pass-item').cloneNode(true)
 
    seleciona('.pass-area').append(passItem)

 
    preencheDadosDaspasss(passItem, item, index)
     
    passItem.querySelector('.pass-item a').addEventListener('click', (e) => {
        e.preventDefault()
        console.log('Clicou na pass')
 
        let chave = pegarKey(e)
       
        abrirModal()
 
        preencheDadosModal(item)
 
        preencherTamanhos(chave)
 
		seleciona('.passInfo--qt').innerHTML = quantpasss

        
        escolherTamanhoPreco(chave)
         
    })

    botoesFechar()

}) 
mudarQuantidade()

adicionarNoCarrinho()
atualizarCarrinho()
fecharCarrinho()
finalizarCompra()

