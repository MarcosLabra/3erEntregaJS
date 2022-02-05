
// ------------------Funciones--------------------->

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

//-----------------------BtnCategorias-------------------->
$(".btnCategorias").click(() => {
  document.getElementById("sidebar").classList.toggle('activeCategoria')
})
//-----------------------BtnCarrito-------------------->
$(".btnCarrito").click(() => {
  $("#carrito").toggle();
})
// ----------------------MAIN----------------------------->
let tienda = [];

$.ajax({
  method:"GET",
  url: `../JSON/general.json`
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

filtrarCategoria("nostril");
filtrarCategoria("argollitas");


$("#vaciarCarrito").click(function vaciarCarrito(){
                              localStorage.removeItem("carrito");
                              carrito = [];
                            $("#valorTotal").html(`<h3 id="valorTotal">Total: $0</h3>`)
                            $("#contenedorCarrito").empty()});






