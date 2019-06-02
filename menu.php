<?php
    session_start();
    if($_SESSION['tipo'] == '0')
    {
?>
<div class="opcion-menu menu-activo" id="home" onclick="cambiarModulo('home')">
    <div class="cont-img-menu">
        <img class="img-menu" src="img/dashboard.svg">
    </div>
    <div class="contenido-menu">
        Dashboard
    </div>
    <div class="tooltip" id="tooltip_home">
        Dashboard
    </div>
</div>
<div class="opcion-menu" id="tarificacion" onclick="cambiarModulo('tarificacion')">
    <div class="cont-img-menu">
        <img class="img-menu" src="img/moneda.svg">
    </div>
    <div class="contenido-menu">
        Tarificación
    </div>
    <div class="tooltip" id="tooltip_tarificacion">
        Tarificación
    </div>
</div>
<div class="opcion-menu" id="llamadas" onclick="cambiarModulo('llamadas')">
    <div class="cont-img-menu">
        <img class="img-menu" src="img/llamada.svg">
    </div>
    <div class="contenido-menu">
        Llamadas
    </div>
    <div class="tooltip" id="tooltip_llamada">
        Llamadas
    </div>
</div>
<div class="opcion-menu" id="estadistica" onclick="cambiarModulo('estadistica')">
    <div class="cont-img-menu">
        <img class="img-menu" src="img/estadistica.svg">
    </div>
    <div class="contenido-menu">
        Estadistica
    </div>
    <div class="tooltip" id="tooltip_estadistica">
        Estadistica
    </div>
</div>
<div class="opcion-menu" id="extension" onclick="cambiarModulo('extension')">
    <div class="cont-img-menu">
        <img class="img-menu" src="img/extension.svg">
    </div>
    <div class="contenido-menu">
        Extensiones
    </div>
    <div class="tooltip" id="tooltip_extension">
        Extensiones
    </div>
</div>
<div class="opcion-menu" id="agente" onclick="cambiarModulo('agente')">
    <div class="cont-img-menu">
        <img class="img-menu" src="img/agente.svg">
    </div>
    <div class="contenido-menu">
        Agentes
    </div>
    <div class="tooltip" id="tooltip_agente">
        Agentes
    </div>
</div>
<div class="opcion-menu" id="centro_costo" onclick="cambiarModulo('centro_costo')">
    <div class="cont-img-menu">
        <img class="img-menu" src="img/centro_costo.svg">
    </div>
    <div class="contenido-menu">
        Centros de Costo
    </div>
    <div class="tooltip" id="tooltip_centro_costo">
        Centros de Costo
    </div>
</div>
<div class="opcion-menu" id="usuario" onclick="cambiarModulo('usuario')">
    <div class="cont-img-menu">
        <img class="img-menu" src="img/admin.svg">
    </div>
    <div class="contenido-menu">
        Usuarios
    </div>
    <div class=tooltip id="tooltip_usuario">
        Usuarios
    </div>
</div>
<div class="opcion-menu menu-salir" id="salir" onclick="salir()">
    <div class="contenido-menu">
        Salir
    </div>
    <div class="tooltip" id="tooltip_salir">
        Salir
    </div>
</div>
<?php
    }
     