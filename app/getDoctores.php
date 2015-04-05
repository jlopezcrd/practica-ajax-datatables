<?php
header("Access-Control-Allow-Origin: *");
try {
    $conn = require_once 'connect.php';
    $sql = "SELECT * FROM doctores";
    $result = $conn->prepare($sql) or die ($sql);
    if (!$result->execute()) return false;
    if ($result->rowCount() > 0) {
        $json = array();
        while ($row = $result->fetch()) {
            $json[] = array(
                'id_doctor' => $row['id_doctor'],
                'nombre' =>$row['nombre'],
                'numcolegiado' => $row['numcolegiado']
                );
        };
        //$json['success'] = true;
        echo json_encode($json);
    }
} catch (PDOException $e) {
    echo 'Error: '. $e->getMessage();
}
?>