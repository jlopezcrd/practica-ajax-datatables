<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$conn = new mysqli("localhost", "jorgelopez_usr", "datatablesajax", "jorgelopez_datatables");

$result = $conn->query("SELECT numclinica FROM clinicas ORDER BY numclinica DESC LIMIT 1");

while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    $outp .= $rs['numclinica'];
}

$conn->close();

echo(json_encode($outp));
?>