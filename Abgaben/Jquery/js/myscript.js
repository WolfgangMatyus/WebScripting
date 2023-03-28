var i=0;
function addItem() {
    e = $("#item").val();
    $("ol").append("<li id="+i+">" + e + "</li>");
    $("#item").val("");
    console.log("element added");
    i++
}

function removeItem() {
    r = $("#index").val();
    $("li").remove("#"+r)
    console.log("element removed");
}


$(document).ready(function(){
    $("#add").attr("title", "Add Item"),
    $("#add").on("click", addItem),
    $("#rem").attr("title", "Remove Item"),
    $("#rem").on("click", removeItem),
    $("#hide").attr("title", "Remove Item"),
    $("#hide").on("click", show_hide_list)
    $("#hide").click(function(){
        $("ol").hide();
      });
      $("#show").click(function(){
        $("ol").show();
      });
});