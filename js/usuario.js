/* global urlBase, alertify, NOMBRE_CLIENTE, ID_CLIENTE */
var ID_USUARIO;
var USUARIOS;
var AGREGAR = true;
var PAGINA = 'USUARIOS';
var CAMPOS = ["nombre","descripcion"];

$(document).ready(function(){
    PAGINA_ANTERIOR = PAGINA;
    buscarUsuariosAll();
    $("#agregar").click(function(){
        AGREGAR = true;
        $("#lista_busqueda_usuario_detalle").load("html/datos_usuario.html", function( response, status, xhr ) {
            quitarclase($("#guardar"),"oculto");
            cambiarPropiedad($("#agregar"),"visibility","hidden");
            cambiarPropiedad($("#eliminar"),"visibility","hidden");
            cambioEjecutado();
            
            $("#volver").click(function(){
                buscarUsuarios(NOMBRE_CLIENTE,ID_CLIENTE);
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
        buscarClienteUsuario($(this).val());
    });
                
    $("#guardar").click(function (){
        if(AGREGAR)
        {
            agregarUsuario();
        }
        else
        {
            modificarUsuario();
        }
    });
});


/* global urlBase, alertify, PAGINA, CAMPOS, clientes_usuario */

function agregarUsuario()
{
    var cliente = $("#clientes").val();
    var tipo = $("#tipo").val();
    var horario = $("#horario").val();
    var hora = $("#hora").val();
    var numero = $("#numero").val();
    var descripcion = $("#descripcion").val();
    var nombre = $("#nombre").val();
    var origen = $("#origen").val();
    var destino = $("#destino").val();
    var valor1 = $("#valor1").val();
    var valor2 = $("#valor2").val();
    var array = [tipo,horario,descripcion,numero,hora,nombre,origen,destino,valor1,valor2];
    if(!validarCamposOr(array))
    {
        activarPestania(array);
        alertify.error("Ingrese todos los campos necesarios");
        return;
    }
    if(validarTipoDatoUsuario())
    {
        var params = {cliente : cliente, tipo : tipo,horario : horario, numero : numero, hora : hora,descripcion: descripcion,nombre : nombre, origen : origen,
            destino : destino, valor1 : valor1, valor2 : valor2};
        var url = urlBase + "/usuario/AddUsuario.php";
        var success = function(response)
        {
            ID_USUARIO = undefined;
            cerrarSession(response);
            alertify.success("Usuario Agregada");
            if(PAGINA !== 'CLIENTES')
            {
                vaciarFormulario();
            }
            resetFormulario();
            buscarUsuarios(ID_CLIENTE,NOMBRE_CLIENTE);
            cambiarPropiedad($("#pie-aniadir"),"display","block");
            cambiarPropiedad($("#agregar"),"visibility","visible");
            cambiarPropiedad($("#agregarT"),"visibility","visible");
            cambiarPropiedad($("#guardar"),"visibility","hidden");
            cambiarPropiedad($("#guardarT"),"visibility","hidden");
        };
        postRequest(url,params,success);
    }
}

function modificarUsuario()
{
    var id = ID_USUARIO;
    var cliente = $("#clientes").val();;
    var tipo = $("#tipo").val();
    var horario = $("#horario").val();
    var descripcion = $("#descripcion").val();
    var hora = $("#hora").val();
    var numero = $("#numero").val();
    var nombre = $("#nombre").val();
    var origen = $("#origen").val();
    var destino = $("#destino").val();
    var valor1 = $("#valor1").val();
    var valor2 = $("#valor2").val();
    var array = [tipo,horario,descripcion,numero, hora,nombre,valor1,valor2];
    if(!validarCamposOr(array))
    {
        activarPestania(array);
        alertify.error("Ingrese todos los campos necesarios");
        return;
    }
    if(validarTipoDatoUsuario())
    {
        var params = {id : id,cliente : cliente, tipo : tipo,horario : horario, numero : numero, hora : hora,descripcion : descripcion,nombre : nombre, origen : origen,
            destino : destino, valor1 : valor1, valor2 : valor2};
        var url = urlBase + "/usuario/ModUsuario.php";
        var success = function(response)
        {
            cerrarSession(response);
            alertify.success("Usuario Modificada");
            resetFormulario();
            buscarUsuarios(ID_CLIENTE,NOMBRE_CLIENTE);
            cambiarPropiedad($("#pie-aniadir"),"display","block");
            agregarclase($("#guardarT"),"oculto");
            agregarclase($("#eliminarT"),"oculto");
            quitarclase($("#agregarT"),"oculto");
        };
        postRequest(url,params,success);
    }
}

function buscarClienteUsuario()
{
    var busqueda = $("#busqueda").val();
    var params = {busqueda : busqueda,buscaCC : '0'};
    var url = urlBase + "/cliente/GetClientes.php";
    var success = function(response)
    {
        cerrarSession(response);
        var clientes = $("#lista_busqueda_usuario");
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
            var rut = response[i].cliente_rut;
            var nombre = response[i].cliente_razon;
            var direccion = response[i].cliente_direccion;
            var titulo = recortar(rut+" / "+nombre);
            if (typeof ID_CLIENTE !== "undefined" && ID_CLIENTE === id)
            {
                clientes.append("<div class=\"fila_contenedor fila_contenedor_activa\" id=\""+id+"\" onClick=\"cambiarFilaUsuario('"+id+"','"+nombre+"','"+direccion+"')\">"+titulo+"</div>");
            }
            else
            {
                clientes.append("<div class=\"fila_contenedor\" id=\""+id+"\" onClick=\"cambiarFilaUsuario('"+id+"','"+nombre+"','"+direccion+"')\">"+titulo+"</div>");
            }
        }
    };
    postRequest(url,params,success);
}

function cambiarFilaUsuario(id,nombre,direccion)
{
    if(MODIFICADO)
    {
        confirmar("Cambio de usuario",
        "¿Desea cambiar de usuario sin guardar los cambios?",
        function()
        {
            MODIFICADO = false;
            buscarUsuarios(id,nombre,direccion);
        },
        function()
        {
            MODIFICADO = true;
        });
    }
    else
    {
        buscarUsuarios(id,nombre,direccion);
    }
}
function buscarUsuarios(id,nombre,direccion)
{
    ID_CLIENTE = id;
    NOMBRE_CLIENTE = nombre;
    DIRECCION_EMPRESA = direccion;
    $("#clientes").val(nombre);
    marcarFilaActiva(id);
    quitarclase($("#agregar"),"oculto");
    $("#lista_busqueda_usuario_detalle").html("");
    var busqueda = NOMBRE_CLIENTE;
    var params = {busqueda : busqueda};
    var url = urlBase + "/usuario/GetUsuarios.php";
    var success = function(response)
    {
        
        cambiarPropiedad($(".pie-usuario"),"display","block");
        cambiarPropiedad($("#guardar"),"visibility","hidden");
        cambiarPropiedad($("#eliminar2"),"visibility","hidden");
        cerrarSession(response);
        var usuarios = $("#lista_busqueda_usuario_detalle");
        usuarios.html("");
        USUARIOS = response;
        usuarios.append("<div class=\"contenedor_central_titulo_usuario\"><div>Nombre</div><div>Hora</div><div>Descripción</div><div>Empresa</div><div></div></div>");
        if(response.length === 0)
        {
            usuarios.append("<div class=\"mensaje_bienvenida\">No hay registros que mostrar</div>");
        }
        for(var i = 0 ; i < response.length; i++)
        {
            var id = response[i].usuario_id;
            var nombre = response[i].usuario_descripcion;
            var hora = response[i].usuario_hora;
            var descripcion = response[i].usuario_nombre;
            var empresa = response[i].usuario_cliente;
            usuarios.append("<div class=\"fila_contenedor fila_contenedor_usuario_detalle\" id=\""+id+"\" \">"+
                    "<div onClick=\"abrirBuscador('"+id+"')\">"+nombre+"</div>"+
                    "<div onClick=\"abrirBuscador('"+id+"')\">"+hora+"</div>"+
                    "<div onClick=\"abrirBuscador('"+id+"')\">"+descripcion+"</div>"+
                    "<div onClick=\"abrirBuscador('"+id+"')\">"+empresa+"</div>"+
                    "<div><img onclick=\"preEliminarUsuario('"+descripcion+"','"+nombre+"')\" src=\"img/eliminar-negro.svg\" width=\"12\" height=\"12\"></div>"+
                    "</div>");
        }
    };
    postRequest(url,params,success);
    
}

function abrirBuscador(id)
{
    AGREGAR = false;
    ID_USUARIO = id;
    if(PAGINA === 'USUARIOS')
    {
        cambiarPropiedad($("#guardar"),"visibility","visible");
        cambiarPropiedad($("#eliminar2"),"visibility","visible");   
    }
    cambiarPropiedad($("#pie-aniadir"),"display","none");
    agregarclase($("#agregarT"),"oculto");
    quitarclase($("#guardarT"),"oculto");
    quitarclase($("#eliminarT"),"oculto");
    $("#lista_busqueda_usuario_detalle").load("html/datos_usuario_cliente.html", function( response, status, xhr ) {
        iniciarHora([$("#hora")]);
        if(PAGINA === 'CLIENTES')
        {
            cambiarPropiedad($("#titulo_usuario"),"background-color","white");
            cambiarPropiedad($(".contenedor-pre-input"),"height","25px");
        }
        else if(PAGINA !== 'USUARIOS')
        {
           cambiarPropiedad($("#contenedor_usuario"),"display","none");
           $("#pie_usuario #agregar").attr("id","agregarNo");
           $("#pie_usuario #guardar").attr("id","guardarNo");
           $("#pie_usuario #eliminar").attr("id","eliminarNo");
        }
        cambioEjecutado();
        var usuario;
        for(var i = 0 ; i < USUARIOS.length; i++)
        {
            if(USUARIOS[i].usuario_id === id)
            {
                usuario = USUARIOS[i];
            }
        }
        $("#tipo").change(function(){
            generarNombre();
        });
        $("#horario").change(function(){
            generarNombre();
        });
        cargarClientes();
        $("#clientes").val(usuario.usuario_cliente);
        $("#tipo").val(usuario.usuario_tipo);
        $("#horario").val(usuario.usuario_horario);
        $("#hora").val(usuario.usuario_hora);
        $("#numero").val(usuario.usuario_numero);
        $("#descripcion").val(usuario.usuario_descripcion);
        $("#nombre").prop("readonly",true);
        $("#nombre").val(usuario.usuario_nombre);
        $("#origen").val(usuario.usuario_origen);
        $("#destino").val(usuario.usuario_destino);
        $("#valor1").val(usuario.usuario_valor1);
        $("#valor2").val(usuario.usuario_valor2);
        cambiarPropiedad($("#guardar"),"visibility","visible");
        cambiarPropiedad($("#cancelar"),"visibility","visible");
        cambiarPropiedad($("#eliminar"),"visibility","visible");
        $("#eliminar2").click(function (){
            confirmar("Eliminar usuario","Esta seguro que desea eliminar la usuario "+$("#descripcion").val() + " " +$("#nombre").val(),
            function(){
                eliminarUsuario();
            },null);
        });

        $("#volverT").click(function(){
            if(typeof NOMBRE_CLIENTE === "undefined" || typeof ID_CLIENTE === "undefined")
            {
                buscarUsuariosAll();
                cambiarPropiedad($("#agregar"),"visibility","hidden");
            }   
            else
            {
                buscarUsuarios(ID_CLIENTE,NOMBRE_CLIENTE);
                cambiarPropiedad($("#agregar"),"visibility","visible");
            }
            cambiarPropiedad($("#guardar"),"visibility","hidden");
            cambiarPropiedad($("#eliminar"),"visibility","hidden");
            cambiarPropiedad($("#eliminar2"),"visibility","hidden");
        });
    });
}

function eliminarUsuario()
{
    var nombre = $("#nombre").val();
    var params = {nombre : nombre};
    var url = urlBase + "/usuario/DelUsuario.php";
    var success = function(response)
    {
        alertify.success("Usuario eliminada");
        cerrarSession(response);
        resetBotones();
        buscarUsuarios(ID_CLIENTE,NOMBRE_CLIENTE);
        cambiarPropiedad($("#pie-aniadir"),"display","initial");
        agregarclase($("#eliminarT"),"oculto");
        agregarclase($("#guardarT"),"oculto");
        quitarclase($("#agregarT"),"oculto");
    };
    postRequest(url,params,success);
}

function validarExistencia(tipo,valor)
{
    for(var i = 0 ; i < USUARIOS.length ; i++)
    {
        if(tipo === 'nombre')
        {
            if(valor === USUARIOS[i].usuario_nombre)
            {
                return true;
            }
        }
    }    
}

function validarTipoDatoUsuario()
{
    for(var i = 0 ; i < CAMPOS.length ; i++)
    {
        marcarCampoOk($("#"+CAMPOS[i]));
    }
    var numero = $("#numero");
    var valor1 = $("#valor1");
    var valor2 = $("#valor2");
    if(!validarNumero(numero.val()))
    {
        marcarCampoError(numero);
        alertify.error('Número ruta debe ser numerico');
        return false;
    }
    if(!validarNumero(valor1.val()))
    {
        marcarCampoError(valor1);
        alertify.error('Usuario 1 debe ser numerico');
        return false;
    }
    if(!validarNumero(valor2.val()))
    {
        marcarCampoError(valor2);
        alertify.error('Usuario 2 debe ser numerico');
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
            clientes_usuario.push(nombre);
        }
    };
    postRequest(url,params,success);
}

function generarNombre()
{
    var tipo = $("#tipo").val();
    var horario = $("#horario").val();
    if(horario === '' && tipo === '')
    {
        $("#nombre").val("-");
    }
    if(horario !== '' && tipo === '')
    {
        $("#nombre").val("-"+horario);
    }
    else if(tipo !== '' && horario === '')
    {
        $("#nombre").val(tipo+"-");
    }
    else if(tipo !== '' && horario !== '')
    {
        $("#nombre").val(tipo+"-"+horario);
    }
}

function preEliminarUsuario(nombre,descripcion)
{
    confirmar("Eliminar usuario","Esta seguro que desea eliminar la usuario "+descripcion+" "+nombre,
            function(){
                var params = {nombre : nombre};
                var url = urlBase + "/usuario/DelUsuario.php";
                var success = function(response)
                {
                    agregarclase($("#eliminarT"),"oculto");
                    agregarclase($("#guardarT"),"oculto");
                    quitarclase($("#agregarT"),"oculto");
                    alertify.success("Usuario eliminada");
                    cerrarSession(response);
                    resetBotones();
                    buscarUsuarios(ID_CLIENTE,NOMBRE_CLIENTE);
                    cambiarFilaUsuario(ID_CLIENTE,NOMBRE_CLIENTE);
                };
                postRequest(url,params,success);
            });
}

function buscarUsuariosAll()
{
    $("#lista_busqueda_usuario_detalle").html("");
    cambiarPropiedad($(".mensaje_bienvenida"),"display","none");
    var busqueda = $("#busqueda").val();
    var params = {busqueda : busqueda};
    var url = urlBase + "/usuario/GetUsuarios.php";
    var success = function(response)
    {
        cerrarSession(response);
        var usuarios = $("#lista_busqueda_usuario_detalle");
        usuarios.html("");
        USUARIOS = response;
        usuarios.append("<div class=\"contenedor_central_titulo_usuario\"><div>Nombre</div><div>Hora</div><div>Descripción</div><div>Empresa</div><div></div></div>");
        if(response.length === 0)
        {
            usuarios.append("<div class=\"mensaje_bienvenida\">No hay registros que mostrar</div>");
        }
        for(var i = 0 ; i < response.length; i++)
        {
            var id = response[i].usuario_id;
            var nombre = response[i].usuario_descripcion;
            var hora = response[i].usuario_hora;
            var descripcion = response[i].usuario_nombre;
            var empresa = response[i].usuario_cliente;
            usuarios.append("<div class=\"fila_contenedor fila_contenedor_usuario_detalle\" id=\""+id+"\" \">"+
                    "<div onClick=\"abrirBuscador('"+id+"')\">"+nombre+"</div>"+
                    "<div onClick=\"abrirBuscador('"+id+"')\">"+hora+"</div>"+
                    "<div onClick=\"abrirBuscador('"+id+"')\">"+descripcion+"</div>"+
                    "<div onClick=\"abrirBuscador('"+id+"')\">"+empresa+"</div>"+
                    "<div><img onclick=\"preEliminarUsuario('"+descripcion+"','"+nombre+"')\" src=\"img/eliminar-negro.svg\" width=\"12\" height=\"12\"></div>"+
                    "</div>");
        }
    };
    postRequest(url,params,success);
    
}