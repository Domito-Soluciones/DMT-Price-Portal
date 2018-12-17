/* global urlBase, alertify */
var CLIENTES;
var PASAJEROS;
var AGREGAR = true;
var PAGINA = 'CLIENTES';
var ID_CLIENTE;
var ARRAY_ELIMINAR_PASAJEROS = [];
var CAMPOS = ["rut","razon","tipo","direccion","nombre","telefono","mail","mail2","centros"];
$(document).ready(function(){
    buscarCliente();
    buscarPasajeros();
    $("#agregar").click(function(){
        MODIFICADO = true;
        cambiarPropiedad($("#agregar"),"visibility","hidden");
        AGREGAR = true;
        $("#contenedor_central").load("html/datos_cliente.html", function( response, status, xhr ) {
            iniciarPestaniasCliente();
            $("#rut").blur(function (){
                if(validarExistencia('rut',$(this).val()))
                {
                    alertify.error("El rut "+$(this).val()+" ya existe");
                    $("#rut").val("");
                    return;
                }
            });

        });
        cambiarPropiedad($("#guardar"),"visibility","visible");
        cambiarPropiedad($("#cancelar"),"visibility","visible");
    });
    $("#cancelar").click(function(){
        resetFormulario(PAGINA);
        resetBotones();
    });
    $("#guardar").click(function(){
        if(AGREGAR)
        {
            agregarCliente();
        }
        else
        {
            modificarCliente();
        }
        MODIFICADO = false;
    });
    $("#busqueda").keyup(function(){
        buscarCliente($(this).val());
    });
    
    $("#eliminar").click(function (){
            alertify.confirm("Eliminar cliente","Esta seguro que desea eliminar al cliente "+$("#rut").val(),
            function(){
                eliminarCliente();
            },null);
    });
});

function agregarCliente()
{
    var razon = $("#razon").val();
    var tipo = $("#tipo").val();
    var rut = $("#rut").val();
    var direccion = $("#direccion").val();
    var nombre = $("#nombre").val();
    var telefono = $("#telefono").val();
    var mail = $("#mail").val();
    var mail2 = $("#mail2").val();
    var cc = $("#centros").val();
    var array = [razon,tipo,rut,direccion,nombre,telefono,mail,mail2,cc];
    if(!validarCamposOr(array))
    {
        activarPestania(array);
        alertify.error("Ingrese todos los campos necesarios");
        return;
    }
    if(validarTipoDato())
    {
        var data = "razon="+razon+"&tipo="+tipo+"&rut="+rut+"&direccion="+direccion+"&nombre="+nombre+
                "&telefono="+telefono+"&mail="+mail+"&mail2="+mail2+"&centros="+cc;
        var url = urlBase+"/cliente/AddCliente.php?"+data;
        var success = function(response)
        {
            cerrarSession(response);
            alertify.success("Cliente Agregado");
            vaciarFormulario($("#agregar input"));
            cambiarPropiedad($("#loaderCentral"),"visibility","hidden");
            resetFormulario(PAGINA);
            buscarCliente();
        };
        postRequest(url,success);
    }
}

function modificarCliente()
{
    var razon = $("#razon").val();
    var tipo = $("#tipo").val();
    var rut = $("#rut").val();
    var direccion = $("#direccion").val();
    var nombre = $("#nombre").val();
    var telefono = $("#telefono").val();
    var mail = $("#mail").val();
    var mail2 = $("#mail2").val();
    var cc = $("#centros").val();
    var array = [razon,tipo,rut,direccion,nombre,telefono,mail,mail2,cc];
    if(!validarCamposOr(array))
    {
        activarPestania(array);
        alertify.error("Ingrese todos los campos necesarios");
        return;
    }
    if(validarTipoDato())
    {
        var data = "razon="+razon+"&tipo="+tipo+"&rut="+rut+"&direccion="+direccion+"&nombre="+nombre
                +"&telefono="+telefono+"&mail="+mail+"&mail2="+mail2+"&centros="+cc;
        var url = urlBase + "/cliente/ModCliente.php?"+data;
        var success = function(response)
        {
            cambiarPropiedad($("#loaderCentral"),"visibility","hidden");
            resetBotones();
            cerrarSession(response);
            alertify.success("Cliente Modificado");
            vaciarFormulario($("#agregar input"));
            resetFormulario(PAGINA);
            buscarCliente();
        };
        postRequest(url,success);
    }
}

function buscarCliente()
{
    var busqueda = $("#busqueda").val();
    var url = urlBase + "/cliente/GetClientes.php?busqueda="+busqueda;
    var success = function(response)
    {
        cerrarSession(response);
        var clientes = $("#lista_busqueda");
        clientes.html("");
        CLIENTES = response;
        if(response.length === 0)
        {
            alertify.error("No hay registros que mostrar");
            return;
        }
        for(var i = 0 ; i < response.length; i++)
        {
            var id = response[i].cliente_id;
            var nombre = response[i].cliente_razon;
            clientes.append("<div class=\"fila_contenedor\" id=\""+id+"\" onClick=\"abrirModificar('"+id+"')\">"+nombre+"</div>");
        }
        cambiarPropiedad($("#loader"),"visibility","hidden");
    };
    getRequest(url,success);
}

function abrirModificar(id)
{
    MODIFICADO = true;
    AGREGAR = false;
    ID_CLIENTE = id;
    quitarclase($(".fila_contenedor"),"fila_contenedor_activa");
    agregarclase($("#"+id),"fila_contenedor_activa");
    $("#contenedor_central").load("html/datos_cliente.html", function( response, status, xhr ) {
        iniciarPestaniasCliente();
        $("#nick").blur(function (){
            if(validarExistencia('rut',$(this).val()))
            {
                alertify.error("El rut "+$(this).val()+" ya existe");
                $("#rut").val("");
                return;
            }
            if(validarExistencia('razon',$(this).val()))
            {
                alertify.error("La razon social "+$(this).val()+" ya existe");
                $("#razon").val("");
                return;
            }
        });
        var cliente;
        for(var i = 0 ; i < CLIENTES.length; i++)
        {
            if(CLIENTES[i].cliente_id === id)
            {
                cliente = CLIENTES[i];
            }
        }
        $("#razon").val(cliente.cliente_razon);
        $("#razon").prop("readonly",true);
        $("#rut").val(cliente.cliente_rut);
        $("#rut").prop("readonly",true);
        $("#tipo").val(cliente.cliente_tipo);
        $("#nombre").val(cliente.cliente_nombre_contacto);
        $("#telefono").val(cliente.cliente_fono_contacto);
        $("#direccion").val(cliente.cliente_direccion);
        $("#mail").val(cliente.cliente_mail_contacto);
        $("#mail2").val(cliente.cliente_mail_facturacion);
        $("#centros").val(cliente.cliente_centro_costo);
        cambiarPropiedad($("#guardar"),"visibility","visible");
        cambiarPropiedad($("#cancelar"),"visibility","visible");
        cambiarPropiedad($("#eliminar"),"visibility","visible");
        
    });
}

function eliminarCliente()
{
    var rut = $("#rut").val();
    var url = urlBase + "/cliente/DelCliente.php?rut="+rut;
    var success = function(response)
    {
        alertify.success("Cliente eliminado");
        cerrarSession(response);
        resetFormulario(PAGINA);
        cambiarPropiedad($("#loaderCentral"),"visibility","hidden");
        resetBotones();
        buscarCliente();
    };
    getRequest(url,success);
}

function validarExistencia(tipo,valor)
{
    for(var i = 0 ; i < CLIENTES.length ; i++)
    {
        if(tipo === 'rut')
        {
            if(valor === CLIENTES[i].cliente_rut)
            {
                return true;
            }
        }
    }    
}

function validarTipoDato()
{
    for(var i = 0 ; i < CAMPOS.length ; i++)
    {
        marcarCampoOk($("#"+CAMPOS[i]));
    }
    var rut = $("#rut");
    var telefono = $("#telefono");
    var mail = $("#mail");
    var mail2 = $("#mail2");
    if(!validarRut(rut.val()))
    {
        marcarCampoError(rut);
        alertify.error('Rut invalido');
        return false;
    }
    if(!validarNumero(telefono.val()))
    {
        marcarCampoError(telefono);
        alertify.error('Telefono debe ser numerico');
        return false;
    }
    if(!validarEmail(mail.val()))
    {
        marcarCampoError(mail);
        alertify.error('E-mail contacto invalido');
        return false;
    }
    if(!validarEmail(mail2.val()))
    {
        marcarCampoError(mail2);
        alertify.error('E-mail facturaci&oacute;n invalido');
        return false;
    }
    
    return true;
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

function iniciarPestaniasCliente()
{
    $("#p_general").click(function(){
        cambiarPropiedad($("#cont_general"),"display","block");
        cambiarPropiedad($("#cont_movil"),"display","none");
        quitarclase($(this),"dispose");
        agregarclase($("#p_pasajero"),"dispose");
    });
    $("#p_pasajero").click(function(){
        cambiarPropiedad($("#cont_general"),"display","none");
        cambiarPropiedad($("#cont_pasajero"),"display","block");
        quitarclase($(this),"dispose");
        agregarclase($("#p_general"),"dispose");
        cargarPasajeros();
        $("#rutPasajero").on('keydown',function(e){
            if(isTeclaEnter(e))
            {
                encontrarPasajero();
            }
        });
        $("#rutPasajero").on('blur',function(){
            if($(this).val() !== '')
            {
                encontrarPasajero();
            }
        });
    });
}
function encontrarPasajero(){
    $("#resultadoPasajero").html("");
    var rutPasajero = $("#rutPasajero").val();
    if(validarRut(rutPasajero))
    {
        for(var i = 0 ; i < PASAJEROS.length; i++)
        {
            var rut = PASAJEROS[i].pasajero_rut;
            if(rutPasajero === rut)
            {
                var nombre = PASAJEROS[i].pasajero_nombre;
                var papellido = PASAJEROS[i].pasajero_papellido;
                var mapellido = PASAJEROS[i].pasajero_mapellido;
                $("#resultadoPasajero").append(
                    "<div class=\"cuadro_asignar\" onclick=\"agregarPasajero('"+
                    rut+"','"+nombre+"','"+papellido+"','"+mapellido+"')\">\n\
                        <div>Rut: "+rut+"</div><div>\n\
                             Nombre: "+nombre+"</div><div>\n\
                        </div>");
            }
            
        }
    }
    else
    {
        $("#rutPasajero").val("");
        $("#rutPasajero").focus();
        $("#resultadoPasajero").append("No hay resultados para su busqueda");
        alertify.error('Rut invalido');
    }
}

function agregarPasajero(rut,nombre,papellido,mapellido)
{
    for(var i = 0; i < ARRAY_ELIMINAR_PASAJEROS.length;i++) {
        if(rut === ARRAY_ELIMINAR_PASAJEROS[i])
        {
            delete ARRAY_ELIMINAR_PASAJEROS[i];
        }
    };
    $("#rutPasajero").val("");
    $("#tablaContenidoPasajero").append("<div id=\""+rut+"\" class=\"tablaFila\"><div class=\"cabecera_fila\"><img onclick=\"eliminarFilaPasajero('"+rut+"')\" src=\"img/eliminar-negro.svg\" width=\"20\" height=\"20\"></div><div>"
            +rut+"</div><div>"+nombre+"</div><div>"+papellido+"</div><div>"+mapellido+"</div></div>");
    $(".cuadro_asignar").remove();
}

function buscarPasajeros()
{
    var url = urlBase + "/pasajero/GetPasajeros.php?busqueda=";
    var success = function(response)
    {
        cambiarPropiedad($("#loader"),"visibility","hidden");
        cerrarSession(response);
        PASAJEROS = response;
    };
    getRequest(url,success);
}

function cargarPasajeros()
{
    var tablaPasajero = $("#tablaContenidoPasajero");
    var datalistPasajero = $("#rutPasajeroL");
    datalistPasajero.html("");
    if(tablaPasajero.html() === '')
    {
        cambiarPropiedad($("#loaderV"),"visibility","hidden");
        if (typeof PASAJEROS !== "undefined")
        {
            if(PASAJEROS.length === 0)
            {
                alertify.error("No hay pasajeros asociados");    
            }
            for(var i = 0 ; i < PASAJEROS.length; i++)
            {
                var rut = PASAJEROS[i].pasajero_rut;
                var nombre = PASAJEROS[i].pasajero_nombre;
                var papellido = PASAJEROS[i].pasajero_papellido;
                var mapellido = PASAJEROS[i].pasajero_mapellido;
                var cliente = PASAJEROS[i].pasajero_cliente;
                if(ID_CLIENTE === cliente)
                {
                    tablaPasajero.append("<div id=\""+rut+"\" class=\"tablaFila\"><div class=\"cabecera_fila\"><img onclick=\"eliminarFilaPasajero('"+rut+"')\" src=\"img/eliminar-negro.svg\" width=\"20\" height=\"20\"></div><div>"
                        +rut+"</div><div>"+nombre+"</div><div>"+papellido+"</div><div>"+mapellido+"</div></div>");
                }
                else
                {
                    datalistPasajero.append("<option value=\""+rut+"\">"+rut+"</option>");
                }
            }
        }
        cambiarPropiedad($("#loader"),"visibility","hidden");
    }
}

function eliminarFilaPasajero(obj)
{
    ARRAY_ELIMINAR_PASAJEROS.push(obj);
    $("#"+obj).remove();
    $("#rutPasajeroL").append("<option value=\""+obj+"\">"+obj+"</option>");
}