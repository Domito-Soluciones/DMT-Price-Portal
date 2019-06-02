<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/UsuarioDao.php';
include '../../cripto/Cripto.php';
include '../../log/Log.php';

header('Content-Type: application/json');
$nick = filter_input(INPUT_POST, 'nick');
$password = base64_encode(Cripto::encriptar(filter_input(INPUT_POST, 'password')));
$perfil = filter_input(INPUT_POST, 'perfil');
$usuario = new Usuario();
$usuario->setNick($nick);
$usuario->setClave($password);
$usuario->setPerfil($perfil);
$usuarioDao = new UsuarioDao();
$usuarioId = $usuarioDao->agregarUsuario($usuario);
echo "{\"cliente_id\":\"".$usuarioId."\"}";
Log::write_log("ADDUSUARIO", 0);