<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/ParticionDao.php';
include '../../log/Log.php';

header('Content-Type: application/json');
$nombre = filter_input(INPUT_POST, 'nombre');
$descripcion = filter_input(INPUT_POST, 'descripcion');
$valor = filter_input(INPUT_POST, 'valor');
$categoria = filter_input(INPUT_POST, 'categoria');
$particion = new Particion();
$particion->setNombre($nombre);
$particion->setDescripcion($descripcion);
$particion->setValor($valor);
$particion->setCategoria($categoria);
$particionDao = new ParticionDao();
$particionId = $particionDao->agregarParticion($particion);
echo "{\"particion_id\":\"".$particionId."\"}";
Log::write_log("ADDPARTICION", 0);