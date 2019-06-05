<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/CentroCostoDao.php';
include '../../log/Log.php';

header('Content-Type: application/json');
$nombre = filter_input(INPUT_POST, 'nombre');
$descripcion = filter_input(INPUT_POST, 'descripcion');
$nivel = filter_input(INPUT_POST, 'nivel');
$categoria = filter_input(INPUT_POST, 'categoria');
$centroCosto = new CentroCosto();
$centroCosto->setNombre($nombre);
$centroCosto->setDescripcion($descripcion);
$centroCosto->setNivel($nivel);
$centroCosto->setCategoria($categoria);
$centroCostoDao = new CentroCostoDao();
$centroCostoId = $centroCostoDao->agregarCentroCosto($centroCosto);
echo "{\"centro_costo_id\":\"".$centroCostoId."\"}";
Log::write_log("ADDCENTROCOSTO", 0);