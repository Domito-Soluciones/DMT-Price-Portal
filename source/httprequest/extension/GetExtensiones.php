<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/ExtensionDao.php';
include '../../log/Log.php';

header('Content-Type: application/json');
$busqueda = filter_input(INPUT_POST, 'busqueda');
$categoria = filter_input(INPUT_POST, 'categoria');
$extensionDao = new ExtensionDao();
$extensiones = $extensionDao->getExtensiones($busqueda,$categoria);
echo "[";
for ($i = 0 ; $i < count($extensiones); $i++)
{
    $cId = $extensiones[$i]->getId();
    $numero = $extensiones[$i]->getNumero();
    $descripcion = $extensiones[$i]->getDescripcion();
    $categoria = $extensiones[$i]->getCategoria();
    $usuario = $extensiones[$i]->getUsuario();
    echo "{\"extension_id\":$cId,"
        . "\"extension_numero\":\"".$numero."\","
        . "\"extension_descripcion\":\"".$descripcion."\","
        . "\"extension_categoria\":$categoria,"
        . "\"extension_usuario\":\"".$usuario."\""
        . "}";
    if (($i+1) != count($extensiones))
    {
        echo ",";
    }
}
echo "]";
Log::write_log("GETEXTENSIONES", 0);