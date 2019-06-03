<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/UsuarioDao.php';
include '../../log/Log.php';

header('Content-Type: application/json');
$busqueda = filter_input(INPUT_POST, 'busqueda');
$usuarioDao = new UsuarioDao();
$usuarios = $usuarioDao->getUsuarios($busqueda);
echo "[";
for ($i = 0 ; $i < count($usuarios); $i++)
{
    $cId = $usuarios[$i]->getId();
    $nick = $usuarios[$i]->getNick();
    $perfil = $usuarios[$i]->getPerfil();
    echo "{\"usuario_id\":\"".$cId."\","
        . "\"usuario_nick\":\"".$nick."\","
        . "\"usuario_perfil\":\"".$perfil."\""
        . "}";
    if (($i+1) != count($usuarios))
    {
        echo ",";
    }
}
echo "]";
Log::write_log("GETUSUARIOS", 0);