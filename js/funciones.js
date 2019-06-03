
/* global MODIFICADO, alertify, PAGINA_ANTERIOR, INTERVAL_SERVICIOS, MENU_OCULTO, flightPath, markers, menus */
var PAGINA_ANTERIOR;
var MODIFICADO = false;
var KEY = "DGFSGHJRTJTHWGWEJNGWI9EFN";
var urlBase= "source/httprequest";
var urlUtil= "source/util";
var ADJUNTANDO = false;
var CREADO = "0";
var EN_PROCCESO_DE_ASIGNACION = "1";
var ASIGNADO = "2";
var ACEPTADO = "3";
var EN_PROGRESO = "4";
var FINALIZADO = "5";
var CANCELADO = "6";
var TIPO_USUARIO;
var MENU_VISIBLE = false;

function darFoco(elemento)
{
    elemento.focus();
}

function cambiarPropiedad(elemento,propiedad,valor)
{
    elemento.css(propiedad,valor);
}

function isTeclaEnter(e){
    if(e.which === 13){
        return true;
    }
    return false;
}
function isTeclaTab(e){
    e.preventDefault();
    if(e.keyCode === 9){
        return true;
    }
    return false;
}

function postRequest(url,params,success,cargar = true)
{
    $.ajax({
        url: url,
        data: jQuery.param(params) ,
        method:'POST',
        cache: false,
        async: true,
        beforeSend: function (xhr) {
            if(cargar){
                mostrarDivLoader();
            }
        },
        success: success,
        complete: function (data) {
            if(cargar){
                eliminarDivLoader();
            }
        },
        error: function (resposeError)
        {
            if(cargar){
                eliminarDivLoader();
            }
        }
    });
}
function getRequest(url,success,cargar = true)
{
    $.ajax({
        url: url,
        method:'GET',
        success: success,
        async: true,
        cache: false,
        crossDomain: true,
        beforeSend: function (xhr) {
            if(cargar)
            {
                mostrarDivLoader();
            }
        },
        complete: function (data) {
            eliminarDivLoader();
        },
        error: function (resposeError)
        {
            eliminarDivLoader();
        }
    });
}

function redireccionar(url)
{
    window.location.href = url;
}

function addTexto(div,texto)
{
    div.text(texto);
}

function validarCamposOr(array,exepciones = null)
{
    for (var i = 0 ; i < array.length; i++)
    {
        if(exepciones === null)
        {
            if(array[i] === undefined || array[i] === '')
            {
                return false;
            }
        }
        else if(exepciones.indexOf('|'+i+'|') === -1)
        {
            if(array[i] === undefined || array[i] === '')
            {
                return false;
            }
        }
    }
    return true;
}

function validarCamposAnd(array)
{
    var cont = 0;
    for (var i = 0 ; i < array.length; i++)
    {
        if(array[i] === undefined || array[i] === '')
        {
            cont++;
        }
    }
    if(cont === array.length)
    {
        return false;
    }
    return true;
}

function agregarclase(div,clase)
{
    div.addClass(clase);
}
function quitarclase(div,clase)
{
    div.removeClass(clase);
}

function cambiarModulo(pagina,params = null){
    if(pagina === menus.get(PAGINA_ANTERIOR))
    {
        return;
    }
    if(MODIFICADO)
    {
        confirmar("Cambiar de modulo","¿Desea cambiar de modulo sin guardar los cambios?",
            function(){
                MODIFICADO = false;
                quitarclase($(".opcion-menu"),"menu-activo");
                agregarclase($("#"+pagina),"menu-activo");
                $("#contenido-central").html("");
                $("#contenido-central").load(pagina+".html",function( response, status, xhr ) {
                    variable = undefined;
                });
            },
            function(){
                alertify.confirm().close();
            });
    }
    else
    {
        quitarclase($(".opcion-menu"),"menu-activo");
        agregarclase($("#"+pagina),"menu-activo");
        $("#contenido-central").html("");
        $("#contenido-central").load(pagina+".html",function( response, status, xhr ) {
            variable = undefined;
        });
    }
    
    if($("#menu-telefono").css("display") === 'block')
    {
        cambiarPropiedad($("#menu"),"display","none");
        $("#menu-telefono").attr("src","img/menu.svg");
    }
    resetPagina();
}

function resetPagina()
{
    if(PAGINA_ANTERIOR === "AGENTES")
    {
        ID_AGENTE = undefined;
    }
    if(PAGINA_ANTERIOR === "CLIENTES")
    {
        ID_CLIENTE = undefined;
    }
    if(PAGINA_ANTERIOR === "CONDUCTORES")
    {
        ID_CONDUCTOR = undefined;
    }
    if(PAGINA_ANTERIOR === "MOVILES")
    {
        ID_MOVIL = undefined;
    }
    if(PAGINA_ANTERIOR === "PASAJEROS")
    {
        ID_PASAJERO = undefined;
    }
    if(PAGINA_ANTERIOR === "LIQUIDACION")
    {
        ID_LIQUIDACION = undefined;
    }
    if(PAGINA_ANTERIOR === "TARIFAS")
    {
        ID_TARIFA = undefined;
        ID_CLIENTE = undefined;
    }
    if(PAGINA_ANTERIOR === "CONTRATOS")
    {
        ID_CONDUCTOR = undefined;
    }
}


function cerrarSession(response)
{
    if(response.resp === 'return')
    {
        alertify.error('Sesión expirada');
        location.href = "index.php";
        return;
    }
}

function vaciarFormulario()
{
    $(":input:not([type=hidden])").each(function() {
        $(this).val("");
        marcarCampoOk($(this));
    });
    $("select").each(function() {
        $(this).val("");
        marcarCampoOk($(this));
    });
    $("textarea").each(function() {
        $(this).val("");
        marcarCampoOk($(this));
    });
}

function formato_fecha(texto){
  return texto.replace(/^(\d{4})\/(\d{2})\/(\d{2})$/g,'$3/$2/$1');
}
function formato_humano(texto){
  return texto.replace(/^(\d{2}\/(\d{2})\/(\d{4}))$/g,'$1/$2/$3');
}

function getfecha()
{
    var url = urlUtil + "/obtenerFecha.php";
    var success = function(response)
    {
        $("#fecha").html("");
        $("#fecha").append(response);
    };
    getRequest(url,success,false);
}

function getUsuario()
{
    var url = urlUtil + "/obtenerUsuario.php";
    var success = function(response)
    {
        NICK_GLOBAL = response;
        $("#enlace_usuario").html(response);
    };
    getRequest(url,success,false);
}

function mensajeBienvenida(mensaje)
{
    $("#lista_busqueda_pasajero_detalle").html("<div class=\"mensaje_bienvenida\">\n\
                                    SELECCIONE OPCIONES PARA AGREGAR EDITAR Y/O MODIFICAR "+mensaje+"</div>");
}

function resetFormulario() 
{
    MODIFICADO = false;
    cambiarPropiedad($("#agregar"),"visibility","visible");
    cambiarPropiedad($("#guardar"),"visibility","hidden");
}



function resetFormularioEliminar(pagina) 
{
    MODIFICADO = false;
    $("#lista_busqueda_pasajero_detalle").html("");
    mensajeBienvenida(pagina);
}

function abrirFile(e,obj){
    e.preventDefault();
    obj.trigger("click");
}

function subirFicheroPDF(event,form,nombre,archivo,index)
{
    ADJUNTANDO = true;
    if(nombre.val() !== '' && (validarRut(nombre.val()) || validarPatente(nombre.val())))
    {
        var url = 'source/util/subirFichero.php?nombre='+nombre.val()+'&tipo=pdf&archivo='+archivo.val();
        $.ajax({
            async: true,
            type: 'POST',
            url: url,
            data: new FormData(form[0]),
            cache: false,
            contentType: false,
            processData: false,
            beforeSend: function (xhr) {
                mostrarDivLoader();
            },
            success: function()
            {
                ADJUNTANDO = false;
                var archivo = $("#contratoOculta"+index).val();
                var ext = archivo.substring(archivo.length-3,archivo.length);
                if(ext !== 'pdf'){
                    alertify.error("Archivo invalido");
                    return;
                }
                else
                {
                    var enlace = "<a href=\"source/util/pdf/"+archivo+"\" target=\"_blanck\">Ver</a>";
                    $("#contenedor_contrato"+index).html(enlace);
                } 
                eliminarDivLoader();
            },
            error: function(response)
            {
                eliminarDivLoader();
            }
        });
    }
    else
    {
        alertify.error("El contrato debe ir asociado a un "+nombre.attr("id") );
    }
    event.preventDefault();
}

function subirFicheroJPG(event,form,nombre,archivo)
{
    ADJUNTANDO = true;
    if(nombre.val() !== '' && validarRut(nombre.val()))
    {
        var url = 'source/util/subirFichero.php?nombre='+nombre.val()+'&tipo=img&archivo='+archivo.val();
        $.ajax({
            async: true,
            type: 'POST',
            url: url,
            data: new FormData(form[0]),
            cache: false,
            contentType: false,
            processData: false,
            success: function()
            {
                ADJUNTANDO = false;
                var archivo = $("#imagenOculta").val();
                var ext = archivo.split("\.")[1];
                if(ext !== 'png'){
                    if(ext !== 'jpg'){
                        alertify.error("Archivo invalido");
                        return;
                    }
                }
                cambiarPropiedad($(".imagen"),"background-image","url('source/util/img/"+archivo+"')"); 
            }
        });
    }
    else
    {
        alertify.error("La imagen debe ir asociada a un "+nombre.attr("id"));
    }
    event.preventDefault();
}

function enviarFormFile(file,nombre,hidden,form)
{   
    var filename = file.replace(/.*(\/|\\)/, '');
    hidden.val(nombre+"_"+filename);
    form.submit();
}

function iniciarFecha(inputs) {
    jQuery.datetimepicker.setLocale('es');
    var conf = {
        i18n:{
            de:{
                months:[
                    'Januar','Februar','März','April',
                    'Mai','Juni','Juli','August',
                    'September','Oktober','November','Dezember'
                ],
                dayOfWeek:[
                    "So.", "Mo", "Di", "Mi", 
                    "Do", "Fr", "Sa."
                ]
            }
        },
        timepicker:false,
        format:'d/m/Y'
    };
    for(var i = 0 ; i < inputs.length; i++)
    {
        jQuery(inputs[i]).datetimepicker(conf);    
    }
}
function iniciarHora(inputs) {
    jQuery.datetimepicker.setLocale('es');
    var conf = {
        datepicker:false,
        format:'H:i'
    };
    for(var i = 0 ; i < inputs.length; i++)
    {
        jQuery(inputs[i]).datetimepicker(conf);    
    }
}
function iniciarFechaHora(inputs) {
    jQuery.datetimepicker.setLocale('es');
    var conf = {
        i18n:{
            de:{
                months:[
                    'Januar','Februar','März','April',
                    'Mai','Juni','Juli','August',
                    'September','Oktober','November','Dezember'
                ],
                dayOfWeek:[
                    "So.", "Mo", "Di", "Mi", 
                    "Do", "Fr", "Sa."
                ]
            }
        },
        timepicker:true,
        format:'d/m/Y H:i'
    };
    for(var i = 0 ; i < inputs.length; i++)
    {
        jQuery(inputs[i]).datetimepicker(conf);    
    }
}
function validarRut(rut){
    var suma=0;
    var arrRut = rut.split("-");
    var rutSolo = arrRut[0];
    if(isNaN(rutSolo))
    {
        return false;
    }
    var verif = arrRut[1];
    var continuar = true;
    for(i=2;continuar;i++){
        suma += (rutSolo%10)*i;
        rutSolo = parseInt((rutSolo /10));
        i=(i==7)?1:i;
        continuar = (rutSolo == 0)?false:true;
    }
    resto = suma%11;
    dv = 11-resto;
    if(dv==10){
        if(verif.toUpperCase() == 'K')
        return true;
    }
    else if (dv == 11 && verif == 0)
        return true;
    else if (dv == verif)
        return true;
    else
    return false;
}

function validarEmail(valor) {
  if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(valor)){
   return true;
  } else {
   return false;
  }
}

function validarNumero(numero)
{
    if(isNaN(numero))
    {
        return false;
    }
    return true;
}

function validarPatente(patente)
{
    if (/^[A-Z?]{4}-\d{2}$/.test(patente))
    {
        return true;
    }
    if (/^[A-Z?]{2}-\d{3}$/.test(patente)){
        return true;
    }
    return false;
}




function resetBotones()
{
    cambiarPropiedad($("#agregar"),"visibility","visible");
    cambiarPropiedad($("#guardar"),"visibility","hidden");
    cambiarPropiedad($("#cancelar"),"visibility","hidden");
    cambiarPropiedad($("#eliminar"),"visibility","hidden");
}

function seleccionar(div)
{
    if(div.attr("class") === "tablaFila no-seleccionado")
    {
        quitarclase(div,"no-seleccionado");
        agregarclase(div,"seleccionado");
    }
    else
    {
        quitarclase(div,"seleccionado");
        agregarclase(div,"no-seleccionado");
    }
}

function marcarCampoError(campo)
{
    var dis = typeof  campo.attr("disabled") !== "undefined";
    if(dis === false)
    {
        cambiarPropiedad(campo,"backgroundColor","red");
    }
    cambiarPropiedad(campo,"color","black");
}

function marcarCampoOk(campo)
{
    var dis = typeof  campo.attr("disabled") !== "undefined";
    if(dis === false)
    {
        cambiarPropiedad(campo,"backgroundColor","white");
    }
    cambiarPropiedad(campo,"color","black");
}

function marcarCampoDisabled(campo)
{
    var dis = typeof  campo.attr("disabled") !== "undefined";
    if(dis === false)
    {
        cambiarPropiedad(campo,"backgroundColor","silver");
    }
    cambiarPropiedad(campo,"color","black");
}

function salir()
{
    var url = urlBase + "/sesion/Logout.php";
    var success = function()
    {
        window.location.href = "index.php";
    };
    getRequest(url,success);
}

function confirmar(titulo,texto,si,no)
{
    alertify.confirm(titulo,texto,si,no).set('labels', {ok:'Si', cancel:'No'}); 
}

function cambioEjecutado()
{
    $("input").change(function()
    {
        MODIFICADO = true;
    });
    $("select").change(function()
    {
        MODIFICADO = true;
    });
    $("radio").change(function()
    {
        MODIFICADO = true;
    });
}

function marcarFilaActiva(id)
{
    quitarclase($(".fila_contenedor"),"fila_contenedor_activa");
    if(id !== '')
    {
        agregarclase($("#"+id),"fila_contenedor_activa");
    }
}

function recortar(titulo,index = 32)
{
    if(titulo.length > index )
    {
        titulo = titulo.substr(0,index) + "...";
    }
    return titulo;
}

function validarCancelar(pagina)
{
    if(MODIFICADO)
    {
        confirmar("Reinicio formulario",
        "¿Desea cancelar sin guardar los cambios?",
        function()
        {
            resetFormularioEliminar(pagina);
            resetBotones();
        },null);
    }
    else
    {
        resetFormularioEliminar(pagina);
        resetBotones();
    }
    quitarclase($(".fila_contenedor"),"fila_contenedor_activa");
}

function validarInexistencia(val,array)
{
    if(val === '')
    {
        return false;
    }
    else
    {
        for(var i = 0 ; i < array.length ; i++)
        {
            if(array[i] === val)
            {
                return false;
            }
        }
    }
    return true;
}

function abrirMenu()
{
    if(MENU_VISIBLE)
    {
        $("#btn_menu_img").attr("src","img/menu.svg");
        cambiarPropiedad($("#menu"),"width","calc(4% - 1px)");
        cambiarPropiedad($("#contenido-central"),"width","96%");
        cambiarPropiedad($(".contenido-menu"),"width","calc(30% - 10px)");
        cambiarPropiedad($(".contenido-menu"),"display","none");
        cambiarPropiedad($(".asignacion_buscador"),"margin-left","calc(37% - 24px)");
        cambiarPropiedad($(".asignacion_buscador"),"width","calc(70% - 67px)");
        MENU_VISIBLE = false;
    }
    else
    {
        $("#btn_menu_img").attr("src","img/cancelar.svg");
        cambiarPropiedad($("#menu"),"width","calc(15% - 1px)");
        cambiarPropiedad($("#menu"),"max-width","200px");
        cambiarPropiedad($("#contenido-central"),"width","calc(89% - 60px)");
        cambiarPropiedad($(".contenido-menu"),"width","calc(90% - 10px)");
        cambiarPropiedad($(".contenido-menu"),"display","block");
        cambiarPropiedad($(".asignacion_buscador"),"margin-left","calc(37% - 21px)");
        cambiarPropiedad($(".asignacion_buscador"),"width","calc(70% - 59px)");
        MENU_VISIBLE = true;

    }
}

function abrirTooltip(tooltip)
{
    cambiarPropiedad($("#"+tooltip),"display","block");
}

function cerrarTooltip(tooltip)
{
    cambiarPropiedad($("#"+tooltip),"display","none");
}

function marcarCampoNoAplicable()
{
    return "-";
}

function enviarCorreoPassword(mail,password)
{
    var url = urlUtil + "/enviarMail.php";
    var asunto = "Envio de password";
    var mensaje = "Estimado, su password para uso de aplicacion es la siguiente ";
    var params = {email : mail,asunto : asunto, mensaje : mensaje, extra : password};
    var success = function(response)
    {
        alertify.success("Password enviada al correo "+mail);
    };
    postRequest(url,params,success);
}

function verAdjunto(valor,i)
{
    if(valor !== '')
    {
        $("#contratoOculta"+i).val(valor);
        var enlace = "<a href=\"source/util/pdf/"+valor+"\" target=\"_blanck\">Ver</a>";
        $("#contenedor_contrato"+i).html(enlace);
    }
}

function abrirTooltip(tooltip)
{
    cambiarPropiedad($("#"+tooltip),"display","block");
}

function cerrarTooltip(tooltip)
{
    cambiarPropiedad($("#"+tooltip),"display","none");
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function exportar(data,params)
{
    location.href= urlBase + "/"+data+".php?"+params;
}

function obtenerEstadoServicio(servicio)
{
    if(servicio === CREADO)
    {
        return "Creado"; 
    }
    else if(servicio === EN_PROCCESO_DE_ASIGNACION)
    {
        return "En proceso de asignaci&oacute;n";            
    }
    else if(servicio === ASIGNADO)
    {
        return "Asignado";     
    }
    else if(servicio === ACEPTADO)
    {
        return "Aceptado";            
    }
    else if(servicio === EN_PROGRESO)
    {
        return "En Ruta";
    }
    else if(servicio === FINALIZADO)
    {
        return "Finalizado"; 
    }
}

function eliminarDivLoader() {
    $("#windowLoad").remove();
 
}

function mostrarDivLoader() {
    eliminarDivLoader();
    height = 20;
    var ancho = 0;
    var alto = 0;
     if (window.innerWidth === undefined) ancho = window.screen.width;
    else ancho = window.innerWidth;
    if (window.innerHeight === undefined) alto = window.screen.height;
    else alto = window.innerHeight;
    var heightdivsito = alto/2 - parseInt(height)/2;
    imgCentro = "<div style='text-align:center;height:" + alto + "px;'><div  style='color:#fff;margin-top:" + heightdivsito + "px; font-size:30px;font-weight:bold'><img width=\"50\" height=\"50\" src=\"img/loading.gif\"></div></div>";
    div = document.createElement("div");
    div.id = "windowLoad";
    div.style.width = ancho + "px";
    div.style.height = alto + "px";
    $("body").append(div);
    input = document.createElement("input");
    input.id = "focusInput";
    input.type = "text";
    $("#windowLoad").append(input);
    $("#focusInput").focus();
    $("#focusInput").hide();
    $("#windowLoad").html(imgCentro);
 
}