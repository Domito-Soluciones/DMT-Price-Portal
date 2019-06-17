/* global urlBase, alertify, NOMBRE_CLIENTE, ID_CLIENTE */
var ID_EXTENSION;
var PARTICIONES;
var CATEGORIA = 0;
var AGREGAR = true;
var PAGINA = 'PARTICIONES';
var CAMPOS = ["nombre","descripcion","valor","categoria"];
$(document).ready(function(){
    PAGINA_ANTERIOR = PAGINA;
    buscarParticiones(true);
    $("#agregar").click(function(){
        AGREGAR = true;
        $("#lista_busqueda_particion_detalle").load("html/datos_particion.html", function( response, status, xhr ) {
            cambioEjecutado();
            $("#volver").click(function(){
                buscarParticiones(true);
                resetBotones();
            });
        });
        activarBotones('agregar');
    });

    $("#busqueda").keyup(function(){
        buscarParticiones();
    });
                
    $("#guardar").click(function (){
        if(AGREGAR){
            agregarParticion();
        }
        else{
            modificarParticion();
        }
    });
    
    $("#eliminar").click(function(){
        confirmar("Eliminar extensión","Esta seguro que desea eliminar la extensión "+$("#numero").val(),
        function(){
            eliminarParticion();
            },null);
    });
});

function buscarParticiones(cargar = false)
{
    var categorias = $("#lista_busqueda_particion");
    categorias.html("");
    categorias.append("<div class=\"fila_contenedor fila_contenedor\" id=\"col_0\" onClick=\"cambiarFilaCategoria(0)\">Todo</div>");
    categorias.append("<div class=\"fila_contenedor fila_contenedor\" id=\"col_1\" onClick=\"cambiarFilaCategoria(1)\">Gerencia</div>");
    categorias.append("<div class=\"fila_contenedor fila_contenedor\" id=\"col_2\" onClick=\"cambiarFilaCategoria(2)\">Administrativo</div>");
    categorias.append("<div class=\"fila_contenedor fila_contenedor\" id=\"col_3\" onClick=\"cambiarFilaCategoria(3)\">Operacional</div>");
    marcarFilaActiva("col_"+CATEGORIA);
    $("#lista_busqueda_particion_detalle").html("");
    var busqueda = $("#busqueda").val();
    var categoria = CATEGORIA;
    var params = {busqueda : busqueda, categoria : categoria};
    var url = urlBase + "/particion/GetParticiones.php";
    var success = function(response)
    {
        cerrarSession(response);
        var particiones = $("#lista_busqueda_particion_detalle");
        particiones.html("");
        PARTICIONES = response;
        particiones.append("<div class=\"contenedor_central_titulo_extension\"><div>ID</div><div>Nombre</div><div>Descripción</div><div>Valor</div><div></div></div>");
        if(response.length === 0)
        {
            alertify.error("No hay registros que mostrar");
            return;
        }
        for(var i = 0 ; i < response.length; i++)
        {
            var particion = response[i];
            var id = particion.particion_id;
            var nombre = particion.particion_nombre;
            var descripcion = particion.particion_descripcion;
            var valor = particion.particion_valor;
            particiones.append("<div class=\"fila_contenedor fila_contenedor_extension_detalle\" id=\""+id+"\" \">"+
                    "<div onClick=\"abrirModificar("+id+",'"+nombre+"')\">"+id+"</div>"+
                    "<div onClick=\"abrirModificar("+id+",'"+nombre+"')\">"+nombre+"</div>"+
                    "<div onClick=\"abrirModificar("+id+",'"+nombre+"')\">"+descripcion+"</div>"+
                    "<div onClick=\"abrirModificar("+id+",'"+nombre+"')\">"+valor+"</div>"+                    
                    "<div><img onclick=\"preEliminarParticion("+id+",'"+nombre+"')\" src=\"img/eliminar-negro.svg\" width=\"12\" height=\"12\"></div>"+
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
            buscarParticiones(true);
        },
        function(){
            MODIFICADO = true;
        });
    }
    else{
        buscarParticiones(true);
    }
}

function abrirModificar(id,nombre)
{
    ID_EXTENSION = id;
    AGREGAR = false;
    $("#lista_busqueda_particion_detalle").load("html/datos_particion.html", function( response, status, xhr ) {
        $("#titulo_pagina_particion").text(id + " ("+nombre+")");
        cambioEjecutado();
        $("#volver").click(function(){
            buscarParticiones(true);
            resetBotones();
        });
       
        var particion;
        for(var i = 0 ; i < PARTICIONES.length; i++)
        {
            if(PARTICIONES[i].particion_id === id)
            {
                particion = PARTICIONES[i];
            }
        }
        $("#nombre").val(particion.particion_nombre);
        $("#descripcion").val(particion.particion_descripcion);
        $("#valor").val(particion.particion_valor);
        $("#categoria").val(particion.particion_categoria);
        activarBotones();
    });
}

function agregarParticion()
{
    var nombre = $("#nombre").val();
    var descripcion = $("#descripcion").val();
    var valor = $("#valor").val();
    var categoria = $("#categoria").val();
    var array = [nombre,descripcion,valor];
    if(!validarCamposOr(array)){
        activarPestania(array);
        alertify.error("Ingrese todos los campos necesarios");
        return;
    }
    if(validarTipoDato()){
        var params = {nombre : nombre, descripcion : descripcion,valor: valor, categoria : categoria};
        var url = urlBase + "/particion/AddParticion.php";
        var success = function(response){
            cerrarSession(response);
            ID_EXTENSION = undefined;
            alertify.success("Partición Agregada");
            vaciarFormulario();
            resetFormulario();
        };
        postRequest(url,params,success);
    }
}

function modificarParticion()
{
    var id = ID_EXTENSION;
    var nombre = $("#nombre").val();
    var descripcion = $("#descripcion").val();
    var valor = $("#valor").val();
    var categoria = $("#categoria").val();
    var array = [nombre,descripcion,valor];
    if(!validarCamposOr(array)){
        activarPestania(array);
        alertify.error("Ingrese todos los campos necesarios");
        return;
    }
    if(validarTipoDato()){
        var params = {id : id, nombre : nombre, descripcion : descripcion,valor: valor, categoria : categoria};
        var url = urlBase + "/particion/ModParticion.php";
        var success = function(response){
            cerrarSession(response);
            ID_EXTENSION = undefined;
            alertify.success("Partición Modificada");
            resetFormulario();
        };
        postRequest(url,params,success);
    }
}

function validarExistencia(tipo,valor){
    for(var i = 0 ; i < PARTICIONES.length ; i++){
        if(tipo === 'numero'){
            if(valor === PARTICIONES[i].particion_numero){
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
    var valor = $("#valor");
    if(!validarNumero(valor.val())){
        marcarCampoError(valor);
        alertify.error('Valor debe ser numerico');
        return false;
    }
    return true;
}

function eliminarParticion(){
    var id = ID_EXTENSION;
    var params = {id : id};
    var url = urlBase + "/particion/DelParticion.php";
    var success = function(response){
        cerrarSession(response);
        alertify.success("Extensión eliminada");
        resetBotones();
        buscarParticiones();
    };
    postRequest(url,params,success);
}

function preEliminarParticion(id,nombre){
    confirmar("Eliminar extensióm","Esta seguro que desea eliminar la extensión "+nombre,
            function(){
                var params = {id : id};
                var url = urlBase + "/particion/DelParticion.php";
                var success = function(response){
                    cerrarSession(response);
                    alertify.success("Extensión eliminada");
                    resetBotones();
                    buscarParticiones();
                };
                postRequest(url,params,success);
            });
}