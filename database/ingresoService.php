<?php 
    class IngresoService{
        public static function obtenerDatos(){
            $db = new Database ("pigbudget", "localhost", "root", "cinguifields");
            $result = $db->executeQuery("select * from ingreso");

            $arrayIngreso = array();

            foreach ($result as $row) {
                $ing = new Ingreso ();
                $ing->codIngreso = $row['cod_i'];
                $ing->nombreIngreso = $row['nombre_i'];
                $ing->descripcionIngreso = $row['descripcion_i'];
                
                $arrayIngreso[] = $ing;
            }
            return $arrayIngreso;
        }
        public static function obtenerCodigo($cadenaNombre){
            $db = new Database ("pigbudget", "localhost", "root", "cinguifields");
            $result = $db->executeQuery("select cod_i from ingreso where nombre_i like '$cadenaNombre'");

            $arrayIngreso = array();

            foreach ($result as $row) {
                $ing = new Ingreso ();
                $ing->codIngreso = $row['cod_i'];
                $ing->nombreIngreso = $row['nombre_i'];
                $ing->descripcionIngreso = $row['descripcion_i'];
                
                $arrayIngreso[] = $ing;
            }
            return $arrayIngreso;
        }
        public static function obtenerNombre($codigoIngreso){
            $db = new Database ("pigbudget", "localhost", "root", "cinguifields");
            $result = $db->executeQuery("select nombre_i from ingreso where cod_i = $codigoIngreso");

            $arrayIngreso = array();

            foreach ($result as $row) {
                $ing = new Ingreso ();
                $ing->nombreIngreso = $row['nombre_i'];
                                
                $arrayIngreso[] = $ing;
            }
            return $arrayIngreso;
        }
        public static function insertar($objeto){
            $db = new Database ("pigbudget", "localhost", "root", "cinguifields");
            $db->executeQuery("insert into ingreso (nombre_i) values ('$objeto->nombreIngreso')");
        }
    }

?>