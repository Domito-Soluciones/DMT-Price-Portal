<?php
include '../../util/validarPeticion.php';
include '../../query/LlamadaDao.php';
include '../../log/Log.php';

header('Content-Type: application/json; charset=utf-8');
$id = filter_input(INPUT_POST, 'id');
$extension = filter_input(INPUT_POST, 'extension');
$contraparte = filter_input(INPUT_POST, 'contraparte');
$tipo = filter_input(INPUT_POST, 'tipo');
$desde = '';
if(filter_input(INPUT_POST, 'desde') != '')
{
    $desde = DateTime::createFromFormat('d/m/Y h:i', filter_input(INPUT_POST, 'desde'))->format('Y/m/d h:i');
}
else
{
    $desde = filter_input(INPUT_POST, 'desde');
}
$hasta = '23:59:59';
if(filter_input(INPUT_POST, 'hasta') != '')
{
    $hasta = DateTime::createFromFormat('d/m/Y h:i', filter_input(INPUT_POST, 'hasta'))->format('Y/m/d h:i');
}
else
{
    $hasta = filter_input(INPUT_POST, 'hasta');
}
$usuario = filter_input(INPUT_POST, 'usuario');
$centroCosto = filter_input(INPUT_POST, 'centrocosto');
$costo1 = filter_input(INPUT_POST, 'costo1');
$costo2 = filter_input(INPUT_POST, 'costo2');
$duracion1 = filter_input(INPUT_POST, 'duracion1');
$duracion2 = filter_input(INPUT_POST, 'duracion2');
$llamadaDao = new LlamadaDao();
$llamadas = $llamadaDao->getLlamadas($id,$extension,$contraparte,$tipo,$desde,$hasta,$usuario,$centroCosto,$costo1,$costo2,$duracion1,$duracion2);
echo "[";
for ($i = 0 ; $i < count($llamadas); $i++)
{
    $llamadaId = $llamadas[$i]->getId();
    $llamadaPkid = $llamadas[$i]->getPkid();
    $llamadaGlobalId = $llamadas[$i]->getGlobalCallId();
    $llamadaExtension = $llamadas[$i]->getExtension();
    $llamadaContraparte = $llamadas[$i]->getContraparte();
    $llamadaUltRd = $llamadas[$i]->getUltRd();
    $llamadaNFinal = $llamadas[$i]->getNFinal();
    $llamadaFechaOrigen = $llamadas[$i]->getFechaOrigen();
    $llamadaFechaConexion = $llamadas[$i]->getFechaConexion();
    $llamadaFechaDesconexion = $llamadas[$i]->getFechaDesconexion();
    $llamadaDuracion = $llamadas[$i]->getDuracion();
    $llamadaTipo = $llamadas[$i]->getTipo();
    $llamadaParticionExtension = $llamadas[$i]->getParticionExtension();
    $llamadaParticionContraparte = $llamadas[$i]->getParticionContraparte();
    $llamadaParticionUltRd = $llamadas[$i]->getParticionUltRd();
    $llamadaParticionNFinal = $llamadas[$i]->getParticionNFinal();
    $llamadaCosto = $llamadas[$i]->getCosto();
    $llamadaDevOrigen = $llamadas[$i]->getDevOrigen();
    $llamadaDevDestino = $llamadas[$i]->getDevDestino();
    $llamadaIdUsuario = $llamadas[$i]->getIdUsuario();
    $llamadaNombreUsuario = $llamadas[$i]->getNombreUsuario();
    $llamadaIdCentroCosto = $llamadas[$i]->getIdCentroCosto();
    $llamadaNombreCentroCosto = $llamadas[$i]->getNombreCentroCosto();
    $llamadaIdCentroCostoPadre = $llamadas[$i]->getIdCentroCostoPadre();
        
    echo "{\"llamada_id\":\"".$llamadaId."\","
        . "\"llamada_pkid\":\"".$llamadaPkid."\","
        . "\"llamada_global_call_id\":\"".$llamadaGlobalId."\","
        . "\"llamada_extension\":\"".$llamadaExtension."\","
        . "\"llamada_contraparte\":\"".$llamadaContraparte."\","
        . "\"llamada_ultrd\":\"".$llamadaUltRd."\","
        . "\"llamada_nfinal\":\"".$llamadaNFinal."\","
        . "\"llamada_origen\":\"".$llamadaFechaOrigen."\","
        . "\"llamada_conexion\":\"".$llamadaFechaConexion."\","
        . "\"llamada_desconexion\":\"".$llamadaFechaDesconexion."\","
        . "\"llamada_duracion\":\"".$llamadaDuracion."\","
        . "\"llamada_tipo\":\"".$llamadaTipo."\","
        . "\"llamada_part_ext\":\"".$llamadaParticionExtension."\","
        . "\"llamada_part_con\":\"".$llamadaParticionContraparte."\","
        . "\"llamada_part_ultrd\":\"".$llamadaParticionUltRd."\","
        . "\"llamada_part_nfin\":\"".$llamadaParticionNFinal."\","
        . "\"llamada_tipo\":\"".$llamadaTipo."\","
        . "\"llamada_tipo\":\"".$llamadaTipo."\","
        . "\"llamada_costo\":\"".$llamadaCosto."\","
        . "\"llamada_dev_origen\":\"".$llamadaDevOrigen."\","
        . "\"llamada_dev_destino\":\"".$llamadaDevDestino."\","
        . "\"llamada_id_usuario\":\"".$llamadaIdUsuario."\","
        . "\"llamada_nombre_usuario\":\"".$llamadaNombreUsuario."\","
        . "\"llamada_id_cc\":\"".$llamadaIdCentroCosto."\","
        . "\"llamada_nombre_cc\":\"".$llamadaNombreCentroCosto."\","
        . "\"llamada_id_cc_padre\":\"".$llamadaIdCentroCostoPadre."\""
        . "}";
    if (($i+1) != count($llamadas))
    {
        echo ",";
    }
}
echo "]";
Log::write_log("GETLLAMADAS", 0);