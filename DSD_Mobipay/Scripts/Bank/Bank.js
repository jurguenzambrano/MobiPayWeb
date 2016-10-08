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
function MostrarResultadoRecarga(xData) {
    var xResult = xData.split("|");
    var msj = "";
    var $mensajes = $("#mensajes");

    if (xResult[0] == "True") {
        $mensajes.attr("class", "alert alert-danger");
        msj = xResult[1];
        mostrarMensajes([msj], $mensajes);
    }
    else {
        $mensajes.attr("class", "alert alert-success");
        msj = xResult[1];
        mostrarMensajes([msj], $mensajes);
    }
}

function RealizarRecarga(xCodigoUsuario, mMonto) {
    var frm = new FormData();
    token = document.getElementsByName("__RequestVerificationToken")
    frm.append("__RequestVerificationToken", token[0].value);
    frm.append("xCodigoUsuario", xCodigoUsuario);
    frm.append("mMonto", mMonto);

    var url = "../Bank/RealizarRecargaMonedero";
    enviarServidorPost(url, MostrarResultadoRecarga, frm);
}

function BuscarUsuario(xCodigoUsuario) {
    var frm = new FormData();
    token = document.getElementsByName("__RequestVerificationToken")
    frm.append("__RequestVerificationToken", token[0].value);
    frm.append("xCodigoUsuario", xCodigoUsuario);

    var url = "../Bank/BuscarUsuario";
    enviarServidorPost(url, cargarCliente, frm);
}



var buscarCliente = document.getElementById("buscarCliente");
buscarCliente.onclick = function () {
    var xCodUsuario = document.getElementById("codigoCliente");
    BuscarUsuario(xCodUsuario.value);

}

function cargarCliente(xDatos) {
    var xResult = (xDatos).split('|');
    var realizarRecarga = document.getElementById("realizarRecarga")

    if (xResult[0] == "True") {
        clienteNoEncontrado();
        realizarRecarga.setAttribute("disabled", "disabled");
    } else {
        var cliente = { "nombre": xResult[1], "dni": xResult[2] }
        realizarRecarga.removeAttribute("disabled");
        mostrarCliente(cliente);
    }
}



var realizarRecarga = document.getElementById("realizarRecarga");
realizarRecarga.onclick = function () {
    var xCodUsuario = document.getElementById("codigoCliente");
    var xMonto = document.getElementById("monto");
    RealizarRecarga(xCodUsuario.value, xMonto.value);
}









function buscarCliente($codigoCliente) {
    var cliente = $.grep(clientes, function (client, position) {
        return client.codigo == $codigoCliente.val();
    });

    if ($.isEmptyObject(cliente[0])) {
        return null;
    } else {
        return cliente[0];
    }
}

function mostrarCliente(cliente) {
    $("#recargarMonedero > .form-group.data").removeClass("hidden");
    $("#realizarRecarga").removeAttr("disabled").removeProp('disabled');
    $("#cliente").html(cliente.nombre);
    $("#dni").html(cliente.dni);
    borrarMensajes($("#mensajes"));
}

function clienteNoEncontrado() {
    $("#recargarMonedero > .form-group.data").addClass("hidden");
    $("#realizarRecarga").attr("disabled", "disabled").prop('disabled');
    $("#cliente").html("");
    $("#dni").html("");
    var $mensajes = $("#mensajes");
    $mensajes.attr("class", "alert alert-danger");
    mostrarMensajes(['Cliente no encontrado'], $("#mensajes"));
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

    //$("#recargarMonedero").submit(function (e) {
    //    e.preventDefault();
    //    var cliente = buscarCliente($("#codigoCliente"));
    //    var monto = $("#monto").val();
    //    if (monto == "error") {
    //        $mensajes = $("#mensajes");
    //        $mensajes.attr("class", "alert alert-danger");
    //        mostrarMensajes(['Hubo un error en el sistema, Vuelva a intentarlo'], $mensajes);
    //    } else {
    //        realizarRecarga(cliente, parseFloat(monto));
    //    }
    //});
});