function loadProductlist(){
    // 4a)
    $.ajax({
        method: "GET",
        data: "json",
        url: "products.json",
        // 4b)
        success: function(json){
            //console.log(json);
            // 4d)
            createList(json);
        },
        // 4c)
        error: function(json){
            //console.error("an error occured");
            showError();
        }
    })

    // onClick auf Header Products wird die Productliste erneut geladen
    $("#productHeader")
    .click(loadProductlist)
}
// 4c)
function showError(){
    $("#output")
        .empty()
        .append(
        '<p id="error">an error occured</p>'
    )

    $("#error")
            .css({"color": "red", "font-weight":"bold", "text-align":"center"})
}

// 4d)
function createList(data){
    
    $("#output")
        .empty()
        .append(
            '<table class="table" id="productsTable">'
            +'<tbody></tbody>'
            +'</table>'    
        )

    $.each(data, function(i, data){
        $("tbody")
        .append('<tr class="'
                // 4d i) alternierende Grauschattierung
                + ((i % 2 === 0) ? "tblrow" : "tblrow greyline")+'">'
                +'<th>'
                +data.name+" for € "+data.price
                +'</th>'
                +'</tr>');
    })

    // 4d ii) SlideDown effect für Table
    $("#output")
        .hide()
        .slideDown(250)
    
    // 4d iii) Rahmen mit 1px und Farbe #A5ACB2
    $("#productsTable")
        .css({"border-style": "solid", "border-width": "1px", "border-color": "#A5ACB2"})
    
    // hovereffect
    document.getElementById("productsTable").setAttribute("class", "table table-hover")
    
    // 4e)
    $(".tblrow")
    .on("click", function(){
        selectItem(this)
    });
}


function selectItem(selectItem){
    // 4f)
    $("#output")
        .slideUp(250, function(){
            // 4f i)
            $("#selection")
                .empty()
                .append('<h3 id="SelectedHeader">selected:</h3>')
                .append(selectItem)
                .hide()
                .fadeIn(150);
        })
}

$(document).ready(loadProductlist)