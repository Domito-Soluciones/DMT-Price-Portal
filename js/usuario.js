/* global urlBase, alertify, NICK_GLOBAL, KEY */
var ID_USUARIO;
var USUARIOS;
var AGREGAR = true;
var PAGINA = 'USUARIOS';
var CAMPOS = ["nick","password","password2","perfil"];
$(document).ready(function(){
   PAGINA_ANTERIOR = PAGINA;
    buscarUsuario();
    $("#agregar").click(function(){
        quitarclase($(".fila_contenedor"),"fila_contenedor_activa");
        cambiarPropiedad($("#agregar"),"visibility","hidden");
        AGREGAR = true;
        $("#contenedor_central").load("html/datos_usuario.html", function( response, status, xhr ) {
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
            agregarUsuario();
        }
        else
        {
            modificarUsuario();
        }
    });
    
    $("#busqueda").keyup(function(){
        buscarUsuario($(this).val());
    });
    
    $("#eliminar").click(function (){
            confirmar("Eliminar usuario",
            "Esta seguro que desea eliminar al usuario "+$("#nick").val(),
            function(){
                eliminarUsuario();
            },null);
    });
    
});

function agregarUsuario()
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
    var url = urlBase + "/usuario/AddUsuario.php";
    var success = function(response)
    {
        ID_USUARIO = undefined;
        cerrarSession(response);
        alertify.success("Usuario Agregado");
        vaciarFormulario();
        resetFormulario();
        buscarUsuario();
    };
    postRequest(url,params,success);
}

function modificarUsuario()
{
    var id = ID_USUARIO;
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
    var url = urlBase + "/usuario/ModUsuario.php";
    var success = function(response)
    {
        cerrarSession(response);
        alertify.success("Usuario Modificado");
        resetFormulario();
        buscarUsuario();
    };
    postRequest(url,params,success);
}

function buscarUsuario()
{
    var busqueda = $("#busqueda").val();
    var params = {busqueda : busqueda};
    var url = urlBase + "/usuario/GetUsuarios.php";
    var success = function(response)
    {
        cerrarSession(response);
        var usuarios = $("#lista_busqueda_usuario");
        usuarios.html("");
        USUARIOS = response;
        if(response.length === 0)
        {
            alertify.error("No hay registros que mostrar");
            return;
        }
        for(var i = 0 ; i < response.length; i++)
        {
            var id = response[i].usuario_id;
            var nick = response[i].usuario_nick;
            var perfil = response[i].usuario_perfil;
            var titulo = recortar(nick+" / "+ perfil);
            if (typeof ID_USUARIO !== "undefined" && ID_USUARIO === id)
            {
                usuarios.append("<div class=\"fila_contenedor fila_contenedor_activa\" id=\""+id+"\" onClick=\"cambiarFila('"+id+"')\">"+titulo+"</div>");
            }
            else
            {
                usuarios.append("<div class=\"fila_contenedor\" id=\""+id+"\" onClick=\"cambiarFila('"+id+"')\">"+titulo+"</div>");
            }
        }
    };
    postRequest(url,params,success);
}

function cambiarFila(id)
{
    if(MODIFICADO)
    {
        confirmar("Cambio de usuario",
        "¿Desea cambiar de usuario sin guardar los cambios?",
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
    ID_USUARIO = id;
    marcarFilaActiva(id);
    $("#contenedor_central").load("html/datos_usuario.html", function( response, status, xhr ) {
        cambioEjecutado();
        $("#nick").blur(function (){
            if(validarExistencia('nick',$(this).val()))
            {
                alertify.error("El nick "+$(this).val()+" no se encuentra disponible");
                $("#nick").val("");
                return;
            }
        });
        var usuario;
        for(var i = 0 ; i < USUARIOS.length; i++)
        {
            if(USUARIOS[i].usuario_id === id)
            {
                usuario = USUARIOS[i];
                break;
            }
        }
        
        $("#nick").prop("readonly",true);
        $("#nick").val(usuario.usuario_nick);
        $("#perfil").val(usuario.usuario_perfil);
        cambiarPropiedad($("#agregar"),"visibility","visible");
        cambiarPropiedad($("#guardar"),"visibility","visible");
        cambiarPropiedad($("#cancelar"),"visibility","visible");
        if(usuario.usuario_nick !== NICK_GLOBAL)
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

function eliminarUsuario()
{
    var params = { id : ID_USUARIO };
    var url = urlBase + "/usuario/DelUsuario.php";
    var success = function(response)
    {
        alertify.success("Usuario eliminado");
        cerrarSession(response);
        resetFormularioEliminar(PAGINA);
        resetBotones();
        buscarUsuario();
    };
    postRequest(url,params,success);
}

function validarExistencia(tipo,valor)
{
    for(var i = 0 ; i < USUARIOS.length ; i++)
    {
        if(tipo === 'nick')
        {
            if(valor === USUARIOS[i].usuario_nick)
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

