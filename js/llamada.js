/* global urlBase, alertify, CREADO, EN_PROCCESO_DE_ASIGNACION, ASIGNADO, ACEPTADO, EN_PROGRESO, FINALIZADO, markers, directionsDisplay, TIPO_USUARIO, flightPath, CANCELADO */
var LLAMADAS;
var ESTADO_LLAMADA;
var ID_LLAMADA;
var PAGINA = 'LLAMADAS';
var CAMPOS = ["clienteLlamada","rutaLlamada","fechaLlamada","inicioLlamada","estadoLlamada","movilLlamada","conductorLlamada"];

$(document).ready(function(){
    PAGINA_ANTERIOR = PAGINA;
    iniciarFechaHora([$("#desde"),$("#hasta")]);
    buscarLlamada();
    
    $("#exportar").click(function(){
        exportarLlamada(); 
    });
    
    $("#buscar").click(function(){
        buscarLlamada(); 
    });
});

function buscarLlamada()
{
    var id = $("#id").val();
    var extension = $("#extension").val();
    var contraparte = $("#contraparte").val();
    var tipo = $("#tipo").val();
    var desde = $("#desde").val();
    var hasta = $("#hasta").val();
    var usuario = $("#user").val();
    var centroCosto = $("#cc").val();
    var costo1 = $("#costo1").val();
    var costo2 = $("#costo1").val();
    var duracion1 = $("#costo1").val();
    var duracion2 = $("#costo1").val();
    var params = {id : id, extension : extension, contraparte : contraparte, tipo : tipo,
        desde : desde, hasta : hasta, usuario : usuario, centrocosto : centroCosto, costo1 : costo1,
        costo2 : costo2, duracion1 : duracion1, duracion2 : duracion2};
    var url = urlBase + "/llamada/GetLlamadas.php";
    var success = function(response)
    {
        cerrarSession(response);
        var llamadas = $("#contenedor_central");
        llamadas.html("");
        LLAMADAS = response;
        if(response.length === 0)
        {
            alertify.error("No hay registros que mostrar");
            return;
        }
        llamadas.append("<div class=\"contenedor_central_titulo\"><div></div><div>ID Llamada</div><div>Extension</div><div>Contraparte</div><div class=\"fila_fecha\">Fecha</div><div class=\"fila_num\">Tipo</div><div class=\"fila_num\">Costo</div><div class=\"fila_fecha\">Usuario</div><div class=\"fila_fecha\">Centro Costo</div></div>");
        for(var i = 0 ; i < response.length; i++)
        {
            var id = response[i].llamada_id;
            var extension = response[i].llamada_extension;
            var contraparte = response[i].llamada_contraparte;
            var fecha = response[i].llamada_origen;
            var tipo = response[i].llamada_tipo;
            var costo = response[i].llamada_costo;
            var usuario = response[i].llamada_nombre_usuario;
            var centro = response[i].llamada_nombre_cc;
            llamadas.append("<div class=\"fila_contenedor fila_contenedor_llamada\" id=\""+id+"\" onClick=\"abrirBuscador('"+id+"')\">"+
                    "<div>"+id+"</div>"+
                    "<div>"+extension+"</div>"+
                    "<div>"+contraparte+"</div>"+
                    "<div class=\"fila_fecha\">"+fecha+"</div>"+
                    "<div class=\"fila_num\">"+tipo+"</div>"+
                    "<div class=\"fila_num\">"+costo+"</div>"+
                    "<div class=\"fila_fecha\">"+usuario+"</div>"+
                    "<div class=\"fila_fecha\">"+centro+"</div>"+
                    "</div>");
        }
    };
    postRequest(url,params,success);
}

function abrirBuscador(id)
{
    AGREGAR = false;
    ID_LLAMADA = id;
    quitarclase($(".fila_contenedor"),"fila_contenedor_activa");
    agregarclase($("#"+id),"fila_contenedor_activa");
    $("#contenedor_central").load("html/datos_llamada.html", function( response, status, xhr ) {
        $("#titulo_pagina_llamada").text(id);
        if(TIPO_USUARIO === 'CLIENTE')
        {
            cambiarPropiedad($("#p_ruta"),"display","none");
            $("#rutaLlamada").prop("readonly",true);
            $("#tipoRutaLlamada").prop("disabled",true);
            $("#fechaLlamada").prop("readonly",true);
            $("#inicioLlamada").prop("readonly",true);
            $("#estadoLlamada").prop("disabled",true);
            $("#movilLlamada").prop("disabled",true);
            $("#tarifa2Llamada").prop("readonly",true);
            cambiarPropiedad($("#tarifaLlamada"),"display","none");
            cambiarPropiedad($("#contTarifa1"),"display","none");
            cambiarPropiedad($("#guardar"),"display","none");
        }
        else if(TIPO_USUARIO === 'ADMIN')
        {
            cargarClientes();
            cargarRutas();
            $("#rutaLlamada").prop("readonly",false);
            $("#tipoRutaLlamada").prop("readonly",false);
            $("#fechaLlamada").prop("disabled",false);
            $("#inicioLlamada").prop("disabled",false);
            $("#estadoLlamada").prop("disabled",false);
            $("#movilLlamada").prop("disabled",false);
            $("#tarifaLlamada").prop("readonly",false);
            $("#tarifa2Llamada").prop("readonly",false);
            iniciarFecha([$("#fechaLlamada")]);
            iniciarHora([$("#inicioLlamada")]);
        }
        cambioEjecutado();
        iniciarPestanias();
        var llamada;
        for(var i = 0 ; i < LLAMADAS.length; i++)
        {
            if(LLAMADAS[i].llamada_id === id)
            {
                llamada = LLAMADAS[i];
            }
        }
        $("#idLlamada").val(llamada.llamada_id);
        $("#clienteLlamada").val(llamada.llamada_cliente);
        $("#rutaLlamada").val(llamada.llamada_ruta);
        $("#tipoRutaLlamada").val(llamada.llamada_truta);
        $("#estadoLlamada").val(llamada.llamada_estado);
        ESTADO_LLAMADA = llamada.llamada_estado;
        cargarRutas();
        var conductorReal = "";
        for(var i = 0 ; i < MOVILES.length; i++)
        {
            var sel = "";
            var conductor = conductores.get(MOVILES[i].movil_conductor);
            if(MOVILES[i].movil_nombre === llamada.llamada_movil)
            {
                ID_CONDUCTOR = MOVILES[i].movil_conductor;
                conductorReal = conductor;
                sel = " selected ";
            }
            var movil = MOVILES[i].movil_nombre;
            
            if(conductor.length === 1)
            {
                conductor = "No Definido";
            }
            $("#movilLlamada").append("<option value='"+movil+"'"+sel+">"+movil+" / "+conductor+"</option>");
        }
        $("#conductorLlamada").val(conductorReal.length===1?"No Definido":conductorReal);
        $("#inicioLlamada").val(llamada.llamada_hora);
        $("#fechaLlamada").val(llamada.llamada_fecha);
        $("#tarifaLlamada").val(llamada.llamada_tarifa1);
        $("#tarifa2Llamada").val(llamada.llamada_tarifa2); 
        if(llamada.llamada_observacion_adicional !== '')
        {
            $("#cont_obs").html("<textarea readonly style=\"width:99%;height:400px;font-family:Arial, Helvetica, sans-serif;\">"+llamada.llamada_observacion_adicional+"</textarea>");
        }   
        else
        {
            $("#cont_obs").html("<div class=\"mensaje_bienvenida\" >No hay observaciones adicionales</div>");
        }
        $("#clienteLlamada").on('input',function () {
            cargarRutas();
        });
        $("#volver").click(function(){
            buscarLlamada();
        });
        $("#movilLlamada").change(function () {
            if($(this).val() !== "")
            {
                var conductor = $(this).children("option").filter(":selected").text().split(" / ")[1];
                $("#conductorLlamada").val(conductor);
            }
            else
            {
                $("#conductorLlamada").val("");
            }
        });
        $("#guardar").click(function(){
            modificarLlamada();
        });
        
        $("#eliminar").click(function (){
            confirmar("Eliminar llamada","Esta seguro que desea eliminar el llamada "+ID_LLAMADA,
            function(){
                    eliminarLlamada();
                },null);
        });
    });
}

function iniciarPestanias()
{
    $("#p_general").click(function(){
        cambiarPestaniaGeneral();
    });
    $("#p_pasajero").click(function(){
        cambiarPestaniaPasajero();
        obtenerPasajeros();
    });
    $("#p_obs").click(function(){
        cambiarPestaniaObservacion();
    });
}

function cambiarPestaniaGeneral()
{
    cambiarPropiedad($("#cont_general"),"display","block");
    cambiarPropiedad($("#cont_pasajero"),"display","none");
    cambiarPropiedad($("#cont_ruta"),"display","none");
    cambiarPropiedad($("#cont_obs"),"display","none");
    quitarclase($("#p_general"),"dispose");
    agregarclase($("#p_pasajero"),"dispose");
    agregarclase($("#p_ruta"),"dispose");
    agregarclase($("#p_obs"),"dispose");
    quitarclase($("#guardar"),"oculto");
}

function cambiarPestaniaPasajero()
{
    cambiarPropiedad($("#cont_general"),"display","none");
    cambiarPropiedad($("#cont_pasajero"),"display","block");
    cambiarPropiedad($("#cont_ruta"),"display","none");
    cambiarPropiedad($("#cont_obs"),"display","none");
    quitarclase($("#p_pasajero"),"dispose");
    agregarclase($("#p_general"),"dispose");
    agregarclase($("#p_ruta"),"dispose");
    agregarclase($("#p_obs"),"dispose");
    agregarclase($("#guardar"),"oculto");
}
function cambiarPestaniaRuta()
{
    cambiarPropiedad($("#cont_general"),"display","none");
    cambiarPropiedad($("#cont_pasajero"),"display","none");
    cambiarPropiedad($("#cont_ruta"),"display","block");
    cambiarPropiedad($("#cont_obs"),"display","none");
    quitarclase($("#p_ruta"),"dispose");
    agregarclase($("#p_general"),"dispose");
    agregarclase($("#p_pasajero"),"dispose");
    agregarclase($("#p_obs"),"dispose");
    agregarclase($("#guardar"),"oculto");
}
function cambiarPestaniaObservacion()
{
    cambiarPropiedad($("#cont_general"),"display","none");
    cambiarPropiedad($("#cont_pasajero"),"display","none");
    cambiarPropiedad($("#cont_ruta"),"display","none");
    cambiarPropiedad($("#cont_obs"),"display","block");
    quitarclase($("#p_obs"),"dispose");
    agregarclase($("#p_general"),"dispose");
    agregarclase($("#p_pasajero"),"dispose");
    agregarclase($("#p_ruta"),"dispose");
    agregarclase($("#guardar"),"oculto");
}
function obtenerTipoLlamada(tipo)
{
    if(llamada === CREADO)
    {
        return "Creado"; 
    }
    else if(llamada === EN_PROCCESO_DE_ASIGNACION)
    {
        return "En proceso de asignaci&oacute;n";            
    }
    else if(llamada === ASIGNADO)
    {
        return "Asignado";     
    }
    else if(llamada === ACEPTADO)
    {
        return "Aceptado";            
    }
    else if(llamada === EN_PROGRESO)
    {
        return "En Ruta";
    }
    else if(llamada === FINALIZADO)
    {
        return "Finalizado"; 
    }
    else if(llamada === CANCELADO)
    {
        return "Cancelado"; 
    }
}

function activarPestania(array)
{
    for(var i = 0 ; i < CAMPOS.length ; i++)
    {
        if(array[i] === '')
        {
            marcarCampoError($("#"+CAMPOS[i]));
        }
        else
        {
            marcarCampoOk($("#"+CAMPOS[i]));
        }
    }
}

function validarTipoDato()
{
    for(var i = 0 ; i < CAMPOS.length ; i++)
    {
        marcarCampoOk($("#"+CAMPOS[i]));
    }
    var tarifa1 = $("#tarifaLlamada");
    var tarifa2 = $("#tarifa2Llamada");
    if(!validarNumero(tarifa1.val()))
    {
        cambiarPestaniaGeneral();
        marcarCampoError(tarifa1);
        alertify.error('Tarifa 1 debe ser numerico');
        return false;
    }
    if(!validarNumero(tarifa2.val()))
    {
        cambiarPestaniaGeneral();
        marcarCampoError(tarifa2);
        alertify.error('Tarifa 2 debe ser numerico');
        return false;
    }
    
   return true;
}