function player(marker){
    return {marker};
}


function gameBoard(){
    let grid = [0, 0, 0, 0, 0, 0, 0, 0, 0];

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

    function checkWin(marker){
        return checkLine(topRow, marker) || checkLine(middleRow, marker) || checkLine(bottomRow, marker)||
        checkLine(leftCol, marker)|| checkLine(middleCol, marker) || checkLine(rightCol, marker) ||
        checkLine(leftDiagonal, marker) || checkLine(rightDiagonal, marker);
    }

    function addMarker(player, position){
        grid[position] = player.marker;
    }

    function reset(){
        for (let i = 0; i < grid.length; i++){
            grid[i] = 0;
        }
    }

    return{grid, checkWin, addMarker, reset};
}    


