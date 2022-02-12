//---------------------FUNCIONES-------------------------------------------->
function agregarAlCarrito(producto) {
  if (!carrito.includes(producto)) {
    producto.cantidad = 1;
    carrito.push(producto);
    actualizarStorage(carrito);
    renderCarrito();
  } else {
    carrito[carrito.findIndex((x) => x.id === producto.id)].cantidad++;
    actualizarStorage(carrito);
    renderCarrito();
  }
}

function actualizarStorage(carrito) {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function removeProduct(indice) {
  carrito.splice(indice, 1);
  actualizarStorage(carrito);
  $("#contenedorCarrito").empty();
  renderCarrito();
}

function renderCarrito() {
  $("#contenedorCarrito").empty();
  carrito.forEach((carrito, indice) => {
    $("#contenedorCarrito").append(`<div class="cartItem">
                                            <img src="${
                                              carrito.imagen
                                            }" alt="...">
                                            <div class="itemDescription">
                                                <h3>${carrito.nombre}</h3>
                                                <div>
                                                <p><i onclick="restar(${indice})" class="fas fa-minus-circle"></i>${
      carrito.cantidad
    }<i onclick="sumar(${indice})" class="fas fa-plus-circle"></i></p>
                                                    <p>$${carrito.precio}</p>
                                                    <h4>$${
                                                      carrito.precio *
                                                      carrito.cantidad
                                                    }</h4>
                                                </div>
                                                <button class="btn" onClick="removeProduct(${indice})"><i class="fas fa-trash-alt"></i></button>
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
  carrito[indice].cantidad--;
  renderCarrito();
}
function sumar(indice) {
  carrito[indice].cantidad++;
  renderCarrito();
}

//----------------------------------MAIN---------------------->
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
