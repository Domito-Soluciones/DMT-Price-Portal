<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/ExtensionDao.php';
include '../../log/Log.php';

header('Content-Type: application/json');
$id = filter_input(INPUT_POST, 'id');
$extensionDao = new ExtensionDao();
$extensionDao->eliminarExtension($id);
echo "{\"extension_eliminada\":\"".$id."\"}";
Log::write_log("DELEXTENSION", 0);