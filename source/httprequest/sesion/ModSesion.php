<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/UsuarioDao.php';
include '../../cripto/Cripto.php';
include '../../log/Log.php';

header('Content-Type: application/json');
$usuarioId = filter_input(INPUT_POST, 'id');
$nick = filter_input(INPUT_POST, 'nick');
$password = '';
if(filter_input(INPUT_POST, 'password') != ''){
    $password = base64_encode(Cripto::encriptar(filter_input(INPUT_POST, 'password')));
}
$perfil = filter_input(INPUT_POST, 'perfil');
$usuario = new Usuario();
$usuario->setId($usuarioId);
$usuario->setNick($nick);
$usuario->setClave($password);
$usuario->setPerfil($perfil);
$usuarioDao = new UsuarioDao();
$usuarioDao->modificarUsuario($usuario);
echo "{\"usuario_id\":\"".$usuario->getId()."\"}";
Log::write_log("MODUSUARIO", 0);
