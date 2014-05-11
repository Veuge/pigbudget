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
    })
    $('#get-back').on('click', function(e){
        $('.tabla').show();
        $('.grafica').hide();
    });
});