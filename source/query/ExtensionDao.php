<?php
include '../../util/validarPeticion.php';
include '../../conexion/Conexion.php';
include '../../dominio/Extension.php';

class ExtensionDao {
    
    public function getExtensiones($busqueda,$categoria)
    {
        $array = array();
        $conn = new Conexion();
        try {
            $buscaCategoria = '';
            if($categoria != 0){
                $buscaCategoria.= " AND extension_categoria = ".$categoria;
            }
            $query = "SELECT extension_id,extension_numero,extension_descripcion,extension_categoria,usuario_nombre FROM tbl_extension LEFT JOIN tbl_usuario_extension ON extension_id = usuarioextension_extension"
                    . " LEFT JOIN tbl_usuario ON usuarioextension_usuario = usuario_id"
                    . " WHERE (extension_numero LIKE '%".$busqueda."%' OR extension_descripcion LIKE '%".$busqueda."%' OR usuario_nombre LIKE '%".$busqueda."%' ) ".$buscaCategoria;
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query) or die; 
            while($row = mysqli_fetch_array($result)) {
                $extension = new Extension();
                $extension->setId($row["extension_id"]);
                $extension->setNumero($row["extension_numero"]);
                $extension->setDescripcion($row["extension_descripcion"]);
                $extension->setCategoria($row["extension_categoria"]);
                $extension->setUsuario($row["usuario_nombre"]);
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
        $categoria = $extension->getCategoria();
        $conn = new Conexion();
        try {
            $query = "INSERT INTO tbl_extension (extension_numero,extension_descripcion,extension_categoria,extension_fecha) VALUES "
                    . "('$numero','$descripcion','$categoria',NOW())";
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
        $categoria = $extension->getCategoria();
        $conn = new Conexion();
        try {
            $query = "UPDATE tbl_extension SET extension_numero = '$numero',extension_descripcion = '$descripcion',"
                    . "extension_categoria = '$categoria',extension_fecha = NOW() WHERE extension_id = $id";       
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
