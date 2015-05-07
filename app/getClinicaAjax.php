<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$server = "localhost";
$user = "root";
$pass = "root";
$bd = "clinicas";
 
//Creamos la conexión
$conexion = mysqli_connect($server, $user, $pass,$bd) 
or die("Ha sucedido un error inexperado en la conexion de la base de datos");
 
//generamos la consulta
$sql = "SELECT id_clinica, nombre, razonsocial, cif, 
    localidad, provincia, direccion, cp, numclinica, id_tarifa FROM clinicas WHERE id_clinica=".$_GET['id'];
mysqli_set_charset($conexion, "utf8"); //formato de datos utf8
 
if(!$result = mysqli_query($conexion, $sql)) die();
 
$clinicas = array(); //creamos un array
 
while($row = mysqli_fetch_array($result)) 
{ 
    $id=$row['id_clinica'];
    $nombre=$row['nombre'];
    $razonsocial=$row['razonsocial'];
    $cif=$row['cif'];
    $localidad=$row['localidad'];
    $provincia=$row['provincia'];
    $direccion=$row['direccion'];
    $cp=$row['cp'];
    $numclinica=$row['numclinica'];
    $id_tarifa=$row['id_tarifa'];
    
 
    $clinicas[] = array('id_clinica'=> $id, 'nombre'=> $nombre, 
                        'razonsocial'=> $razonsocial, 'cif'=> $cif,
                        'localidad'=> $localidad, 'provincia'=> $provincia, 
                        'direccion'=> $direccion, 'cp' => $cp, 'numclinica' => $numclinica,
                        'id_tarifa' => $id_tarifa);
 
}
    
//desconectamos la base de datos
$close = mysqli_close($conexion) 
or die("Ha sucedido un error inexperado en la desconexion de la base de datos");
  
 
//Creamos el JSON
$json_string = json_encode($clinicas);
echo $json_string;
 
//Si queremos crear un archivo json, sería de esta forma:
/*
$file = 'clinicas.json';
file_put_contents($file, $json_string);
*/
    
 
?>