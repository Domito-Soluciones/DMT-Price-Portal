<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/ParticionDao.php';
include '../../log/Log.php';

header('Content-Type: application/json');
$id = filter_input(INPUT_POST, 'id');
$particionDao = new ParticionDao();
$particionDao->eliminarParticion($id);
echo "{\"particion_eliminada\":\"".$id."\"}";
Log::write_log("DELPARTICION", 0);