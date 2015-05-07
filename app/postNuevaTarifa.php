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
    $sql = "INSERT INTO tarifas (
    	id_tarifa,
    	nombre,
    	descripcion) VALUES (
    		NULL,
	    	'".$_POST['nombre']."',
	    	'".$_POST['descripcion']."')";
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
