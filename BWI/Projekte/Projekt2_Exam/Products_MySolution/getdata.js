// 3a)
$(document).ready(loadProducts)

function loadProducts(){
    $.ajax({
        method: "GET",
        dataType: "json",
        url: "products.json",
        //3b)
        success: function(json){
            //3b i)
            console.log(json)
            //3c)
            createList(json)
        },
        //3a i)
        error: function(json){
            console.error("an error occurred")
            showMessage("an error occurred", "#ff0000");
        },
    });

    // extracted from AJAX call for better readability
        function showMessage(message, color) {
            let container = document.createElement("p")
            container.innerText = message
            $("#output")
                .empty()
                .append(container)
                .css({"color": color, "text-align" : "center"});
        }
}
//3c)
function createList(data){
    // init listelements:
    var listContainer = '<ul class="list-group"></ul>'
    $("#output")
        .empty()
        .append(listContainer);
    var listGroup = $(".list-group");
        
    $.each(data, function(i, data) {
        console.log("reached");
        // 3c vi) append to listContainer via class listGroup
        listGroup.append('<li class="'
        // 3c ii) alternate between grey and white
        + ((i % 2 === 0) ? "list-group-item" : "list-group-item greyline")
        // 3c i) Dataset of detail & price 
        + '" data-detail="'+data.detail+'" data-price="'+data.price+'" data-name="'+data.name+'" data-stock="'+data.stock
        // 3c v)
        + '">' + data.name + '</li>');
    })

    // style listItems with class:
    $(".list-group-item")
        // remove makers:
        .css({"list-style-type": "none"})
        // 3c iii) add click event:
        .click(function(){
            // 3c iv) check if stock is > 0
            if($(this).data("stock") > 0){
                showDetails(this);
            }
            else {
                // change color to red if no stock available:
                $(this).css("color", "red")
            }
        });

    // style and animate listGroup
    listGroup
        // 3c viii) add border for listGroup
        .css({"border-style": "solid", "border-width": "3px", "border-color": "skyblue"})
        // 3c vii) slideDown animation 
        .hide()
        .slideDown(350)
}

// 3d) add showDetails
// 3e) get item
function showDetails(item) {
    // 3f) slideUp with 300 ms
    $("#output").slideUp(300, function() {
        $("#selection")
            .empty()
            .append('<p class="text-md-center">'+ $(item).data("detail") + '</p> <br>' +
            '<ul class="list-group">' +
                '<li class="list-group-item"> <strong>Price:</strong> ' + $(item).data("price") + ' €</li>' +
                // 3h) add additional info from json
                '<li class="list-group-item"> <strong>Stock:</strong> ' + $(item).data("stock") + ' pcs.</li>' +
            '</ul>')
            // 3f) fadeIn 200 ms 
            .hide()
            .fadeIn(200);
            // 3g) change Headline Products to current Item Name
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
