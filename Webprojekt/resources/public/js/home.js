$(document).ready(function(){

//-- Initialize SHOPLIST --//   
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

    let productCardsList = '<div id="productList" class="row row-cols-1 row-cols-md-3 g-4">'
                        +  '</div>'

    $("#productListContainer")
        .empty()
        .append(productCardsList);

    $.each(data, function (i, data) {

        let cardBody = '<div class="col">'
                    +  '<div class="card-body" id="' + data.id + '">'
                    
                    +  '<p class="productPrice">Price: ' + data.price + '</p>'
                    +  '<p class="productCategory">Category: ' + data.category + '</p>'
                    +  '<p class="productRating">Rating: ' + data.rating + '</p>'
                    +  '</div>'
                    +  '<div class="card-footer">'
                    +  '<small class="text-body-secondary">'
                    +  '<a href="#" class="btn btn-primary">Add to Cart</a>'
                    +  '</small>'
                    +  '</div>'


        let cardImg = '<div class="cardimg h-100">' // cardimg col-md-6
                    + '<img src=../../public/img/'+ data.img_path +' class="img-fluid" alt="Product Picture">'
                    + '</div>'
        
        $("#productList").append( '<div class="col">'
                                + '<div class="card h-100" id="card'+ i +'" draggable="true" ondragstart="drag(event)">'
                                + '<div class="card-header">'
                                + '<h5 class="productName">' + data.name + '</h5>'
                                + '</div>'
                                + cardImg
                                + cardBody
                                + '</div>'
                                + '</div>'            
            )
    });  
}

//-- Searchfilter -- //



//-- HOMESHOPPING_CARD --//  
function loadHomeCart() {

    let homeCartList = '<div class="homeCartList droppable" id="homeCartList" ondrop="drop(event)" ondragover="allowDrop(event)">'
                    +  '<div class="Placeholder" id="homeCartListPlaceholder">'
                    +  'You can drag a Product and drop it here to add it to the Shopping Cart'
                    +  '</div>'
                    +  '</div>'
    let homeCartSum = '<div class="row"><div class="col" id="homeCartSum">SUMME:' 
                    + '</div><div class="col" id="SumValue">0,00<div>'

    let homeCart = '<div class="col">'
    +  '<div class="card droppable h-100" id="homeCart" "></div>'
    +  '<div class="card-header">'
    +  '<h5 class="productName">Shopping Cart</h5>'
    +  '</div>'
    +  homeCartList
    +  homeCartSum
    +  '</div>'
    +  '</div>'
    
    $("#homeCartContainer")
    .append(homeCart)

    $("#homeCartListPlaceholder").css({
        "border-style": "dotted",
        "border-radius": "15px",
        "padding": "1px"
      });

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
    var draggedElement = document.querySelector("#" + data);

    sendCartProduct(data);
}
//-- write ShoppingCart to CartProductsJson
function sendCartProduct(data){
    
    let response = data;
    getCartFromBackend(response);

    // WORKAROUND LOAD TEST cartproducts.json
    // Every drag and drop sends a POST with CartProductID to REST-API 
    // wich adds the id to a cartlist and returns the current 
    // Shopping Cart Items with values in response like in 
    // Data/cartproducts.json

    /*var cartproductid = {
        id: data,
    };
    
    $.ajax({
        method: "POST",
        url: "/api/v1/auth/cart",
        contentType: "application/json",
        data: JSON.stringify(cartproductid),

        success: function(response){
            console.log(response)
            loadCart(response);
        },
        error: function(response){
            console.log(response)
            console.error("An ERROR occured!")
        }
    })
    */
}

function getCartFromBackend(response){

    // WORKAROUND LOAD TEST cartproducts.json
    $.ajax({
        method: "GET",
        dataType: "json",
        url: "../../Data/cartproducts.json",

        success: function(json){
            console.log(json)
            loadCartOnFrontend(json)
        },
        error: function(json){
            console.error("An ERROR occured!")
        }
    })
    // END WORKAROUND LOAD TEST cartproducts.json
}
    
function loadCartOnFrontend(data){
        $.each(data, function (i, data) {
            
            let cardBody = '<div class="row">'
            + '<div class="card-body" id="' + data.id + '">'
            + '<div class="productName col-3">' + data.name + '</div>'
            + '<div class="productQuantity col-3">Quantity: ' + data.quantity + '</div>'
            + '<div class="productPriceSingle col-3">Price Single: ' + data.price_single + '</div>'
            + '<div class="productPriceTotal col-3">Price Total: ' + data.price_total + '</div>'
            + '</div>'
            + '</div>'
        
            // Append the new list item to the target element
            $("#homeCartList").append(cardBody);
            })
    }

//-- HomeCardSum-Calculator --/
function calculateHomeCardSum(){
    

}

 //console.log("do kumma hi");

