//--- VARIABLES ---//
var products = [];
getProducts();
var cartData=[];
getCart();

//--- CODE ---//
$(document).ready(function(){
//-- Initialize SHOPLIST --//
    InitializeSearchFilter();
    filterProducts();
});

function getProducts(){
    $.ajax({
        method: "GET",
        dataType: "json",
        url: "../../Data/products.json",
        success: function(json){
            //console.log(json);
            products = json;
            console.log(products);
        },
        error: function(){
            console.error("An ERROR occured!")
        }
    })
};

function getCart(){

    // WORKAROUND LOAD TEST cart.json
    $.ajax({
        method: "GET",
        dataType: "json",
        url: "../../Data/cart.json",
        success: function(json){
            //console.log(json)
            cartData = json;
            console.log(cartData)
            loadCart();
        },
        error: function(){
            console.error("An ERROR occured!")
        }
    })
    // END WORKAROUND LOAD TEST cart.json
}

//-- SearchFilter Visuals -- //
function InitializeSearchFilter(){
    $("#categorySearchFilter")
        .append('<div id="filterContainer">'
                +'<select id="categoryFilter">'
                +'<option value="">All Categories</option>'
                +'<option value="Cardgame">Cardgame</option>'
                +'<option value="Boardgame">Boardgame</option>'
                +'<option value="Accesories">Accesories</option>'
                +'<option value="rating">Rating</option>'
                +'</select>'
                +'<select id="priceFilter">'
                +'<option value="">All Prices</option>'
                +'<option value="under25"> < €25</option>'
                +'<option value="25to50">€25 - €50</option>'
                +'<option value="over50"> > €50</option>'
                +'</select>'
                +'<input type="text" id="searchInput" placeholder="Search products">'
                +'</div>'
                );
}
//-- SearchFilter Functionality --//
function filterProducts() {
    console.log("filterProducts");
    const searchKeyword = $("#searchInput").val().toLowerCase();
    const categoryFilter = $("#categoryFilter").val();
    const priceFilter = $("#priceFilter").val();
  
    const filteredProducts = products.filter(product => {
      const nameMatch = product.name.toLowerCase().includes(searchKeyword);
      const categoryMatch = categoryFilter === "" || product.category === categoryFilter;
      const priceMatch =
        priceFilter === "" ||
        (priceFilter === "under25" && product.price < 25) ||
        (priceFilter === "25to50" && product.price >= 25 && product.price <= 50) ||
        (priceFilter === "over50" && product.price > 50);
  
      return nameMatch && categoryMatch && priceMatch;
    });
  
    loadProducts(filteredProducts);
  }
  
  // Function to display the filtered products
  function loadProducts(products) {
    const productList = $("#productList");
    productList.empty();
  
    if (products.length === 0) {
      productList.append("<p>No products found.</p>");
    } else {
      products.forEach(product => {
        productList.append("<p>" + product.name + "</p>");
      });
    }
  }
  
  // Event listeners for search input and filter changes
  $("#searchInput, #categoryFilter, #priceFilter").on("input change", filterProducts);

function loadProducts(data) {
    console.log("loadProducts");
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

        let cardImg = '<div class="cardimg h-100">'
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

//-- HOMESHOPPING_CART --//  
function loadCart() {
    console.log("loadCart");
    let cartHeader = '<div class="header" id="cartHeader">'
                    +'<div class="row">'
                    +'<div class="col center"><h5>Product Name</5></div>'
                    +'<div class="col center"><h5>Quantity</5></div>'
                    +'<div class="col center"><h5>Price Single</5></div>'
                    +'<div class="col center"><h5>Total</5></div>'
                    +'</div>'
                    +'</div>'
    let cartList = '<ul class="cartList" id="cartList">'
                    +  '<div class="Placeholder" id="cartListPlaceholder">'
                    +  'You can drag a Product and drop it here to add it to the Shopping Cart!'
                    +  '</div>'
                    +  '</ul>'
    let cartSum = '<div class="row">'
                    + '<div class="col" id="cartSumLable">SUMME:</div>'
                    + '<div class="col" id="cartSumValue">0,00</div>'
                    + '</div>'
    
    let cart = '<div class="col">'
            +  '<div class="card droppable h-100" ondrop="drop(event)" ondragover="allowDrop(event)" id="cart">'
            +  '<div class="card-header">'
            +  '<h4 class="cartName">Shopping Cart</h4>'
            +  '</div>'
            +  cartHeader
            +  cartList
            +  '<div class="card-footer">'
            +  '<small class="text-body-secondary">'
            +  cartSum
            +  '</small>'
            +  '</div>'
            +  '<button class="btn btn-primary" id="orderBtn" onclick="openPopup()">Jetzt bestellen!</button>'
            +  '</div>'
            
    let popupWindow = '<div id="popup" class="popup">'
            + '<h2>Ihre Bestellung</h2>'
            + '<div id="order-details"></div>'
            + '<label for="coupon-input">Gutschein einlösen:</label>'
            + '<input type="text" id="coupon-input" />'
            + '<br />'
            + '<button onclick="applyCoupon()">Gutschein einlösen</button>'
            + '<br />'
            + '<div class="row">'
            + '<div class="col" id="total-amountLable">SUMME: </div>'
            + '<div class="col" id="total-amount">0,00</div>'
            + '</div>'
            + '<label for="payment-method">Zahlungsmethode:</label>'
            + '<select id="payment-method">'
            + '<option value="Kreditkarte">Kreditkarte</option>'
            + '<option value="EPS">EPS</option>'
            + '<option value="Klarna">Klarna</option>'
            + '</select>'
            + '<br />'
            + '<button onclick="closePopup()">Bestellung abschließen</button>'
            + '</div>'

    $("#cartContainer").append(cart)
    $("#categorySearchFilter").append(popupWindow) 
    $("#cartListPlaceholder").css({
        "border-style": "dotted",
        "border-radius": "15px",
        "padding": "40px",
        "margin": "20px 30px 20px 0px"
      });
      loadCartProducts();
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
    console.log(data)
    var draggedElement = document.querySelector("#" + data);

    sendCartProduct(data);
}
//-- write ShoppingCart to CartProductsJson
function sendCartProduct(data){
    
    let response = data;
    getCart(response);

    // WORKAROUND LOAD TEST cart.json
    // Every drag and drop sends a POST with CartProductID to REST-API
    // wich adds the id to a cartlist and returns the current
    // Shopping Cart Items with values in response like in
    // Data/cart.json

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
    
function loadCartProducts(){
    console.log("loadCartProducts");
    $(".Placeholder").remove();
    console.log(cartData);
    $.each(cartData, function (i, cartData) {
            
        let cardBody = '<li class="listItem" id="' + cartData + '">'
        + '<span class="listItemValue" id="productName">' + cartData.name + '</span>'
        + '<span class="listItemValue Number" id="productQuantity">' + cartData.quantity + '</span>'
        + '<span class="listItemValue Number" id="productPriceSingle"> ' + cartData.price_single + '</span>'
        + '<span class="listItemValue Number" id="productPriceTotal">'+ cartData.price_total + '</span>'
        + '</li>'
    
    $("#cartList").append(cardBody);
    })
    $(".Number")
    .css({"text-align": "right"
})

}

function openPopup() {
            document.getElementById('popup').style.display = 'block';
            //document.getElementById('overlay').style.display = 'block';
            // Hier können Sie die Produktliste mit Name, Anzahl, Preis, usw. dynamisch generieren und in das 'order-details'-Element einfügen.
            // Beispiel:
            var productList = [
                { name: 'Produkt 1', quantity: 2, price: 10 },
                { name: 'Produkt 2', quantity: 1, price: 5 },
                { name: 'Produkt 3', quantity: 3, price: 8 }
            ];
            var orderDetailsHTML = '';
            var totalAmount = 0;
            for (var i = 0; i < productList.length; i++) {
                var product = productList[i];
                var totalPrice = product.quantity * product.price;
                orderDetailsHTML += '<p>' + product.name + ' - ' + product.quantity + 'x - Preis: ' + product.price + '€ - Gesamt: ' + totalPrice + '€</p>';
                totalAmount += totalPrice;
            }
            document.getElementById('order-details').innerHTML = orderDetailsHTML;
            document.getElementById('total-amount').innerHTML = totalAmount;
        }

function applyCoupon() {
    var couponInput = document.getElementById('coupon-input').value;
    // Hier können Sie den Gutscheinwert prüfen und die Gesamtsumme entsprechend reduzieren.
    // Beispiel:
    var totalAmount = parseFloat(document.getElementById('total-amount').innerHTML);
    var couponValue = parseFloat(couponInput);
    if (!isNaN(couponValue)) {
        totalAmount -= couponValue;
    }
    document.getElementById('total-amount').innerHTML = totalAmount + '€';
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
    //document.getElementById('overlay').style.display = 'none';
}