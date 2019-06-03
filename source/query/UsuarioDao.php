<?php
include '../../util/validarPeticion.php';
include '../../conexion/Conexion.php';
include '../../dominio/Usuario.php';

class UsuarioDao {
    
    public function getUsuarios($busqueda)
    {
        $array = array();
        $conn = new Conexion();
        try {
            $query = "SELECT * FROM tbl_usuario WHERE usuario_nombre LIKE '%".$busqueda."%' OR usuario_descripcion LIKE '%".$busqueda."%' LIMIT 20";
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query) or die; 
            while($row = mysqli_fetch_array($result)) {
                $usuario = new Usuario();
                $usuario->setId($row["usuario_id"]);
                $usuario->setNombre($row["usuario_nombre"]);
                $usuario->setDescripcion($row["usuario_descripcion"]);
                array_push($array, $usuario);
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        return $array;
    }

    function eliminarUsuario($idUsuario)
    {
        $id = 0;
        $conn = new Conexion();
        try {
            $query = "DELETE FROM tbl_usuario WHERE usuario_id = '$idUsuario'"; 
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
    
    public function agregarUsuario($usuario)
    {
        $id = 0;
        $descripcion = $usuario->getDescripcion();
        $numero = $usuario->getNumero();
        $hora = $usuario->getHora();
        $nombre = $usuario->getNombre();
        $origen = $usuario->getOrigen();
        $destino = $usuario->getDestino();
        $valor1 = $usuario->getValor1();
        $valor2 = $usuario->getValor2();
        $cliente = $usuario->getCliente();
        $tipo = $usuario->getTipo();
        $horario = $usuario->getHorario();
        $conn = new Conexion();
        try {
            $query = "INSERT INTO tbl_usuario (usuario_descripcion,usuario_numero,usuario_hora,usuario_nombre,usuario_origen,"
                    . "usuario_destino,usuario_valor1,usuario_valor2,usuario_cliente,usuario_tipo,usuario_horario) VALUES "
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
    
    public function modificarUsuario($usuario)
    {
        $id = $usuario->getId();
        $descripcion = $usuario->getDescripcion();
        $numero = $usuario->getNumero();
        $hora = $usuario->getHora();
        $nombre = $usuario->getNombre();
        $origen = $usuario->getOrigen();
        $destino = $usuario->getDestino();
        $valor1 = $usuario->getValor1();
        $valor2 = $usuario->getValor2();
        $cliente = $usuario->getCliente();
        $tipo = $usuario->getTipo();
        $horario = $usuario->getHorario();
        $conn = new Conexion();
        try {
            $query = "UPDATE tbl_usuario SET usuario_descripcion = '$descripcion',usuario_numero = '$numero',usuario_hora = '$hora',usuario_origen = '$origen',"
                    . " usuario_destino = '$destino',usuario_valor1 = $valor1,usuario_valor2 = $valor2,"
                    . " usuario_cliente = '$cliente',usuario_tipo = '$tipo', usuario_horario = '$horario',"
                    . " usuario_nombre = '$nombre' WHERE usuario_id = $id";       
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
