<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/UsuarioDao.php';
include '../../log/Log.php';

header('Content-Type: application/json');
$nombre = filter_input(INPUT_POST, 'nombre');
$descripcion = filter_input(INPUT_POST, 'descripcion');
$categoria = filter_input(INPUT_POST, 'categoria');
$usuario = new Usuario();
$usuario->setNombre($nombre);
$usuario->setDescripcion($descripcion);
$usuario->setCategoria($categoria);
$usuarioDao = new UsuarioDao();
$usuarioId = $usuarioDao->agregarUsuario($usuario);
echo "{\"usuario_id\":\"".$usuarioId."\"}";
Log::write_log("ADDUSUARIO", 0);