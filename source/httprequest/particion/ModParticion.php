<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/ParticionDao.php';
include '../../log/Log.php';

header('Content-Type: application/json');
$id = filter_input(INPUT_POST, 'id');
$nombre = filter_input(INPUT_POST, 'nombre');
$descripcion = filter_input(INPUT_POST, 'descripcion');
$valor = filter_input(INPUT_POST, 'valor');
$categoria = filter_input(INPUT_POST, 'categoria');
$particion = new Particion();
$particion->setId($id);
$particion->setNombre($numero);
$particion->setDescripcion($descripcion);
$particion->setValor($valor);
$particion->setCategoria($categoria);
$particionDao = new ParticionDao();
$particionId = $particionDao->modificarParticion($particion);
echo "{\"particion_id\":\"".$particion->getId()."\"}";
Log::write_log("MODPARTICION", 0);