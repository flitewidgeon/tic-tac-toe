function player(marker){
    return {marker};
}


function gameBoard(){
    const grid = [0, 0, 0, 0, 0, 0, 0, 0, 0];



    function checkWin(marker){
        const squares = {
            topLeft: grid[0],
            topCenter: grid[1],
            topRight: grid[2],

            midLeft: grid[3],
            center: grid[4],
            midRight: grid[5],

            bottomLeft: grid[6],
            bottomCenter: grid[7],
            bottomRight: grid[8] 
        };

        const topRow = [squares.topLeft, squares.topCenter, squares.topRight];
        const middleRow = [squares.midLeft, squares.center, squares.midRight];
        const bottomRow = [squares.bottomLeft, squares.bottomCenter, squares.bottomRight];

        const leftCol = [squares.topLeft, squares.midLeft, squares.bottomLeft];
        const middleCol = [squares.topCenter, squares.center, squares.bottomCenter];
        const rightCol = [squares.topRight, squares.midRight, squares.bottomRight];

        const leftDiagonal = [squares.topLeft, squares.center, squares.bottomRight];
        const rightDiagonal = [squares.topRight, squares.center, squares.bottomLeft];   

        function checkLine(line, marker){
            if (line[0] == marker &&
                line[1] == marker &&
                line[2] == marker){
                return true;
        }
        return false;
    }
    return checkLine(topRow, marker) || checkLine(middleRow, marker) || checkLine(bottomRow, marker)||
    checkLine(leftCol, marker)|| checkLine(middleCol, marker) || checkLine(rightCol, marker) ||
    checkLine(leftDiagonal, marker) || checkLine(rightDiagonal, marker);
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
            if (board.checkWin(canTakeTurn.marker)){
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