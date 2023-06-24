

export default function getCart(){
    $.ajax({
        method: "GET",
        dataType: "json",
        url: "../../Data/cart.json",
        success: function(json){
            console.log(json);
            ;
        },
        error: function(){
            console.error("An ERROR occured!")
        }
    })
};
