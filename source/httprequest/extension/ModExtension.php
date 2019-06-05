<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/ExtensionDao.php';
include '../../log/Log.php';

header('Content-Type: application/json');
$id = filter_input(INPUT_POST, 'id');
$numero = filter_input(INPUT_POST, 'numero');
$descripcion = filter_input(INPUT_POST, 'descripcion');
$categoria = filter_input(INPUT_POST, 'categoria');
$extension = new Extension();
$extension->setId($id);
$extension->setNumero($numero);
$extension->setDescripcion($descripcion);
$extension->setCategoria($categoria);
$extensionDao = new ExtensionDao();
$extensionId = $extensionDao->modificarExtension($extension);
echo "{\"extension_id\":\"".$extension->getId()."\"}";
Log::write_log("MODEXTENSION", 0);