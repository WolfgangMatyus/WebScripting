var a, b, result = 0, logline = "";

function calculate(operator){
    a = document.getElementById("zahl1").value;
    b = document.getElementById("zahl2").value;
    switch(operator){
        case "+":
            result = add();
            logline = a + " + " + b + " = " + result;
            break;
        case "-":
            result = subtract();
            logline = a + " - " + b + " = " + result;
            break;
        case "*":
            result = multiply();
            logline = a + " * " + b + " = " + result;
            break;
        case "/":
            result = divide();
            logline = a + " / " + b + " = " + result;
            break;
    }        
    document.getElementById("ergebnis").innerHTML = result;
    //alert("calculate: " + logline + "is: " + a + " " + b + " " + result);
    writeLog(logline); 
}

function add(){    
    return (Number(a) + Number(b));
}
function subtract(){
    return (Number(a) - Number(b));
}
function multiply(){
    return (Number(a) * Number(b));
}
function divide(){
    return (Number(a) / Number(b));
}

function writeLog(logline){
    const logs = "<li>" + logline + "</li>" + document.getElementById("verlauf").innerHTML;
    document.getElementById("verlauf").innerHTML = logs;
}