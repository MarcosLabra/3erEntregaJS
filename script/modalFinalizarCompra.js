
//-------------------------------Renderizo el formulario para finalizar la compra
function finalizarCompra() {
  if (localStorage.getItem("carrito")) {
    $("#carrito").empty();
    $("#carrito").append(`
                        <div id="modalFinalizarCompra" >
                        <div class="formulario">
                            <div>
                                <label>E-mail:</label>
                                <input id="email" type="email" placeholder="E-mail">
                            </div>
                            <div>
                                <label>Dirección:</label>
                                <input id="direccion" type="text" placeholder="direccion de entrega">
                            </div>
                        </div>
                        <hr width="100%" color="#FFE7C3"\>
                        <h3>Total: $${precioTotal}</h3>
                        <hr width="100%" color="#FFE7C3"\>
                        <button id="realizarPago" class="btn" onclick="realizarPago()">Realizar pago</button>
                        <button id="seguirComprando" class="btn" onclick="seguirComprando()">Seguir comprando</button>
                        </div>`);
    $("#seguirComprando").click(() => location.reload());

    for (let i = 0; i < carrito.length; i++) {
      $("#modalFinalizarCompra").prepend(`
                <div class="prodFinalizarCompra">
                    <img src="${carrito[i].imagen}" alt="producto">
                    <p>${carrito[i].cantidad}<span>x</span>${carrito[i].nombre}</p>
                </div>`);
    }
  } else {
    $(".mainTienda").prepend(`<div class="carritoVacio">
                                        <p>El carrito esta vacio,</p>
                                        <p>por favor agregue un producto</p>
                                        <button id="aceptar" class="btn">Aceptar</button>
                                    </div>`);
  }
  $("#aceptar").click(() => {
    $(".carritoVacio").remove();
  });
}
//-----------------------Devuelvo un mensaje con los valores tomados del form de  la funcion anterior
function realizarPago() {
  let email = $("#email").val();
  let direccion = $("#direccion").val();
  $("#carrito").empty();

  $("#carrito").append(`
                    <div class="compraTerminada">
                    <h1>¡gracias por su compra!</h1>
                    <p>Su compra sera en enviada a </p>
                    <span>${direccion}</span>
                    <p>La factura fue enviada a </p>
                    <span>${email}</span>
                    <button id="volverAComprar" class="btn">Seguir comprando</button>
                    </div>`);
  $("#volverAComprar").click(() => {
    localStorage.removeItem("carrito");
    carrito = [];
    location.reload();
  });
}
//--------------------MAIN

$("#finalizarCompra").click(() => finalizarCompra());
