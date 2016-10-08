function buscarOperacionCliente(codigoCliente, nroOperacion) {
    var cliente = $.grep(clientes, function (client, position) {
        return client.codigo == codigoCliente;
    });

    if ($.isEmptyObject(cliente[0])) {
        return null;
    } else {
        var operacion = $.grep(cliente[0]["operaciones"], function (op, position) {
            return op.nroOperacion == nroOperacion;
        });

        return operacion[0];
    }
}

function mostrarCliente(cliente) {
    $("#extornoMonedero > .form-group.data").removeClass("hidden");
    $("#realizarRecarga").removeAttr("disabled").removeProp('disabled');
    $("#cliente").html(cliente.nombre);
    $("#dni").html(cliente.dni);
    borrarMensajes($("#mensajes"));
}
function clienteNoEncontrado() {
    $("#extornoMonedero > .form-group.data").addClass("hidden");
    $("#realizarRecarga").attr("disabled", "disabled").prop('disabled');
    $("#cliente").html("");
    $("#dni").html("");
    var $mensajes = $("#mensajes");
    $mensajes.attr("class", "alert alert-danger");
    mostrarMensajes(['Cliente no encontrado'], $("#mensajes"));
}


function nroNoEncontrada() {
    var $mensajes = $("#mensajes");
    $mensajes.attr("class", "alert alert-danger");
    mostrarMensajes(['Nro de operación inválido.'], $("#mensajes"));
}

function montosDistintos() {
    var $mensajes = $("#mensajes");
    $mensajes.attr("class", "alert alert-danger");
    mostrarMensajes(['El monto a extornar es incorrecto'], $("#mensajes"));
}

function mostrarExtorno() {
    var $mensajes = $("#mensajes");
    $mensajes.attr("class", "alert alert-success");
    mostrarMensajes(['El extorno se realizó correctamente.'], $mensajes);
}


function borrarMensajes($divMensajes) {
    $(">ul", $divMensajes).html("");
    $divMensajes.addClass('hidden');
    return $divMensajes;
}

function mostrarMensajes(mensajes, $divMensajes) {
    $(">ul", $divMensajes).html(crearMensaje(mensajes));
    return $divMensajes;
}

function crearMensaje(mensajes) {
    var mensaje = '';
    mensajes.forEach(function (item, index) {
        mensaje += '<li>' + item + '</li>';
    });

    return mensaje;
}

function puedoRealizarRecarga(cliente, monto) {
    if (parseFloat(cliente.limiteRecargaRestante) >= parseFloat(monto)) {
        return {
            estado: 1,
            mensaje: 'Si puede realizar la recarga'
        };
    } else {
        return {
            estado: 2,
            mensaje: "El monto ingresado supera al monto máximo de recarga. "
                + "El monto máximo permitido es de S/. " + cliente.limiteRecargaRestante
        };
    }
}

function realizarRecarga(cliente, monto) {
    var $mensajes = $("#mensajes");
    var puedoRecargar = puedoRealizarRecarga(cliente, monto);
    if (puedoRecargar.estado == 1) {
        $mensajes.attr("class", "alert alert-success");
        mostrarMensajes(['La recarga se hizo satisfactoriamente'], $mensajes);
    } else {
        $mensajes.attr("class", "alert alert-danger");
        var mensaje = puedoRecargar.mensaje;
        mostrarMensajes([mensaje], $mensajes);
    }
}

$(function () {
    //$("#buscarCliente").click(function (e) {
    //    e.preventDefault();
    //    var cliente = buscarCliente($("#codigoCliente"));

    //    if (!cliente) {
    //        clienteNoEncontrado()
    //    } else {
    //        mostrarCliente(cliente);
    //    }
    //});

    $("#extornoMonedero").submit(function (e) {
        e.preventDefault();
        var codCliente = $("#codigoCliente").val();
        var nroOperacion = $("#nroOperacion").val();
        var monto = $("#monto").val();
        var operacion = buscarOperacionCliente(codCliente, nroOperacion);
        
        if (!operacion) {
            nroNoEncontrada()
        } else {

            var montoOperacioGuardada = operacion["monto"];

            if (montoOperacioGuardada == monto) {
                var cliente = buscarCliente($("#codigoCliente"));
                mostrarExtorno(cliente);
            } else {
                montosDistintos();
            }
        }

    });

});