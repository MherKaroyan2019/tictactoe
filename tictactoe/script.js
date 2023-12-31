let matrix = [];

let size;

let block_container; 
let game_end = false;

let turn = "x";



function winner(turn){
    let winner;
    let isDraw = true;
    for(let y = 0; y < matrix.length; y++){
        for (let x = 0; x < matrix[y].length; x++) {
            if(matrix[y][x] != turn){
                winner = "";
                break;
            }else {
                winner = turn;
            }
        }
        if(winner == turn){
            return turn
        }
    }

    for(let x = 0; x < matrix.length; x++){
        for (let y = 0; y < matrix[x].length; y++) {
            if(matrix[y][x] != turn){
                winner = "";
                break;
            }else {
                winner = turn;
            }
        }
        if(winner == turn){
            return turn
        }
    }

    for(let x = matrix.length - 1; x >= 0; x--){
        if(matrix[x][x] != turn){
            winner = "";
            break;
        }else {
            winner = turn;
        }
    }
    if(winner == turn){
        return turn
    }

    for(let y = 0; y < matrix.length; y++){
        for(let x = matrix[y].length - 1; x >= 0; x--){
            if(x + y == matrix.length - 1){
                if(matrix[y][x] != turn){
                    console.log([x,y,matrix[y][x],turn]);
                    winner = "";
                    break;
                }else {
                    winner = turn;
                }   
            }
        }
        if(winner != turn){
            break;
        }
    }
    if(winner == turn){
        return turn;
    }

    for(let x = 0; x < matrix.length; x++){
        for (let y = 0; y < matrix[x].length; y++) {
            if(matrix[y][x] == 0){
                isDraw = false;
                break;
            }
        }
        if(isDraw == false){
            break;
        }
    }

    if(isDraw == true){
        return "draw";
    }

    return winner
}



function createMatrix(){
    size = document.getElementById("matrix-size").value;
    document.getElementsByClassName("matrix-input-block")[0].style.display = "none";

    block_container = document.getElementById("block-container");

    block_container.style.width = size * 60 + "px";

    for (let y = 0; y < size; y++) {
        matrix[y] = [];
        for (let x = 0; x < size; x++) {
            matrix[y][x] = 0;
            let block = document.createElement("div");
            block.setAttribute("class", "block " + y + "-" + x);
            block.addEventListener("click", tictactoe);

            block_container.appendChild(block);
        }
    }
}

function tictactoe(){
    if(game_end == false){
        coordinate = this.getAttribute("class").split(" ")[1].split("-");

        matrix[+coordinate[0]][+coordinate[1]] = turn;

        this.setAttribute("class", "block " + turn);
        this.removeEventListener("click", tictactoe);

        if(winner(turn) == ""){
            if(turn == "x"){
                turn = "o";
            }else{
                turn = "x";
            }
        }else if(winner(turn) == "draw"){
            document.getElementById("winner").innerHTML = "Draw";
            document.getElementById("retry").style.display = "block";
            game_end == true;
            turn = "";
        }else{
            document.getElementById("winner").innerHTML = turn + " team is winner";
            document.getElementById("retry").style.display = "block";
            game_end = true;
            turn = "";
        }
    }
}

function retry(){
    while (block_container.firstChild) {
        block_container.removeChild(block_container.lastChild);
    }

    matrix = [];
    document.getElementsByClassName("matrix-input-block")[0].style.display = "block";
    document.getElementById("winner").innerHTML = "";
    document.getElementById("retry").style.display = "none";
    game_end = false;
    turn = "x";
}