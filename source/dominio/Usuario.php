<?php
include '../../util/validarPeticion.php';

class Usuario {
    private $id;
    private $nick;
    private $clave;
    private $perfil;

    function getId() {
        return $this->id;
    }

    function getNick() {
        return $this->nick;
    }

    function getClave() {
        return $this->clave;
    }

    function getPerfil() {
        return $this->perfil;
    }

    function setId($id) {
        $this->id = $id;
    }

    function setNick($nick) {
        $this->nick = $nick;
    }

    function setClave($clave) {
        $this->clave = $clave;
    }

    function setPerfil($perfil) {
        $this->perfil = $perfil;
    }

    public function toString() {
        return "DATOS USUARIO: ID : ".$this->id." NICK : ".$this->nick.
                " CLAVE : ".$this->clave." PERFIL : ".$this->perfil;
    }

}
