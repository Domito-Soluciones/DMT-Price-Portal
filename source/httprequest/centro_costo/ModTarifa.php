<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/TarifaDao.php';
include '../../log/Log.php';

header('Content-Type: application/json');
$id = filter_input(INPUT_POST, 'id');
$descripcion = filter_input(INPUT_POST, 'descripcion');
$numero = filter_input(INPUT_POST, 'numero');
$hora = filter_input(INPUT_POST, 'hora');
$nombre = filter_input(INPUT_POST, 'nombre');
$origen = filter_input(INPUT_POST, 'origen');
$destino = filter_input(INPUT_POST, 'destino');
$valor1 = filter_input(INPUT_POST, 'valor1');
$valor2 = filter_input(INPUT_POST, 'valor2');
$cliente = filter_input(INPUT_POST, 'cliente');
$tipo = filter_input(INPUT_POST, 'tipo');
$horario = filter_input(INPUT_POST, 'horario');
$tarifa = new Tarifa();
$tarifa->setId($id);
$tarifa->setDescripcion($descripcion);
$tarifa->setNumero($numero);
$tarifa->setHora($hora);
$tarifa->setNombre($nombre);
$tarifa->setOrigen($origen);
$tarifa->setDestino($destino);
$tarifa->setValor1($valor1);
$tarifa->setValor2($valor2);
$tarifa->setCliente($cliente);
$tarifa->setTipo($tipo);
$tarifa->setHorario($horario);
$tarifaDao = new TarifaDao();
$tarifaDao->modificarTarifa($tarifa);
echo "{\"tarifa_id\":\"".$tarifa->getId()."\"}";
Log::write_log("MODTARIFA", 0);