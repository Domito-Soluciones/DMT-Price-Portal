<?php

class Extension {
    private $id;
    private $numero;
    private $descripcion;
    private $categoria;
    private $usuario;
   
    function getId() {
        return $this->id;
    }

    function getNumero() {
        return $this->numero;
    }

    function getDescripcion() {
        return $this->descripcion;
    }

    function getCategoria() {
        return $this->categoria;
    }

    function getUsuario() {
        return $this->usuario;
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

    function setCategoria($categoria) {
        $this->categoria = $categoria;
    }

    function setUsuario($usuario) {
        $this->usuario = $usuario;
    }


}
