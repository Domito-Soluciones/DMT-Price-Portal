<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/UsuarioDao.php';
include '../../log/Log.php';

header('Content-Type: application/json');
$id = filter_input(INPUT_POST, 'id');
$nombre = filter_input(INPUT_POST, 'nombre');
$descripcion = filter_input(INPUT_POST, 'descripcion');
$categoria = filter_input(INPUT_POST, 'categoria');
$usuario = new Usuario();
$usuario->setId($id);
$usuario->setNombre($nombre);
$usuario->setDescripcion($descripcion);
$usuario->setCategoria($categoria);
$usuarioDao = new UsuarioDao();
$usuarioId = $usuarioDao->modificarUsuario($usuario);
echo "{\"usuario_id\":\"".$usuario->getId()."\"}";
Log::write_log("MODUSUARIO", 0);