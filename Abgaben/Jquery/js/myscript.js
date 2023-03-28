function addItem() {
    e = $("#item").val();
    $("ol").append('<li>'+e+'<button class="btnUp">^</button><button class="btnDown">v</button><button class="rem">x</button></i></li>');
    $("#item").val("");
    console.log("element added");
}

function removeThisItem(){
    $(this).parent().remove();
    console.log("element removed");
}

function hideList() {
    $("ol").hide();
    console.log("list hidden");
}

function showList() {
    $("ol").show();
    console.log("list shown");
}

function moveUp() {
    var listItem = $(this).closest('li');
    var prevItem = listItem.prev('li');
    if (prevItem.length) {
        listItem.insertBefore(prevItem);
    }
    console.log(this);
    console.log(listItem);
    console.log(prevItem);
    console.log("moved Item up");
}

function moveDown() {
    var listItem = $(this).closest('li');
    var nextItem = listItem.next('li');
    if (nextItem.length) {
        listItem.insertAfter(nextItem);
    }
    console.log(this);
    console.log(listItem);
    console.log(nextItem);
    console.log("moved Item down");
}

$(document).ready(function() {
    //add Item  
    $("#add").attr("title", "Add Item"),
    $("#add").on("click", addItem),
    //remove Item
    $(".rem").attr("title", "Remove Item"),
    $("ol").on("click",".rem", removeThisItem),
    //hide show
    $("#hide").attr("title", "Remove Item"),
    $("#hide").on("click", hideList),
    $("#show").attr("title", "Remove Item"),
    $("#show").on("click", showList)
    //Change order
    $("ol").on("click",".btnUp", moveUp),   
    $("ol").on("click",".btnDown", moveDown)     
});


