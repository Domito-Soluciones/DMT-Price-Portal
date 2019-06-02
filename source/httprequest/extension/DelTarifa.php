<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/TarifaDao.php';
include '../../log/Log.php';

header('Content-Type: application/json');
$nombre = filter_input(INPUT_POST, 'nombre');
$tarifaDao = new TarifaDao();
$tarifaDao->eliminarTarifa($nombre);
echo "{\"tarifa_eliminada\":\"".$nombre."\"}";
Log::write_log("DELTARIFA", 0);