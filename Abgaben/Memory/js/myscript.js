var trys = 0, totalTrys = 0, turnTime = 0, referenz, pick1, pick2, count;
let stapel = [];

//INFORMATION:
function getName() {
    document.getElementById("name").innerHTML = "Spieler: " + prompt("What's your Name?");
    erstelleSpielbereich();
}

function showTrys(){
    document.getElementById("totalTrys").innerHTML = "Versuche: " + totalTrys;
}

function erstelleSpielbereich(){    
    for(let x = 0; x < 16; x++){  
            var divKarte = document.createElement("div");
                divKarte.setAttribute("class", "card");
                divKarte.setAttribute("id", (x+1));
                divKarte.setAttribute("onclick", "");
            stapel[x] = divKarte;
        }
        kartenVerteilen();
    }

function kartenVerteilen(){
    for(let i = 0; i < 16; i++){        
        if(i % 4 == 0){stapel[i].style.clear = "left";
        }else{stapel[i].style.float = "left";
        stapel[i].style.clear = null;}
        stapel[i].style.backgroundImage = "url(../Memory/pics/memoryBg.png)";
        document.getElementById("spielbereich").appendChild(stapel[i]);
    }
    console.log(stapel);
}

//ACTION:
function startGame(){
    kartenVerteilen(/*kartenMischen()*/)
    startTime();
    showTrys();
    stapel.forEach(activate);
}

function kartenMischen(){
        var j, x, i;
        for (i = stapel.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = stapel[i];
            stapel[i] = stapel[j];
            stapel[j] = x;
        }
        return stapel;
}

function activate(item){
    if(item.getAttribute(oncklick) == ""){
        item.setAttribute("onclick", "showCard(this)");
    }
}

function deactivate(item){
    if(item.getAttribute(oncklick) == "showCard(this)"){
        item.setAttribute("onclick", "");
    }
}

function showCard(card){ 
    trys++;
    if(trys % 2 == 0){
        pick2=card.id
        card.style.backgroundImage = "url(../Memory/pics/card" + pick2 + ".png)";
        totalTrys++
        showTrys();
        stapel.forEach(deactivate);
        turnTimer();
    }else{
        pick1=card.id
        card.style.backgroundImage = "url(../Memory/pics/card" + pick1 + ".png)";
    }
}

function turnCards(){
    if((Number(pick1)+Number(pick2)) == 17){
        count++
        //alert("Congratulation you Found a Match!!!");
        document.getElementById(pick1).style.backgroundImage = "url(../Memory/pics/memoryBgI.png)";
        document.getElementById(pick2).style.backgroundImage = "url(../Memory/pics/memoryBgI.png)";
        document.getElementById(pick1).removeAttribute("onclick");
        document.getElementById(pick2).removeAttribute("onclick");
        if(count == 8){
            stoppTime();
            alert("GAME OVER!!\n Zeit: "+min+":"+sec+"\nVersuche: " + totalTrys)
            stapel = [], totalTrys = 0;
            kartenVerteilen();
        }
    }else{
        document.getElementById(pick1).style.backgroundImage = "url(../Memory/pics/memoryBg.png)";
        document.getElementById(pick2).style.backgroundImage = "url(../Memory/pics/memoryBg.png)";
    }
    pick1="";
    pick2="";
    trys = 0;
    stapel.forEach(activate);
}

//TIME:
function turnTimer(){
    setTimeout(turnCards, 2000);
}

function startTime(){
    var totalSeconds = 0;
    referenz = setInterval(timer, 1000);
    function timer(){
        ++totalSeconds;
        var sec = pad(totalSeconds % 60);
        var min = pad(Math.floor(totalSeconds / 60));
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