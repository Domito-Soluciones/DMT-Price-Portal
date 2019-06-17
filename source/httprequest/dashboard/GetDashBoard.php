<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/DashBoardDao.php';
include '../../log/Log.php';

header('Content-Type: application/json');
$dashboardDao = new DashBoardDao();
$gastos = $dashboardDao->getGastos();
$gastoDiario = $gastos[0];
$gastoSemanal = $gastos[1];
$gastoMensual = $gastos[2];
$gastosCC = $dashboardDao->getGastosCC();
$usuariosDesasociados = $dashboardDao->getUsuariosDesasociados();
$extensionesDesasociadas = $dashboardDao->getExtensionesDesasociadas();
echo "{\"gasto_diario\":\"".$gastoDiario."\","
    . "\"gasto_semanal\":\"".$gastoSemanal."\","
    . "\"gasto_mensual\":\"".$gastoMensual."\","
    . "\"usuarios_desac\":\"".$usuariosDesasociados."\","        
    . "\"extensiones_desac\":\"".$extensionesDesasociadas."\","
    . "\"gastos_cc\":[";
    for($j = 0 ; $j < count($gastosCC);$j++)
    {
        $aux = explode("%", $gastosCC[$j]);
        echo "{"
            . "\"centrocosto_nombre\":\"".$aux[0]."\","
            . "\"centrocosto_gasto\":\"".$aux[1]."\""
        . "}";
        if (($j+1) != count($gastosCC))
        {
            echo ",";
        }
    }
        echo "]";
   echo "}";
   Log::write_log("GETDASHBOARD", 0);