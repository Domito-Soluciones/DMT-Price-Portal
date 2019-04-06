/* global urlBase, alertify, CREADO, EN_PROCCESO_DE_ASIGNACION, ASIGNADO, ACEPTADO, EN_PROGRESO, FINALIZADO, google, map, markers, directionsDisplay, TIPO_USUARIO */
var ESTADO_SERVICIO;
var PAGINA = 'REPORTES';
$(document).ready(function(){
    PAGINA_ANTERIOR = PAGINA;
    iniciarFecha([$("#desde"),$("#hasta")]);
    iniciarHora([$("#hdesde"),$("#hhasta")]);
    cargarClientes();
    cargarConductores();
    $("#exportar").click(function(){
        exportarReporte(); 
    });
    
    $("#buscar").click(function(){
        buscarReporte(); 
    });
});

function buscarReporte()
{
    var empresa = $("#empresa").val();
    var conductor = $("#conductores").val();
    var desde = $("#desde").val();
    var hdesde = $("#hdesde").val();
    var hasta = $("#hasta").val();
    var hhasta = $("#hhasta").val();
    var params = {empresa : empresa, conductor : conductor,
        desde : desde, hdesde : hdesde, hasta : hasta, hhasta : hhasta};
    var url = urlBase + "/reporte/GetReporte.php";
    var success = function(response)
    {
        cerrarSession(response);
        var reporte = $("#contenedor_central");
        reporte.html("");
        reporte.append("<div class=\"contenedor_central_titulo\"><div class=\"item_reporte\">Item</div><div class=\"total_reporte\">Total</div></div>")
            var asignar = response.servicio_asignar;
            var realizar = response.servicio_realizar;
            var ruta = response.servicio_ruta;
            var finalizado = response.servicio_finalizado;
            reporte.append("<div class=\"fila_contenedor fila_contenedor_servicio\"><div class=\"item_reporte\">Servicio Pendiente Asignaciòn</div><div class=\"total_reporte\">"+asignar+"</div></div>");
            reporte.append("<div class=\"fila_contenedor fila_contenedor_servicio\"><div class=\"item_reporte\">Servicio Aceptado</div><div class=\"total_reporte\">"+realizar+"</div></div>");
            reporte.append("<div class=\"fila_contenedor fila_contenedor_servicio\"><div class=\"item_reporte\">Servicio en Ruta</div><div class=\"total_reporte\">"+ruta+"</div></div>");
            reporte.append("<div class=\"fila_contenedor fila_contenedor_servicio\"><div class=\"item_reporte\">Servicio Finalizado</div><div class=\"total_reporte\">"+finalizado+"</div></div>");
        cambiarPropiedad($("#loader"),"visibility","hidden");
    };
    postRequest(url,params,success);
}

function cargarClientes()
{
    var params = {busqueda : '',buscaCC : '0'};
    var url = urlBase + "/cliente/GetClientes.php";
    var success = function(response)
    {
        $("#empresa").html("<option value=\"\">Seleccione</option>");
        for(var i = 0 ; i < response.length ; i++)
        {
            var nombre = response[i].cliente_razon;
            $("#empresa").append("<option value=\""+nombre+"\">"+nombre+"</option>");
        }
    };
    postRequest(url,params,success,false);
}
function cargarConductores()
{
    var params = {busqueda : ''};
    var url = urlBase + "/conductor/GetConductores.php";
    var success = function(response)
    {
        $("#conductores").html("<option value=\"\">Seleccione</option>");
        for(var i = 0 ; i < response.length ; i++)
        {
            var id = response[i].conductor_id;
            var nombre = id + " / " + response[i].conductor_nombre + " " + response[i].conductor_papellido;
            $("#conductores").append("<option value=\""+id+"\">"+nombre+"</option>");
        }
    };
    postRequest(url,params,success,false);
}


