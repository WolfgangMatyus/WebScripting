$(".red").each(function(key, ele){
    var text = $(ele).text();
    console.log(text);
});

$(document).ready(function(){
    $("button").click(function(){
      $("li").each(function(){
        alert($(this).text())
      });
    });
  });