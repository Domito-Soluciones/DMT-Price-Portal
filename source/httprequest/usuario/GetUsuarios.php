<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/UsuarioDao.php';
include '../../log/Log.php';

header('Content-Type: application/json');
$busqueda = filter_input(INPUT_POST, 'busqueda');
$categoria = filter_input(INPUT_POST, 'categoria');
$usuarioDao = new UsuarioDao();
$usuarios = $usuarioDao->getUsuarios($busqueda,$categoria);
echo "[";
for ($i = 0 ; $i < count($usuarios); $i++)
{
    $cId = $usuarios[$i]->getId();
    $nombre = $usuarios[$i]->getNombre();
    $descripcion = $usuarios[$i]->getDescripcion();
    $categoria = $usuarios[$i]->getCategoria();
    echo "{\"usuario_id\":$cId,"
        . "\"usuario_nombre\":\"".$nombre."\","
        . "\"usuario_descripcion\":\"".$descripcion."\","
        . "\"usuario_categoria\":$categoria"
        . "}";
    if (($i+1) != count($usuarios))
    {
        echo ",";
    }
}
echo "]";
Log::write_log("GETUSUARIOS", 0);