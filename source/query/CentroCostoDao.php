<?php
include '../../util/validarPeticion.php';
include '../../conexion/Conexion.php';
include '../../dominio/CentroCosto.php';

class CentroCostoDao {
    
    public function getCentrosCosto($busqueda,$categoria)
    {
        $array = array();
        $conn = new Conexion();
        try {
            $buscaCategoria = '';
            if($categoria != 0){
                $buscaCategoria.= " AND centrocosto_categoria = ".$categoria;
            }
            $query = "SELECT * FROM tbl_centrocosto "
                    . ""
                    . " WHERE (centrocosto_nombre LIKE '%".$busqueda."%' OR centrocosto_descripcion LIKE '%".$busqueda."%') ".$buscaCategoria;
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query) or die; 
            while($row = mysqli_fetch_array($result)) {
                $centroCosto = new CentroCosto();
                $centroCosto->setId($row["centrocosto_id"]);
                $centroCosto->setNombre($row["centrocosto_nombre"]);
                $centroCosto->setDescripcion($row["centrocosto_descripcion"]);
                $centroCosto->setNivel($row["centrocosto_nivel"]);
                $centroCosto->setCategoria($row["centrocosto_categoria"]);
                array_push($array, $centroCosto);
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        return $array;
    }

    function eliminarCentroCosto($idCentroCosto)
    {
        $id = 0;
        $conn = new Conexion();
        try {
            $query = "DELETE FROM tbl_centrocosto WHERE centrocosto_id = '$idCentroCosto'"; 
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
    
    public function agregarCentroCosto($centroCosto)
    {
        $id = 0;
        $nombre = $centroCosto->getNombre();
        $descripcion = $centroCosto->getDescripcion();
        $nivel = $centroCosto->getNivel();
        $categoria = $centroCosto->getCategoria();
        $conn = new Conexion();
        try {
            $query = "INSERT INTO tbl_centrocosto (centrocosto_nombre,centrocosto_descripcion,centrocosto_nivel,centrocosto_categoria,centrocosto_fecha) VALUES "
                    . "('$nombre','$descripcion','$nivel','$categoria',NOW())";
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
    
    public function modificarCentroCosto($centroCosto)
    {
        $id = $centroCosto->getId();
        $nombre = $centroCosto->getNombre();
        $descripcion = $centroCosto->getDescripcion();
        $nivel = $centroCosto->getHora();
        $categoria = $centroCosto->getNombre();
        $conn = new Conexion();
        try {
            $query = "UPDATE tbl_centrocosto SET centrocosto_nombre = '$nombre',centrocosto_descripcion = '$descripcion'"
                    . ",centrocosto_nivel = '$nivel',centrocosto_categoria = '$categoria',centrocosto_fecha = NOW() WHERE centrocosto_id = $id";       
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
