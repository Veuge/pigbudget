$(document).ready(function(){
            
    $.get('restIngreso.php').done(function(resultado){

        for(var i=0; i<resultado.length-1; ++i){
            var cadena = "<tr><td>"
            cadena += resultado[i].nombreIngreso;
            cadena += "</td><td>";
            cadena += resultado[i].fechaIngreso;
            cadena += "</td><td>";
            cadena += resultado[i].montoIngreso;
            cadena += "</td></tr>";

            $("#result").append(cadena);
        }
        var total = "<tr class='success'><td colspan='2'><strong>Total</strong</td><td>";
        total += resultado[resultado.length-1].totalIngreso;
        total += "</td></tr>";
        $("#total").append(total);
    });
    $('#stats').on('click', function(e){
        $('.tabla').hide();
        $('.grafica').show();

        $.get('restGraficas.php').done(function(arrayFechaTotal){

            // for(var i=0; i<resultado.length-1; i++){
            //     alert("Indice de dia: " + resultado[i].indiceDia);
            //     alert("Dia : " + resultado[i].diaIngreso);
            //     alert("Total: " + resultado[i].totalIngreso);
            // }
            var dia = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];
            var labels = [];
            var values = [];
            var posicion_nueva = 6;
            var indice_actual;
            var valor_resta = 1;
            labels[posicion_nueva] = dia[arrayFechaTotal[arrayFechaTotal.length-1].indiceDia];
            values[posicion_nueva] = arrayFechaTotal[arrayFechaTotal.length-1].totalIngreso;
            posicion_nueva --;
            for (var i = arrayFechaTotal.length - 1; i >= 0; i--) {
                
                    indice_actual = arrayFechaTotal[i].indiceDia;
                    indice_actual = indice_actual - valor_resta;
                    if(indice_actual < 0){
                        indice_actual = indice_actual + 7;
                    }
                    while (i - 1 < 0 || indice_actual > arrayFechaTotal[i-1].indiceDia) {
                        labels [posicion_nueva] = dia [indice_actual];
                        values [posicion_nueva] = 0;
                        posicion_nueva --;
                        if (posicion_nueva < 0) {
                            break;
                        }
                        indice_actual = indice_actual - valor_resta;
                    }
                    if(posicion_nueva < 0) {
                        break;
                    }
                    labels[posicion_nueva] = dia[arrayFechaTotal[i-1].indiceDia];
                    values[posicion_nueva] = arrayFechaTotal[i-1].totalIngreso;
                    posicion_nueva--;
                
            }
            // for(i = 0; i < labels.length-1; i++){
            //     alert(labels[i]);
            //     alert(values[i]);
            // }
            var data = {
                labels : labels,
                datasets : [
                    {
                        fillColor : "rgba(99,123,133,0.4)",
                        strokeColor : "rgba(220,220,220,1)",
                        pointColor : "rgba(220,220,220,1)",
                        pointStrokeColor : "#fff",
                        data : values
                    }
                    
                ]
            }
            var canvas = document.getElementById("grafica_ingreso");
            var ctx = canvas.getContext("2d");
            var myChart = new Chart(ctx).Line(data);
        });
    })
    $('#get-back').on('click', function(e){
        $('.tabla').show();
        $('.grafica').hide();

        
    });

    
});