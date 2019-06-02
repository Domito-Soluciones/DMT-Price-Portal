<?php

class Tarifa {
    private $id;
    private $descripcion;
    private $numero;
    private $hora;
    private $nombre;
    private $origen;
    private $destino;
    private $valor1;
    private $valor2;
    private $cliente;
    private $tipo;
    private $horario;
    
    function getId() {
        return $this->id;
    }

    function getDescripcion() {
        return $this->descripcion;
    }

    function getNumero() {
        return $this->numero;
    }

    function getHora() {
        return $this->hora;
    }

    function getNombre() {
        return $this->nombre;
    }

    function getOrigen() {
        return $this->origen;
    }

    function getDestino() {
        return $this->destino;
    }

    function getValor1() {
        return $this->valor1;
    }

    function getValor2() {
        return $this->valor2;
    }

    function getCliente() {
        return $this->cliente;
    }

    function getTipo() {
        return $this->tipo;
    }

    function getHorario() {
        return $this->horario;
    }

    function setId($id) {
        $this->id = $id;
    }

    function setDescripcion($descripcion) {
        $this->descripcion = $descripcion;
    }

    function setNumero($numero) {
        $this->numero = $numero;
    }

    function setHora($hora) {
        $this->hora = $hora;
    }

    function setNombre($nombre) {
        $this->nombre = $nombre;
    }

    function setOrigen($origen) {
        $this->origen = $origen;
    }

    function setDestino($destino) {
        $this->destino = $destino;
    }

    function setValor1($valor1) {
        $this->valor1 = $valor1;
    }

    function setValor2($valor2) {
        $this->valor2 = $valor2;
    }

    function setCliente($cliente) {
        $this->cliente = $cliente;
    }

    function setTipo($tipo) {
        $this->tipo = $tipo;
    }

    function setHorario($horario) {
        $this->horario = $horario;
    }


    

}
