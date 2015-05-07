console.log('\'Allo \'Allo!');

/*$.ajax({
    url: "http://localhost:8888/@LOS_ENLACES/DWEC/practica-ajax-datatables/app/getDoctores_mejor.php",
    datatype: "json",
    success: function(data){
        console.log(data);
        /*$.each(data, function( key, value ) {
            console.log(key+value);
        });*/
//}
//});

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

function cargarDatos() {
    console.log("estoy");
    $('#doctores').dataTable( {
        "ajax": "http://jorgelopez.infenlaces.com/getDoctores_mejor.php",
        "columns": [
        { "data": "id_doctor" },
        { "data": "nombre" },
        { "data": "numcolegiado" },
        { "data": "clinicas" },
        { "data": "id_doctor",
        'render': function(data) {
            return "<div class='text-right'><button type='button' class='btn btn-info' onclick=abrirModal('editar&"+data+"');><i class='fa fa-edit fa-3x'></i></button>"+
            "<button type='button' class='btn btn-warning' onclick=abrirModal('borrar&"+data+"');><i class='fa fa-trash fa-3x'></i></button></div>";
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

function abrirModal(valor) {

    var fun = valor.split("&");

    if(fun[0] == "editar") {
        cargarDatosEditar();
    }

    if(fun[0] == "borrar") {
        var r = confirm("¿Esta seguro que quiere eliminar?");
        if (r == true) {
            //alert("You pressed OK!");
            $('#doctores').dataTable()._fnAjaxUpdate();
            //alert("Borrado correcto!");
            $.gritter.add({
                // (string | mandatory) the heading of the notification
                title: 'This is a notice!',
                // (string | mandatory) the text inside the notification
                text: 'This will fade out after a certain amount of time.'
            });
        } else {
            alert("You pressed Cancel!");
        }
    }
}

function cargarDatosEditar() {
    $('#myModalLabel').text("Editar Doctor");
    $('#myModalBody').html(
        "<form action='' class='form-horizontal'>"+
        "<label>Nombre: </label> <input type='text' /></input><br/>"+
        "<label>Numero Colegiado: </label> <input type='text' /></input><br/>"+
        "<label>Clinicas: </label><select multiple class='form-control'>"+
        "<option>1</option>"+
        "<option>2</option>"+
        "<option>3</option>"+
        "<option>4</option>"+
        "<option>5</option>"+
        "</select>"+
        "</form>");
    $('#myModal').modal('toggle');
}

$(document).ready(function($) {
    console.log("hola");
    cargarDatos();
});