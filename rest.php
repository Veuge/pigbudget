<?php
    //REST USUARIO_INGRESO
    //EJECUTAR ACCIONES DEPENDIENDO GET POST
    //enlace a archivos requeridos
    require "./database/conexion.php"; 
    require "./database/models.php";
    require "./database/usuarioIngresoService.php";
    require "./database/ingresoService.php";

    //tipo de contenido JSON
    header('Content-Type: application/json');
          
    //si el tipo de request es POST
    if ($_SERVER["REQUEST_METHOD"] === 'POST') {
        
        $usuarioIngreso = new UsuarioIngreso(); //crea objeto UsuarioIngreso (models.php)
        $usuarioIngreso->codUsuario = 1; //codigo de usuario 1
        $usuarioIngreso->codIngreso = $_POST['tipoIngreso']; //codigo de ingreso 1
        $usuarioIngreso->montoIngreso = $_POST['montoIngreso']; //monto de ingreso del input
        $usuarioIngreso->fechaIngreso = $_POST['fechaIngreso']; //fecha de ingreso

        UsuarioIngresoService::insertar($usuarioIngreso); //llamada a metodo insertar de clase UsuarioIngresoService parametro objeto (usuarioIngresoService.php) 

        $a = array('status'=> 'ok'); //array a
        echo json_encode($usuarioIngreso); //convierte array 'a' a objeto JSON 
        
    }
    //si el tipo de request es GET
    else if ($_SERVER['REQUEST_METHOD'] === 'GET'){
        $ingreso = IngresoService::obtenerDatos();
        echo json_encode($ingreso);
    }
?>