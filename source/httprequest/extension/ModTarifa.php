<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/ExtensionDao.php';
include '../../log/Log.php';

header('Content-Type: application/json');
$id = filter_input(INPUT_POST, 'id');
$numero = filter_input(INPUT_POST, 'extension');
$descripcion = filter_input(INPUT_POST, 'descripcion');
$particion = filter_input(INPUT_POST, 'particion');
$extension = new Extension();
$extension->setId($id);
$extension->setNumero($numero);
$extension->setDescripcion($descripcion);
$extension->setParticion($particion);
$extensionDao = new ExtensionDao();
$extensionId = $extensionDao->modificarExtension($extension);
echo "{\"extension_id\":\"".$tarifa->getId()."\"}";
Log::write_log("MODEXTENSION", 0);