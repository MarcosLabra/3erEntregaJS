

function agregarAlCarrito(producto) {
  const { id } = producto;
  
  if (!carrito.includes(producto)) {
    producto.cantidad = 1;
    carrito.push(producto);
    actualizarStorage(carrito);
    renderCarrito();
  } else {
    
    stock = 10;
    if (carrito[carrito.findIndex((x) => x.id === id)].cantidad < stock) {
      carrito[carrito.findIndex((x) => x.id === id)].cantidad++;
      actualizarStorage(carrito);
      renderCarrito();
    } else {
      $(".mainTienda").prepend(`<div class="carritoVacio">
                                <p>Solo hay ${stock} unidades</p>
                                <button id="aceptar" class="btn">Aceptar</button>
                              </div>`);
      $("#aceptar").click(() => {
        $(".carritoVacio").remove();
      });
    }
  }
}

function actualizarStorage(carrito) {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function renderCarrito() {
  $("#contenedorCarrito").empty();
  carrito.forEach((producto, indice) => {
    const { imagen, nombre, precio, cantidad } = producto;
    $("#contenedorCarrito").append(`<div class="cartItem">
                                      <img src="${imagen}" alt="${nombre}">
                                      <div class="itemDescription">
                                        <h3>${nombre}</h3>
                                      <div>
                                      <p><i onclick="restar(${indice})" class="fas fa-minus-circle"></i>
                                          ${cantidad}
                                      <i onclick="sumar(${indice})" class="fas fa-plus-circle"></i></p>
                                      <p>$${precio}</p>
                                      <h4>$${precio * cantidad}</h4>
                                      </div>
                                        <button class="btn" onclick="removeProduct(${indice})">
                                        <i class="fas fa-trash-alt"></i>
                                        </button>
                                      </div>
                                    </div>`);
  });
  
  precioTotal = carrito.reduce(
    (precioTotal, carrito) => precioTotal + carrito.precio * carrito.cantidad,
    0
  );
  $("#valorTotal").html(`Total: $ ${precioTotal}`);
  $("#artCart").html(carrito.length);
}

function restar(indice) {
  if (carrito[indice].cantidad < 2) {
    removeProduct(indice);
  } else {
    carrito[indice].cantidad--;
  }
  renderCarrito();
}

function sumar(indice) {
  stock = 10;
  if (carrito[indice].cantidad >= stock) {
    $(".mainTienda").prepend(`<div class="carritoVacio">
                                <p>Solo hay ${stock} unidades</p>
                                <button id="aceptar" class="btn">Aceptar</button>
                              </div>`);
    $("#aceptar").click(() => {
      $(".carritoVacio").remove();
    });
  } else {
    carrito[indice].cantidad++;
  }
  renderCarrito();
}

function removeProduct(indice) {
  carrito.splice(indice, 1);
  actualizarStorage(carrito);
  $("#contenedorCarrito").empty();
  renderCarrito();
}


let carrito = [];
let precioTotal = null;

if (localStorage.getItem("carrito")) {
  carrito = JSON.parse(localStorage.getItem("carrito"));
  renderCarrito();
}

$("#vaciarCarrito").click(function () {
  localStorage.removeItem("carrito");
  carrito = [];
  $("#valorTotal").html(`<h3 id="valorTotal">Total: $0</h3>`);
  $("#artCart").html(carrito.length);
  $("#contenedorCarrito").empty();
});
