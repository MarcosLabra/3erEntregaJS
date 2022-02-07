
// ------------------Funciones--------------------->

function filtrarCategoria(id){
  $(`#${id}`).click (() => {
    $.ajax({
      method:"GET",
      url: `../JSON/${id}.json`,
        success: function (respuesta) {
         $("#contenedorProductos").empty();
         tienda = respuesta;
         tienda.forEach((producto, indice) => {
            if(producto.material === "Acero"){
            $("#contenedorProductos").append(`<div class="card">
            <img src="${producto.imagen}" alt="producto">
            <h3>${producto.nombre}</h3>
            <p>$${producto.precio}</p>
            <button class= "btn" onClick="agregarAlCarrito(${indice})">Comprar</button>
            </div>`)}else{
              $("#contenedorProductos").append(`<div class="card">
            <img src="${producto.imagen}" alt="producto">
            <h3 class="titanio">${producto.nombre}</h3>
            <p>$${producto.precio}</p>
            <button class= "btn" onClick="agregarAlCarrito(${indice})">Comprar</button>
            </div>`)
          }
        })
      }
    })
  })
}

//-----------------------BtnCategorias-------------------->
$(".btnCategorias").click(() => {
  document.getElementById("sidebar").classList.toggle('activeCategoria')
})
//-----------------------BtnCarrito-------------------->
$(".btnCarrito").click(() => {
  $("#carrito").toggle()
  window.scrollTo( {
    top: 0,
    left: 0,
    behavior: 'smooth'
} );
})
// ----------------------MAIN----------------------------->
let tienda = [];

$.ajax({
  method:"GET",
  url: "../JSON/general.json",
  success: function (respuesta) {
    $("#contenedorProductos").empty();
    tienda = respuesta;
    tienda.forEach((producto, indice) => {
        if(producto.material === "Acero"){
        $("#contenedorProductos").append(`<div class="card">
        <img src="${producto.imagen}" alt="producto">
        <h3>${producto.nombre}</h3>
        <p>$${producto.precio}</p>
        <button class= "btn" onClick="agregarAlCarrito(${indice})">Comprar</button>
        </div>`)}else{
          $("#contenedorProductos").append(`<div class="card">
        <img src="${producto.imagen}" alt="producto">
        <h3 class="titanio">${producto.nombre}</h3>
        <p>$${producto.precio}</p>
        <button class= "btn" onClick="agregarAlCarrito(${indice})">Comprar</button>
         </div>`)
       }
    })
  }
})

filtrarCategoria("general");
filtrarCategoria("nostril");
filtrarCategoria("argollitas");
filtrarCategoria("dermal");
filtrarCategoria("industrial");
filtrarCategoria("nipple");
filtrarCategoria("ombligo");
filtrarCategoria("labret");


