<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$conn = new mysqli("localhost", "root", "root", "clinicas");

$result = $conn->query("SELECT id_tarifa, nombre, descripcion FROM tarifas");

$outp = "[";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "[") {$outp .= ",";}
    $outp .= '{"id_tarifa":"'  . $rs["id_tarifa"] . '",';
    $outp .= '"nombre":"'   . $rs["nombre"]        . '",';
    $outp .= '"descripcion":"'. $rs["descripcion"]     . '"}'; 
}
$outp .="]";

$conn->close();

echo($outp);
?>