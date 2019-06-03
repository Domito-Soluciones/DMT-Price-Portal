<?php
include '../../log/Log.php';

session_start() ;
session_destroy();
Log::write_log("LOGOUT", 0);
