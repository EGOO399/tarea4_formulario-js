const cards = document.getElementById('cards')
const items = document.getElementById('items')
const footer = document.getElementById('footer')
const templatecard = document.getElementById('template-card').content
const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content
const fragment = document.createDocumentFragment()
let carrito = {}


document.addEventListener('DOMContentLoaded', () => {
    fetchData ()
})

cards.addEventListener('click', e =>{
    addCarrito (e)
}) 

const fetchData = async () => {
    try{
        const res = await fetch('api.json')
        const data = await res.json()
        //console.log(data)
         pintarCards(data)
    }catch (error){
        console.log(error)
    }
}

const pintarCards = data => {
    //console.log(data)
    data.forEach(producto => {
        templatecard.querySelector('h5').textContent = producto.title
        templatecard.querySelector('p').textContent = producto.precio
        templatecard.querySelector('img').setAttribute("src", producto.imagen)
        templatecard.querySelector('button').dataset.id = producto.id

        const clone = templatecard.cloneNode(true)
        fragment.appendChild(clone)

        
    });
    cards.appendChild(fragment)

}
const addCarrito = e =>{
    //console.log(e.target)
   // console.log(e.target.classList.contains('btn-dark'))
    if (e.target.classList.contains('btn-dark')){
        setCarrito(e.target.parentElement) 
    }
    e.stopPropagation()
}

const setCarrito = Object =>{
    //console.log(Object)
    const producto = {
        id: Object.querySelector('.btn-dark').dataset.id,
        title: Object.querySelector('h5').textContent,
        precio: Object.querySelector('p').textContent,
        cantidad: 1
    }
    // para ir sumando los productos a nuestro carrito 
    //cundo sean de los mismos
    if (carrito.hasOwnProperty(producto.id)){
        producto.cantidad = carrito[producto.id].cantidad + 1
    }
    carrito[producto.id] = {...producto}
    pintarCarrito()



}
//para pintar el carrito hay que hacer el recorrido
const pintarCarrito = () =>{
    //console.log(carrito)
    items.innerHTML=''
    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector('th').textContent = producto.id
        templateCarrito.querySelector('td').textContent=producto.title
        templateCarrito.querySelector('.pre').textContent = producto.cantidad
        templateCarrito.querySelector('.btn-info').dataset.id = producto.id 
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id
        templateCarrito.querySelector('span').textContent = producto.cantidad * producto.precio
        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)

    pintarFooter()
}
const pintarFooter = () =>{
    footer.innerHTML=''

    if(Object.keys(carrito).length === 0){
      footer.innerHTML = `
      <th scope="row" colspan="s"> Carrito Vacio - empieza a comprar</th>
      `
    
    }

    const nCantidad = Object.values(carrito).reduce((acc,{cantidad}) => acc + cantidad,0)
    const nPrecio = Object.values(carrito).reduce((acc,{cantidad, precio}) => acc + precio * cantidad,0)
    console.log(nPrecio)

    templateFooter.querySelector('td').textContent = nCantidad
    templateFooter.querySelector('span').textContent = nPrecio

    const clone = templateFooter.cloneNode(true)

}


