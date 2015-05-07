console.log('\'Allo \'Allo!');

var debug = false;

if(debug) {

    $.ajax({
        url: "http://localhost:8888/@LOS_ENLACES/DWEC/practica-ajax-datatables/app/getClinicas.php",
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
    $('#clinicas').dataTable( {
        //"ajax": "http://localhost:8888/@LOS_ENLACES/DWEC/practica-ajax-datatables/app/getClinicas.php",
        "ajax": "http://localhost:8888/@LOS_ENLACES/DWEC/practica-ajax-datatables/app/getClinicas.php",
        "columns": [
        { "data": "numclinica",
        'render': function(data) { return centrarValorTabla(data)}},
        { "data": "nombre" },
        { "data": "razonsocial" },
        { "data": "cif",
        'render': function(data) { return centrarValorTabla(data)}},
        { "data": "localidad"},
        { "data": "provincia"},
        { "data": "direccion"},
        { "data": "cp",
        'render': function(data) { return centrarValorTabla(data)}},
        { "data": "id_tarifa",
        'render': function(data) { return centrarValorTabla(data)}},
        { "data": "id_clinica",
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
    $('#clinicas').dataTable()._fnAjaxUpdate();
    mostrarAlerta("Guay!", "Datos actualizados correctamente!");
}

function abrirModal(valor) {

    var fun = valor.split("&");

    if(fun[0] == "mostrar") {
        cargarDatosEditar("Visualizar Clinica");
    }

    if(fun[0] == "editar") {
        cargarDatosEditar("Editar Clinica", fun[1]);
    }

    if(fun[0] == "borrar") {
        var r = confirm("¿Esta seguro que quiere eliminar?");
        if (r == true) {
            $.ajax({
                url: "http://localhost:8888/@LOS_ENLACES/DWEC/practica-ajax-datatables/app/postBorrarClinica.php?id="+fun[1],
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
        nuevaClinica("Introducir Clinica");
    }
}

function guardarForm(idForm, idModal) {
        //$("#"+idForm).submit();
        console.log($("#"+idForm).serialize());
        if(idForm=="nuevaClinica") {
            $.ajax({
               type: 'POST',
               url: 'http://localhost:8888/@LOS_ENLACES/DWEC/practica-ajax-datatables/app/postNuevaClinica.php',
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
               url: 'http://localhost:8888/@LOS_ENLACES/DWEC/practica-ajax-datatables/app/postModificarClinica.php',
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

    function nuevaClinica(titulo) {
        var numClinica;
        $.ajax({
            url: "http://localhost:8888/@LOS_ENLACES/DWEC/practica-ajax-datatables/app/getNumClinicaMax.php",
            async: false,
            success: function(data){
                numClinica = (parseInt(data)+1);
            }
        });
        $('#myModalLabel').text(titulo);
        $('#myModalBody').html(
            "<form action='' id='nuevaClinica' class='form-horizontal'>"+
            "<label>Nombre: </label> <input type='text' name='nombre' class='form-control'/></input><br/>"+
            "<label>Razon Social: </label> <input type='text' name='razonsocial' class='form-control'/></input><br/>"+
            "<label>Cif: </label> <input type='text' name='cif' class='form-control'/></input><br/>"+
            "<label>Localidad: </label> <input type='text' name='localidad' class='form-control'/></input><br/>"+
            "<label>Provincia: </label> <input type='text' name='provincia' class='form-control'/></input><br/>"+
            "<label>Direccion: </label> <input type='text' name='direccion' class='form-control'/></input><br/>"+
            "<label>CP: </label> <input type='text' name='cp' class='form-control'/></input><br/>"+
            "<label>NumClinica: </label> <input type='text' name='numclinica' class='form-control'/ value='"+numClinica+"'></input><br/>");
        $.ajax({
            url: "http://localhost:8888/@LOS_ENLACES/DWEC/practica-ajax-datatables/app/getTarifasAjax.php",
            datatype: "json",
            success: function(data){
                //console.log(data);
                $('#nuevaClinica').html($('#nuevaClinica').html()+"<label>Tarifa: </label><div class='radio' id='tarifas'></div>");
                $.each(data, function( key, value ) {
                    //console.log(key+value.nombre);
                    $('#tarifas').html($('#tarifas').html()+"<label><input type='radio' name='id_tarifa' id='id_tarifa' value="+value.id_tarifa+">"+value.nombre+" - "+value.descripcion+"</label><br/>");
                });
            }
        });
        $('#myModalBody').html($('#myModalBody').html()+"</form>");
        $('#btn-guardar').attr('onclick','guardarForm("nuevaClinica","myModal");');
        $('#myModal').modal('toggle');
    }

    function cargarDatosEditar(titulo, id) {
        $.ajax({
            url: "http://localhost:8888/@LOS_ENLACES/DWEC/practica-ajax-datatables/app/getClinicaAjax.php?id="+id,
            success: function(data){
                console.log(data);
                $('#myModalLabel').text(titulo);
                $('#myModalBody').html(
                    "<form action='' id='modificarClinica' class='form-horizontal'>"+
                    "<input type='hidden' name='id_clinica' value='"+data[0].id_clinica+"'></input>"+
                    "<label>Nombre: </label> <input type='text' name='nombre' class='form-control' value='"+data[0].nombre+"'/></input><br/>"+
                    "<label>Razon Social: </label> <input type='text' name='razonsocial' class='form-control' value='"+data[0].razonsocial+"'/></input><br/>"+
                    "<label>Cif: </label> <input type='text' name='cif' class='form-control' value='"+data[0].cif+"'/></input><br/>"+
                    "<label>Localidad: </label> <input type='text' name='localidad' class='form-control' value='"+data[0].localidad+"'/></input><br/>"+
                    "<label>Provincia: </label> <input type='text' name='provincia' class='form-control' value='"+data[0].provincia+"'/></input><br/>"+
                    "<label>Direccion: </label> <input type='text' name='direccion' class='form-control' value='"+data[0].direccion+"'/></input><br/>"+
                    "<label>CP: </label> <input type='text' name='cp' class='form-control' value='"+data[0].cp+"'/></input><br/>"+
                    "<label>NumClinica: </label> <input type='text' name='numclinica' class='form-control'/ value='"+data[0].numclinica+"'></input><br/>");
$.ajax({
    url: "http://localhost:8888/practica-ajax-datatables/app/getTarifasAjax.php",
    datatype: "json",
    success: function(tarifas){
                    //console.log(data);
                    $('#modificarClinica').html($('#modificarClinica').html()+"<label>Tarifa: </label><div class='radio' id='tarifas'></div>");
                    $.each(tarifas, function( key, value ) {
                        //console.log(key+value.nombre);
                        if(value.id_tarifa==data[0].id_tarifa) {
                            $('#tarifas').html($('#tarifas').html()+"<label><input type='radio' name='id_tarifa' id='id_tarifa' value="+value.id_tarifa+" checked>"+value.nombre+" - "+value.descripcion+"</label><br/>");
                        } else {
                            $('#tarifas').html($('#tarifas').html()+"<label><input type='radio' name='id_tarifa' id='id_tarifa' value="+value.id_tarifa+">"+value.nombre+" - "+value.descripcion+"</label><br/>");
                        }
                    });
                }
            });
$('#myModalBody').html($('#myModalBody').html()+"</form>");
$('#btn-guardar').attr('onclick','guardarForm("modificarClinica","myModal");');
$('#myModal').modal('toggle');
}
});
}

$(document).ready(function($) {
    cargarDatos();
});