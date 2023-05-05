/*ToDo*/

function loadWeather() {	
    //3b Implementieren Sie einen AJAX-Call der ausgeführt wird, wenndie Seite aufgerufen wirdund fertig geladen is
    $.ajax({

        method: "GET",
        data:"weatherdata",
        url: "weatherdata.json",

        success: function(weatherdata){
            //3c & i) Laden Sie die Inhalte von weatherdata.jsonvia AJAX und nehmen Sie diese entgegen
            console.log(weatherdata)

            
            var weather;
            var degrees;
            var x;
            var y;

            $.each(weatherdata, function(i, weatherdata) {
                //3c) 
                weather = weatherdata.weather;
                degrees = weatherdata.degrees;  
                x = weatherdata['position'].x;
                y = weatherdata['position'].y;
                //3c i)
                console.log(weather+","+degrees+","+x+","+y)
            
            
            //console.log(weatherdata['position'].y)

            //3e)
            $("#europe")
                .append('<img  '
                // i)
                + 'src="img/'+weatherdata.weather+'.png" '
                // iii)
                + 'class="weather" '
                + 'id="poi'+i+'" ' 
                + 'alt="'+weatherdata.weather+'" '
                //  ii) Positionieren Sie diesen via x/y-Koordinaten (css-Positionsangaben mittels top/left) auf der Karte(streetmap).
                + 'style="top:'+weatherdata['position'].y+'px; ' 
                + 'left:'+weatherdata['position'].x+'px";>')
                
              $(".weather")  
                .css("border", "2px solid black")
            //3e iv)
            $("#poi"+i)
                .hide()
                .fadeIn(1000)
                .on("click", function(){
                    showTemeratuer(this)
                })
                
            //3e v)
            $("#temperature")    
                .append('<div '
                + 'class="alert alert-primary weather info alert-trim" role="alert" '
                + 'id="poi'+i+'" '
                //+ 'style="top:'+weatherdata['position'].y+'px; ' 
                //+ 'left:'+weatherdata['position'].x+'px";>'
                + '<p>'+weatherdata.weather+'</p>'+'<br>'
                + '<p style="font-size:40px">'+weatherdata.degrees+'</p>'
                + '</div>')

                $(".info")
                    .hide()
            })
            
        },
        //3b i) Erstellen Sie eine Fehlermeldung,wenn die Daten nicht geladen werden können, in der Optik eines Bootstrap-Alerts.Im Falle eines Fehlers, wird keine Karte angezeigt
        error: function(){
            console.error("an error occured")
            $("#europe")
                .hide()
            $("#mainContainer")
                .append(' <div class="alert alert-danger" role="alert">'
                + 'An Error occured!'
                + '</div>'

            )
           

        }
    })

}

function showTemeratuer(clicked){
    $(".info")
        .hide()
    $(".info#"+clicked['id'])
        .slideDown(300)
        .css("color", "green")
}

$(document).ready(loadWeather)