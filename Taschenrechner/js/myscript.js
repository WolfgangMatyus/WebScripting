function calculate(){
    var inputArr = document.getElementById("inputBox").value.split('');
    var numberA = [];
    var numberB = [];
    
    for(let i = 0; i < inputArr.length-1; i++){
        if(inputArr[i] == "+"){
            for(let j = i+1; j < inputArr.length; j++){
                numberB += inputArr[j];
            }
            //alert("B="+ numberB);
            document.getElementById("result").value = add(numberA, numberB); 
            numberB = 0;
        }
        else if(inputArr[i] == "-"){
            for(let j = i+1; j < inputArr.length; j++){
                numberB += inputArr[j];
            }
            //alert("B="+ numberB);
            document.getElementById("result").value = subtract(numberA, numberB);               
            numberB = 0;            
        }
        else if(inputArr[i] == "*"){
            for(let j = i+1; j < inputArr.length; j++){
                numberB += inputArr[j];
            }
            //alert("B="+ numberB);
            document.getElementById("result").value = multiply(numberA, numberB);               
            numberB = 0;            
        }
        else if(inputArr[i] == "/"){
            for(let j = i+1; j < inputArr.length; j++){
                numberB += inputArr[j];
            }
            //alert("B="+ numberB);
            document.getElementById("result").value = divide(numberA, numberB);               
            numberB = 0;            
        }else{
            numberA += inputArr[i];
            //alert("A="+ numberA + "i=" + i) 
        }    
    }    
    var log = document.getElementById("inputBox").value + "=" + document.getElementById("result").value;
    writeLog(log);
}

function add(a, b){
    return (Number(a) + Number(b));
}
function subtract(a, b){
    return (Number(a) - Number(b));
}
function multiply(a, b){
    return (Number(a) * Number(b));
}
function divide(a, b){
    return (Number(a) / Number(b));
}

function addDigit(clicked_id){
    content = document.getElementById("inputBox").value + String(clicked_id);
    document.getElementById("inputBox").value = content;
}

function clearContent(){
    document.getElementById("inputBox").value = "";
    document.getElementById("result").value = "";
}

function writeLog(logLine){
    const logs = "<li>" + logLine + "</li>" + document.getElementById("log").innerHTML ;
    document.getElementById("log").innerHTML = logs;
}

