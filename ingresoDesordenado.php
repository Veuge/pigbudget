<!DOCTYPE html>
  <html lang="es">
    <head>
    <meta charset="utf-8">
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <script src="js/bootstrap.min.js"></script>
  </head>
  
    <body>
      <div class="container">
        <div class="row">
        <h3>Desorden</h3>
      </div>
        <div class="row">
          <table class="table table-striped table-bordered">
            <thead>
              <tr>
              <th>Codigo Ingreso</th>
              <th>Tipo Ingreso</th>
              <th>Descripcion</th>
            </tr>
          </thead>
            <tbody>
            <?php
              include 'database/conexion.php';
              $obj = new Database("pigbudget", "localhost", "root", "cinguifields");
              
              $sql = 'SELECT * FROM ingreso';
              foreach ($obj->executeQuery($sql) as $row) {
                echo '<tr>';
                echo '<td>'. $row['cod_i'] . '</td>';
                echo '<td>'. $row['nombre_i'] . '</td>';
                echo '<td>'. $row['descripcion_i'] . '</td>';
              echo '</tr>';
              }
              $obj->close();
            ?>
          </tbody>
        </table>
      </div>
    </div>
  </body>
</html>

