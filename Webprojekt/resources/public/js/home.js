$(document).ready(function(){

//-- SHOPLIST --//   
    $.ajax({
        method: "GET",
        dataType: "json",
        url: "../../Data/products.json",

        success: function(json){
            console.log(json)
            loadProducts(json);
        },
        error: function(json){
            console.error("An ERROR occured!")
        }
    })
});

function loadProducts(data) {

    let productCards = '<div id="productList"></ul>'

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
            '<div class="card" id="card'+ i +'">'
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

//-- HOMESHOPPING_CARD --//  



 //console.log("do kumma hi");

