/* global urlBase, alertify, NOMBRE_CLIENTE, ID_CLIENTE */
var ID_USUARIO;
var USUARIOS;
var CATEGORIA = 0;
var AGREGAR = true;
var PAGINA = 'USUARIOS';
var CAMPOS = ["nombre","descripcion","categoria"];
$(document).ready(function(){
    PAGINA_ANTERIOR = PAGINA;
    buscarUsuarios(true);
    $("#agregar").click(function(){
        AGREGAR = true;
        $("#lista_busqueda_usuario_detalle").load("html/datos_usuario.html", function( response, status, xhr ) {
            cambioEjecutado();
            $("#volver").click(function(){
                buscarUsuarios(true);
                resetBotones();
            });
        });
        activarBotones('agregar');
    });

    $("#busqueda").keyup(function(){
        buscarUsuarios();
    });
                
    $("#guardar").click(function (){
        if(AGREGAR){
            agregarUsuario();
        }
        else{
            modificarUsuario();
        }
    });
    
    $("#eliminar").click(function(){
        confirmar("Eliminar extensión","Esta seguro que desea eliminar al usuario "+$("#nombre").val(),
        function(){
            eliminarUsuario();
            },null);
    });
});

function buscarUsuarios(cargar = false)
{
    var categorias = $("#lista_busqueda_usuario");
    categorias.html("");
    categorias.append("<div class=\"fila_contenedor fila_contenedor\" id=\"col_0\" onClick=\"cambiarFilaCategoria(0)\">Todo</div>");
    categorias.append("<div class=\"fila_contenedor fila_contenedor\" id=\"col_1\" onClick=\"cambiarFilaCategoria(1)\">Gerencia</div>");
    categorias.append("<div class=\"fila_contenedor fila_contenedor\" id=\"col_2\" onClick=\"cambiarFilaCategoria(2)\">Administrativo</div>");
    categorias.append("<div class=\"fila_contenedor fila_contenedor\" id=\"col_3\" onClick=\"cambiarFilaCategoria(3)\">Operacional</div>");
    marcarFilaActiva("col_"+CATEGORIA);
    $("#lista_busqueda_usuario_detalle").html("");
    var busqueda = $("#busqueda").val();
    var categoria = CATEGORIA;
    var params = {busqueda : busqueda, categoria : categoria};
    var url = urlBase + "/usuario/GetUsuarios.php";
    var success = function(response)
    {
        cerrarSession(response);
        var usuarios = $("#lista_busqueda_usuario_detalle");
        usuarios.html("");
        USUARIOS = response;
        usuarios.append("<div class=\"contenedor_central_titulo_usuario\"><div>ID</div><div>Usuario</div><div>Descripción</div><div>Extensión</div><div>Centro Costo</div><div></div></div>");
        if(response.length === 0)
        {
            alertify.error("No hay registros que mostrar");
            return;
        }
        for(var i = 0 ; i < response.length; i++)
        {
            var usuario = response[i];
            var id = usuario.usuario_id;
            var nombre = usuario.usuario_nombre;
            var descripcion = usuario.usuario_descripcion;
            var extension = usuario.usuario_extension === '' ? 'No Asignada' : usuario.usuario_extension;
            var centroCosto = usuario.usuario_centro_costo === '' ? 'No Asignado' : usuario.usuario_centro_costo;
            usuarios.append("<div class=\"fila_contenedor fila_contenedor_usuario_detalle\" id=\""+id+"\" \">"+
                    "<div onClick=\"abrirModificar("+id+",'"+nombre+"')\">"+id+"</div>"+
                    "<div onClick=\"abrirModificar("+id+",'"+nombre+"')\">"+nombre+"</div>"+
                    "<div onClick=\"abrirModificar("+id+",'"+nombre+"')\">"+descripcion+"</div>"+
                    "<div onClick=\"abrirModificar("+id+",'"+nombre+"')\">"+extension+"</div>"+                    
                    "<div onClick=\"abrirModificar("+id+",'"+nombre+"')\">"+centroCosto+"</div>"+                    
                    "<div><img onclick=\"preEliminarUsuario("+id+",'"+nombre+"')\" src=\"img/eliminar-negro.svg\" width=\"12\" height=\"12\"></div>"+
                    "</div>");
        }
    };
    postRequest(url,params,success,cargar);
    
}

function cambiarFilaCategoria(id){
    resetBotones();
    CATEGORIA = id;
    if(MODIFICADO){
        confirmar("Cambio de extensión",
        "¿Desea cambiar de extensión sin guardar los cambios?",
        function(){
            MODIFICADO = false;
            buscarUsuarios(true);
        },
        function(){
            MODIFICADO = true;
        });
    }
    else{
        buscarUsuarios(true);
    }
}

function abrirModificar(id,nombre)
{
    ID_USUARIO = id;
    AGREGAR = false;
    $("#lista_busqueda_usuario_detalle").load("html/datos_usuario.html", function( response, status, xhr ) {
        $("#titulo_pagina_usuario").text(id + " ("+nombre+")");
        cambioEjecutado();
        $("#volver").click(function(){
            buscarUsuarios(true);
            resetBotones();
        });
       
        var usuario;
        for(var i = 0 ; i < USUARIOS.length; i++)
        {
            if(USUARIOS[i].usuario_id === id)
            {
                usuario = USUARIOS[i];
            }
        }
        $("#nombre").val(usuario.usuario_nombre);
        $("#descripcion").val(usuario.usuario_descripcion);
        $("#categoria").val(usuario.usuario_categoria);
        activarBotones();
    });
}

function agregarUsuario()
{
    var nombre = $("#nombre").val();
    var descripcion = $("#descripcion").val();
    var categoria = $("#categoria").val();
    var array = [nombre,descripcion];
    if(!validarCamposOr(array)){
        activarPestania(array);
        alertify.error("Ingrese todos los campos necesarios");
        return;
    }
    var params = {nombre : nombre, descripcion : descripcion, categoria : categoria};
    var url = urlBase + "/usuario/AddUsuario.php";
    var success = function(response){
        cerrarSession(response);
        ID_USUARIO = undefined;
        alertify.success("Usuario Agregado");
        vaciarFormulario();
        resetFormulario();
    };
    postRequest(url,params,success);
}

function modificarUsuario()
{
    var id = ID_USUARIO;
    var nombre = $("#nombre").val();
    var descripcion = $("#descripcion").val();
    var categoria = $("#categoria").val();
    var array = [nombre,descripcion];
    if(!validarCamposOr(array)){
        activarPestania(array);
        alertify.error("Ingrese todos los campos necesarios");
        return;
    }
    var params = {id : id, nombre : nombre, descripcion : descripcion, categoria : categoria};
    var url = urlBase + "/usuario/ModUsuario.php";
    var success = function(response){
        cerrarSession(response);
        ID_USUARIO = undefined;
        alertify.success("Usuario Modificado");
        resetFormulario();
    };
    postRequest(url,params,success);
}

function activarPestania(array){
    for(var i = 0 ; i < CAMPOS.length ; i++){
        if(array[i] === ''){
            marcarCampoError($("#"+CAMPOS[i]));
        }
        else{
            marcarCampoOk($("#"+CAMPOS[i]));
        }
    }
   
}

function eliminarUsuario(){
    var id = ID_USUARIO;
    var params = {id : id};
    var url = urlBase + "/usuario/DelUsuario.php";
    var success = function(response){
        cerrarSession(response);
        alertify.success("Usuario eliminado");
        resetBotones();
        buscarUsuarios();
    };
    postRequest(url,params,success);
}

function preEliminarUsuario(id,nombre){
    confirmar("Eliminar extensióm","Esta seguro que desea eliminar la extensión "+nombre,
            function(){
                var params = {id : id};
                var url = urlBase + "/usuario/DelUsuario.php";
                var success = function(response){
                    cerrarSession(response);
                    alertify.success("Usuario eliminado");
                    resetBotones();
                    buscarUsuarios();
                };
                postRequest(url,params,success);
            });
}