$(document).ready(function(){

//-- SHOPLIST --//   
    $.ajax({
        method: "GET",
        dataType: "json",
        url: "../../Data/products.json",

        success: function(json){
            console.log(json)
            loadProducts(json);
            loadHomeCart();
        },
        error: function(json){
            console.error("An ERROR occured!")
        }
    })
});

function loadProducts(data) {

    let productCards = '<ul id="productList"></ul>'

    $("#productListContainer")
        .empty()
        .append(productCards);

    $.each(data, function (i, data) {

        let cardBody = '<div class="col">'
            + '<div class="card-body" id="' + data.id + '">'
            + '<h5 class="productName">' + data.name + '</h5>'
            + '<p class="productPrice">Price: ' + data.price + '</p>'
            + '<p class="productCategory">Category: ' + data.category + '</p>'
            + '<p class="productRating">Rating: ' + data.rating + '</p>'
            + '</div>'
            + '</div>'

        let cardImg = '<div class="cardimg col-md-6">'
            + '<img src=../../public/img/'+ data.img_path +' class="img-fluid rounded-start" alt="Product Picture">'
            + '</div>'
        
        
        $("#productList").append(
            '<div class="card" id="card'+ i +'" draggable="true" ondragstart="drag(event)">'
            + '<div class="row g-0">'
            + cardImg
            + cardBody
            + '</div>'
            + '</div>');

            if ((i+1) % 4 === 0) {
                $("#card"+ i)
                .css("float", "left");
                $("#card"+ i)
                .css("clear", "left");
            }
            else{
                $("#card"+ i)
                .css("float", "left");
            }
    });  
}

//-- Searchfilter -- //



//-- HOMESHOPPING_CARD --//  
function loadHomeCart() {
    let homeCartList = '<ul class="homeCartList" id="homeCartList"></ul>'
    let homeCartSum = '<div class="rowsum"><div class="col" id="homeCartSum">SUMME:' 
                    + '</div><div class="col" id="SumValue">0,00<div>'

    $("#homeCart")
        .append(homeCartList)

    $("#homeCart")
    .append(homeCartSum)

};

//-- DragAndDrop --//
function allowDrop(event){
    event.preventDefault();
}

function drag(event){
    event.dataTransfer.setData("text", event.target.id)
}

function drop(event){
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    var draggedElement = document.querySelector("#0"); // "#" + data

    sendCartProduct(data);
}
//-- write ShoppingCart to CartProductsJson
function sendCartProduct(data){
    
    var cartproductid = {
        id: data,
    };
    
    $.ajax({
        method: "POST",
        url: "/api/v1/auth/cart",
        contentType: "application/json",
        data: JSON.stringify(data),

        success: function(response){
            //console.log(response)
            loadCart(response);
        },
        error: function(response){
            console.error("An ERROR occured!")
        }
    })
}


function loadCart(response){


    //WORKAROUND LOAD TEST cartproducts.json
    $.ajax({
        method: "GET",
        dataType: "json",
        url: "../../Data/cartproducts.json",

        success: function(json){
            console.log(json)
            
        },
        error: function(json){
            console.error("An ERROR occured!")
        }
    })

    // END WORKAROUND LOAD TEST cartproducts.json

    $.each(data, function (i, data) {
    // Create a new list item element
    var listItem = document.createElement("li");
    listItem.id = data;
    
    let cardBody = '<div class="row">'
    + '<div class="card-body col" id="' + data.id + '">'
    + '<p class="productName col">' + data.name + '</p>'
    + '<p class="productPrice col">Price: ' + data.quantity + '</p>'
    + '<p class="productPrice col">Price: ' + data.price_single + '</p>'
    + '<p class="productPrice col">Price: ' + data.price_total + '</p>'
    + '</div>'
    + '</div>'

    
    listItem.textContent = cardBody;

    

    // Append the new list item to the target element
    $("#homeCartList").append(listItem);
    })
}
    
//-- HomeCardSum-Calculator --/
function calculateHomeCardSum(){
    

}

 //console.log("do kumma hi");

