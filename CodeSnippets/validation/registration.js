function validateInput() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var errorLabel = document.getElementById("errorLabel");
  
    // Überprüfe Benutzername
    if (username.trim() === "") {
      errorLabel.textContent = "Bitte geben Sie einen Benutzernamen ein.";
      return;
    }
    
    if (username.length < 4) {
        errorLabel.textContent = "Der Benutzername muss mindestens 4 Zeichen lang sein.";
        return;
      }
  
    // Überprüfe Passwort
    if (password.trim() === "") {
      errorLabel.textContent = "Bitte geben Sie ein Passwort ein.";
      return;
    }
  
    // Weitere Validierungsregeln für Benutzernamen und Passwort können hier hinzugefügt werden.
  
    // Wenn alle Validierungen erfolgreich sind
    errorLabel.textContent = ""; // Setze Fehlermeldung zurück oder leere sie
    // Hier kannst du den Code ausführen, der nach erfolgreicher Validierung ausgeführt werden soll.
  }