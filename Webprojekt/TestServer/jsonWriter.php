<?php

// Daten aus dem Eingabe-Stream lesen
$data = file_get_contents('php://input');

// JSON-Datei öffnen oder erstellen
$filename = 'products.json';
$file = fopen($filename, 'a'); // 'a' öffnet die Datei im Anhänge-Modus

if ($file) {
  // Daten in die JSON-Datei schreiben
  $formattedData = json_encode(json_decode($data), JSON_PRETTY_PRINT);
  fwrite($file, $formattedData . PHP_EOL);
  fclose($file);
  echo 'Data saved successfully.';
} else {
  echo 'Error opening file.';
}
?>
