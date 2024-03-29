/* global urlBase, alertify, NOMBRE_CLIENTE, ID_CLIENTE */
var ID_EXTENSION;
var EXTENSIONES;
var CATEGORIA = 0;
var AGREGAR = true;
var PAGINA = 'EXTENSIONES';
var CAMPOS = ["numero","descripcion","categoria"];
$(document).ready(function(){
    PAGINA_ANTERIOR = PAGINA;
    buscarExtensiones(true);
    $("#agregar").click(function(){
        AGREGAR = true;
        $("#lista_busqueda_extension_detalle").load("html/datos_extension.html", function( response, status, xhr ) {
            cambioEjecutado();
            $("#volver").click(function(){
                buscarExtensiones(true);
                resetBotones();
            });
        });
        activarBotones('agregar');
    });

    $("#busqueda").keyup(function(){
        buscarExtensiones();
    });
                
    $("#guardar").click(function (){
        if(AGREGAR){
            agregarExtension();
        }
        else{
            modificarExtension();
        }
    });
    
    $("#eliminar").click(function(){
        confirmar("Eliminar extensión","Esta seguro que desea eliminar la extensión "+$("#numero").val(),
        function(){
            eliminarExtension();
            },null);
    });
});

function buscarExtensiones(cargar = false)
{
    var categorias = $("#lista_busqueda_extension");
    categorias.html("");
    categorias.append("<div class=\"fila_contenedor fila_contenedor\" id=\"col_0\" onClick=\"cambiarFilaCategoria(0)\">Todo</div>");
    categorias.append("<div class=\"fila_contenedor fila_contenedor\" id=\"col_1\" onClick=\"cambiarFilaCategoria(1)\">Gerencia</div>");
    categorias.append("<div class=\"fila_contenedor fila_contenedor\" id=\"col_2\" onClick=\"cambiarFilaCategoria(2)\">Administrativo</div>");
    categorias.append("<div class=\"fila_contenedor fila_contenedor\" id=\"col_3\" onClick=\"cambiarFilaCategoria(3)\">Operacional</div>");
    marcarFilaActiva("col_"+CATEGORIA);
    $("#lista_busqueda_extension_detalle").html("");
    var busqueda = $("#busqueda").val();
    var categoria = CATEGORIA;
    var params = {busqueda : busqueda, categoria : categoria};
    var url = urlBase + "/extension/GetExtensiones.php";
    var success = function(response)
    {
        cerrarSession(response);
        var extensiones = $("#lista_busqueda_extension_detalle");
        extensiones.html("");
        EXTENSIONES = response;
        extensiones.append("<div class=\"contenedor_central_titulo_extension\"><div>ID</div><div>Extensión</div><div>Descripción</div><div>Usuario</div><div></div></div>");
        if(response.length === 0)
        {
            alertify.error("No hay registros que mostrar");
            return;
        }
        for(var i = 0 ; i < response.length; i++)
        {
            var extension = response[i];
            var id = extension.extension_id;
            var numero = extension.extension_numero;
            var descripcion = extension.extension_descripcion;
            var usuario = extension.extension_usuario === '' ? 'No Asignado' : extension.extension_usuario;
            extensiones.append("<div class=\"fila_contenedor fila_contenedor_extension_detalle\" id=\""+id+"\" \">"+
                    "<div onClick=\"abrirModificar("+id+",'"+numero+"')\">"+id+"</div>"+
                    "<div onClick=\"abrirModificar("+id+",'"+numero+"')\">"+numero+"</div>"+
                    "<div onClick=\"abrirModificar("+id+",'"+numero+"')\">"+descripcion+"</div>"+
                    "<div onClick=\"abrirModificar("+id+",'"+numero+"')\">"+usuario+"</div>"+                    
                    "<div><img onclick=\"preEliminarExtension("+id+",'"+numero+"')\" src=\"img/eliminar-negro.svg\" width=\"12\" height=\"12\"></div>"+
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
            buscarExtensiones(true);
        },
        function(){
            MODIFICADO = true;
        });
    }
    else{
        buscarExtensiones(true);
    }
}

function abrirModificar(id,nombre)
{
    ID_EXTENSION = id;
    AGREGAR = false;
    $("#lista_busqueda_extension_detalle").load("html/datos_extension.html", function( response, status, xhr ) {
        $("#titulo_pagina_extension").text(id + " ("+nombre+")");
        cambioEjecutado();
        $("#volver").click(function(){
            buscarExtensiones(true);
            resetBotones();
        });
       
        var extension;
        for(var i = 0 ; i < EXTENSIONES.length; i++)
        {
            if(EXTENSIONES[i].extension_id === id)
            {
                extension = EXTENSIONES[i];
            }
        }
        $("#numero").val(extension.extension_numero);
        $("#numero").prop("readonly",true);
        $("#descripcion").val(extension.extension_descripcion);
        $("#categoria").val(extension.extension_categoria);
        activarBotones();
    });
}

function agregarExtension()
{
    var numero = $("#numero").val();
    var descripcion = $("#descripcion").val();
    var categoria = $("#categoria").val();
    var array = [numero,descripcion];
    if(validarExistencia('numero',numero)){
        return;
    }
    if(!validarCamposOr(array)){
        activarPestania(array);
        alertify.error("Ingrese todos los campos necesarios");
        return;
    }
    if(validarTipoDato()){
        var params = {numero : numero, descripcion : descripcion, categoria : categoria};
        var url = urlBase + "/extension/AddExtension.php";
        var success = function(response){
            cerrarSession(response);
            ID_EXTENSION = undefined;
            alertify.success("Extensión Agregada");
            vaciarFormulario();
            resetFormulario();
        };
        postRequest(url,params,success);
    }
}

function modificarExtension()
{
    var id = ID_EXTENSION;
    var numero = $("#numero").val();
    var descripcion = $("#descripcion").val();
    var categoria = $("#categoria").val();
    var array = [numero,descripcion];
    if(!validarCamposOr(array)){
        activarPestania(array);
        alertify.error("Ingrese todos los campos necesarios");
        return;
    }
    if(validarTipoDato()){
        var params = {id : id, numero : numero, descripcion : descripcion, categoria : categoria};
        var url = urlBase + "/extension/ModExtension.php";
        var success = function(response){
            cerrarSession(response);
            ID_EXTENSION = undefined;
            alertify.success("Extensión Modificada");
            resetFormulario();
        };
        postRequest(url,params,success);
    }
}

function validarExistencia(tipo,valor){
    for(var i = 0 ; i < EXTENSIONES.length ; i++){
        if(tipo === 'numero'){
            if(valor === EXTENSIONES[i].extension_numero){
                alertify.error("La extensión "+valor+" no se encuentra disponible");
                marcarCampoError($("#"+tipo));
                return true;
            }
        }
    }
    return false;
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

function validarTipoDato(){
    for(var i = 0 ; i < CAMPOS.length ; i++){
        marcarCampoOk($("#"+CAMPOS[i]));
    }
    var numero = $("#numero");
    if(!validarNumero(numero.val())){
        marcarCampoError(numero);
        alertify.error('Extensión debe ser numerico');
        return false;
    }
    return true;
}

function eliminarExtension(){
    var id = ID_EXTENSION;
    var params = {id : id};
    var url = urlBase + "/extension/DelExtension.php";
    var success = function(response){
        cerrarSession(response);
        alertify.success("Extensión eliminada");
        resetBotones();
        buscarExtensiones();
    };
    postRequest(url,params,success);
}

function preEliminarExtension(id,nombre){
    confirmar("Eliminar extensióm","Esta seguro que desea eliminar la extensión "+nombre,
            function(){
                var params = {id : id};
                var url = urlBase + "/extension/DelExtension.php";
                var success = function(response){
                    cerrarSession(response);
                    alertify.success("Extensión eliminada");
                    resetBotones();
                    buscarExtensiones();
                };
                postRequest(url,params,success);
            });
}