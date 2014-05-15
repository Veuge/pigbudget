<?php 
    require "./database/conexion.php"; 
    require "./database/models.php";
    require "./database/usuarioIngresoService.php";

    header('Content-Type: application/json');

    if ($_SERVER["REQUEST_METHOD"] === 'GET') {
        $ui = UsuarioIngresoService::totalPorDia(); //llamada a metodo obtenerDatos de clase UsuarioIngresoService guarda resultado en array (usuarioIngresoService.php) 
        // $total = UsuarioIngresoService::totalIngreso();
        // echo json_encode("Monto total: " + $total);
        echo json_encode($ui); //convierte array a objeto JSON y lo imprime
    }
?>