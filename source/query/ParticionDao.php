<?php
include '../../util/validarPeticion.php';
include '../../conexion/Conexion.php';
include '../../dominio/Particion.php';

class ParticionDao {
    
    public function getParticiones($busqueda,$categoria)
    {
        $array = array();
        $conn = new Conexion();
        try {
            $buscaCategoria = '';
            if($categoria != 0){
                $buscaCategoria.= " AND particion_categoria = ".$categoria;
            }
            $query = "SELECT * FROM tbl_particion WHERE (particion_nombre LIKE '%".$busqueda."%' OR particion_descripcion LIKE '%".$busqueda."%') ".$buscaCategoria." LIMIT 20";
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query) or die; 
            while($row = mysqli_fetch_array($result)) {
                $particion = new Particion();
                $particion->setId($row["particion_id"]);
                $particion->setNombre($row["particion_nombre"]);
                $particion->setDescripcion($row["particion_descripcion"]);
                $particion->setValor($row["particion_valor"]);
                $particion->setCategoria($row["particion_categoria"]);
                array_push($array, $particion);
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        return $array;
    }
   
    function eliminarParticion($idParticion)
    {
        $id = 0;
        $conn = new Conexion();
        try {
            $query = "DELETE FROM tbl_particion WHERE particion_id = '$idParticion'"; 
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
    
    public function agregarParticion($particion)
    {
        $id = 0;
        $nombre = $particion->getNombre();
        $descripcion = $particion->getDescripcion();
        $valor = $particion->getValor();
        $categoria = $particion->getCategoria();
        $conn = new Conexion();
        try {
            $query = "INSERT INTO tbl_particion (particion_nombre,particion_descripcion,particion_valor,particion_categoria,particion_fecha) VALUES "
                    . "('$nombre','$descripcion','$valor','$categoria',NOW())";
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
    
    public function modificarParticion($particion)
    {
        $id = $particion->getId();
        $nombre = $particion->getNombre();
        $descripcion = $particion->getDescripcion();
        $valor = $particion->getValor();
        $categoria = $particion->getCategoria();
        $conn = new Conexion();
        try {
            $query = "UPDATE tbl_particion SET particion_nombre = '$nombre',particion_descripcion = '$descripcion',"
                    . "particion_valor = '$valor',particion_categoria = '$categoria',particion_fecha = NOW() WHERE particion_id = $id";       
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
