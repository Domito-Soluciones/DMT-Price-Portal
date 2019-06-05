<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/SesionDao.php';
include '../../log/Log.php';

header('Content-Type: application/json');
$busqueda = filter_input(INPUT_POST, 'busqueda');
$sesionDao = new SesionDao();
$sesiones = $sesionDao->getSesiones($busqueda);
echo "[";
for ($i = 0 ; $i < count($sesiones); $i++)
{
    $cId = $sesiones[$i]->getId();
    $nick = $sesiones[$i]->getNick();
    $perfil = $sesiones[$i]->getPerfil();
    echo "{\"sesion_id\":\"".$cId."\","
        . "\"sesion_nick\":\"".$nick."\","
        . "\"sesion_perfil\":\"".$perfil."\""
        . "}";
    if (($i+1) != count($sesiones))
    {
        echo ",";
    }
}
echo "]";
Log::write_log("GETSESIONES", 0);