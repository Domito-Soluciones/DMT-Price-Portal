<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/CentroCostoDao.php';
include '../../log/Log.php';

header('Content-Type: application/json');
$busqueda = filter_input(INPUT_POST, 'busqueda');
$categoria = filter_input(INPUT_POST, 'categoria');
$centroCostoDao = new CentroCostoDao();
$centrosCosto = $centroCostoDao->getCentrosCosto($busqueda,$categoria);
echo "[";
for ($i = 0 ; $i < count($centrosCosto); $i++)
{
    $cId = $centrosCosto[$i]->getId();
    $nombre = $centrosCosto[$i]->getNombre();
    $descripcion = $centrosCosto[$i]->getDescripcion();
    $nivel = $centrosCosto[$i]->getNivel();
    $categoria = $centrosCosto[$i]->getCategoria();
    echo "{\"centrocosto_id\":$cId,"
        . "\"centrocosto_nombre\":\"".$nombre."\","
        . "\"centrocosto_descripcion\":\"".$descripcion."\","
        . "\"centrocosto_nivel\":$nivel,"
        . "\"centrocosto_categoria\":$categoria"
        . "}";
    if (($i+1) != count($centrosCosto))
    {
        echo ",";
    }
}
echo "]";
Log::write_log("GETUSUARIOS", 0);