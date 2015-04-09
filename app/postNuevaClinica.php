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
    $sql = "INSERT INTO clinicas (
    	id_clinica, 
    	nombre, 
    	razonsocial, 
    	cif, 
    	localidad, 
    	provincia, 
    	direccion, 
    	cp, 
    	numclinica, 
    	id_tarifa) VALUES (
    		NULL,
	    	'".$_POST['nombre']."', 
	    	'".$_POST['razonsocial']."', 
	    	'".$_POST['cif']."', 
	    	'".$_POST['localidad']."', 
	    	'".$_POST['provincia']."', 
	    	'".$_POST['direccion']."', 
	    	'".$_POST['cp']."', 
	    	'".$_POST['numclinica']."', 
	    	'".$_POST['id_tarifa']."')";
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
