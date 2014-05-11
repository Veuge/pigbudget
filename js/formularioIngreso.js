$(document).ready(function(){ // cuando este listo el documento
    
    $.get('rest.php').done(function(resultado){
        for(var i=0; i<resultado.length; ++i){
            var cadena = "<option value='"+resultado[i].codIngreso+"'>"+resultado[i].nombreIngreso+"</option>";
            //alert(cadena);
            $(".dropdown").append(cadena);
        }
    });
    $('.dropdown').on('change', funcionDropdown);
    $('#volver-form').on('click', funcionVolverFormulario);
    $('#submit').on('click', funcionGuardarIngreso);
    $('#volver').on('click', funcionVolverIngresos);
});

var funcionGuardar = function(e){
    var nuevoIngreso = document.getElementById("ingreso1").value;
    // var valido = true;
    //VALIDACION PARA NUEVO TIPO DE INGRESO!
    if(nuevoIngreso === '') {
        $("#nuevo-tipo").addClass("has-error");
        alert("No puede ser vacio");
        // valido = false;
    }
    else{
        $.get('rest.php').done(function(listaIngresos){
            var ingresoValido = true;
            for(var i = 0; i < listaIngresos.length; ++i) {
                if (nuevoIngreso === listaIngresos[i].nombreIngreso){
                    alert("Ya existe ese tipo de ingreso");
                    $("#nuevo-tipo").addClass("has-error");
                    ingresoValido = false;
                    $('#ingreso1').val('');
                    break;
                }
            }
            if (ingresoValido){
                $('#ingreso').empty();
                $('#ingreso').append('<option value="0">Seleccione tipo</option><option value="-1" class="new">Nuevo</option>');
                var JSONObjectIngreso = {
                    "nombreIngreso":  nuevoIngreso,
                    "descripcionIngreso": "esto es nuevo"
                };
                $.post("restIngreso.php", JSONObjectIngreso).done(function(datos){
                    $.get('rest.php').done(function(resultado){
                        for(var i=0; i<resultado.length; ++i){
                            var cadena = "<option value='"+resultado[i].codIngreso+"'>"+resultado[i].nombreIngreso+"</option>";
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
};

var funcionGuardarIngreso = function (e) { //captura evento click a boton submit
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
        //alert(cadena);
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
};
var funcionDropdown = function (e) {
    var a = this.options[this.selectedIndex].value;
    if(a === '-1'){
        $(this).hide(); //esconde dropdown
        $('.form-group').hide(); //esconde formulario
        $('#nuevo-tipo').show(); //muestra form nuevo tipo de ingreso
        $('#guardar').on('click', funcionGuardar);
    }
};
var funcionVolverFormulario = function(e){
    $('#ingreso').show();
    $('.form-group').show();
    $('#nuevo-tipo').hide();
};
var funcionVolverIngresos = function (e){
    window.location="ingresos.html";
};