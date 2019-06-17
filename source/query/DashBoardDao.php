<?php

include '../../conexion/Conexion.php';

class DashBoardDao {
    
    public function getGastos()
    {
        $array = array();
        $conn = new Conexion();
        $date = getdate();
        $dia = $date['mday'] < 10 ? "0".$date['mday'] : $date['mday'];
        $mes = $date['mon'] < 10 ? "0".$date['mon'] : $date['mon'];
        $anio = $date['year'];
        $fecha = $anio."-".$mes."-".$dia;
        $fechaMensual = $anio."-".$mes."-01";
        $fechaSemanal = date('Y-m-d', strtotime('monday last week last week'));;
        try {
            $query = "SELECT SUM(llamada_costo) AS llamada_gasto FROM `tbl_llamada` where llamada_fecha_origen"
                    . " BETWEEN '$fecha 00:00:00' AND '$fecha 23:59:59' UNION ALL"
                    . " SELECT SUM(llamada_costo) AS llamada_gasto FROM `tbl_llamada` where llamada_fecha_origen"
                    . " BETWEEN '$fechaSemanal 00:00:00' and '$fecha 23:59:59' UNION ALL SELECT"
                    . " SUM(llamada_costo) AS llamada_gasto FROM `tbl_llamada` where llamada_fecha_origen BETWEEN"
                    . " '$fechaMensual 00:00:00' and '$fecha 23:59:59'";
            //echo $query;
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query) or die (mysqli_error($conn->conn)); 
            while($row = mysqli_fetch_array($result)) {
                array_push($array, $row["llamada_gasto"]);
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        return $array;
    }
    
    public function getGastosCC()
    {
        $array = array();
        $conn = new Conexion();
        $date = getdate();
        $dia = $date['mday'] < 10 ? "0".$date['mday'] : $date['mday'];
        $mes = $date['mon'] < 10 ? "0".$date['mon'] : $date['mon'];
        $anio = $date['year'];
        $fecha = $anio."-".$mes."-".$dia;
        $fechaMensual = $anio."-".$mes."-01";
        try {
            $query = "SELECT SUM(llamada_costo) AS llamada_gasto,llamada_nombre_centrocosto FROM `tbl_llamada` where llamada_fecha_origen BETWEEN"
                    . " '$fechaMensual 00:00:00' and '$fecha 23:59:59' GROUP BY llamada_nombre_centrocosto ORDER BY llamada_gasto DESC LIMIT 8";
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query) or die (mysqli_error($conn->conn)); 
            while($row = mysqli_fetch_array($result)) {
                array_push($array, $row["llamada_nombre_centrocosto"]."%".$row["llamada_gasto"]);
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        return $array;
    }
    
   
    public function getUsuariosDesasociados()
    {
        $i = 0;
        $conn = new Conexion();
        try {
            $query = "SELECT COUNT(*) AS total FROM tbl_usuario LEFT JOIN tbl_centrocosto_usuario on usuario_id = centrocostousuario_usuario WHERE centrocostousuario_id IS NULL";
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query) or die (mysqli_error($conn->conn)); 
            while($row = mysqli_fetch_array($result)) {
                $i = $row['total'];
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        return $i;
    }
        
    public function getExtensionesDesasociadas(){
        $i = 0;
        $conn = new Conexion();
        try{
            $query = "SELECT COUNT(*) AS total FROM tbl_extension LEFT JOIN tbl_usuario_extension on extension_id = usuarioextension_extension WHERE usuarioextension_id IS NULL";
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query) or die (mysqli_error($conn->conn)); 
            while($row = mysqli_fetch_array($result)) {
                $i = $row['total'];
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        return $i;
    }
   

    
}
