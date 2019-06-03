<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/ExtensionDao.php';
include '../../log/Log.php';

header('Content-Type: application/json');
$numero = filter_input(INPUT_POST, 'extension');
$descripcion = filter_input(INPUT_POST, 'descripcion');
$particion = filter_input(INPUT_POST, 'particion');
$extension = new Extension();
$extension->setNumero($numero);
$extension->setDescripcion($descripcion);
$extension->setParticion($particion);
$extensionDao = new ExtensionDao();
$extensionId = $extensionDao->agregarExtension($extension);
echo "{\"extension_id\":\"".$extensionId."\"}";
Log::write_log("ADDEXTENSION", 0);