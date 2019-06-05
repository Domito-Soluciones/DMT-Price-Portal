<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/ParticionDao.php';
include '../../log/Log.php';

header('Content-Type: application/json');
$busqueda = filter_input(INPUT_POST, 'busqueda');
$categoria = filter_input(INPUT_POST, 'categoria');
$particionDao = new ParticionDao();
$particiones = $particionDao->getParticiones($busqueda,$categoria);
echo "[";
for ($i = 0 ; $i < count($particiones); $i++)
{
    $cId = $particiones[$i]->getId();
    $nombre = $particiones[$i]->getNombre();
    $descripcion = $particiones[$i]->getDescripcion();
    $valor = $particiones[$i]->getValor();
    $categoria = $particiones[$i]->getCategoria();
    echo "{\"particion_id\":$cId,"
        . "\"particion_nombre\":\"".$nombre."\","
        . "\"particion_descripcion\":\"".$descripcion."\","
        . "\"particion_valor\":\"".$valor."\","
        . "\"particion_categoria\":$categoria"
        . "}";
    if (($i+1) != count($particiones))
    {
        echo ",";
    }
}
echo "]";
Log::write_log("GETPARTICIONES", 0);