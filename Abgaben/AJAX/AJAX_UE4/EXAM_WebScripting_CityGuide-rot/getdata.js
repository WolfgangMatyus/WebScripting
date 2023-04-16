/*ToDo*/

function loadMap() {	

    $.ajax({

        type: "GET",
        url: "traveldata.json",
        cache: false,
        dataType: "json",
        success: function(response){
            //alert("SUCCESS!");

            //Slide Down#1 Animation mit 350ms 
            $("#mapContainer").css("color", "#000000");
            $('#map').hide();

            $.each(response, function(i, jsonData){
                console.log(jsonData["name"], ",", jsonData["detail"]);
                //alert("SUCCESS! " + jsonData["name"]);
                var posx = jsonData['coordx'];
                var posy = jsonData['coordy'];

                //Marker img Elemente an der entsprechenden Position aus den jsonData auf der Karte hinzufügen:
                $("#map").append("<img class='poi' id='poi"+ i +"' style='top:"+ posy +"px; left:"+ posx +"px;' src='img/marker.png'>");
                
                //Detail info span an der entsprechenden Position aus den jsonData auf der Karte hinzufügen:
                $("#map").append("<span class='detail poi"+ i +"' style='top:"+ (posy-40) +"px; left:"+ (posx-85) +"px;'><b>"+ jsonData["name"] +"</b>: "+ jsonData["detail"] +"</span>");

            });

            //Slide Down#2 Animation mit 350ms
            $('.detail').hide();
            $('#map').css("border", "#3px solid dashed");
            $('#map').slideDown(350);

        },
        error:function(e){
            $("#mapContainer").text("an error occurred");
            $("#mapContainer").css("color", "#FF0000");
            $("#mapContainer").css("text-align", "center");
        }
    });

}

function showDetail() {
    //alert("SUCCESS!");
    $('.detail').hide();
    var selectedPoi = $(this).attr("id");
    $("."+selectedPoi).fadeIn(350);
}

function hideDetail() {
    //alert("SUCCESS!");
    $('.detail').hide();
}
