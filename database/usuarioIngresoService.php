<?php 
    //aqui solo queries validaciones reglas DE TABLA USUARIO_INGRESO

    class UsuarioIngresoService{
        public static function insertar($objeto){
            $db = new Database ("pigbudget", "localhost", "root", "cinguifields");
            $db->executeQuery("insert into usuario_ingreso (cod_usuario, cod_i, monto_i, fecha_i) 
                            values ($objeto->codUsuario, $objeto->codIngreso, $objeto->montoIngreso, '$objeto->fechaIngreso')");

        }
        public static function obtenerDatos(){
            //devuelve array de objetos usuario-ingreso
            $db = new Database ("pigbudget", "localhost", "root", "cinguifields");
            $result = $db->executeQuery("select ui.*, i.nombre_i from ingreso i inner join usuario_ingreso ui on i.cod_i = ui.cod_i order by ui.fecha_i");
            $total = $db->executeQuery("select ifnull(truncate(sum(monto_i),1),'0') total from usuario_ingreso");
            $arrayUsuarioIngreso = array();

            foreach ($result as $row) {
                $usring = new UsuarioIngreso ();
                $usring->nombreIngreso = $row["nombre_i"];
                $usring->codUsuario = $row['cod_usuario'];
                $usring->codIngreso = $row['cod_i'];
                $usring->montoIngreso = $row['monto_i'];
                $usring->fechaIngreso = $row['fecha_i'];
                $arrayUsuarioIngreso[] = $usring;
            }
            foreach ($total as $row) {
                $usrT = new UsuarioIngreso ();
                $usrT->totalIngreso = $row['total'];
                $arrayUsuarioIngreso[] = $usrT;
            }

            return $arrayUsuarioIngreso;
        }

        public static function totalPorDia(){
            
            $db = new Database ("pigbudget", "localhost", "root", "cinguifields");
            $result = $db->executeQuery("select date_format(fecha_i, '%w') indice, dayname(fecha_i) dia, sum(monto_i) totalFecha from usuario_ingreso WHERE fecha_i > DATE_SUB(NOW(), INTERVAL 1 WEEK) group by fecha_i");
            $arrayFechaTotalIngreso = array();

            foreach ($result as $row) {
                $fechaTotal = new FechaTotalIngreso ();
                $fechaTotal->indiceDia = $row['indice'];
                $fechaTotal->diaIngreso = $row['dia'];
                $fechaTotal->totalIngreso = $row['totalFecha'];
                $arrayFechaTotalIngreso[] = $fechaTotal;
            }
            return $arrayFechaTotalIngreso;
        }
    }