<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/CentroCostoDao.php';
include '../../log/Log.php';

header('Content-Type: application/json');
$id = filter_input(INPUT_POST, 'id');
$nombre = filter_input(INPUT_POST, 'nombre');
$descripcion = filter_input(INPUT_POST, 'descripcion');
$nivel = filter_input(INPUT_POST, 'nivel');
$categoria = filter_input(INPUT_POST, 'categoria');
$centrocosto = new CentroCosto();
$centrocosto->setId($id);
$centrocosto->setNombre($nombre);
$centrocosto->setDescripcion($descripcion);
$centrocosto->setNivel($nivel);
$centrocosto->setCategoria($categoria);
$centrocostoDao = new CentroCostoDao();
$centrocostoDao->modificarCentroCosto($centrocosto);
echo "{\"centrocosto_id\":\"".$centrocosto->getId()."\"}";
Log::write_log("MODUSUARIO", 0);