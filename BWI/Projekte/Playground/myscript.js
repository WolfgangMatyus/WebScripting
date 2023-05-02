$(document).ready(loadBattlefield);

function loadBattlefield(){

    $.ajax({
        method: "GET",
        dataType: "json",
        url: "data.json",

        success: function(json){
            console.log(json)
            loadTeams(json);
        },
        error: function(json){
            console.error("An ERROR occured!")
        }
    })
}

function loadTeams(data){

    var listLightContainer = '<ul class="list-group" id="Light"></ul>'
    var listDarkContainer = '<ul class="list-group" id="Dark"></ul>'

    $("#teamLight")
        .empty()
        .append(listLightContainer);
        
    $("#teamDark")
        .empty()
        .append(listDarkContainer);

    $.each(data, function(i, data) {

    var cardbody = '<div class="col-md-6">'
                + '<div class="card-body" id="'+data.name+'">'
                + '<h5 class="card-title">'+data.name+'</h5>'
                + '<p class="card-text">class: '+data.class+'</p>'
                + '<p class="card-text">Race: '+data.race+'</p>'
                + '<p class="card-text">Damage: '+data.damage+'</p>'
                + '<p class="card-text">Heal: '+data.heal+'</p>'
                + '<p class="card-text">Armor: '+data.armor+'</p>'
                + '<p class="card-text">Health: '+data.health+'</p>'
                + '</div>'
                + '</div>'

    var cardimg = '<div class="cardimg col-md-6">'
    + '<img src='+data.img+' class="img-fluid rounded-start" alt="Avatarpicture">'
    + '<div class="row">'
    + '<div class="col">'
    + '<button class="attack">Attack!</button>'
    + '</div>'
    + '<div class="col">'
    + '<button class="defend">Defend!</button>'
    + '</div>'
    + '</div>'
    + '</div>'
    
    
    $(((data.side == "light") ? "#Light" : "#Dark")).append(
            '<div class="card mb-3">'
            + '<div class="row g-0">'
            + ((data.side == "dark") ? cardimg : "")
            + cardbody
            + ((data.side == "light") ? cardimg : "")
            + '</div>'
            + '</div>');
    });
    
    // Animation Avatardetails slide out of image
    $(".cardimg")
        .css({"border-style": "outset", 
              "border-width": "10", 
              "border-color":"silver"})

        .on("mouseenter", function(){      
            $(((((this.parentElement).parentElement.parentElement.id) == "Dark") ? 
            this.nextSibling.firstChild : this.parentElement.firstChild.firstChild))
                .show()
            
                
        })
        .on("mouseleave", function(){
            $(((((this.parentElement).parentElement.parentElement.id) == "Dark") ? 
            this.nextSibling.firstChild : this.parentElement.firstChild.firstChild))
            .hide()
         });

    $(".card-body")
        .css({"border-style": "inset", 
              "border-width": "10", 
              "border-color":"silver"})
        .hide()

    $(".attack")
         .on("click", function(){
            save();
         })

         .on("mouseenter", function(){
            $(this).css("color", "red")
         })
        .on("mouseleave", function(){
            $(this).css("color", "black")
         })
}

function save(){
    var eventsholded = [
        {
            "message" : "Success!"
        }
    ];

    $.ajax
    ({
        type: "GET",
        dataType : 'json',
        async: false,
        url: 'writejson.php',
        data: { data: JSON.stringify(eventsholded) },
        success: function () {alert("Thanks!"); },
        failure: function() {alert("Error!");}
    });
}
