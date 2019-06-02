<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/DashBoardDao.php';
include '../../log/Log.php';

header('Content-Type: application/json');
$dashboardDao = new DashBoardDao();
$servicios = $dashboardDao->getServicios();
$serviciosConvenio = $dashboardDao->getServiciosConvenio();
$produccionDiaria = $dashboardDao->getProduccionDiaria();
$produccionMensual = $dashboardDao->getProduccionMensual();
$produccionMInternos = $dashboardDao->getProduccionMInternos();
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
$vehiculos = $dashboardDao->getMovilesActivos();
$activos = 0;
$inactivos = 0;
$serviciosDiarios = 0;
if(isset($vehiculos[0]))
{
   $activos = $vehiculos[0];
}
if(isset($vehiculos[1]))
{
   $inactivos = $vehiculos[1];
}
if(isset($servicios[0]))
{
   $serviciosDiarios = $servicios[0];
}
echo "{\"movil_activo\":\"".$activos."\","
    . "\"movil_inactivo\":\"".$inactivos."\","
    . "\"servicio_finalizado\":\"".$serviciosFinalizados."\","        
    . "\"servicio_ruta\":\"".$serviciosEnRuta."\","        
    . "\"servicio_realizar\":\"".$serviciosPorRealizar."\","
    . "\"servicio_asignar\":\"".$serviciosPorAsignar."\","
    . "\"produccion_diaria\":\"".$produccionDiaria."\","
    . "\"produccion_mensual\":\"".$produccionMensual."\","
    . "\"produccion_minterno\":\"".$produccionMInternos."\","
    . "\"servicio_convenios\":[";
    for($j = 0 ; $j < count($serviciosConvenio);$j++)
    {
        $aux = explode("%", $serviciosConvenio[$j]);
        echo "{"
            . "\"convenio_nombre\":\"".$aux[0]."\","
            . "\"convenio_cantidad\":\"".$aux[1]."\""
        . "}";
        if (($j+1) != count($serviciosConvenio))
        {
            echo ",";
        }
    }
        echo "]";
   echo "}";
   Log::write_log("GETDASHBOARD", 0);