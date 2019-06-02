<?php
include '../../util/validarPeticion.php';
include '../../query/UsuarioDao.php';
include '../../cripto/Cripto.php';
include '../../log/Log.php';

header('Content-Type: application/json');
$respuesta = '0';
$nombre = filter_input(INPUT_POST, 'usuario');
$password = base64_encode(Cripto::encriptar(filter_input(INPUT_POST, 'password')));
$usuarioDao = new UsuarioDao();
$usuario = $usuarioDao->getUsuario($nombre, $password);
if ($usuario->getId() > 0)
{
    session_start();
    $_SESSION['usuario']=$usuario->getId();
    $_SESSION['nick']=$usuario->getNick();
    $_SESSION['tipo']=$usuario->getPerfil();
    $respuesta = $_SESSION['usuario'];
    echo "{\"usuario_id\":".$respuesta.",\"usuario_tipo\":".$usuario->getPerfil()."}";
}
else
{
    echo "{\"usuario_id\":".$respuesta."}";
}
Log::write_log("LOGIN", 0);