var clientes = [
	{
	    "codigo": "005123651",
	    "nombre": "Mario Diaz Sosa",
	    "dni": "51913846",
        "celular": "987456321",
	    "cuenta": "350.00",
	    "limiteRecargaRestante": "150.00",
        "estado": "Activo",
	    "operaciones": [
                        {
                            "nroOperacion": "654321987",
                            "monto": "150",
                            "tipo": "r"
                        }
	    ]
	},
	{
	    "codigo": "365454789",
	    "nombre": "Nombre Apellido",
	    "dni": "36589654",
	    "celular": "999999999",
	    "cuenta": "200.00",
	    "limiteRecargaRestante": "0.00",
        "estado": "Inactivo"
	}
];

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

function buscarClientePorDni($dni) {
    var cliente = $.grep(clientes, function (client, position) {
        return client.dni == $dni.val();
    });

    if ($.isEmptyObject(cliente[0])) {
        return null;
    } else {
        return cliente[0];
    }
}

function buscarClientePorCelular($celular) {
    var cliente = $.grep(clientes, function (client, position) {
        return client.celular == $celular.val();
    });

    if ($.isEmptyObject(cliente[0])) {
        return null;
    } else {
        return cliente[0];
    }
}