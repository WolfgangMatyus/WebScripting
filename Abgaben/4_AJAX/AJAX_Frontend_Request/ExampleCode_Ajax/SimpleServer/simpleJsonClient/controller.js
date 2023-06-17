//Starting point for JQuery init
$(document).ready(function () {
    $("#searchResult").hide();
    $("#btn_Search").click(function (e) {
       loaddata($("#seachfield").val());
    });

});

function loaddata(searchterm) {

$.ajax({
    type: "GET",
    url: "../serviceHandler.php",
    cache: false,
    data: {method: "queryPersonsData"},
    dataType: "json",
    success: function (response) {

        $(".PersonData").delay(8000).remove();
        response.forEach(function (subArray) {
            var person = subArray[0]; 
            var div = $('<div class="PersonData">'); 
            
            for (var prop in person) {
                if (person.hasOwnProperty(prop)) {
                    var value = person[prop];
                    var span = $("<span>").text(prop + ": " + value + " | "); 
                    div.append(span);
                }
            }
            
            $("#searchResult").append(div); 
        });

        $("#searchResult").show(1000).delay(1000).hide(1000);
        $("#dynamic").load("../clientParts/simplePart.html");
    }
    
});
    $.ajax({
        type: "GET",
        url: "../serviceHandler.php",
        cache: false,
        data: {method: "queryPersonByName", param: searchterm},
        dataType: "json",
        success: function (response) {
            
            $("#noOfentries").val(response.length);
            $("#searchResult").show(1000).delay(1000).hide(1000);
            $("#dynamic").load("../clientParts/simplePart.html");
        }
        
    });

    $.ajax({
        type: "GET",
        url: "../serviceHandler.php",
        cache: false,
        data: {method: "queryPersonById", param: searchterm},
        dataType: "json",
        success: function (response) {
            
            $("#noOfentries").val(response.length);
            $("#searchResult").show(1000).delay(1000).hide(1000);
            $("#dynamic").load("../clientParts/simplePart.html");
        }
        
    });

    
}
