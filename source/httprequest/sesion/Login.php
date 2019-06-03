<?php
include '../../util/validarPeticion.php';
include '../../query/SesionDao.php';
include '../../cripto/Cripto.php';
include '../../log/Log.php';

header('Content-Type: application/json');
$respuesta = '0';
$nombre = filter_input(INPUT_POST, 'usuario');
$password = base64_encode(Cripto::encriptar(filter_input(INPUT_POST, 'password')));
$sesionDao = new SesionDao();
$sesion = $sesionDao->getSesion($nombre, $password);
if ($sesion->getId() > 0)
{
    session_start();
    $_SESSION['usuario']=$sesion->getId();
    $_SESSION['nick']=$sesion->getNick();
    $_SESSION['tipo']=$sesion->getPerfil();
    $respuesta = $_SESSION['usuario'];
    echo "{\"sesion_id\":".$respuesta.",\"sesion_tipo\":".$sesion->getPerfil()."}";
}
else
{
    echo "{\"sesion_id\":".$respuesta."}";
}
Log::write_log("LOGIN", 0);