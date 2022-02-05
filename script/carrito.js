//---------------------FUNCIONES-------------------------------------------->
function agregarAlCarrito(indiceDelArrayProducto){
    const indiceEncontradoCarrito = carrito.findIndex((elemento) => {
      return elemento.id === tienda[indiceDelArrayProducto].id;
    });
    if (indiceEncontradoCarrito === -1) {
      const productoAgregar = tienda[indiceDelArrayProducto];
      productoAgregar.cantidad = 1;
      carrito.push(productoAgregar);
      actualizarStorage(carrito);
      renderCarrito();
    } else {
      carrito[indiceEncontradoCarrito].cantidad += 1;
      actualizarStorage(carrito);
      renderCarrito();
    }
  };
  
  function actualizarStorage(carrito){
    localStorage.setItem("carrito", JSON.stringify(carrito));
  };

function renderCarrito(){
    $("#contenedorCarrito").empty();
    carrito.forEach((carrito, indice) => {
    
        $("#contenedorCarrito").append(`<div class="cartItem">
                                            <img src="${carrito.imagen}" alt="...">
                                            <div class="itemDescription">
                                                <h3>${carrito.nombre}</h3>
                                                <div>
                                                    <p>x${carrito.cantidad}</p>
                                                    <p>$${carrito.precio}</p>
                                                    <h4>$${carrito.precio * carrito.cantidad}</h4>
                                                </div>
                                                <button class="btn" onClick="removeProduct(${indice})"><i class="fas fa-trash-alt"></i></button>
                                            </div>
                                        </div>`);
        });
        precioTotal = carrito.reduce((precioTotal, carrito) => precioTotal + carrito.precio*carrito.cantidad, 0);
        $("#valorTotal").html(`Total: $ ${precioTotal}`)
    
    }
  
    function removeProduct(indice){
      carrito.splice(indice, 1);
      actualizarStorage(carrito);
      $("#contenedorCarrito").empty();
      renderCarrito();
       };
//----------------------------------MAIN---------------------->
let carrito = [];
let precioTotal = null;

if (localStorage.getItem("carrito")) {
  carrito = JSON.parse(localStorage.getItem("carrito"));
  renderCarrito();
}

$("#btnSeguirComprando").click(function(){
  $("#carrito").empty();
  renderCarrito();
})
