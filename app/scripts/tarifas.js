console.log('\'Allo \'Allo!');

var debug = false;

urlAjax = "http://jorgelopez.infenlaces.com/";

if(debug) {

    $.ajax({
        url: urlAjax+"getClinicas.php",
        datatype: "json",
        success: function(data){
            console.log(data);
            /*$.each(data, function( key, value ) {
                console.log(key+value);
            });*/
}
});

}

function mostrarAlerta(titulo, texto) {
    var unique_id = $.gritter.add({
        // (string | mandatory) the heading of the notification
        title: titulo,
        // (string | mandatory) the text inside the notification
        text: texto,
        // (bool | optional) if you want it to fade out on its own or just sit there
        sticky: false,
        // (int | optional) the time you want it to be alive for before fading out (milliseconds)
        time: 1500
    });
}

function centrarValorTabla(data) {
    return '<div class="text-center">'+data+'</div>';
};

function cargarDatos() {
    $('#tarifas').dataTable( {
        //"ajax": "http://localhost:8888/@LOS_ENLACES/DWEC/practica-ajax-datatables/app/getClinicas.php",
        "ajax": urlAjax+"getTarifas.php",
        "columns": [
        { "data": "id_tarifa",
        'render': function(data) { return centrarValorTabla(data)}},
        { "data": "nombre" },
        { "data": "descripcion" },
        { "data": "id_tarifa",
        'render': function(data) {
            return "<div class='text-right'><button type='button' class='btn btn-success' onclick=abrirModal('mostrar&"+data+"');><i class='fa fa-search'></i></button> "+
            "<button type='button' class='btn btn-info' onclick=abrirModal('editar&"+data+"');><i class='fa fa-edit'></i></button> "+
            "<button type='button' class='btn btn-warning' onclick=abrirModal('borrar&"+data+"');><i class='fa fa-trash'></i></button></div>";
        }
    },
        // return '<div class="text-right"><button type="button" class="btn btn-info" onclick=abrirModal(editar&'+ data +');>Editar</button> <a class="btn btn-warning" href=http://localhost/php/borrar.php?id_clinica=' + data + '>Borrar</a>'
        //{ "defaultContent": "<div class='text-right'><button type='button' class='btn btn-info' onclick=abrirModal('editar'); id="">Editar</button> <button type='button' class='btn btn-warning' onclick=abrirModal('borrar');>Borrar</button></div>"}
        ],
        stateSave: true,
        "language": {
            "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
        }
    } );
mostrarAlerta("Perfecto!", "Datos cargados correctamente!");
}

function actualizarTablaDatos() {
    $('#tarifas').dataTable()._fnAjaxUpdate();
    mostrarAlerta("Guay!", "Datos actualizados correctamente!");
}

function abrirModal(valor) {

    var fun = valor.split("&");

    if(fun[0] == "mostrar") {
        cargarDatosEditar("Visualizar Clinica");
    }

    if(fun[0] == "editar") {
        cargarDatosEditar("Editar Tarifa", fun[1]);
    }

    if(fun[0] == "borrar") {
        var r = confirm("¿Esta seguro que quiere eliminar?");
        if (r == true) {
            $.ajax({
                url: urlAjax+"postBorrarTarifa.php?id="+fun[1],
                type: 'GET',
                success: function(data){
                    mostrarAlerta(data);
                }
            });
            actualizarTablaDatos();
        } else {
            $('#alerta .modal-dialog .alert').addClass('alert-danger');
            $('#alertaLabel').text("Operación cancelada!");
            $('#alertaBody').html("Has cancelado el borrado de los datos");
            $('#alerta').modal('toggle');
            setTimeout(function(){ $('#alerta').modal('toggle'); }, 1000);
        }
    }

    if(fun[0] == "crear") {
        nuevaTarifa("Introducir Tarifa");
    }
}

function guardarForm(idForm, idModal) {
        //$("#"+idForm).submit();
        console.log($("#"+idForm).serialize());
        if(idForm=="nuevaTarifa") {
            $.ajax({
               type: 'POST',
               url: urlAjax+'postNuevaTarifa.php',
               data: $("#"+idForm).serialize(),
               success: function(data){
                $("#"+idModal).modal('toggle');
                actualizarTablaDatos();
                mostrarAlerta(data);
            },
            error: function(data){
                console.log(data);
                $("#"+idModal).modal('toggle');
                mostrarAlerta("Error!", "Registro no insertado!");
            }
        });
        } else {
            console.log($("#"+idForm).serialize());
            $.ajax({
               type: 'POST',
               url: urlAjax+'postModificarTarifa.php',
               data: $("#"+idForm).serialize(),
               success: function(data){
                $("#"+idModal).modal('toggle');
                actualizarTablaDatos();
                mostrarAlerta(data);
            },
            error: function(data){
                console.log(data);
                $("#"+idModal).modal('toggle');
                mostrarAlerta("Error!", "Registro no actualizado!");
            }
        });
        }
    }

    function nuevaTarifa(titulo) {
        $('#myModalLabel').text(titulo);
        $('#myModalBody').html(
            "<form action='' id='nuevaTarifa' class='form-horizontal'>"+
            "<label>Nombre: </label> <input type='text' name='nombre' class='form-control'/></input><br/>"+
            "<label>Descripcion: </label> <input type='text' name='descripcion' class='form-control'/></input><br/>");
        $('#myModalBody').html($('#myModalBody').html()+"</form>");
        $('#btn-guardar').attr('onclick','guardarForm("nuevaTarifa","myModal");');
        $('#myModal').modal('toggle');
    }

    function cargarDatosEditar(titulo, id) {
        $.ajax({
            url: urlAjax+"getTarifaAjax.php?id="+id,
            success: function(data){
                console.log(data);
                $('#myModalLabel').text(titulo);
                $('#myModalBody').html(
                    "<form action='' id='modificarTarifa' class='form-horizontal'>"+
                    "<input type='hidden' name='id_tarifa' value='"+data[0].id_tarifa+"'></input>"+
                    "<label>Nombre: </label> <input type='text' name='nombre' class='form-control' value='"+data[0].nombre+"'/></input><br/>"+
                    "<label>Razon Social: </label> <input type='text' name='descripcion' class='form-control' value='"+data[0].descripcion+"'/></input><br/>");

                $('#myModalBody').html($('#myModalBody').html()+"</form>");
                $('#btn-guardar').attr('onclick','guardarForm("modificarTarifa","myModal");');
                $('#myModal').modal('toggle');
            }
        });
    }

    $(document).ready(function($) {
        cargarDatos();
    });