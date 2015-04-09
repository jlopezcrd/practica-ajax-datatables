<?php
return new PDO('mysql:host=localhost;dbname=clinicas','root','root',array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
?>