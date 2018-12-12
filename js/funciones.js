
var bordeAzul = "solid 1px #0b41d3";
var bordeRojo = "solid 1px red";
var bordeBlanco = "solid 1px white";
var urlBase= "source/httprequest";
var urlUtil= "source/util";


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

function postRequest(url,success)
{
    $.ajax({
        url: url,
        method:'POST',
        cache: false,
        beforeSend: function (xhr) {
            cambiarPropiedad($("#loaderCentral"),"visibility","visible");
        },
        success: success,
        error: function (resposeError)
        {
            $("#error").text(resposeError);
            cambiarPropiedad($("#loaderCentral"),"visibility","hidden");
        }
    });
}
function getRequest(url,success)
{
    $.ajax({
        url: url,
        method:'GET',
        success: success,
        beforeSend: function (xhr) {
            cambiarPropiedad($("#loader"),"visibility","visible");
        },
        error: function (resposeError)
        {
            cambiarPropiedad($("#loader"),"visibility","hidden");
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

function validarCamposOr(array)
{
    for (var i = 0 ; i < array.length; i++)
    {
        if(array[i] === undefined || array[i] === '')
        {
            return false;
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
    if(cont == array.length)
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

function cambiarModulo(pagina,cambiar)
{
    if(cambiar)
    {
        quitarclase($(".opcion-menu"),"menu-activo");
        agregarclase($("#"+pagina),"menu-activo");
    }
    $("#contenido-central").load(pagina+".html");
}

function cerrarSession(response)
{
    if(response === 'return')
    {
        alertify.error('sesion expirada');
        location.href = "index.php";
        return;
    }
}

function vaciarFormulario(div)
{
    div.each(function() {
        $(this).val("");
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
    }
    getRequest(url,success);
}

function mensajeBienvenida(mensaje)
{
    $("#contenedor_central").html("<div class=\"contenedor-loaderCentral\">\n\
                                    <div class=\"loaderCentral\" id=\"loader\"\n\
                                    style=\"visibility=\"hidden\"\">Loading...</div>\n\
                                    </div><div class=\"mensaje_bienvenida\">\n\
                                    SELECCIONE OPCIONES PARA AGREGAR EDITAR Y/O MODIFICAR "+mensaje+"</div>");
}

function resetFormulario(pagina) 
{
    $("#contenedor_central").html("");
    mensajeBienvenida(pagina);
}

function abrirFile(e,obj){
    e.preventDefault();
    obj.trigger("click");
}

function subirFichero(event,form,url,success)
{
    $.ajax({
        async: true,
        type: 'POST',
        url: url,
        data: new FormData(form[0]),
        cache: false,
        contentType: false,
        processData: false,
        success: success
    });
    event.preventDefault();
}

function enviarFormFile(file,hidden,form)
{   
    var filename = file.replace(/.*(\/|\\)/, '');
    hidden.val(filename);
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
