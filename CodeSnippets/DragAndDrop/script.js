$(function() {
    $("#draggable").draggable({
      revert: "invalid",
      cursor: "move"
    });
    
    $("#droppable").droppable({
        accept: ".draggable",
        drop: function(event, ui) {
          const cardContent = ui.draggable.text();
          const listItem = $("<li>").text(cardContent);
          $(this).append(listItem);
          $(this).addClass("ui-state-highlight");
          ui.draggable.remove();
        }
      });
  });