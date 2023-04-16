/*ToDo*/

function loadMap() {	
    
    $.ajax({
        type: "GET",
        url: "traveldata.json",
        cache: false,
        dataType: "json",
        success: function (response) {
            
			$("#mapContainer").css("color", "#000000");
            $('#map').hide();            

            $.each(response, function(i, jsonData) {
                //console.log(jsonData["name"], ",", jsonData["detail"]);
				
				var posx = jsonData["coordx"];
				var posy = jsonData["coordy"];
				
				$("#map").append("<img class='poi' id='poi"+i+"' style='top:"+ posy +"px; left:"+ posx +"px;' src='img/marker.png'>");
				
				$("#map").append("<span class='detail poi"+i+"' style='top:"+ (posy-40) +"px; left:"+ (posx-85) +"px;'><b>"+jsonData["name"]+"</b>: "+jsonData["detail"]+"</span>");
      
            });
			$('.detail').hide();
			$('#map').css("border", "#1px solid dashed");
            $('#map').slideDown(350);
        
        },
        error: function (e) {
            $("#mapContainer").text("an error occurred");
            $("#mapContainer").css("color", "#FF0000");
            $("#mapContainer").css("text-align", "center");
        }
    });
}

function showDetail() {	
	$('.detail').hide();
    var selectedPoi = $(this).attr("id");		
	$("."+selectedPoi).fadeIn(350);    
}