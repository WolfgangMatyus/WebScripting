//--------------------------------Variables:-------------------------------------------------//
var trys = 0, totalTrys = 0, turnTime = 0, referenz, pick1, pick2, count=0, min, sec, spieler;
var stapel = [], scoreList = [];
//--------------------------------CODE:-------------------------------------------------------//
function getName() {
    spieler=prompt("What's your Name?")
    document.getElementById("name").innerHTML = "Spieler: " + spieler;
    erstelleSpielbereich();
}

function zeigeVersuche(){
    if (totalTrys.length < 2) {"0" + totalTrys;}
    document.getElementById("totalTrys").innerHTML = "Versuche: " + totalTrys;
}

function erstelleSpielbereich(){
    stapel = [];
    for(let x = 0; x < 16; x++){  
            var divKarte = document.createElement("div");
                divKarte.setAttribute("class", "card");
                divKarte.setAttribute("id", (x+1));
            stapel[x] = divKarte;
        }
        kartenVerteilen();
    }

function kartenVerteilen(){
    const spielbereich = document.getElementById("spielbereich");
    while (spielbereich.hasChildNodes()) {spielbereich.removeChild(spielbereich.firstChild);}
    for(let i = 0; i < 16; i++){        
        if(i % 4 == 0){stapel[i].style.clear = "left";
        }else{stapel[i].style.float = "left";
        stapel[i].style.clear = null;}
        document.getElementById("spielbereich").appendChild(stapel[i]);
    }
    console.log(stapel);
}

function starteSpiel(){    
    erstelleSpielbereich();
    count=0,
    totalTrys = 0;
    kartenVerteilen(kartenMischen());
    stoppTime();
    startTime();
    zeigeVersuche();
    stapel.forEach(aktivieren);
}

function kartenMischen(){
        let j, x, i;
        for (i = stapel.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = stapel[i];
            stapel[i] = stapel[j];
            stapel[j] = x;
        }
        return stapel;
}

function aktivieren(item){
    if(item.id.includes("cold")){
        return;
    }else{
        item.setAttribute("onclick", "zeigeKarte(this)");
        item.setAttribute("class", "card clickable");
        item.style.backgroundImage = "url(pics/memoryBg.png)";
    }   
}

function deaktivieren(item){
        item.removeAttribute("onclick");
        item.setAttribute("class", "card");
}

function zeigeKarte(card){ 
    trys++;
    if(trys % 2 == 0){
        pick2=card.id
        card.style.backgroundImage = "url(pics/card" + pick2 + ".png)";
        totalTrys++
        zeigeVersuche();
        stapel.forEach(deaktivieren);
        turnTimer();
    }else{
        pick1=card.id
        card.style.backgroundImage = "url(pics/card" + pick1 + ".png)";
    }
}

function dreheKarte(){
    if((Number(pick1)+Number(pick2)) == 17){
        count++
        document.getElementById(pick1).style.backgroundImage = "url(pics/memoryBgI.png)";
        document.getElementById(pick2).style.backgroundImage = "url(pics/memoryBgI.png)";
        document.getElementById(pick1).setAttribute("class", "card");
        document.getElementById(pick2).setAttribute("class", "card");
        document.getElementById(pick1).setAttribute("id", "cold"+pick1);
        document.getElementById(pick2).setAttribute("id", "cold"+pick2);
        if(count == 8){
            stoppTime(); 
            alert("GAME OVER!!\n"+ spieler +"\nZeit: "+min+":"+sec+" Versuche: " + totalTrys +"\n");
        }
    }
    pick1="";
    pick2="";
    trys = 0;
    stapel.forEach(aktivieren);
}

function turnTimer(){
    setTimeout(dreheKarte, 2000);
}

function startTime(){
    var totalSeconds = 0;
    referenz = setInterval(timer, 1000);
    function timer(){
        ++totalSeconds;
        sec = pad(totalSeconds % 60);
        min = pad(Math.floor(totalSeconds / 60));
        document.getElementById("zeit").innerHTML = "Zeit: " + min + ":" + sec;
    }

    function pad(val) {
        var valString = val + "";
        if (valString.length < 2) {
          return "0" + valString;
        } else {
          return valString;
        }
    }   
}

function stoppTime(){
    clearInterval(referenz);
}
