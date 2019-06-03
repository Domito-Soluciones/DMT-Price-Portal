<?php
include '../../util/validarPeticion.php';
include '../../conexion/Conexion.php';
include '../../dominio/Sesion.php';

class SesionDao {
    
    public function getSesion($nombre,$clave)
    {
        $conn = new Conexion();
        try {
            $sesion = new Sesion();
            $query = "SELECT * FROM tbl_sesion WHERE sesion_nick = '$nombre' and sesion_password = '$clave'"; 
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query); 
            while($row = mysqli_fetch_array($result)) {
                $sesion->setId($row["sesion_id"]);
                $sesion->setNick($row["sesion_nick"]);
                $sesion->setClave($row["sesion_password"]);
                $sesion->setPerfil($row["sesion_perfil"]);
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        return $sesion;
    }
    
    public function getSesions($busqueda)
    {
        $array = array();
        $conn = new Conexion();
        try {
            $query = "SELECT * FROM tbl_sesion WHERE "
                    . "sesion_nick LIKE '%".$busqueda."%' LIMIT 20";
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query) or die; 
            while($row = mysqli_fetch_array($result)) {
                $sesion = new Sesion();
                $sesion->setId($row["sesion_id"]);
                $sesion->setNick($row["sesion_nick"]);
                $sesion->setClave($row["sesion_password"]);
                $sesion->setPerfil($row["sesion_perfil"]);
                array_push($array, $sesion);
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        return $array;
    }
    function eliminarSesion($idSesion)
    {
        $id = 0;
        $conn = new Conexion();
        try {
            $query = "DELETE FROM tbl_sesion WHERE sesion_id = '$idSesion'"; 
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
    
    public function agregarSesion($sesion)
    {
        $id = 0;
        $nick = $sesion->getNick();
        $password = $sesion->getClave();
        $perfil = $sesion->getPerfil();
        $conn = new Conexion();
        try {
            $query = "INSERT INTO tbl_sesion (sesion_nick,sesion_password,sesion_perfil) VALUES "
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
    
    public function modificarSesion($sesion){
        $id = 0;
        $nick = $sesion->getNick();
        $password = $sesion->getClave();
        $perfil = $sesion->getPerfil();
        $conn = new Conexion();
        try {
            $query = "UPDATE tbl_sesion SET ";
                    if($sesion->getClave() != ''){
                        $query .= "sesion_password = '$password',";
                    }
                    $query .= "sesion_perfil = '$perfil' WHERE sesion_nick = '$nick'";           
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
