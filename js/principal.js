/* global MENU_VISIBLE */

var NICK_GLOBAL;
var menus = new Map();

$(document).ready(function(){
    
    setMenuMap();
    TIPO_USUARIO = 'ADMIN';
    $("#menu").load("menu.php", function( response, status, xhr ) {
        agregarclase($("#principal"),"menu-activo");

        $(".opcion-menu").mouseover(function (){
            if(!MENU_VISIBLE)
            {
                abrirTooltip("tooltip_"+$(this).attr("id"));
            }
        });

        $(".opcion-menu").mouseout(function (){
            cerrarTooltip("tooltip_"+$(this).attr("id"));
        });

    });    
    $("#contenido-central").load("home.html");
    getUsuario();
    getfecha();
    setInterval(function(){getfecha();},5000);

    $("#menu-telefono").click(function(){
        if($("#menu-telefono").attr('src') === 'img/menu.svg')
        {
            cambiarPropiedad($("#menu"),"display","block");
            $("#menu-telefono").attr("src","img/cancelar.svg");
        }
        else
        {
            cambiarPropiedad($("#menu"),"display","none");
            $("#menu-telefono").attr("src","img/menu.svg");
        }
    });

    $("#btn_menu").click(function () {
        abrirMenu();
    });

    $("#enlace-salir").click(function() {
        salir();
    }); 
});

function setMenuMap()
{
    menus.set("HOME","home");
    menus.set("PANEL","panel");
    menus.set("VEHICULOS","movil");
    menus.set("CONDUCTORES","conductor");
    menus.set("CLIENTES","cliente");
    menus.set("PASAJEROS","pasajero");
    menus.set("SERVICIOS","servicios");
    menus.set("MONITOREO","monitoreo");
    menus.set("REPORTES","reportes");
    menus.set("LIQUIDACION","liquidaciones");
    menus.set("RENDICIONES","rendiciones");
    menus.set("CONTRATOS","contrato");
    menus.set("TARIFAS","tarifa");
    menus.set("AGENTES","agente");
    menus.set("CONFIGURACION","configuracion");
}