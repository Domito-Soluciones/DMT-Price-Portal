/* global urlBase, alertify, NOMBRE_CLIENTE, ID_CLIENTE */
var ID_CENTRO_COSTO;
var CENTROS_COSTO;
var CATEGORIA = 0;
var AGREGAR = true;
var PAGINA = 'CENTROS_COSTO';
var CAMPOS = ["nombre","descripcion","categoria"];
$(document).ready(function(){
    PAGINA_ANTERIOR = PAGINA;
    buscarCentrosCosto(true);
    $("#agregar").click(function(){
        AGREGAR = true;
        $("#lista_busqueda_centro_costo_detalle").load("html/datos_centro_costo.html", function( response, status, xhr ) {
            cambioEjecutado();
            $("#volver").click(function(){
                buscarCentrosCosto(true);
                resetBotones();
            });
        });
        activarBotones('agregar');
    });

    $("#busqueda").keyup(function(){
        buscarCentrosCosto();
    });
                
    $("#guardar").click(function (){
        if(AGREGAR){
            agregarCentroCosto();
        }
        else{
            modificarCentroCosto();
        }
    });
    
    $("#eliminar").click(function(){
        confirmar("Eliminar extensión","Esta seguro que desea eliminar el Centro de costo "+$("#nombre").val(),
        function(){
            eliminarCentroCosto();
            },null);
    });
});

function buscarCentrosCosto(cargar = false)
{
    var categorias = $("#lista_busqueda_centro_costo");
    categorias.html("");
    categorias.append("<div class=\"fila_contenedor fila_contenedor\" id=\"col_0\" onClick=\"cambiarFilaCategoria(0)\">Todo</div>");
    categorias.append("<div class=\"fila_contenedor fila_contenedor\" id=\"col_1\" onClick=\"cambiarFilaCategoria(1)\">Gerencia</div>");
    categorias.append("<div class=\"fila_contenedor fila_contenedor\" id=\"col_2\" onClick=\"cambiarFilaCategoria(2)\">Administrativo</div>");
    categorias.append("<div class=\"fila_contenedor fila_contenedor\" id=\"col_3\" onClick=\"cambiarFilaCategoria(3)\">Operacional</div>");
    marcarFilaActiva("col_"+CATEGORIA);
    $("#lista_busqueda_centro_costo_detalle").html("");
    var busqueda = $("#busqueda").val();
    var categoria = CATEGORIA;
    var params = {busqueda : busqueda, categoria : categoria};
    var url = urlBase + "/centro_costo/GetCentrosCosto.php";
    var success = function(response)
    {
        cerrarSession(response);
        var centros_costo = $("#lista_busqueda_centro_costo_detalle");
        centros_costo.html("");
        CENTROS_COSTO = response;
        centros_costo.append("<div class=\"contenedor_central_titulo_centro_costo\"><div>ID</div><div>Nombre</div><div>Descripción</div<div></div></div>");
        if(response.length === 0)
        {
            alertify.error("No hay registros que mostrar");
            return;
        }
        for(var i = 0 ; i < response.length; i++)
        {
            var centro_costo = response[i];
            var id = centro_costo.centrocosto_id;
            var nombre = centro_costo.centrocosto_nombre;
            var descripcion = centro_costo.centrocosto_descripcion;
            centros_costo.append("<div class=\"fila_contenedor fila_contenedor_centro_costo_detalle\" id=\""+id+"\" \">"+
                    "<div onClick=\"abrirModificar("+id+",'"+nombre+"')\">"+id+"</div>"+
                    "<div onClick=\"abrirModificar("+id+",'"+nombre+"')\">"+nombre+"</div>"+
                    "<div onClick=\"abrirModificar("+id+",'"+nombre+"')\">"+descripcion+"</div>"+
                    "<div><img onclick=\"preEliminarCentroCosto("+id+",'"+nombre+"')\" src=\"img/eliminar-negro.svg\" width=\"12\" height=\"12\"></div>"+
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
            buscarCentrosCosto(true);
        },
        function(){
            MODIFICADO = true;
        });
    }
    else{
        buscarCentrosCosto(true);
    }
}

function abrirModificar(id,nombre)
{
    ID_CENTRO_COSTO = id;
    AGREGAR = false;
    $("#lista_busqueda_centro_costo_detalle").load("html/datos_centro_costo.html", function( response, status, xhr ) {
        $("#titulo_pagina_centro_costo").text(id + " ("+nombre+")");
        cambioEjecutado();
        $("#volver").click(function(){
            buscarCentrosCosto(true);
            resetBotones();
        });
       
        var centro_costo;
        for(var i = 0 ; i < CENTROS_COSTO.length; i++)
        {
            if(CENTROS_COSTO[i].centrocosto_id === id)
            {
                centro_costo = CENTROS_COSTO[i];
            }
        }
        $("#nombre").val(centro_costo.centrocosto_nombre);
        $("#descripcion").val(centro_costo.centrocosto_descripcion);
        $("#categoria").val(centro_costo.centrocosto_categoria);
        activarBotones();
    });
}

function agregarCentroCosto()
{
    var nombre = $("#nombre").val();
    var descripcion = $("#descripcion").val();
    var nivel = $("#nivel").val();
    var categoria = $("#categoria").val();
    var array = [nombre,descripcion];
    if(!validarCamposOr(array)){
        activarPestania(array);
        alertify.error("Ingrese todos los campos necesarios");
        return;
    }
    var params = {nombre : nombre, descripcion : descripcion, nivel : nivel, categoria : categoria};
    var url = urlBase + "/centro_costo/AddCentroCosto.php";
    var success = function(response){
        cerrarSession(response);
        ID_CENTRO_COSTO = undefined;
        alertify.success("CentroCosto Agregado");
        vaciarFormulario();
        resetFormulario();
    };
    postRequest(url,params,success);
}

function modificarCentroCosto()
{
    var id = ID_CENTRO_COSTO;
    var nombre = $("#nombre").val();
    var descripcion = $("#descripcion").val();
    var nivel = $("#nivel").val();
    var categoria = $("#categoria").val();
    var array = [nombre,descripcion];
    if(!validarCamposOr(array)){
        activarPestania(array);
        alertify.error("Ingrese todos los campos necesarios");
        return;
    }
    var params = {id : id, nombre : nombre, descripcion : descripcion, nivel : nivel,  categoria : categoria};
    var url = urlBase + "/centro_costo/ModCentroCosto.php";
    var success = function(response){
        cerrarSession(response);
        ID_CENTRO_COSTO = undefined;
        alertify.success("CentroCosto Modificado");
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

function eliminarCentroCosto(){
    var id = ID_CENTRO_COSTO;
    var params = {id : id};
    var url = urlBase + "/centro_costo/DelCentroCosto.php";
    var success = function(response){
        cerrarSession(response);
        alertify.success("Centro de costo eliminado");
        resetBotones();
        buscarCentrosCosto();
    };
    postRequest(url,params,success);
}

function preEliminarCentroCosto(id,nombre){
    confirmar("Eliminar extensióm","Esta seguro que desea eliminar el centro de costo "+nombre,
            function(){
                var params = {id : id};
                var url = urlBase + "/centro_costo/DelCentroCosto.php";
                var success = function(response){
                    cerrarSession(response);
                    alertify.success("Centrode costo eliminado");
                    resetBotones();
                    buscarCentrosCosto();
                };
                postRequest(url,params,success);
            });
}