<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/CentroCostoDao.php';
include '../../log/Log.php';

header('Content-Type: application/json');
$id = filter_input(INPUT_POST, 'id');
$centroCostoDao = new CentroCostoDao();
$centroCostoDao->eliminarCentroCosto($id);
echo "{\"centro_costo_eliminado\":\"".$id."\"}";
Log::write_log("DELCENTROCOSTO", 0);