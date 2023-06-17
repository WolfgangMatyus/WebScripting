$(document).ready(function(){

    console.log("do kumma hi");
    $.ajax({
        method: "GET",
        dataType: "json",
        url: "../JasonTest/products.json",

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
            + '<img src=../imgTest/'+ data.img_path +' class="img-fluid rounded-start" alt="Product Picture">'
            + '</div>'
        
        if ((i+1) % 4 === 0) {
        $("#productList").append(
            '<div class="card2 ">'
            + '<div class="row g-0">'
            + cardImg
            + cardBody
            + '</div>'
            + '</div>');

                } else {
                    $("#productList").append(
                        '<div class="card ">'
                        + '<div class="row g-0">'
                        + cardImg
                        + cardBody
                        + '</div>'
                        + '</div>');
                }
    });  
}