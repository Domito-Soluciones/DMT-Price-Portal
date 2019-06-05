<?php
include '../../util/validarPeticion.php';
include '../../conexion/Conexion.php';
include '../../dominio/Usuario.php';

class UsuarioDao {
    
    public function getUsuarios($busqueda,$categoria)
    {
        $array = array();
        $conn = new Conexion();
        try {
            $buscaCategoria = '';
            if($categoria != 0){
                $buscaCategoria.= " AND usuario_categoria = ".$categoria;
            }
            $query = "SELECT * FROM tbl_usuario "
                    . ""
                    . " WHERE (usuario_nombre LIKE '%".$busqueda."%' OR usuario_descripcion LIKE '%".$busqueda."%') ".$buscaCategoria;
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query) or die; 
            while($row = mysqli_fetch_array($result)) {
                $usuario = new Usuario();
                $usuario->setId($row["usuario_id"]);
                $usuario->setNombre($row["usuario_nombre"]);
                $usuario->setDescripcion($row["usuario_descripcion"]);
                $usuario->setCategoria($row["usuario_categoria"]);
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
        $nombre = $usuario->getNombre();
        $descripcion = $usuario->getDescripcion();
        $categoria = $usuario->getCategoria();
        $conn = new Conexion();
        try {
            $query = "INSERT INTO tbl_usuario (usuario_nombre,usuario_descripcion,usuario_categoria,usuario_fecha) VALUES "
                    . "('$nombre','$descripcion','$categoria',NOW())";
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
        $nombre = $usuario->getNombre();
        $descripcion = $usuario->getDescripcion();
        $categoria = $usuario->getCategoria();
        $conn = new Conexion();
        try {
            $query = "UPDATE tbl_usuario SET usuario_nombre = '$nombre',usuario_descripcion = '$descripcion',usuario_categoria = '$categoria'"
                    . " WHERE usuario_id = $id";       
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
