<?php 
    require "/home/veuge/Documentos/Coding/pigbudget/database/conexion.php"; 
    require "/home/veuge/Documentos/Coding/pigbudget/database/models.php";
    require "./database/usuarioIngresoService.php";

    header('Content-Type: application/json');

    if ($_SERVER["REQUEST_METHOD"] === 'GET') {
        $ui = UsuarioIngresoService::totalPorDia(); //llamada a metodo obtenerDatos de clase UsuarioIngresoService guarda resultado en array (usuarioIngresoService.php) 
        // $total = UsuarioIngresoService::totalIngreso();
        // echo json_encode("Monto total: " + $total);
        echo json_encode($ui); //convierte array a objeto JSON y lo imprime
    }
?>