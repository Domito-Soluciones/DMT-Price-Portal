<?php
include '../../util/validarPeticion.php';
include '../../query/ServicioDao.php';

header('Content-Type: application/json; charset=utf-8');
$id = filter_input(INPUT_POST, 'id');
$empresa = filter_input(INPUT_POST, 'empresa');
$conductor = filter_input(INPUT_POST, 'conductor');
$estado = filter_input(INPUT_POST, 'estado');
$movil = filter_input(INPUT_POST, 'movil');
$desde = '';
if(filter_input(INPUT_POST, 'desde') != '')
{
    $desde = DateTime::createFromFormat('d/m/Y', filter_input(INPUT_POST, 'desde'))->format('Y/m/d');
}
else
{
    $desde = filter_input(INPUT_POST, 'desde');
}
$hdesde = filter_input(INPUT_POST, 'hdesde');
$hasta = '23:59:59';
if(filter_input(INPUT_POST, 'hasta') != '')
{
    $hasta = DateTime::createFromFormat('d/m/Y', filter_input(INPUT_POST, 'hasta'))->format('Y/m/d');
}
else
{
    $hasta = filter_input(INPUT_POST, 'hasta');
}
$hhasta = filter_input(INPUT_POST, 'hhasta');
$servicioDao = new ServicioDao();
$servicios = $servicioDao->getServicios($id,$empresa,$conductor,$estado,$movil,$desde,$hdesde,$hasta,$hhasta);
echo "[";
for ($i = 0 ; $i < count($servicios); $i++)
{
    $servicioId = $servicios[$i]->getId();
    $servicioCliente = $servicios[$i]->getCliente();
    $servicioRuta = $servicios[$i]->getRuta();
    $servicioFecha = $servicios[$i]->getFecha();
    $servicioHora = $servicios[$i]->getHora();
    $servicioMovil = $servicios[$i]->getMovil();
    $servicioConductor = $servicios[$i]->getConductor();
    $servicioTarifa1 = $servicios[$i]->getTarifa1();
    $servicioTarifa2 = $servicios[$i]->getTarifa2();
    $servicioAgente = $servicios[$i]->getAgente();
    $servicioEstado = $servicios[$i]->getEstado();
    echo "{\"servicio_id\":\"".$servicioId."\","
        . "\"servicio_cliente\":\"".$servicioCliente."\","
        . "\"servicio_ruta\":\"".$servicioRuta."\","
        . "\"servicio_fecha\":\"".$servicioFecha."\","
        . "\"servicio_hora\":\"".$servicioHora."\","
        . "\"servicio_movil\":\"".$servicioMovil."\","
        . "\"servicio_conductor\":\"".$servicioConductor."\","
        . "\"servicio_tarifa1\":\"".$servicioTarifa1."\","
        . "\"servicio_tarifa2\":\"".$servicioTarifa2."\","
        . "\"servicio_agente\":\"".$servicioAgente."\","
        . "\"servicio_estado\":\"".$servicioEstado."\""
        . "}";
    if (($i+1) != count($servicios))
    {
        echo ",";
    }
}
echo "]";
