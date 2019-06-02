<?php
include '../../util/validarPeticion.php';

class Llamada {
    private $id;
    private $pkid;
    private $globalCallId;
    private $extension;
    private $contraparte;
    private $ultRd;
    private $nFinal;
    private $fechaOrigen;
    private $fechaConexion;
    private $fechaDesconexion;
    private $duracion;
    private $tipo;
    private $particionExtension;
    private $particionContraparte;
    private $particionUltRd;
    private $particionNFinal;
    private $costo;
    private $devOrigen;
    private $devDestino;
    private $idUsuario;
    private $nombreUsuario;
    private $idCentroCosto;
    private $nombreCentroCosto;
    private $idCentroCostoPadre;

    function getId() {
        return $this->id;
    }

    function getPkid() {
        return $this->pkid;
    }

    function getGlobalCallId() {
        return $this->globalCallId;
    }

    function getExtension() {
        return $this->extension;
    }

    function getContraparte() {
        return $this->contraparte;
    }

    function getUltRd() {
        return $this->ultRd;
    }

    function getNFinal() {
        return $this->nFinal;
    }

    function getFechaOrigen() {
        return $this->fechaOrigen;
    }

    function getFechaConexion() {
        return $this->fechaConexion;
    }

    function getFechaDesconexion() {
        return $this->fechaDesconexion;
    }

    function getDuracion() {
        return $this->duracion;
    }

    function getTipo() {
        return $this->tipo;
    }

    function getParticionExtension() {
        return $this->particionExtension;
    }

    function getParticionContraparte() {
        return $this->particionContraparte;
    }

    function getParticionUltRd() {
        return $this->particionUltRd;
    }

    function getParticionNFinal() {
        return $this->particionNFinal;
    }

    function getCosto() {
        return $this->costo;
    }

    function getDevOrigen() {
        return $this->devOrigen;
    }

    function getDevDestino() {
        return $this->devDestino;
    }

    function getIdUsuario() {
        return $this->idUsuario;
    }

    function getNombreUsuario() {
        return $this->nombreUsuario;
    }

    function getIdCentroCosto() {
        return $this->idCentroCosto;
    }

    function getNombreCentroCosto() {
        return $this->nombreCentroCosto;
    }

    function getIdCentroCostoPadre() {
        return $this->idCentroCostoPadre;
    }

    function setId($id) {
        $this->id = $id;
    }

    function setPkid($pkid) {
        $this->pkid = $pkid;
    }

    function setGlobalCallId($globalCallId) {
        $this->globalCallId = $globalCallId;
    }

    function setExtension($extension) {
        $this->extension = $extension;
    }

    function setContraparte($contraparte) {
        $this->contraparte = $contraparte;
    }

    function setUltRd($ultRd) {
        $this->ultRd = $ultRd;
    }

    function setNFinal($nFinal) {
        $this->nFinal = $nFinal;
    }

    function setFechaOrigen($fechaOrigen) {
        $this->fechaOrigen = $fechaOrigen;
    }

    function setFechaConexion($fechaConexion) {
        $this->fechaConexion = $fechaConexion;
    }

    function setFechaDesconexion($fechaDesconexion) {
        $this->fechaDesconexion = $fechaDesconexion;
    }

    function setDuracion($duracion) {
        $this->duracion = $duracion;
    }

    function setTipo($tipo) {
        $this->tipo = $tipo;
    }

    function setParticionExtension($particionExtension) {
        $this->particionExtension = $particionExtension;
    }

    function setParticionContraparte($particionContraparte) {
        $this->particionContraparte = $particionContraparte;
    }

    function setParticionUltRd($particionUltRd) {
        $this->particionUltRd = $particionUltRd;
    }

    function setParticionNFinal($particionNFinal) {
        $this->particionNFinal = $particionNFinal;
    }

    function setCosto($costo) {
        $this->costo = $costo;
    }

    function setDevOrigen($devOrigen) {
        $this->devOrigen = $devOrigen;
    }

    function setDevDestino($devDestino) {
        $this->devDestino = $devDestino;
    }

    function setIdUsuario($idUsuario) {
        $this->idUsuario = $idUsuario;
    }

    function setNombreUsuario($nombreUsuario) {
        $this->nombreUsuario = $nombreUsuario;
    }

    function setIdCentroCosto($idCentroCosto) {
        $this->idCentroCosto = $idCentroCosto;
    }

    function setNombreCentroCosto($nombreCentroCosto) {
        $this->nombreCentroCosto = $nombreCentroCosto;
    }

    function setIdCentroCostoPadre($idCentroCostoPadre) {
        $this->idCentroCostoPadre = $idCentroCostoPadre;
    }


}
