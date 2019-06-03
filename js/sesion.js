/* global urlBase, alertify, NICK_GLOBAL, KEY */
var ID_SESION;
var SESIONES;
var AGREGAR = true;
var PAGINA = 'SESIONES';
var CAMPOS = ["nick","password","password2","perfil"];
$(document).ready(function(){
   PAGINA_ANTERIOR = PAGINA;
    buscarSesion();
    $("#agregar").click(function(){
        quitarclase($(".fila_contenedor"),"fila_contenedor_activa");
        cambiarPropiedad($("#agregar"),"visibility","hidden");
        AGREGAR = true;
        $("#contenedor_central").load("html/datos_sesion.html", function( response, status, xhr ) {
            cambioEjecutado();

            $("#nick").blur(function (){
                if(validarExistencia('nick',$(this).val()))
                {
                    alertify.error("El nick "+$(this).val()+" no se encuentra disponible");
                    $("#nick").val("");
                    return;
                }
            });
            
            $("#perfil").change(function(){
                
            });
        });
        cambiarPropiedad($("#guardar"),"visibility","visible");
        cambiarPropiedad($("#elimianr"),"visibility","hidden");
    });
    $("#cancelar").click(function(){
        validarCancelar(PAGINA);
    });
    $("#guardar").click(function(){
        if(AGREGAR)
        {
            agregarSesion();
        }
        else
        {
            modificarSesion();
        }
    });
    
    $("#busqueda").keyup(function(){
        buscarSesion($(this).val());
    });
    
    $("#eliminar").click(function (){
            confirmar("Eliminar sesion",
            "Esta seguro que desea eliminar al sesion "+$("#nick").val(),
            function(){
                eliminarSesion();
            },null);
    });
    
});

function agregarSesion()
{
    var nick = $("#nick").val();
    var password = $("#password").val();
    var password2 = $("#password2").val();
    var perfil = $("#perfil").val();
    var array = [nick,password,password2,perfil];
    if(!validarCamposOr(array))
    {
        activarPestania(array);
        alertify.error("Ingrese todos los campos necesarios");
        return;
    }
    if(password !== password2)
    {
        marcarCampoError($("#password"));
        marcarCampoError($("#password2"));
        alertify.error("La password no coincide");
        return;
    }
    var params = {nick: nick, password : btoa(password),perfil : perfil};
    var url = urlBase + "/sesion/AddSesion.php";
    var success = function(response)
    {
        ID_SESION = undefined;
        cerrarSession(response);
        alertify.success("Sesión Agregada");
        vaciarFormulario();
        resetFormulario();
        buscarSesion();
    };
    postRequest(url,params,success);
}

function modificarSesion()
{
    var id = ID_SESION;
    var nick = $("#nick").val();
    var password = $("#password").val();
    var password2 = $("#password2").val();
    var perfil = $("#perfil").val();
    var array;
    var params = {id : id,nick: nick,perfil : perfil};
    if(password !== '' || password2 !== '')
    {
        if(password !== password2)
        {
            marcarCampoError($("#password"));
            marcarCampoError($("#password2"));
            alertify.error("La password no coincide");
            return;
        }
        array = [nick,password,password2,perfil];
        params.password = btoa(password);
    }
    else
    {
        array = [nick,perfil];   
    }
    if(!validarCamposOr(array))
    {
        activarPestania(array);
        alertify.error("Ingrese todos los campos necesarios");
        return;
    }
    var url = urlBase + "/sesion/ModSesion.php";
    var success = function(response)
    {
        cerrarSession(response);
        alertify.success("Sesión Modificada");
        resetFormulario();
        buscarSesion();
    };
    postRequest(url,params,success);
}

function buscarSesion()
{
    var busqueda = $("#busqueda").val();
    var params = {busqueda : busqueda};
    var url = urlBase + "/sesion/GetSesions.php";
    var success = function(response)
    {
        cerrarSession(response);
        var sesions = $("#lista_busqueda_sesion");
        sesions.html("");
        SESIONES = response;
        if(response.length === 0)
        {
            alertify.error("No hay registros que mostrar");
            return;
        }
        for(var i = 0 ; i < response.length; i++)
        {
            var id = response[i].sesion_id;
            var nick = response[i].sesion_nick;
            var perfil = response[i].sesion_perfil;
            var titulo = recortar(nick+" / "+ perfil);
            if (typeof ID_SESION !== "undefined" && ID_SESION === id)
            {
                sesions.append("<div class=\"fila_contenedor fila_contenedor_activa\" id=\""+id+"\" onClick=\"cambiarFila('"+id+"')\">"+titulo+"</div>");
            }
            else
            {
                sesions.append("<div class=\"fila_contenedor\" id=\""+id+"\" onClick=\"cambiarFila('"+id+"')\">"+titulo+"</div>");
            }
        }
    };
    postRequest(url,params,success);
}

function cambiarFila(id)
{
    if(MODIFICADO)
    {
        confirmar("Cambio de sesion",
        "¿Desea cambiar de sesion sin guardar los cambios?",
        function()
        {
            MODIFICADO = false;
            abrirModificar(id);
        },
        function()
        {
            MODIFICADO = true;
        });
    }
    else
    {
        abrirModificar(id);
    }
}

function abrirModificar(id)
{
    AGREGAR = false;
    ID_SESION = id;
    marcarFilaActiva(id);
    $("#contenedor_central").load("html/datos_sesion.html", function( response, status, xhr ) {
        cambioEjecutado();
        $("#nick").blur(function (){
            if(validarExistencia('nick',$(this).val()))
            {
                alertify.error("El nick "+$(this).val()+" no se encuentra disponible");
                $("#nick").val("");
                return;
            }
        });
        var sesion;
        for(var i = 0 ; i < SESIONES.length; i++)
        {
            if(SESIONES[i].sesion_id === id)
            {
                sesion = SESIONES[i];
                break;
            }
        }
        
        $("#nick").prop("readonly",true);
        $("#nick").val(sesion.sesion_nick);
        $("#perfil").val(sesion.sesion_perfil);
        cambiarPropiedad($("#agregar"),"visibility","visible");
        cambiarPropiedad($("#guardar"),"visibility","visible");
        cambiarPropiedad($("#cancelar"),"visibility","visible");
        if(sesion.sesion_nick !== NICK_GLOBAL)
        {
            cambiarPropiedad($("#eliminar"),"visibility","visible");
        }
        else
        {
            cambiarPropiedad($("#eliminar"),"visibility","hidden");
        }
        $("#perfil").change(function(){
           
        });
    });
}

function eliminarSesion()
{
    var params = { id : ID_SESION };
    var url = urlBase + "/sesion/DelSesion.php";
    var success = function(response)
    {
        alertify.success("Sesion eliminado");
        cerrarSession(response);
        resetFormularioEliminar(PAGINA);
        resetBotones();
        buscarSesion();
    };
    postRequest(url,params,success);
}

function validarExistencia(tipo,valor)
{
    for(var i = 0 ; i < SESIONES.length ; i++)
    {
        if(tipo === 'nick')
        {
            if(valor === SESIONES[i].sesion_nick)
            {
                alertify.error("El nick "+valor+" no se encuentra disponible");
                $("#nick").val("");
                $("#nick").focus();
                return ;
            }
        }
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



function cargarClientes()
{
    var busqueda = $("#clientes").val();
    var params = {busqueda : busqueda,buscaCC : '0'};
    var url = urlBase + "/cliente/GetClientes.php";
    var success = function(response)
    {
        $("#lcliente").html("");
        for(var i = 0 ; i < response.length ; i++)
        {
            var nombre = response[i].cliente_razon;
            $("#lcliente").append("<option value=\""+nombre+"\">"+nombre+"</option>");
            CLIENTES = response;
            clientesArray.push(nombre);
        }
    };
    postRequest(url,params,success);
}

