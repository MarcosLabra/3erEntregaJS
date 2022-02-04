
// ------------------Funciones--------------------->
function agregarAlCarrito(indiceDelArrayProducto){
  const indiceEncontradoCarrito = carrito.findIndex((elemento) => {
    return elemento.id === tienda[indiceDelArrayProducto].id;
  });
  if (indiceEncontradoCarrito === -1) {
    const productoAgregar = tienda[indiceDelArrayProducto];
    productoAgregar.cantidad = 1;
    carrito.push(productoAgregar);
    actualizarStorage(carrito);
  } else {
    carrito[indiceEncontradoCarrito].cantidad += 1;
    actualizarStorage(carrito);
  }
};

function actualizarStorage(productos){
  localStorage.setItem("carrito", JSON.stringify(productos));
};

function filtrarCategoria(id){
  $(`#${id}`).click (() => {
    $.ajax({
      method:"GET",
      url: `../JSON/${id}.json`
      ,success: function (respuesta) {
         $("#contenedorProductos").empty();
         tienda = respuesta;
        tienda.forEach((producto, indice) => {
          $("#contenedorProductos").append(`<div class="card">
          <img src="${producto.imagen}" alt="producto">
          <h3>${producto.nombre}</h3>
          <h6>${producto.material}</h6>
          <p>$${producto.precio}</p>
          <button class= "btn" onClick="agregarAlCarrito(${indice})">Comprar</button>
        </div>`)
        })
      }
    })
  })
}
// ----------------------MAIN----------------------------->
let tienda = [];
let carrito = [];

if (localStorage.getItem("carrito")) {
  carrito = JSON.parse(localStorage.getItem("carrito"));
}

$.ajax({
  method:"GET",
  url: `../JSON/general.json`
  ,success: function (respuesta) {
    respuesta.forEach((producto, indice) => {
      $("#contenedorProductos").append(`<div class="card">
      <img src="${producto.imagen}" alt="producto">
      <h3>${producto.nombre}</h3>
      <h6>${producto.material}</h6>
      <p>$${producto.precio}</p>
      <button class= "btn" onClick="agregarAlCarrito(${indice})">Comprar</button>
    </div>`)
    })
  }
})

filtrarCategoria("nostril");
filtrarCategoria("argollitas");






