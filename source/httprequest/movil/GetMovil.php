<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/MovilDao.php';

header('Content-Type: application/json');
$busqueda = filter_input(INPUT_POST, 'busqueda');
$movilDao = new MovilDao();
$movil = $movilDao->getMovil($busqueda);
$movilId = $movil->getId();
$movilPatente = $movil->getPatente();
$movilNombre = $movil->getNombre();
$movilMarca = $movil->getMarca();
$movilModelo = $movil->getModelo();
$movilAnio = $movil->getAnio();
$movilColor = $movil->getColor();
$movilCantidad = $movil->getCantidad();
$movilClase = $movil->getClase();
$movilVenPerCir = date("d/m/Y", strtotime($movil->getVenPerCir()));
$movilVenRevTec = date("d/m/Y", strtotime($movil->getVenRevTec()));
$movilVenExt = date("d/m/Y", strtotime($movil->getVenExt()));
$movilKilo = $movil->getKilometraje();
$movilMotor = $movil->getMotor();
$movilChasis = $movil->getChasis();    
$movilSegOb = $movil->getSegOb();
$movilVenSegOb = date("d/m/Y", strtotime($movil->getVenSegOb()));
$movilPolizaSegOb = $movil->getPolizaSegOb();
$movilSegRcDm = $movil->getSegRcDm();
$movilVenSegRcDm = date("d/m/Y", strtotime($movil->getVenSegRcDm()));
$movilPolizaSegRcDm = $movil->setPolizaSegRcDm();
$movilSegRcExceso = $moviles[$i]->getSegRcExceso();
$movilVenSegRcExceso = date("d/m/Y", strtotime($moviles[$i]->getVenSegRcExceso()));
$movilPolizaSegRcExceso = $moviles[$i]->getPolizaSegRcExceso();
$movilValorSegRcExceso = $moviles[$i]->getValorSegRcExceso();
$movilTransportista = $movil->getTransportista();
$movilEstado = $movil->getEstado();
$movilLat = $movil->getLat();
$movilLon = $movil->getLon();
$movilServicio = $movil->getServicio();
echo "{\"movil_id\":\"".$movilId."\","
    . "\"movil_nombre\":\"".$movilNombre."\","
    . "\"movil_patente\":\"".$movilPatente."\","
    . "\"movil_marca\":\"".$movilMarca."\","
    . "\"movil_modelo\":\"".$movilModelo."\","
    . "\"movil_anio\":\"".$movilAnio."\","
    . "\"movil_color\":\"".$movilColor."\","
    . "\"movil_cantidad\":\"".$movilCantidad."\","
    . "\"movil_clase\":\"".$movilClase."\","
    . "\"movil_ven_per_cir\":\"".$movilVenPerCir."\","
    . "\"movil_ven_rev_tec\":\"".$movilVenRevTec."\","
    . "\"movil_ven_ext\":\"".$movilVenExt."\","
    . "\"movil_kilo\":\"".$movilKilo."\","
    . "\"movil_motor\":\"".$movilMotor."\","
    . "\"movil_chasis\":\"".$movilChasis."\","
    . "\"movil_seg_ob\":\"".$movilSegOb."\","
    . "\"movil_ven_seg_ob\":\"".$movilVenSegOb."\","
    . "\"movil_pol_seg_ob\":\"".$movilPolizaSegOb."\","
    . "\"movil_seg_rcdm\":\"".$movilSegRcDm."\","
    . "\"movil_ven_seg_rcdm\":\"".$movilVenSegRcDm."\","
    . "\"movil_pol_seg_rcdm\":\"".$movilPolizaSegRcDm."\","
    . "\"movil_seg_rcexceso\":\"".$movilSegRcExceso."\","
    . "\"movil_ven_seg_rcexceso\":\"".$movilVenSegRcExceso."\","
    . "\"movil_pol_seg_rcexceso\":\"".$movilPolizaSegRcExceso."\","
    . "\"movil_seg_rcexceso_valor\":\"".$movilValorSegRcExceso."\","
    . "\"movil_transportista\":\"".$movilTransportista."\","
    . "\"movil_estado\":\"".$movilEstado."\","
    . "\"movil_lat\":\"".$movilLat."\","
    . "\"movil_lon\":\"".$movilLon."\","
    . "\"movil_servicio\":\"".$movilServicio."\""
    . "}";