<?php
header("Access-Control-Allow-Origin: *");

$servername = "localhost";
$username = "jorgelopez_usr";
$password = "datatablesajax";
$dbname = "jorgelopez_datatables";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sql = "UPDATE clinicas SET
    nombre = '".$_POST['nombre']."',
    razonsocial = '".$_POST['razonsocial']."',
    cif = '".$_POST['cif']."',
    localidad = '".$_POST['localidad']."',
    provincia = '".$_POST['provincia']."',
    direccion = '".$_POST['direccion']."',
    cp = '".$_POST['cp']."',
    numclinica = '".$_POST['numclinica']."',
    id_tarifa = '".$_POST['id_tarifa']."'
    WHERE id_clinica = ".$_POST['id_clinica'];
    // use exec() because no results are returned
    $conn->exec($sql);
    echo "Datos guardados correctamente.";
}
catch(PDOException $e)
{
    echo $sql . "<br>" . $e->getMessage();
}

$conn = null;
?>