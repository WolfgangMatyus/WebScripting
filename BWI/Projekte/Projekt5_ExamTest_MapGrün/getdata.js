function loadMap() {

    $(".headline")
        .css({"text-align": "center"})
    // 3b) Implementieren Sie einen AJAX-Call der ausgeführt wird, wenn die Seite aufgerufen wirdund fertig geladen ist
    $.ajax({
        method: "GET",
        data: "response",
        url: "traveldata.json",
        //3c) Laden Sie die Inhalte von traveldata.json via AJAX und nehmen Sie diese entgegen.
        success: function(response){
            console.log("mapDataLoad success!")
            //3c i)
            console.log(response)

            $.each(response, function(i, response){
                $("#map")
                //3d i) Erzeugen Sie pro JSON-File-Eintrag einen Marker(siehe marker.png)
                    .append('<img '
                    + 'src="img/marker.png" '
                    // iii) Weisen Sie jedem Marker für die korrekte Optik die Klasse „location“ zu.
                    + 'class="location" '
                    + 'id="poi'+i+'" ' 
                    + 'alt="'+response.name+'" '
                    //  ii) Positionieren Sie diesen via x/y-Koordinaten (css-Positionsangaben mittels top/left) auf der Karte(streetmap).
                    + 'style="top:'+response.coordy+'px; ' 
                    + 'left:'+response.coordx+'px";>')
                //3d iv) Jeder Marker wird beim Laden der Site mit einem fadeIn von 1000ms animiert.    
                $("#poi"+i)
                    .hide()
                    .fadeIn(1000)
                    //3e)
                    .on("click", function(){
                        loadInfo(this)
                    })
                    //3g) Blenden Sie auch die letzte Infobox aus, sobald sich die Maus vom Marker runterbewegt
                    .on("mouseleave",function(){
                        $(".info")
                            .hide()
                    }) 
                         
                //3d v) Erzeugen Sie weiters die Zusatzinformationen (=Infobox) in einem Absatzmit Namen (fett) und den Infos zurSehenswürdigkeit.
                //3d vi) Positionieren Sie die Infobox 85px weiter rechtsdes Markersund auf selber Höhe.
                var posx = Number.parseInt(response['coordx']) + 85;

                $("#map")
                .append('<span '
                    // 3d vii) Vergeben Sie jeder Infobox die Klasse „info“
                    + 'class="info" '
                    + 'id="poi'+i+'" '
                    + 'style="top:'+response.coordy+'px; ' 
                    + 'left:'+posx+'px";>'
                    + '<strong>'+response.name+'</strong><br>'
                    + response.info+ '</span>'
                )

                //3d viii) Alle Infoboxen sollen beim Laden der Site versteckt sein.
                $(".info")
                    .hide()

                //3d ix)Erstellen Sie einen Rahmen für die Karte via JavaScript.
                $("#map")
                    .css("border", "10px solid black")
                
            });
               
            },
        
        // 3b i) Erstellen Sie eine beliebige Fehlermeldung, wenn die Daten nicht geladen werden können
        error: function(JSON){
            console.error("mapload error!")
            showErrorMessage()
        }

    })
 
}

//3e) Erstellen Sie eine neue Funktion mit dem Namen „loadInfo()“ welche aufgerufen wird, sobald ein Marker auf der Karte angeklickt wird 
function loadInfo(clicked){
    //3f) BlendenSie die Infoboxdes aktuellen POIsmit einem togglevon 500ms ein.Es soll immer nur 1 Infobox sichtbar sein, verstecken Sie die Detail-Infos aller anderen Marker wieder.
    $(".info#"+clicked['id'])
        .toggle(500)
}

// 3b i) Erstellen Sie eine beliebige Fehlermeldung, wenn die Daten nicht geladen werden können
function showErrorMessage(){
    $(".headline")
        .append('<p id="error">an Error occured!</p>')
    $("#error")
        .css({  "color":"red",
                "text-align": "center"})
}

$(document).ready(loadMap)