
/*called from index.html $(document).ready(load)*/
function load(){
    //alert("SUCCESS!");
    console.log("load -> loaded")

    $("body").append("<button id='btn'>Add Input</button> ")

    $.ajax({
        type: "GET",
        url: "data.json",
        cache: false,
        dataType: "json",
        success: function(response){
            $.each(response, function(i, jsonData){
                console.log("ajaxGET: " + jsonData["message"]);
                //alert(jsonData["message"]);

            });
        },
        error:function(e){
            $("#mapContainer").text("an error occurred");
            $("#mapContainer").css("color", "#FF0000");
            $("#mapContainer").css("text-align", "center");
        }
    });

    $("#btn").click(function(){
        $.ajax({
            type: "POST",
            url: "data.json",
            cache: false,
            dataType: "json",
            success: function(data,status){       
                alert("Data: " + data + "\nStatus: " + status);
                buildInputField();
            },
            error:function(e){
                $("#mapContainer").text("an error occurred");
                $("#mapContainer").css("color", "#FF0000");
                $("#mapContainer").css("text-align", "center");
            }
        });
    });
}

function buildInputField(){
    var i = 0;
    $("#btn").remove()
    $("body").append("<div class='box' id='div"+i+"'></div>")
    $("#div0").append("<input class='input' id='input"+i+"' placeholder='Name'></input>")
    $("#div0").append("<input class='input' id='input"+ (i+1) +"' placeholder='Password'></input>")
    $("#div0").append("<button id='btn-adduser'>Add User</button>")
}


//Starting point for JQuery init
$(document).ready(function () {
    $("#searchResult").hide();
    $("#btn-adduser").click(function (e) {
       loaddata($("#input0").val(), $("#input1").val());
    });

});

function loaddata(name, pw) {

    $.ajax({
        type: "GET",
        url: "../serviceHandler.php",
        cache: false,
        data: {method: "queryPersonByName", name: name, password: pw},
        dataType: "json",
        success: function (response) {
            
            $("#noOfentries").val(response.length);
            $("#searchResult").show(1000).delay(1000).hide(1000);
        }
        
    });
}