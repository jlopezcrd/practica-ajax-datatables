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

function cargarDatos() {
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
    cargarDatos();
});