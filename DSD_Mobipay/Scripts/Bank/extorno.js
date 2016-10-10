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
function enviarServidorPost(url, metodo, frm) {
    var xhr = new XMLHttpRequest();
    xhr.open("post", url, true);
    xhr.msCaching = 'disabled';
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            metodo(xhr.responseText);
        }
        else {
        }
    }
    xhr.send(frm);
}
var buscarCliente = document.getElementById("buscarCliente");
buscarCliente.onclick = function () {
    var xCodUsuario = document.getElementById("codigoCliente");
    BuscarUsuario(xCodUsuario.value);

}

function BuscarUsuario(xCodigoUsuario) {
    var frm = new FormData();
    token = document.getElementsByName("__RequestVerificationToken")
    frm.append("__RequestVerificationToken", token[0].value);
    frm.append("xCodigoUsuario", xCodigoUsuario);

    var url = "../Bank/BuscarUsuario";
    enviarServidorPost(url, cargarCliente, frm);
}

function cargarCliente(xDatos) {
    console.log(xDatos);
    var xResult = (xDatos).split('|');
    var realizarExtorno = document.getElementById("realizarExtorno")

    if (xResult[0] != "True") {
        clienteNoEncontrado(xResult[0]);
        realizarExtorno.setAttribute("disabled", "disabled");
    } else {
        var cliente = { "nombre": xResult[1], "dni": xResult[2] }
        realizarExtorno.removeAttribute("disabled");
        mostrarCliente(cliente);
    }
}

function mostrarCliente(cliente) {
    $("#extornoMonedero > .form-group.data").removeClass("hidden");
    $("#realizarRecarga").removeAttr("disabled").removeProp('disabled');
    $("#cliente").html(cliente.nombre);
    $("#dni").html(cliente.dni);
    borrarMensajes($("#mensajes"));
}
function clienteNoEncontrado(xResult) {
    $("#extornoMonedero > .form-group.data").addClass("hidden");
    $("#realizarRecarga").attr("disabled", "disabled").prop('disabled');
    $("#cliente").html("");
    $("#dni").html("");
    var $mensajes = $("#mensajes");
    $mensajes.attr("class", "alert alert-danger");
    mostrarMensajes([xResult], $("#mensajes"));
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

function montrarResultadoError(xMensaje) {
    var $mensajes = $("#mensajes");
    $mensajes.attr("class", "alert alert-danger");
    mostrarMensajes([xMensaje], $("#mensajes"));
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

        RealizarExtorno(codCliente, nroOperacion, monto);
        /*
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
        */
    });

    function RealizarExtorno(xCodigoUsuario, xOperacion, mMonto) {
        var frm = new FormData();
        token = document.getElementsByName("__RequestVerificationToken")
        frm.append("__RequestVerificationToken", token[0].value);
        frm.append("xCodigoUsuario", xCodigoUsuario);
        frm.append("xOperacion", xOperacion);
        frm.append("mMonto", mMonto);

        var url = "../Bank/RealizarExtornoMonedero";
        enviarServidorPost(url, ResultadoExtorno, frm);
    }
    function ResultadoExtorno(xDatos) {
        if (xDatos == "True") {
            //console.log("todo ok");
            //var cliente = buscarCliente($("#codigoCliente"));
            mostrarExtorno();
        } else {
            //console.log("error alguno");
            montrarResultadoError(xDatos);
        }
    }

});