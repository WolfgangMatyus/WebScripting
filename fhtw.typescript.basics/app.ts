const button = document.querySelector("button");
const number1 = document.getElementById("number1");
const number2 = document.getElementById("number2");

function add(number1, number2) {
    return number1 + number2;
}

button?.addEventListener("click", function(){
    console.log("Result: " + add(number1.value, number2.value ));

});