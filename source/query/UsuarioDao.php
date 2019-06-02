<?php
include '../../util/validarPeticion.php';
include '../../conexion/Conexion.php';
include '../../dominio/Usuario.php';

class UsuarioDao {
    
    public function getUsuario($nombre,$clave)
    {
        $conn = new Conexion();
        try {
            $usuario = new Usuario();
            $query = "SELECT * FROM tbl_usuario WHERE usuario_nick = '$nombre' and usuario_password = '$clave'"; 
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query); 
            while($row = mysqli_fetch_array($result)) {
                $usuario->setId($row["usuario_id"]);
                $usuario->setNick($row["usuario_nick"]);
                $usuario->setClave($row["usuario_password"]);
                $usuario->setPerfil($row["usuario_perfil"]);
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        return $usuario;
    }
    
    public function getUsuarios($busqueda)
    {
        $array = array();
        $conn = new Conexion();
        try {
            $query = "SELECT * FROM tbl_usuario WHERE "
                    . "usuario_nick LIKE '%".$busqueda."%' LIMIT 20";
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query) or die; 
            while($row = mysqli_fetch_array($result)) {
                $usuario = new Usuario();
                $usuario->setId($row["usuario_id"]);
                $usuario->setNick($row["usuario_nick"]);
                $usuario->setClave($row["usuario_password"]);
                $usuario->setPerfil($row["usuario_perfil"]);
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
        $nick = $usuario->getNick();
        $password = $usuario->getClave();
        $perfil = $usuario->getPerfil();
        $conn = new Conexion();
        try {
            $query = "INSERT INTO tbl_usuario (usuario_nick,usuario_password,usuario_perfil) VALUES "
                    . "('$nick','$password','$perfil')"; 
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
    
    public function modificarUsuario($usuario){
        $id = 0;
        $nick = $usuario->getNick();
        $password = $usuario->getClave();
        $perfil = $usuario->getPerfil();
        $conn = new Conexion();
        try {
            $query = "UPDATE tbl_usuario SET ";
                    if($usuario->getClave() != ''){
                        $query .= "usuario_password = '$password',";
                    }
                    $query .= "usuario_perfil = '$perfil' WHERE usuario_nick = '$nick'";           
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
