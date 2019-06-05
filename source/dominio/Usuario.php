<?php

class Usuario {
    private $id;
    private $nombre;
    private $descripcion;
    private $categoria;
    private $extension;
    private $centroCosto;
    
    function getId() {
        return $this->id;
    }

    function getNombre() {
        return $this->nombre;
    }

    function getDescripcion() {
        return $this->descripcion;
    }

    function getCategoria() {
        return $this->categoria;
    }

    function getExtension() {
        return $this->extension;
    }

    function getCentroCosto() {
        return $this->centroCosto;
    }

    function setId($id) {
        $this->id = $id;
    }

    function setNombre($nombre) {
        $this->nombre = $nombre;
    }

    function setDescripcion($descripcion) {
        $this->descripcion = $descripcion;
    }

    function setCategoria($categoria) {
        $this->categoria = $categoria;
    }

    function setExtension($extension) {
        $this->extension = $extension;
    }

    function setCentroCosto($centroCosto) {
        $this->centroCosto = $centroCosto;
    }



}
