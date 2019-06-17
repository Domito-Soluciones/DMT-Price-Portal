/* global urlBase */
var PAGINA = "HOME";
var options = {};

$(document).ready(function(){
    PAGINA_ANTERIOR = PAGINA;
    getDashBoard();
});

function generarGraficoDona(canvas,data,options)
{    
    new Chart(canvas, {
        type: 'doughnut',
        data: data,
        options: options
    });
}

function getDashBoard()
{
    var url = urlBase + "/dashboard/GetDashBoard.php";
    var params = {};
    var success = function(response)
    {
        $("#gDiario").html(response.gasto_diario === '' ? '$ 0' : '$ '+response.gasto_diario);
        $("#gSemana").html(response.gasto_semanal === '' ? '$ 0' : '$ '+response.gasto_semanal);
        $("#gMes").html(response.gasto_mensual === '' ? '$ 0' : '$ '+response.gasto_mensual);
        $("#userDesac").html(response.usuarios_desac);
        $("#extDesac").html(response.extensiones_desac);
        var cont = $("#gCC");
        if(response.gastos_cc.length === 0)
        {
            cont.append("<div class=\"mensaje_bienvenida\" style=\"padding-top: 20%\">No hay datos registrados</div>");
        }
        for(var i = 0 ; i < response.gastos_cc.length;i++)
        {
            var aux = response.gastos_cc[i];
            cont.append("<div><div class=\"titulo_barra\">"+aux.centrocosto_nombre+"</div><div class=\"barra\" id=\"barra"+i+"\"></div><div class=\"fin_barra\">"+aux.centrocosto_gasto+"</div></div>");
            cambiarPropiedad($("#barra"+i),"width","100px");
        }
    };
    postRequest(url,params,success);
}

function generarGraficoBarra(canvas,data,options)
{
    new Chart(canvas, {
        type: 'horizontalBar',
        data: data,
        options: options
    });
}

