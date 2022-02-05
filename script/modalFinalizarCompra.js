$("#finalizarCompra").click( 
    function(){
        $("#carrito").empty();
        
        $("#carrito").append(`
                            <div id="modalFinalizarCompra" >
                            <div class="formulario">
                                <div>
                                    <label>E-mail:</label>
                                    <input type="email" placeholder="E-mail">
                                </div>
                                <div>
                                    <label>Dirección:</label>
                                    <input type="text" placeholder="direccion de entrega">
                                </div>
                            </div>
                            <hr width="100%" color="#A37657"\>
                            <h3>Total: $${precioTotal}</h3>
                            <hr width="100%" color="#A37657"\>
                            <button id="realizarPago" class="btn">Realizar pago</button>
                            <button id="btnSeguirComprando" class="btn">Seguir comprando</button>
                            </div>`)
        for (let i = 0; i < carrito.length; i++) {
            $("#modalFinalizarCompra").prepend(`
                <div class="prodFinalizarCompra">
                    <img src="${carrito[i].imagen}" alt="producto">
                    <p>${carrito[i].cantidad}<span>x</span>${carrito[i].nombre}</p>
                </div>`)
        }
    })
