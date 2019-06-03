<?php

class Extension {
    private $id;
    private $numero;
    private $descripcion;
    private $particion;
    
    function getId() {
        return $this->id;
    }

    function getNumero() {
        return $this->numero;
    }

    function getDescripcion() {
        return $this->descripcion;
    }

    function getParticion() {
        return $this->particion;
    }

    function setId($id) {
        $this->id = $id;
    }

    function setNumero($numero) {
        $this->numero = $numero;
    }

    function setDescripcion($descripcion) {
        $this->descripcion = $descripcion;
    }

    function setParticion($particion) {
        $this->particion = $particion;
    }


    

}
