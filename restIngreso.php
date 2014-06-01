<?php 
    require "/home/veuge/Documentos/Coding/pigbudget/database/conexion.php"; 
    require "/home/veuge/Documentos/Coding/pigbudget/database/models.php";
    require "./database/usuarioIngresoService.php";
    require "./database/ingresoService.php";

    header('Content-Type: application/json');

    if ($_SERVER["REQUEST_METHOD"] === 'GET') {
        $ui = UsuarioIngresoService::obtenerDatos(); //llamada a metodo obtenerDatos de clase UsuarioIngresoService guarda resultado en array (usuarioIngresoService.php) 
        echo json_encode($ui); //convierte array a objeto JSON y lo imprime
    }
    else if ($_SERVER["REQUEST_METHOD"] === 'POST'){
        $ingreso = new Ingreso();
        $ingreso->nombreIngreso = $_POST['nombreIngreso'];

        IngresoService::insertar($ingreso);
        echo (json_encode($ingreso));
    }
 ?>