<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$servername = "localhost";
$username = "jorgelopez_usr";
$password = "datatablesajax";
$dbname = "jorgelopez_datatables";

//Creamos la conexión
$conexion = mysqli_connect($servername, $username, $password,$dbname)
or die("Ha sucedido un error inexperado en la conexion de la base de datos");

//generamos la consulta
$sql = "SELECT * FROM tarifas WHERE id_tarifa=".$_GET['id'];
mysqli_set_charset($conexion, "utf8"); //formato de datos utf8

if(!$result = mysqli_query($conexion, $sql)) die();

$tarifas = array(); //creamos un array

while($row = mysqli_fetch_array($result))
{
    $id=$row['id_tarifa'];
    $nombre=$row['nombre'];
    $descripcion=$row['descripcion'];


    $tarifas[] = array('id_tarifa'=> $id, 'nombre'=> $nombre,
        'descripcion'=> $descripcion);

}

//desconectamos la base de datos
$close = mysqli_close($conexion)
or die("Ha sucedido un error inexperado en la desconexion de la base de datos");


//Creamos el JSON
$json_string = json_encode($tarifas);
echo $json_string;

//Si queremos crear un archivo json, sería de esta forma:
/*
$file = 'tarifas.json';
file_put_contents($file, $json_string);
*/


?>