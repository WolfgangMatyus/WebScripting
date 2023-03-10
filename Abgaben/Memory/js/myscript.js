var trys = 0;
var totalTrys = 0;
var turnTime = 0;

function getName() {
    //alert("funkt");
    document.getElementById("name").innerHTML = "Spieler: " + prompt("What's your Name?");
    erstelleSpielbereich();
}

function erstelleSpielbereich(){
    
    let arr =[];
    let count=0; 
    for(let x = 0; x < 16; x++){  
            var divKarte = document.createElement("div");
                divKarte.setAttribute("class", "card");
                divKarte.setAttribute("id", (count+1));
                if(count % 4 == 0){
                    divKarte.style.clear = "left";
                }
            arr[x] = divKarte
            count++;
            document.getElementById("spielbereich").appendChild(divKarte);
        }
        console.log(arr);
    }


function shuffel(){

}

function startGame(){
    startTime();
    showTrys();
    divKarte.setAttribute("onclick", "showCard(this)");
}

function startTime(){
    var referenz = setInterval(timer, 1000);

    function timer(){
        var zeit = new Date().getSeconds();
        document.getElementById("zeit").innerHTML = "Zeit: " + zeit;
    }
    function stopp(){
        clearInterval(referenz);
    }
}

function showCard(card){ 
    trys++;
    if(trys % 2 == 0){
        card.style.backgroundImage = "url(../Memory/pics/card" + card.id + ".png)";
        totalTrys++
        showTrys();
        turnTimer(card);
    }
    card.style.backgroundImage = "url(../Memory/pics/card" + card.id + ".png)";
}

function showTrys(){
    document.getElementById("totalTrys").innerHTML = "Versuche: " + totalTrys;
}

function turnTimer(card){
        spielfeld = card.parentNode;
        spielfeld.childNode.setAttribute("onclick", '');
        setTimeout(turnCards(card), 3000);
}
    
function turnCards(card){
    card.style.backgroundImage = "url(../Memory/pics/MemoryBg.png)";
    spielfeld = card.parentNode;
    spielfeld.childNode.setAttribute("onclick", "showCard(this)");
    turnTime = 1;
    trys = 0;
}