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

function clienteNoEncontrado() {
    var $tabla = $("#tablaCliente");
    $tabla.addClass("hidden");
    $(">tbody > tr", $tabla).empty();
    var $mensajes = $("#mensajes");
    $mensajes.attr("class", "alert alert-danger");
    mostrarMensajes(['No se encontraron registros con los datos ingresados'], $("#mensajes"));
}

function mostrarError() {
    var $tabla = $("#tablaCliente");
    $tabla.addClass("hidden");
    $(">tbody > tr", $tabla).empty();
    var $mensajes = $("#mensajes");
    $mensajes.attr("class", "alert alert-danger");
    mostrarMensajes(['Hubo un error en el sistema, Vuelva a intentarlo'], $("#mensajes"));
}

function mostrarErrorDatos() {
    var $tabla = $("#tablaCliente");
    $tabla.addClass("hidden");
    $(">tbody > tr", $tabla).empty();
    var $mensajes = $("#mensajes");
    $mensajes.attr("class", "alert alert-danger");
    mostrarMensajes(['Datos inválidos'], $("#mensajes"));
}

function mostrarCliente(cliente) {
    borrarMensajes($("#mensajes"));
    var $tabla = $("#tablaCliente");
    $(">tbody > tr", $tabla).empty();
    agregarTd($tabla, cliente.codigo);
    agregarTd($tabla, cliente.nombre);
    agregarTd($tabla, cliente.dni);
    agregarTd($tabla, cliente.estado);
    $tabla.removeClass("hidden");
}

function agregarTd($tabla, textNode) {
    $(">tbody>tr", $tabla).append("<td>"+ textNode +"</td>");
}

$(function () {
    $("#buscarCliente").click(function (e) {
        e.preventDefault();
        var $celular = $("#numeroCelular");
        var $dni = $("#dni");
        var cliente = null;
        var patt = /[0-9]/;

        if ($celular.val() == "error") {
            mostrarError();
            return;
        }
        if ($celular.val()) {
            if (patt.test($celular.val())) {
                cliente = buscarClientePorCelular($celular);
            } else {
                mostrarErrorDatos();
                return;
            }
        } else if ($dni.val()) {
            if (patt.test($dni.val())) {
                cliente = buscarClientePorDni($dni);
            } else {
                mostrarErrorDatos();
                return;
            }
        }

        if (!cliente) {
            clienteNoEncontrado()
        } else {
            mostrarCliente(cliente);
        }
    });
});