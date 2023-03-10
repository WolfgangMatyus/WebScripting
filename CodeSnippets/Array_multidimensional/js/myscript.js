function erstelleSpielbereich(){
    const cols = 4;
    const rows = 4;
    
    let arr =[];
    let count=0; 
    for(let x = 0; x < rows; x++){
        arr[x] = [];
            for(var y = 0; y < cols; y++){   
            var divKarte = document.createElement("div");
                divKarte.setAttribute("class", "card");
                divKarte.setAttribute("id", (count+1));
                if(count % 4 == 0){
                    divKarte.style.clear = "left";
                }
            arr[x][y] = divKarte
            count++;
            document.getElementById("array").appendChild(divKarte);
        }
    }
    console.log(arr);
}