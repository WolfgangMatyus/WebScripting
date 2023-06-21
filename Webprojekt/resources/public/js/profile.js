$(document).ready(function(){
//-- Initialize Customerprofile --//
    loadProfile();
    getUserData();
    //loadUserCart();
    //loadUserIvoices();
});

function getUserData(){
    $.ajax({
        method: "GET",
        dataType: "json",
        url: "../../Data/user.json",
        success: function(json){
            console.log(json);
            loadUserData(json);
        },
        error: function(){
            console.error("An ERROR occured!")
        }
    })
};

//-- Navigation User Profile --//
function loadProfile(){

    let profileCardNavbar = '<div class="card" id="cardStammDaten">'
                           +'<div class="card-header" id="stammDatenHeader">'
                           +'<ul class="nav nav-tabs card-header-tabs">'
                           +'<li class="nav-item" id="stammdaten" onclick="setStammdatenActive()">'
                           +'<a class="nav-link active" href="#">Stammdaten</a>' // aria-current="true"
                           +'</li>'
                           +'<li class="nav-item" id="userCart" onclick="setUserCartActive()">'
                           +'<a class="nav-link" id="userCart-link" href="#">Warenkorb</a>'
                           +'</li>'
                           +'<li class="nav-item" id="invoices" onclick="setUserInvoicesActive()">'
                           +'<a class="nav-link" id="invoices-link" href="#">Rechnungen</a>'
                           +'</li>'
                           +'</ul>'
                           +'</div>'
                           +'</div>'
                           +'</div>'

    $("#customerData").append(profileCardNavbar);
}

//-- Navigation User Profile Functionality --//
function setStammdatenActive(){
    $(".profile-card-body").hide()
    $(".nav-link").attr("class", "nav-link")
    $("#userCart-link").attr("class", "nav-link active")
    $("#userStammdaten").show();
}

function setUserCartActive(){
    $(".profile-card-body").hide()
    $(".nav-link").attr("class", "nav-link")
    $("#userCart-link").attr("class", "nav-link active")
    $("#userCart").show();
}

function setUserInvoicesActive(){
    $(".profile-card-body").hide()
    $(".nav-link").attr("class", "nav-link")
    $("#invoices-link").attr("class", "nav-link active")
    $("#invoices").show();
}

function loadUserData(json){

    let userData = '<div class="profile-card-body" id="userStammdaten">'
                  +'<h5 class="card-title">Ihre Userstammdaten:</h5>'
                  +'<div class="userData" id="userData">'
                  +'<div class="row">'
                  +'<div class="userDataLable col" id="email">Email: </div>'
                  +'<div class="userDataValue col" id="email">'+json[2].email+'</div>'
                  +'</div>'
                  +'<div class="row">'
                  +'<div class="userDataLable col" id="firstname">Vorname: </div>'
                  +'<div class="userDataValue col" id="firstname">'+json[2].firstname+'</div>'
                  +'</div>'
                  +'<div class="row">'
                  +'<div class="userDataLable col" id="lastname">Nachname: </div>'
                  +'<div class="userDataValue col" id="lastname">'+json[2].lastname+'</div>'
                  +'</div>'
                  +'<a href="#" class="btn btn-primary">Stammdaten anpassen</a>'
                  +'</div>'
                  +'<div class="userData" id="userData">'
                  +'<h5 class="card-title">Ihre Zahlungsart:</h5>'
                  +'<div class="paymentTypes" id="paymentTypes">'
                  +'<p>Bitte wählen sie eine Zahlungsart:</p>'
                  +'<input type="radio" id="kreditkarte" name="paymentType" value="kreditkarte">'
                  +'<label for="kreditkarte"> Kreditkarte</label><br>'
                  +'<input type="radio" id="eps" name="paymentType" value="eps">'
                  +'<label for="eps"> EPS</label><br>'
                  +'<input type="radio" id="Klarna" name="paymentType" value="Klarna">'
                  +'<label for="Klarna"> Klarna</label><br>'
                  +'<input type="radio" id="paypal" name="paymentType" value="paypal">'
                  +'<label for="paypal"> Paypal</label>'
                  +'</div>'
                  +'</div>'

    $("#cardStammDaten").append(userData);

    $(".userDataLable")
        .css({"font-weight": "bold"})

}

