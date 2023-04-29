function loadProducts() {
    // 3a
    $.ajax({
        method: "GET",
        dataType: "json",
        url: "products.json",
        // 3b
        success: function (json) {
            buildList(json); // to 3c
            //3b i)
            console.log(json)
        },
        // 3a i)
        error: function (json) {
            // Coment aus der Angabe:
            // console.error("If the browser complains about CORS policy, run the project using XAMPP or PhpStorm")
            // showMessage("Something went wrong, and we're not doing anything to fix it", "#ff0000");
            console.error("an error occurred")
            showMessage("an error occurred", "#ff0000");
        }
    });
}

// extracted from AJAX call for better readability
function buildList(data) {
    let listContainer = '<ul class="list-group"></ul>'
    $("#output")
        .empty()
        .append(listContainer);
    let listGroup = $(".list-group");

    // 3c i) ii) v) vi)
    $.each(data, function(i, data) {
        listGroup.append('<p class="'
            +((i % 2 === 0) ? "list-group-item" : "list-group-item greyline") // less clutter than .even()
            +'" data-name="'+data.name+'" data-price="'+data.price+'" data-stock="'+data.stock+'" data-detail="'+data.detail+'">'
            + data.name+'</p>');
    })

    // 3c vii) viii)
    listGroup
        .css({"border-style": "solid", "border-width" : "3px", "border-color" : "#8080f0"})
        .hide()
        .slideDown(350)

    // 3c iii)
    $(".list-group-item").click(function() {
        // 3c iv)
        if ($(this).data("stock") > 0) {
            showDetails(this);
        } else {
            $(this).css("color","#808080") // providing some sort of visual indicator
        }
    });
}

// extracted from AJAX call for better readability
function showMessage(message, color) {
    let container = document.createElement("p")
    container.innerText = message
    $("#output")
        .empty()
        .append(container)
        .css({"color": color, "text-align" : "center"});
}

// 3d 3e 3f 3g 3h
// just had to correct the spelling (naming conventions!!!)...
function showDetails(item) {

    $("#output").slideUp(300, function() {
        $("#selection")
            .empty()
            .append('<p class="text-md-center">' + $(item).data("detail") + '</p> <br>' +
                '<ul class="list-group">' +
                '<li class="list-group-item"> <strong>Price:</strong> ' + $(item).data("price") + ' €</li>' +
                '<li class="list-group-item"> <strong>Stock:</strong> ' + $(item).data("stock") + ' pcs.</li>'+
                '</ul>')
            .hide()
            .fadeIn(200);
            $("#productlabel").text($(item).data("name")).hide().fadeIn(200);
    })
}

$(document).ready(function() {
    $("#container").addClass("container-sm");

    // some extra functionality to navigate back
    let productLabel = $("#productlabel");
    productLabel.click(function () {
        if ("Products" !== productLabel.text().trim().toString()) {
            loadProducts();
            $("#selection").fadeOut(250, function () {
                $("#output").fadeIn(250);
                productLabel.text("Products");
            });
        }
    });
});

// start
loadProducts()