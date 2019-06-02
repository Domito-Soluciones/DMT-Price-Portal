<!DOCTYPE html>
<html>
    <head>
        <title>
            Login
        </title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <meta name="viewport" content="width=device-width, user-scalable=no, 
              initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
        <meta http-equiv="Expires" content="0">
        <meta http-equiv="Last-Modified" content="0">
        <meta http-equiv="Cache-Control" content="no-cache, mustrevalidate">
        <meta http-equiv="Pragma" content="no-cache">
        <!--<meta http-equiv="Content-Security-Policy" content="default-src https:">-->
        <link rel="stylesheet" href="css/lib/alertify.css" type="text/css"/>
        <link rel="stylesheet" href="css/lib/alertify.rtl.css" type="text/css"/>
        <link rel="stylesheet" href="css/estilo.css" type="text/css"/>
        <link rel="stylesheet" href="css/index.css" type="text/css"/>
        <link rel="stylesheet" href="css/loader.css" type="text/css"/>
        <link rel="stylesheet" href="css/media-queries.css">
        <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Open+Sans" />
        <link rel="icon" type="image/png" href="img/ico.png" />
        <script src="js/lib/jquery.js" type="text/javascript"></script>
        <script src="js/lib/alertify.js" type="text/javascript"></script>
        <script src="js/funciones.js" type="text/javascript"></script>
        <script src="js/index.js" type="text/javascript"></script>
    </head>
    <body>
        <div class="img-login">
            <!--<img src="img/logo.png">-->
        </div>
        <div class="login">
            <div class="contenedor-login">
                <div class="contenedor-pre-input contenedor-pre-input-login">
                    Usuario
                </div>
                <div class="contenedor-input">
                <input type="text" id="usuario" name="usuario" placeholder="Ingrese usuario"/>
                </div>
            </div>
            <div class="contenedor-login">
                <div class="contenedor-pre-input contenedor-pre-input-login">
                     Password
                </div>
                <div class="contenedor-input">
                    <input type="password" id="password" name="password" placeholder="Ingrese clave" />
                </div>
            </div>
            <div class="contenedor-login">
                <div class="boton" id="entrar">
                    <img src="img/guardar.svg" width="12" height="12">
                    Entrar
                </div>
            </div>
        </div>

    </body>
</html>