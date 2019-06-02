<?php
include '../../util/validarPeticion.php';
include '../../conexion/Conexion.php';
include '../../dominio/Llamada.php';

class LlamadaDao {
   
    public function getLlamadas($id,$extension,$contraparte,$tipo,$desde,$hasta,$usuario,$centroCosto,$costoMin,$costoMax,$duracionMin,$duracionMax)
    {
        $array = array();
        $conn = new Conexion();
        try {
            $buscaId = '';
            $buscaExtension = '';
            $buscaContraparte = '';
            $buscaTipo = '';
            $buscaFecha = '';
            $buscaUsuario = '';
            $buscaCentroCosto = '';
            $buscaCosto = '';
            $buscaDuracion = '';
            if($id != '')
            {
                $buscaId = " AND llamada_id LIKE '%$id%' ";
            }
            if($extension != '')
            {
                $buscaExtension = " AND llamada_extension LIKE '%$extension%' ";
            }
            if($contraparte != '')
            {
                $buscaContraparte = " AND llamada_contraparte LIKE '%$contraparte%' ";
            }
            if($tipo != '')
            {
                $buscaTipo = " AND llamada_tipo LIKE '%$tipo%' ";
            }
            if($desde != '' && $hasta == '')
            {
                $buscaFecha = "AND llamada_fecha_origen > '".$desde."' ";
            }
            if($hasta != '' && $desde == '')
            {
                $buscaFecha = "AND llamada_fecha_origen < '".$hasta."' ";
            }
            if($desde != '' && $hasta != '')
            {
                $buscaFecha = "AND llamada_fecha_origen BETWEEN '".$desde."' AND '".$hasta."'";
            }
            if($usuario != '')
            {
                $buscaUsuario = " AND llamada_nombre_usuario LIKE '%$usuario%' ";
            }
            if($centroCosto != '')
            {
                $buscaCentroCosto = " AND llamada_nombre_centroCosto LIKE '%$centroCosto%' ";
            }
            if($costoMin != '' && $costoMax == '')
            {
                $buscaCosto = "AND llamada_costo > '".$costoMin."' ";
            }
            if($costoMax != '' && $costoMin == '')
            {
                $buscaCosto = "AND llamada_costo < '".$costoMax."' ";
            }
            if($costoMin != '' && $costoMax != '')
            {
                $buscaCosto = "AND llamada_costo BETWEEN '".$costoMin."' AND '".$costoMax."'";
            }
            if($duracionMin != '' && $duracionMax == '')
            {
                $buscaDuracion = "AND llamada_duracion > '".$duracionMin."' ";
            }
            if($duracionMax != '' && $duracionMin == '')
            {
                $buscaDuracion = "AND llamada_duracion < '".$duracionMax."' ";
            }
            if($duracionMin != '' && $duracionMax != '')
            {
                $buscaDuracion = "AND llamada_duracion BETWEEN '".$duracionMin."' AND '".$duracionMax."'";
            }
            
            $query = "SELECT * FROM tbl_llamada WHERE 1=1 "
                    .$buscaFecha." ".$buscaId." ".$buscaExtension." ".$buscaContraparte.
                    " ".$buscaTipo." ".$buscaUsuario." ".$buscaCentroCosto." ".$buscaCosto." ".$buscaDuracion
                    . " ORDER BY llamada_id DESC LIMIT 500";
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query) or die (mysqli_error($conn->conn)); 
            while($row = mysqli_fetch_array($result)) {
                $llamada = new Llamada();
                $llamada->setId($row["llamada_id"]);          
                $llamada->setPkid($row["llamada_pkid"]);
                $llamada->setGlobalCallId($row["llamada_global_callid"]);
                $llamada->setExtension($row["llamada_extension"]);
                $llamada->setContraparte($row["llamada_contraparte"]);
                $llamada->setUltRd($row["llamada_ultrd"]);
                $llamada->setNFinal($row["llamada_nfinal"]);
                $origen = new DateTime($row["llamada_fecha_origen"]);
                $llamada->setFechaOrigen(date_format($origen, 'd/m/Y h:i:s'));
                $conexion = new DateTime($row["llamada_fecha_conexion"]);
                $llamada->setFechaConexion(date_format($conexion, 'd/m/Y h:i:s'));
                $desconexion = new DateTime($row["llamada_fecha_desconexion"]);
                $llamada->setFechaDesconexion(date_format($desconexion, 'd/m/Y h:i:s'));
                $llamada->setDuracion($row["llamada_duracion"]);
                $llamada->setTipo($row["llamada_tipo"]);
                $llamada->setParticionExtension($row["llamada_particion_extension"]);
                $llamada->setParticionContraparte($row["llamada_particion_contraparte"]);
                $llamada->setParticionUltRd($row["llamada_particion_ultrd"]);
                $llamada->setParticionNFinal($row["llamada_particion_nfinal"]);
                $llamada->setCosto($row["llamada_costo"]);
                $llamada->setDevOrigen($row["llamada_dev_origen"]);
                $llamada->setDevDestino($row["llamada_dev_destino"]);
                $llamada->setIdUsuario($row["llamada_id_usuario"]);
                $llamada->setNombreUsuario($row["llamada_nombre_usuario"]);
                $llamada->setIdCentroCosto($row["llamada_id_centrocosto"]);
                $llamada->setNombreCentroCosto($row["llamada_nombre_centrocosto"]);
                $llamada->setIdCentroCostoPadre($row["llamada_centrocosto_padre"]);
                array_push($array, $llamada);
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        return $array;
    }

}
