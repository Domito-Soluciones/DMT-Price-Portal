<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/ExtensionDao.php';
include '../../log/Log.php';

header('Content-Type: application/json');
$busqueda = filter_input(INPUT_POST, 'busqueda');
$extensionDao = new ExtensionDao();
$extensiones = $extensionDao->getExtensiones($busqueda);
echo "[";
for ($i = 0 ; $i < count($extensiones); $i++)
{
    $cId = $extensiones[$i]->getId();
    $numero = $extensiones[$i]->getNumero();
    $descripcion = $extensiones[$i]->getDescripcion();
    $particion = $extensiones[$i]->getParticion();
    echo "{\"extension_id\":\"".$cId."\","
        . "\"extension_numero\":\"".$numero."\","
        . "\"extension_descripcion\":\"".$descripcion."\","
        . "\"extension_particion\":\"".$particion."\""
        . "}";
    if (($i+1) != count($extensiones))
    {
        echo ",";
    }
}
echo "]";
Log::write_log("GETEXTENSIONES", 0);