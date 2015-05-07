<?php
header("Access-Control-Allow-Origin: *");
/*
 * DataTables example server-side processing script.
 *
 * Please note that this script is intentionally extremely simply to show how
 * server-side processing can be implemented, and probably shouldn't be used as
 * the basis for a large complex system. It is suitable for simple use cases as
 * for learning.
 *
 * See http://datatables.net/usage/server-side for full details on the server-
 * side processing requirements of DataTables.
 *
 * @license MIT - http://datatables.net/license_mit
 */

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Easy set variables
 */

// DB table to use
$table = 'prescripciones';

// Table's primary key
$primaryKey = 'idprescripciones';

// Array of database columns which should be read and sent back to DataTables.
// The `db` parameter represents the column name in the database, while the `dt`
// parameter represents the DataTables column identifier. In this case simple
// indexes
$columns = array(
    array( 'db' => 'idprescripciones', 'dt' => 'id_prescripciones' ),
    array( 'db' => 'id_clinica', 'dt' => 'id_clinica' ),
    array( 'db' => 'nombre_clinica',  'dt' => 'nombre_clinica' ),
    array( 'db' => 'id_doctor',   'dt' => 'id_doctor' ),
    array( 'db' => 'nombre_doctor',   'dt' => 'nombre_doctor' ),
    array( 'db' => 'numero_paciente',   'dt' => 'numero_paciente' ),
    array( 'db' => 'descripcion',   'dt' => 'descripcion' ),
    array( 'db' => 'fecha_solicitud',   'dt' => 'fecha_solicitud' ),
    array( 'db' => 'fecha_entrada',   'dt' => 'fecha_entrada' ),
    array( 'db' => 'fecha_finalizacion',   'dt' => 'fecha_finalizacion' ),
    array( 'db' => 'fecha_nueva_cita',   'dt' => 'fecha_nueva_cita' )
    );

// SQL server connection information
$sql_details = array(
    'user' => 'root',
    'pass' => 'root',
    'db'   => 'clinicas',
    'host' => 'localhost'
    );


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * If you just want to use the basic configuration for DataTables with PHP
 * server-side, there is no need to edit below this line.
 */

require( 'ssp.class.php' );

echo json_encode(
    SSP::simple( $_GET, $sql_details, $table, $primaryKey, $columns )
    );
