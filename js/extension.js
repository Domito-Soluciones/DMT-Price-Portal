/* global urlBase, alertify, NOMBRE_CLIENTE, ID_CLIENTE */
var ID_EXTENSION;
var EXTENSIONES;
var AGREGAR = true;
var PAGINA = 'EXTENSIONES';
var CAMPOS = ["tipo","horario","descripcion","numero","hora","nombre","valor1","valor2"];
var USUARIOS;
$(document).ready(function(){
    PAGINA_ANTERIOR = PAGINA;
    buscarUsuarios();
    buscarExtensionesAll();
    $("#agregar").click(function(){
        AGREGAR = true;
        $("#lista_busqueda_extension_detalle").load("html/datos_extension.html", function( response, status, xhr ) {
            quitarclase($("#guardar"),"oculto");
            cambiarPropiedad($("#agregar"),"visibility","hidden");
            cambiarPropiedad($("#eliminar"),"visibility","hidden");
            cambioEjecutado();
            
            $("#horario").change(function(){
                generarNombre('horario');
            });

            $("#nombre").blur(function (){
                if(validarExistencia('nombre',$(this).val()))
                {
                    alertify.error("El nombre "+$(this).val()+" ya existe");
                    $("#nombre").val("");
                    return;
                }
            });
            
            $("#volver").click(function(){
                buscarExtensions(NOMBRE_CLIENTE,ID_CLIENTE);
                if(typeof ID_CLIENTE === "undefined")
                {
                    cambiarPropiedad($("#agregar"),"visibility","hidden");
                }   
                else
                {
                    cambiarPropiedad($("#agregar"),"visibility","visible");
                }
                cambiarPropiedad($("#guardar"),"visibility","hidden");
                cambiarPropiedad($("#eliminar"),"visibility","hidden");

            });
            
        });
        cambiarPropiedad($("#guardar"),"visibility","visible");
        cambiarPropiedad($("#cancelar"),"visibility","visible");
    });

    $("#busqueda").keyup(function(){
        buscarUsuarios($(this).val());
    });
                
    $("#guardar").click(function (){
        if(AGREGAR)
        {
            agregarExtension();
        }
        else
        {
            modificarExtension();
        }
    });
});

function buscarUsuarios()
{
var busqueda = $("#busqueda").val();
    var params = {busqueda : busqueda};
    var url = urlBase + "/usuario/GetUsuarios.php";
    var success = function(response)
    {
        cerrarSession(response);
        var usuarios = $("#lista_busqueda_extension");
        usuarios.html("");
        USUARIOS = response;
        if(response.length === 0)
        {
            alertify.error("No hay registros que mostrar");
            return;
        }
        usuarios.append("<div class=\"fila_contenedor fila_contenedor_activa\" id=\"col_todo\" onClick=\"cambiarFilaPasajero('todo','')\">Todos</div>");
        for(var i = 0 ; i < response.length; i++)
        {
            var id = response[i].usuario_id;
            var nombre = response[i].usuario_razon;
            var titulo = recortar(nombre);
            usuarios.append("<div class=\"fila_contenedor fila_contenedor\" id=\"col_"+id+"\" onClick=\"cambiarFilaPasajero('"+id+"','"+nombre+"')\">"+titulo+"</div>");
        }
    };
    postRequest(url,params,success);
}

function buscarExtensionesAll()
{
    $("#lista_busqueda_extension_detalle").html("");
    cambiarPropiedad($(".mensaje_bienvenida"),"display","none");
    var busqueda = $("#busqueda").val();
    var params = {busqueda : busqueda};
    var url = urlBase + "/extension/GetExtensiones.php";
    var success = function(response)
    {
        cerrarSession(response);
        var extensiones = $("#lista_busqueda_extension_detalle");
        extensiones.html("");
        EXTENSIONES = response;
        extensiones.append("<div class=\"contenedor_central_titulo_tarifa\"><div>Nombre</div><div>Hora</div><div>Descripción</div><div>Empresa</div><div></div></div>");
        if(response.length === 0)
        {
            EXTENSIONES.append("<div class=\"mensaje_bienvenida\">No hay registros que mostrar</div>");
        }
        for(var i = 0 ; i < response.length; i++)
        {
            var id = response[i].tarifa_id;
            var extension = response[i].extension_;
            var descripcion = response[i].tarifa_hora;
            var empresa = response[i].tarifa_cliente;
            EXTENSIONES.append("<div class=\"fila_contenedor fila_contenedor_tarifa_detalle\" id=\""+id+"\" \">"+
                    "<div onClick=\"abrirBuscador('"+id+"')\">"+nombre+"</div>"+
                    "<div onClick=\"abrirBuscador('"+id+"')\">"+hora+"</div>"+
                    "<div onClick=\"abrirBuscador('"+id+"')\">"+descripcion+"</div>"+
                    "<div onClick=\"abrirBuscador('"+id+"')\">"+empresa+"</div>"+
                    "<div><img onclick=\"preEliminarTarifa('"+descripcion+"','"+nombre+"')\" src=\"img/eliminar-negro.svg\" width=\"12\" height=\"12\"></div>"+
                    "</div>");
        }
    };
    postRequest(url,params,success);
    
}
