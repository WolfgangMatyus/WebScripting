

function changeText(){
    var ue1 = document.getElementById("ue1").innerHTML
    //console.log("Test");
    if(ue1 == "Neuer Text"){
        document.getElementById("ue1").innerHTML = "Hello JavaScript"
    }else{
        document.getElementById("ue1").innerHTML = "Neuer Text";
    }
    
    //window.alert("Hallo");
}