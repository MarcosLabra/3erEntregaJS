

function renderCategorias(array) {
  if($("#sidebar").hasClass("activeCategoria")){
    $("#sidebar").toggleClass("activeCategoria");
  }
  
  array.forEach((producto) => {
    const { imagen, nombre, precio, id } = producto;
    if (producto.material === "Acero") {
      $("#contenedorProductos").append(`
            <div class="card">
            <img src="${imagen}" alt="producto">
            <h3>${nombre}</h3>
            <p>$${precio}</p>
            <button id="${id}" class= "btn">Comprar</button>
            </div>`);
      $(`#${id}`).click(() => agregarAlCarrito(producto));
    } else {
      $("#contenedorProductos").append(`<div class="card">
            <img src="${producto.imagen}" alt="producto">
            <h3 class="titanio">${nombre}</h3>
            <p>$${precio}</p>
            <button id="${id}" class= "btn">Comprar</button>
            </div>`);
      $(`#${id}`).click(() => agregarAlCarrito(producto));
    }
  });
}


$(".btnCategorias").click(() => {
  $("#sidebar").toggleClass("activeCategoria");
});

$(".btnCarrito").click(() => {
  $("#carrito").toggle("smooth");
});

let tienda = [];

$(window).ready(function () {
  $(".loading").fadeOut("slow");
});


$.ajax({
  method: "GET",
  url: "../JSON/general.json",
  success: function (respuesta) {
    tienda = respuesta;
    renderCategorias(tienda);
    
    const categorias = tienda.reduce((acc, el) => {
      if (!acc.includes(el.categoria)) {
        acc.push(el.categoria);
      }
      return acc;
    }, []);
    
    $("#categorias").append(
      `<li id="general"><img src="./images/categorias/tienda.png" alt="logo general">todas</li>`
    );
    $("#general").click(() => {
      renderCategorias(tienda);
    });
    
    for (let i = 0; i < categorias.length; i++) {
      $("#categorias").append(
        `<li id="${categorias[i]}"><img src="./images/categorias/${categorias[i]}.png" alt="logo ${categorias[i]}">${categorias[i]}</li>`
      );
      
      $(`#${categorias[i]}`).click(() => {
        $("#contenedorProductos").empty();
        renderCategorias(
          tienda.filter((x) => x.categoria == `${categorias[i]}`)
        );
      });
    }
  },
});
