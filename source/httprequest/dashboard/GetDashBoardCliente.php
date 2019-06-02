<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/DashBoardDao.php';
include '../../log/Log.php';

header('Content-Type: application/json');
$cliente = filter_input(INPUT_POST, "cliente");
$dashboardDao = new DashBoardDao();
$servicios = $dashboardDao->getServiciosCliente($cliente);
$serviciosCC = $dashboardDao->getServiciosCentroCosto();
$gananciasCC = $dashboardDao->getGastoCentroCosto();
$serviciosFinalizados = 0;
$serviciosEnRuta = 0;
$serviciosPorRealizar = 0;
$serviciosPorAsignar = 0;
for($i = 0 ; $i < count($servicios); $i++)
{
    $aux = explode("%",$servicios[$i]);
    if($aux[0] == '1')
    {
        $serviciosPorAsignar = $aux[1];
    }
    else if($aux[0] == '3')
    {
        $serviciosPorRealizar = $aux[1];
    }
    else if($aux[0] == '4')
    {
        $serviciosEnRuta = $aux[1];
    }
    else if($aux[0] == '5')
    {
        $serviciosFinalizados = $aux[1];
    }
}
$serviciosDiarios = 0;
if(isset($servicios[0]))
{
   $serviciosDiarios = $servicios[0];
}
echo "{\"servicio_finalizado\":\"".$serviciosFinalizados."\","        
    . "\"servicio_ruta\":\"".$serviciosEnRuta."\","        
    . "\"servicio_realizar\":\"".$serviciosPorRealizar."\","
    . "\"servicio_asignar\":\"".$serviciosPorAsignar."\","
    . "\"servicio_cc\":[";
    for($j = 0 ; $j < count($serviciosCC);$j++)
    {
        $aux = explode("%", $serviciosCC[$j]);
        echo "{"
            . "\"cc_nombre\":\"".$aux[0]."\","
            . "\"cc_cantidad\":\"".$aux[1]."\""
        . "}";
        if (($j+1) != count($serviciosCC))
        {
            echo ",";
        }
    }
        echo "],";
   echo "\"ganancia_cc\":[";
    for($j = 0 ; $j < count($gananciasCC);$j++)
    {
        $aux = explode("%", $gananciasCC[$j]);
        echo "{"
            . "\"cc_nombre\":\"".$aux[0]."\","
            . "\"cc_cantidad\":\"".$aux[1]."\""
        . "}";
        if (($j+1) != count($gananciasCC))
        {
            echo ",";
        }
    }
        echo "]";
   echo "}";
   Log::write_log("GETDASHBOARDCLIENTE", 0);