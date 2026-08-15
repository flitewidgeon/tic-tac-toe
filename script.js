function player(marker){
    return {marker};
}


function gameBoard(){
    const grid = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    function checkWin(marker){

        const rows = {
            top:    [grid[0], grid[1], grid[2]],
            middle: [grid[3], grid[4], grid[5]],
            bottom: [grid[6], grid[7], grid[8]],   
        }

        const cols = {
            left:   [grid[0], grid[3], grid[6]],
            middle: [grid[1], grid[4], grid[7]],
            right:  [grid[2], grid[5], grid[8]],
        }
        
        const diagonals = {
            left: [grid[0], grid[4], grid[8]],
            right:[grid[2], grid[4], grid[6]],
        }

        function checkLine(line, marker){
            if (line[0] == marker &&
                line[1] == marker &&
                line[2] == marker){
                return true;
        }
        return false;
    }


    return checkLine(rows.top, marker) || checkLine(rows.middle, marker) || checkLine(rows.bottom, marker)||
    checkLine(cols.left, marker)|| checkLine(cols.middle, marker) || checkLine(cols.right, marker) ||
    checkLine(diagonals.left, marker) || checkLine(diagonals.right, marker);
}

function checkSquareEmpty(position){
    return grid[position] === 0;
}

function addMarker(player, position){
    grid[position] = player.marker;
}

function reset(){
    for (let i = 0; i < grid.length; i++){
        grid[i] = 0;
    }
}

function checkSquaresAvailable(){
    return grid.includes(0);
}

return{grid, checkSquareEmpty, checkSquaresAvailable, checkWin, addMarker, reset};
}    

function game(){

    function randomNum(num){
        return Math.floor(Math.random() * num);
    }

    const playerOne = player('O');
    const playerTwo = player('X');
    const board = gameBoard();

    function play(){
        // Randomly choose player one or player two to go first
        let canTakeTurn = randomNum(2) === 0? playerOne : playerTwo;
        let running = true;

        function turn(){
        // get the player to say where they want to place a marker
            const position = prompt('Which square do you want to put a marker on?');
        // if the square is unoccupied, place the marker
            if (board.checkSquareEmpty(position)){
                board.addMarker(canTakeTurn, position);
            }
            else{
                console.log('That square is occupied!');
            }
        // check if the player has a line 
            if (board.checkWin(canTakeTurn.marker, position)){
            // if so, end the game
                running = false;
                console.log('The winner is ' + canTakeTurn.marker);
            }
        // At the end of each turn, change the player that can take a turn
            canTakeTurn = canTakeTurn === playerOne? playerTwo : playerOne;
            // display the updated grid at the end of each turn
            console.log(board.grid);
        }

        // take a game turn while there are squares to fill and while there is no winner
        while(board.checkSquaresAvailable() && running){
            turn();
        }
    }

    return {play};
}

myGame = game();
myGame.play();