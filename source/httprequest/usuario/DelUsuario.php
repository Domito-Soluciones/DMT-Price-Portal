<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/UsuarioDao.php';
include '../../log/Log.php';

header('Content-Type: application/json');
$id = filter_input(INPUT_POST, 'id');
$usuarioDao = new UsuarioDao();
$usuarioDao->eliminarUsuario($id);
echo "{\"usuario_eliminado\":\"".$id."\"}";
Log::write_log("DELUSUARIO", 0);
