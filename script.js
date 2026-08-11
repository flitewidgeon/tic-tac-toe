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

board = gameBoard();
player = player('X');
board.addMarker(player, 0);
board.addMarker(player, 1);
board.addMarker(player, 2);
console.log(board.checkWin(player.marker));


function game(){

    function randomNum(num){
        return Math.floor(Math.random() * num);
    }

    const playerOne = player('O');
    const playerTwo = player('X');

    // Randomly choose player one or player two to go first
    let canTakeTurn = randomNum(2) === 0? playerOne : playerTwo;

    // At the end of each turn, change the player that can take a turn
    canTakeTurn = canTakeTurn === playerOne? playerTwo : playerOne;

    console.log(canTakeTurn);

}


