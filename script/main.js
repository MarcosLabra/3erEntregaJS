// ------------------Funciones--------------------->

function renderCategorias(array) {
  array.forEach((producto, indice) => {
    if (producto.material === "Acero") {
      $("#contenedorProductos").append(`
            <div class="card">
            <img src="${producto.imagen}" alt="producto">
            <h3>${producto.nombre}</h3>
            <p>$${producto.precio}</p>
            <button id="${producto.id}" class= "btn">Comprar</button>
            </div>`);
      $(`#${producto.id}`).click(() => agregarAlCarrito(producto));
    } else {
      $("#contenedorProductos").append(`<div class="card">
            <img src="${producto.imagen}" alt="producto">
            <h3 class="titanio">${producto.nombre}</h3>
            <p>$${producto.precio}</p>
            <button id="${producto.id}" class= "btn">Comprar</button>
            </div>`);
      $(`#${producto.id}`).click(() => agregarAlCarrito(producto));
    }
  });
}

//-----------------------BtnCategorias-------------------->
$(".btnCategorias").click(() => {
  $("#sidebar").toggleClass("activeCategoria");
});
//-----------------------BtnCarrito-------------------->
$(".btnCarrito").click(() => {
  $("#carrito").toggle("smooth");
});
// ----------------------MAIN----------------------------->
let tienda = [];
//-------------------pantalla de carga (hago un loop para q se llegue a ver)
$(window).ready(function () {
  for (let index = 0; index < 2000; index++) {}
  $(".loading").fadeOut("slow");
});
//------------------llamada ajax
$.ajax({
  method: "GET",
  url: "../JSON/general.json",
  success: function (respuesta) {
    tienda = respuesta;
    renderCategorias(tienda);
    //--------------filtro nombres de categorias
    const categorias = tienda.reduce((acc, el) => {
      if (!acc.includes(el.categoria)) {
        acc.push(el.categoria);
      }
      return acc;
    }, []);
    //----------------genera la categoria general en sidebar
    $("#categorias").append(
      `<li id="general"><img src="./images/categorias/tienda.png" alt="logo general">todas</li>`
    );
    $("#general").click(() => {
      renderCategorias(tienda);
    });
    //----------------genera el resto de las categorias en sidebar
    for (let i = 0; i < categorias.length; i++) {
      $("#categorias").append(
        `<li id="${categorias[i]}"><img src="./images/categorias/${categorias[i]}.png" alt="logo ${categorias[i]}">${categorias[i]}</li>`
      );
      //asigno el evento a cada categoria, filtrando el array pasado a la funcion renderCategorias
      $(`#${categorias[i]}`).click(() => {
        $("#contenedorProductos").empty();
        renderCategorias(
          tienda.filter((x) => x.categoria == `${categorias[i]}`)
        );
      });
    }
  },
});

//hacer destructuring de los for each.
//agregar la posibilidad de manipular la cantidad de los productos desde el carrito
//agregar y sacar productos del carrito sin tener que volver a renderizarlo
