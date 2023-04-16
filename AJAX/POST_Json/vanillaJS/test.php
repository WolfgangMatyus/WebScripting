<?php

$requestPayload = file_get_contents("php://input");
$object = json_decode($requestPayload, true);

//var_dump($object);