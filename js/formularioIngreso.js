$(document).ready(function(){ // cuando este listo el documento
    $.get('rest.php').done(function(resultado){
        for(var i=0; i<resultado.length; ++i){
            var cadena = "<option value='"+resultado[i].codIngreso+"'>"+resultado[i].nombreIngreso+"</option>";
            //alert(cadena);
            $(".dropdown").append(cadena);
        }
    });//metodo para obtener tipos de ingreso

    $('.dropdown').on('change', function(e){
        //alert("aqui");
        var a = this.options[this.selectedIndex].value;
        if(a === '-1'){
            $(this).hide(); //esconde dropdown
            $('.form-group').hide(); //esconde formulario
            $('#nuevo-tipo').show(); //muestra form nuevo tipo de ingreso
                        
            $('#guardar').on('click', function(e){
                            
                var nuevoIngreso = document.getElementById("ingreso1").value;
                var flag = true
                //VALIDACION PARA NUEVO TIPO DE INGRESO!
                $.get('rest.php').done(function(resultado){
                    for(var i=0; i<resultado.length; ++i){
                        if (flag && nuevoIngreso === resultado[i]) {
                            flag = false;
                            $("#nuevo-tipo").addClass("has-error");
                            alert("Ya existe ese tipo de ingreso! Ingresa otro");
                            break;
                        }
                    }
                }).error(function(){alert("POR QUE SIGUES MAL!!!???")});
                if(flag && nuevoIngreso === '') {
                    flag = false;
                    $("#nuevo-tipo").addClass("has-error");
                    alert("Ingresa un tipo de ingreso");
                }
                if (flag) {
                    var JSONObjectIngreso = {
                        "nombreIngreso":  nuevoIngreso,
                        "descripcionIngreso": "esto es nuevo"
                    };
                    $.post("restIngreso.php", JSONObjectIngreso).done(function(datos){
                        $('#ingreso').empty();
                        $('#ingreso').append('<option value="0">Seleccione tipo</option><option value="-1" class="new">Nuevo</option>');
                        $.get('rest.php').done(function(resultado){
                            for(var i=0; i<resultado.length; ++i){
                                var cadena = "<option value='"+resultado[i].codIngreso+"'>"+resultado[i].nombreIngreso+"</option>";
                                //alert(cadena);
                                $("#ingreso").append(cadena);
                            }
                        }).error(function(){alert("POR QUE SIGUES MAL!!!???")});
                        $('#ingreso').show();
                        $('.form-group').show();
                        $('#nuevo-tipo').hide();
                    }).error(function(){alert("POR QUE SIGUES MAL!!!???")}); 
                }
            });
        }
    });
    $('#volver-form').on('click', function(e){
        $('#ingreso').show();
        $('.form-group').show();
        $('#nuevo-tipo').hide();
    });
    $('#submit').on('click', function(e){ //captura evento click a boton submit
        var ingreso = document.getElementById("ingreso").value; //var ingreso igual al valor de input ingreso
        var monto = document.getElementById("monto").value; //var monto igual al valor de input monto
        var fecha = document.getElementById("date").value; //var fecha igual al valor de input fecha
        //validar valores vacios
        if (ingreso === '0' || ingreso === '-1') {
            //alert("No selecciono un tipo de ingreso!");
            $('.type').addClass('has-error');
        }
        if(monto === ''){
            //alert("No ingreso el monto del ingreso");
            $('.mont').addClass('has-error');
        }
        if(fecha === ''){
            //alert("No selecciono una fecha");
            $('.fech').addClass('has-error');
        }
        if (ingreso !== '0' && ingreso !== '-1' && monto !== '' && fecha !== ''){

            $('.type').removeClass('has-error');
            $('.mont').removeClass('has-error');
            $('.fech').removeClass('has-error');
            var cadena = "<tr><td>";
            cadena += ingreso;
            cadena += "</td><td>";
            cadena += monto;
            cadena += "</td><td>";
            cadena += fecha;
            cadena += "</td></tr>";
            alert(cadena);
                        
            //$.get('http://localhost/rest.php?alguna_cosa=123&otra_cosa=321').done(function(resultado)
            var JSONObject= { // objeto JSON con valores de inputs
                "tipoIngreso":ingreso,
                "montoIngreso":monto,
                "fechaIngreso": fecha
            };
            $.post("rest.php", JSONObject).done(function( data ) { //AJAX con jquery envia a rest.php objeto JSON
                window.location="ingresos.html";
                var show = JSON.stringify (data); //show = cadena de objeto JSON
                alert( "Data Loaded: " + show ); //muestra cadena de objeto json
            }).error(function(){alert("error!!!")}); //en caso de error muestra mensaje
        }
        else{
            alert('Errores en el formulario marcados con rojo');
        }
    });
    $('#volver').on('click', function(e){
        window.location="ingresos.html";
    });
});