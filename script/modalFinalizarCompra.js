function finalizarCompra(){
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
                        <button id="realizarPago" class="btn">Realizar pago</button>
                        <button id="seguirComprando" class="btn">Seguir comprando</button>
                        </div>`)
    for (let i = 0; i < carrito.length; i++) {
        $("#modalFinalizarCompra").prepend(`
            <div class="prodFinalizarCompra">
                <img src="${carrito[i].imagen}" alt="producto">
                <p>${carrito[i].cantidad}<span>x</span>${carrito[i].nombre}</p>
            </div>`)
    }
    const direccion = "Calle falsa 123"
    const email = "mlabra.dev@gmail.com"
    $("#realizarPago").click(()=>{
        $("#carrito").empty();
        $("#carrito").append(`
                        <div class="compraTerminada">
                        <h1>gracias por su compra</h1>
                        <p>Su compra sera en enviada a ${direccion}</p>
                        <p>La factura fue enviada a ${email}</p>
                        <button id="volverAComprar" class="btn">Seguir comprando</button>
                        </div>`)
                        $("#volverAComprar").click(()=>{
                                                        localStorage.removeItem("carrito");
                                                        carrito = [];
                                                        location.reload()})
    })

    $("#seguirComprando").click(()=>location.reload())
}
//--------------------MAIN

$("#finalizarCompra").click(()=>finalizarCompra())


