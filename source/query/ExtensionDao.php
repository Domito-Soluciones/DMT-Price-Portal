<?php
include '../../util/validarPeticion.php';
include '../../conexion/Conexion.php';
include '../../dominio/Extension.php';

class ExtensionDao {
    
    public function getExtensiones($busqueda)
    {
        $array = array();
        $conn = new Conexion();
        try {
            $query = "SELECT * FROM tbl_extension WHERE extension_numero LIKE '%".$busqueda."%' OR descripcion LIKE '%".$busqueda."%' LIMIT 20";
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query) or die; 
            while($row = mysqli_fetch_array($result)) {
                $extension = new Extension();
                $extension->setId($row["extension_id"]);
                $extension->setNumero($row["extension_numero"]);
                $extension->setDescripcion($row["extension_descripcion"]);
                $extension->setParticion($row["extension_particion"]);
                array_push($array, $extension);
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        return $array;
    }
   
    function eliminarExtension($idExtension)
    {
        $id = 0;
        $conn = new Conexion();
        try {
            $query = "DELETE FROM tbl_extension WHERE extension_id = '$idExtension'"; 
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
    
    public function agregarExtension($extension)
    {
        $id = 0;
        $numero = $extension->getNumero();
        $descripcion = $extension->getDescripcion();
        $particion = $extension->getParticion();
        $conn = new Conexion();
        try {
            $query = "INSERT INTO tbl_extension (extension_numero,extension_descripcion,extension_particion) VALUES "
                    . "('$numero','$descripcion','$particion')";
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
    
    public function modificarExtension($extension)
    {
        $id = $extension->getId();
        $numero = $extension->getNumero();
        $descripcion = $extension->getDescripcion();
        $particion = $extension->getParticion();
        $conn = new Conexion();
        try {
            $query = "UPDATE tbl_extension SET extension_numero = '$numero',extension_descripcion = '$descripcion',"
                    . "extension_particion = '$particion' WHERE extension_id = $id";       
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
