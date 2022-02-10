
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
  $("#carrito").toggle("smooth");
})
// ----------------------MAIN----------------------------->
$(window).ready(function() {
 for (let index = 0; index < 2000; index++) {
 }
  $(".loading").fadeOut("slow");
});

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

let tienda = [];
const categorias = ["general", "nostril", "argollitas", "dermal", "industrial", "nipple", "ombligo","labret"]
for (let i = 0; i < categorias.length; i++) {
  filtrarCategoria(categorias[i]);
  
}
