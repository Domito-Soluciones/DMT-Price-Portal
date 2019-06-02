<?php
include '../../util/validarPeticion.php';
include '../../conexion/Conexion.php';
include '../../dominio/Tarifa.php';

class TarifaDao {
    
    public function getTarifas($busqueda)
    {
        $array = array();
        $conn = new Conexion();
        try {
            $query = "SELECT * FROM tbl_tarifa WHERE tarifa_cliente LIKE '%".$busqueda."%' LIMIT 20";
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query) or die; 
            while($row = mysqli_fetch_array($result)) {
                $tarifa = new Tarifa();
                $tarifa->setId($row["tarifa_id"]);
                $tarifa->setDescripcion($row["tarifa_descripcion"]);
                $tarifa->setNumero($row["tarifa_numero"]);
                $tarifa->setHora($row["tarifa_hora"]);
                $tarifa->setNombre($row["tarifa_nombre"]);
                $tarifa->setOrigen($row["tarifa_origen"]);
                $tarifa->setDestino($row["tarifa_destino"]);
                $tarifa->setValor1($row["tarifa_valor1"]);
                $tarifa->setValor2($row["tarifa_valor2"]);
                $tarifa->setCliente($row["tarifa_cliente"]);
                $tarifa->setTipo($row["tarifa_tipo"]);
                $tarifa->setHorario($row["tarifa_horario"]);
                array_push($array, $tarifa);
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        return $array;
    }
    public function getTarifasEmpresa($empresa)
    {
        $array = array();
        $conn = new Conexion();
        try {
            $query = "SELECT * FROM tbl_tarifa WHERE tarifa_cliente = '".$empresa."'";
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query) or die; 
            while($row = mysqli_fetch_array($result)) {
                $tarifa = new Tarifa();
                $tarifa->setId($row["tarifa_id"]);
                $tarifa->setDescripcion($row["tarifa_descripcion"]);
                $tarifa->setNumero($row["tarifa_numero"]);
                $tarifa->setHora($row["tarifa_hora"]);
                $tarifa->setNombre($row["tarifa_nombre"]);
                $tarifa->setOrigen($row["tarifa_origen"]);
                $tarifa->setDestino($row["tarifa_destino"]);
                $tarifa->setValor1($row["tarifa_valor1"]);
                $tarifa->setValor2($row["tarifa_valor2"]);
                $tarifa->setCliente($row["tarifa_cliente"]);
                $tarifa->setTipo($row["tarifa_tipo"]);
                $tarifa->setHorario($row["tarifa_horario"]);
                array_push($array, $tarifa);
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        return $array;
    }
    function eliminarTarifa($nombre)
    {
        $id = 0;
        $conn = new Conexion();
        try {
            $query = "DELETE FROM tbl_tarifa WHERE tarifa_nombre = '$nombre'"; 
            $conn->conectar();
            if (mysqli_query($conn->conn,$query)) {
                $id = mysqli_insert_id($conn->conn);
            } else {
                echo mysqli_error($conn->conn);
            }           
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        return $id;
    }
    
    public function agregarTarifa($tarifa)
    {
        $id = 0;
        $descripcion = $tarifa->getDescripcion();
        $numero = $tarifa->getNumero();
        $hora = $tarifa->getHora();
        $nombre = $tarifa->getNombre();
        $origen = $tarifa->getOrigen();
        $destino = $tarifa->getDestino();
        $valor1 = $tarifa->getValor1();
        $valor2 = $tarifa->getValor2();
        $cliente = $tarifa->getCliente();
        $tipo = $tarifa->getTipo();
        $horario = $tarifa->getHorario();
        $conn = new Conexion();
        try {
            $query = "INSERT INTO tbl_tarifa (tarifa_descripcion,tarifa_numero,tarifa_hora,tarifa_nombre,tarifa_origen,"
                    . "tarifa_destino,tarifa_valor1,tarifa_valor2,tarifa_cliente,tarifa_tipo,tarifa_horario) VALUES "
                    . "('$descripcion','$numero','$hora','$nombre','$origen','$destino','$valor1','$valor2','$cliente','$tipo','$horario')";
            $conn->conectar();
            if (mysqli_query($conn->conn,$query)) {
                $id = mysqli_insert_id($conn->conn);
            } else {
                echo mysqli_error($conn->conn);
            }           
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        return $id;
    }
    
    public function modificarTarifa($tarifa)
    {
        $id = $tarifa->getId();
        $descripcion = $tarifa->getDescripcion();
        $numero = $tarifa->getNumero();
        $hora = $tarifa->getHora();
        $nombre = $tarifa->getNombre();
        $origen = $tarifa->getOrigen();
        $destino = $tarifa->getDestino();
        $valor1 = $tarifa->getValor1();
        $valor2 = $tarifa->getValor2();
        $cliente = $tarifa->getCliente();
        $tipo = $tarifa->getTipo();
        $horario = $tarifa->getHorario();
        $conn = new Conexion();
        try {
            $query = "UPDATE tbl_tarifa SET tarifa_descripcion = '$descripcion',tarifa_numero = '$numero',tarifa_hora = '$hora',tarifa_origen = '$origen',"
                    . " tarifa_destino = '$destino',tarifa_valor1 = $valor1,tarifa_valor2 = $valor2,"
                    . " tarifa_cliente = '$cliente',tarifa_tipo = '$tipo', tarifa_horario = '$horario',"
                    . " tarifa_nombre = '$nombre' WHERE tarifa_id = $id";       
            $conn->conectar();
            if (mysqli_query($conn->conn,$query)) {
                $id = mysqli_insert_id($conn->conn);
            } else {
                echo mysqli_error($conn->conn);
            }           
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        return $id;
    }
}
