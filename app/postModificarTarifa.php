<?php
header("Access-Control-Allow-Origin: *");

$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "clinicas";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sql = "UPDATE tarifas SET	
            nombre = '".$_POST['nombre']."',
            descripcion = '".$_POST['descripcion']."'
            WHERE id_tarifa = ".$_POST['id_tarifa'];
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